import React from "react";

function ShopBanner() {
    return <div className={'shop-banner'} style={{backgroundImage:`url(${require('./../../assets/images/offcuts-banner.png').default})`}}>
        <div className={'shop-banner-nav-container'}>
            <h2>Need supplies? Visit our online shop!</h2>
            <ul>
                <li><a href={''}>SEWING MACHINES</a></li>
                <li><a href={''}>MACHINE ACCESSORIES</a></li>
                <li><a href={''}>FABRIC</a></li>
                <li><a href={''}>HABERDASHERY</a></li>
                <li><a href={''}>VOUCHERS</a></li>
            </ul>
        </div>
    </div>
}
export default ShopBanner;