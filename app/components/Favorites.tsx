"use client";

import React, { useState, useEffect } from 'react';

interface FavoritesProps {
    movieId: number;
}

const Favorites: React.FC<FavoritesProps> = ({ movieId }) => {
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`/api/favorites?page=1`);
                if (!response.ok) {
                    throw new Error(`Error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched favorites data:', data);
                setFavorites(new Set(data.favorites.map((movie: { id: number }) => movie.id)));
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    const addToFavorites = async () => {
        try {
            const response = await fetch(`/api/favorites/${movieId}`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            setFavorites(prev => new Set(prev).add(movieId));
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };
    const removeFromFavorites = async () => {
        try {
            const response = await fetch(`/api/favorites/${movieId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            setFavorites(prev => {
                const updatedSet = new Set(prev);
                updatedSet.delete(movieId);
                return updatedSet;
            });
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    return (
        <button onClick={() => {
            if (favorites.has(movieId)) {
                removeFromFavorites();
            } else {
                addToFavorites();
            }
        }}>
            {favorites.has(movieId) ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.021-4.5-4.5-4.5a4.503 4.503 0 0 0-3.751 2.048A4.503 4.503 0 0 0 9.5 3.75C7.021 3.75 5 5.765 5 8.25c0 3.278 4.347 7.457 8.571 11.578a.75.75 0 0 0 1.158 0C19.653 15.707 24 11.028 24 8.25Z" />
                </svg>
            )}
        </button>
    );
};

export default Favorites;
