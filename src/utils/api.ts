/*
TheMovieDB API Key
https://www.themoviedb.org/settings/api?language=ko

TheMovieDB API Document
https://developers.themoviedb.org/3/movies/get-now-playing

TheMovieDB Image가져오기
이미지 파일명 앞에 https://image.tmdb.org/t/p/original/ 붙이기
*/

import axios from 'axios';
import { ILanguage, IMovieKinds } from 'types';

const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjQ0NDY5NTg4ZDI5YjE3ZDBjMzdlZjFjZDg3NzZjOSIsInN1YiI6IjY0OTA1NzFmMjYzNDYyMDEyZDRiNTVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.meWe9Qov-9IlZjHvRZBmAPovd_uyPIBkZPYwBJTVtpo';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getMovies = async (
  lang: ILanguage,
  subKind: IMovieKinds,
  page?: number,
) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${subKind}?language=${lang}&page=${page ?? 1}`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  );
  return response.data;
};

export const getApiAllDetail = async (
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
  const response = await axios.get(`${BASE_URL}/${endpoint}?language=${lang}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return response.data;
};

export const getMovieThumbnail = (path: string, format?: string) => {
  return `${IMAGE_BASE_URL}/${format ?? 'original'}/${path}`;
};
