import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../../shared/socket';
import { ReactComponent as Megaphone } from '../../assets/megaphone.svg';
import { ReactComponent as VoteIcon } from '../../assets/voteIcon.svg';
import Button from '../../elements/Button';
import styled from 'styled-components';

const GameStartHeader = () => {
  const [disabledBtn, setDisabledBtn] = useState('투표준비');
  const asker = useSelector((state) => state.game.asker);
  const answerer = useSelector((state) => state.game.answerer);
  const navigate = useNavigate();
  const param = useParams();

  const voteBtnHandler = () => {
    alert('방 나가기 소켓 임시로 넣었음');
    socket.emit('leaveRoom', param.id);
    socket.on('leaveRoom', () => {
      navigate('/home');
    });
    navigate('/home');
  };

  //투표하기 활성화 btn
  useEffect(() => {
    const checkNotDisabledBtn = setTimeout(() => {
      setDisabledBtn('투표하기');
    }, 5000);

    return () => {
      clearTimeout(checkNotDisabledBtn);
    };
  }, []);

  return (
    <HeaderSection>
      <HeaderTitle>
        <div className="flex">
          <MegaphoneDiv>
            <Megaphone width="15" height="13" fill="none" />
          </MegaphoneDiv>
          {answerer === '' ? (
            <div>[{asker}] (이)가 질문하고 싶은 유저를 찾고 있습니다.</div>
          ) : (
            <div>
              [{asker}] (이)가 [{answerer}] 에게 질문합니다.
            </div>
          )}
        </div>
        <div className="flex gap-[6px]">
          <VoteIconDiv>
            <VoteIcon width="16" height="16" fill="none" />
          </VoteIconDiv>
          <div className=" pr-2">3/7</div>
        </div>
      </HeaderTitle>
      <Button
        type={'button'}
        addStyle={{
          backgroundColor: '#FF7300',
          borderRadius: '10px 10px 0 0',
          width: '113px',
          height: '40px',
          color: '#fff',
        }}
        onClick={voteBtnHandler}
        disabled
      >
        {disabledBtn}
      </Button>
    </HeaderSection>
  );
};

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 999;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  height: 40px;
  width: 97%;
`;

const MegaphoneDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  margin-right: 8px;
`;

const VoteIconDiv = styled.div`
  display: flex;
  align-items: center;
`;

export default GameStartHeader;
