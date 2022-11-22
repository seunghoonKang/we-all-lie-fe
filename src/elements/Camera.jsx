import styled from 'styled-components';

const Camera = () => {
  return (
    <div>
      <Wrap>
        <NickName>무서운 승짱</NickName>
      </Wrap>

      <ReadyWrap>
        <img
          // style={{ transform: 'scale(0.3)' }}
          src="/img/ready.png"
        ></img>
        <ReadyNickName>게으른 뀨띠</ReadyNickName>
      </ReadyWrap>
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
  flex-direction: column;
`;

const ReadyWrap = styled.div`
  width: 204px;
  height: 164px;
  background-color: #e8e8e8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1.5px solid #ff8217;
  img {
    align-self: flex-start;
    margin: 5px;
  }
`;

const NickName = styled.div`
  width: 204px;
  height: 28px;
  background-color: #2b2b2b;
  color: white;
  align-self: flex-end;
  border-radius: 5px 5px 0px 0px;
`;

const ReadyNickName = styled.div`
  width: 202px;
  height: 28px;
  background-color: #ff8217;
  align-self: flex-end;
  border-radius: 0px 0px 5px 5px;
`;
