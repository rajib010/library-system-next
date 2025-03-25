import Image from "next/image";

interface Books{
  ISBN: number;
  title: string;
  author: string;
  year: number;
  image: string;
  status: string;
}

interface BookCardProps {
  book: Books;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="card shadow-sm" style={{ width: "18rem" }}>
      <Image src={book.image} className="card-img-top" alt={book.title} width={100} height={100} />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">by {book.author}</h6>
        <p className="card-text">Published: {book.year}</p>
        <span
          className={`badge ${
            book.status === "Available" ? "text-bg-success" : "text-bg-danger"
          }`}
        >
          {book.status}
        </span>
      </div>
    </div>
  );
}
