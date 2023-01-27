import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { putEmailToGroup } from "./../../redux/actions/mailerliteActions";
import { NotificationManager } from "react-notifications";

function MailContainer(props) {
	useEffect(() => { }, []);
	let [email, setEmail] = useState("");

	return (
		<div className={"mail-container"}>
			<div className={"row no-gutters"}>
				<div className={" text-block"}>
					<h2>Join Our Mailing List</h2>
					<p>
						Get all updates directly to your inbox
					</p>
				</div>
				<div className={"form-block"}>
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
					<FormControl as="select" className={"select-footer"} aria-label="Default select example">
						<option>Open this select menu</option>
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</FormControl>
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
