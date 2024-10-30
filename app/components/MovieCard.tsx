"use client";

import React, { useState } from 'react';

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
    const [isStarFilled, setIsStarFilled] = useState(false);
    const [isClockFilled, setIsClockFilled] = useState(false);

    const handleFavoriteToggle = async () => {
        console.log(`Toggling favorite for movie ID: ${movie.id}`);

        const response = isStarFilled
        ? await fetch(`/api/favorites/${movie.id}`, { method: 'DELETE' })
        : await fetch(`/api/favorites/${movie.id}`, { method: 'POST' });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            setIsStarFilled(!isStarFilled);
        } else {
            console.error("Error updating favorites");
        }
    };

    const handleWatchLaterToggle = async () => {
        console.log(`Toggling watch later for movie ID: ${movie.id}`);
        const response = isClockFilled
            ? await fetch(`/api/watch-later/${movie.id}`, { method: 'DELETE' })
            : await fetch(`/api/watch-later/${movie.id}`, { method: 'GET' });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            setIsClockFilled(!isClockFilled);
        } else {
            console.error("Error updating watch later");
        }
    };

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

            <div className="absolute top-3 right-3 flex flex-row items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
                <div
                    className={`cursor-pointer ${isStarFilled ? 'filled' : ''}`}
                    onClick={handleFavoriteToggle}
                    
                >
                    {isStarFilled ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    )}
                </div>

                <div
                    className={`cursor-pointer ${isClockFilled ? 'filled' : ''}`}
                    onClick={handleWatchLaterToggle}
                >
                    {isClockFilled ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
