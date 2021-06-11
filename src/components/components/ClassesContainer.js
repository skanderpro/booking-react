import React, { useEffect } from "react";
import { Search } from "akar-icons";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { makeUrl } from "./../../redux/actions/functions";

const feather = require("feather-icons");

function ClassesContainer(props) {
  useEffect(() => {}, []);

  return (
    <div className={"classes-section"}>
      <div className={"classes-container"}>
        <div className={"classes-search"}>
          <div className={"search-title"}>Class search</div>
          <div className={"search-navs row no-gutters"}>
            <div className={"col-lg-3 search-field-container"}>
              <div className={"input-container "}>
                <span className={"icon icon-search"}>
                  <Search />
                </span>
                <input
                  type={"text"}
                  className={"input-field"}
                  onChange={(event) => {
                    props.changeSearch(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className={"col-lg-3 location-container"}>
              <span
                className={"icon icon-location"}
                dangerouslySetInnerHTML={{
                  __html: feather.icons["map-pin"].toSvg(),
                }}
              />
              <select
                onChange={(event) => {
                  props.changeVenue(event.target.value);
                }}
              >
                <option value={""}>Class Location</option>
                {props.venues.map((venue, index) => {
                  return (
                    <option value={venue.name} key={`venue-select-${index}`}>
                      {venue.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={"col-lg-3 skill-container"}>
              <span
                className={"icon icon-skill"}
                dangerouslySetInnerHTML={{
                  __html: feather.icons["layers"].toSvg(),
                }}
              />
              <select
                value={props.level}
                onChange={(event) => {
                  props.changeLevel(event.target.value);
                }}
              >
                <option value={""}>Skill level</option>
                {props.levels.map((level, index) => {
                  return (
                    <option value={level} key={`level-select-${index}`}>
                      {level}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={"col-lg-3 button-container text-right"}>
              <button
                className={"btn btn-pink btn-search-classes "}
                onClick={() => {
                  props.searchClasses();
                }}
              >
                Find class
              </button>
            </div>
          </div>
        </div>
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
            return (
              <NavLink
                to={makeUrl(
                  `/class-detail/${classItem.id}`,
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
                          {classItem.product.dates}
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
                    <div className={"class-title"}>
                      {classItem.product.name}
                    </div>
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
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}
export default connect(mapStateToProps)(withRouter(ClassesContainer));
