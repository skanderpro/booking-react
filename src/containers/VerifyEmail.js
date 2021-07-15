import React, { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { connect } from "react-redux";

class VerifyEmail extends Component {
  state = {
    status: "",
    message: "",
  };

  componentDidMount() {
    axios
      .get(`${atob(this.props.match.params.url)}`)
      .then((response) => {
        this.setState({
          message: response.data.message,
          status: "success",
        });
      })
      .catch((errors) => {
        this.setState({
          status: "error",
          message: "Some error",
        });
      });
  }

  render() {
    return (
      <>
        <MainLayout>
          <div className={"verify-container"}>
            <div className={"verify-block"}>
              <div className={`icon  ${this.state.status}`}>
                {this.state.status === "success" ? (
                  <i className="fas fa-check"></i>
                ) : null}
                {this.state.status === "error" ? (
                  <i className="fas fa-times"></i>
                ) : null}
              </div>
              <div className={"verify-message"}>{this.state.message}</div>
              <div className={"button-container"}>
                <button
                  type={"button"}
                  className={"btn btn-pink"}
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Continue to your account
                </button>
              </div>
            </div>
          </div>
        </MainLayout>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps)(VerifyEmail);
