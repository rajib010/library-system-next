"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Books } from "@/components/BookCard";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { bookSchema } from "@/schemas/bookSchema";
import { useForm } from "react-hook-form";

function UpdatePage() {
  const { isbn } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [bookData, setBookData] = useState<Books | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      image: "",
      status: "available",
    },
  });

  const getData = async () => {
    if (!isbn) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/books/book/${isbn}`);
      if (res.status !== 200)
        throw new Error("Error in fetching book information");
      setBookData(res.data.book[0]);
      // Update the form with the fetched book data
      form.setValue("title", res.data.book[0].title);
      form.setValue("author", res.data.book[0].author);
      form.setValue("year", (res.data.book[0].year).toString());
      form.setValue("image", res.data.book[0].image);
      form.setValue("status", res.data.book[0].status);
    } catch (error) {
      console.log("Error in getting book information", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isbn) {
      getData();
    }
  }, [isbn]);

  const onSubmit = async (data: z.infer<typeof bookSchema>) => {
    console.log("submitting form.....");
    if (!isbn) return;
    setIsLoading(true);

    try {
      const res = await axios.put(`/api/books/update-book/${isbn}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200)
        throw new Error("Error in updating book information");
      alert("Book information updated successfully");
      router.push("/dashboard");
    } catch (error) {
      console.log("Error in updating book information", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 w-100 form-container">
        <div className="text-center">
          <h1 className="h3 mb-3 fw-bold">Update Book Details</h1>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              {...form.register("title")}
            />
            <div className="text-danger">
              {form.formState.errors.title?.message}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              {...form.register("author")}
            />
            <div className="text-danger">
              {form.formState.errors.author?.message}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Image Url</label>
            <input
              type="text"
              className="form-control"
              {...form.register("image")}
            />
            <div className="text-danger">
              {form.formState.errors.image?.message}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Year: </label>
            <input
              type="text"
              className="form-control"
              {...form.register("year")}
            />
            <div className="text-danger">
              {form.formState.errors.year?.message}
            </div>
          </div>

          {/* Dropdown for status */}
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-select" {...form.register("status")}>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePage;
