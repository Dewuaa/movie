"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ContentCard from "../components/ContentCard";
import BannerAd from "../components/BannerAd";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import { getTrending, searchContent, getByGenre, GENRES, ContentItem } from "../lib/tmdb";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<ContentItem[]>([]);
  const [series, setSeries] = useState<ContentItem[]>([]);
  const [featuredItem, setFeaturedItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Filter State
  const [moviePage, setMoviePage] = useState(1);
  const [seriesPage, setSeriesPage] = useState(1);
  const [loadingMoreMovies, setLoadingMoreMovies] = useState(false);
  const [loadingMoreSeries, setLoadingMoreSeries] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (searchQuery) {
          const results = await searchContent(searchQuery);
          setMovies(results.filter((item) => item.type === "movie"));
          setSeries(results.filter((item) => item.type === "series"));
          setSelectedGenre(null); // Clear genre on search
        } else if (selectedGenre) {
          const genreId = GENRES[selectedGenre];
          const [genreMovies, genreSeries] = await Promise.all([
            getByGenre(genreId, "movie", 1),
            getByGenre(genreId, "tv", 1),
          ]);
          setMovies(genreMovies);
          setSeries(genreSeries);
          // Reset pages
          setMoviePage(1);
          setSeriesPage(1);
        } else {
          const [trendingMovies, trendingSeries] = await Promise.all([
            getTrending("movie", 1),
            getTrending("tv", 1),
          ]);
          setMovies(trendingMovies);
          setSeries(trendingSeries);
          if (trendingMovies.length > 0) {
            setFeaturedItem(trendingMovies[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    // Debounce search
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedGenre]);

  const loadMoreMovies = async () => {
    if (loadingMoreMovies) return;
    setLoadingMoreMovies(true);
    try {
      const nextPage = moviePage + 1;
      let newMovies: ContentItem[] = [];

      if (searchQuery) {
        newMovies = (await searchContent(searchQuery, nextPage)).filter(i => i.type === "movie");
      } else if (selectedGenre) {
        newMovies = await getByGenre(GENRES[selectedGenre], "movie", nextPage);
      } else {
        newMovies = await getTrending("movie", nextPage);
      }
      
      if (newMovies.length > 0) {
        setMovies(prev => [...prev, ...newMovies]);
        setMoviePage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more movies:", error);
    } finally {
      setLoadingMoreMovies(false);
    }
  };

  const loadMoreSeries = async () => {
    if (loadingMoreSeries) return;
    setLoadingMoreSeries(true);
    try {
      const nextPage = seriesPage + 1;
      let newSeries: ContentItem[] = [];

      if (searchQuery) {
        newSeries = (await searchContent(searchQuery, nextPage)).filter(i => i.type === "series");
      } else if (selectedGenre) {
        newSeries = await getByGenre(GENRES[selectedGenre], "tv", nextPage);
      } else {
        newSeries = await getTrending("tv", nextPage);
      }
      
      if (newSeries.length > 0) {
        setSeries(prev => [...prev, ...newSeries]);
        setSeriesPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more series:", error);
    } finally {
      setLoadingMoreSeries(false);
    }
  };

  const handleGenreClick = (genre: string) => {
    if (selectedGenre === genre) {
      setSelectedGenre(null); // Deselect if already selected
    } else {
      setSelectedGenre(genre);
      setSearchQuery(""); // Clear search when selecting genre
    }
  };

  if (loading && !featuredItem && !selectedGenre) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Hide when filtering by genre to focus on content */}
      {!selectedGenre && featuredItem && <HeroSection featuredItem={featuredItem} />}

      {/* Content Sections */}
      <div className={`custom-bg-gradient ${!selectedGenre ? "py-12" : "pt-24 pb-12"}`}>
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Genre Section - Moved up for better accessibility */}
          {!searchQuery && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Browse by Genre</h2>
                {selectedGenre && (
                  <button 
                    onClick={() => setSelectedGenre(null)}
                    className="text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(GENRES).map((genre) => (
                  <div
                    key={genre}
                    onClick={() => handleGenreClick(genre)}
                    className={`rounded-lg p-4 text-center transition cursor-pointer hover:shadow-md border ${
                      selectedGenre === genre 
                        ? "bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/20" 
                        : "bg-gradient-to-r from-gray-800 to-gray-900 border-transparent text-gray-300 hover:from-gray-700 hover:to-gray-800"
                    }`}
                  >
                    <p className="font-medium">{genre}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Movies Section */}
          {movies.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {searchQuery ? "Movies Found" : selectedGenre ? `${selectedGenre} Movies` : "Popular Movies"}
                </h2>
                {!searchQuery && !selectedGenre && (
                  <Link
                    href="/movies"
                    className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center"
                  >
                    See all
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
                {movies.map((movie) => (
                  <ContentCard
                    key={`${movie.id}-${movie.type}`} // Ensure unique key
                    item={{ ...movie, year: movie.year?.toString() }}
                  />
                ))}
              </div>
              
              {/* Load More Movies Button */}
              <div className="flex justify-center">
                <button 
                  onClick={loadMoreMovies}
                  disabled={loadingMoreMovies}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-medium transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMoreMovies ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    "Load More Movies"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Banner Ad */}
          <BannerAd />

          {/* Series Section */}
          {series.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  {searchQuery ? "Series Found" : selectedGenre ? `${selectedGenre} Series` : "Popular Series"}
                </h2>
                {!searchQuery && !selectedGenre && (
                  <Link
                    href="/series"
                    className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center"
                  >
                    See all
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
                {series.map((show) => (
                  <ContentCard
                    key={`${show.id}-${show.type}`} // Ensure unique key
                    item={{ ...show, year: show.year?.toString() }}
                  />
                ))}
              </div>

              {/* Load More Series Button */}
              <div className="flex justify-center">
                <button 
                  onClick={loadMoreSeries}
                  disabled={loadingMoreSeries}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-medium transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMoreSeries ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    "Load More Series"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
