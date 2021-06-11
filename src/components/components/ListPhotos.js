import React, { useState, useCallback } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import {connect} from "react-redux";

function ListPhotos(props) {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = ( photo, index ) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    };

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };



    return <React.Fragment>
        <div className={'list-photos row'}>
            {
                props.galery.images.map((image,index) => {
                   let url =  (image.replace(/\\/g, '/'));
                   console.log(url)
                   return  <div className={'list-photos-item col-lg-4 col-md-6'} key={`image_galery-${index}`}>
                        <div className={'photo'} style={{backgroundImage:`url(${props.settings.mainUrl}/storage/${url})`}} onClick={(event) => {

                            openLightbox(image,index);
                        }}/>
                    </div>
                })
            }


        </div>
        <ModalGateway>
            {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                    <Carousel
                        currentIndex={currentImage}
                        views={props.galery.images.map(x => ({

                            source: `${props.settings.mainUrl}/storage/${x.replace(/\\/g, '/')}`,
                            caption:'',
                            width: 3,
                            height: 4,
                            regular:'1'
                        }))}
                    />
                </Modal>
            ) : null}
        </ModalGateway>
    </React.Fragment>
}
function mapStateToProps(state) {
   return {
       settings:state.settings
   };
}
function mapDispatchToProps(dispatch) {
    return {}
}
export default connect(mapStateToProps,mapDispatchToProps) (ListPhotos);