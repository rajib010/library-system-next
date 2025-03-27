import Image from "next/image";
import Link from "next/link";

export interface Books {
  ISBN: string;
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
    <Link href={`/book/${book.ISBN}`} passHref>
      <div className="card shadow-lg cursor-pointer" style={{ width: "18rem" }}>
        <Image
          src={book.image}
          className="card-img-top"
          alt={book.title}
          width={100}
          height={100}
        />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">by {book.author}</h6>
          <p className="card-text">Published: {book.year}</p>
          <span
            className={`badge ${
              book.status === "available"
                ? "text-bg-success"
                : "text-bg-warning"
            }`}
          >
            {book.status}
          </span>
        </div>
      </div>
    </Link>
  );
}
