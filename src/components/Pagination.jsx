import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (totalPages <= 1) return null;

  const updatePage = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
    onPageChange(page);
  };

  // Fonction pour calculer les pages à afficher
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage > 2) pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(1, currentPage - 1);
        i <= Math.min(totalPages, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      if (currentPage < totalPages - 1) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      <button
        onClick={() => updatePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        Précédent
      </button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2 text-gray-500">...</span>
        ) : (
          <button
            key={idx}
            onClick={() => updatePage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => updatePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  );
}
