import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import {
  checkProfile,
  logout,
  setUserProfile,
} from "../redux/actions/userActions";

const cookies = new Cookies();

function MainLayout(props) {
  let token = cookies.get("token");
  useEffect(() => {
    if (!!token) {
      props
        .checkProfile()
        .then((response) => {
          props.setUserProfile(response.data);
        })
        .catch((error) => {
          cookies.remove("token");
          props.logout();
        });
    }
  }, []);

  return (
    <React.Fragment>
      <div className={"container-fluid"}>
        <Header />
        {props.children}
        <Footer />
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    setUserProfile: (user) => {
      return dispatch(setUserProfile(user));
    },
    checkProfile: () => {
      return dispatch(checkProfile());
    },
    logout: () => {
      return dispatch(logout());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
