"use client";

import React from 'react';

interface MovieCardProps {
    movie: {
        id: number;
        title: string;
        synopsis: string;
        released: string;
        genre: string;
    };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const imageUrl = `/images/${movie.id}.webp`;

    return (
        <div className="relative border border-[#54f4d0] rounded-lg overflow-hidden group h-[463px] w-[463px]">
            <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>

            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#000061] bg-opacity-75 flex flex-col font-inter items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-left">
                <h3 className="text-xl font-light">{movie.title} ({movie.released})</h3>
                <p className="text-sm">{movie.synopsis}</p>
                <div className="mt-2">
                    <span className="inline-block px-3 py-1 text-sm text-white bg-[#54f4d0] rounded-full">
                        {movie.genre}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
