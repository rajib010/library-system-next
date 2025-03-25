import React from "react";

export default function Contact() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Contact Us</h2>
          <p>
            Have a question? Feel free to reach out to us via email, phone, or by visiting our
            library.
          </p>
          <ul className="list-unstyled">
            <li><strong>📍 Address:</strong> 123 Library Street, Kathmandu, Nepal</li>
            <li><strong>📞 Phone:</strong> +977-9800000000</li>
            <li><strong>✉️ Email:</strong> library@example.com</li>
          </ul>

          <iframe
            className="w-100 rounded shadow"
            height="250"
            src="https://maps.google.com/maps?q=Kathmandu&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
          ></iframe>
        </div>

        {/* Contact Form */}
        <div className="col-md-6">
          <h2>Send Us a Message</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input type="text" className="form-control" placeholder="Enter your name" />
            </div>

            <div className="mb-3">
              <label className="form-label">Your Email</label>
              <input type="email" className="form-control" placeholder="Enter your email" />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows={4} placeholder="Write your message"></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
