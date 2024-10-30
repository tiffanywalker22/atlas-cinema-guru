"use client";

import React from 'react';

interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
    return (
        <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="w-28 px-6 py-3 bg-[#1ED2AF] font-inter text-[#00003c] rounded-l-full disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(prev => prev + 1)}
                    className="w-28 px-6 py-3 bg-[#1ED2AF] font-inter text-[#00003c] rounded-l-none rounded-r-full"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
