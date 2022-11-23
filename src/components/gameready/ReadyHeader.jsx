import React from 'react';
import styled from 'styled-components';
import Header from '../../elements/Header';
import Button from '../../elements/Button';
import { useNavigate } from 'react-router-dom';

const ReadyHeader = () => {
  const navigate = useNavigate();
  const BtnHandler = () => {
    alert('홈 화면으로 슈우웅');
    navigate('/home');
  };

  return (
    <Section>
      <HeaderTitle>
        <Header />
      </HeaderTitle>
      <Button
        type={'button'}
        addStyle={{
          backgroundColor: '#2B2B2B',
          borderRadius: '6px',
          width: '113px',
          height: '40px',
          color: '#fff',
        }}
        onClick={BtnHandler}
      >
        나가기
      </Button>
    </Section>
  );
};

export default ReadyHeader;

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 71px;
  background-color: #cfcfcf;
`;

const HeaderTitle = styled.div`
  margin-left: 16px;
`;
