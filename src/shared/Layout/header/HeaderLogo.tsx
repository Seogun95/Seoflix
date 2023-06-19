import React, { useState } from 'react';
import styled from 'styled-components';
import { isDarkAtom } from 'atom';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoActive, logoHover, logo } from 'assets/svg';

export const HeaderLogo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const isDark = useRecoilValue(isDarkAtom);
  const homeCheck = location.pathname === '/';
  const scrollTop = window.pageYOffset;

  const scrollToTop = () => {
    if (homeCheck && scrollTop === 0) return;
    if (!homeCheck && scrollTop === 0) {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <HeaderLink
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={isHovered ? 'active' : ''}
    >
      <LogoImg src={logo} isDark={isDark} />
      <LogoText>seoflix</LogoText>
    </HeaderLink>
  );
};

const LogoImg = styled.img<{ isDark: boolean }>`
  content: url(${logo});
  width: 2rem;
  height: 100%;
  padding: 0.2rem;
  filter: ${({ isDark }) => isDark && 'invert(1)'};
`;

const LogoText = styled.span`
  padding-left: 0.5rem;
  font-weight: 500;
  transition: 0.3s ease opacity;
  text-transform: uppercase;
`;
const HeaderLink = styled.a`
  display: flex;
  align-items: center;
  padding-top: 0.0625rem;
  margin-right: auto;
  height: 3.125rem;
  &.active {
    &:hover ${LogoImg} {
      content: url(${logoHover});
    }
    &:active ${LogoImg} {
      content: url(${logoActive});
    }
    &:hover ${LogoText} {
      opacity: 0.6;
    }
  }
`;
