import React, { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import HomeBanner from "../components/components/HomeBanner";
import ClassesContainer from "../components/components/ClassesContainer";
import ExploreVenues from "../components/components/ExploreVenues";
import { connect } from "react-redux";
import {
  fetchAllClasses,
  searchClasses,
} from "./../redux/actions/classesAction";
import { fetchAllVenues } from "./../redux/actions/venueActions";
import VouchersList from "../components/components/VouchersList";
import Loader from "../components/components/Loader";

class Home extends Component {
  state = {
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
  };

  componentDidMount() {
    this.props
      .searchClasses(
        this.state.level,
        this.state.search,
        this.state.venue,
        this.state.page,
        this.state.limit
      )
      .then((response) => {
        this.setState({
          classes: [...response.data],
          isLoadMore: response.data.length === this.state.limit,
          isLoader: false,
        });
      });
    this.props.fetchAllVenues().then((response) => {
      this.setState({
        venues: [...response.data],
      });
    });
  }

  searchClasses = (level, search = "", venue = "", page = 1, limit = 3) => {
    this.props
      .searchClasses(level, search, venue, page, limit)
      .then((response) => {
        this.setState({
          classes: [...response.data],
          isLoadMore: response.data.length === this.state.limit,
        });
      });
  };

  changeLevel = (level) => {
    this.setState({ level: level });
  };

  changeVenue = (venue) => {
    this.setState({ venue: venue });
  };

  changeSearch = (search) => {
    this.setState({ search: search });
  };

  nextPage = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.props
          .searchClasses(
            this.state.level,
            this.state.search,
            this.state.venue,
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
    return (
      <MainLayout>
        <div className={"home-page"}>
          <HomeBanner
            imageUrl={
              require("./../assets/images/3c7f5381e2dd10744597d4ffe67b8f38.jpg")
                .default
            }
          />
          <ClassesContainer
            classes={this.state.classes}
            venue={this.state.venue}
            level={this.state.level}
            search={this.state.search}
            venues={this.state.venues}
            levels={this.state.levels}
            limit={this.state.limit}
            searchClasses={() => {
              this.setState({ page: 1, isLoadMore: true }, () => {
                this.searchClasses(
                  this.state.level,
                  this.state.search,
                  this.state.venue,
                  this.state.page,
                  this.state.limit
                );
              });
            }}
            changeLevel={this.changeLevel}
            changeVenue={this.changeVenue}
            changeSearch={this.changeSearch}
            isLoadMore={this.state.isLoadMore}
            nextPage={this.nextPage}
          />
          <VouchersList />
          <ExploreVenues />
        </div>
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
    fetchAllClasses: () => {
      return dispatch(fetchAllClasses());
    },
    searchClasses: (level, search, venue, page, limit) => {
      return dispatch(searchClasses(level, search, venue, page, limit));
    },
    fetchAllVenues: () => {
      return dispatch(fetchAllVenues());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
