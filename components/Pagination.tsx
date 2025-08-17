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

    const getMobilePages = () => {
        // Sur mobile, on affiche seulement la page courante et les pages adjacentes
        const pages = [];
        
        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage > 1) pages.push(currentPage - 1);
            pages.push(currentPage);
            if (currentPage < totalPages) pages.push(currentPage + 1);
        }
        
        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
            {/* Bouton Précédent */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border px-3 sm:px-5 py-2 sm:py-3 text-sm font-semibold text-black disabled:opacity-40 w-full sm:w-auto justify-center"
            >
                <ArrowLeft className='w-4 sm:w-5' />
                <span className="hidden sm:inline">Précédent</span>
                <span className="sm:hidden">Préc.</span>
            </button>

            {/* Pages - Desktop */}
            <div className="hidden sm:flex items-center gap-2">
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

            {/* Pages - Mobile */}
            <div className="flex sm:hidden items-center gap-1">
                {getMobilePages().map((page, idx) => (
                    <button
                        key={idx}
                        onClick={() => onPageChange(page)}
                        className={cn(
                            'rounded-lg px-3 py-2 text-sm font-medium',
                            page === currentPage
                                ? 'bg-violet-200 text-violet-700 font-bold'
                                : 'text-gray-700 hover:bg-gray-100'
                        )}
                    >
                        {page}
                    </button>
                ))}
                {totalPages > 3 && (
                    <span className="px-2 text-gray-400 text-sm">
                        / {totalPages}
                    </span>
                )}
            </div>

            {/* Bouton Suivant */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 rounded-lg border px-3 sm:px-5 py-2 sm:py-3 text-sm font-semibold text-black disabled:opacity-40 w-full sm:w-auto justify-center"
            >
                <span className="hidden sm:inline">Suivant</span>
                <span className="sm:hidden">Suiv.</span>
                <ArrowRight className='w-4 sm:w-5' />
            </button>
        </div>
    );
}
