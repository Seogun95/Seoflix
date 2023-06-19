import { css, CSSProp } from 'styled-components';

type MediaQueryProps = {
  mobile: number;
  tablet: number;
  laptop: number;
  desktop: number;
  fullDesktop: number;
};

const sizes: MediaQueryProps = {
  mobile: 576,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  fullDesktop: 2560,
};

type BackQuoteArgs = string[];

// 미디어 쿼리 생성하는 함수 - size와 type('max' or 'min')를 입력받아 CSSProp를 반환
const createMediaQuery =
  (size: number, type: 'max' | 'min') =>
  (literals: TemplateStringsArray, ...args: BackQuoteArgs): CSSProp =>
    css`
      @media only screen and (${type}-width: ${size}px) {
        ${css(literals, ...args)}
      }
    `;

// 미디어 쿼리 맵 생성 - type('max' or 'min')에 따라 미디어 쿼리 맵을 생성하는 함수
const generateMediaQueryMap = (type: 'max' | 'min') =>
  Object.entries(sizes).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: createMediaQuery(value, type),
    }),
    {} as Record<
      keyof MediaQueryProps,
      (l: TemplateStringsArray, ...p: BackQuoteArgs) => CSSProp
    >,
  );

// 'max'와 'min' 각각에 대한 미디어 쿼리 맵을 생성하여 export
export const media = {
  max: generateMediaQueryMap('max'),
  min: generateMediaQueryMap('min'),
};
