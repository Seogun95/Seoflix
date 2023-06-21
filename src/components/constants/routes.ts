import {
  DramaHeader,
  HomeHeader,
  MovieHeader,
  SearchHeader,
} from 'components/header';
import { Home, Drama, Search, HomeModal } from 'pages';

export interface IRouteConfig {
  COMPONENT: () => JSX.Element;
  SEO_HEADER?: () => JSX.Element;
  TITLE: string;
  NAV?: boolean;
  ROUTE?: boolean;
  CHILDREN?: IChildrenElements[];
}

interface IChildrenElements {
  PATH: string;
  ELEMENT: () => JSX.Element;
}

type RouteMap = Record<string, Readonly<IRouteConfig>>;

export const ROUTE_MAP: RouteMap = Object.freeze({
  '/': {
    COMPONENT: Home,
    SEO_HEADER: HomeHeader,
    TITLE: '홈',
    NAV: true,
    ROUTE: true,
  },
  '/movies': {
    COMPONENT: Home,
    SEO_HEADER: MovieHeader,
    TITLE: '영화',
    NAV: true,
    ROUTE: true,
    CHILDREN: [{ PATH: '/movies/:id', ELEMENT: HomeModal }],
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
