"use client";

import BookCard from "@/components/BookCard";

const book = {
  ISBN: 1,
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  year: 1925,
  image: "https://example.com/gatsby.jpg",
  status: "Available",
};

export default function Page() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-sm-6 mb-4">
          <BookCard book={book} />
        </div>
        <div className="col-md-3 col-sm-6 mb-4">
          <BookCard book={book} />
        </div>
        <div className="col-md-3 col-sm-6 mb-4">
          <BookCard book={book} />
        </div>
        <div className="col-md-3 col-sm-6 mb-4">
          <BookCard book={book} />
        </div>
        <div className="col-md-3 col-sm-6 mb-4">
          <BookCard book={book} />
        </div>
      </div>
    </div>
  );
}
