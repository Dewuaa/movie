export type Movie = {
  id: string;
  title: string;
  description: string;
  poster: string;
  embed: string;
  type: "movie";
  year?: number;
  genres?: string[];
};

export type Episode = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  embed: string;
  duration?: string;
  episodeNumber: number;
};

export type Series = {
  id: string;
  title: string;
  description: string;
  poster: string;
  type: "series";
  year?: number;
  genres?: string[];
  seasons: {
    seasonNumber: number;
    title: string;
    episodes: Episode[];
  }[];
};

export type ContentItem = Movie | Series;

export const content: ContentItem[] = [
  {
    id: "1",
    title: "Black Panther",
    description:
      "T'Challa, the King of Wakanda, rises to the throne in the isolated, technologically advanced African nation, but his past comes back to haunt him.",
    poster: "/posters/Black Panther.jpeg",
    embed:
      "https://www.dropbox.com/scl/fi/ehnj2gatuxjks6bf2u2o3/Black.Panther.2018.1080p.BluRay.x264-YTS.AM.mp4?rlkey=3qp037f769n1ey2m5p6z931e8&st=mckq9d44&dl=0",
    type: "movie",
    year: 2018,
    genres: ["Romance", "Drama"],
  },
  {
    id: "2",
    title: "John Wick: Chapter 3 - Parabellum",
    // In the description:
    description:
      " John Wick is on the run after killing a member of the international assassin&apos;s guild, and with a $14 million price tag on his head, he is the target of hit",
    poster: "/posters/John Wick.jpeg",
    embed:
      "https://www.dropbox.com/scl/fi/xdowxed5tpvrw4q9vwpdd/weak.mp4?rlkey=h7dxmg79e10vfw622j5c72i5i&st=pkr3tbly&dl=0",
    type: "movie",
    year: 2022,
    genres: ["Romance", "Comedy"],
  },
  {
    id: "3",
    title: "Hello, Love, Again",
    description:
      "Follow the journey of couples navigating the challenging waters of relationships, breakups, and reconciliations.",
    poster: "/posters/again.jpeg", // Replace with actual poster
    type: "series",
    year: 2023,
    genres: ["Drama", "Romance"],
    seasons: [
      {
        seasonNumber: 1,
        title: "Season 1",
        episodes: [
          {
            id: "3-s1-e1",
            title: "Hello, Love, Again",
            description:
              "Sarah and Mike face their first major relationship challenge.",
            embed:
              "https://www.dropbox.com/scl/fi/a0udfcggdyfxk8opsmgpp/again.mp4?rlkey=9yjo5dodn7kdv8f5qbh5n4w9j&st=9spnn63z&dl=0",
            episodeNumber: 1,
            duration: "42m",
          },
          // {
          //   id: "3-s1-e2",
          //   title: "Moving On",
          //   description: "Sarah tries to rebuild her life after the breakup.",
          //   embed: "https://do7go.com/e/0to4f5mw6z72",
          //   episodeNumber: 2,
          //   duration: "45m",
          // },
          // {
          //   id: "3-s1-e3",
          //   title: "New Horizons",
          //   description:
          //     "Mike meets someone new while Sarah focuses on her career.",
          //   embed: "https://do7go.com/e/jy03q2dder6i",
          //   episodeNumber: 3,
          //   duration: "41m",
          // },
        ],
      },
      {
        seasonNumber: 2,
        title: "Season 2",
        episodes: [
          {
            id: "3-s2-e1",
            title: "Two Years Later",
            description:
              "Sarah and Mike cross paths again after two years apart.",
            embed: "https://do7go.com/e/0to4f5mw6z72",
            episodeNumber: 1,
            duration: "48m",
          },
          {
            id: "3-s2-e2",
            title: "Old Feelings",
            description:
              "Memories resurface when Sarah and Mike work on a project together.",
            embed: "https://do7go.com/e/jy03q2dder6i",
            episodeNumber: 2,
            duration: "44m",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Havoc",
    description:
      "After a drug deal gone wrong, a detective must fight his way through a criminal underworld to rescue a politician's son while uncovering a deep conspiracy.",
    poster: "/posters/Havoc.jpeg",
    embed:
      "https://www.dropbox.com/scl/fi/bh7bq646hdnya11dnu16c/havoc.mp4?rlkey=w2xiw4er7r3c2932slzcoqnqa&st=trpdalqd&dl=0",
    type: "movie",
    year: 2025,
    genres: ["Romance", "Comedy"],
  },
  {
    id: "5",
    title: "Black Panther: Wakanda Forever",
    description:
      "Queen Ramonda, Shuri, M'Baku, Okoye, and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death.",
    poster: "/posters/Wakanda.jpeg",
    embed:
      "https://www.dropbox.com/scl/fi/a3ugpsrslrn7ws6xn6jgl/wakan.mp4?rlkey=htlyythjn5sxhewau3xa127t9&st=arzylfwc&dl=0",
    type: "movie",
    year: 2022,
    genres: ["Romance", "Comedy"],
  },
  {
    id: "6",
    title: "Hello, Love, Goodbye",
    description:
      " John Wick is on the run after killing a member of the international assassin's guild, and with a $14 million price tag on his head, he is the target of hit",
    poster: "/posters/goodbai.jpeg",
    embed:
      "https://www.dropbox.com/scl/fi/natwuwifxsiy16m79i1y2/goodbai.mp4?rlkey=vp8qg6wb5io846x7mf3lpcj7g&st=zunpezyl&dl=0",
    type: "movie",
    year: 2022,
    genres: ["Romance", "Comedy"],
  },
];

// For backward compatibility with existing code
export const movies = content.filter(
  (item) => item.type === "movie"
) as Movie[];
