import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "../../../components/VideoPlayer";
import { getSeriesDetails, getSeasonDetails } from "../../../lib/tmdb";

// Update to use the proper Next.js 15.3 typing
export default async function SeriesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Get the values safely
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const seasonQueryParam = resolvedSearchParams.season as string | undefined;
  const episodeQueryParam = resolvedSearchParams.episode as string | undefined;

  // Fetch series details
  const series = await getSeriesDetails(id);

  if (!series) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Series not found</h1>
          <Link
            href="/"
            className="text-cyan-400 hover:text-cyan-300 underline text-lg"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Default to first season and episode if not specified
  const seasonParam = seasonQueryParam ? parseInt(seasonQueryParam) : 1;
  const episodeParam = episodeQueryParam ? parseInt(episodeQueryParam) : 1;

  // Fetch season details to get episodes
  const seasonDetails = await getSeasonDetails(id, seasonParam);
  
  // If season details fail (e.g. invalid season), try falling back to season 1 or handle error
  const episodes = seasonDetails?.episodes || [];

  const selectedEpisode =
    episodes.find((e: any) => e.episode_number === episodeParam) ||
    episodes[0];

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-cyan-500/30">
      {/* Immersive Hero Section */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={series.poster}
            alt={series.title}
            fill
            sizes="100vw"
            className="object-cover opacity-60 scale-105 animate-slow-zoom"
            priority
          />
          {/* Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl animate-fade-in-up">
              {/* Breadcrumb / Back Link */}
              <Link
                href="/"
                className="inline-flex items-center text-gray-300 hover:text-white transition mb-6 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition"
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

              {/* Series Badge */}
              <div className="mb-4">
                <span className="px-3 py-1 bg-cyan-600/80 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase rounded">
                  Series
                </span>
              </div>

              {/* Title & Metadata */}
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-2xl">
                {series.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm md:text-base font-medium text-gray-300">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">
                  {series.year}
                </span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  9.2 Rating
                </span>
                <span>{series.seasons?.length || 0} Seasons</span>
                <span className="px-2 py-0.5 border border-gray-500 rounded text-xs uppercase tracking-wide">HD</span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-3 mb-8">
                {series.genres?.map((genre: string) => (
                  <span
                    key={genre}
                    className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition text-sm text-gray-200"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl line-clamp-3 md:line-clamp-none">
                {series.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                   href={`/series/${series.id}?season=1&episode=1`}
                   className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-xl font-bold text-lg flex items-center transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Start Watching
                </Link>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-lg flex items-center transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
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
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 md:px-12 py-16 -mt-10 relative z-10">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Episodes & Info */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Current Episode / Player */}
            <section>
                <div className="flex items-center mb-8">
                    <div className="h-8 w-1 bg-cyan-500 rounded-full mr-4"></div>
                    <h2 className="text-3xl font-bold text-white">
                        {selectedEpisode ? `S${seasonParam}:E${selectedEpisode.episode_number} - ${selectedEpisode.name}` : "Watch Series"}
                    </h2>
                </div>
                
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 backdrop-blur-xl mb-6">
                    <VideoPlayer 
                        embedUrl={series.embed} 
                        title={`${series.title} - ${selectedEpisode?.name || "Trailer"}`}
                    />
                    <div className="bg-black/80 p-4 text-center text-sm text-gray-500 border-t border-white/5">
                        <p>Note: Playing series trailer (Demo Mode)</p>
                    </div>
                </div>
                
                {selectedEpisode && (
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-2">{selectedEpisode.name}</h3>
                        <p className="text-gray-400">{selectedEpisode.overview || "No description available for this episode."}</p>
                    </div>
                )}
            </section>

            {/* Episodes List */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-white">Episodes</h3>
                    
                    {/* Season Selector */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-[50%]">
                        {series.seasons?.map((season: any) => (
                            <Link
                                key={season.season_number}
                                href={`/series/${series.id}?season=${season.season_number}&episode=1`}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                                    season.season_number === seasonParam
                                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                {season.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {episodes.map((episode: any) => (
                        <Link
                            key={episode.id}
                            href={`/series/${series.id}?season=${seasonParam}&episode=${episode.episode_number}`}
                            className={`flex flex-col md:flex-row gap-4 p-4 rounded-xl transition border ${
                                episode.id === selectedEpisode?.id
                                ? "bg-white/10 border-cyan-500/50"
                                : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                            }`}
                        >
                            <div className="w-full md:w-48 h-28 relative flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                                <Image
                                    src={episode.still_path ? `https://image.tmdb.org/t/p/w500${episode.still_path}` : series.poster}
                                    alt={episode.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 py-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`font-bold truncate pr-4 ${episode.id === selectedEpisode?.id ? "text-cyan-400" : "text-white"}`}>
                                        {episode.episode_number}. {episode.name}
                                    </h4>
                                    <span className="text-xs text-gray-500 bg-black/30 px-2 py-1 rounded">
                                        {episode.runtime ? `${episode.runtime}m` : "N/A"}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                    {episode.overview}
                                </p>
                            </div>
                        </Link>
                    ))}
                    {episodes.length === 0 && (
                        <div className="text-center py-12 bg-white/5 rounded-xl border border-white/5 border-dashed">
                            <p className="text-gray-400">No episodes found for this season.</p>
                        </div>
                    )}
                </div>
            </section>

          </div>

          {/* Right Column: Sidebar Stats */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Series Info</h3>
                <div className="space-y-4">
                    <div>
                        <span className="block text-sm text-gray-500 mb-1">Original Title</span>
                        <span className="text-lg font-medium text-gray-200">{series.title}</span>
                    </div>
                    <div>
                        <span className="block text-sm text-gray-500 mb-1">First Air Date</span>
                        <span className="text-lg font-medium text-gray-200">{series.release_date || series.year}</span>
                    </div>
                    <div>
                        <span className="block text-sm text-gray-500 mb-1">Total Seasons</span>
                        <span className="text-lg font-medium text-gray-200">{series.seasons?.length || 0}</span>
                    </div>
                    <div>
                        <span className="block text-sm text-gray-500 mb-1">Status</span>
                        <span className="text-lg font-medium text-gray-200">{series.status || "Returning Series"}</span>
                    </div>
                    <div>
                        <span className="block text-sm text-gray-500 mb-1">Original Language</span>
                        <span className="text-lg font-medium text-gray-200">{series.original_language || "English"}</span>
                    </div>
                </div>
            </div>

            {/* Cast */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Top Cast</h3>
                <div className="space-y-4">
                    {series.cast?.length ? (
                        series.cast.map((actor: any) => (
                            <div key={actor.id} className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden relative">
                                    {actor.profile_path ? (
                                        <Image 
                                            src={actor.profile_path} 
                                            alt={actor.name} 
                                            fill 
                                            className="object-cover"
                                            sizes="48px"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-white font-medium">{actor.name}</p>
                                    <p className="text-sm text-gray-500">{actor.character}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">Cast information unavailable</p>
                    )}
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
