const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export interface TMDBItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  media_type: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  poster: string;
  embed: string; // We'll use the trailer URL here
  type: "movie" | "series";
  year?: number;
  genres?: string[];
  cast?: CastMember[];
  status?: string;
  runtime?: string; // Formatted as Xh Ym
  original_language?: string;
  release_date?: string;
  seasons?: any[];
}

function formatRuntime(minutes: number): string {
  if (!minutes) return "N/A";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

async function fetchFromTMDB(endpoint: string) {
  if (!TMDB_API_KEY) {
    console.error("TMDB API Key is missing!");
    return null;
  }

  try {
    const separator = endpoint.includes("?") ? "&" : "?";
    const res = await fetch(`${BASE_URL}${endpoint}${separator}api_key=${TMDB_API_KEY}&language=en-US`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return await res.json();
  } catch (error) {
    console.error("TMDB Fetch Error:", error);
    return null;
  }
}

async function getTrailer(id: number, type: "movie" | "tv"): Promise<string> {
  const data = await fetchFromTMDB(`/${type}/${id}/videos`);
  if (!data || !data.results) return "";

  const trailer = data.results.find(
    (video: any) => video.site === "YouTube" && video.type === "Trailer"
  );

  return trailer ? `https://www.youtube.com/embed/${trailer.key}` : "";
}

export async function getTrending(type: "movie" | "tv" = "movie", page: number = 1): Promise<ContentItem[]> {
  const data = await fetchFromTMDB(`/trending/${type}/week?page=${page}`);
  if (!data || !data.results) return [];

  const items = await Promise.all(
    data.results.map(async (item: TMDBItem) => {
      // For listing pages, we might skip fetching trailers for every single item to speed up loading
      // or we can keep it if performance is fine. Let's keep it for now but maybe optimize later.
      // Optimization: Only fetch trailer if it's the first page (for hero) or maybe just skip it for the grid?
      // The ContentCard doesn't seem to use 'embed' directly, it uses 'poster', 'title', 'year'.
      // HeroSection uses 'embed'.
      // Let's keep it simple for now.
      const trailerUrl = await getTrailer(item.id, type);
      return {
        id: item.id.toString(),
        title: item.title || item.name || "Unknown",
        description: item.overview,
        poster: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : "/placeholder.jpg",
        embed: trailerUrl,
        type: type === "movie" ? "movie" : "series",
        year: new Date(item.release_date || item.first_air_date || "").getFullYear(),
        genres: [], // We can map genre IDs if needed, skipping for now
      };
    })
  );

  return items;
}

export const GENRES: Record<string, number> = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
  "Sci-Fi": 878,
  Romance: 10749,
  Thriller: 53,
  Documentary: 99,
};

export async function getByGenre(genreId: number, type: "movie" | "tv", page: number = 1): Promise<ContentItem[]> {
  const data = await fetchFromTMDB(`/discover/${type}?with_genres=${genreId}&page=${page}&sort_by=popularity.desc`);
  if (!data || !data.results) return [];

  const items = await Promise.all(
    data.results.map(async (item: TMDBItem) => {
      const trailerUrl = await getTrailer(item.id, type);
      return {
        id: item.id.toString(),
        title: item.title || item.name || "Unknown",
        description: item.overview,
        poster: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : "/placeholder.jpg",
        embed: trailerUrl,
        type: type === "movie" ? "movie" : "series",
        year: new Date(item.release_date || item.first_air_date || "").getFullYear(),
        genres: [],
      };
    })
  );

  return items;
}

export async function searchContent(query: string, page: number = 1): Promise<ContentItem[]> {
  const data = await fetchFromTMDB(`/search/multi?query=${encodeURIComponent(query)}&page=${page}`);
  if (!data || !data.results) return [];

  const items = await Promise.all(
    data.results
      .filter((item: TMDBItem) => item.media_type === "movie" || item.media_type === "tv")
      .map(async (item: TMDBItem) => {
        const type = item.media_type === "movie" ? "movie" : "tv";
        const trailerUrl = await getTrailer(item.id, type);
        return {
          id: item.id.toString(),
          title: item.title || item.name || "Unknown",
          description: item.overview,
          poster: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : "/placeholder.jpg",
          embed: trailerUrl,
          type: type === "movie" ? "movie" : "series",
          year: new Date(item.release_date || item.first_air_date || "").getFullYear(),
          genres: [],
        };
      })
  );

  return items;
}

export async function getMovieDetails(id: string): Promise<ContentItem | null> {
  // Fetch details and credits in parallel
  const [data, credits] = await Promise.all([
    fetchFromTMDB(`/movie/${id}`),
    fetchFromTMDB(`/movie/${id}/credits`)
  ]);

  if (!data) return null;

  const trailerUrl = await getTrailer(parseInt(id), "movie");

  return {
    id: data.id.toString(),
    title: data.title || "Unknown",
    description: data.overview,
    poster: data.poster_path ? `${IMAGE_BASE_URL}${data.poster_path}` : "/placeholder.jpg",
    embed: trailerUrl,
    type: "movie",
    year: new Date(data.release_date || "").getFullYear(),
    genres: data.genres?.map((g: any) => g.name) || [],
    cast: credits?.cast?.slice(0, 10).map((c: any) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profile_path: c.profile_path ? `${IMAGE_BASE_URL}${c.profile_path}` : null
    })) || [],
    status: data.status,
    runtime: formatRuntime(data.runtime),
    original_language: data.original_language?.toUpperCase(),
    release_date: data.release_date
  };
}

export async function getSeriesDetails(id: string): Promise<ContentItem | null> {
  // Fetch details and credits in parallel
  const [data, credits] = await Promise.all([
    fetchFromTMDB(`/tv/${id}`),
    fetchFromTMDB(`/tv/${id}/credits`)
  ]);

  if (!data) return null;

  const trailerUrl = await getTrailer(parseInt(id), "tv");

  return {
    id: data.id.toString(),
    title: data.name || "Unknown",
    description: data.overview,
    poster: data.poster_path ? `${IMAGE_BASE_URL}${data.poster_path}` : "/placeholder.jpg",
    embed: trailerUrl,
    type: "series",
    year: new Date(data.first_air_date || "").getFullYear(),
    genres: data.genres?.map((g: any) => g.name) || [],
    seasons: data.seasons || [],
    cast: credits?.cast?.slice(0, 10).map((c: any) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profile_path: c.profile_path ? `${IMAGE_BASE_URL}${c.profile_path}` : null
    })) || [],
    status: data.status,
    original_language: data.original_language?.toUpperCase(),
    release_date: data.first_air_date
  };
}

export async function getSeasonDetails(seriesId: string, seasonNumber: number) {
  return await fetchFromTMDB(`/tv/${seriesId}/season/${seasonNumber}`);
}
