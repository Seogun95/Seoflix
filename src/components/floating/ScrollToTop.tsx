import { useState, useEffect, useCallback } from 'react';
import { ScrollUp } from 'assets/svg';
import styled from 'styled-components';
import { throttle } from 'lodash';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = throttle(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 500);

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <ScrollToTopContainer visible={isVisible} onClick={handleScrollToTop}>
      <ScrollToTopIcon />
    </ScrollToTopContainer>
  );
};

const ScrollToTopContainer = styled.button<{ visible: boolean }>`
  padding: 0;
  background-color: transparent;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? 'translateY(0)' : 'translateY(2rem)'};

  ${({ theme, visible }) => theme.media.max.mobile`
    opacity: ${visible ? 1 : 0};
    &:hover { opacity: 1 }
  `}
`;

const ScrollToTopIcon = styled(ScrollUp)`
  width: 2.425rem;
  height: 2.425rem;
  transition: 0.2s ease;
  filter: ${({ theme }) => theme.shadow.drop};
  &:hover {
    filter: ${({ theme }) => theme.shadow.drop_Hover};
  }
  &:active {
    filter: ${({ theme }) => theme.shadow.drop} grayscale(0.3);
  }
  * {
    fill: ${({ theme }) => theme.scrollbar.iconBg};
    stroke: ${({ theme }) => theme.scrollbar.iconStroke};
  }
  ${({ theme }) => theme.media.max.mobile`
    &:hover, &:active {
      filter: ${theme.shadow.drop};
    }
  `}
`;
