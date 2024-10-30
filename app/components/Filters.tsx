"use client";

import React from 'react';

interface FiltersProps {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    setMinYear: React.Dispatch<React.SetStateAction<number>>;
    setMaxYear: React.Dispatch<React.SetStateAction<number>>;
    genresList: string[];
    selectedGenres: string[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const Filters: React.FC<FiltersProps> = ({
    setSearchTerm,
    setMinYear,
    setMaxYear,
    genresList,
    selectedGenres,
    setSelectedGenres
}) => {
    const handleGenreChange = (genre: string) => {
        setSelectedGenres(selectedGenres.includes(genre)
            ? selectedGenres.filter(g => g !== genre)
            : [...selectedGenres, genre]
        );
    };

    return (
        <div className="flex justify-between mb-6 px-4">
            <div className="flex-1 p-2 rounded-lg bg-[#00003c] mr-4 max-w-[calc(50%-12px)]">
                <h3 className="mb-4 text-white font-inter">Search</h3>

                <input
                    type="text"
                    placeholder="Search Movies..."
                    className="rounded-full bg-[#00003c] text-white border-2 border-[#54f4d0] p-2 w-80 outline-none mb-4 font-inter"
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />

                <div className="flex justify-between mb-4">
                    {['Min Year', 'Max Year'].map((label, index) => (
                        <div key={label} className={`flex-1 ${index === 0 ? 'mr-2' : ''}`}>
                            <label className="text-white block mb-1 font-inter">{label}</label>
                            <input
                                type="number"
                                placeholder={label}
                                className="rounded-full bg-[#00003c] text-white border-2 border-[#54f4d0] p-2 w-40 outline-none font-inter"
                                onChange={(e) => index === 0 ? setMinYear(Number(e.target.value)) : setMaxYear(Number(e.target.value))}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 p-2 rounded-lg bg-[#00003c] ml-4">
                <h3 className="mb-2 text-white font-inter">Genres</h3>
                <div className="flex flex-wrap gap-2">
                    {genresList.map((genre) => (
                        <button
                            key={genre}
                            className={`rounded-full bg-${selectedGenres.includes(genre) ? '#39CCCC' : '#001F3F'} text-white border-2 border-[#54f4d0] p-2 px-4 cursor-pointer transition-all duration-200 w-[calc(20%-8px)] font-inter`}
                            onClick={() => handleGenreChange(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filters;
