import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { makeUrl } from "../../redux/actions/functions";
import { connect } from "react-redux";

function ClassesList(props) {
  return (
    <>
      <h2 className={"portfolio-navs-header"}>Our Great Classes</h2>
      <div className={"portfolio-navs text-center"}>
        <span
          className={`d-inline-block portfolio-nav ${
            props.level === "" ? "active" : ""
          }`}
          onClick={() => {
            props.changeLevel("");
            props.searchClasses("");
          }}
        >
          All Levels
        </span>
        {props.levels.map((level, index) => {
          return (
            <span
              className={`d-inline-block portfolio-nav ${
                props.level === level ? "active" : ""
              }`}
              key={`portfolio-level-${index}`}
              onClick={() => {
                props.changeLevel(level);
                props.searchClasses(level);
              }}
            >
              {level}
            </span>
          );
        })}
      </div>
      <div className={"classes-list row"}>
        {props.classes.map((classItem, index) => {
          const linkParam = classItem.product.slug || classItem.id;

          return (
            <NavLink
              to={makeUrl(
                `/class-detail/${linkParam}`,
                props.match.params.invite
              )}
              className={"classes-item col-lg-4 col-md-6"}
              key={`classesItem_${index}`}
            >
              <div className={"classes-item-container"}>
                <div
                  className={"image-container"}
                  style={{
                    backgroundImage: `url(${
                      props.settings.mainUrl +
                      `/storage/${classItem.product.image_url}`
                    })`,
                  }}
                ></div>
                <div className={"text-container"}>
                  <span className={"btn btn-pink class-level d-inline-block"}>
                    {classItem.product.level}
                  </span>
                  <div className={"meta-block row"}>
                    <div className={"col-6 date-container"}>
                      <span className={"icon"}>
                        <i className="far fa-calendar-alt"></i>
                      </span>
                      <span className={"text"}>
                        {classItem.product.lesson_date}
                      </span>
                    </div>
                    <div className={"col-6 location-container"}>
                      <span className={"icon"}>
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                      <span className={"text"}>
                        {classItem.product.venue.name}
                      </span>
                    </div>
                  </div>
                  <div className={"class-title"}>{classItem.product.name}</div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
      <div className={"text-center "}>
        {props.isLoadMore ? (
          <button
            className={"btn btn-pink btn-lg"}
            onClick={() => {
              props.nextPage();
            }}
          >
            Load more
          </button>
        ) : null}
      </div>
    </>
  );
}
function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}
export default connect(mapStateToProps)(withRouter(ClassesList));
