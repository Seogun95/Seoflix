import styled, { useTheme } from 'styled-components';
import { HeaderLogo, HeaderNav } from 'shared/Layout';
import {
  Variants,
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';

export const Header = () => {
  const { scrollYProgress } = useScroll();
  const navAnimation = useAnimation();
  const theme = useTheme();

  const navVariants: Variants = {
    top: {
      backgroundColor: theme.headerBgTop,
    },
    scroll: {
      backgroundColor: theme.headerBg,
    },
  };

  useMotionValueEvent(scrollYProgress, 'change', y => {
    if (y < 0.1) navAnimation.start('top');
    else navAnimation.start('scroll');
  });

  return (
    <HeaderStyles variants={navVariants} initial="top" animate={navAnimation}>
      <HeaderContainer>
        <HeaderLogoContainer>
          <HeaderLogo />
          <HeaderNav />
        </HeaderLogoContainer>
      </HeaderContainer>
    </HeaderStyles>
  );
};

const HeaderStyles = styled(motion.header)`
  width: 100%;
  height: 3.75rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  background-image: ${({ theme }) => theme.shadow.headerTop};
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0.75rem 0 1.5rem;
  ${({ theme }) => theme.media.min.tablet`
    padding: 0 .75rem 0 2rem;
  `}

  ${({ theme }) => theme.media.min.laptop`
    padding: 0 2rem
  `}
`;

const HeaderLogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 86rem;
  height: 100%;
`;
