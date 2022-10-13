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

const ReversePositionMap = {
    'BackEnd':'백엔드 개발자',
    'FrontEnd':'프론트엔드 개발자',
    'iOS':'iOS 개발자',
    'Android':'안드로이드 개발자',
    'DevOps':'DevOps',
    'AInML':'인공지능/머신러닝 개발자',
    'DATA':'데이터 엔지니어/사이언티스트',
    'BlockChain':'블록체인 개발자',
    'ETC':'기타 혹은 미정'
}

export const positionConverter = data => {
    return PositionMap[data]
}

export const ReversePositionConverter = data => {
    return ReversePositionMap[data]
}