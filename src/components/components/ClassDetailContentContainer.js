
import React,{useEffect} from "react";
import ClassAccordion from "./ClassAccordion";
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps"
import MapWithAMarker from "./GoogleMapComponent";
import ListPhotos from "./ListPhotos";


function ClassDetailContentContainer() {
    useEffect(() => {
       // let map = new google.maps.Map(document.getElementById('g-map'), {
       //      center: {lat: -34.397, lng: 150.644},
       //      zoom: 8
       //  });

    },[])

    return <React.Fragment>
        <div className={'class-detail-content-container row'}>
            <div className={'col-lg-8 content-col'}>
                <h2>About this class:</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit elit, auctor vitae ligula quis, eleifend rutrum nulla. Vestibulum tristique pellentesque imperdiet. Suspendisse tempor accumsan justo, eu lobortis mi vehicula ac. Vivamus dapibus tellus mattis nisi dapibus, quis facilisis augue efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit elit, auctor vitae ligula quis, eleifend rutrum nulla. Vestibulum tristique pellentesque imperdiet. Suspendisse tempor accumsan justo, eu lobortis mi vehicula ac. Vivamus dapibus tellus mattis nisi dapibus, quis facilisis augue efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <iframe id="ytplayer" type="text/html" width="640" height="360"
                        src="http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
                        frameBorder="0"/>
                <h2>During the class we’ll cover</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit elit, auctor vitae ligula quis, eleifend rutrum  nulla. Vestibulum tristique pellentesque imperdiet.</p>
                <ul>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>In velit elit, auctor vitae ligula quis, eleifend rutrum nulla.</li>
                    <li>Vestibulum tristique pellentesque imperdiet.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                </ul>

            </div>
            <div className={'col-lg-4 sidebar-col'}>
                <div className={'tutor-widget'}>
                    <h2 className={'tutor-widget-header'}>Class tutor</h2>
                    <div className={'tutor-image-container'}>
                        <span className={'tutor-image'} style={{backgroundImage:`url(${require('./../../assets/images/tutor_image.jpg').default})`}}></span>
                    </div>
                    <h3 className={'tutor-name'}>Veronica Turner</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit elit, auctor vitae ligula quis, eleifend rutrum nulla. Vestibulum tristique pellentesque imperdiet.
                    </p>

                </div>

                <div className={'other-dates-widget'}>
                    <h2>Other Dates</h2>
                    <div className={'dates-list'}>
                        <div className={'dates-item'}>
                            <span className={'icon'}><i className="far fa-calendar-alt"></i></span>
                            24/02/2021
                        </div>
                        <div className={'dates-item'}>
                            <span className={'icon'}><i className="far fa-calendar-alt"></i></span>
                            24/02/2021
                        </div>
                        <div className={'dates-item'}>
                            <span className={'icon'}><i className="far fa-calendar-alt"></i></span>
                            24/02/2021
                        </div>
                        <div className={'dates-item'}>
                            <span className={'icon'}><i className="far fa-calendar-alt"></i></span>
                            24/02/2021
                        </div>
                    </div>
                </div>

                <div className={'shares-widget'}>
                    <h2>Share this event</h2>
                    <ul>
                        <li><a href={''} className={'facebook'}><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href={''} className={'twitter'}><i className="fab fa-twitter"></i></a></li>
                        <li><a href={''} className={'linkedin'}><i className="fab fa-linkedin-in"></i></a></li>
                        <li><a href={''} className={'viber'}><i className="fab fa-viber"></i></a></li>
                        <li><a href={''} className={'instagram'}><i className="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
            <div className={'col-12'}>
                <ClassAccordion />
                <h2>Where to Find  Us</h2>
                <div className={'map-container'}>
                    <div id={'g-map'}>
                        <MapWithAMarker
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </div>
                </div>
                <h2>Our previous classes</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit elit, auctor vitae ligula quis, eleifend rutrum nulla. Vestibulum tristique pellentesque imperdiet. Suspendisse tempor accumsan justo, eu lobortis mi vehicula ac. Vivamus dapibus tellus mattis nisi dapibus, quis facilisis augue efficitur.
                </p>
               <ListPhotos />
               <h2>Other classes you may like</h2>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit elit, auctor vitae ligula quis, eleifend rutrum nulla. Vestibulum tristique pellentesque imperdiet. Suspendisse tempor accumsan justo, eu lobortis mi vehicula ac. Vivamus dapibus tellus mattis nisi dapibus, quis facilisis augue efficitur.</p>
                <div className={'classes-list row'}>
                    <div className={'classes-item col-lg-4'}>
                        <div className={'classes-item-container'}>
                            <div className={'image-container'} style={{backgroundImage:`url(${require('./../../assets/images/class1.jpg').default})`}}>

                            </div>
                            <div className={'text-container'}>
                                <span className={'btn btn-pink class-level d-inline-block'}>Beginner</span>
                                <div className={'meta-block row'}>
                                    <div className={'col-6 date-container'}>
                                        <span className={'icon'}><i className="far fa-calendar-alt"></i></span>
                                        <span className={'text'}>23/02/2021</span>
                                    </div>
                                    <div className={'col-6 location-container'}>
                                        <span className={'icon'}><i className="fas fa-map-marker-alt"></i></span>
                                        <span className={'text'}>Glasgow, UK</span>
                                    </div>

                                </div>
                                <div className={'class-title'}>
                                    Relax with some <span>knitting & crochet</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={'classes-item col-lg-4'}>
                        <div className={'classes-item-container'}>
                            <div className={'image-container'} style={{backgroundImage:`url(${require('./../../assets/images/class2.jpg').default})`}}>

                            </div>
                            <div className={'text-container'}>
                                <span className={'btn btn-pink class-level d-inline-block'}>Beginner</span>
                                <div className={'meta-block row'}>
                                    <div className={'col-6 date-container'}>
                                        <span className={'icon'}><i className="far fa-calendar-alt"></i></span>
                                        <span className={'text'}>23/02/2021</span>
                                    </div>
                                    <div className={'col-6 location-container'}>
                                        <span className={'icon'}><i className="fas fa-map-marker-alt"></i></span>
                                        <span className={'text'}>Glasgow, UK</span>
                                    </div>

                                </div>
                                <div className={'class-title'}>
                                    Relax with some <span>knitting & crochet</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={'classes-item col-lg-4'}>
                        <div className={'classes-item-container'}>
                            <div className={'image-container'} style={{backgroundImage:`url(${require('./../../assets/images/class3.jpg').default})`}}>

                            </div>
                            <div className={'text-container'}>
                                <span className={'btn btn-pink class-level d-inline-block'}>Beginner</span>
                                <div className={'meta-block row'}>
                                    <div className={'col-6 date-container'}>
                                        <span className={'icon'}><i className="far fa-calendar-alt"></i></span>
                                        <span className={'text'}>23/02/2021</span>
                                    </div>
                                    <div className={'col-6 location-container'}>
                                        <span className={'icon'}><i className="fas fa-map-marker-alt"></i></span>
                                        <span className={'text'}>Glasgow, UK</span>
                                    </div>

                                </div>
                                <div className={'class-title'}>
                                    Relax with some <span>knitting & crochet</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </React.Fragment>
}
export default ClassDetailContentContainer;