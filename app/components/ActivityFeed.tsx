export default function ActivityFeed() {
    const activities = [
        "Liked movie",
        "Added a movie to Watch Later",
        "Favorited a movie"
    ];

    return (
        <div className="p-4 flex justify-center items-center">
            <div className="bg-[#54f4d0] p-4 rounded-md w-full max-w-md">
                <h3 className="font-bold mb-2 text-center text-[#00003c]">Latest Activities</h3>
                <ul className="space-y-1 text-sm text-center">
                    {activities.map((activity, index) => (
                        <li key={index} className="text-[#00003c]">
                            {activity}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
