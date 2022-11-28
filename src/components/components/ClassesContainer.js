import React, { useEffect } from "react";
import { Search } from "akar-icons";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { makeUrl } from "./../../redux/actions/functions";
import ClassesList from "./ClassesList";

const feather = require("feather-icons");

function ClassesContainer(props) {
  useEffect(() => {
    if (props.venues.length === 1) {
      props.changeVenue(props.venues[0].name);
    }
  }, []);

  return (
    <div className={"classes-section"}>
      <div className={"classes-container"}>
        <div className={"classes-search"} id={"classes-search"}>
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
                disabled={props.venues.length < 2}
              >
                {props.venues.length > 1 && <option value={""}>Class Location</option>}
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
        <ClassesList
          level={props.level}
          searchClasses={props.searchClasses}
          levels={props.levels}
          changeLevel={props.changeLevel}
          classes={props.classes}
          isLoadMore={props.isLoadMore}
          nextPage={props.nextPage}
        />
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
