import React from "react";

function HomeBanner(props) {
  return (
    <div
      className={"home-banner"}
      style={{ backgroundImage: `url(${props.imageUrl})` }}
    >
      {props.children}
    </div>
  );
}
export default HomeBanner;
