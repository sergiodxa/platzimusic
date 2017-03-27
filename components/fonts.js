import { injectGlobal } from 'styled-components';
import theme from '../lib/theme.js';

export const fonts = injectGlobal`
  body {
    color: ${theme.color.grayB};
  }
  @font-face {
    font-family: 'icomoon';
    src:  url('../static/fonts/icomoon.eot?7a97bw');
    src:  url('../static/fonts/icomoon.eot?7a97bw#iefix') format('embedded-opentype'),
      url('../static/fonts/icomoon.ttf?7a97bw') format('truetype'),
      url('../static/fonts/icomoon.woff?7a97bw') format('woff'),
      url('../static/fonts/icomoon.svg?7a97bw#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  [class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

 .icon-arrow-top:before {
   content: "\e900";
 }
 .icon-next:before {
   content: "\e901";
 }
 .icon-previous:before {
   content: "\e902";
 }
 .icon-pause:before {
   content: "\e903";
 }
 .icon-play:before {
   content: "\e904";
 }

`;
