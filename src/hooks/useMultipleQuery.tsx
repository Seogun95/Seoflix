import { useQuery } from 'react-query';
import { IGetMoviesResult, IMovies } from 'types';

interface IDataFetch {
  isLoading: boolean;
  datas?: IMovies[];
}

const dataFetch = (data?: IGetMoviesResult[]): IMovies[] => {
  if (data?.length === 0) {
    return [];
  }
  const totalResultObj: IMovies[] = data!
    .map(parentObj => [...parentObj.results])
    .reduce((prev, curr) => [...prev, ...curr]);
  return totalResultObj;
};

export const useDataFetch = (
  keyArr: readonly string[],
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
): IDataFetch => {
  const { isLoading, data } = useQuery([...keyArr], () => callback(), {
    staleTime: 60000,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    select: (data?: IGetMoviesResult[]) => {
      return dataFetch(data);
    },
  });

  return { isLoading, datas: data };
};
