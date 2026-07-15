import React, { useState } from "react";

const BookTable = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [totalPerson, setTotalPerson] = useState("1 Person");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!date || !time || !name || !phone || !totalPerson) {
      alert("Please fill in all fields first!");
      return;
    }
    alert("Booked successfully!");
  };

  return (
    <div className="book-table-page">
      <div className="book-header">
        <h1>Book A Table</h1>
        <p>
          We consider all the drivers of change gives you the components
          you need to change to create a truly happens.
        </p>
      </div>

      <div className="book-form-container">
        <form className="book-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="x-xxxx-xxxx-xxxx" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Total Person</label>
            <select value={totalPerson} onChange={(e) => setTotalPerson(e.target.value)}>
              <option>1 Person</option>
              <option>2 People</option>
              <option>3 People</option>
              <option>4 People</option>
              <option>5+ People</option>
            </select>
          </div>

          <button type="submit" className="book-btn">
            Book A Table
          </button>
        </form>
      </div>

      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.903167473759!2d-74.1637551!3d40.8530333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f6f4e6cd14df%3A0xbaa0ff7f40a99a9c!2sPassaic%2C%20NJ!5e0!3m2!1sen!2sus!4v1673900000000!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default BookTable;








