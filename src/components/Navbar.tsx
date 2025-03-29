"use client";

import { User } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const isAdmin = user?.role === "admin";
  const isLoggedIn = user ? true : false;
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/home?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-3 shadow-sm">
      <div className="container-fluid">
        {user ? (
          <Link
            className="navbar-brand text-white font-weight-bold fs-4"
            href="/"
          >
            Welcome, {user?.username}
          </Link>
        ):(
          <h3 className="navbar-brand text-white font-weight-bold fs-4">Library System</h3>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href="/contact"
              >
                Contact
              </Link>
            </li>
            {isAdmin ? (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              <></>
            )}

            {!isAdmin && isLoggedIn && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href="/transactions"
                >
                  Transactions
                </Link>
              </li>
            )}
          </ul>
          <form
            className="d-flex ms-lg-3"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2 border-light"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
          <div className="d-flex ms-3">
            {session ? (
              <button
                className="btn btn-outline-light"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            ) : (
              <Link className="btn btn-light ms-2" href="/sign-in">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
