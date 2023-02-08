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
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
const cookies = new Cookies();

function WaitingListPopup(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="pink"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Waiting list
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>All seats are now full, but you can join the waiting list</p>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name Surname"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="email" placeholder="+447xxx818325" autoFocus />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-pink btn btn-primary"
          variant="primary"
          onClick={props.onHide}
        >
          Add to List
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function MainLayout(props) {
  let token = cookies.get("token");
  const [modalShow, setModalShow] = React.useState(false);
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
      <div className={"container-fluid "}>
        <Header />
        {props.children}
        <Footer />
      </div>

      <WaitingListPopup show={modalShow} onHide={() => setModalShow(false)} />
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
