import { ROUTER_LIST } from 'components/constants/routes';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isSidebar } from 'atom';
import { DarkModeToggle, ModalPortal } from 'components';
import { HamburgerNav, SocialLink } from 'shared/Layout/nav';

const hamburgerVariants: Variants = {
  start: {
    y: -10,
  },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.8,
      duration: 0.6,
    },
  },
  hidden: {
    opacity: 0,
    y: -5,
  },
};

export const HamburgerSidebar = () => {
  const active = useRecoilValue(isSidebar);
  const { pathname } = useLocation();
  useEffect(() => {
    if (active) document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [active]);

  return (
    <ModalPortal>
      <AnimatePresence>
        {active ? (
          <Wrapper
            variants={hamburgerVariants}
            animate="visible"
            exit="hidden"
            initial="start"
          >
            <SidebarContainer>
              {ROUTER_LIST.map(([PATH, DATA]) => {
                return PATH === pathname
                  ? DATA.NAV && <HamburgerNav key={PATH} />
                  : null;
              })}
              <SideDarkMenu>
                <p>Appearance</p>
                <DarkModeToggle side />
              </SideDarkMenu>
              <SideSocialMenu>
                <SocialLink side />
              </SideSocialMenu>
            </SidebarContainer>
          </Wrapper>
        ) : null}
      </AnimatePresence>
    </ModalPortal>
  );
};

const Wrapper = styled(motion.aside)`
  position: fixed;
  top: 3.75rem;
  left: 0;
  z-index: 999999;
  ${({ theme }) => theme.FlexCenter};
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 0 0 0.625rem 0.625rem;
  backdrop-filter: blur(0.1875rem);
  border: 0.125rem solid ${({ theme }) => theme.bgColorDeep};
  padding: 0 32px;
  display: none;
  ${({ theme }) => theme.media.max.tablet`
    ${theme.FlexCol};
    justify-content: flex-start;
  `}
`;
const SidebarContainer = styled(motion.div)`
  ${({ theme }) => theme.FlexCol};
  width: 100%;
  margin: 0 auto;
  padding: 24px 0 96px;
  max-width: 288px;
`;

const SideDarkMenu = styled.div`
  ${({ theme }) => theme.FlexRow};
  background-color: ${({ theme }) => theme.bgColorDeep}aa;
  border-radius: 0.625rem;
  align-items: center;
  padding: 0.3rem 0rem 0.3rem 1rem;
  margin: 1rem 0;
  white-space: nowrap;
  p {
    flex-grow: 1;
    line-height: 1.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    opacity: 0.8;
  }
`;

const SideSocialMenu = styled.div`
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
