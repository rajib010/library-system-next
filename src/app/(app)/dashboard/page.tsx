"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface Book {
  _id: string;
  ISBN: string;
  title: string;
  author: string;
  image: string;
  status: string;
  year: number;
}

const BooksList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books/get-books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  console.log(books);

  const handleEdit = (isbn: string) => {
    router.push(`/edit-book/${isbn}`);
  };

  const handleDelete = async (isbn: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`/api/books/delete-book/${isbn}`);
        setBooks(books.filter((book) => book.ISBN !== isbn));
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      {/* Title & Add Book Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">📚 Books List</h2>
        <Link href="/dashboard/add">
          <button className="btn btn-primary">➕ Add Book</button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>SN</th>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr key={book?._id}>
                  <td>{index + 1}</td>
                  <td>{book.ISBN}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.year}</td>
                  <td>
                    <span
                      className={`badge ${
                        book.status === "available" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(book.ISBN)}
                    >
                      ✏ Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(book.ISBN)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  No books available 📖
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksList;
