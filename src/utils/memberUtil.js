const PositionMap = {
    '백엔드':'BackEnd',
    '프론트엔드':'FrontEnd',
    'DevOps':'DevOps',
    '인공지능/머신러닝':'AInML',
    '기타 혹은 미정':'ETC'
};

const ReversePositionMap = {
    'BackEnd':'백엔드 개발자',
    'FrontEnd':'프론트엔드 개발자',
    'DevOps':'DevOps',
    'AInML':'인공지능/머신러닝 개발자',
    'ETC':'기타 혹은 미정'
}

export const positionConverter = data => {
    return PositionMap[data]
}

export const ReversePositionConverter = data => {
    return ReversePositionMap[data]
}