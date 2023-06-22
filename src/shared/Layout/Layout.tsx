import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import { ProgressBar, ScrollToggle } from 'components';

export function Layout() {
  return (
    <Suspense fallback={null}>
      <ProgressBar />
      <Wrapper>
        <Outlet />
        <ScrollToggle />
      </Wrapper>
    </Suspense>
  );
}

const Wrapper = styled.main`
  position: absolute;
  width: 100vw;
  min-height: 100vh;
  height: auto;
`;
