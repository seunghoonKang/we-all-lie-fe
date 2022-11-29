// import { socket } from "./socket";
import Router from './shared/Router';
import Layout from './elements/Layout';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

function App() {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </Layout>
  );
}

export default App;
