import { useQuery } from 'react-query';
import { getMovies } from 'utils';
import { IGetMoviesResult } from 'types';

export const useMultipleQuery = () => {
  const nowPlay = useQuery<IGetMoviesResult>(['nowPlay'], () =>
    getMovies('ko-KR', 'now_playing'),
  );
  return [nowPlay];
};

/*
const [
  {
    data: nowPlayData,
    isLoading: nowPlayIsLoading,
    error: nowPlayError
  }
] = useMultipleQuery();
*/
