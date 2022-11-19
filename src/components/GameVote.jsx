import React from 'react';
import styled from 'styled-components';
import Camera from '../elements/Camera';

const GameVote = () => {
  const userCameras = ['a', 'b', 'c', 'd'];
  const userLength = userCameras.length;
  return (
    <Layout>
      <Users userLength={userLength}>
        {userCameras.map((person, index) => (
          <Camera key={index} person={person} />
        ))}
      </Users>
      <Vote>
        <div>후보카드</div>
        <div>[게으른 토끼]가 [말많은 호랑이]에게 질문합니다</div>
      </Vote>
    </Layout>
  );
};

export default GameVote;

const Layout = styled.div`
  width: 100%;
  position: relative;
`;

const Middle = styled.div``;
const Users = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 262px /* 참고 : https://developer.mozilla.org/en-US/docs/Web/CSS/gap */
    //calc(262px + (90vh - 650px))
    //calc(50.8vmax - 388px) //이거 다시 조정해야함 ㅠ
    /* calc(90vh - 388px) */
    /* {calc(90vh) >= calc(650px) ? "calc(90vh - 388px)" : "262px" } */
    ${(props) =>
      props.userLength <= 4
        ? `50%`
        : `calc(35% / ((${props.userLength} - 3) * 2))`};
  ${Middle} {
    width: 100%;
    height: 400px;
  }
`;
const Vote = styled.div`
  background-color: lightgray;
  width: 100%;
  height: 262px;
  position: absolute;
  top: 164px;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    width: 50%;
  }
`;
