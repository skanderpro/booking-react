import React, {Component} from "react";
import Slider from "react-slick";
 import 'slick-carousel/slick/slick.css';
 import "slick-carousel/slick/slick-theme.css";
const feather = require('feather-icons');



class  ExploreVenues extends Component{
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows:false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,

                    }
                },
                {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
         return  <div className={'explore-venues-section'}>
            <div className={'explore-venues-container'}>
            <h2 className={'explore-venues-header'}>
                Explore our class venues
            </h2>
                <Slider ref={c => (this.slider = c)} {...settings} className={'explore-list row'}>
                    <div className={'explore-item '}>
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
                    <div className={'explore-item'}>
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
                    <div className={'explore-item '}>
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
                    <div className={'explore-item '}>
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
                    <div className={'explore-item'}>
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
                    <div className={'explore-item '}>
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
                </Slider>


            <div className={'explore-navs'}>
                <button className={'btn btn-white-bordered arrow-button'} onClick={this.previous}>  <span className={'icon icon-location'} dangerouslySetInnerHTML={{__html:feather.icons['arrow-left'].toSvg()}} /></button>
                <button className={'btn btn-white-bordered view-all-button'}>View All Venues</button>
                <button className={'btn btn-white-bordered arrow-button'} onClick={this.next}><span className={'icon icon-location'} dangerouslySetInnerHTML={{__html:feather.icons['arrow-right'].toSvg()}} /></button>
            </div>
        </div>
         </div>
    }
}
export default ExploreVenues;