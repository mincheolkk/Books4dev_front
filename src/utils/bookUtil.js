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
    'BackEnd':'BackEnd',
    'FrontEnd':'FrontEnd',
    'DevOps':'DevOps',
    'AI/ML':'AInML',
    'Data':'DATA',
    '기타 또는 미정':'ETC'
};

export const positionConverter = data => {
    return PositionMap[data]
}