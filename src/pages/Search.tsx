import React from 'react';
import styled from 'styled-components';

export function Search() {
  return (
    <Wrapper>
      <span>Search</span>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  height: 100%;
`;
