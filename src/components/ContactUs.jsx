import React, { useState } from "react";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        console.log("Form Submitted:", formData);

       
        setSuccessMessage("Your message has been sent successfully! ✅");

       
        setFormData({
            name: "",
            email: "",
            message: ""
        });

       
        setTimeout(() => {
            setSuccessMessage("");
        }, 5000);
    };

    return (
        <section className="contact-section container py-5">
            <h2 className="text-center mb-4">Contact Us</h2>
            <p className="text-center mb-4">
                Have questions or want to get in touch? Fill out the form below or reach us directly.
            </p>

        
            {successMessage && (
                <div className="alert alert-success text-center">{successMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                        name="message"
                        rows="4"
                        className="form-control"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                    Send Message
                </button>
            </form>


            <div className="contact-info">
                <div className="info-box">
                    <h4>📞 Call Us</h4>
                    <p>+20 123 456 789</p>
                </div>
                 <div className="info-box">
                    <h4>⏰ Hours</h4>
                    <p>Mon- Fri: 8:00 AM -10:00 PM</p>
                    <p>Sat- Sun: 9:00 AM - 11:00 PM</p>
                </div>
                <div className="info-box">
                    <h4>📍 Address</h4>
                    <p>123 Main Street, Alexandria</p>
                </div>
               
            </div>



        </section>
    );
}




