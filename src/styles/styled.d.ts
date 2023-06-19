// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    wh100;
    FlexCol;
    FlexRow;
    FlexCenter;
    AbsoluteTL;
    AbsoluteCenter;
    CursorActive;
    DarkBlur;
    NoPaddingMargin;
    TextEllipsis;
    TextEllipsisMultiline;
    pointColor: string;
    subColor: string;
    accentColor: string;
    transparentBackground: string;
    bgColorDeep: string;
    bgColor: string;
    bgColor2: string;
    bgGradient: string;
    fontColor: string;
    fontColor2: string;
    colors: {
      brand: string;
      brandLight: string;
      blue: string;
      blueLight: string;
      yellow: string;
      yellowLight: string;
      red: string;
      redLight: string;
      purple: string;
      purpleLight: string;
    };
    transparentColor: string;
    transitionOption: string;
    shadow: {
      box: string;
      box_Hover: string;
      box1: string;
      drop: string;
      drop_Hover: string;
      drop1: string;
      headerTop: string;
      header: string;
    };
    scrollbar: {
      bg: string;
      hover: string;
      iconBg: string;
      iconStroke: string;
    };
    media: {
      max: {
        mobile: (literals: TemplateStringsArray, ...args: any[]) => CSSProp;
        tablet: (literals: TemplateStringsArray, ...args: any[]) => CSSProp;
        laptop: (literals: TemplateStringsArray, ...args: any[]) => CSSProp;
        desktop: (literals: TemplateStringsArray, ...args: any[]) => CSSProp;
        fullDesktop: (
          literals: TemplateStringsArray,
          ...args: any[]
        ) => CSSProp;
      };
      min: {
        mobile: (literals: TemplateStringsArray, ...args: any[]) => CSSProp;
        tablet: (literals: TemplateStringsArray, ...args: any[]) => CSSProp;
        laptop: (literals: TemplateStringsArray, ...args: any[]) => CSSProp;
        desktop: (literals: TemplateStringsArray, ...args: any[]) => CSSProp;
        fullDesktop: (
          literals: TemplateStringsArray,
          ...args: any[]
        ) => CSSProp;
      };
    };
  }
}
