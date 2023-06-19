import { logoActive, logoHover } from 'assets/svg';

export const PreloadImages = () => {
  return (
    <>
      <img src={logoHover} style={{ display: 'none' }} alt="preloaded" />
      <img src={logoActive} style={{ display: 'none' }} alt="preloaded" />
    </>
  );
};
