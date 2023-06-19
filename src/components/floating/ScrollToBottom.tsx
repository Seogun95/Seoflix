import { useState, useEffect, useCallback } from 'react';
import { ScrollDown } from 'assets/svg';
import styled from 'styled-components';
import { throttle } from 'lodash';
import { useLocation } from 'react-router-dom';

export const ScrollToBottom = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const handleScrollToBottom = throttle(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, 500);

  const handleScroll = useCallback(() => {
    if (
      window.pageYOffset <
      document.documentElement.scrollHeight - window.innerHeight
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, location]);

  return (
    <ScrollToBottomContainer visible={isVisible} onClick={handleScrollToBottom}>
      <ScrollToBottomIcon />
    </ScrollToBottomContainer>
  );
};

const ScrollToBottomContainer = styled.button<{ visible: boolean }>`
  padding: 0;
  background-color: transparent;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? 'translateY(0)' : 'translateY(2rem)'};
  ${({ theme, visible }) => theme.media.max.mobile`
    opacity: ${visible ? 1 : 0};
    transform: ${visible ? 'translateY(0)' : 'translateY(2rem)'};
    &:hover { opacity: 1 }
  `}
`;

const ScrollToBottomIcon = styled(ScrollDown)`
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
