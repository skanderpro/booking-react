import React from "react";

function ClassDetailTopBlock() {
    return <div className={'class-detail-top-block '} id={'class-detail-top-block'}>
        <div className={'row'}>
            <div className={'col-lg-6 image-container'} >
                <div className={'image-block'} style={{backgroundImage:`url(${require('./../../assets/images/class4.jpg').default})`}}>
                    <span className={'class-level'}>
                        ENTHUSIAST
                     </span>
                </div>

            </div>
            <div className={'col-lg-6 text-block'}>
                <div className={'meta-block row'}>
                    <div className={'col-auto date-container'}>
                        <span className={'icon'}><i className="far fa-calendar-alt"></i></span>
                        <span className={'text'}>23/02/2021</span>
                    </div>
                    <div className={'col-auto location-container'}>
                        <span className={'icon'}><i className="fas fa-map-marker-alt"></i></span>
                        <span className={'text'}>Glasgow, UK</span>
                    </div>

                </div>
                <div className={'class-title'}>
                    Make a <span>lampshade</span> to
                    suit your interior
                </div>
                <div className={'control-block'}>
                    <button className={'btn btn-dark-bordered btn-large'}>Book class</button>
                    <span className={'d-inline-block availability-container'}>
                        <div className={'title'}>Availability</div>
                        <div className={'numbers'}>18/25</div>
                    </span>
                </div>
            </div>
        </div>
    </div>
}
export default ClassDetailTopBlock;