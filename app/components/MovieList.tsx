import React, { useState, useEffect } from 'react';
import Favorites from './Favorites';
import WatchLater from './WatchLater';

interface Movie {
    id: number;
    title: string;
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
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [page, minYear, maxYear, genres]);

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        {movie.title}
                        <Favorites movieId={movie.id} />
                        <WatchLater movieId={movie.id} />
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={() => setPage(prev => prev + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MovieList;
