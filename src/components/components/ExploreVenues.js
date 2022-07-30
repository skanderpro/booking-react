import React, { Component } from "react";
import Slider from "react-slick";
import { fetchAllVenues } from "./../../redux/actions/venueActions";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const feather = require("feather-icons");

class ExploreVenues extends Component {
  state = {
    venues: [],
  };

  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllVenues().then((response) => {
      this.setState({
        venues: [...response.data],
      });
    });
  }

  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: this.state.venues.length > 3 ? 3 : this.state.venues.length,
      slidesToScroll: this.state.venues.length > 3 ? 3 : this.state.venues.length,
      adaptiveHeight: false,
      arrows: true,
      prevArrow: (
        <button
          className={"btn btn-white-bordered arrow-button"}
          onClick={this.previous}
        >
          {" "}
          <span
            className={"icon icon-location"}
            dangerouslySetInnerHTML={{
              __html: feather.icons["arrow-left"].toSvg(),
            }}
          />
        </button>
      ),
      nextArrow: (
        <button
          className={"btn btn-white-bordered arrow-button"}
          onClick={this.next}
        >
          <span
            className={"icon icon-location"}
            dangerouslySetInnerHTML={{
              __html: feather.icons["arrow-right"].toSvg(),
            }}
          />
        </button>
      ),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className={"explore-venues-section"}>
        <div className={"explore-venues-container"}>
          <h2 className={"explore-venues-header"}>Explore our class venues</h2>
          <Slider
            ref={(c) => (this.slider = c)}
            {...settings}
            className={"explore-list row"}
          >
            {this.state.venues.map((venue, index) => {
              return (
                <div className={"explore-item "} key={`venue-slide-${index}`}>
                  <div className={"explore-item-container"}>
                    <div
                      className={"explore-item-image"}
                      style={{
                        backgroundImage: `url(${this.props.settings.mainUrl}/storage/${venue.image_url})`,
                      }}
                    ></div>
                    <div className={"explore-item-text"}>
                      <h3>{venue.name}</h3>
                      <p>{venue.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>

          {/*<div className={"explore-navs"}>*/}
          {/*  <button*/}
          {/*    className={"btn btn-white-bordered arrow-button"}*/}
          {/*    onClick={this.previous}*/}
          {/*  >*/}
          {/*    {" "}*/}
          {/*    <span*/}
          {/*      className={"icon icon-location"}*/}
          {/*      dangerouslySetInnerHTML={{*/}
          {/*        __html: feather.icons["arrow-left"].toSvg(),*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </button>*/}
          {/*  <button className={"btn btn-white-bordered view-all-button"}>*/}
          {/*    View All Venues*/}
          {/*  </button>*/}
          {/*  <button*/}
          {/*    className={"btn btn-white-bordered arrow-button"}*/}
          {/*    onClick={this.next}*/}
          {/*  >*/}
          {/*    <span*/}
          {/*      className={"icon icon-location"}*/}
          {/*      dangerouslySetInnerHTML={{*/}
          {/*        __html: feather.icons["arrow-right"].toSvg(),*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllVenues: () => {
      return dispatch(fetchAllVenues());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ExploreVenues);
