import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import arrestedstamp from '../img/arrested.png';
import { choiceAsker, choiceAnswerer } from '../redux/modules/gameSlice';

const Camera = ({ ...props }) => {
  const dispatch = useDispatch();
  const asker = useSelector((state) => state.game.asker);
  const answerer = useSelector((state) => state.game.answerer);

  useEffect(() => {
    if (props.nickname === '승훈') {
      dispatch(choiceAsker(props.nickname));
    }
  }, []);

  const talker = () => {
    if (asker === props.nickname) {
      return;
    } else {
      dispatch(choiceAnswerer(props.nickname));
    }
  };
  return (
    <div>
      {asker === props.nickname ? (
        <Wrap onClick={talker} borderColor="#ff8217">
          <NickName>{props.nickname}</NickName>
        </Wrap>
      ) : (
        <Wrap onClick={talker}>
          <NickName>{props.nickname}</NickName>
        </Wrap>
      )}
    </div>
  );
};

export default Camera;

const Wrap = styled.div`
  width: 12.75rem;
  min-height: 10.25rem;
  background-color: #e8e8e8;
  border-radius: 5px;
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid;
  border-color: ${(props) => props.borderColor || '#2b2b2b'};
  cursor: pointer;
  pointer-events: ${(props) => (props.asker === true ? 'none' : '')};
  position: relative;
`;

const NickName = styled.div`
  min-width: 12.75rem;
  min-height: 28px;
  background-color: #2b2b2b;
  color: white;
  align-self: flex-end;
  text-align: center;
  border-radius: 0px 0px 1px 1px;
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
