import { movies } from "../../../data/movies";
import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "../../../components/VideoPlayer";
import PlayButton from "../../../components/PlayButton";

// Define the params type without using a custom interface
export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
        <Link
          href="/"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2 px-6 rounded-lg"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner with Glassy Effect */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <div className="absolute inset-0">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 py-8 md:py-16">
            <Link
              href="/"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Browse
            </Link>

            <div className="md:flex gap-8">
              <div className="hidden md:block md:w-1/4 lg:w-1/5 relative aspect-[2/3] rounded-lg overflow-hidden animate-pulse-glow">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>

              <div className="md:w-3/4 lg:w-4/5">
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center font-bold">
                      9.2
                    </div>
                    <span className="ml-2 text-sm text-gray-300">
                      User Score
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                    2023
                  </span>
                  <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                    2h 15m
                  </span>
                  <span className="px-2 py-1 bg-cyan-900 rounded text-xs font-medium">
                    HD
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-gray-800 text-xs">
                    Drama
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-800 text-xs">
                    Romance
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-800 text-xs">
                    Comedy
                  </span>
                </div>

                <p className="text-lg mb-6 text-gray-300 max-w-2xl">
                  {movie.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <PlayButton href={`/watch/${movie.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Play Now
                  </PlayButton>
                  <button className="px-5 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center font-medium transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add to Watchlist
                  </button>
                  <button className="w-11 h-11 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Content */}
      <div className="custom-bg-gradient py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Stream {movie.title}
          </h2>

          {movie.embed ? (
            <div className="rounded-lg overflow-hidden shadow-2xl mb-8 card-glow">
              <VideoPlayer embedUrl={movie.embed} title={movie.title} />
            </div>
          ) : (
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-8 border border-gray-700">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-600 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-gray-400 text-lg mb-2">Video coming soon</p>
                <p className="text-gray-500">
                  This title will be available shortly
                </p>
              </div>
            </div>
          )}

          {/* Movie Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-cyan-400">
                About the Movie
              </h3>
              <p className="text-gray-300">{movie.description}</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-cyan-400">Cast</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Actor Name as Character</li>
                <li>Actor Name as Character</li>
                <li>Actor Name as Character</li>
                <li>Actor Name as Character</li>
              </ul>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-cyan-400">
                Details
              </h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Release Date:</span>
                  <span>April 15, 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Director:</span>
                  <span>Director Name</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Runtime:</span>
                  <span>135 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span>English</span>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Movies */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
              Similar Content
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movies.map((m) => (
                <Link key={m.id} href={`/movies/${m.id}`} className="block">
                  <div className="rounded-lg overflow-hidden hover:card-glow transition-all">
                    <div className="relative aspect-[2/3]">
                      <Image
                        src={m.poster}
                        alt={m.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        className="object-cover hover:scale-110 transition-all duration-500"
                      />
                    </div>
                    <div className="p-2 bg-gray-800 bg-opacity-70">
                      <p className="text-xs text-center truncate">{m.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
