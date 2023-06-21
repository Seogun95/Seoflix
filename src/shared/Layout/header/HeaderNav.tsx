import React from 'react';
import styled from 'styled-components';
import { Hamburger, RouterNav, SocialLink, SocialSidebar } from 'shared/Layout';
import { DarkModeToggle, ROUTER_LIST } from 'components';
import { useLocation } from 'react-router-dom';
import { SearchBtn } from '../nav/SearchBtn';

export const HeaderNav = React.memo(() => {
  const location = useLocation();

  const matchingRoute = ROUTER_LIST.find(
    ([PATH, DATA]) => location.pathname.startsWith(PATH) && DATA.NAV,
  );

  return (
    <Wrapper>
      {matchingRoute && <RouterNav key={matchingRoute[0]} />}
      <SearchBtn />
      <DarkModeToggle side={false} />
      <SocialLink side={false} />
      <SocialSidebar />
      <Hamburger />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: contents;
  svg {
    ${({ theme }) => theme.CursorActive};
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0.8;
    transition: opacity 0.3s ease;
    path {
      fill: currentColor;
    }
    :hover {
      opacity: 1;
    }
  }
`;
