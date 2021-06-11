import React from "react";
import { makeUrl } from "../../redux/actions/functions";
import { Redirect, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const GuestRoute = ({ component: Component, ...props }) => {
  let token = cookies.get("token");
  console.log(props);
  return (
    <Route
      // path={this.props.path}
      // component={this.props.component}
      {...props}
      render={(data) => {
        return (
          <React.Fragment>
            {!!token || token !== undefined ? (
              <Redirect
                to={makeUrl(
                  !!props.computedMatch.params.invite === true ? "/home" : "/",
                  props.computedMatch.params.invite
                )}
              />
            ) : (
              <Component {...data} />
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
export default connect(mapStateToProps)(withRouter(GuestRoute));
