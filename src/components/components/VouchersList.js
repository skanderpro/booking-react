import React, { useState, useEffect } from "react";
import { fetchVouchers } from "./../../redux/actions/voucherActions";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";
import { addLocalCart, addRemoteCart } from "../../redux/actions/cartActions";
import {NotificationManager} from "react-notifications";
const cookies = new Cookies();

function VouchersList(props) {
  let [vouchers, setVouchers] = useState([]);
  useEffect(() => {
    props.fetchVouchers().then((response) => {
      setVouchers(response.data);
    });
  }, []);
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });
  console.log(window.navigator.geolocation);
  return (
    <div className={"classes-section"}>
      <div className={"classes-container"}>
        <h2 className="portfolio-navs-header">Vouchers</h2>
        <div className={"classes-list row"}>
          {vouchers.map((voucher, index) => {
            return (
              <div
                className={"classes-item col-lg-4 col-md-6"}
                key={`voucher-item-${index}`}
              >
                <div className={"classes-item-container"}>
                  <div
                    className={"image-container"}
                    style={{
                      backgroundImage: `url(${
                        props.settings.mainUrl +
                        `/storage/${voucher.product.image_url}`
                      })`,
                    }}
                  ></div>
                  <div className={"text-container"}>
                    <div className={"class-title"}>{voucher.product.name}</div>
                    <div className={"mt-2 mb-3"}>
                      {formatter.format(voucher.product.price)}
                    </div>
                    <div>
                      <button
                        type={"button"}
                        className={"btn btn-pink"}
                        onClick={() => {
                          let token = cookies.get("token");
                          if (!token) {
                            props.addLocalCart(voucher);
                          } else {
                            props.addRemoteCart(voucher.id, false, "voucher");
                          }

                          NotificationManager.success("Added to cart");
                          setTimeout(() => {
                            window.location.href = '/cart'
                          },2000)
                        }}
                      >
                        Add to Cart
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchVouchers: () => {
      return dispatch(fetchVouchers());
    },
    addLocalCart: (classItem) => {
      return dispatch(addLocalCart(classItem));
    },
    addRemoteCart: (lesson_id, is_set, type) => {
      return dispatch(addRemoteCart(lesson_id, is_set, type));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(VouchersList);
