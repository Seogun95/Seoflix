import { AnimatePresence, Variants, motion, useAnimation } from 'framer-motion';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RouteEnum } from 'components';

const xMarkVariants: Variants = {
  start: { y: 2, rotateZ: 0 },

  hover: { rotateZ: 90 },
};

interface IForm {
  keyword: string;
}
export const SearchBtn = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const inputAnimation = useAnimation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, setFocus } = useForm<IForm>({
    mode: 'onChange',
  });

  const onValid = (data: IForm) => {
    // navigate에 state전달 하는 방법 navigate(to, { state: { key: value } });
    navigate(`${RouteEnum.SEARCH}?keyword=${data.keyword}`, {
      state: { keyword: data.keyword },
    });
    setFocus('keyword');
    reset();
  };

  const handleSearchBtn = () => {
    if (showSearch) {
      inputAnimation.start({
        scaleX: 0,
        opacity: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
        opacity: 1,
      });
      setFocus('keyword');
    }
    setShowSearch(prev => !prev);
    reset();
  };

  return (
    <Wrapper ref={wrapperRef}>
      <SearchContainer
        type="button"
        onClick={handleSearchBtn}
        initial={{ y: 2 }}
        animate={{ x: showSearch ? -165 : 0 }}
        transition={{ duration: 0.2, type: 'tween' }}
      >
        <motion.svg viewBox="0 0 512 512">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </motion.svg>
      </SearchContainer>
      <AnimatePresence>
        <InputContainer
          onSubmit={handleSubmit(onValid)}
          animate={inputAnimation}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.2, type: 'tween' }}
          custom={showSearch}
        >
          <Input
            placeholder="제목, 사람, 장르"
            {...register('keyword', {
              required: { value: true, message: '필수 입력 사항입니다.' },
              minLength: 2,
            })}
          />
          <CancelContainer onClick={handleSearchBtn} type="button">
            <motion.svg
              viewBox="0 0 384 512"
              variants={xMarkVariants}
              whileHover="hover"
              initial="start"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </motion.svg>
          </CancelContainer>
        </InputContainer>
      </AnimatePresence>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  ${({ theme }) => theme.NoPaddingMargin};
  height: 100%;
`;

const SearchContainer = styled(motion.button)`
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
  z-index: 2;
`;

const InputContainer = styled(motion.form)`
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  transform-origin: right center;
  position: absolute;
  right: 0;
  padding: 0.3125rem 0.3125rem 0.3125rem 30px;
  border: 1px solid ${({ theme }) => theme.bgColor2};
  backdrop-filter: blur(10px);
  z-index: 0;
  height: 40px;
`;

const Input = styled.input`
  background-color: transparent;
  ${({ theme }) => theme.NoPaddingMargin};
  height: 100%;
  padding-left: 10px;
`;

const CancelContainer = styled(motion.button)`
  ${({ theme }) => theme.NoPaddingMargin};
`;
