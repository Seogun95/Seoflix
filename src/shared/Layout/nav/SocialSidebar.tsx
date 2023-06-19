import { Dot } from 'assets/svg';
import styled from 'styled-components';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useState } from 'react';
import { DarkModeToggle } from 'components';
import { SocialLink } from 'shared/Layout/nav';

const socialVariants: Variants = {
  start: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
    },
  },
  hidden: {
    opacity: 0,
    y: -5,
  },
};

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
export const SocialSidebar = () => {
  const [show, setShow] = useState(false);
  const handleShowPress = () => setShow(prev => !prev);
  const handleMouseEnter = () => !isMobile && setShow(true);
  const handleMouseLeave = () => !isMobile && setShow(false);

  return (
    <Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SidebarButton onClick={handleShowPress}>
        <Dot />
      </SidebarButton>
      <AnimatePresence>
        {show ? (
          <SidebarContainer
            animate="visible"
            exit="hidden"
            initial="start"
            variants={socialVariants}
          >
            <SidebarMenu>
              <SideDarkMenu>
                <p>Appearance</p>
                <DarkModeToggle side />
              </SideDarkMenu>
            </SidebarMenu>
            <SidebarMenu>
              <SocialLink side />
            </SidebarMenu>
          </SidebarContainer>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  display: none;
  ${({ theme }) => theme.media.max.desktop`
    display: block;
  `}

  ${({ theme }) => theme.media.max.tablet`
    display: none;
  `}
`;

const SidebarButton = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  height: 100%;
  opacity: 0.8;
  transition: 0.2s ease;
  ${props => props.theme.CursorActive};
  &:hover {
    opacity: 1;
  }
  svg {
    width: 1.25rem;
    circle {
      fill: ${({ theme }) => theme.fontColor}fa;
    }
  }
`;

const SidebarContainer = styled(motion.div)`
  position: absolute;
  top: 90%;
  right: 0;
  ${({ theme }) => theme.FlexCol};
  background-color: ${({ theme }) => theme.bgColor}ee;
  border-radius: 0.625rem;
  backdrop-filter: blur(0.1875rem);
  border: 0.125rem solid ${({ theme }) => theme.bgColorDeep};
`;

const SidebarMenu = styled.div`
  padding: 0.5rem 0;
  width: 100%;
  min-height: 2.5rem;
  border: 0.0625rem solid transparent;
  :last-child {
    border-top: 0.125rem solid ${({ theme }) => theme.bgColorDeep};
    display: flex;
  }
`;

const SideDarkMenu = styled.div`
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  padding: 0 0.5rem 0 1rem;
  white-space: nowrap;
  p {
    flex-grow: 1;
    line-height: 1.75rem;
    font-size: 0.75rem;
    font-weight: 500;
  }
`;
