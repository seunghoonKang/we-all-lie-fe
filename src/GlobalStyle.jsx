import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* { font-family: 'Pretendard', 'sans-serif'; }

*, *::before, *::after {
box-sizing: border-box;
}

`;

export default GlobalStyle;
