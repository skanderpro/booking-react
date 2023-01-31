import React from "react";

export const Banner = React.memo((props) => {
    return (
        <a className="banner"
            href={props.banner.link}>
            {!!props.banner.title && <h5>{props.banner.title}</h5>}
            {!!props.banner.image && <img src={props.banner.image} alt={props.banner.title} />}
            {!!props.banner.text && <p>{props.banner.text}</p>}
        </a>
    )
})