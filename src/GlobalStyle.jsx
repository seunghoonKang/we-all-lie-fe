import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* { font-family: 'pretendard', 'sans-serif'; }

*, *::before, *::after {
box-sizing: border-box;

.swiper-button-next {
  background: url(/godiva/img/common/next.png) no-repeat;
  background-size: 50% auto;
  background-position: center;
}

.swiper-button-prev {
  background: url(/godiva/img/common/prev.png) no-repeat;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  display: none;
}
}

`;

export default GlobalStyle;
