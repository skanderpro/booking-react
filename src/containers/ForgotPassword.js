import React, { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import { forgotPassword } from "./../redux/actions/userActions";
import { connect } from "react-redux";
import { makeUrl } from "../redux/actions/functions";
import { NavLink } from "react-router-dom";

class ForgotPassword extends Component {
  state = {
    email: "",
  };

  render() {
    return (
      <MainLayout>
        <section className={"login-section"}>
          <div className={"login-container"}>
            <h2 className={"login-title"}>My account</h2>
            <h3>Forgot Password</h3>
            <p className="form-row form-row-wide">
              <div className={"col-12"}>
                <label htmlFor="username">
                  Email address&nbsp;<span className="required">*</span>
                </label>
                <span className="woocommerce-input-wrapper">
                  <input
                    type="text"
                    className="input-text "
                    name="username"
                    placeholder=""
                    value={this.state.email}
                    onChange={(e) => {
                      this.setState({
                        email: e.target.value,
                      });
                    }}
                  />
                </span>
              </div>
            </p>

            <p className="form-row">
              <div className={"col-12"}>
                <button
                  type="button"
                  className="form-login__submit"
                  name="login"
                  value="Log in"
                  onClick={() => {
                    this.props.forgotPassword(this.state.email);
                  }}
                >
                  Send
                </button>
              </div>
            </p>
            <p className="woocommerce-LostPassword lost_password">
              <NavLink to={makeUrl(`/login/`, this.props.match.params.invite)}>
                Login
              </NavLink>
            </p>
          </div>
        </section>
      </MainLayout>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    forgotPassword: (email) => {
      return dispatch(forgotPassword(email));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
