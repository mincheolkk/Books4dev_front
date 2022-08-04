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