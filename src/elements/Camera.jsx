import styled from 'styled-components';

const Camera = () => {
  return (
    <div>
      <Wrap>
        불만이야? 응<Ready>Ready</Ready>
        <NickName>무서운 사자얌</NickName>
      </Wrap>
    </div>
  );
};

export default Camera;

const Wrap = styled.div`
  width: 204px;
  height: 164px;
  background-color: #5c5757;
`;
const Ready = styled.div`
  width: 52px;
  height: 20px;
  background-color: #5c5757;
`;

const NickName = styled.div`
  width: 204px;
  height: 28px;
  background-color: #8d8585;
`;
