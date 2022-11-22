import React from 'react';
import styled from 'styled-components';
import Layout from '../../elements/Layout';
import Camera from '../../elements/Camera';

const ReadyUsers = () => {
  return (
    <ReadyUserBox>
      <Camera />
      <Camera />
      <Camera />
      <Camera />
    </ReadyUserBox>
  );
};

export default ReadyUsers;

const ReadyUserBox = styled.div`
  display: flex;
  min-width: 896px;
  min-height: 377px;
  display: grid;
  background-color: #69897b;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 9rem 1rem;
`;
