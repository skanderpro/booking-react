import React, { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import HomeBanner from "../components/components/HomeBanner";
import ClassesList from "../components/components/ClassesList";
import { getPromoter, getPromoters } from "../redux/actions/promoters";
import { connect } from "react-redux";
import {
  fetchAllClasses,
  searchClassesPromoter,
} from "./../redux/actions/classesAction";
import Loader from "../components/components/Loader";
import ListTutors from "../components/components/ListTutors";

class TutorSearch extends Component {
  state = {
    promoter: {},
    classes: [],
    search: "",
    venue: "",
    level: "",
    venues: [],
    levels: [
      "Beginner",
      "Enthusiast",
      "Experienced",
      "Advanced",
      "Professional",
    ],
    page: 1,
    limit: 6,
    isLoadMore: true,
    isLoader: true,
    promoters: [],
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.loadPage(id).then((response) => {});
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      let id = this.props.match.params.id;
      this.loadPage(id).then((response) => {});
    }
  }

  loadPage = async (id) => {
    let promoter = await this.props.getPromoter(id);
    let promoters = await this.props.getPromoters();
    let classes = await this.props.searchClassesPromoter(
      promoter.data.id,
      this.state.level,
      this.state.page,
      this.state.limit
    );
    this.setState({
      promoter: { ...promoter.data },
      classes: [...classes.data],
      promoters: [...promoters.data],
      isLoader: false,
    });
  };

  changeLevel = (level) => {
    this.setState({ level: level });
  };
  searchClasses = () => {
    this.props
      .searchClassesPromoter(
        this.state.promoter.id,
        this.state.level,
        this.state.page,
        this.state.limit
      )
      .then((response) => {
        this.setState({
          classes: [...response.data],
          isLoadMore: response.data.length === this.state.limit,
        });
      });
  };
  nextPage = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.props
          .searchClassesPromoter(
            this.state.promoter.id,
            this.state.level,
            this.state.page,
            this.state.limit
          )
          .then((response) => {
            let classes = [...this.state.classes];
            classes = classes.concat(response.data);
            this.setState({
              classes: [...classes],
              isLoadMore: response.data.length === this.state.limit,
            });
          });
      }
    );
  };
  render() {
    console.log(this.state.promoters);
    return (
      <MainLayout>
        <div className={"home-page"}>
          <HomeBanner
            imageUrl={
              require("./../assets/images/3c7f5381e2dd10744597d4ffe67b8f38.jpg")
                .default
            }
          >
            <div>
              <h2>{`${this.state.promoter.first_name} ${this.state.promoter.last_name}`}</h2>
              <h4>{this.state.promoter.venue}</h4>
              <span
                style={{
                  backgroundImage: `url(${
                    this.props.settings.mainUrl +
                    "/storage/" +
                    this.state.promoter.avatar
                  })`,
                }}
              />
            </div>
          </HomeBanner>
          <div className={"classes-section"}>
            <div className={"classes-container"}>
              <ClassesList
                level={this.state.level}
                levels={this.state.levels}
                classes={this.state.classes}
                changeLevel={this.changeLevel}
                nextPage={this.nextPage}
                searchClasses={() => {
                  this.setState({ page: 1, isLoadMore: true }, () => {
                    this.searchClasses();
                  });
                }}
                isLoadMore={this.state.isLoadMore}
              />

              <ListTutors
                promoters={this.state.promoters}
                promoter={this.state.promoter}
              />
            </div>
          </div>
        </div>
        <Loader status={this.state.isLoader} />
      </MainLayout>
    );
  }
}
function mapStateToProps(state) {
  return { settings: state.settings };
}
function mapDispatchToProps(dispatch) {
  return {
    getPromoter: (id) => {
      return dispatch(getPromoter(id));
    },
    fetchAllClasses: () => {
      return dispatch(fetchAllClasses());
    },
    searchClassesPromoter: (id, level, page, limit) => {
      return dispatch(searchClassesPromoter(id, level, page, limit));
    },
    getPromoters: () => {
      return dispatch(getPromoters());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TutorSearch);
