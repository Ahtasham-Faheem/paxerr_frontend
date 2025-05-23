"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-3 mt-4 mb-4">
      <button
        onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`p-2 rounded-full ${
          currentPage === 1
            ? "text-gray-500"
            : "text-[#E75F34] hover:bg-[#171717]"
        }`}
        aria-label="Previous page"
      >
        <FaChevronLeft size={14} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`size-8 rounded-full flex items-center justify-center ${
            currentPage === number
              ? "text-[#E75F34]"
              : "text-gray-300 hover:bg-[#171717]"
          }`}
          aria-label={`Page ${number}`}
          aria-current={currentPage === number ? "page" : undefined}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full ${
          currentPage === totalPages
            ? "text-gray-500"
            : "text-[#E75F34] hover:bg-[#171717]"
        }`}
        aria-label="Next page"
      >
        <FaChevronRight size={14} />
      </button>
    </div>
  );
};

export default Pagination;
