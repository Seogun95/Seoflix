import React from 'react';

import { Hamburger, RouterNav, SocialLink, SocialSidebar } from 'shared/Layout';
import { DarkModeToggle, ROUTER_LIST } from 'components';
import { useLocation } from 'react-router-dom';

export const HeaderNav = React.memo(() => {
  const location = useLocation();
  return (
    <>
      {ROUTER_LIST.map(([PATH, DATA]) => {
        return PATH === location.pathname
          ? DATA.NAV && <RouterNav key={PATH} />
          : null;
      })}
      <DarkModeToggle side={false} />
      <SocialLink side={false} />
      <SocialSidebar />
      <Hamburger />
    </>
  );
});
