import React from "react";

export default function Aboutus1() {
  return (
    <section className="about-section container py-5">
      <div className="row align-items-center">
      
        <div className="col-md-6 position-relative">
          <img
            src="\src\assets\food2.2.jpg"
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
          <h2 className="fw-bold mb-3">We provide healthy food for your family.</h2>
          <p className="text-muted mb-4">
            Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance. Rooted in city's rich culinary culture, we aim to honor our local roots while infusing a global palate.
          </p>
          <p>
            At place, we believe that dining is not just about food, but also about the overall experience. Our staff, renowned for their warmth and dedication, strives to make every visit an unforgettable event.
          </p>
        </div>
      </div>
    </section>
  );
}
