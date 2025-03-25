import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <Image
            src="/images/library.jpg"
            alt="Library"
            className="img-fluid rounded shadow"
            width={300}
            height={100}
          />
        </div>

        <div className="col-md-6">
          <h2>About Our Library</h2>
          <p className="text-muted">
            Welcome to our Library Management System, a gateway to a vast collection of books,
            research materials, and digital resources. Our mission is to promote knowledge and
            learning.
          </p>
          <h4>Our Mission</h4>
          <p>
            To provide an extensive range of books and learning materials for students, researchers,
            and avid readers.
          </p>
          <h4>Our Vision</h4>
          <p>
            To be a leading digital and physical library, ensuring access to knowledge for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
