"use client";

import React, { useEffect, useState } from 'react';
import Favorites from '../components/Favorites';

interface FavoriteMovie {
    id: number;
    title: string;
    description: string;
    releaseYear: string;
    genre: string;
    imageUrl: string;
}

const FavoritesPage: React.FC = () => {
    const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`/api/favorites?page=1`);
                if (!response.ok) {
                    throw new Error(`Error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched favorites data:', data.favorites);
                setFavorites(data.favorites);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center mb-6">My Favorites</h1>
            <div className="grid grid-cols-3 gap-6">
                {favorites.length > 0 ? (
                    favorites.map((movie) => (
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
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No favorites found.</p>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
