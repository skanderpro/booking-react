import React, { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import ShopBanner from "../components/components/ShopBanner";

class CheckoutThankYou extends Component {
  state = {
    couponInfo: false,
    giftCardStatus: false,
    termsStatus: false,
    paymentMethod: "paypal",
    shippingAddress: true,
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

                    <div className="thank-you">
                      <div style={{ marginBottom: 20 }}>
                        Thank you. Your order has been received.{" "}
                      </div>
                      <table className={"shop_table"}>
                        <tr>
                          <td>
                            <div className={"title"}>Order number:</div>
                            <div className={"value"}>7032</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className={"title"}>Date:</div>
                            <div className={"value"}>April 29, 2021</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className={"title"}>Email:</div>
                            <div className={"value"}>admin@admin.com</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className={"title"}>Total:</div>
                            <div className={"value"}>
                              <span className="woocommerce-Price-currencySymbol">
                                £
                              </span>
                              5.75
                            </div>
                          </td>
                        </tr>
                      </table>
                      <h3>Order Details</h3>
                      <table className={"shop_table"}>
                        <tr>
                          <td className={"title bold"}>Product</td>
                          <td className={"value bold"}>Total</td>
                        </tr>
                        <tr>
                          <td
                            className={"title bold light"}
                            style={{ background: "#fdfdfd" }}
                          >
                            TEST PRODUCT &times; 1
                          </td>
                          <td
                            className={"value light"}
                            style={{ background: "#fdfdfd" }}
                          >
                            <span className="woocommerce-Price-currencySymbol">
                              £
                            </span>
                            5.75
                          </td>
                        </tr>
                        <tr>
                          <td className={"title  bold"}>Subtotal:</td>
                          <td className={"value"}>
                            <span className="woocommerce-Price-currencySymbol">
                              £
                            </span>
                            5.75
                          </td>
                        </tr>
                        <tr>
                          <td className={"title bold"}>Discount:</td>
                          <td className={"value"}>
                            <span className="woocommerce-Price-currencySymbol">
                              £
                            </span>
                            5.75
                          </td>
                        </tr>
                        <tr>
                          <td className={"title bold"}>Shipping:</td>
                          <td className={"value"}>Free shipping, lucky you!</td>
                        </tr>
                        <tr>
                          <td className={"title bold"}>Total</td>
                          <td className={"value"}>
                            <span className="woocommerce-Price-currencySymbol">
                              £
                            </span>
                            5.75
                          </td>
                        </tr>
                      </table>
                      <div className={"row"}>
                        <div className={"col-lg-6 address-block"}>
                          <h3>Billing Address</h3>
                          <div className={"address-row"}>Renatas Luzaitis</div>
                          <div className={"address-row"}>
                            Purple Moon Design
                          </div>
                          <div className={"address-row"}>
                            139 St Vincent Street
                          </div>
                          <div className={"address-row"}>Glasgow</div>
                          <div className={"address-row"}>-</div>
                          <div className={"address-row"}>G2 5JF</div>
                          <div className={"address-row"}>+447447901553</div>
                          <div className={"address-row"}>&nbsp;</div>
                          <div className={"address-row"}>admin@admin.com</div>
                        </div>
                        <div className={"col-lg-6 address-block"}>
                          <h3>Shipping Address</h3>
                          <div className={"address-row"}>Renatas Luzaitis</div>
                          <div className={"address-row"}>
                            Purple Moon Design
                          </div>
                          <div className={"address-row"}>
                            139 St Vincent Street
                          </div>
                          <div className={"address-row"}>Glasgow</div>
                          <div className={"address-row"}>-</div>
                          <div className={"address-row"}>G2 4TP</div>
                        </div>
                      </div>
                    </div>
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

export default CheckoutThankYou;
