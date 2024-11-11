interface Genre {
  genre_id: number; // Auto-generated ID, so it's a number
  genre_name: string; // Name of the genre
}

interface Actor {
  actor_id: number; // ID of the actor
  name: string; // Name of the actor
}

export interface Movie {
  movieId?: number;
  title: string;
  description: string;
  release_date: Date;
  rating?: number;
  duration_minutes: number;
  trailer_url: string;
  created_at: Date;
  genres: Genre[];
  actors: Actor[];
  poster_url: string;
}
