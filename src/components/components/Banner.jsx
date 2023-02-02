import React from "react";
import {useSelector} from "react-redux";

export const Banner = React.memo((props) => {
    const mainUrl = useSelector(state => state.settings.mainUrl);
    return (
        <a className="banner"
            href={props.banner.link}>
            {!!props.banner.title && <h5>{props.banner.title}</h5>}
            {!!props.banner.image && <img src={`${mainUrl}/storage/${props.banner.image}`} alt={props.banner.title} />}
            {!!props.banner.text && <p>{props.banner.text}</p>}
        </a>
    )
})