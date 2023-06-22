export interface IMovies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: object;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovies[];
  total_pages: number;
  total_results: number;
}

export interface IAllMovies {
  adult: boolean;
  backdrop_path: string;
  genres: object;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
}

export type IMovieKinds =
  | 'now_playing'
  | 'popular'
  | 'top_rated'
  | 'latest'
  | 'upcoming';

export type ILanguage = 'ko-KR' | 'en-US' | 'js-JP' | 'ru-RU';
