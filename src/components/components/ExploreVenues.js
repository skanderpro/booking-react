import React from "react";
const feather = require('feather-icons')

function ExploreVenues() {
    return  <div className={'explore-venues-section'}>
        <div className={'explore-venues-container'}>
            <h2 className={'explore-venues-header'}>
                Explore our class venues
            </h2>
            <div className={'explore-list row'}>
                <div className={'explore-item col-lg-4'}>
                    <div className={'explore-item-container'}>
                        <div className={'explore-item-image'} style={{backgroundImage:`url(${require('./../../assets/images/venue1.jpg').default})`}}></div>
                        <div className={'explore-item-text'}>
                            <h3>
                                Glasgow, UK
                            </h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit elit, auctor vitae ligula quis, eleifend rutrum nulla.
                            </p>
                        </div>
                    </div>

                </div>
                <div className={'explore-item col-lg-4'}>
                    <div className={'explore-item-container'}>
                        <div className={'explore-item-image'} style={{backgroundImage:`url(${require('./../../assets/images/venue2.jpg').default})`}}></div>
                        <div className={'explore-item-text'}>
                            <h3>
                                Glasgow, UK
                            </h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit elit, auctor vitae ligula quis, eleifend rutrum nulla.
                            </p>
                        </div>
                    </div>

                </div>
                <div className={'explore-item col-lg-4'}>
                    <div className={'explore-item-container'}>
                        <div className={'explore-item-image'} style={{backgroundImage:`url(${require('./../../assets/images/venue3.jpg').default})`}}></div>
                        <div className={'explore-item-text'}>
                            <h3>
                                Glasgow, UK
                            </h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit elit, auctor vitae ligula quis, eleifend rutrum nulla.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <div className={'explore-navs'}>
                <button className={'btn btn-white-bordered arrow-button'}>  <span className={'icon icon-location'} dangerouslySetInnerHTML={{__html:feather.icons['arrow-left'].toSvg()}} /></button>
                <button className={'btn btn-white-bordered view-all-button'}>View All Venues</button>
                <button className={'btn btn-white-bordered arrow-button'}><span className={'icon icon-location'} dangerouslySetInnerHTML={{__html:feather.icons['arrow-right'].toSvg()}} /></button>
            </div>
        </div>



    </div>
}
export default ExploreVenues;