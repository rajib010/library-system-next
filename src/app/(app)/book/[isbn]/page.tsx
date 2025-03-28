"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface Book {
  _id: string;
  ISBN: string;
  title: string;
  author: string;
  image: string;
  year: string;
  status: string;
}

export default function BookDetail() {
  const { isbn } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const { data: session } = useSession();
  const user = session?.user as Session["user"];

  async function handleBorrowBook() {
    console.log(
      `Making request to: /api/transactions/borrow-book/${book?._id}`
    );

    try {
      const response = await axios.post(
        `/api/transactions/borrow-book/${book?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Book borrowed successfully");
        fetchBook();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error borrowing the book. Please try again.");
    }
  }

  useEffect(() => {
    if (user) {
      setIsLoggedin(true);
    }
  }, [user]);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`/api/books/book/${isbn}`);
      if (res.status !== 200)
        throw new Error("Error in fetching book information");
      setBook(res.data.book[0]);
    } catch (error) {
      console.log("Error in getting book information", error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [isbn]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="row g-0">
              <div className="col-md-4">
                <Image
                  src={book.image}
                  alt={book.title}
                  className="img-fluid rounded-start"
                  width={900}
                  height={900}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    by {book.author}
                  </h6>
                  <p className="card-text">Published in: {book.year}</p>
                  <p className="card-text">
                    <small className="text-muted">ISBN: {book.ISBN}</small>
                  </p>
                  <span
                    className={`badge ${
                      book.status === "available"
                        ? "text-bg-success"
                        : "text-bg-warning"
                    }`}
                  >
                    {book.status}
                  </span>

                  {isLoggedin && (
                    <div className="mt-3">
                      {book.status === "available" && (
                        <button
                          className="btn btn-success me-3"
                          onClick={() => handleBorrowBook()}
                        >
                          Borrow
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
