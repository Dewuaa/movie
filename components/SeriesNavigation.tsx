// "use client";

// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { Series } from "../data/movies";

// export default function SeriesNavigation({ series }: { series: Series }) {
//   const searchParams = useSearchParams();
//   const seasonParam = searchParams.get("season")
//     ? parseInt(searchParams.get("season")!)
//     : 1;
//   const episodeParam = searchParams.get("episode")
//     ? parseInt(searchParams.get("episode")!)
//     : 1;

//   // Find the selected season and episode
//   const selectedSeason =
//     series.seasons.find((s) => s.seasonNumber === seasonParam) ||
//     series.seasons[0];

//   const selectedEpisode =
//     selectedSeason.episodes.find((e) => e.episodeNumber === episodeParam) ||
//     selectedSeason.episodes[0];

//   return (
//     <>
//       {/* Season Selector */}
//       <div className="mb-8">
//         <h3 className="text-xl font-bold mb-4">Seasons</h3>
//         <div className="flex flex-wrap gap-2 mb-6">
//           {series.seasons.map((season) => (
//             <Link
//               key={season.seasonNumber}
//               href={`/series/${series.id}?season=${season.seasonNumber}&episode=1`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-lg transition ${
//                   season.seasonNumber === selectedSeason.seasonNumber
//                     ? "bg-cyan-600 text-white"
//                     : "bg-gray-800 hover:bg-gray-700 text-gray-200"
//                 }`}
//               >
//                 Season {season.seasonNumber}
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Episode List */}
//       <div className="mb-12">
//         <h3 className="text-xl font-bold mb-4">Episodes</h3>
//         <div className="grid gap-4">
//           {selectedSeason.episodes.map((episode) => (
//             <Link
//               key={episode.id}
//               href={`/series/${series.id}?season=${selectedSeason.seasonNumber}&episode=${episode.episodeNumber}`}
//               className="block"
//             >
//               {/* Episode content */}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
