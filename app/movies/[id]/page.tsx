import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "../../../components/VideoPlayer";
import BannerAd from "../../../components/BannerAd";
import { getMovieDetails } from "../../../lib/tmdb";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Movie not found</h1>
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

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-cyan-500/30">
      {/* Immersive Hero Section */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={movie.poster}
            alt={movie.title}
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

              {/* Title & Metadata */}
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-2xl">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm md:text-base font-medium text-gray-300">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">
                  {movie.year}
                </span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  9.2 Rating
                </span>
                <span>2h 15m</span>
                <span className="px-2 py-0.5 border border-gray-500 rounded text-xs uppercase tracking-wide">HD</span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-3 mb-8">
                {movie.genres?.map((genre) => (
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
                {movie.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-xl font-bold text-lg flex items-center transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
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
                  Watch Trailer
                </button>
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
        
        {/* Video Player Section */}
        <div className="mb-20">
             <div className="flex items-center mb-8">
                <div className="h-8 w-1 bg-cyan-500 rounded-full mr-4"></div>
                <h2 className="text-3xl font-bold text-white">Stream Now</h2>
             </div>
            {movie.embed ? (
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 backdrop-blur-xl">
                    <VideoPlayer embedUrl={movie.embed} title={movie.title} />
                </div>
            ) : (
                <div className="aspect-video bg-gray-900/50 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
                    <div className="text-center">
                        <p className="text-gray-400 text-xl">Trailer unavailable</p>
                    </div>
                </div>
            )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Info */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Storyline */}
            <section>
                <h3 className="text-2xl font-bold mb-4 text-white">Storyline</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                    {movie.description}
                </p>
            </section>

            {/* Cast */}
            <section>
                <h3 className="text-2xl font-bold mb-6 text-white">Top Cast</h3>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                    {movie.cast?.length ? (
                        movie.cast.map((actor) => (
                            <div key={actor.id} className="flex-shrink-0 w-32 group cursor-pointer">
                                <div className="w-32 h-32 rounded-full bg-gray-800 mb-3 overflow-hidden border-2 border-transparent group-hover:border-cyan-500 transition relative">
                                    {actor.profile_path ? (
                                        <Image 
                                            src={actor.profile_path} 
                                            alt={actor.name} 
                                            fill 
                                            className="object-cover"
                                            sizes="128px"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <p className="text-center font-medium text-white group-hover:text-cyan-400 transition text-sm truncate">{actor.name}</p>
                                <p className="text-center text-xs text-gray-500 truncate">{actor.character}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">Cast information unavailable</p>
                    )}
                </div>
            </section>
          </div>

          {/* Right Column: Sidebar Stats */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Movie Info</h3>
                <div className="space-y-4">
                    <div>
                        <span className="block text-sm text-gray-500 mb-1">Original Title</span>
                        <span className="text-lg font-medium text-gray-200">{movie.title}</span>
                    </div>
                    <div>
                        <span className="block text-sm text-gray-500 mb-1">Status</span>
                        <span className="text-lg font-medium text-gray-200">{movie.status || "Released"}</span>
                    </div>
                    <div>
                        <span className="block text-sm text-gray-500 mb-1">Release Date</span>
                        <span className="text-lg font-medium text-gray-200">{movie.release_date || movie.year}</span>
                    </div>
                    <div>
                        <span className="block text-sm text-gray-500 mb-1">Runtime</span>
                        <span className="text-lg font-medium text-gray-200">{movie.runtime || "N/A"}</span>
                    </div>
                    <div>
                        <span className="block text-sm text-gray-500 mb-1">Original Language</span>
                        <span className="text-lg font-medium text-gray-200">{movie.original_language || "English"}</span>
                    </div>
                </div>
            </div>
            
            {/* Banner Ad Placement */}
            <div className="rounded-2xl overflow-hidden">
                <BannerAd />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
