import React from 'react';

const HeaderSection = () => {
  return (
    <Section>
      <HeaderTitle>
        <Header />
      </HeaderTitle>
      <MakeRoomBtn>방 나가기</MakeRoomBtn>
    </Section>
  );
};

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

const MakeRoomBtn = styled.button`
  width: 96px;
  height: 36px;
  margin-right: 18px;
  color: #ffffff;
  border-radius: 5px;
  background-color: #2b2b2b;
`;
