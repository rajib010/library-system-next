import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5 ">
      <div className="container w-90">
        <div className="row">
          <div className="col-md-4">
            <h5>Library Management System</h5>
            <p>
              Your gateway to a world of knowledge. Access thousands of books, journals, and
              research materials.
            </p>
          </div>

          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Catalog
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-4">
                <Facebook />
              </a>
              <a href="#" className="text-light fs-4">
                <Twitter />
              </a>
              <a href="#" className="text-light fs-4">
                <Instagram />
              </a>
              <a href="#" className="text-light fs-4">
                <Linkedin  />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="mb-0">&copy; {new Date().getFullYear()} Library Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
