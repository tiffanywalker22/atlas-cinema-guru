"use client";

import { useState } from "react";
import Link from "next/link";
import ActivityFeed from "./ActivityFeed";

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <aside
            className={`relative top-0 left-0 h-screen bg-[#1ED2AF] text-white transition-all duration-300 ${isExpanded ? "w-64" : "w-16"
                }`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <nav
                className={`flex flex-col py-4 transition-all duration-300 ${isExpanded ? "items-start px-4" : "items-center"
                    } space-y-6 font-inter`}
            >

                <Link href="/" className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                    </svg>
                    {isExpanded && <span className="text-white">Home</span>}
                </Link>

                <Link href="/favorites" className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                    {isExpanded && <span className="text-white">Favorites</span>}
                </Link>

                <Link href="/watch-later" className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                    </svg>
                    {isExpanded && <span className="text-white">Watch Later</span>}
                </Link>
            </nav>
            {isExpanded && <ActivityFeed />}
        </aside>
    );
}
