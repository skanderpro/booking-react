import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { makeUrl } from "./../../redux/actions/functions";
const cookies = new Cookies();

const ProtectRoute = ({ component: Component, ...props }) => {
  let token = cookies.get("token");
  console.log(props);
  return (
    <Route
      {...props}
      render={(data) => {
        console.log(
          makeUrl("/login", props.computedMatch.params.invite),
          props.match
        );
        return (
          <React.Fragment>
            {!!token ? (
              <Component {...data} />
            ) : (
              <Redirect
                to={makeUrl("/login", props.computedMatch.params.invite)}
              />
            )}
          </React.Fragment>
        );
      }}
    />
  );
};
function mapStateToProps(state) {
  return {
    authToken: state.user.token,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProtectRoute));
