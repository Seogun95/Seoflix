import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isSidebar } from 'atom';
import { HamburgerSidebar } from './HamburgerSidebar';

export const Hamburger = () => {
  const [active, setActive] = useRecoilState(isSidebar);

  const handleHamburger = () => {
    setActive(prev => !prev);
  };

  useEffect(() => {
    const checkSize = () => window.innerWidth >= 768 && setActive(false);
    window.addEventListener('resize', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, [setActive]);

  return (
    <>
      <Wrapper onClick={handleHamburger}>
        <HamburgerPath className={active ? 'active' : ''}>
          <span />
          <span />
          <span />
        </HamburgerPath>
      </Wrapper>
      <HamburgerSidebar />
    </>
  );
};

const HamburgerPath = styled.span`
  position: relative;
  width: 16px;
  height: 14px;
  overflow: hidden;
  span {
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: ${({ theme }) => theme.fontColor}fa;
    transition: top 0.25s, background-color 0.5s, transform 0.25s;
    left: 0;
    :nth-child(1) {
      top: 0;
      transform: translate(0);
    }
    :nth-child(2) {
      top: 6px;
      transform: translate(8px);
    }
    :nth-child(3) {
      top: 12px;
      transform: translate(4px);
    }
  }

  &.active {
    span {
      :nth-child(1) {
        top: 6px;
        transform: translate(0) rotate(225deg);
      }
      :nth-child(2) {
        transform: translate(16px);
      }
      :nth-child(3) {
        top: 6px;
        transform: translate(0) rotate(135deg);
      }
    }
  }
`;

const Wrapper = styled.button`
  display: none;
  ${({ theme }) => theme.FlexCenter};
  ${({ theme }) => theme.NoPaddingMargin};
  background: transparent;
  width: 2.5rem;
  height: 100%;
  opacity: 0.8;
  transition: 0.3s ease;
  &:hover {
    opacity: 1;
  }
  &:hover ${HamburgerPath}:not(.active) {
    span {
      :nth-child(1) {
        transform: translate(4px);
      }
      :nth-child(2) {
        transform: translate(0);
      }
      :nth-child(3) {
        transform: translate(8px);
      }
    }
  }

  ${({ theme }) => theme.media.max.tablet`
    display: flex;

  `}
`;
