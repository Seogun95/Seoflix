import { ScreenViewLoading } from 'components';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { moviesData } from 'atom';

import { apiMovieThumbnailPath } from 'utils';
import { HomeSlider } from 'pages/home';
import { useMultipleQuery } from 'hooks/useMultipleQuery';

export function Home() {
  const [{ data: nowPlayData, isLoading: nowPlayIsLoading }] =
    useMultipleQuery();
  const saveMoviesData = useSetRecoilState(moviesData);

  useEffect(() => {
    if (!nowPlayIsLoading && nowPlayData) {
      saveMoviesData(nowPlayData);
    }
  }, [nowPlayIsLoading, nowPlayData, saveMoviesData]);

  return (
    <Wrapper>
      {nowPlayIsLoading ? (
        <ScreenViewLoading isLoading={nowPlayIsLoading} lazyTime={1} />
      ) : (
        <>
          <Banner
            bgPath={apiMovieThumbnailPath(
              nowPlayData?.results[0].backdrop_path || '',
            )}
          >
            <TitleContainer>
              <Title>{nowPlayData?.results[0].title}</Title>
              <Overview>{nowPlayData?.results[0].overview}</Overview>
            </TitleContainer>
          </Banner>
          <SliderWrapper>
            <HomeSlider />
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  min-height: 100vh;
  height: 100%;
  width: 100%;
`;

const Banner = styled.div<{ bgPath: string }>`
  ${({ theme }) => theme.FlexCol};
  min-height: 100vh;
  height: 100%;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  padding-left: 60px;
  background-image: ${({ bgPath, theme }) =>
    bgPath &&
    `linear-gradient(${theme.bgColor}b5, ${theme.bgColor}2d),
url(${bgPath})`};

  background-size: cover;
`;

const TitleContainer = styled.div`
  ${({ theme }) => theme.FlexCol};
  max-width: 31.25rem;
  width: 100%;
  gap: 1rem;
`;

const Title = styled.h2`
  text-align: start;
  white-space: pre-line;
  font-size: 3.75rem;
  width: 100%;
  ${({ theme }) => theme.media.max.tablet`
    font-size: 1.875rem;
  `}
`;
const Overview = styled.p`
  white-space: pre-line;
  text-align: justify;
`;

const SliderWrapper = styled.article`
  min-height: 50vh;
  height: 100%;
  width: 100%;
`;
