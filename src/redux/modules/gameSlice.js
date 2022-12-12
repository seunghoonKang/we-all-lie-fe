import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  spy: 'Agent_징영이(●>◡<●)',
  gameOperation: 0,
  gameResult: 0,
  sendCategory: {
    category: '장소',
    answerWord: '골프',
    showWords: [
      '배드민턴',
      '농구',
      '클라이밍',
      '야구',
      '배구',
      '다이빙',
      '하키',
      '당구',
      '복싱',
      '수영',
      '스키',
      '테니스',
      '양궁',
      '서핑',
      '펜싱',
      '마라톤',
      '사이클',
      '축구',
      '태권도',
      '아이스링크장',
    ],
  },
};

const gameSlice = createSlice({
  name: 'GameSlice',
  initialState,
  reducers: {
    giveCategory: (state, action) => {
      state.sendCategory = action.payload;
      console.log('여기는 카테코리 액션 들어옴', action.payload);
    },
    giveSpy: (state, action) => {
      state.spy = action.payload;
      console.log('스파이 오라이~', action.payload);
    },
    gameOperation: (state, action) => {
      state.gameOperation = action.payload;
      //console.log('다음 페이지 넘기는 값', action.payload);
    },
    gameResult: (state, action) => {
      state.gameResult = action.payload;
    },
  },
});

export const { giveCategory, giveSpy, gameOperation, gameResult } =
  gameSlice.actions;
export default gameSlice.reducer;
