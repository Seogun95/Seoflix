import { HomeHeader } from 'components/header';
import { Home } from 'pages';

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
});

export const ROUTER_LIST = Object.entries(ROUTE_MAP);
