// OAuth.js 라는 컴포넌트를 따로 생성하여 관리하였음

//REST_API 키
//내꺼
const CLIENT_ID = '0da4660f22013059ba89802857a441b2';

// const CLIENT_ID = "d37e4af6063817a749509bac0537a1a9";

//백과 협의해서 맞추기 // 프론트에서 접근할 수 있는 host로 지정해야함
// 인가 코드 받고 넘기고 등등 모든 작업이 이루어져야 하는데
//프론트엔드가 접근할 수 없는 Host로 지정을 해버리면 말 그대로 접근을 못하니 아무것도 할 수 없다.

const REDIRECT_URI = 'http://localhost:3000/api/auth/kakao/callback';

//이 코드는 안바꿔도 됨
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
