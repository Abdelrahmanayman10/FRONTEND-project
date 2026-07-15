import React from "react";


const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row">

          
          <div className="col-md-4 mb-4">
            <h4 className="footer-logo">
              <i className="bi bi-egg-fried me-2"></i> Bistro Bliss
            </h4>
            <p>
              In the new era of technology we look a in the future with certainty 
              and pride to for our company and.
            </p>
            <div className="footer-social mt-3">
              <a href="#"><i className="bi bi-twitter"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-github"></i></a>
            </div>
          </div>

     
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Pages</h6>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="pages">Blog</a></li>
              <li><a href="contact">Contact</a></li>
              <li><a href="#">Delivery</a></li>
            </ul>
          </div>

        
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Utility Pages</h6>
            <ul className="list-unstyled">
              <li><a href="#">Start Here</a></li>
              <li><a href="#">Styleguide</a></li>
              <li><a href="#">Password Protected</a></li>
              <li><a href="#">404 Not Found</a></li>
              <li><a href="#">Licenses</a></li>
              <li><a href="#">Changelog</a></li>
              <li><a href="#">View More</a></li>
            </ul>
          </div>

      
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Follow Us On Instagram</h6>
            <div className="row g-2 mt-2">
              <div className="col-6">
                <img src="\src\assets\food1.jpg" alt="food" className="img-fluid rounded" />
              </div>
              <div className="col-6">
                <img src="\src\assets\food2.jpg" alt="food" className="img-fluid rounded" />
              </div>
              <div className="col-6">
                <img src="\src\assets\food3.jpg" alt="food" className="img-fluid rounded" />
              </div>
              <div className="col-6">
                <img src="\src\assets\food4.jpg" alt="food" className="img-fluid rounded" />
              </div>
            </div>
          </div>

        </div>

        <hr className="border-secondary" />
        <p className="text-center mb-0">
          Copyright © 2023 Hashtag Developer. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
