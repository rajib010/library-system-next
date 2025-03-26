"use client";

import BookCard from "@/components/BookCard";
import { useState, useEffect } from "react";
import axios from "axios";

interface BookType {
  _id: number;
  ISBN: string;
  title: string;
  author: string;
  status: string;
  image: string;
  year: number;
}

export default function Page() {
  const [books, setBooks] = useState<BookType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/books/get-books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (isLoading) return <div>Loading..</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        {books &&
          books.map((book) => (
            <div key={book._id} className="col-md-3 col-sm-6 mb-4">
              <BookCard book={book} />
            </div>
          ))}
      </div>
    </div>
  );
}
