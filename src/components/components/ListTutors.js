import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function ListTutors(props) {
  return (
    <div className={"tutor-list-container"}>
      <h2>Tutor List</h2>
      <div className={"tutor-list row"}>
        {props.promoters.map((tutor, index) => {
          return (
            <Link
              className={"col-md-4 tutor-list-item d-block"}
              key={`tutor_index_${index}`}
              to={`/tutor-search/${tutor.id}`}
            >
              <span
                style={{
                  backgroundImage: `url(${
                    props.settings.mainUrl + "/storage/" + tutor.avatar
                  })`,
                }}
              />
              <h4>{`${tutor.first_name} ${tutor.last_name}`}</h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return { settings: state.settings };
}
export default connect(mapStateToProps)(ListTutors);
