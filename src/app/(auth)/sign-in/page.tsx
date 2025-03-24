"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/signinSchema";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      alert("login failed");
    }

    if (result?.url) {
      router.replace("/home");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center">
          <h1 className="h3 mb-3 fw-bold">Library Management System</h1>
          <p className="mb-4 h4">Welcome back</p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email/Username</label>
            <input
              type="text"
              className="form-control"
              {...form.register("identifier")}
              placeholder="Enter email/username"
            />
            <div className="text-danger">
              {form.formState.errors.identifier?.message}
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
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p>
            {" Don't have an account?"}{" "}
            <Link href="/sign-up" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
