import React from "react";


const InfoSection = () => {
  return (
    <section className="info-section py-5">
      <div className="container">
        <div className="row align-items-center">

        
          <div className="col-md-6">
            <h2 className="info-title">
              A little information <br /> for our valuable guest
            </h2>
            <p className="info-text">
              At place, we believe that dining is not just about food, but also
              about the overall experience. Our staff, renowned for their warmth
              and dedication, strives to make every visit an unforgettable event.
            </p>

            <div className="row g-3 mt-4">
              <div className="col-6">
                <div className="info-box">
                  <h4>3</h4>
                  <p>Locations</p>
                </div>
              </div>
              <div className="col-6">
                <div className="info-box">
                  <h4>1995</h4>
                  <p>Founded</p>
                </div>
              </div>
              <div className="col-6">
                <div className="info-box">
                  <h4>65+</h4>
                  <p>Staff Members</p>
                </div>
              </div>
              <div className="col-6">
                <div className="info-box">
                  <h4>100%</h4>
                  <p>Satisfied Customers</p>
                </div>
              </div>
            </div>
          </div>

 
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src="/src/assets/cooking.jpg" 
              alt="Cooking"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
