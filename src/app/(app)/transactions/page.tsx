"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Transactions {
  _id: string;
  bookId: { _id: string; title: string };
  borrowDate: Date;
  returnDate: Date;
}

const TransactionsList = () => {
  const [transactions, setTransactions] = useState<Transactions[] | null>(null);

  async function getTransactions() {
    try {
      const response = await axios.get("/api/transactions/get-transactions");
      if (response.status !== 200)
        throw new Error("Failed to fetch transactions");
      setTransactions(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error in fetching transactions", error);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  const handleReturnbook = async function (bookId: string) {
    try {
      const response = await axios.post(
        `/api/transactions/return-book/${bookId}`
      );
      if (response.status !== 200) throw new Error("Error in returning book");
      alert("Book returned successfully");
      getTransactions();
    } catch (error) {
      console.log("Error in returning the book", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">📚 Books Transactions</h2>
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>SN</th>
              <th>Title</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions ? (
              transactions.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.bookId.title}</td>
                  <td>{new Date(data.borrowDate).toLocaleString()}</td>
                  <td>
                    {data.returnDate
                      ? new Date(data.returnDate).toLocaleString()
                      : "Not returned"}
                  </td>

                  <td>
                    {data.returnDate ? (
                      <button className="btn btn-primary" disabled>Returned</button>
                    ) : (
                      <button
                        onClick={() => handleReturnbook(data?.bookId._id)}
                        className="btn btn-warning btn-sm me-2"
                      >
                        ✏ Return
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  No transactions available 📖
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TransactionsList;
