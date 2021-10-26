import React, { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import DetailClassTopBanner from "../components/components/DetailClassTopBanner";
import ClassDetailTopBlock from "../components/components/ClassDetailTopBlock";
import ClassDetailContentContainer from "../components/components/ClassDetailContentContainer";
import ShopBanner from "../components/components/ShopBanner";
import { fetchClass } from "./../redux/actions/classesAction";
import { addLocalCart, addRemoteCart } from "./../redux/actions/cartActions";
import { connect } from "react-redux";
import Loader from "../components/components/Loader";

class ClassDetail extends Component {
  state = {
    classItem: {},
    isLoader: true,
  };

  componentDidMount() {
    window.onresize = (event) => {
      this.calcClassDetailTopContainer();
    };
    let class_id = this.props.match.params.id;
    this.fetchClass(class_id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let class_id = this.props.match.params.id;
    let prev_class_id = prevProps.match.params.id;
    if (class_id !== prev_class_id) {
      this.fetchClass(class_id);
    }
  }

  fetchClass = (class_id) => {
    this.props.fetchClass(class_id).then((response) => {
      this.setState(
        {
          classItem: { ...response.data },
          isLoader: false,
        },
        () => {
          this.calcClassDetailTopContainer();
        }
      );
    });
  };

  calcClassDetailTopContainer = () => {
    let height = document.getElementById("class-detail-top-block").offsetHeight;
    document.getElementById("class-detail-container").style.paddingTop = `${
      170 + 90 + (height - 410)
    }px`;
  };

  addToCart = (classItem) => {
    this.props.addLocalCart(classItem);
  };

  addRemoteCart = (lesson_id, is_set, type) => {
    return this.props.addRemoteCart(lesson_id, is_set, type);
  };

  render() {
    return (
      <MainLayout>
        <DetailClassTopBanner />
        <div
          className={"class-detail-container"}
          onLoad={this.calcClassDetailTopContainer}
          id={"class-detail-container"}
        >
          {Object.keys(this.state.classItem).length > 0 ? (
            <React.Fragment>
              <ClassDetailTopBlock
                classDetail={this.state.classItem}
                addToCart={this.addToCart}
                addRemoteCart={this.addRemoteCart}
              />
              <ClassDetailContentContainer classDetail={this.state.classItem} />
            </React.Fragment>
          ) : null}
        </div>
        <ShopBanner />
        <Loader status={this.state.isLoader} />
      </MainLayout>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    fetchClass: (class_id) => {
      return dispatch(fetchClass(class_id));
    },
    addLocalCart: (classItem) => {
      return dispatch(addLocalCart(classItem));
    },
    addRemoteCart: (lesson_id, is_set, type) => {
      return dispatch(addRemoteCart(lesson_id, is_set, type));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ClassDetail);
