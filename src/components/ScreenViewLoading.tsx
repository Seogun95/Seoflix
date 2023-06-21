import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ModalPortal } from 'components';

interface ScreenViewLoadingProps {
  isLoading: boolean;
  lazyTime?: number;
}

export const ScreenViewLoading = ({
  isLoading,
  lazyTime,
}: ScreenViewLoadingProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isLoading) {
      timeoutId = setTimeout(
        () => {
          setLoading(true);
        },
        lazyTime ? lazyTime * 1000 : 0,
      );
    } else {
      setLoading(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isLoading, lazyTime, setLoading]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading && (
        <ModalPortal>
          <LoadingWrapper>
            <Spinner>
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </Spinner>
          </LoadingWrapper>
        </ModalPortal>
      )}
    </>
  );
};

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  width: calc(100vw + 11.7188rem);
  height: 100%;
  background-color: transparent;
`;

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }

  div:after {
    content: ' ';
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.brand};
    margin: -4px 0 0 -4px;
  }

  div:nth-child(1) {
    animation-delay: -0.036s;
  }

  div:nth-child(1):after {
    top: 63px;
    left: 63px;
  }

  div:nth-child(2) {
    animation-delay: -0.072s;
  }

  div:nth-child(2):after {
    top: 68px;
    left: 56px;
  }

  div:nth-child(3) {
    animation-delay: -0.108s;
  }

  div:nth-child(3):after {
    top: 71px;
    left: 48px;
  }

  div:nth-child(4) {
    animation-delay: -0.144s;
  }

  div:nth-child(4):after {
    top: 72px;
    left: 40px;
  }

  div:nth-child(5) {
    animation-delay: -0.18s;
  }

  div:nth-child(5):after {
    top: 71px;
    left: 32px;
  }

  div:nth-child(6) {
    animation-delay: -0.216s;
  }

  div:nth-child(6):after {
    top: 68px;
    left: 24px;
  }

  div:nth-child(7) {
    animation-delay: -0.252s;
  }

  div:nth-child(7):after {
    top: 63px;
    left: 17px;
  }

  div:nth-child(8) {
    animation-delay: -0.288s;
  }

  div:nth-child(8):after {
    top: 56px;
    left: 12px;
  }

  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
