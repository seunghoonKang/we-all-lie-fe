import React from 'react';
import styled from 'styled-components';

const Layout = (props) => {
  return <LayoutCtn>{props.children}</LayoutCtn>;
};

export default Layout;

const LayoutCtn = styled.div`
  margin: 10px auto 0 auto;
  //padding: 0 16px 16px 16px;
  //border: 1px solid gray;
  //border-radius: 20px;
  width: 97%;
  min-width: 1280px;
  height: 97vh;
  min-height: 710px; //margin-top을 10px 줬기 때문에 720 -> 710로 줄였더용
  overflow: hidden;
  background-color: #222222;
`;
