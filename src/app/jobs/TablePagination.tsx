"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

export default function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const generatePageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    if (!showLeftEllipsis) {
      for (let i = 1; i <= 3 + siblingCount; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (!showRightEllipsis) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - (2 + siblingCount); i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = leftSibling; i <= rightSibling; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6 ${className}`}
    >
      <div className="flex flex-wrap justify-center items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled={!canPrev}
          onClick={() => onPageChange(1)}
          className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          disabled={!canPrev}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={`page-${page}`}
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              onClick={() => onPageChange(Number(page))}
              className={`w-8 h-8 sm:w-10 sm:h-10 ${
                page === currentPage ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="icon"
          disabled={!canNext}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          disabled={!canNext}
          onClick={() => onPageChange(totalPages)}
          className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-center sm:text-right text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  );
}
