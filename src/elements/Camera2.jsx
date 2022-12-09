import styled from 'styled-components';
import { ReactComponent as Preparing } from '../assets/prepared_cat.svg';
import { ReactComponent as Prepared } from '../assets/prepared_cat.svg';
import { ReactComponent as Expressionless } from '../assets/expressionless_cat.svg';
import { ReactComponent as WinkCat } from '../assets/wink_cat.svg';

const Camera = ({ person }) => {
  const randomCatImg = () => {
    return Math.floor(Math.random() * 4);
  };
  let catValue = randomCatImg();
  return (
    <Wrap>
      <PreParingIconWrap>
        {catValue === 0 && <Preparing />}
        {catValue === 1 && <Prepared />}
        {catValue === 2 && <Expressionless />}
        {catValue === 3 && <WinkCat />}
      </PreParingIconWrap>
      <NickName>{person}</NickName>
    </Wrap>
  );
};

export default Camera;

const Wrap = styled.div`
  width: 24%;
  height: 45%;
  background-color: #e8e8e8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const PreParingIconWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NickName = styled.div`
  width: 100%;
  height: 28px;
  line-height: 28px;
  background-color: #dfdfdf;
  color: #2b2b2b;
  font-weight: 600;
  font-size: 14px;
  align-self: flex-end;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
`;
