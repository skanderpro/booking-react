import React, { useEffect } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";
import {SET_INVITE} from "../../redux/actions/actionTypes";
const cookies = new Cookies();

function ClassDetailTopBlock(props) {
  // useEffect(() => {});

  // console.log('props.classDetail', props.classDetail);

  return (
    <div className={"class-detail-top-block "} id={"class-detail-top-block"}>
      <div className={"row"}>
        <div className={"col-lg-6 image-container"}>
          <div
            className={"image-block"}
            style={{
              backgroundImage: `url(${props.settings.mainUrl}/storage/${props.classDetail.product.image_url})`,
            }}
          >
            <span className={"class-level"}>
              {props.classDetail.product.level}
            </span>
          </div>
        </div>
        <div className={"col-lg-6 text-block"}>
          <div className={"meta-block row"}>
            <div className={"col-auto date-container"}>
              <span className={"icon"}>
                <i className="far fa-calendar-alt"></i>
              </span>
              <span className={"text"}>
                {props.classDetail.product.lesson_date}
              </span>
            </div>
            <div className={"col-auto location-container"}>
              <span className={"icon"}>
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <span className={"text"}>
                {props.classDetail.product.venue.name}
              </span>
            </div>
          </div>
          <div className={"class-title"}>{props.classDetail.product.name}</div>
          <div className={"control-block"}>
            {props.classDetail.product.numbers_of_seats >
            props.classDetail.product.buyed_numbers_of_seats ? (
              <button
                className={"btn btn-dark-bordered btn-large"}
                onClick={() => {
                  let token = cookies.get("token");
                  if (!token) {
                    props.addToCart(props.classDetail);
                  } else {
                    props.addRemoteCart(
                      props.classDetail.id,
                      0,
                      props.classDetail.type
                    );
                  }
                  if (props.match.params.invite) {
                    props.setInviteCode(props.match.params.invite);
                  }
                  setTimeout(() => {
                    window.location.href = '/cart'
                  },2000)
                }}
              >
                Book class
              </button>
            ) : (<span className="sold-out static">Sold out</span>)}
				
            <span className={"d-inline-block availability-container"}>
              <div className={"title"}>Availability</div>
              <div className={"numbers"}>
                {props.classDetail.product.numbers_of_seats} /
                {props.classDetail.product.buyed_numbers_of_seats || '0'}
              </div>
            </span>
          </div>
			<div className="price-class">
				£ <span>50</span>
			</div>
        </div>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setInviteCode(invite) {
      console.log('invite', invite);
      dispatch({
        type: SET_INVITE,
        payload: {
          invite
        }
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ClassDetailTopBlock));
