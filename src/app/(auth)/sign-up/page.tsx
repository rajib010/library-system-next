"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signupSchema";
import axios from "axios";

export default function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      axios
        .post("/api/sign-up", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            router.replace("/sign-in");
          }
        })
        .catch((error) => {
          console.error("Axios Error:", error.response?.data || error.message);
        });
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center">
          <h1 className="h3 mb-3 fw-bold">Library Management System</h1>
          <p className="mb-4 h4">Sign up</p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              {...form.register("email")}
              placeholder="Enter email"
            />
            <div className="text-danger">
              {form.formState.errors.email?.message}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              {...form.register("username")}
              placeholder="Enter username"
            />
            <div className="text-danger">
              {form.formState.errors.username?.message}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              {...form.register("password")}
              placeholder="Enter password"
            />
            <div className="text-danger">
              {form.formState.errors.password?.message}
            </div>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p>
            {" Already have an account?"}{" "}
            <Link href="/sign-in" className="text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
