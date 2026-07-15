import React from "react";
import leftImg from "../assets/hero-left.jpg";
import rightImg from "../assets/hero-right.jpg";

export default function Hero() {
  return (
    <header className="hero-wrap position-relative">
      
      <img src={leftImg} alt="left" className="hero-img hero-left d-none d-md-block" />
      <img src={rightImg} alt="right" className="hero-img hero-right d-none d-md-block" />

      <div className="container position-relative">
        <div className="hero-content text-center mx-auto">
          <h1 className="display-3 fw-semibold lh-tight hero-title">
            Best food for<br />your taste
          </h1>
          <p className="text-secondary mx-auto hero-sub">
            Discover delectable cuisine and unforgettable moments
            in our welcoming, culinary haven.
          </p>

          <div className="d-flex gap-3 justify-content-center mt-4">
            <a href="/book-table" className="btn btn-danger rounded-pill px-4 py-3">
              Book A Table
            </a>
            <a href="/menu" className="btn btn-outline-dark rounded-pill px-4 py-3">
              Explore Menu
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
