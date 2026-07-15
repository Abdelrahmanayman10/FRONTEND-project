import React from "react";


const Testimonials = () => {
  const testimonials = [
    {
      quote: "The best restaurant",
      text: "Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.",
      name: "Sophie Robson",
      location: "Los Angeles, CA",
      img: "/src/assets/person1.jpg",
    },
    {
      quote: "Simply delicious",
      text: "Place exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and beautifully presented.",
      name: "Matt Cannon",
      location: "San Diego, CA",
      img: "/src/assets/person2.jpg",
    },
    {
      quote: "One of a kind restaurant",
      text: "The culinary experience at place is first to none. The atmosphere is vibrant, the food – nothing short of extraordinary. The food was the highlight of our evening. Highly recommended.",
      name: "Andy Smith",
      location: "San Francisco, CA",
      img: "/src/assets/person3.jpg",
    },
  ];

  return (
    <section className="testimonials py-5">
      <div className="container">
        <h2 className="text-center mb-5">What Our Customers Say</h2>
        <div className="row">
          {testimonials.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="testimonial-card p-4 shadow-sm h-100">
                <h5 className="text-danger">“{item.quote}”</h5>
                <p className="mt-3">{item.text}</p>
                <hr />
                <div className="d-flex align-items-center mt-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="rounded-circle me-3"
                    width="50"
                    height="50"
                  />
                  <div>
                    <strong>{item.name}</strong>
                    <p className="mb-0 text-muted small">{item.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
