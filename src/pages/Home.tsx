import React from 'react';
import styled from 'styled-components';

export function Home() {
  return (
    <Wrapper>
      <span>home</span>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  height: 200vh;
`;
