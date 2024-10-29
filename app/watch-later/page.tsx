"use client";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import WatchLater from "../components/WatchLater";

interface Movie {
    id: number;
    title: string;
}

export default function WatchLaterPage() {
    const { data: session, status } = useSession();
    const [watchLaterMovies, setWatchLaterMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (session) {
            const fetchWatchLaterMovies = async () => {
                try {
                    const response = await fetch('/api/watch-later');
                    if (!response.ok) {
                        throw new Error(`Error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    setWatchLaterMovies(data.movies || []);
                } catch (error: any) {
                    console.error('Error fetching watch later movies:', error);
                    setError('Failed to load movies');
                } finally {
                    setLoading(false);
                }
            };
            fetchWatchLaterMovies();
        }
    }, [session]);

    if (status === "loading" || loading) {
        return <div>Loading...</div>;
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h2>Please log in!</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h2>{error}</h2>
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Watch Later</h1>
            <ul>
                {watchLaterMovies.length > 0 ? (
                    watchLaterMovies.map(movie => (
                        <li key={movie.id}>
                            <WatchLater movieId={movie.id} />
                        </li>
                    ))
                ) : (
                    <li>No movies in Watch Later</li>
                )}
            </ul>
        </div>
    );
}

