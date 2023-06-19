import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import { HeaderLogo, HeaderNav } from 'shared/Layout';

interface IHeader {
  isScrolled: boolean;
  isScrollTop: boolean;
}
export const Header = () => {
  const location = useLocation();
  const [scroll, setScroll] = useState<IHeader>({
    isScrolled: false,
    isScrollTop: true,
  });

  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const scrollTop = window.pageYOffset;

  useEffect(() => {
    const handleScroll = () => {
      setScroll(prevState => {
        if (scrollTop > lastScrollTop && scrollTop > 0) {
          return { ...prevState, isScrolled: true };
        }
        return { isScrollTop: false, isScrolled: false };
      });
      setLastScrollTop(scrollTop);
    };

    const handleResize = _.debounce(() => {
      if (scrollTop === 0) {
        setScroll({ isScrollTop: true, isScrolled: false });
      }
      setLastScrollTop(scrollTop);
    }, 200);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollTop, scrollTop]);

  useEffect(() => {
    if (scrollTop === 0) {
      setScroll({ isScrollTop: true, isScrolled: false });
    }
    setLastScrollTop(scrollTop);
  }, [location, scrollTop]);

  return (
    <HeaderStyles
      className={scroll.isScrolled ? 'isHidden' : ''}
      scrollTop={`${scroll.isScrollTop}`}
    >
      <HeaderContainer>
        <HeaderLogoContainer>
          <HeaderLogo />
          <HeaderNav />
        </HeaderLogoContainer>
      </HeaderContainer>
    </HeaderStyles>
  );
};

const HeaderStyles = styled.header<{ scrollTop: string }>`
  width: 100%;
  height: 3.75rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  background-color: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 10%,
    transparent
  );
  z-index: 99999;
  ${({ scrollTop }) =>
    scrollTop === 'true'
      ? css`
          background-color: transparent;
        `
      : css`
          ${props => props.theme.DarkBlur}
        `}
  &.isHidden {
    transform: translateY(-100%);
    border: none;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0.75rem 0 1.5rem;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.bgColorDeep};
  ${({ theme }) => theme.media.min.tablet`
    padding: 0 .75rem 0 2rem;
  `}

  ${({ theme }) => theme.media.min.laptop`
    padding: 0 2rem
  `}
`;

const HeaderLogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 86rem;
  height: 100%;
`;
