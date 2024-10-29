"use client";

import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

interface Movie {
    id: number;
    title: string;
    synopsis: string;
    released: string;
    genre: string;
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
                console.log("Fetched titles:", data.title);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {movies.map((movie) => (
                    <div className="flex justify-center" key={movie.id}>
                        <MovieCard movie={movie} />
                    </div>

                ))}
            </div>
            <Pagination page={page} setPage={setPage} />

        </div>
    );
};

export default MovieList;
