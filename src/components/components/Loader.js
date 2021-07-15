import React, { useState } from "react";
import { connect } from "react-redux";
import SquareLoader from "react-spinners/SquareLoader";

function Loader({ props, status }) {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#FF7DD1");
  return (
    <div
      className={"loader-container"}
      style={{
        display: status ? "flex" : "none",
      }}
    >
      <div className={"text-center mb-3"}>
        <SquareLoader color={color} loading={loading} size={30} />
      </div>
      <div className={"text-center"}>
        <img src={`${require("./../../assets/images/logo.png").default}`} />
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
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Loader);
