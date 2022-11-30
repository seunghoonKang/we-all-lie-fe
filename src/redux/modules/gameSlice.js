import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  asker: '',
  answerer: '',
  words: [
    '배드민턴',
    '농구',
    '클라이밍',
    '야구',
    '역도',
    '승마',
    '유도',
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
    '씨름',
    '사이클',
    '축구',
    '태권도',
    '피겨스케이팅',
    '주짓수',
  ],
  answerWord: '골프',
  category: '스포츠',
};

const gameSlice = createSlice({
  name: 'GameSlice',
  initialState,
  reducers: {
    choiceAsker: (state, action) => {
      state.asker = action.payload;
    },
    choiceAnswerer: (state, action) => {
      state.answerer = action.payload;
    },
  },
});

export const { choiceAsker, choiceAnswerer } = gameSlice.actions;
export default gameSlice.reducer;
