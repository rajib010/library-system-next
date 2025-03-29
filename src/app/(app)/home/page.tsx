"use client";

import BookCard from "@/components/BookCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/books/get-books", {
        params: { search: searchQuery },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchQuery]);

  if (isLoading) return <div>Loading..</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        {searchQuery ? `Results for "${searchQuery}"` : "All Books"}
      </h2>
      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="col-md-3 col-sm-6 mb-4">
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}
