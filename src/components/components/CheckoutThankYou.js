import React from "react";

function CheckoutThankYou(props) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });
  return (
    <div className="thank-you">
      <div style={{ marginBottom: 20 }}>
        Thank you. Your order has been received.{" "}
      </div>
      <table className={"shop_table"}>
        <tr>
          <td>
            <div className={"title"}>Order number:</div>
            <div className={"value"}>{props.order.id}</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className={"title"}>Date:</div>
            <div className={"value"}>{props.order.date}</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className={"title"}>Email:</div>
            <div className={"value"}>{props.order.billing_address.email}</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className={"title"}>Total:</div>
            <div className={"value"}>
              {formatter.format(props.order.total_price)}
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
        {props.order.carts.map((cart, index) => {
          return (
            <tr key={`cart-item-${index}`}>
              <td
                className={"title bold light"}
                style={{ background: "#fdfdfd" }}
              >
                {cart.product.name}
              </td>
              <td className={"value light"} style={{ background: "#fdfdfd" }}>
                {formatter.format(cart.price)}
              </td>
            </tr>
          );
        })}

        <tr>
          <td className={"title  bold"}>Subtotal:</td>
          <td className={"value"}>{formatter.format(props.order.subtotal)}</td>
        </tr>
        <tr>
          <td className={"title bold"}>Discount:</td>
          <td className={"value"}>{formatter.format(props.order.discount)}</td>
        </tr>
        <tr>
          <td className={"title bold"}>Shipping:</td>
          <td className={"value"}>Free shipping, lucky you!</td>
        </tr>
        <tr>
          <td className={"title bold"}>Total</td>
          <td className={"value"}>
            {formatter.format(props.order.total_price)}
          </td>
        </tr>
      </table>
      <div className={"row"}>
        <div className={"col-lg-6 address-block"}>
          <h3>Billing Address</h3>
          <div className={"address-row"}>
            {props.order.billing_address.first_name}{" "}
            {props.order.billing_address.last_name}
          </div>
          <div className={"address-row"}>
            {props.order.billing_address.company}
          </div>
          <div className={"address-row"}>
            {props.order.billing_address.street}
          </div>
          <div className={"address-row"}>
            {props.order.billing_address.city}
          </div>
          <div className={"address-row"}>
            {props.order.billing_address.state}
          </div>
          <div className={"address-row"}>
            {props.order.billing_address.apartment}
          </div>
          <div className={"address-row"}>
            {props.order.billing_address.phone}
          </div>
          <div className={"address-row"}>
            {props.order.billing_address.postCode}
          </div>
          <div className={"address-row"}>
            {props.order.billing_address.email}
          </div>
        </div>
        {props.order.shipping_address !== null ? (
          <div className={"col-lg-6 address-block"}>
            <h3>Shipping Address</h3>
            <div className={"address-row"}>
              {props.order.shipping_address.first_name}{" "}
              {props.order.shipping_address.last_name}
            </div>
            <div className={"address-row"}>
              {props.order.shipping_address.company}
            </div>
            <div className={"address-row"}>
              {props.order.shipping_address.street}
            </div>
            <div className={"address-row"}>
              {props.order.shipping_address.city}
            </div>
            <div className={"address-row"}>
              {props.order.shipping_address.state}
            </div>
            <div className={"address-row"}>
              {props.order.shipping_address.apartment}
            </div>
            <div className={"address-row"}>
              {props.order.shipping_address.postCode}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default CheckoutThankYou;
