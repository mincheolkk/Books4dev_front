const timeMap = {
    '개발자 취업 전':"before", 
    '개발자 취업 후 ~ 2년':"after", 
    '2년 ~ 5년':"twoYear", 
    '5년 ~ 10년':"fiveYear",
    '10년 ~' :"tenYear"
};

export const timeConverter = data => {
    return timeMap[data]
}
const PositionMap = {
    '백엔드':'BackEnd',
    '프론트엔드':'FrontEnd',
    'iOS':'iOS',
    '안드로이드':'Android',
    'DevOps':'DevOps',
    '인공지능/머신러닝':'AInML',
    '데이터 엔지니어/사이언티스트':'DATA',
    '블록체인':'BlockChain',
    '기타 혹은 미정':'ETC'
};

export const positionConverter = data => {
    return PositionMap[data]
}