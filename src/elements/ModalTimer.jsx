import React, { useEffect, useRef, useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

const ModalTimer = ({ modalSec }) => {
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

  return <ModalSecDiv theme={themeContext}>{modalSecond}</ModalSecDiv>;
};

const ModalSecDiv = styled.div`
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid;
  border-color: ${(props) => props.theme.color.lionOrange};
  border-radius: 50%;

  color: ${(props) => props.theme.color.lionOrange};
  font-weight: 700;
`;

export default ModalTimer;
