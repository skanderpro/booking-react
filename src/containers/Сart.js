import React, { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import ShopBanner from "../components/components/ShopBanner";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  removeLocalCart,
  getRemoteCart,
  removeRemoteCart,
  changeCartIsSet,
  importItemsToCart,
} from "../redux/actions/cartActions";
import { userDiscount } from "./../redux/actions/userActions";
import { makeUrl } from "./../redux/actions/functions";
import Cookies from "universal-cookie";
import {
  confirmVoucher,
  addPromocode,
  clearPromocodes,
} from "./../redux/actions/voucherActions";
import Loader from "../components/components/Loader";
import { fetchSettings } from "./../redux/actions/settingActions";

const cookies = new Cookies();

class Cart extends Component {
  state = {
    giftCardStatus: false,
    remoteItems: [],
    localItems: [],
    discount: 0,
    coupon: "",
    couponErrors: "",
    isLoader: true,
    giftCard: "",
    giftErrors: "",
    settings: {
      kartra_discount: 0,
    },

    promocodeDiscount: {},
  };

  componentDidMount() {
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
    this.props.fetchSettings().then((response) => {
      this.setState({
        settings: {
          ...response.data,
        },
      });
    });

    let token = cookies.get("token");
    if (!!token) {
      this.getRemoteCart();
    } else {
      this.setState({
        localItems: [...this.props.cartItems],
        isLoader: false,
      });
    }
  }

  getRemoteCart = () => {
    this.props.getRemoteCart().then((response) => {
      let items = [];
      console.log(response.data);
      response.data.items.map((item) => {
        items.push({
          id: item.id,
          name: item.product.product.name,
          image_url: item.product.product.image_url,
          price: item.product.product.price,
          set: item.set,
          is_set: item.is_set,
          sets: item.product.product.sets,
          product_id: item.product.id,
          type: item.type,
        });
      });

      this.setState({
        remoteItems: [...items],
        isLoader: false,
      });
    });
  };

  changeSet = (index, set) => {
    console.log(set);
    let carts = [...this.state.localItems];
    carts[index].set = set;
    this.setState(
      {
        localItems: [...carts],
      },
      () => {
        this.props.importItemsToCart(carts);
      }
    );
  };

  changeSetRemote = (index, set) => {
    let carts = [...this.state.remoteItems];
    carts[index].set = set;
    this.setState(
      {
        remoteItems: [...carts],
      },
      () => {
        this.props.changeCartIsSet(
          this.state.remoteItems[index].id,
          this.state.remoteItems[index].set
        );
      }
    );
  };

  renderSetKit = (cart, index) => {
    let token = cookies.get("token");
    if (!token) {
      return (
        <span>
          {cart.sets.length > 0 ? (
            <>
              <div>
                <input
                  type={"radio"}
                  checked={cart.set === 0}
                  onChange={() => {
                    this.changeSet(index, 0);
                  }}
                  style={{ marginRight: 10 }}
                />{" "}
                {"none"}
              </div>
              {cart.sets.map((set, indexSet) => {
                return (
                  <div key={`set_id_${indexSet}`}>
                    <input
                      type={"radio"}
                      checked={cart.set === set.id}
                      onChange={() => {
                        this.changeSet(index, set.id);
                      }}
                      style={{ marginRight: 10 }}
                    />{" "}
                    {set.name}
                  </div>
                );
              })}
            </>
          ) : null}
        </span>
      );
    } else {
      return (
        <span>
          {cart.sets.length > 0 ? (
            <>
              <div>
                <input
                  type={"radio"}
                  checked={cart.set === 0}
                  onChange={() => {
                    this.changeSetRemote(index, 0);
                  }}
                />{" "}
                {"none"}
              </div>
              {cart.sets.map((set, indexSet) => {
                return (
                  <div key={`set_id_${indexSet}`}>
                    <input
                      type={"radio"}
                      checked={cart.set === set.id}
                      onChange={() => {
                        this.changeSetRemote(index, set.id);
                      }}
                    />{" "}
                    {set.name}
                  </div>
                );
              })}
            </>
          ) : null}
        </span>
      );
    }
  };

  getSubTotalPrice = () => {
    let total = 0;
    let token = cookies.get("token");

    if (!token) {
      this.props.cartItems.map((item, index) => {
        total = total + this.getRemoteCartPrice(item);
      });
    } else {
      this.state.remoteItems.map((item, index) => {
        total = total + this.getRemoteCartPrice(item);
      });
    }

    return total;
  };

  getTotalPrice = () => {
    let subtotal = this.getSubTotalPrice();
    let discountKartra = this.props.user.is_kartra
      ? this.state.settings.kartra_discount / 100
      : 0;
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
      subtotal * (1 - this.state.discount - discountKartra - promocodePercent) -
      promocodeFixed;
    return subtotal;
  };

