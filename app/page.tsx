"use client";

import { useSession } from "next-auth/react";
import MovieList from "./components/MovieList";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2>Please log in!</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MovieList />
    </div>
  );
}
