import { ILanguage, IMovieKinds } from 'types';

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

export const apiMoviesPath = (
  lang: ILanguage,
  subKind: IMovieKinds,
  page: number,
) => {
  return `/movie/${subKind}?language=${lang}&page=${page}`;
};

export const apiAllMovieDetailPath = (
  lang: ILanguage,
  movieId?: string,
  tvId?: string,
) => {
  let endpoint = '';
  if (movieId) {
    endpoint = `movie/${movieId}`;
  } else if (tvId) {
    endpoint = `tv/${tvId}`;
  }
  return `/${endpoint}?language=${lang}`;
};

export const apiMovieThumbnailPath = (path: string, format?: string) => {
  return `${IMAGE_BASE_URL}/${format ?? 'original'}/${path}`;
};

export const apiSearchData = (
  category: string,
  keyword: string,
  lang: ILanguage,
  page: number,
) => {
  return `/search/${category}?query=${keyword}&include_adult=false&language=${lang}&page=${page}`;
};
