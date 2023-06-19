import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { HeaderLogo, HeaderNav } from 'shared/Layout';

export const Header = () => {
  const location = useLocation();
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setScroll(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  return (
    <HeaderStyles isScrolled={scroll}>
      <HeaderContainer>
        <HeaderLogoContainer>
          <HeaderLogo />
          <HeaderNav />
        </HeaderLogoContainer>
      </HeaderContainer>
    </HeaderStyles>
  );
};

const HeaderStyles = styled.header<{ isScrolled: boolean }>`
  width: 100%;
  height: 3.75rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.3s ease;
  z-index: 99999;
  background: ${({ isScrolled, theme }) =>
    isScrolled ? theme.shadow.header : theme.shadow.headerTop};
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0.75rem 0 1.5rem;
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
