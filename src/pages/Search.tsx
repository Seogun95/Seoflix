import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { IGetMoviesResult } from 'types';
import { apiMovieThumbnailPath, getSearchData } from 'utils';
import { ScreenViewLoading } from 'components';

import emptyImg from 'assets/img/empty.png';

export function Search() {
  const location = useLocation();
  const searchKeyword = location.state.keyword;
  const { data: searchData, isLoading: searchLoading } =
    useQuery<IGetMoviesResult>(['movie', searchKeyword], () =>
      getSearchData(searchKeyword, 1),
    );

  console.log('searchData --->', searchData);

  // 아래는 동일한 결과를 불러온다. state로 전달하거나, URLSearchParams를 통해 key의 value를 가져올 수 도 있다.
  // const keyword = new URLSearchParams(location.search).get('keyword');
  // console.log('location --->', location.state.keyword);
  // console.log('keyword --->', keyword);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {searchLoading ? (
        <ScreenViewLoading isLoading={searchLoading} />
      ) : (
        <Wrapper>
          {searchData && searchData?.results.length > 0 ? (
            <MovieContainer>
              <MovieList>
                <MovieSlider>
                  {searchData.results.map(v => (
                    <MovieSliderBox key={v.id}>
                      <MovieSliderImg
                        src={
                          v.backdrop_path
                            ? apiMovieThumbnailPath(v.backdrop_path)
                            : emptyImg
                        }
                        alt={v.name}
                      />
                      <MovieInfoContainer>
                        <span>{v.name}</span>
                      </MovieInfoContainer>
                    </MovieSliderBox>
                  ))}
                </MovieSlider>
              </MovieList>
            </MovieContainer>
          ) : (
            <NoItem>
              <h1>{`'${searchKeyword}'`} 검색 결과가 존재하지 않습니다</h1>
            </NoItem>
          )}
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.section`
  position: relative;
  ${({ theme }) => theme.FlexCol};
  justify-content: flex-start;
  min-height: 100vh;
  height: 100%;
  width: 100%;
`;

const MovieContainer = styled.article`
  display: block;
  padding: 6rem 0 3rem;
`;
const MovieList = styled.div`
  margin: 0 0 4vw;
`;

const MovieSlider = styled.div`
  margin: 0;
  padding: 0 4%;
  position: relative;
  touch-action: pan-y;
`;
const MovieSliderBox = styled.div`
  width: 25%;
  min-height: 200px;
  box-sizing: border-box;
  display: inline-block;
  padding: 0 0.5vw 2.5vh;
  position: relative;
  vertical-align: top;
  white-space: normal;
  z-index: 1;
`;

const MovieSliderImg = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 200px;
  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.bgColor2};
`;
const MovieInfoContainer = styled.div`
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  padding-top: 0.5rem;
`;

const NoItem = styled.article`
  position: relative;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  min-height: 100vh;
  height: 100%;
  width: 100%;
`;
