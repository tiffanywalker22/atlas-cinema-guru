"use client";

import React, { useState, useEffect } from 'react';

interface WatchLaterProps {
    movieId: number;
}

const WatchLater: React.FC<WatchLaterProps> = ({ movieId }) => {
    const [watchLater, setWatchLater] = useState<Set<number>>(new Set());

    useEffect(() => {
        const fetchWatchLater = async () => {
            try {
                const response = await fetch(`/api/watch-later?page=1`);
                if (!response.ok) {
                    throw new Error(`Error! Status: ${response.status}`);
                }
                const data = await response.json();
                setWatchLater(new Set(data.map((movie: { id: number }) => movie.id)));
            } catch (error) {
                console.error('Error fetching watch later:', error);
            }
        };

        fetchWatchLater();
    }, []);

    const addToWatchLater = async () => {
        try {
            const response = await fetch(`/api/watch-later/${movieId}`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            setWatchLater(prev => new Set(prev).add(movieId));
        } catch (error) {
            console.error('Error adding to Watch Later:', error);
        }
    };

    const removeFromWatchLater = async () => {
        try {
            const response = await fetch(`/api/watch-later/${movieId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            setWatchLater(prev => {
                const updatedSet = new Set(prev);
                updatedSet.delete(movieId);
                return updatedSet;
            });
        } catch (error) {
            console.error('Error removing from Watch Later:', error);
        }
    };
    return (
        <button onClick={() => {
            if (watchLater.has(movieId)) {
                removeFromWatchLater();
            } else {
                addToWatchLater();
            }
        }}>
            {watchLater.has(movieId) ? (
                <span>Remove from Watch Later</span>
            ) : (
                <span>Add to Watch Later</span>
            )}
        </button>
    );
};

export default WatchLater;
