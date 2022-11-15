import React from "react";
import styled from "styled-components";

const Layout = (props) => {
  return <LayoutCtn>{props.children}</LayoutCtn>;
};

export default Layout;

const LayoutCtn = styled.div`
  margin: 10px auto 0 auto;
  padding: 20px;
  border: 1px solid gray; //이거두개는 없애도됨
  border-radius: 20px; //구냥 해봐써 디자인이 넘 없어서,,
  width: 97%;
  min-width: 1280px;
  height: 97vh;
  min-height: 710px; //margin-top을 10px 줬기 때문에 720 -> 710로 줄였더용
  overflow: hidden;
`;
