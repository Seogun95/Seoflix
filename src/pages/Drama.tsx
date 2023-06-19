import React from 'react';
import styled from 'styled-components';

export function Drama() {
  return (
    <Wrapper>
      <span>Drama</span>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  height: 150vh;
`;
