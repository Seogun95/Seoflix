import { isSidebar } from 'atom';
import { ROUTER_LIST } from 'components/constants/routes';
import { Link, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

export function HamburgerNav() {
  const { pathname } = useLocation();
  const setSidebar = useSetRecoilState(isSidebar);
  return (
    <Nav>
      {ROUTER_LIST.map(([PATH, DATA]) => {
        if (DATA.ROUTE) {
          const isActive = PATH === pathname;
          return (
            <NavLink
              to={PATH}
              key={DATA.TITLE}
              active={`${isActive}`}
              onClick={() => setSidebar(false)}
            >
              {isActive && <Highlight key={DATA.TITLE} />}
              <NavTitle>{DATA.TITLE}</NavTitle>
            </NavLink>
          );
        }
        return null;
      })}
    </Nav>
  );
}

const Nav = styled.nav`
  ${({ theme }) => theme.FlexCol};
  justify-content: flex-end;
  align-items: flex-start;
  flex-grow: 1;
`;

const NavLink = styled(Link)<{ active: string }>`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  transition: 0.2s ease;
  opacity: ${({ active }) => (active === 'true' ? 1 : 0.7)};
  position: relative;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.bgColorDeep};
  height: 3rem;
  overflow: hidden;
  width: 100%;

  :hover {
    opacity: 1;
  }
`;

const NavTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
`;

const Highlight = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.125rem;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, rgb(245, 112, 112), rgb(240, 41, 41));
`;
