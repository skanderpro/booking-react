import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import ClassDetail from "./containers/ClassDetail";
import Cart from "./containers/Сart";
import Checkout from "./containers/Checkout";
import CheckoutThankYou from "./containers/CheckoutThankYou";
import Login from "./containers/Login";
import Registration from "./containers/Registration";
import ForgotPassword from "./containers/ForgotPassword";
import ProtectRoute from "./components/components/ProtectRoute";
import GuestRoute from "./components/components/GuestRoute";
import ScrollTop from "./components/components/ScrollTop";
import {
  setUserProfile,
  checkProfile,
  logout,
} from "./redux/actions/userActions";
import { fetchSettings } from "./redux/actions/settingActions";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import TestPaymant from "./containers/TestPaymant";
import VerifyEmail from "./containers/VerifyEmail";
import { NotificationContainer } from "react-notifications";
import ReactGA from "react-ga";
import ResetPassword from "./containers/ResetPassword";
import TutorSearch from "./containers/TutorSearch";

const cookies = new Cookies();

function App(props) {
  // let token = cookies.get("token");
  useEffect(() => {
    props.fetchSettings();
    ReactGA.initialize("UA-000000-01");
    ReactGA.pageview(window.location.pathname + window.location.search);
    //   if (!!token) {
    //     props
    //       .checkProfile()
    //       .then((response) => {
    //         props.setUserProfile(response.data);
    //       })
    //       .catch((error) => {
    //         cookies.remove("token");
    //         props.logout();
    //       });
    //   }
  }, []);
  return (
    <div className="App">
      <ScrollTop />
      <Switch>
        <Route path={"/home/invite/:invite"} component={Home} />
        <Route path={"/home"} exact component={Home} />
        <Route path={"/"} exact component={Home} />

        <Route
          path={"/class-detail/:id/invite/:invite"}
          component={ClassDetail}
        />
        <Route path={"/class-detail/:id"} component={ClassDetail} />

        <Route path={"/cart/invite/:invite"} component={Cart} />
        <Route path={"/cart"} component={Cart} />

        <ProtectRoute path={"/checkout/invite/:invite"} component={Checkout} />
        <Route path={"/checkout"} component={Checkout} />

        <ProtectRoute
          path={"/checkout-thank-you/:payment_method/:order_id"}
          component={CheckoutThankYou}
        />

        <GuestRoute path={"/login/invite/:invite"} component={Login} />
        <GuestRoute path={"/login"} component={Login} />

        <GuestRoute
          path={"/register/invite/:invite"}
          component={Registration}
        />
        <GuestRoute path={"/register"} component={Registration} />

        <Route
          path={"/forgot-password/invite/:invite"}
          component={ForgotPassword}
        />
        <Route path={"/forgot-password"} component={ForgotPassword} />
        <Route path={"/verify-email/:url+"} component={VerifyEmail} />
        <Route path={"/tutor-search/:id"} component={TutorSearch} />
        <GuestRoute
          path={"/reset-password/token/:token/email/:email"}
          component={ResetPassword}
        />
        {/*<Route path={"/test-payment"} component={TestPaymant} />*/}
      </Switch>
      <NotificationContainer />
    </div>
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
    fetchSettings: () => {
      return dispatch(fetchSettings());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
