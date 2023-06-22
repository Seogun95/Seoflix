import { useState } from 'react';
import styled from 'styled-components';
import { useMatch, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { moviesData } from 'atom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import { apiMovieThumbnailPath } from 'utils';
import { useWindowDimensions } from 'hooks';
import { HomeModal, ArrowButton } from 'pages/home';

interface IStateProps {
  index: number;
  leaving: boolean;
  showBtn: boolean;
}

export const HomeSlider = () => {
  const navigate = useNavigate();
  const allMovies = useRecoilValue(moviesData);
  const offset = 6;
  const gap = 10;
  const width = useWindowDimensions();
  const modalMatch = useMatch('/movies/:movieId');
  const [state, setState] = useState<IStateProps>({
    index: 0,
    leaving: false,
    showBtn: false,
  });

  const toggleLeaving = () =>
    setState(prevState => ({ ...prevState, leaving: !prevState.leaving }));

  const handleMouseEnter = () =>
    setState(prevState => ({ ...prevState, showBtn: true }));

  const handleMouseLeave = () =>
    setState(prevState => ({ ...prevState, showBtn: false }));

  const handleSlideBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const increaseIndex = () => {
    if (allMovies && !state.leaving) {
      toggleLeaving();
      const totalMovie = allMovies.results.length - 1;
      const lastPageNum = Math.floor(totalMovie / offset) - 1;
      setState(prevState => ({
        ...prevState,
        index: prevState.index === lastPageNum ? 0 : prevState.index + 1,
      }));
    }
  };

  const decreaseIndex = () => {
    if (allMovies && !state.leaving) {
      toggleLeaving();
      const totalMovie = allMovies.results.length;
      const lastPageNum = Math.floor(totalMovie / offset) - 1;
      setState(prevState => ({
        ...prevState,
        index: prevState.index === 0 ? lastPageNum : prevState.index - 1,
      }));
    }
  };

  const rowVariants: Variants = {
    hidden: {
      x: width + gap,
    },
    visible: {
      x: 0,
    },
    exit: { x: -width - gap },
  };

  const thumbnailVariants: Variants = {
    start: { scale: 1 },
    hover: {
      zIndex: 999,
      scale: 1.3,
      y: -50,
      transition: {
        delay: 0.5,
        duration: 0.2,
        type: 'tween',
      },
    },
  };

  const infoVariants: Variants = {
    hover: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.2,
        type: 'tween',
      },
    },
  };

  return (
    <Slider onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <AnimatePresence>
        {state.showBtn ? (
          <ArrowButton prev={increaseIndex} next={decreaseIndex} />
        ) : null}
      </AnimatePresence>
      <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
        <Row
          key={state.index}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween', duration: 0.5 }}
          variants={rowVariants}
          gap={gap}
          first={`${state.index === 0}`}
        >
          {allMovies?.results
            .slice(1)
            .slice(offset * state.index, offset * state.index + offset)
            .map(movie => (
              <ThumbnailContainer
                layoutId={`${movie.id}`}
                key={movie.id}
                initial="start"
                whileHover="hover"
                variants={thumbnailVariants}
                transition={{ type: 'ease' }}
                onClick={() => handleSlideBoxClicked(movie.id)}
              >
                <Thumbnail
                  src={apiMovieThumbnailPath(movie.backdrop_path)}
                  alt={movie.title}
                />
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </ThumbnailContainer>
            ))}
        </Row>
      </AnimatePresence>
      {modalMatch ? <HomeModal /> : null}
    </Slider>
  );
};

const Slider = styled.div`
  position: relative;
  ${({ theme }) => theme.FlexCol};
  width: 100%;
  height: 200px;
  top: -100px;
`;

const Row = styled(motion.div)<{ gap: number; first: string }>`
  position: absolute;
  display: grid;
  gap: ${({ gap }) => gap}px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  height: 100%;
  padding-right: 1rem;
  padding-left: ${({ first }) => (first === 'true' ? '60px' : '1rem')};
`;

const ThumbnailContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 10px;
  overflow: hidden;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  span {
    color: ${({ theme }) => theme.fontColor};
  }
`;

const Thumbnail = styled.img`
  ${({ theme }) => theme.wh100};
  object-fit: cover;
`;
const Info = styled(motion.div)`
  background-color: ${({ theme }) => theme.bgColor};
  padding: 10px 20px;
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;

  h4 {
    text-align: center;
    font-size: 1rem;
    ${({ theme }) => theme.TextEllipsisMultiline};
  }
`;
