import React, { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import ShopBanner from "../components/components/ShopBanner";
import { connect } from "react-redux";
import { loadOrder } from "../redux/actions/orderActions";
import CheckoutThankYouContainer from "../components/components/CheckoutThankYou";
import {
  approvalPaypal,
  createPayment,
  setPaymentToOrder,
} from "../redux/actions/paymentActions";
import { withRouter } from "react-router-dom";
import { cartClear, getRemoteCart } from "../redux/actions/cartActions";

class CheckoutThankYou extends Component {
  state = {
    couponInfo: false,
    giftCardStatus: false,
    termsStatus: false,
    paymentMethod: "paypal",
    shippingAddress: true,
    order: {},
  };

  componentDidMount() {
    let id = this.props.match.params.order_id;
    let payment_method = this.props.match.params.payment_method;
    if (payment_method === "paypal") {
      this.initPage(id).then((response) => {});
    }
    if (payment_method === "stripe") {
      this.props.loadOrder(id).then((response) => {
        this.setState({
          order: { ...response.data },
        });
      });
    }
  }

  initPage = async (id) => {
    try {
      let order = await this.props.loadOrder(id);
      let token = this.parseUrl("token");
      let approval = await this.props.approvalPaypal(order.data.id, token);
      if (approval.data.result.status === "COMPLETED") {
        let transaction = await this.props.createPayment({
          type: "paypal",
          payment_system_id: order.data.id,
          successfulness: 1,
          amount: order.data.total_price,
        });

        this.props
          .setPaymentToOrder({
            transaction_id: transaction.data.id,
            order_id: order.data.id,
          })
          .then((response) => {});

        this.props.cartClear().then(() => {});
        this.props.getRemoteCart().then(() => {});
        this.setState({
          order: { ...order.data },
        });
      } else {
        this.props.history.push("/checkout");
      }
    } catch (e) {
      this.props.history.push("/checkout");
    }
  };

  parseUrl = (name) => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    return url.searchParams.get(name);
  };
  render() {
    return (
      <MainLayout>
        <section className="checkout-section">
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
                    {Object.keys(this.state.order).length > 0 ? (
                      <CheckoutThankYouContainer order={this.state.order} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ShopBanner />
      </MainLayout>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    loadOrder: (order_id) => {
      return dispatch(loadOrder(order_id));
    },
    approvalPaypal: (order_id, token) => {
      return dispatch(approvalPaypal(order_id, token));
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
    getRemoteCart: () => {
      return dispatch(getRemoteCart());
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CheckoutThankYou));
