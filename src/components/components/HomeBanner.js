import React from 'react';

function HomeBanner(props) {
    return <div className={'home-banner'} style={{backgroundImage:`url(${props.imageUrl})`}}>
        <h2>Sew Confident Classes</h2>
    </div>
}
export default HomeBanner;