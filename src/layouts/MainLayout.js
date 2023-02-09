import React, {useEffect, useState} from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {connect, useDispatch, useSelector} from "react-redux";
import Cookies from "universal-cookie";
import {
  checkProfile,
  logout,
  setUserProfile,
} from "../redux/actions/userActions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {NotificationManager} from "react-notifications";
import {addToWaitList, setShowWaitingListMpodal} from "../redux/actions/promoters";
const cookies = new Cookies();

function WaitingListPopup(props) {
  console.log('popup', props);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await props.storeWaitlistItem({
      'full_name': fullName,
        'email':email,
        'phone': phone,
        'type': props.classDetail.type,
        'product_id': props.classDetail.product.id,
    });
  };

  const addClickHandler = e => {
    props.onHide();

    formSubmitHandler(e);
  };

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
        <Form onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name Surname"
              autoFocus
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
                type="email"
                value={phone}
                onChange={e => setPhone(e.target.value)}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-pink btn btn-primary"
          variant="primary"
          onClick={addClickHandler}
        >
          Add to List
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function MainLayout(props) {
  let token = cookies.get("token");
  const dispatch = useDispatch();
  const showModal = useSelector((state) =>state.cart.showWaitlistModal);
  const [modalShow, setModalShow] = React.useState(true);
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

      <WaitingListPopup show={showModal} storeWaitlistItem={props.storeWaitlistItem} onHide={() => dispatch(setShowWaitingListMpodal(false))} classDetail={props.classDetail} />
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  console.log('state', state);
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    storeWaitlistItem: (data) => {
      dispatch(addToWaitList({
        ...data
      }));

      return NotificationManager.success('Adding you to waitlist was succedeed');
    },
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
