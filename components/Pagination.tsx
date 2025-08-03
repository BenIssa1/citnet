'use client';

import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const getPages = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-between gap-4 py-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border px-5 py-3 text-sm font-semibold text-black disabled:opacity-40"
            >
                <ArrowLeft className='w-5' />
                Précédent
            </button>

            <div className="flex items-center gap-2">
                {getPages().map((page, idx) => (
                    <button
                        key={idx}
                        onClick={() => typeof page === 'number' && onPageChange(page)}
                        disabled={page === '...'}
                        className={cn(
                            'rounded-lg px-5 py-3 text-md font-medium',
                            page === currentPage
                                ? 'bg-violet-200 text-violet-700 font-bold'
                                : 'text-gray-700 hover:bg-gray-100',
                            page === '...' && 'cursor-default text-gray-400'
                        )}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 rounded-lg border px-5 py-3 text-sm font-semibold text-black disabled:opacity-40"
            >
                Suivant
                <ArrowRight className='w-5' />
            </button>
        </div>
    );
}
