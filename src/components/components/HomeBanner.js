import React from "react";

function HomeBanner(props) {
  return (
    <div
      className={"home-banner"}
      style={{ backgroundImage: `url(${props.imageUrl})` }}
    >
      <h2>{props.title}</h2>
    </div>
  );
}
export default HomeBanner;
