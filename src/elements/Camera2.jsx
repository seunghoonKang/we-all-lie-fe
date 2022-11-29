import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import arrestedstamp from '../img/arrested.png';
import { choiceAsker } from '../redux/modules/gameSlice';

const Camera = ({ ...props }) => {
  const dispatch = useDispatch();
  //const asker = useSelector((state) => state.game.asker);
  // const arrestedToggle = () => {
  // setStamp(person);
  //  };

  useEffect(() => {
    if (props.nickname === '승훈') {
      //dispatch(choiceAsker(true));
      props.setAsker(props.nickname);
    }
  }, []);

  console.log(props);
  const talker = () => {
    if (props.asker === '승훈') {
      console.log(props.nickname);
    }
  };
  return (
    <div>
      {props.asker ? (
        <Wrap onClick={talker} asker>
          <NickName>질문자</NickName>
        </Wrap>
      ) : (
        <Wrap>
          <NickName>무서운 승짱</NickName>
        </Wrap>
      )}
    </div>
  );
};

export default Camera;

const Wrap = styled.div`
  width: 204px;
  height: 164px;
  background-color: #e8e8e8;
  border-radius: 5px;
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid #2b2b2b;
  cursor: pointer;
  /* ${(props) => props.arrested && `position:relative`} */
  pointer-events: ${(props) => (props.asker === true ? 'none' : '')};
  position: relative;
`;

const NickName = styled.div`
  width: 204px;
  height: 28px;
  background-color: #2b2b2b;
  color: white;
  align-self: flex-end;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
`;

const Arrested = styled.div`
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 999;
  /* ${(props) =>
    props.arrested
      ? `position:absolute; top:50px; left:20px; z-index:999;`
      : `display:none;`} */
`;
