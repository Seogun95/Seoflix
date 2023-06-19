import { DramaHeader, HomeHeader, SearchHeader } from 'components/header';
import { Home, Drama, Search } from 'pages';

export interface RouteConfig {
  COMPONENT: () => JSX.Element;
  SEO_HEADER?: () => JSX.Element;
  TITLE: string;
  NAV: boolean;
  ROUTE: boolean;
}

type RouteMap = Record<string, Readonly<RouteConfig>>;

export const ROUTE_MAP: RouteMap = Object.freeze({
  '/': {
    COMPONENT: Home,
    SEO_HEADER: HomeHeader,
    TITLE: '홈',
    NAV: true,
    ROUTE: true,
  },
  '/drama': {
    COMPONENT: Drama,
    SEO_HEADER: DramaHeader,
    TITLE: '드라마',
    NAV: true,
    ROUTE: true,
  },
  '/search': {
    COMPONENT: Search,
    SEO_HEADER: SearchHeader,
    TITLE: '검색',
    NAV: false,
    ROUTE: false,
  },
});

export const ROUTER_LIST = Object.entries(ROUTE_MAP);
