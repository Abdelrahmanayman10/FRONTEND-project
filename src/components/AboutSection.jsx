import React from "react";

export default function AboutSection() {
  return (
    <section className="about-section container py-5">
      <div className="row align-items-center">
      
        <div className="col-md-6 position-relative">
          <img
            src="\src\assets\food.jpg"
            alt="Delicious food"
            className="img-fluid rounded"
          />
          <div className="contact-card bg-white shadow p-3 rounded">
            <h5>Come and visit us</h5>
            <p>
              📍 837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles <br />
              📞 (414) 857 - 0107 <br />
              ✉️ happytummy@restaurant.com
            </p>
          </div>
        </div>

      
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">We provide healthy food for your family</h2>
          <p className="text-muted mb-4">
            Our mission is to bring delicious, nutritious meals to your table.
            We use only the freshest ingredients to ensure every bite is both
            healthy and satisfying.
          </p>
         <a href="/about"> <button className="btn btn-dark px-4" >More About Us</button></a>
        </div>
      </div>
    </section>
  );
}
