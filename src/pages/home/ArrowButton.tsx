import { motion } from 'framer-motion';
import styled from 'styled-components';

interface IArrowButtonProps {
  prev: () => void;
  next: () => void;
}
export const ArrowButton = ({ prev, next }: IArrowButtonProps) => {
  return (
    <ArrowBtnContainer>
      <ArrowBtn
        onClick={prev}
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        이전
      </ArrowBtn>
      <ArrowBtn
        onClick={next}
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        증가
      </ArrowBtn>
    </ArrowBtnContainer>
  );
};

const ArrowBtnContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const ArrowBtn = styled(motion.button)`
  height: 100%;
  background: #000000b4;
  width: 3%;
  z-index: 1;
`;
