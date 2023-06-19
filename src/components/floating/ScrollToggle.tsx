import React from 'react';
import styled from 'styled-components';
import { ScrollToBottom } from './ScrollToBottom';
import { ScrollToTop } from './ScrollToTop';

export const ScrollToggle = () => {
  return (
    <Wrapper>
      <ScrollToTop />
      <ScrollToBottom />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.FlexCol};
  gap: 0.2rem;
  position: fixed;
  z-index: 99999;
  margin: 0.8rem 0.5rem;
  padding: 0;
  bottom: 0;
  right: 0.2rem;
  ${({ theme }) => theme.media.max.mobile`
    margin: 0.4rem 0;
    bottom: 0;
  `}
`;
