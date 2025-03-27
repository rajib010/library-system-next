"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

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
  const user: User = session?.user as User;

  function checkLogin() {
    if (user) {
      setIsLoggedin(true);
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

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

                  <div className="mt-3">
                    <button className="btn btn-success me-3" disabled={!isLoggedin}>Borrow</button>
                    <button className="btn btn-danger" disabled= {!isLoggedin} >Return</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
