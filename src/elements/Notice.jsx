import React from 'react';
import styled from 'styled-components';

const Notice = (props) => {
  return (
    <Spy>
      <marquee bgcolor="Black">
        우리 중 스파이가 있는 것 같아! 스파이에게 우리가 아는 것을 들키지 말 것!
        무고한 시민을 쉽게 의심하지 말 것 ! 👀
      </marquee>
    </Spy>
  );
};

export default Notice;

const Spy = styled.div`
  color: white;
`;
