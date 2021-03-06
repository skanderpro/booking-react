import React, { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import { Alert } from "react-bootstrap";
import { login } from "../redux/actions/userActions";
import { connect } from "react-redux";
import { loginCart } from "../redux/actions/cartActions";
import { withRouter, NavLink } from "react-router-dom";
import { makeUrl } from "./../redux/actions/functions";
import FacebookLogin from "react-facebook-login";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import { loginWithFacebook } from "./../redux/actions/facebookActions";
import { NotificationManager } from "react-notifications";

const cookies = new Cookies();

class Login extends Component {
  state = {
    formData: {
      email: "",
      password: "",
    },
    errors: [],
  };

  componentDidMount() {}

  validate = () => {
    let errors = [];

    if (this.state.formData.email === "") {
      errors.push("The email field is required.");
    }

    if (this.state.formData.password === "") {
      errors.push("The password field is required.");
    }

    return errors;
  };

  handleFacebookLogin = (response) => {
    const { accessToken } = response;
    this.props.loginWithFacebook(accessToken).then((response) => {
      cookies.set("token", response.data.token, {
        sameSite: "strict",
      });

      this.props.loginCart().then((response) => {
        window.location.href = makeUrl(
          !!this.props.match.params.invite === true ? "/home" : "/",
          this.props.match.params.invite
        );
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <MainLayout>
          <section className={"login-section"}>
            <div className={"login-container"}>
              <h2 className={"login-title"}>My account</h2>
              <h3>Login</h3>
              {this.state.errors.length > 0 ? (
                <Alert variant={"danger"}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.errors.join("<br/>"),
                    }}
                  />
                </Alert>
              ) : null}

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
                      value={this.state.formData.email}
                      onChange={(e) => {
                        this.setState({
                          formData: {
                            ...this.state.formData,
                            email: e.target.value,
                          },
                        });
                      }}
                    />
                  </span>
                </div>
              </p>
              <p className="form-row form-row-wide">
                <div className={"col-12"}>
                  <label htmlFor="password">
                    Password&nbsp;<span className="required">*</span>
                  </label>
                  <span className="woocommerce-input-wrapper">
                    <input
                      type="password"
                      className="input-text "
                      name="password"
                      placeholder=""
                      onChange={(e) => {
                        this.setState({
                          formData: {
                            ...this.state.formData,
                            password: e.target.value,
                          },
                        });
                      }}
                      value={this.state.formData.password}
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
                      let errors = this.validate();
                      if (errors.length === 0) {
                        this.setState(
                          {
                            errors: [],
                          },
                          () => {
                            this.props
                              .login(this.state.formData)
                              .then((response) => {
                                NotificationManager.success("Login success");
                                cookies.set("token", response.data.token, {
                                  sameSite: "strict",
                                });

                                this.props.loginCart().then((response) => {
                                  window.location.href = makeUrl(
                                    !!this.props.match.params.invite === true
                                      ? "/home"
                                      : "/",
                                    this.props.match.params.invite
                                  );
                                });
                              })
                              .catch((errors) => {
                                // NotificationManager.success("good");
                                let resultErrors = [...this.state.errors];
                                resultErrors.push(
                                  "Email or password is incorrect!"
                                );
                                this.setState({
                                  errors: [...resultErrors],
                                });
                              });
                          }
                        );
                      } else {
                        this.setState({
                          errors,
                        });
                      }
                    }}
                  >
                    Log in
                  </button>
                </div>
              </p>
              <p>
                <FacebookLogin
                  appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                  fields="name,email,picture"
                  callback={this.handleFacebookLogin}
                  render={(renderProps) => (
                    <Button
                      variant="primary"
                      block
                      onClick={renderProps.onClick}
                      // disabled={this.props.loading}
                      outline
                    >
                      Sign in with Facebook
                    </Button>
                  )}
                />
              </p>
              <p className="woocommerce-LostPassword lost_password">
                <NavLink
                  to={makeUrl(
                    `/forgot-password/`,
                    this.props.match.params.invite
                  )}
                >
                  Lost your password?
                </NavLink>
              </p>
            </div>
          </section>
        </MainLayout>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    login: (formData) => {
      return dispatch(login(formData));
    },
    loginCart: () => {
      return dispatch(loginCart());
    },
    loginWithFacebook: (access_token) => {
      return dispatch(loginWithFacebook(access_token));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
