import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Cookies from "universal-cookie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cookies = new Cookies();

export function TestimonialsCarousel(props) {
  const [testimonials, setTestimonials] = useState([]);
  const mainUrl = useSelector(state => state.settings.mainUrl);

  useEffect(() => {
    fetch(`${mainUrl}/api/testimonials?type=${props.type}&id=${props.id}`).then(resp => resp.json()).then(setTestimonials);
  }, []);

  console.log('testimonials', testimonials);

  if (!testimonials.length) {
    return null;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  return (
    <div className="explore-swiper">
        <h2 >Testimonials</h2>
        <div >
          <Slider {...settings}>
            {testimonials.map(testimonial => {
              return (
                  <div key={`testimonial-${testimonial.id}`} className={"explore-item "} >
                    <div className={"explore-item-container"}>
                      <div
                          className={"explore-item-image"}
                          
                      >

                        <img src={`${mainUrl}/storage/${testimonial.image}`}/>
                      </div>
                      <div className={"explore-item-text"}>
                        <h3>{testimonial.author}</h3>
                        <p className="explore-item-text-text">{testimonial.text}</p>
                        <p>{testimonial.date}</p>
                      </div>
                    </div>
                  </div>
              )
            })}
          </Slider>
        </div>
    </div>
  );
}
