import React from "react";

function ListPhotos() {
    return <div className={'list-photos row'}>
        <div className={'list-photos-item col-lg-4 col-md-6'}>
            <div className={'photo'} style={{backgroundImage:`url(${require('./../../assets/images/photo1.jpg').default})`}}></div>
        </div>
        <div className={'list-photos-item col-lg-4 col-md-6'}>
            <div className={'photo'} style={{backgroundImage:`url(${require('./../../assets/images/photo2.jpg').default})`}}></div>
        </div>
        <div className={'list-photos-item col-lg-4 col-md-6'}>
            <div className={'photo'} style={{backgroundImage:`url(${require('./../../assets/images/photo3.jpg').default})`}}></div>
        </div>
        <div className={'list-photos-item col-lg-4 col-md-6'}>
            <div className={'photo'} style={{backgroundImage:`url(${require('./../../assets/images/photo4.jpg').default})`}}></div>
        </div>
        <div className={'list-photos-item col-lg-4 col-md-6'}>
            <div className={'photo'} style={{backgroundImage:`url(${require('./../../assets/images/photo5.jpg').default})`}}></div>
        </div>
        <div className={'list-photos-item col-lg-4 col-md-6'}>
            <div className={'photo'} style={{backgroundImage:`url(${require('./../../assets/images/photo6.jpg').default})`}}></div>
        </div>
    </div>
}
export default ListPhotos;