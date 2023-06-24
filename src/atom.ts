import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IMovies } from 'types';

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

export const moviesData = atom<IMovies[] | null>({
  key: 'movies',
  default: null,
});
