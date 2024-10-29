"use client";

import React, { useState, useEffect } from 'react';
import Favorites from './Favorites';
import WatchLater from './WatchLater';

interface Movie {
    id: number;
    title: string;
    description: string;
    releaseYear: string;
    genre: string;
    imageUrl: string;
}

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [minYear, setMinYear] = useState<number>(1990);
    const [maxYear, setMaxYear] = useState<number>(2024);
    const [genres, setGenres] = useState<string>('Romance, Horror, Drama, Action, Mystery, Fantasy, Thriller, Western, Sci-Fi, Adventure');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`/api/titles?page=${page}&minYear=${minYear}&maxYear=${maxYear}&genres=${genres}`);
                if (!response.ok) {
                    throw new Error(`Error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMovies(data.title);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [page, minYear, maxYear, genres]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center mb-6">Movies</h1>
            <div className="grid grid-cols-3 gap-6">
                {movies.slice(0, 6).map((movie) => (
                    <div
                        key={movie.id}
                        className="relative border border-[#54f4d0] rounded-lg overflow-hidden group"
                    >
                        <img src={movie.imageUrl} alt={movie.title} className="w-full h-60 object-cover" />
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#000061] bg-opacity-75 flex flex-col font-inter items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                            <h3 className="text-xl font-bold">{movie.title}</h3>
                            <p className="text-sm">{movie.description}</p>
                            <p className="text-sm">Year: {movie.releaseYear}</p>
                            <p className="text-sm">Genre: {movie.genre}</p>
                            <div className="flex items-center space-x-4 mt-4">
                                <Favorites movieId={movie.id} />
                                <WatchLater movieId={movie.id} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                    <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}
                    className=" w-24 px-4 py-2 bg-[#1ED2AF] font-inter text-[#00003c] rounded-l-md disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button onClick={() => setPage(prev => prev + 1)}
                    className=" w-24 px-4 py-2 bg-[#1ED2AF] font-inter text-[#00003c] rounded-r-md"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieList;
