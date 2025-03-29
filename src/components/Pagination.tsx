interface PaginationProps {
  totalPages: number;
  currentPage: number;
  loadFunction: (page: number, filter?: string | null | number) => void;
  filter?: string | number | null;
}

export default function Pagination({
  totalPages,
  currentPage,
  loadFunction,
  filter = null,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number, event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) event.preventDefault(); // Prevent default browser behavior
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadFunction(page, filter);
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <div className="d-flex gap-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 border rounded ${
            currentPage === 1
              ? "d-none"
              : "bg-primary text-white border-primary"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 border rounded ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-white text-primary border-primary"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 border rounded ${
            currentPage === totalPages
              ? "d-none"
              : "bg-white text-primary border-primary"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
