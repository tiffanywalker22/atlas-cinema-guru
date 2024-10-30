"use client";

import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import Filters from './Filters';

interface Movie {
    id: number;
    title: string;
    synopsis: string;
    released: string;
    genre: string;
}

const genresList = [
    'Romance', 'Horror', 'Drama', 'Action', 'Mystery',
    'Fantasy', 'Thriller', 'Western', 'Sci-Fi', 'Adventure'
];

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [minYear, setMinYear] = useState<number>(1990);
    const [maxYear, setMaxYear] = useState<number>(2024);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const genreFilter = selectedGenres.length ? `&genres=${selectedGenres.join(",")}` : "";
                const searchFilter = searchTerm ? `&query=${encodeURIComponent(searchTerm)}` : "";
                const yearFilters = (minYear && maxYear) ? `&minYear=${minYear}&maxYear=${maxYear}` : "";

                const response = await fetch(`/api/titles?page=${page}${yearFilters}${genreFilter}${searchFilter}`);
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
    }, [page, minYear, maxYear, selectedGenres]);

    const filteredMovies = movies.filter(movie => {
        const matchesTitle = searchTerm ? movie.title.toLowerCase().includes(searchTerm) : true;
        const matchesYear = parseInt(movie.released) >= minYear && parseInt(movie.released) <= maxYear;
        const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genre);

        return matchesTitle && matchesYear && matchesGenre;
    });


    return (
        <div className="space-y-6">
            <Filters
                setSearchTerm={setSearchTerm}
                setMinYear={setMinYear}
                setMaxYear={setMaxYear}
                genresList={genresList}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredMovies.map((movie) => (
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
