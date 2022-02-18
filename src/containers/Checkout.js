import React, { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import ShopBanner from "../components/components/ShopBanner";
import {
  getRemoteCart,
  cartClear,
  getStripePublicKey,
} from "./../redux/actions/cartActions";
import { connect } from "react-redux";
import { checkErrors, getMessages } from "../redux/actions/functions";
import { Alert } from "react-bootstrap";
import { createOrder } from "../redux/actions/orderActions";
import CheckoutThankYou from "../components/components/CheckoutThankYou";
import {
  createPayment,
  setPaymentToOrder,
  createCustomer,
  createPaymentIntent,
  createPaypalOrder,
} from "../redux/actions/paymentActions";
import {
  addPromocode,
  clearPromocodes,
  confirmVoucher,
} from "./../redux/actions/voucherActions";
import { userDiscount } from "./../redux/actions/userActions";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Loader from "../components/components/Loader";
import { fetchSettings } from "./../redux/actions/settingActions";

class Checkout extends Component {
  state = {
    couponInfo: false,
    couponData: "",
    giftCardStatus: false,
    termsStatus: false,
    paymentMethod: "paypal",
    shippingAddress: true,
    thankYouStatus: false,
    order: {},
    card: null,
    coupon: "",
    couponErrors: "",
    is_bonuses: false,
    bonuses: 0,
    isLoader: true,
    formData: {
      billingFirstName: "",
      billingLastName: "",
      billingCompany: "",
      billingCountry: "United Kingdom (UK)",
      billingState: "",
      billingStreet: "",
      billingApartment: "",
      billingCity: "",
      billingPostCode: "",
      billingPhone: "",
      billingEmail: "",
      orderNotes: "",
      deals_and_offers: true,
      shippingFirstName: "",
      shippingLastName: "",
      shippingCompany: "",
      shippingCountry: "United Kingdom (UK)",
      shippingState: "",
      shippingStreet: "",
      shippingApartment: "",
      shippingCity: "",
      shippingPostCode: "",
      shippingAddressStatus: false,
    },
    remoteCart: [],
    errors: {
      billingFirstName: [],
      billingLastName: [],
      billingStreet: [],
      billingCity: [],
      billingPostCode: [],
      billingPhone: [],
      billingEmail: [],
      shippingFirstName: [],
      shippingLastName: [],
      shippingStreet: [],
      shippingCity: [],
      shippingPostCode: [],
    },
    discount: 0,
    settings: {
      kartra_discount: 0,
    },
    frameUrl: "",
    paypalModal: false,
    stripePromise: null,
    promocodeDiscount: {},
  };

  componentDidMount() {
    if (this.state.paymentMethod === "paypal") {
      // this.initPaypal();
    }
    this.props.fetchSettings().then((response) => {
      this.setState({
        settings: {
          ...response.data,
        },
      });
    });
    if (!!this.props.match.params.invite === true) {
      this.props
        .userDiscount(this.props.match.params.invite)
        .then((response) => {
          this.setState({
            discount: response.data.discount / 100,
          });
        });
    }
    if (this.props.promocode !== "") {
      this.props.confirmVoucher(this.props.promocode).then((response) => {
        this.setState({ promocodeDiscount: { ...response.data } });
      });
    }
    if (this.state.paymentMethod === "stripe") {
      this.initStripe();
    }
    this.props.getRemoteCart().then((response) => {
      this.setState({
        remoteCart: [...response.data.items],
        isLoader: false,
      });
    });

    this.getStripePublicKey().then((response) => {
      const stripePromise = loadStripe(response);
      this.setState({
        stripePromise: stripePromise,
      });
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.state.paymentMethod === "paypal" &&
      prevState.paymentMethod !== this.state.paymentMethod
    ) {
      //   this.initPaypal();
    }

    if (
      this.state.paymentMethod === "stripe" &&
      prevState.paymentMethod !== this.state.paymentMethod
    ) {
      this.initStripe();
    }
  }

  getStripePublicKey = async () => {
    try {
      let response = await this.props.getStripePublicKey();
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  getTotalPrice = () => {
    let total = this.getSubTotalWithDiscount() - this.getBonuses();
    return total;
  };
  getSubTotalPrice = () => {
    let total = 0;
    this.state.remoteCart.map((item, index) => {
      total = total + parseFloat(item.price_set);
    });
    return total;
  };

  getSubTotalWithDiscount = () => {
    let subtotal = this.getSubTotalPrice();
    let kartraDiscount = 0;
    if (this.props.user.is_kartra) {
      kartraDiscount = this.state.settings.kartra_discount / 100;
    }
    let promocodePercent = 0;
    let promocodeFixed = 0;

    if (Object.keys(this.state.promocodeDiscount).length > 0) {
      if (this.state.promocodeDiscount.type === "PERCENT") {
        promocodePercent = this.state.promocodeDiscount.sum / 100;
      }
      if (this.state.promocodeDiscount.type === "FIXED") {
        promocodePercent = this.state.promocodeDiscount.sum / 100;
      }
    }
    subtotal =
      subtotal * (1 - this.state.discount - kartraDiscount - promocodePercent) -
      promocodeFixed;
    return subtotal;
  };

  getBonuses = () => {
    let bonuses = 0;
    if (this.state.is_bonuses) {
      let user_bonuses = this.props.user.bonuses;
      let subtotal = this.getSubTotalWithDiscount();
      if (user_bonuses > subtotal - 0.5) {
        bonuses = subtotal - 0.5;
      } else {
        bonuses = user_bonuses;
      }
    }
    return bonuses;
  };

  validForm = () => {
    let errors = {
      billingFirstName: [],
      billingLastName: [],
      billingStreet: [],
      billingCity: [],
      billingPostCode: [],
      billingPhone: [],
      billingEmail: [],
      shippingFirstName: [],
      shippingLastName: [],
      shippingStreet: [],
      shippingCity: [],
      shippingPostCode: [],
    };

    if (this.state.formData.billingFirstName === "") {
      errors.billingFirstName.push("Billing first name is required!");
    }
    if (this.state.formData.billingLastName === "") {
      errors.billingLastName.push("Billing last name is required!");
    }
    if (this.state.formData.billingStreet === "") {
      errors.billingStreet.push("Billing street is required!");
    }
    if (this.state.formData.billingCity === "") {
      errors.billingCity.push("Billing city is required!");
    }
    if (this.state.formData.billingPostCode === "") {
      errors.billingPostCode.push("Billing postcode is required!");
    }
    if (this.state.formData.billingPhone === "") {
      errors.billingPhone.push("Billing phone is required!");
    }
    if (this.state.formData.billingEmail === "") {
      errors.billingEmail.push("Billing email is required!");
    }
    if (this.state.formData.shippingAddressStatus) {
      if (this.state.formData.shippingFirstName === "") {
        errors.shippingFirstName.push("Shipping first name is required!");
      }
      if (this.state.formData.shippingLastName === "") {
        errors.shippingLastName.push("Shipping last name is required!");
      }
      if (this.state.formData.shippingStreet === "") {
        errors.shippingStreet.push("Shipping street is required!");
      }
      if (this.state.formData.shippingCity === "") {
        errors.shippingCity.push("Shipping city is required!");
      }
      if (this.state.formData.shippingPostCode === "") {
        errors.shippingPostCode.push("Shipping post code name is required!");
      }
    }
    return errors;
  };

  createOrder = async () => {
    let response = await this.props.createOrder({
      ...this.state.formData,
      cart: [...this.state.remoteCart],
      invite: this.props.match.params.invite,
      is_bonuses: this.state.is_bonuses,
    });

    return response;
  };

  initStripe = () => {
    this.state.stripePromise.then((stripe) => {
      let elements = stripe.elements();
      var style = {
        base: {
          color: "#32325d",
        },
      };
      var card = elements.create("card", { style: style });
      card.mount("#card-element");
      card.on("change", (event) => {
        var displayError = document.getElementById("card-errors");
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = "";
        }
      });
      this.setState({ card: card });
    });
  };

  onClickStripeHandler = async () => {
    let stripe = await this.state.stripePromise;

    let customer = await this.props.createCustomer();
    this.createOrder().then(async (response) => {
      let paymentIntent = await this.props.createPaymentIntent({
        customer_id: customer.data.id,
        order_id: response.data.id,
      });
      this.setState(
        {
          order: { ...response.data },
        },
        () => {
          stripe
            .confirmCardPayment(paymentIntent.data.client_secret, {
              payment_method: {
                card: this.state.card,
                billing_details: {
                  name: `${this.state.formData.billingFirstName} ${this.state.formData.billingLastName}`,
                },
              },
              setup_future_usage: "off_session",
            })
            .then((result) => {
              if (result.error) {
                // Show error to your customer
                console.log(result.error.message);
              } else {
                if (result.paymentIntent.status === "succeeded") {
                  this.props
                    .createPayment({
                      type: "stripe",
                      payment_system_id: result.paymentIntent.id,
                      successfulness: 1,
                      amount: this.getTotalPrice(),
                    })
                    .then((response) => {
                      this.props
                        .setPaymentToOrder({
                          transaction_id: response.data.id,
                          order_id: this.state.order.id,
                        })
                        .then((response) => {
                          this.props.cartClear().then(() => {
                            this.props.getRemoteCart().then(() => {
                              window.location.href = `/checkout-thank-you/stripe/${this.state.order.id}`;
                            });
                          });
                        });
                    });
                }
              }
            });
        }
      );
    });
  };

  getRemoteCartPrice = (cart) => {
    let price = 0;
    price += parseFloat(cart.price);
    if (cart.is_set) {
      price += parseFloat(cart.set.price);
    }
    if (cart) return price;
  };

  render() {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GBP",
    });

    return (
      <MainLayout>
        <section className="checkout-section">
          <div className="elementor-background-overlay"></div>
          <div className="elementor-container elementor-column-gap-default">
            <div className="elementor-row">
              <div
                className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-48f79e1"
                data-id="48f79e1"
                data-element_type="column"
                data-settings=""
              >
                <div className="elementor-column-wrap elementor-element-populated">
                  <div className="elementor-widget-wrap checkout-container">
                    <h2 className="checkout-title">Checkout</h2>
                    {!this.state.thankYouStatus ? (
                      <div className="">
                        <div className="elementor-widget-container">
                          <div className="woocommerce">
                            <div className="woocommerce-notices-wrapper"></div>

                            <div className="woocommerce-form-coupon-toggle">
                              <div className="checkout-coupon-info">
                                Have a coupon?{" "}
                                <a
                                  href="#"
                                  className="showcoupon"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({
                                      couponInfo: !this.state.couponInfo,
                                    });
                                  }}
                                >
                                  Click here to enter your code
                                </a>
                              </div>
                            </div>

                            {this.state.couponInfo ? (
                              <form
                                className="checkout_coupon woocommerce-form-coupon mb-4"
                                method="post"
                              >
                                <p>
                                  If you have a coupon code, please apply it
                                  below.
                                </p>

                                <p className="form-row form-row-first mb-0">
                                  <input
                                    type="text"
                                    name="coupon_code"
                                    className="input-text"
                                    placeholder="Coupon code"
                                    id="coupon_code"
                                    value={this.state.couponData}
                                    onChange={(event) => {
                                      this.setState({
                                        couponData: event.target.value,
                                      });
                                    }}
                                  />
                                </p>

                                <p className="form-row form-row-last mb-0">
                                  <button
                                    type="button"
                                    className="button"
                                    name="apply_coupon"
                                    value="Apply coupon"
                                    onClick={() => {
                                      this.props
                                        .confirmVoucher(this.state.couponData)
                                        .then((response) => {
                                          if (
                                            response.data.code_type ===
                                            "promocode"
                                          ) {
                                            this.props.addPromocode(
                                              this.state.coupon
                                            );
                                            this.setState({
                                              promocode: response.data,
                                            });
                                          }
                                        })
                                        .catch((errors) => {
                                          console.log(errors);
                                          this.setState({
                                            couponErrors:
                                              errors.response.data.errors,
                                          });
                                        });
                                    }}
                                  >
                                    Apply coupon
                                  </button>
                                </p>

                                <div className="clear"></div>
                                <div
                                  className={"error"}
                                  style={{ color: "#f00" }}
                                >
                                  {this.state.couponErrors.length > 0
                                    ? this.state.couponErrors
                                    : null}
                                </div>
                              </form>
                            ) : null}

                            <div className="woocommerce-notices-wrapper"></div>
                            <form
                              name="checkout"
                              method="post"
                              className="checkout woocommerce-checkout"
                            >
                              {getMessages(this.state.errors).length > 0 ? (
                                <Alert variant={"danger"}>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: getMessages(
                                        this.state.errors
                                      ).join("<br>"),
                                    }}
                                  />
                                </Alert>
                              ) : null}

                              <div className="col2-set">
                                <div className="col-1-checkout">
                                  <div className="woocommerce-billing-fields">
                                    <h3>Billing details</h3>

                                    <div className="woocommerce-billing-fields__field-wrapper">
                                      <p className="form-row form-row-first validate-required">
                                        <label
                                          htmlFor="billing_first_name"
                                          className=""
                                        >
                                          First name&nbsp;
                                          <abbr
                                            className="required"
                                            title="required"
                                          >
                                            *
                                          </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                          <input
                                            type="text"
                                            className="input-text "
                                            name="billing_first_name"
                                            value={
                                              this.state.formData
                                                .billingFirstName
                                            }
                                            onChange={(event) => {
                                              this.setState({
                                                formData: {
                                                  ...this.state.formData,
                                                  billingFirstName:
                                                    event.target.value,
                                                },
                                              });
                                            }}
                                          />
                                        </span>
                                      </p>
                                      <p
                                        className="form-row form-row-last validate-required"
                                        id="billing_last_name_field"
                                        data-priority="20"
                                      >
                                        <label
                                          htmlFor="billing_last_name"
                                          className=""
                                        >
                                          Last name&nbsp;
                                          <abbr
                                            className="required"
                                            title="required"
                                          >
                                            *
                                          </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                          <input
                                            type="text"
                                            className="input-text "
                                            name="billing_last_name"
                                            id="billing_last_name"
                                            placeholder=""
                                            value={
                                              this.state.formData
                                                .billingLastName
                                            }
                                            onChange={(event) => {
                                              this.setState({
                                                formData: {
                                                  ...this.state.formData,
                                                  billingLastName:
                                                    event.target.value,
                                                },
                                              });
                                            }}
                                          />
                                        </span>
                                      </p>
                                      <p
                                        className="form-row form-row-wide"
                                        id="billing_company_field"
                                        data-priority="30"
                                      >
                                        <label
                                          htmlFor="billing_company"
                                          className=""
                                        >
                                          Company name&nbsp;
                                          <span className="optional">
                                            (optional)
                                          </span>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                          <input
                                            type="text"
                                            className="input-text "
                                            name="billing_company"
                                            placeholder=""
                                            value={
                                              this.state.formData.billingCompany
                                            }
                                            onChange={(event) => {
                                              this.setState({
                                                formData: {
                                                  ...this.state.formData,
                                                  billingCompany:
                                                    event.target.value,
                                                },
                                              });
                                            }}
                                          />
                                        </span>
                                      </p>
                                      <p className="form-row form-row-wide address-field update_totals_on_change validate-required">
                                        <label
                                          htmlFor="billing_country"
                                          className=""
                                        >
                                          Country / Region&nbsp;
                                          <abbr
                                            className="required"
                                            title="required"
                                          >
                                            *
                                          </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                          <strong>
                                            {this.state.formData.billingCountry}
                                          </strong>
                                        </span>
                                      </p>
                                      <p className="form-row address-field validate-required form-row-wide">
                                        <label
                                          htmlFor="billing_address_1"
                                          className=""
                                        >
                                          Street address&nbsp;
                                          <abbr
                                            className="required"
                                            title="required"
                                          >
                                            *
                                          </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                          <input
                                            type="text"
                                            className="input-text "
                                            name="billing_address_1"
                                            id="billing_address_1"
                                            placeholder="House number and street name"
                                            value={
                                              this.state.formData.billingStreet
                                            }
                                            onChange={(event) => {
                                              this.setState({
                                                formData: {
                                                  ...this.state.formData,
                                                  billingStreet:
                                                    event.target.value,
                                                },
                                              });
                                            }}
                                          />
                                        </span>
                                      </p>
                                      <p className="form-row address-field form-row-wide">
                                        <label
                                          htmlFor="billing_address_2"
                                          className="screen-reader-text"
                                        >
                                          Apartment, suite, unit, etc.
                                          (optional)&nbsp;
                                          <span className="optional">
                                            (optional)
                                          </span>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                          <input
                                            type="text"
                                            className="input-text "
                                            name="billing_address_2"
                                            id="billing_address_2"
                                            placeholder="Apartment, suite, unit, etc. (optional)"
                                            value={
                                              this.state.formData
                                                .billingApartment
                                            }
                                            onChange={(event) => {
                                              this.setState({
                                                formData: {
                                                  ...this.state.formData,
                                                  billingApartment:
                                                    event.target.value,
                                                },
                                              });
                                            }}
                                          />
                                        </span>
                                      </p>
                                      <p className="form-row address-field validate-required form-row-wide">
                                        <label
                                          htmlFor="billing_city"
                                          className=""
                                        >
                                          Town / City&nbsp;
                                          <abbr
                                            className="required"
                                            title="required"
                                          >
                                            *
                                          </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                          <input
                                            type="text"
                                            className="input-text "
                                            name="billing_city"
                                            placeholder=""
                                            value={
                                              this.state.formData.billingCity
                                            }
                                            onChange={(event) => {
                                              this.setState({
                                                formData: {
                                                  ...this.state.formData,
                                                  billingCity:
                                                    event.target.value,
                                                },
                                              });
                                            }}
                                          />
                                        </span>
                                      </p>
                                      <p className="form-row address-field validate-state form-row-wide">
                                        <label
                                          htmlFor="billing_state"
                                          className=""
                                        >
                                          County&nbsp;
                                          <span className="optional">
                                            (optional)
                                          </span>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                          <input
                                            type="text"
                                            className="input-text "
                                            value={
                                              this.state.formData.billingState
                                            }
                                            onChange={(event) => {
                                              this.setState({
                                                formData: {
                                                  ...this.state.formData,
                                                  billingState:
                                                    event.target.value,
                                                },
                                              });
                                            }}
                                            placeholder=""
                                            name="billing_state"
                                          />
                                        </span>
                                      </p>
                                      <p className="form-row address-field validate-required validate-postcode form-row-wide">
                                        <label
                                          htmlFor="billing_postcode"
                                          className=""
                                        >
                                          Postcode&nbsp;
                                          <abbr
                                            className="required"
                                            title="required"
                                          >
                                            *
                                          </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                          <input
                                            type="text"
                                            className="input-text "
                                            name="billing_postcode"
                                            value={
                                              this.state.formData
                                                .billingPostCode
                                            }
                                            onChange={(event) => {
                                              this.setState({
                                                formData: {
                                                  ...this.state.formData,
                                                  billingPostCode:
                                                    event.target.value,
                                                },
                                              });
                                            }}
                                          />
                                        </span>
                                      </p>
                                      <p
                                        className="form-row form-row-wide validate-required validate-phone"
                                        id="billing_phone_field"
                                        data-priority="100"
                                      >
                                        <label
                                          htmlFor="billing_phone"
                                          className=""
                                        >
                                          Phone&nbsp;
                                          <abbr
                                            className="required"
                                            title="required"
                                          >
                                            *
                                          </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                          <input
                                            type="tel"
                                            className="input-text "
                                            name="billing_phone"
                                            placeholder=""
                                            value={
                                              this.state.formData.billingPhone
                                            }
                                            onChange={(event) => {
                                              this.setState({
                                                formData: {
                                                  ...this.state.formData,
                                                  billingPhone:
                                                    event.target.value,
                                                },
                                              });
                                            }}
                                          />
                                        </span>
                                      </p>
                                      <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                      >
                                        <label
                                          htmlFor="billing_email"
                                          className=""
                                        >
                                          Email address&nbsp;
                                          <abbr
                                            className="required"
                                            title="required"
                                          >
                                            *
                                          </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                          <input
                                            type="email"
                                            className="input-text "
                                            name="billing_email"
                                            placeholder=""
                                            value={
                                              this.state.formData.billingEmail
                                            }
                                            onChange={(event) => {
                                              this.setState({
                                                formData: {
                                                  ...this.state.formData,
                                                  billingEmail:
                                                    event.target.value,
                                                },
                                              });
                                            }}
                                          />
                                        </span>
                                      </p>
                                    </div>
                                  </div>

                                  <p id="woo-ml-subscribe">
                                    <input
                                      name="woo_ml_subscribe"
                                      type="checkbox"
                                      checked={
                                        this.state.formData.deals_and_offers
                                      }
                                      onChange={(event) => {
                                        this.setState({
                                          formData: {
                                            ...this.state.formData,
                                            deals_and_offers:
                                              !this.state.formData
                                                .deals_and_offers,
                                          },
                                        });
                                      }}
                                    />
                                    <label htmlFor="woo_ml_subscribe">
                                      Yes, I want to hear about deals and
                                      offers!
                                    </label>
                                  </p>
                                </div>

                                <div className="col-2-checkout">
                                  <div className="woocommerce-shipping-fields">
                                    <h3 id="ship-to-different-address">
                                      <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
                                        <input
                                          className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
                                          checked={
                                            this.state.formData
                                              .shippingAddressStatus
                                          }
                                          type="checkbox"
                                          name="ship_to_different_address"
                                          onChange={(event) => {
                                            this.setState({
                                              formData: {
                                                ...this.state.formData,
                                                shippingAddressStatus:
                                                  !this.state.formData
                                                    .shippingAddressStatus,
                                              },
                                            });
                                          }}
                                          value="1"
                                        />{" "}
                                        <span>
                                          Ship to a different address?
                                        </span>
                                      </label>
                                    </h3>
                                    {this.state.formData
                                      .shippingAddressStatus ? (
                                      <div className="shipping_address">
                                        <div className="woocommerce-shipping-fields__field-wrapper">
                                          <p
                                            className="form-row form-row-first validate-required"
                                            data-priority="10"
                                          >
                                            <label
                                              htmlFor="shipping_first_name"
                                              className=""
                                            >
                                              First name&nbsp;
                                              <abbr
                                                className="required"
                                                title="required"
                                              >
                                                *
                                              </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="text"
                                                className="input-text "
                                                name="shipping_first_name"
                                                id="shipping_first_name"
                                                placeholder=""
                                                value={
                                                  this.state.formData
                                                    .shippingFirstName
                                                }
                                                onChange={(event) => {
                                                  this.setState({
                                                    formData: {
                                                      ...this.state.formData,

                                                      shippingFirstName:
                                                        event.target.value,
                                                    },
                                                  });
                                                }}
                                              />
                                            </span>
                                          </p>
                                          <p className="form-row form-row-last validate-required">
                                            <label
                                              htmlFor="shipping_last_name"
                                              className=""
                                            >
                                              Last name&nbsp;
                                              <abbr
                                                className="required"
                                                title="required"
                                              >
                                                *
                                              </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="text"
                                                className="input-text "
                                                name="shipping_last_name"
                                                placeholder=""
                                                value={
                                                  this.state.formData
                                                    .shippingLastName
                                                }
                                                onChange={(event) => {
                                                  this.setState({
                                                    formData: {
                                                      ...this.state.formData,
                                                      shippingLastName:
                                                        event.target.value,
                                                    },
                                                  });
                                                }}
                                              />
                                            </span>
                                          </p>
                                          <p className="form-row form-row-wide">
                                            <label
                                              htmlFor="shipping_company"
                                              className=""
                                            >
                                              Company name&nbsp;
                                              <span className="optional">
                                                (optional)
                                              </span>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="text"
                                                className="input-text "
                                                name="shipping_company"
                                                id="shipping_company"
                                                placeholder=""
                                                value={
                                                  this.state.formData
                                                    .shippingCompany
                                                }
                                                onChange={(event) => {
                                                  this.setState({
                                                    formData: {
                                                      ...this.state.formData,
                                                      shippingCompany:
                                                        event.target.value,
                                                    },
                                                  });
                                                }}
                                              />
                                            </span>
                                          </p>
                                          <p className="form-row form-row-wide address-field update_totals_on_change validate-required">
                                            <label
                                              htmlFor="shipping_country"
                                              className=""
                                            >
                                              Country / Region&nbsp;
                                              <abbr
                                                className="required"
                                                title="required"
                                              >
                                                *
                                              </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <strong>
                                                {
                                                  this.state.formData
                                                    .shippingCountry
                                                }
                                              </strong>
                                              <input
                                                type="hidden"
                                                name="shipping_country"
                                                value="GB"
                                                className="country_to_state"
                                                readOnly="readonly"
                                              />
                                            </span>
                                          </p>
                                          <p className="form-row address-field validate-required form-row-wide">
                                            <label
                                              htmlFor="shipping_address_1"
                                              className=""
                                            >
                                              Street address&nbsp;
                                              <abbr
                                                className="required"
                                                title="required"
                                              >
                                                *
                                              </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="text"
                                                className="input-text "
                                                name="shipping_address_1"
                                                placeholder="House number and street name"
                                                value={
                                                  this.state.formData
                                                    .shippingStreet
                                                }
                                                onChange={(event) => {
                                                  this.setState({
                                                    formData: {
                                                      ...this.state.formData,
                                                      shippingStreet:
                                                        event.target.value,
                                                    },
                                                  });
                                                }}
                                              />
                                            </span>
                                          </p>
                                          <p className="form-row address-field form-row-wide">
                                            <label
                                              htmlFor="shipping_address_2"
                                              className="screen-reader-text"
                                            >
                                              Apartment, suite, unit, etc.
                                              (optional)&nbsp;
                                              <span className="optional">
                                                (optional)
                                              </span>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="text"
                                                className="input-text "
                                                name="shipping_address_2"
                                                placeholder="Apartment, suite, unit, etc. (optional)"
                                                value={
                                                  this.state.formData
                                                    .shippingApartment
                                                }
                                                onChange={(event) => {
                                                  this.setState({
                                                    formData: {
                                                      ...this.state.formData,
                                                      shippingApartment:
                                                        event.target.value,
                                                    },
                                                  });
                                                }}
                                              />
                                            </span>
                                          </p>
                                          <p className="form-row address-field validate-required form-row-wide">
                                            <label
                                              htmlFor="shipping_city"
                                              className=""
                                            >
                                              Town / City&nbsp;
                                              <abbr
                                                className="required"
                                                title="required"
                                              >
                                                *
                                              </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="text"
                                                className="input-text "
                                                name="shipping_city"
                                                placeholder=""
                                                value={
                                                  this.state.formData
                                                    .shippingCity
                                                }
                                                onChange={(event) => {
                                                  this.setState({
                                                    formData: {
                                                      ...this.state.formData,
                                                      shippingCity:
                                                        event.target.value,
                                                    },
                                                  });
                                                }}
                                              />
                                            </span>
                                          </p>
                                          <p className="form-row address-field validate-state form-row-wide">
                                            <label
                                              htmlFor="shipping_state"
                                              className=""
                                            >
                                              County&nbsp;
                                              <span className="optional">
                                                (optional)
                                              </span>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="text"
                                                className="input-text "
                                                placeholder=""
                                                name="shipping_state"
                                                value={
                                                  this.state.formData
                                                    .shippingState
                                                }
                                                onChange={(event) => {
                                                  this.setState({
                                                    formData: {
                                                      ...this.state.formData,
                                                      shippingState:
                                                        event.target.value,
                                                    },
                                                  });
                                                }}
                                              />
                                            </span>
                                          </p>
                                          <p className="form-row address-field validate-required validate-postcode form-row-wide">
                                            <label
                                              htmlFor="shipping_postcode"
                                              className=""
                                            >
                                              Postcode&nbsp;
                                              <abbr
                                                className="required"
                                                title="required"
                                              >
                                                *
                                              </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="text"
                                                className="input-text "
                                                name="shipping_postcode"
                                                placeholder=""
                                                value={
                                                  this.state.formData
                                                    .shippingPostCode
                                                }
                                                onChange={(event) => {
                                                  this.setState({
                                                    formData: {
                                                      ...this.state.formData,
                                                      shippingPostCode:
                                                        event.target.value,
                                                    },
                                                  });
                                                }}
                                              />
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="woocommerce-additional-fields">
                                    <div className="woocommerce-additional-fields__field-wrapper">
                                      <p className="form-row notes">
                                        <label
                                          htmlFor="order_comments"
                                          className=""
                                        >
                                          Order notes&nbsp;
                                          <span className="optional">
                                            (optional)
                                          </span>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                          <textarea
                                            name="order_comments"
                                            className="input-text "
                                            id="order_comments"
                                            placeholder="Notes about your order, e.g. special notes for delivery."
                                            rows="2"
                                            cols="5"
                                            value={
                                              this.state.formData.orderNotes
                                            }
                                            onChange={(event) => {
                                              this.setState({
                                                formData: {
                                                  ...this.state.formData,
                                                  orderNotes:
                                                    event.target.value,
                                                },
                                              });
                                            }}
                                          />
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <h3 id="order_review_heading">Your order</h3>

                              <div
                                id="order_review"
                                className="woocommerce-checkout-review-order"
                              >
                                <table className="shop_table woocommerce-checkout-review-order-table">
                                  <thead>
                                    <tr>
                                      <th className="product-name">Product</th>
                                      <th className="product-total">
                                        Subtotal
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.remoteCart.map(
                                      (cart, index) => {
                                        return (
                                          <tr
                                            className="cart_item"
                                            key={`cart_item_${index}`}
                                          >
                                            <td className="product-name">
                                              {cart.product.product.name}
                                            </td>
                                            <td className="product-total">
                                              <span className="woocommerce-Price-amount amount">
                                                <bdi>
                                                  {formatter.format(
                                                    cart.price_set
                                                  )}
                                                </bdi>
                                              </span>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                  <tfoot>
                                    <tr className="cart-subtotal">
                                      <th>Subtotal</th>
                                      <td>
                                        <span className="woocommerce-Price-amount amount">
                                          <bdi>
                                            {formatter.format(
                                              this.getSubTotalPrice()
                                            )}
                                          </bdi>
                                        </span>
                                      </td>
                                    </tr>

                                    <tr className="cart-subtotal giftup-cart-subtotal">
                                      <th className="giftup-cart-subtotal-th">
                                        Gift card
                                      </th>
                                      <td
                                        data-title="Gift card"
                                        className="giftup-cart-subtotal-td"
                                      >
                                        {!this.state.giftCardStatus ? (
                                          <a
                                            href="#"
                                            className="giftup-cart-subtotal-td-apply-gc"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              this.setState({
                                                giftCardStatus:
                                                  !this.state.giftCardStatus,
                                              });
                                            }}
                                          >
                                            Apply gift card
                                          </a>
                                        ) : null}

                                        {this.state.giftCardStatus ? (
                                          <div
                                            id="giftup-apply-gc-form"
                                            className="giftup-cart-subtotal-td-form"
                                            style={{
                                              display: "grid",
                                              gridTemplateColumns:
                                                "minmax(110px, 1fr) fit-content(40px)",
                                            }}
                                          >
                                            <input
                                              className="giftup-cart-subtotal-td-form-input"
                                              type="text"
                                              id="giftcard_code"
                                              value=""
                                              placeholder="Gift card code"
                                            />
                                            <button
                                              className="giftup-cart-subtotal-td-form-button"
                                              type="button"
                                              name="giftup_giftcard_button"
                                              value="Apply gift card"
                                            >
                                              Apply
                                            </button>
                                          </div>
                                        ) : null}
                                      </td>
                                    </tr>

                                    <tr className="order-total">
                                      <th>Total</th>
                                      <td>
                                        <strong>
                                          <span className="woocommerce-Price-amount amount">
                                            <bdi>
                                              {formatter.format(
                                                this.getTotalPrice()
                                              )}
                                            </bdi>
                                          </span>
                                        </strong>
                                        <small className="includes_tax">
                                          {" "}
                                          (includes{" "}
                                          <span className="woocommerce-Price-amount amount">
                                            <span className="woocommerce-Price-currencySymbol">
                                              £
                                            </span>
                                            0.96
                                          </span>{" "}
                                          VAT)
                                        </small>
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>

                                <div
                                  id="payment"
                                  className="woocommerce-checkout-payment"
                                >
                                  <ul className="wc_payment_methods payment_methods methods">
                                    <li className="wc_payment_method payment_method_paypal">
                                      <input
                                        type="radio"
                                        className="input-radio"
                                        name="payment_method"
                                        value="paypal"
                                        checked={
                                          this.state.paymentMethod === "paypal"
                                        }
                                        id={"payment_method_paypal"}
                                        onChange={(event) => {
                                          this.setState({
                                            paymentMethod: "paypal",
                                          });
                                        }}
                                      />

                                      <label htmlFor="payment_method_paypal">
                                        PayPal{" "}
                                        <img
                                          src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png"
                                          alt="PayPal acceptance mark"
                                        />
                                        <a
                                          href="https://www.paypal.com/gb/webapps/mpp/paypal-popup"
                                          className="about_paypal"
                                        >
                                          What is PayPal?
                                        </a>
                                      </label>
                                      {this.state.paymentMethod === "paypal" ? (
                                        <div className="payment_box payment_method_paypal">
                                          <p style={{ margin: 0 }}>
                                            Pay via PayPal; you can pay with
                                            your credit card if you don’t have a
                                            PayPal account.
                                          </p>
                                        </div>
                                      ) : null}
                                    </li>
                                    <li className="wc_payment_method payment_method_stripe">
                                      <input
                                        id="payment_method_stripe"
                                        type="radio"
                                        className="input-radio"
                                        name="payment_method"
                                        checked={
                                          this.state.paymentMethod === "stripe"
                                        }
                                        onChange={(event) => {
                                          this.setState({
                                            paymentMethod: "stripe",
                                          });
                                        }}
                                        value="stripe"
                                      />

                                      <label htmlFor="payment_method_stripe">
                                        Credit Card (Stripe){" "}
                                        <img
                                          src="https://www.sewconfident.co.uk/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                          className="stripe-visa-icon stripe-icon"
                                          alt="Visa"
                                        />
                                        <img
                                          src="https://www.sewconfident.co.uk/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                          className="stripe-amex-icon stripe-icon"
                                          alt="American Express"
                                        />
                                        <img
                                          src="https://www.sewconfident.co.uk/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                          className="stripe-mastercard-icon stripe-icon"
                                          alt="Mastercard"
                                        />{" "}
                                      </label>
                                      {this.state.paymentMethod === "stripe" ? (
                                        <div className="payment_box payment_method_stripe">
                                          <div>
                                            <p>
                                              Pay with your credit card via
                                              Stripe.
                                            </p>
                                            <div id="card-element"></div>
                                            <div
                                              id="card-errors"
                                              role="alert"
                                            ></div>
                                          </div>
                                        </div>
                                      ) : null}
                                    </li>
                                  </ul>
                                  <h3 className={"mt-5"}>Bonuses</h3>
                                  <div className={"place-order bonuses mt-0"}>
                                    <h4>
                                      {formatter.format(
                                        this.props.user.bonuses
                                      )}
                                    </h4>
                                    <div>
                                      <label htmlFor={"is_bonuses"}>
                                        <input
                                          id={"is_bonuses"}
                                          type={"checkbox"}
                                          className={"mr-2"}
                                          onChange={() => {
                                            this.setState({
                                              is_bonuses:
                                                !this.state.is_bonuses,
                                            });
                                          }}
                                          checked={this.state.is_bonuses}
                                        />
                                        <span>Use bonuses</span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className=" place-order mt-5">
                                    <div className="woocommerce-terms-and-conditions-wrapper">
                                      <div className="woocommerce-privacy-policy-text">
                                        <p>
                                          Your personal data will be used to
                                          process your order, support your
                                          experience throughout this website,
                                          and for other purposes described in
                                          our{" "}
                                          <a
                                            href="https://www.sewconfident.co.uk/blog/2019/09/27/2019-9-19-september-is-movie-month/"
                                            className="woocommerce-privacy-policy-link"
                                            target="_blank"
                                          >
                                            privacy policy
                                          </a>
                                          .
                                        </p>
                                      </div>
                                      {this.state.termsStatus ? (
                                        <div className="woocommerce-terms-and-conditions">
                                          <h2>Terms &amp; conditions</h2>
                                          <h2>Terms &amp; conditions</h2>
                                          <p>
                                            Please read our Terms and Condition
                                            carefully before ordering goods or
                                            booking a class/service on our
                                            website. All transactions are bound
                                            by these Terms and Conditions. you
                                            may want to print or save these
                                            Terms and Conditions for future
                                            reference.
                                          </p>
                                          <p>
                                            <strong>Coronavirus Update</strong>
                                          </p>
                                          <p>
                                            All our studios are open and
                                            following strict government
                                            guidelines to keep you and our
                                            tutors and staff safe. We have
                                            reduced class sizes and increased
                                            sanitisation of the studios with
                                            deep cleans between classes. We
                                            require anyone to wear a mask upon
                                            entering the studio or moving around
                                            the studio. However when seated and
                                            drinking tea you may remove your
                                            mask. We have minimised the amount
                                            of shared items instead offering
                                            sewing kits and packs that can be
                                            picked up in the studio, used and
                                            taken away with you. Upon booking
                                            you will be emailed your class
                                            specific information, what you need
                                            to bring and what you can expect
                                            from your class.
                                          </p>
                                          <p>
                                            In the event that we are locked down
                                            again all classes will be postponed
                                            until a later date. You may also opt
                                            for credit which can be used on any
                                            class not necessarily the one you
                                            booked. As per our normal terms and
                                            conditions we are not offering
                                            refunds for postponed classes. We
                                            hope you understand this is in place
                                            to protect the business and
                                            livelihoods of staff and make sure
                                            our studios make it out the other
                                            side of this unprecedented
                                            situation. If you have any concerns
                                            or questions about our new terms and
                                            conditions please get in touch{" "}
                                            <strong>
                                              hello@sewconfident.co.uk
                                            </strong>{" "}
                                            and we will endeavour to put your
                                            mind at ease.
                                          </p>
                                          <p>
                                            We hope you understand the processes
                                            we have in place are necessary to
                                            keep all our lovely customers,
                                            staff, tutors and franchisees are
                                            safe, well.
                                          </p>
                                          <p>
                                            As a small business, in this
                                            challenging time, We cannot thank
                                            you enough for your continued
                                            support throughout this and we hope
                                            to continue giving you some respite
                                            in the form of sewing from the daily
                                            stress of life. Look after yourself
                                            and we hope to get sewing with you
                                            soon!
                                          </p>
                                          <p>(updated 08/10/20)</p>
                                          <p>
                                            <strong>Classes/Events</strong>
                                          </p>
                                          <p>
                                            Please check the dates carefully
                                            prior to booking. Once an order is
                                            placed it{" "}
                                            <strong>cannot be refunded</strong>.
                                          </p>
                                          <p>
                                            If for any reason you are unable to
                                            attend please contact us and we will
                                            try to find someone to take your
                                            place.&nbsp;Sew Confident Ltd is not
                                            contractually bound to find a
                                            replacement but we can try to find
                                            someone as a good will gesture. If
                                            this is not possible feel free to
                                            send a substitute. If we find
                                            someone to take your place we can
                                            transfer you onto a later date or
                                            another class of your
                                            choice.&nbsp;If you book a workshop
                                            for several days duration please
                                            make sure you can attend all
                                            days.&nbsp;
                                          </p>
                                          <p>
                                            All workshops must be paid for in
                                            full prior to the workshop. If you
                                            have paid a deposit this is non
                                            refundable. The total balance must
                                            be paid 7 days prior to the start of
                                            the workshop. If it is not paid you
                                            may lose your place and your
                                            deposit.
                                          </p>
                                          <p>
                                            Payment can be made on the website
                                            using a credit or debit card or
                                            PayPal. We do not store or have
                                            access to your bank details. This is
                                            securely processed by Stripe or
                                            PayPal.
                                          </p>
                                          <p>
                                            <strong>Refunds for Goods</strong>
                                          </p>
                                          <p>
                                            Any good purchased from the
                                            website(such as sewing supplies) can
                                            be returned to Sew Confident within
                                            14 working days of receiving the
                                            goods. You have the right under the
                                            The Consumer Contracts (Information,
                                            Cancellation and Additional Charges)
                                            Regulations 2013 to change your mind
                                            you may return the item(s) to us at
                                            your own cost. You will be refunded
                                            for the cost of the item only. All
                                            postage costs are non refundable.
                                            You will be refunded upon receipt of
                                            the item to us. It’s advised you
                                            send the goods back to us using a
                                            trackable service to ensure the good
                                            reach us. Goods must be returned in
                                            an saleable condition, with all
                                            original packaging.
                                          </p>
                                          <p>
                                            If you receive an item which is
                                            faulty or damaged please contact us
                                            as soon as possible. We will refund
                                            or replace the item within 30
                                            working days. If you would like to
                                            return goods please use the form at
                                            the bottom of the page and we will
                                            be in touch with our return address
                                            etc.
                                          </p>
                                          <p>
                                            <strong>
                                              Other T&amp;CS Regarding Goods
                                              Sold
                                            </strong>
                                          </p>
                                          <p>
                                            Stock may not be updated at time of
                                            purchase so delays or refunds may be
                                            issued.
                                          </p>
                                          <p>
                                            Our website is manually updated so
                                            pricing and stock errors may occur,
                                            in the event this does happen,
                                            orders may be cancelled until
                                            correct amount is paid by the
                                            customer.
                                          </p>
                                          <p>
                                            <strong>
                                              Sewing Machine Guarantees
                                            </strong>
                                          </p>
                                          <p>
                                            All Elna and Janome sewing machines
                                            include a 2 year manufacturers
                                            guarantee. This includes the cost of
                                            labour and parts. This does not
                                            include general wear and tear parts
                                            such as needles, blades, belts,
                                            looper, bobbins etc. If you have any
                                            problems with your machine please
                                            contact us.&nbsp;
                                          </p>
                                          <p>
                                            Sew Confident is a Registered
                                            Trademark of Sew Confident Ltd. No
                                            part of this website or any in class
                                            paperwork/handouts may be reproduced
                                            or used for anything other than
                                            personal use without prior
                                            consent.&nbsp;
                                          </p>
                                          <p>
                                            Sew Confident Ltd reserve the right
                                            to amend these Terms and Conditions
                                          </p>
                                          <h2>Returns Form</h2>
                                          <p>
                                            <img
                                              width="500"
                                              height="500"
                                              src="https://www.sewconfident.co.uk/wp-content/uploads/2020/09/Sewing-Machine-Submark.png"
                                              alt=""
                                              loading="lazy"
                                            />
                                          </p>
                                          <h2>Latest News</h2>
                                          <p>
                                            <a
                                              href="https://www.facebook.com/Sewconfidentltd/"
                                              target="_blank"
                                              rel="noopener"
                                            >
                                              <br />
                                              Facebook
                                              <br />
                                            </a>
                                            <br />
                                            <a
                                              href="https://www.instagram.com/sewconfident/"
                                              target="_blank"
                                              rel="noopener"
                                            >
                                              <br />
                                              Instagram
                                              <br />
                                            </a>
                                            <br />
                                            <a
                                              href="https://twitter.com/SewConfident"
                                              target="_blank"
                                              rel="noopener"
                                            >
                                              <br />
                                              Twitter
                                              <br />
                                            </a>
                                            <br />
                                            <a
                                              href="https://www.pinterest.co.uk/sewconfident/"
                                              target="_blank"
                                              rel="noopener"
                                            >
                                              <br />
                                              Pinterest
                                              <br />
                                            </a>
                                          </p>
                                          <h2>
                                            Need supplies? Visit our online
                                            shop!
                                          </h2>
                                          <ul>
                                            <li>
                                              <a href="https://www.sewconfident.co.uk/sewing-machines">
                                                {" "}
                                                Sewing Machines
                                                <br />
                                              </a>
                                            </li>
                                            <li>
                                              <a href="https://www.sewconfident.co.uk/sewing-machine-accessories">
                                                {" "}
                                                Machine Accessories
                                                <br />
                                              </a>
                                            </li>
                                            <li>
                                              <a href="https://www.sewconfident.co.uk/fabric">
                                                {" "}
                                                Fabric
                                                <br />
                                              </a>
                                            </li>
                                            <li>
                                              <a href="https://www.sewconfident.co.uk/haberdashery">
                                                {" "}
                                                Haberdashery
                                                <br />
                                              </a>
                                            </li>
                                            <li>
                                              <a href="https://www.sewconfident.co.uk/vouchers-gifts">
                                                {" "}
                                                Vouchers
                                                <br />
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      ) : null}

                                      <p className="form-row validate-required">
                                        <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
                                          <input
                                            type="checkbox"
                                            className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
                                            name="terms"
                                            id="terms"
                                          />
                                          <span
                                            className="woocommerce-terms-and-conditions-checkbox-text"
                                            style={{
                                              margin: " 0 0 0 .3819820591em",
                                            }}
                                          >
                                            I have read and agree to the website{" "}
                                            <a
                                              href="https://www.sewconfident.co.uk/tscs/"
                                              className="woocommerce-terms-and-conditions-link"
                                              target="_blank"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                this.setState({
                                                  termsStatus:
                                                    !this.state.termsStatus,
                                                });
                                              }}
                                            >
                                              terms and conditions
                                            </a>
                                          </span>
                                          &nbsp;
                                          <span className="required">*</span>
                                        </label>
                                      </p>
                                    </div>

                                    {this.state.paymentMethod === "paypal" ? (
                                      <>
                                        <div id={"paypal-button-container"} />
                                        <button
                                          type={"button"}
                                          id="stripe_payment"
                                          onClick={() => {
                                            this.createOrder().then(
                                              (response) => {
                                                this.setState(
                                                  {
                                                    order: { ...response.data },
                                                  },
                                                  () => {
                                                    this.props
                                                      .createPaypalOrder(
                                                        this.state.order.id
                                                      )
                                                      .then((response) => {
                                                        window.location.href =
                                                          response.data.links.approve;
                                                      });
                                                  }
                                                );
                                              }
                                            );
                                          }}
                                        >
                                          Place Order
                                        </button>
                                      </>
                                    ) : null}
                                    {this.state.paymentMethod === "stripe" ? (
                                      <div>
                                        <button
                                          type={"button"}
                                          id="stripe_payment"
                                          onClick={() => {
                                            let errors = this.validForm();

                                            if (!checkErrors(errors)) {
                                              this.onClickStripeHandler();
                                              this.setState({
                                                errors: { ...errors },
                                              });
                                              //this.createOrder();
                                            } else {
                                              this.setState({
                                                errors: { ...errors },
                                              });
                                            }
                                          }}
                                        >
                                          Place Order
                                        </button>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                              <span style={{ clear: "both" }}></span>
                            </form>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <CheckoutThankYou order={this.state.order} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ShopBanner />
        <Loader status={this.state.isLoader} />
        {this.state.paypalModal ? <iframe src={this.state.frameUrl} /> : null}
      </MainLayout>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user.user,
    promocode: state.cart.promocode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRemoteCart: () => {
      return dispatch(getRemoteCart());
    },
    createOrder: (data) => {
      return dispatch(createOrder(data));
    },
    createPayment: (data) => {
      return dispatch(createPayment(data));
    },
    setPaymentToOrder: (data) => {
      return dispatch(setPaymentToOrder(data));
    },
    cartClear: () => {
      return dispatch(cartClear());
    },
    createCustomer: () => {
      return dispatch(createCustomer());
    },
    createPaypalOrder: (order_id) => {
      return dispatch(createPaypalOrder(order_id));
    },
    createPaymentIntent: (data) => {
      return dispatch(createPaymentIntent(data));
    },
    userDiscount: (invite) => {
      return dispatch(userDiscount(invite));
    },
    confirmVoucher: (code) => {
      return dispatch(confirmVoucher(code));
    },
    fetchSettings: () => {
      return dispatch(fetchSettings());
    },
    getStripePublicKey: () => {
      return dispatch(getStripePublicKey());
    },
    addPromocode: (promocode) => {
      return dispatch(addPromocode(promocode));
    },
    clearPromocodes: () => {
      return dispatch(clearPromocodes());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
