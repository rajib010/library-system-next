"use client";

import BookCard from "@/components/BookCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import HomePageSkeleton from "@/components/skeletons/Homepage";

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
  const [books, setBooks] = useState<BookType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const fetchBooks = async (page: number, query?: string | number | null) => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/books/get-books", {
        params: { search: query, page },
      });

      setBooks(response?.data.books);
      setTotalPages(response?.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage, searchQuery);
  }, [searchQuery]);

  if (isLoading) return <HomePageSkeleton/>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        {searchQuery ? `Results for "${searchQuery}"` : ""}
      </h2>
      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="col-md-3 col-sm-6 mb-4">
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <HomePageSkeleton />
        )}
      </div>
      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          loadFunction={fetchBooks}
          filter={searchQuery}
        />
      )}
    </div>
  );
}
