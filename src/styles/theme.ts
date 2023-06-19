import { DefaultTheme, css } from 'styled-components';
import { media } from './media';

const FlexCol = css`
  display: flex;
  flex-direction: column;
`;

const FlexRow = css`
  display: flex;
  flex-direction: row;
`;

const FlexCenter = css`
  justify-content: center;
  align-items: center;
`;

const wh100 = css`
  width: 100%;
  height: 100%;
`;

const AbsoluteTL = css`
  position: absolute;
  top: 0;
  left: 0;
`;

const AbsoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CursorActive = css`
  pointer-events: auto;
  cursor: pointer;
`;

const DarkBlur = css`
  background: ${props => props.theme.bgColorDeep}cc;
  backdrop-filter: blur(0.1125rem);
`;

const NoPaddingMargin = css`
  margin: 0;
  padding: 0;
`;

const TextEllipsis = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

const TextEllipsisMultiline = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const theme = {
  wh100,
  FlexCol,
  FlexRow,
  FlexCenter,
  AbsoluteTL,
  AbsoluteCenter,
  CursorActive,
  DarkBlur,
  NoPaddingMargin,
  TextEllipsis,
  TextEllipsisMultiline,
};

export const Theme: DefaultTheme = {
  media,
  ...theme,
  pointColor: '#30B198',
  subColor: '#FFC857',
  accentColor: '#EF476F',
  transparentBackground: '#f5f6f7a6',
  bgColorDeep: '#ebebeb',
  bgColor: '#ffffff',
  bgColor2: '#1e1e1e',
  headerBg: 'rgba(255, 255, 255, 1)',
  headerBgTop: 'rgba(255, 255, 255, 0)',
  bgGradient: 'linear-gradient(to left,#c0efff,#ffa8c3)',
  fontColor: '#191A23',
  fontColor2: '#E2E2E2',
  colors: {
    brand: '#33a06f',
    brandLight: '#155f3e',
    blue: '#3468a3',
    blueLight: '#255489',
    yellow: '#e0ad15',
    yellowLight: '#bc9112',
    red: '#cd2d3f',
    redLight: '#ab2131',
    purple: '#823c83',
    purpleLight: '#602960',
  },
  transparentColor: 'rgba(25, 26, 35, 0.65)',
  transitionOption: 'ease-in-out 0.15s',
  shadow: {
    box: '0 0.2rem 0.4rem rgba(10, 10, 10, 0.3);',
    box_Hover: '0 0.2rem 0.75rem rgba(10, 10, 10, 0.4)',
    box1: '0rem .5625rem .75rem -0.4375rem rgba(0, 0, 0, .3);',
    drop: 'drop-shadow(0 0.2rem 0.3rem rgba(0, 0, 0, 0.5))',
    drop_Hover: 'drop-shadow(0 0.2rem 0.4rem rgba(0, 0, 0, 0.6))',
    drop1: 'drop-shadow(.0625rem .0625rem .0625rem black)',
    headerTop:
      'linear-gradient(180deg,rgba(107, 107, 107, 0.4) 5%,transparent)',
  },
  scrollbar: {
    bg: 'rgba(181,181,193,.8)',
    hover: 'rgba(145, 145, 158, 1)',
    iconBg: '#ffffff',
    iconStroke: '#1479FF',
  },
};

export const DarkTheme: DefaultTheme = {
  media,
  ...theme,
  pointColor: '#30B198',
  subColor: '#FFC857',
  accentColor: '#EF476F',
  transparentBackground: '#21232E',
  bgColorDeep: '#2d2d2d',
  bgColor: '#1e1e1e',
  bgColor2: '#F8FAFB',
  headerBg: 'rgb(0, 0, 0)',
  headerBgTop: 'rgba(0, 0, 0, 0)',
  bgGradient: 'linear-gradient(to left,rgb(0 86 120), rgb(148 28 68))',
  fontColor: '#E2E2E2',
  fontColor2: '#191A23',
  colors: {
    brand: '#42d392',
    brandLight: '#35eb9a',
    blue: '#3b8eed',
    blueLight: '#50a2ff',
    yellow: '#ffc517',
    yellowLight: '#ffff17',
    red: '#ed3c50',
    redLight: '#fd1d7c',
    purple: '#de41e0',
    purpleLight: '#f616f8',
  },
  transparentColor: '#f5f6f7a6',
  transitionOption: 'ease-in-out 0.15s',
  shadow: {
    box: '0 0.2rem 0.6rem rgba(0, 0, 0, 1);',
    box_Hover: '0 0.2rem 0.95rem rgba(0, 0, 0, 1)',
    box1: '0 .5625rem .75rem -.4375rem rgba(0, 0, 0, 1);',
    drop: 'drop-shadow(0 0.15rem 0.3rem rgba(0, 0, 0, .8))',
    drop_Hover: 'drop-shadow(0 0.15rem 0.4rem rgba(0, 0, 0, 1))',
    drop1: 'drop-shadow(.0625rem .125rem .0625rem (rgba(0, 0, 0, .8))',
    headerTop: 'linear-gradient(180deg,rgba(0, 0, 0, 0.7) 10%,transparent)',
  },
  scrollbar: {
    bg: 'rgba(86,88,105,1)',
    hover: 'rgba(172,172,190,1)',
    iconBg: '#184099',
    iconStroke: '#ffffff',
  },
};
