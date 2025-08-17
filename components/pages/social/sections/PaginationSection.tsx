'use client';
import Pagination from "@/components/Pagination";
import { usePagination } from "../hooks/usePagination";

export default function PaginationSection() {
  const { currentPage, totalPages, handlePageChange } = usePagination({ totalPages: 10 });

  return (
    <div className="py-20">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
} 