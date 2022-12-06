import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  asker: '',
  answerer: '',
  words: [
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
    '롯데월드 아이스링크장',
  ],
  answerWord: '골프',
  category: '장소',
  spy: 'Agent_프리티강',
  goFromStartToVote: false,
  goFromReadyToStart: false,
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
    goFromGameStartToGameVote: (state, action) => {
      state.goFromStartToVote = action.payload;
    },
    goFromGameReadyToGameStart: (state, action) => {
      state.goFromStartToVote = action.payload;
    },
  },
});

export const { choiceAsker, choiceAnswerer, goFromGameStartToGameVote } =
  gameSlice.actions;
export default gameSlice.reducer;
