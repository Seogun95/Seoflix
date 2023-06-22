import { useQuery } from 'react-query';
import { getMovieData } from 'utils';
import { IGetMoviesResult } from 'types';

export const useMultipleQuery = () => {
  const nowPlay = useQuery<IGetMoviesResult>(['nowPlay'], () =>
    getMovieData(1),
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
