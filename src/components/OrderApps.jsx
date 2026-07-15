import React from "react";


const OrderApps = () => {
  const apps = [
    { name: "Uber Eats", img: "/src/assets/app1.jpg" },
    { name: "Grubhub", img: "/src/assets/app2.jpg" },
    { name: "Postmates", img: "/src/assets/app3.jpg" },
    { name: "DoorDash", img: "/src/assets/app4.jpg" },
    { name: "Foodpanda", img: "/src/assets/app5.jpg" },
    { name: "Deliveroo", img: "/src/assets/app6.jpg" },
    { name: "Instacart", img: "/src/assets/app7.jpg" },
    { name: "Just Eat", img: "/src/assets/app8.jpg" },
    { name: "DiDi Food", img: "/src/assets/app9.jpg" },
  ];

  return (
    <section className="order-apps">
      <div className="order-apps-text">
        <h2>You can order through apps</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit enim bibendum
          sed et aliquet aliquet risus tempor semper.
        </p>
      </div>
      <div className="order-apps-logos">
        {apps.map((app, index) => (
          <div className="app-card" key={index}>
            <img src={app.img} alt={app.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderApps;
