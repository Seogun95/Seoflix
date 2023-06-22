import { useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalPortal } from 'components';
import {
  FormatDateToKoShort,
  getAllMovieData,
  apiMovieThumbnailPath,
} from 'utils';
import { useQuery } from 'react-query';
import { IAllMovies } from 'types';

export const HomeModal = () => {
  const navigate = useNavigate();
  const modalMatch = useMatch('/movies/:movieId');
  const movieId = modalMatch?.params.movieId && modalMatch.params.movieId;

  const { data: detailData } = useQuery<IAllMovies>(
    ['movies', movieId],
    () => getAllMovieData(movieId as string),
    {
      enabled: !!movieId && !!modalMatch,
      keepPreviousData: false,
    },
  );

  const handleOutsideClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (modalMatch) document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [modalMatch]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <ModalPortal>
        <AnimatePresence initial={false}>
          <ModalContainer
            onClick={handleOutsideClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Modal layoutId={modalMatch?.params.movieId}>
              <ModalWrapper>
                {detailData && (
                  <>
                    <MovieImgContainer
                      bg={apiMovieThumbnailPath(detailData.backdrop_path)}
                    >
                      <TitleContainer>
                        <h2>{detailData.title}</h2>
                        <PlayAndLikeContainer>
                          <PlayBtn>재생</PlayBtn>
                          <Icon icon="\f067" />
                          <Icon icon="\f164" />
                        </PlayAndLikeContainer>
                      </TitleContainer>
                      <img
                        src={apiMovieThumbnailPath(detailData.poster_path)}
                        alt={detailData.overview}
                      />
                    </MovieImgContainer>
                    <MovieDescription>
                      <Date>
                        <span>개봉일</span>
                        {FormatDateToKoShort(detailData.release_date)}
                      </Date>
                      <Info>
                        <span>영화 정보</span>
                        {detailData?.overview}
                      </Info>
                    </MovieDescription>
                  </>
                )}
              </ModalWrapper>
            </Modal>
          </ModalContainer>
        </AnimatePresence>
      </ModalPortal>
    </>
  );
};
const ModalContainer = styled(motion.section)`
  ${({ theme }) => theme.FlexRow};
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  opacity: 0;
  background-color: ${({ theme }) => theme.bgColor}cc;
`;
const Modal = styled(motion.div)`
  max-width: 50vw;
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.bgColor};
  margin: auto;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadow.box};
  overflow: hidden;
`;

const ModalWrapper = styled(motion.article)`
  min-height: 60vh;
  height: auto;
`;
const MovieImgContainer = styled.div<{ bg: string }>`
  position: relative;
  background: ${({ bg }) =>
    bg
      ? `linear-gradient(rgb(1 0 0 / 43%), black) 0% 0% / cover no-repeat, url(${bg});`
      : 'transparent'};
  background-position: 50% 50%;
  width: 100%;
  height: 500px;
  min-height: 500px;
  img {
    ${({ theme }) => theme.wh100};
    object-fit: contain;
  }
  ::before {
    content: '';
    ${({ theme }) => theme.wh100};

    background: ${({ theme }) =>
      `linear-gradient(0deg, ${theme.bgColor}, transparent 50%)`};
    position: absolute;
    bottom: 0;
  }
`;

const TitleContainer = styled.div`
  ${({ theme }) => theme.FlexCol};
  position: absolute;
  bottom: 5%;
  left: 3em;
  width: 40%;
`;

const PlayAndLikeContainer = styled.div`
  ${({ theme }) => theme.FlexRow};
  margin-top: 1rem;
  gap: 0.5rem;
  cursor: pointer;
`;

const PlayBtn = styled.div`
  background: white;
  color: black;
  padding: 0.5rem 2rem;
  border-radius: 0.3125rem;
  :before {
    content: '\f04b';
    font-weight: 900;
    font-family: 'Font Awesome 5 Pro';
  }
`;

const Icon = styled.span<{ icon: string }>`
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  width: 2.25rem;
  height: auto;
  border-radius: 50%;
  border: 2px solid white;
  background: rgba(0, 0, 0, 0.2);
  transition: 0.3s ease all;
  :hover {
    background: rgba(0, 0, 0, 1);
  }
  ::before {
    content: ${({ icon }) => (icon ? `'${icon}'` : 'none')};
    ${({ theme }) => theme.FontAwesome};
    color: white;
  }
`;

const MovieDescription = styled.article`
  ${({ theme }) => theme.FlexCol};
  padding: 2rem 1rem 2rem;
  height: auto;
  background-color: ${({ theme }) => theme.bgColor};
  gap: 1rem;
`;

const Date = styled.div`
  font-size: 0.8rem;
  span {
    color: ${({ theme }) => theme.colors.brand};
    padding-right: 0.3125rem;
  }
`;

const Info = styled.div`
  ${({ theme }) => theme.FlexCol};
  span:first-child {
    font-weight: bold;
    padding-bottom: 0.4rem;
    font-size: 1rem;

    ::before {
      content: '\f8d6';
      ${({ theme }) => theme.FontAwesome};
      padding-right: 0.5rem;
      color: ${({ theme }) => theme.colors.red};
    }
  }
  line-height: 1.5;
  text-align: justify;
  font-size: 0.9rem;
`;
