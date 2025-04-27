import { content } from "../data/movies";
import Image from "next/image";
import Link from "next/link";
import ContentCard from "../components/ContentCard";
import PlayButton from "../components/PlayButton";
import BannerAd from "../components/BannerAd";

export default function Home() {
  const featuredItem = content[0];
  const movies = content.filter((item) => item.type === "movie");
  const series = content.filter((item) => item.type === "series");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0">
          <Image
            src={featuredItem.poster}
            alt={featuredItem.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-lg">
              <div className="mb-6">
                <span className="bg-cyan-500 text-xs font-bold px-2 py-1 rounded-sm">
                  FEATURED
                </span>
                {featuredItem.type === "series" && (
                  <span className="bg-purple-600 text-xs font-bold px-2 py-1 rounded-sm ml-2">
                    SERIES
                  </span>
                )}
              </div>
              <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                {featuredItem.title}
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                {featuredItem.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <PlayButton
                  href={
                    featuredItem.type === "movie"
                      ? `/movies/${featuredItem.id}`
                      : `/series/${featuredItem.id}`
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 transition-transform group-hover:scale-125"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Stream Now</span>
                </PlayButton>
                <button className="bg-gray-800 bg-opacity-70 hover:bg-opacity-100 border border-gray-600 px-6 py-3 rounded-lg font-medium flex items-center group transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-cyan-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="py-12 custom-bg-gradient">
        <div className="container mx-auto px-4">
          {/* Movies Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Popular Movies
              </h2>
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
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <ContentCard
                  key={movie.id}
                  item={{ ...movie, year: movie.year?.toString() }}
                />
              ))}
            </div>
          </div>

          {/* Banner Ad */}
          <BannerAd />

          {/* Series Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Popular Series
              </h2>
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
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {series.map((show) => (
                <ContentCard
                  key={show.id}
                  item={{ ...show, year: show.year?.toString() }}
                />
              ))}
            </div>
          </div>

          {/* Genre Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Browse by Genre</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Action",
                "Comedy",
                "Drama",
                "Horror",
                "Sci-Fi",
                "Romance",
                "Thriller",
                "Documentary",
              ].map((genre) => (
                <div
                  key={genre}
                  className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 text-center hover:from-gray-700 hover:to-gray-800 transition cursor-pointer hover:shadow-md"
                >
                  <p className="font-medium">{genre}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
