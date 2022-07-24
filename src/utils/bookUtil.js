const time = {
    '개발자 취업 전':"before", 
    '개발자 취업 후 ~ 2년':"after", 
    '2년 ~ 5년':"two", 
    '5년 ~ 10년':"five",
    '10년 ~' :"ten"
};

export const timeConverter = data => {
    return time[data]
}