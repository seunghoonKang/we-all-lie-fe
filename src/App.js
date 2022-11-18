// import { socket } from "./socket";
import Router from './shared/Router';
import Layout from './elements/Layout';
import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <Layout>
      <GlobalStyle />
      <Router />
    </Layout>
  );
}

export default App;
