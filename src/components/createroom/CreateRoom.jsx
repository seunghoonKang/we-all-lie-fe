import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRoomInfo, getUserNickname } from '../../redux/modules/roomSlice';
import { ReactComponent as XIcon } from '../../assets/xIcon.svg';
import { socket } from '../../shared/socket';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CreateRoomTextInput from './CreateRoomTextInput';
//import CreateRoomRadio from './CreateRoomRadio';
// import CreateRoomSelect from './CreateRoomSelect';
import CreateRoomCheckBox from './CreateRoomCheckBox';
import { useCookies } from 'react-cookie';

const CreateRoom = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies(['nickname']);
  //모달창 닫기
  const closeBtnHandler = () => {
    closeModal();
  };

  //클릭 시 모드에 따른 CSS 변경
  const [easyModeColor, setEasyModeColor] = useState('white');
  const [hardModeColor, setHardModeColor] = useState('white');
  const modeClickHandler = (e) => {
    return e.target.id === 'EASY'
      ? (setEasyModeColor('gray'), setHardModeColor('white'))
      : (setEasyModeColor('white'), setHardModeColor('gray'));
  };

  const [onlyOne, setOnlyOne] = useState(true);
  const onlyOneHandler = () => {
    setTimeout(() => {
      setOnlyOne(!onlyOne);
    }, 100);
  };

  //모달 오픈, 닫기 시 위치 고정
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <ModalContainer>
      <ModalBackGround onClick={closeBtnHandler}>
        <CreateRoomHeader>
          <FormHeader>방만들기</FormHeader>
          <CloseBtnHeader onClick={closeBtnHandler}>
            <XIcon width="20" height="20" />
          </CloseBtnHeader>
        </CreateRoomHeader>
        <CreateRoomDiv onClick={(e) => e.stopPropagation()}>
          <Formik
            className=" bg-slate-200 w-96 h-96"
            initialValues={{
              roomTitle: '',
              participants: '',
              gameMode: true,
              privateRoom: false,
              roomPassword: '',
              currentCount: 1,
            }}
            validationSchema={Yup.object({
              roomTitle: Yup.string()
                .max(15, '15자 이하로 작성해주세요')
                .required('필수 입력'),
              /* participants: Yup.string()
                .oneOf(
                  ['4', '5', '6', '7', '8'],
                  '유효한 인원 수를 선택해주세요'
                )
                .required('필수 입력'),
                */
              gameMode: Yup.boolean()
                .oneOf(
                  [false],
                  '하드 모드는 준비중입니다. 이지모드를 선택해주세요!'
                )
                .required('필수'),
              // privateRoom: Yup.boolean().oneOf([false], '기능 구현예정입니다'),

              privateRoom: Yup.boolean(),
              roomPassword: Yup.string().when('privateRoom', {
                is: (privateRoom) => privateRoom !== true,
                then: Yup.string().oneOf([true], '비밀방 설정 체크 필수'),
              }),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                socket.emit(
                  'createRoom',
                  values.gameMode,
                  values.roomTitle,
                  cookies.nickname
                );
                // socket.on('userNickname', (userNickname) => {
                //   dispatch(getUserNickname(userNickname));
                // });
                socket.on('createRoom', (room) => {
                  dispatch(getRoomInfo(room));
                  navigate(`/room/${room._id}`);
                });
                setSubmitting(false);
              }, 100);
            }}
          >
            {({ errors, touched }) => (
              <Form className=" flex flex-col pt-[17px] w-full">
                <div className="pl-[27px] pr-[27px]">
                  <CreateRoomTextInput
                    label="방제목"
                    name="roomTitle"
                    type="text"
                    placeholder="방 제목을 입력해주세요"
                  />
                </div>
                {/* 추가구현예정
              <CreateRoomSelect label="인원수" name="participants">
                <option value="">인원 선택</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </CreateRoomSelect>
                */}
                <div className="flex gap-[16px] pl-[27px] pr-[27px]">
                  <div role="group" className="flex flex-col">
                    <p className="mt-[10px] text-[14px] font-bold">게임모드</p>
                    <div className="flex">
                      <ModeBtn
                        color={easyModeColor}
                        onClick={modeClickHandler}
                        id="EASY"
                      >
                        <label className="w-[80px] min-h-full flex justify-center items-center">
                          <Field
                            type="radio"
                            name="gameMode"
                            value={false}
                            id="EASY"
                            className="appearance-none"
                          />
                          EASY
                        </label>
                      </ModeBtn>
                      <ModeBtn
                        color={hardModeColor}
                        onClick={modeClickHandler}
                        id="HARD"
                      >
                        <label className="w-[80px] min-h-full flex justify-center items-center">
                          <Field
                            type="radio"
                            name="gameMode"
                            value={true}
                            id="HARD"
                            className="appearance-none"
                          />
                          HARD
                        </label>
                      </ModeBtn>
                    </div>
                    {errors.gameMode && touched.gameMode ? (
                      <div className="text-[12px] text-red-500">
                        {errors.gameMode}
                      </div>
                    ) : (
                      false
                    )}
                  </div>
                  {/* 추가구현예정 */}
                  <div className="w-full ">
                    <p className="mt-[10px] text-[14px] font-bold">
                      비밀방 설정
                    </p>
                    <div className="flex gap-5 ">
                      <CreateRoomCheckBox
                        name="privateRoom"
                        className="appearance-none w-[40px] h-[40px] border-solid border-black border-[0.5px] rounded-md flex checked:bg-[#a5a5a5]"
                      ></CreateRoomCheckBox>

                      <CreateRoomTextInput
                        name="roomPassword"
                        type="password"
                        placeholder=""
                        className="bg-[#f5f5f5] w-full h-[40px] rounded-md"
                        //disabled
                      ></CreateRoomTextInput>
                    </div>
                  </div>
                </div>
                <div className="flex mt-[20px] justify-around">
                  {/* <button
                  type="button"
                  onClick={closeBtnHandler}
                  className=" w-full border-solid border-black border-l-[0.5px] border-t-[0.5px] border-b-[0.5px] min-h-[30px]"
                >
                  취소하기
                </button> */}
                  {onlyOne ? (
                    <SubmitBtn type="submit" onClick={onlyOneHandler}>
                      개설하기
                    </SubmitBtn>
                  ) : (
                    <DisabledSubmitBtn
                      type="submit"
                      onClick={onlyOneHandler}
                      disabled={true}
                    >
                      개설하기
                    </DisabledSubmitBtn>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </CreateRoomDiv>
      </ModalBackGround>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
  opacity: 1;
`;

const ModalBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CreateRoomDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 550px;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 20px 60px -2px rgb(27 33 58 / 40%);
  padding: 0;
`;

const CreateRoomHeader = styled.div`
  display: flex;
  width: 550px;
`;

const FormHeader = styled.div`
  width: 550px;
  min-height: 40px;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-weight: 700;
  font-size: 22px;
  line-height: 20px;
  z-index: 100;
  padding-left: 25px;
`;

const CloseBtnHeader = styled.div`
  min-height: 40px;
  min-width: 40px;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #222;
  cursor: pointer;
`;

const ModeBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  min-height: 40px;
  border: 1px solid #222222;
  border-radius: 6px;
  margin-right: 6px;
  background-color: ${(props) => props.color};
`;

const SubmitBtn = styled.button`
  border: solid #ff7300 1px;
  min-width: 110px;
  min-height: 40px;
  margin-bottom: 20px;
  border-radius: 6px;
  color: #ff7300;
  font-size: 14px;
  font-weight: 700;
`;
const DisabledSubmitBtn = styled.button`
  border: solid #ff7300 1px;
  min-width: 110px;
  min-height: 40px;
  margin-bottom: 20px;
  border-radius: 6px;
  color: #ff7300;
  font-size: 14px;
  font-weight: 700;
`;

export default CreateRoom;
