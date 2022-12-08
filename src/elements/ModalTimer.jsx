import React, { useEffect, useRef, useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

const ModalTimer = ({ modalSec, ...props }) => {
  const themeContext = useContext(ThemeContext);
  const interval = useRef(null);

  const ModalSec = modalSec ? parseInt(modalSec) : 0;
  const modalSecCount = useRef(ModalSec);

  const [modalSecond, setModalSecond] = useState(ModalSec);

  useEffect(() => {
    interval.current = setInterval(() => {
      modalSecCount.current -= 1;
      setModalSecond(modalSecCount.current);
    }, 1000);
  }, []);

  useEffect(() => {
    if (modalSecCount.current <= 0) {
      clearInterval(interval.current);
    }
  }, [modalSecond]);

  return (
    <ModalSecDiv
      theme={themeContext}
      width={props.width}
      height={props.height}
      fontSize={props.fontSize}
      borderColor={props.borderColor}
      backgroundColor={props.backgroundColor}
      color={props.color}
    >
      {modalSecond}
    </ModalSecDiv>
  );
};

const ModalSecDiv = styled.div`
  width: ${(props) => props?.width || '40px'};
  height: ${(props) => props?.height || '40px'};

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid;
  border-color: ${(props) => props?.borderColor || '#FF7300'};
  border-radius: 50%;
  color: ${(props) => props?.color || '#FF7300'};
  background-color: ${(props) => props?.backgroundColor || 'none'};
  font-size: ${(props) => props?.fontSize || '16px'};
  font-weight: 700;
`;

export default ModalTimer;
