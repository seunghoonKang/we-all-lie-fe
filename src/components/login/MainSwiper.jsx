import React, { useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import { ReactComponent as DescriptionOwn } from '../../assets/game_description_one.svg';
import { ReactComponent as DescriptionTwo } from '../../assets/game_description_2.svg';
import { ReactComponent as DescriptionThree } from '../../assets/game_description_3.svg';
import { ReactComponent as DescriptionFour } from '../../assets/game_description_4.svg';
import { ReactComponent as DescriptionFive } from '../../assets/game_description_5.svg';
import { ReactComponent as SwiperOne } from '../../assets/swiper_one.svg';
import { ReactComponent as SwiperTwo } from '../../assets/swiper_two.svg';
import { ReactComponent as SwiperThree } from '../../assets/swiper_three.svg';
import { ReactComponent as SwiperFour } from '../../assets/swiper_four.svg';
import { ReactComponent as SwipeFive } from '../../assets/swiper_five.svg';
import { ReactComponent as CloseIcon } from '../../assets/close_icon.svg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

SwiperCore.use([Pagination, Autoplay, Navigation]); //추가

const MainSwiper = ({ closeDescription }) => {
  const closeBtnHandler = () => {
    closeDescription();
  };

  return (
    <SwiperWrap>
      <Swiper
        style={{
          width: ' 650px',
          height: '500px',
        }}
        spaceBetween={8}
        initialSlide={0}
        centeredSlides={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 3000 }}
      >
        {/* 슬라이스 1 */}

        <SwiperSlide>
          <EntireWrap>
            <SwiperTopWrap>
              <SwiperOne />
              <button type="button" onClick={closeBtnHandler}>
                <CloseIcon />
              </button>
            </SwiperTopWrap>
            <TextWrap>
              게임이 시작되면 카테고리가 랜덤으로 지정되고,
              <br />
              그에 맞는 제시어 카드가 시민 수에 맞게 분배됩니다. (최소인원 4명 ~
              최대인원 8명)
              <br />
              이때 스파이는 제시어를 받지 못하고 자신이 스파이임을 알려주는
              카드를 받습니다.
            </TextWrap>
            <hr className="hr-solid" />
            <DescriptionOwn />
          </EntireWrap>
        </SwiperSlide>

        {/* 슬라이스 2 */}

        <SwiperSlide>
          <EntireWrap>
            <SwiperTopWrap>
              <SwiperTwo />
              <button type="button" onClick={closeBtnHandler}>
                <CloseIcon />
              </button>
            </SwiperTopWrap>
            <TextWrap>
              모든 사람이 제시어를 확인한 후, 차례대로 한 명씩 제시어에 대해
              설명합니다.
              <br />
              일반 사람들은 스파이에게 제시어가 들키지 않게,
              <br />
              스파이는 정체가 들키지 않게 거짓말로 설명합니다.
            </TextWrap>
            <hr className="hr-solid" />
            <DescriptionTwo />
          </EntireWrap>
        </SwiperSlide>

        {/* 슬라이스 3 */}

        <SwiperSlide>
          <EntireWrap>
            <SwiperTopWrap>
              <SwiperThree />
              <button type="button" onClick={closeBtnHandler}>
                <CloseIcon />
              </button>
            </SwiperTopWrap>
            <TextWrap>
              게임 시간(10분)이 흐른 뒤 사람들은 스파이일 것 같은 사람을
              투표합니다.
              <br />
              만약 게임이 진행되고 2~3분 후, 과반수가 투표하기 버튼을 클릭하면
              <br />
              즉시 라운드가 종료되고 투표가 진행됩니다.
            </TextWrap>
            <hr className="hr-solid" />
            <DescriptionThree />
          </EntireWrap>
        </SwiperSlide>

        {/* 슬라이스 4 */}

        <SwiperSlide>
          <EntireWrap>
            <SwiperTopWrap>
              <SwiperFour />
              <button type="button" onClick={closeBtnHandler}>
                <CloseIcon />
              </button>
            </SwiperTopWrap>
            <TextWrap>
              스파이를 찾아내지 못하면 스파이가 승리합니다!
              <br />
              만약 투표로 스파이를 찾아낼 경우 다음 단계로 이동합니다.
            </TextWrap>
            <hr className="hr-solid" />
            <DescriptionFour />
          </EntireWrap>
        </SwiperSlide>

        {/* 슬라이스 5 */}

        <SwiperSlide>
          <EntireWrap>
            <SwiperTopWrap>
              <SwipeFive />
              <button type="button" onClick={closeBtnHandler}>
                <CloseIcon />
              </button>
            </SwiperTopWrap>
            <TextWrap>
              스파이가 지목받은 경우 제시어를 선택할 마지막 찬스가 주어집니다.
              <br />
              주어진 키워드 중 정답을 맞추면 스파이가 최종 승리하게 됩니다
              <br />
              만약, 스파이가 제시어를 맞추지 못한다면 스파이는 패배합니다.
            </TextWrap>
            <hr className="hr-solid" />
            <DescriptionFive />
          </EntireWrap>
        </SwiperSlide>
      </Swiper>
    </SwiperWrap>
  );
};

export default MainSwiper;

const SwiperWrap = styled.div`
  .swiper-button-prev {
    color: #a5a5a5;
  }
  .swiper-button-next {
    color: #a5a5a5;
  }
  .swiper-pagination-bullet {
    background-color: #222222;
  }

  //나중에 svg 경로 설정
  /* .swiper-button-next {
    background: url(/godiva/img/common/next_arrow.svg) no-repeat !important;
    background-size: 50% auto;
    background-position: center;
  }

  .swiper-button-prev {
    background: url(/assets/next_arrow.svg) no-repeat !important;
  } */

  /* .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  } */
`;

const EntireWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const SwiperTopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3%;
`;

const TextWrap = styled.div`
  color: #222222;
  font-size: 16px;
  display: flex;
  justify-content: space-around;
  margin: 0 0 20px;
`;
