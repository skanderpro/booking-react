import React, { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import { resetPassword } from "./../redux/actions/userActions";
import { connect } from "react-redux";
import { getMessages, makeUrl } from "./../redux/actions/functions";
import { Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class ResetPassword extends Component {
  state = {
    errors: false,
    formData: {
      newPassword: "",
      newPassword_c: "",
      email: "",
      token: "",
    },
  };

  componentDidMount() {
    // console.log(this.props.match.params);
    this.setState({
      formData: {
        ...this.state.formData,
        token: this.props.match.params.token,
        email: this.props.match.params.email,
      },
    });
  }

  render() {
    return (
      <MainLayout>
        <section className={"login-section"}>
          <div className={"login-container"}>
            <h2 className={"login-title"}>My account</h2>
            <h3>Reset Password</h3>
            {this.state.errors.length > 0 ? (
              <Alert variant={"danger"}>{this.state.errors.join(<br />)}</Alert>
            ) : null}

            <p className="form-row form-row-wide">
              <div className={"col-12"}>
                <label htmlFor="username">
                  New password&nbsp;<span className="required">*</span>
                </label>
                <span className="woocommerce-input-wrapper">
                  <input
                    type="text"
                    className="input-text "
                    name="username"
                    placeholder=""
                    value={this.state.formData.newPassword}
                    onChange={(e) => {
                      this.setState({
                        formData: {
                          ...this.state.formData,
                          newPassword: e.target.value,
                        },
                      });
                    }}
                  />
                </span>
              </div>
            </p>
            <p className="form-row form-row-wide">
              <div className={"col-12"}>
                <label htmlFor="username">
                  Confirm new password&nbsp;<span className="required">*</span>
                </label>
                <span className="woocommerce-input-wrapper">
                  <input
                    type="text"
                    className="input-text "
                    name="username"
                    placeholder=""
                    value={this.state.formData.newPassword_c}
                    onChange={(e) => {
                      this.setState({
                        formData: {
                          ...this.state.formData,
                          newPassword_c: e.target.value,
                        },
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
                    this.props
                      .resetPassword(this.state.formData)
                      .then((response) => {
                        this.setState(
                          {
                            errors: [],
                          },
                          () => {
                            this.props.history.push(
                              makeUrl(
                                !!this.props.match.params.invite === true
                                  ? "/home"
                                  : "/",
                                this.props.match.params.invite
                              )
                            );
                          }
                        );
                      })
                      .catch((errors) => {
                        this.setState({
                          errors: getMessages(errors.response.data.errors),
                        });
                      });
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
    resetPassword: (formData) => {
      return dispatch(resetPassword(formData));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
