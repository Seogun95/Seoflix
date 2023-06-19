import { ROUTER_LIST } from 'components/constants/routes';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export function RouterNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && ['ArrowRight', 'ArrowLeft'].includes(event.key)) {
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const currentIndex = ROUTER_LIST.findIndex(
          ([path]) => path === pathname,
        );
        const nextIndex =
          (currentIndex + direction + ROUTER_LIST.length) % ROUTER_LIST.length;
        navigate(ROUTER_LIST[nextIndex][0]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pathname, navigate]);

  return (
    <Wrapper>
      <Nav>
        {ROUTER_LIST.map(([PATH, DATA]) => {
          if (DATA.ROUTE) {
            const isActive = PATH === pathname;
            return (
              <NavLink to={PATH} key={DATA.TITLE} active={`${isActive}`}>
                {isActive && <Highlight key={DATA.TITLE} layoutId="nav" />}
                <NavTitle>{DATA.TITLE}</NavTitle>
              </NavLink>
            );
          }
          return null;
        })}
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  display: none;
  margin-left: 3.125rem;
  ${({ theme }) => theme.media.min.tablet`
    display: flex;
  `}
`;

const NavLink = styled(Link)<{ active: string }>`
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  height: 3.75rem;
  font-size: 0.8rem;
  transition: 0.2s ease;
  opacity: ${({ active }) => (active === 'true' ? 1 : 0.7)};
  position: relative;
  :hover {
    opacity: 1;
  }
  ::after {
    content: '';
    position: absolute;
    width: 0.0625rem;
    height: 1.5rem;
    background-color: ${({ theme }) => theme.bgColorDeep};
    right: 0;
  }
`;

const NavTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
`;

const Highlight = styled(motion.div)`
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 0.125rem;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, rgb(245, 112, 112), rgb(240, 41, 41));
`;
