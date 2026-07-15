import React from "react";

const menuItems = [
  {
    icon: "bi-cup-hot",
    title: "Breakfast",
    text: "In the new era of technology we look in the future with certainty and pride for our life.",
  },
  {
    icon: "bi-cake",
    title: "Main Dishes",
    text: "In the new era of technology we look in the future with certainty and pride for our life.",
  },
  {
    icon: "bi-cup-straw",
    title: "Drinks",
    text: "In the new era of technology we look in the future with certainty and pride for our life.",
  },
  {
    icon: "bi-cake",
    title: "Desserts",
    text: "In the new era of technology we look in the future with certainty and pride for our life.",
  },
];

export default function MenuSection() {
  return (
    <section className="py-5">
      <div className="container text-center">
        <h2 className="mb-5 fw-semibold" style={{ color: "#4d5c52" }}>
          Browse Our Menu
        </h2>
        <div className="row g-4">
          {menuItems.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                <div
                  className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i className={`bi ${item.icon} fs-1 text-secondary`}></i>
                </div>
                <h5 className="fw-semibold">{item.title}</h5>
                <p className="text-secondary small mb-3">{item.text}</p>
                <a href="/menu" className="fw-semibold text-danger text-decoration-none">
                  Explore Menu
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
