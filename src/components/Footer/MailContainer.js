import React, { useState, useEffect } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { putEmailToGroup } from "./../../redux/actions/mailerliteActions";
import { NotificationManager } from "react-notifications";

function MailContainer(props) {
  useEffect(() => {}, []);
  let [email, setEmail] = useState("");

  return (
    <div className={"mail-container"}>
      <div className={"row no-gutters"}>
        <div className={" text-block"}>
          <h2>Join Our Mailing List</h2>
          <p>
            Be the first to know about exclusive shop discounts, product
            restocks and new launches. Sign up to the Sew Confident mailing
            list!
          </p>
        </div>
        <div className={" form-block"}>
          <InputGroup>
            <FormControl
              placeholder="Your email"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <InputGroup.Append>
              <button
                className={"btn"}
                onClick={() => {
                  props
                    .putEmailToGroup(email)
                    .then((response) => {
                      if (!response.data.hasOwnProperty("error")) {
                        NotificationManager.success("Subscribe success");
                      } else {
                        NotificationManager.error(response.data.error.message);
                      }

                      setEmail("");
                    })
                    .catch((errors) => {
                      NotificationManager.error("Some error");
                    });
                }}
              >
                Subscribe
              </button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    putEmailToGroup: (email) => {
      return dispatch(putEmailToGroup(email));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MailContainer);
