import React from "react";
import coverImg from "/src/assets/cover.jpg"; 

const AboutUs = () => {
  return (
    <section className="about-us">

      
      <div className="about-hero" 
       style={{ backgroundImage: `url(${coverImg})` }}>
        <div className="overlay"></div>
        <div className="content text-center">
          <div className="play-btn">
            <i className="bi bi-play-fill"></i>
          </div>
          <h2 className="about-title">
            Feel the authentic & <br /> original taste from us
          </h2>
        </div>
      </div>

      
      <div className="container about-services py-5">
        <div className="row text-center">

          <div className="col-md-4 mb-4">
            <div className="service-box">
              <i className="bi bi-journal-richtext service-icon"></i>
              <h5 className="fw-bold mt-3">Multi Cuisine</h5>
              <p>In the new era of technology we look in the future with certainty life.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="service-box">
              <i className="bi bi-bag-check service-icon"></i>
              <h5 className="fw-bold mt-3">Easy To Order</h5>
              <p>In the new era of technology we look in the future with certainty life.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="service-box">
              <i className="bi bi-alarm service-icon"></i>
              <h5 className="fw-bold mt-3">Fast Delivery</h5>
              <p>In the new era of technology we look in the future with certainty life.</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default AboutUs;
