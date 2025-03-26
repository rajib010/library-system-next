"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/schemas/bookSchema";
import { useState } from "react";
import axios from "axios";

function AddBook() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      ISBN: 0,
      title: "",
      author: "",
      image: "",
      status: "available",
      year: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof bookSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/add-book", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("Book added successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error adding book:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 w-100 form-container">
        <div className="text-center">
          <h1 className="h3 mb-3 fw-bold">Add Book Details</h1>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">ISBN:</label>
            <input
              type="number"
              className="form-control"
              {...form.register("ISBN")}
              placeholder="Enter ISBN"
            />
            <div className="text-danger">{form.formState.errors.ISBN?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              {...form.register("title")}
              placeholder="Enter Title"
            />
            <div className="text-danger">{form.formState.errors.title?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Author:</label>
            <input
              type="text"
              className="form-control"
              {...form.register("author")}
              placeholder="Enter Author Name"
            />
            <div className="text-danger">{form.formState.errors.author?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Image:</label>
            <input
              type="text"
              className="form-control"
              {...form.register("image")}
              placeholder="Enter Image URL"
            />
            <div className="text-danger">{form.formState.errors.image?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Year:</label>
            <input
              type="number"
              className="form-control"
              {...form.register("year")}
              placeholder="Year"
            />
            <div className="text-danger">{form.formState.errors.year?.message}</div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Adding book..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
