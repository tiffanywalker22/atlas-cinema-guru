"use client";

import React, { act, useEffect, useState } from "react";

interface Activity {
    type: string;
    title: string;
    timestamp: number;
}

export default function ActivityFeed() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('/api/activities');
                if (!response.ok) {
                    throw new Error('Failed to fetch activities');
                }
                const data = await response.json();
                setActivities(data.activities);
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };
        fetchActivities();
    }, []);

    return (
        <div className="p-4 flex justify-center items-center font-inter">
            <div className="bg-[#54f4d0] p-4 rounded-md w-full max-w-md">
                <h3 className="font-bold mb-2 text-center text-[#00003c]">Latest Activities</h3>
                <ul className="space-y-1 text-sm text-center">
                    {activities.map((activity, index) => {
                        const date = new Date(activity.timestamp);

                        const formattedDate = date.toLocaleString('en-US', {
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true,
                        });

                        return (
                            <li key={index} className="text-[#00003c]">
                                {formattedDate} - <strong>{activity.title}</strong> was {activity.type === 'favorite' ? 'favorited' : 'added to watch later'}.
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
