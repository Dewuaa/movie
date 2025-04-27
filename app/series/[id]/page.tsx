import { content, Series } from "../../../data/movies";
import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "../../../components/VideoPlayer";

// Update to use the proper Next.js 15.3 typing
export default async function SeriesPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get the values safely
  const id = params.id;
  const seasonQueryParam = searchParams.season as string | undefined;
  const episodeQueryParam = searchParams.episode as string | undefined;

  // Rest of your component remains the same...

  const series = content.find(
    (item) => item.id === id && item.type === "series"
  ) as Series | undefined;

  if (!series) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Series not found</h1>
        <p className="mb-8 text-gray-400">
          The series you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2 px-6 rounded-lg"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Default to first season and episode if not specified - use the extracted values
  const seasonParam = seasonQueryParam ? parseInt(seasonQueryParam) : 1;
  const episodeParam = episodeQueryParam ? parseInt(episodeQueryParam) : 1;

  // Find the selected season and episode
  const selectedSeason =
    series.seasons.find((s) => s.seasonNumber === seasonParam) ||
    series.seasons[0];

  const selectedEpisode =
    selectedSeason.episodes.find((e) => e.episodeNumber === episodeParam) ||
    selectedSeason.episodes[0];

  // Rest of your component remains the same
  return (
    <div>
      {/* Hero Banner with Glassy Effect */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <div className="absolute inset-0">
          <Image
            src={series.poster}
            alt={series.title}
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
                  src={series.poster}
                  alt={series.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>

              <div className="md:w-3/4 lg:w-4/5">
                <span className="bg-cyan-600 text-xs px-2 py-1 rounded mb-2 inline-block">
                  SERIES
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  {series.title}
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
                    {series.year || "2023"}
                  </span>
                  <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                    {series.seasons.length} Season
                    {series.seasons.length > 1 ? "s" : ""}
                  </span>
                  <span className="px-2 py-1 bg-cyan-900 rounded text-xs font-medium">
                    HD
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {series.genres?.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 rounded-full bg-gray-800 text-xs"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <p className="text-lg mb-6 text-gray-300 max-w-2xl">
                  {series.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Link
                    href={`/series/${series.id}?season=1&episode=1`}
                    className="px-6 py-3 md:px-8 md:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-medium flex items-center transition"
                  >
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
                  </Link>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video and Episodes Section */}
      <div className="custom-bg-gradient py-12">
        <div className="container mx-auto px-4">
          {/* Current Episode Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center">
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
              {selectedSeason.title}: Episode {selectedEpisode.episodeNumber}
            </h2>
            <h3 className="text-xl font-medium mb-2">
              {selectedEpisode.title}
            </h3>
            <p className="text-gray-300 mb-4">{selectedEpisode.description}</p>
          </div>

          {/* Video Player */}
          <div className="rounded-lg overflow-hidden shadow-2xl mb-8 card-glow">
            <VideoPlayer
              embedUrl={selectedEpisode.embed}
              title={`${series.title} - ${selectedEpisode.title}`}
            />
          </div>

          {/* Season Selector */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Seasons</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {series.seasons.map((season) => (
                <Link
                  key={season.seasonNumber}
                  href={`/series/${series.id}?season=${season.seasonNumber}&episode=1`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg transition ${
                      season.seasonNumber === selectedSeason.seasonNumber
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-800 hover:bg-gray-700 text-gray-200"
                    }`}
                  >
                    Season {season.seasonNumber}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Episode List */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4">Episodes</h3>
            <div className="grid gap-4">
              {selectedSeason.episodes.map((episode) => (
                <Link
                  key={episode.id}
                  href={`/series/${series.id}?season=${selectedSeason.seasonNumber}&episode=${episode.episodeNumber}`}
                  className="block"
                >
                  <div
                    className={`bg-gray-800 bg-opacity-60 rounded-lg overflow-hidden transition hover:bg-opacity-80 ${
                      episode.id === selectedEpisode.id
                        ? "ring-2 ring-cyan-500"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-64 h-32 relative">
                        <Image
                          src={episode.thumbnail || series.poster}
                          alt={episode.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 256px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-75 px-2 py-1 text-xs rounded">
                          {episode.duration || "45m"}
                        </div>
                        <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-75 w-6 h-6 flex items-center justify-center rounded-full">
                          {episode.episodeNumber}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium">{episode.title}</h4>
                        <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                          {episode.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Series Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-cyan-400">
                About the Series
              </h3>
              <p className="text-gray-300">{series.description}</p>
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
                  <span className="text-gray-400">First Air Date:</span>
                  <span>April 15, {series.year || "2023"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Creator:</span>
                  <span>Director Name</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Seasons:</span>
                  <span>{series.seasons.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span>English</span>
                </div>
              </div>
            </div>
          </div>

          {/* More Series Recommendations */}
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
              More Like This
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {content.slice(0, 6).map((item) => (
                <Link
                  key={item.id}
                  href={
                    item.type === "movie"
                      ? `/movies/${item.id}`
                      : `/series/${item.id}`
                  }
                  className="block"
                >
                  <div className="rounded-lg overflow-hidden hover:card-glow transition-all">
                    <div className="relative aspect-[2/3]">
                      <Image
                        src={item.poster}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        className="object-cover hover:scale-110 transition-all duration-500"
                      />
                      {item.type === "series" && (
                        <div className="absolute top-2 right-2 bg-cyan-600 text-xs px-2 py-0.5 rounded">
                          SERIES
                        </div>
                      )}
                    </div>
                    <div className="p-2 bg-gray-800 bg-opacity-70">
                      <p className="text-xs text-center truncate">
                        {item.title}
                      </p>
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
