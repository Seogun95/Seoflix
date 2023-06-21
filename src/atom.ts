import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IGetMoviesResult } from 'types';

/* ======= 다크모드 Atom ======= */
const { persistAtom: darkPersist } = recoilPersist({
  key: 'themeLocal',
  storage: localStorage,
});

export const isDarkAtom = atom<boolean>({
  key: 'isDark',
  default: true,
  effects_UNSTABLE: [darkPersist],
});
/* ======= END ======= */

export const isSidebar = atom<boolean>({
  key: 'sidebar',
  default: false,
});

export const moviesData = atom<IGetMoviesResult | null>({
  key: 'movies',
  default: null,
});