  removeLocalCart = (id) => {
    let items = [...this.state.localItems];
    let index = items.findIndex((x) => x.id === id);

    items.splice(index, 1);
    this.setState(
      {
        localItems: [...items],
      },
      () => {
        this.props.removeLocalCart(id);
        if (this.state.localItems.length === 0) {
          this.props.clearPromocodes();
        }
      }
    );
  };

  cartItemsRender = (items) => {
    let results = [];
    let token = cookies.get("token");
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GBP",
    });
    items.map((item, index) => {
      results.push(
        <tr
          key={`cart-item-${index}`}
          className="woocommerce-cart-form__cart-item cart_item"
        >
          <td className="product-remove">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();

                if (!token) {
                  this.removeLocalCart(item.id);
                } else {
                  this.props.removeRemoteCart(item.id).then((response) => {
                    this.getRemoteCart();
                  });
                }
              }}
              className="remove"
            >
              <i className="fas fa-times-circle"></i>
            </a>
          </td>

          <td className="product-thumbnail">
            <a href="https://www.sewconfident.co.uk/product/clear-glitter-pvc/">
              <img
                width="300"
                height="300"
                src={`${this.props.settings.mainUrl}/storage/${item.image_url}`}
                className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
              />
            </a>
          </td>

          <td className="product-name" data-title={"Product"}>
            <NavLink
              to={makeUrl(
                `/class-detail/${item.product_id}`,
                this.props.match.params.invite
              )}
              className={"product-title " + item.type}
            >
              {item.name}
            </NavLink>
          </td>

          <td className="product-price" data-title={"Price"}>
            <span className="woocommerce-Price-amount amount">
              <bdi>
                <span className="woocommerce-Price-currencySymbol">£</span>
                {item.price}
              </bdi>
            </span>
          </td>
          <td className={"product-set"}>{this.renderSetKit(item, index)}</td>

          <td className="product-subtotal" data-title={"Subtotal"}>
            <span className="woocommerce-Price-amount amount">
              <bdi>{formatter.format(this.getRemoteCartPrice(item))}</bdi>
            </span>
          </td>
        </tr>
      );
    });
    return results;
  };

  getRemoteCartPrice = (cart) => {
    console.log(cart);
    let price = 0;
    price += parseFloat(cart.price);
    if (cart.set !== 0) {
      let indexSet = cart.sets.findIndex((set) => set.id === cart.set);
      if (indexSet !== -1) {
        price += parseFloat(cart.sets[indexSet].price);
      }
    }
    if (cart) return price;
  };

  render() {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GBP",
    });
    let token = cookies.get("token");

    return (
      <MainLayout>
        <section className="cart-section">
          <div className="elementor-background-overlay"></div>
          <div className="elementor-container elementor-column-gap-default cart-container">
            <div className="elementor-row">
              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-3a13fe09">
                <div className="elementor-column-wrap elementor-element-populated">
                  <div className="elementor-widget-wrap">
                    <h2 className="cart-title">Shopping Cart</h2>

                    {(this.props.cartItems.length > 0 && !token) ||
                    (this.state.remoteItems.length > 0 && !!token) ? (
                      <div className="woocommerce">
                        <div className="woocommerce-notices-wrapper"></div>
                        <form className="woocommerce-cart-form">
                          <table
                            className="cart-items-list-table"
                            cellSpacing="0"
                          >
                            <thead>
                              <tr>
                                <th className="product-remove">&nbsp;</th>
                                <th className="product-thumbnail">&nbsp;</th>
                                <th className="product-name">Product</th>
                                <th className="product-price">Price</th>
                                <th className={"product-set"}>Set</th>
                                <th className="product-subtotal">Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!token
                                ? this.cartItemsRender(this.props.cartItems)
                                : this.cartItemsRender(this.state.remoteItems)}

                              <tr>
                                <td colSpan="5" className="actions">
                                  <div className={"coupon-block"}>
                                    <div className="coupon">
                                      <input
                                        type="text"
                                        name="coupon_code"
                                        className="input-text"
                                        id="coupon_code"
                                        value={this.state.coupon}
                                        placeholder="Coupon code"
                                        onChange={(e) => {
                                          this.setState({
                                            coupon: e.target.value,
                                          });
                                        }}
                                      />
                                      <button
                                        type="button"
                                        className="button"
                                        name="apply_coupon"
                                        value="Apply coupon"
                                        disabled={!token}
                                        onClick={() => {
                                          this.props
                                            .confirmVoucher(this.state.coupon)
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
                                    </div>
                                  </div>
                                  <div
                                    className={"error"}
                                    style={{ color: "#f00" }}
                                  >
                                    {this.state.couponErrors.length > 0
                                      ? this.state.couponErrors
                                      : null}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </form>

                        <div className="cart-collaterals row">
                          <div className={"col-lg-6"}></div>
                          <div className="cart_totals col-lg-6">
                            <h2>Cart totals</h2>

                            <table
                              cellSpacing="0"
                              className="shop_table shop_table_responsive"
                            >
                              <tbody>
                                <tr className="cart-subtotal">
                                  <th>Subtotal</th>
                                  <td data-title={"Subtotal"}>
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
                                    className="giftup-cart-subtotal-td"
                                    data-title={"Gift card"}
                                  >
                                    {!this.state.giftCardStatus ? (
                                      <a
                                        href="#"
                                        className="giftup-cart-subtotal-td-apply-gc d-inline-block"
                                        onClick={(event) => {
                                          event.preventDefault();
                                          this.setState({
                                            giftCardStatus: true,
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
                                      >
                                        <input
                                          className="giftup-cart-subtotal-td-form-input"
                                          type="text"
                                          id="giftcard_code"
                                          value={this.state.giftCard}
                                          onChange={(event) => {
                                            this.setState({
                                              giftCard: event.target.value,
                                            });
                                          }}
                                          placeholder="Gift card code"
                                          onKeyPress="return giftup_code_keypress()"
                                        />
                                        <button
                                          className="giftup-cart-subtotal-td-form-button"
                                          type="button"
                                          name="giftup_giftcard_button"
                                          value="Apply gift card"
                                          onClick={() => {
                                            this.props
                                              .confirmVoucher(
                                                this.state.giftCard
                                              )
                                              .then((response) => {
                                                if (
                                                  response.data.code_type ===
                                                  "promocode"
                                                ) {
                                                  this.props.addPromocode(
                                                    this.state.giftCard
                                                  );
                                                  this.setState({
                                                    promocode: response.data,
                                                  });
                                                }
                                              })
                                              .catch((errors) => {
                                                this.setState({
                                                  giftErrors:
                                                    errors.response.data.errors,
                                                });
                                              });
                                          }}
                                        >
                                          Apply
                                        </button>
                                      </div>
                                    ) : null}
                                    {this.state.giftErrors.length > 0 ? (
                                      <div>{this.state.giftErrors}</div>
                                    ) : null}
                                  </td>
                                </tr>

                                <tr className="order-total">
                                  <th>Total</th>
                                  <td data-title={"Total"}>
                                    <strong className={"d-block"}>
                                      <span className="woocommerce-Price-amount amount">
                                        <bdi>
                                          {formatter.format(
                                            this.getTotalPrice()
                                          )}
                                        </bdi>
                                      </span>
                                    </strong>
                                    <small className="includes_tax">
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
                              </tbody>
                            </table>

                            <div className="wc-proceed-to-checkout">
                              <div>
                                <div
                                  id="wc-stripe-payment-request-button"
                                  className="StripeElement"
                                >
                                  <div className="__PrivateStripeElement">
                                    <input
                                      className="__PrivateStripeElement-input"
                                      aria-hidden="true"
                                      aria-label=" "
                                      autoComplete="false"
                                      maxLength="1"
                                    />
                                  </div>
                                </div>
                              </div>
                              <p
                                className={"text-center"}
                                style={{ margin: "22px 0" }}
                              >
                                — OR —
                              </p>

                              <NavLink
                                to={makeUrl(
                                  "/checkout",
                                  this.props.match.params.invite
                                )}
                                className="checkout-button button alt wc-forward"
                              >
                                Proceed to checkout{" "}
                                <i className="fas fa-arrow-right"></i>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="cart-empty woocommerce-info">
                        <i className="far fa-square"></i>Your cart is currently
                        empty.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ShopBanner />
        <Loader status={this.state.isLoader} />
      </MainLayout>
    );
  }
}
function mapStateToProps(state) {
  return {
    cartItems: state.cart.items,
    settings: state.settings,
    user: state.user.user,
    promocode: state.cart.promocode,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    removeLocalCart: (id) => {
      return dispatch(removeLocalCart(id));
    },
    getRemoteCart: () => {
      return dispatch(getRemoteCart());
    },
    removeRemoteCart: (cart_id) => {
      return dispatch(removeRemoteCart(cart_id));
    },
    changeCartIsSet: (id, value) => {
      return dispatch(changeCartIsSet(id, value));
    },
    importItemsToCart: (items) => {
      dispatch(importItemsToCart(items));
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
    addPromocode: (promocode) => {
      return dispatch(addPromocode(promocode));
    },
    clearPromocodes: () => {
      return dispatch(clearPromocodes());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
