/*
TheMovieDB API Key
https://www.themoviedb.org/settings/api?language=ko

TheMovieDB API Document
https://developers.themoviedb.org/3/movies/get-now-playing

TheMovieDB Image가져오기
이미지 파일명 앞에 https://image.tmdb.org/t/p/original/ 붙이기
*/

import axios from 'axios';
import { apiAllMovieDetailPath, apiMoviesPath, apiSearchData } from './path';

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
});

export const getMovieData = async (page: number) => {
  const response = await axiosInstance.get(
    apiMoviesPath('ko-KR', 'now_playing', page),
  );
  return response.data;
};

export const getAllMovieData = async (tvId?: string, movieId?: string) => {
  const response = await axiosInstance.get(
    apiAllMovieDetailPath('ko-KR', tvId, movieId),
  );
  return response.data;
};

export const getSearchData = async (keyword: string, page: number) => {
  const response = await axiosInstance.get(
    apiSearchData('tv', keyword, 'ko-KR', page),
  );
  return response.data;
};
