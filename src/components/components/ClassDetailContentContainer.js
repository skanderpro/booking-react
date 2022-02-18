import React, { useEffect, useState } from "react";
import ClassAccordion from "./ClassAccordion";
import { makeUrl } from "./../../redux/actions/functions";
import ListPhotos from "./ListPhotos";
import { connect } from "react-redux";
import { searchClasses } from "../../redux/actions/classesAction";
import { NavLink, withRouter, Link } from "react-router-dom";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  ViberShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function ClassDetailContentContainer(props) {
  let social_title = props.classDetail.product.name;
  let social_link =
    window.location.origin +
    `/class-detail/${props.classDetail.id}/invite/${props.user.invite_code}`;
  let social_size = "100%";
  let [lessons, setLessons] = useState([]);
  useEffect(() => {
    props
      .searchClasses("", "", props.classDetail.product.venue.name, 1, 3)
      .then((response) => {
        setLessons([...response.data]);
      });
  }, []);

  let dates = props.classDetail.product.dates;
  let token = cookies.get("token");

  return (
    <React.Fragment>
      <div className={"class-detail-content-container row"}>
        <div className={"col-lg-8 content-col"}>
          <div
            dangerouslySetInnerHTML={{
              __html: props.classDetail.product.class_details,
            }}
          />
        </div>
        <div className={"col-lg-4 sidebar-col"}>
          <NavLink
            to={`/tutor-search/${props.classDetail.product.tutor.id}`}
            className={"tutor-widget d-block"}
          >
            <h2 className={"tutor-widget-header"}>Class tutor</h2>
            <div className={"tutor-image-container"}>
              <span
                className={"tutor-image"}
                style={{
                  backgroundImage: `url(${props.settings.mainUrl}/storage/${props.classDetail.product.tutor.avatar})`,
                }}
              />
            </div>
            <h3 className={"tutor-name"}>
              {props.classDetail.product.tutor.first_name}{" "}
              {props.classDetail.product.tutor.last_name}
            </h3>
            <p>{props.classDetail.product.tutor.bio_description}</p>
          </NavLink>

          <div className={"other-dates-widget"}>
            <h2>Other Dates</h2>
            <div className={"dates-list"}>
              {dates.map((date, index) => {
                return (
                  <NavLink
                    to={makeUrl(
                      `/class-detail/${date.id}`,
                      props.match.params.invite
                    )}
                    className={"dates-item d-block"}
                    key={`dates-item-${index}`}
                  >
                    <span className={"icon"}>
                      <i className="far fa-calendar-alt"></i>
                    </span>
                    {date.date}
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div className={"shares-widget"}>
            <h2>Share this event</h2>
            <ul className={"d-flex"}>
              <li>
                {/*<a href={""} className={"facebook"}>*/}
                <FacebookShareButton quote={social_title} url={social_link}>
                  <FacebookIcon size={social_size} />
                </FacebookShareButton>
                {/*<i className="fab fa-facebook-f"></i>*/}
                {/*</a>*/}
              </li>
              <li>
                <TwitterShareButton title={social_title} url={social_link}>
                  <TwitterIcon size={social_size} />
                </TwitterShareButton>
              </li>
              <li>
                <LinkedinShareButton title={social_title} url={social_link}>
                  <LinkedinIcon size={social_size} />
                </LinkedinShareButton>
              </li>
              <li>
                <ViberShareButton title={social_title} url={social_link}>
                  <ViberIcon size={social_size} />
                </ViberShareButton>
              </li>
              <li>
                <WhatsappShareButton title={social_title} url={social_link}>
                  <WhatsappIcon size={social_link} />
                </WhatsappShareButton>
              </li>
            </ul>
          </div>

          {!!token ? (
            <div className={"shares-widget"}>
              <button
                className={"btn btn-pink"}
                style={{ width: "100%" }}
                type={"button"}
                onClick={() => {
                  let origin =
                    window.location.origin +
                    `/class-detail/${props.classDetail.id}/invite/${props.user.invite_code}`;
                  window.navigator.clipboard.writeText(origin);
                }}
              >
                Copy Referal Link
              </button>
            </div>
          ) : null}
        </div>
        <div className={"col-12"}>
          <ClassAccordion classDetail={props.classDetail} />
          <h2>Where to Find Us</h2>
          <div className={"map-container"}>
            <div id={"g-map"}>
              <div
                style={{ height: 400 }}
                dangerouslySetInnerHTML={{
                  __html: props.classDetail.product.venue.google_maps_iframe,
                }}
              />
            </div>
          </div>
          <h2>Our previous classes</h2>
          <p>{props.classDetail.product.galery.title}</p>
          <ListPhotos galery={props.classDetail.product.galery} />
          <h2>Other classes you may like</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit
            elit, auctor vitae ligula quis, eleifend rutrum nulla. Vestibulum
            tristique pellentesque imperdiet. Suspendisse tempor accumsan justo,
            eu lobortis mi vehicula ac. Vivamus dapibus tellus mattis nisi
            dapibus, quis facilisis augue efficitur.
          </p>
          <div className={"classes-list row"}>
            {lessons.map((lesson, index) => {
              return (
                <NavLink
                  to={makeUrl(
                    `/class-detail/${lesson.id}`,
                    props.match.params.invite
                  )}
                  className={"classes-item col-lg-4"}
                  key={`class_item_${index}`}
                >
                  <div className={"classes-item-container"}>
                    <div
                      className={"image-container"}
                      style={{
                        backgroundImage: `url(${
                          props.settings.mainUrl +
                          `/storage/${lesson.product.image_url}`
                        })`,
                      }}
                    ></div>
                    <div className={"text-container"}>
                      <span
                        className={"btn btn-pink class-level d-inline-block"}
                      >
                        {lesson.product.level}
                      </span>
                      <div className={"meta-block row"}>
                        <div className={"col-6 date-container"}>
                          <span className={"icon"}>
                            <i className="far fa-calendar-alt"></i>
                          </span>
                          <span className={"text"}>
                            {lesson.product.lesson_date}
                          </span>
                        </div>
                        <div className={"col-6 location-container"}>
                          <span className={"icon"}>
                            <i className="fas fa-map-marker-alt"></i>
                          </span>
                          <span className={"text"}>
                            {lesson.product.venue.name}
                          </span>
                        </div>
                      </div>
                      <div className={"class-title"}>{lesson.product.name}</div>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
function mapStateToProps(state) {
  return {
    settings: state.settings,
    user: state.user.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    searchClasses: (level, search, location, page, limit) => {
      return dispatch(searchClasses(level, search, location, page, limit));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClassDetailContentContainer));
