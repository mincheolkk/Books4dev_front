const timeMap = {
    '개발자 취업 전':"before", 
    '0-2년차':"after", 
    '3-5년차':"threeYear", 
    '6년차 이상':"sixYear",
    '언제든 좋음' :"anyTime"
};

export const timeConverter = data => {
    return timeMap[data]
}
const PositionMap = {
    '백엔드':'BackEnd',
    '프론트엔드':'FrontEnd',
    'DevOps':'DevOps',
    '인공지능/머신러닝':'AInML',
    '기타 혹은 미정':'ETC'
};

export const positionConverter = data => {
    return PositionMap[data]
}