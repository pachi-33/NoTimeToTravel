import request from 'request.js'
// 按时间获取一定数量的游记列表
const getNoteListByTime = (data,header) => {
  return request({
    url:'/travelDiary/getNoteListByTime',
    method: "POST",
    data: data,
    header:header
  })
}
//搜索游记标题获得列表
const getNoteListBySearchTitle = (data,header) => {
  return request({
    url:'/travelDiary/getNoteListBySearchTitle',
    method: "POST",
    data:data,
    header:header
  })
}
//搜索作者获取游记列表
const getNoteListBySearchAuthor = (data,header) => {
  return request({
    url:'/travelDiary/getNoteListBySearchAuthor',
    method: "POST",
    data:data,
    header:header
  })
}
//获取游记详情内容 同时浏览量加一
const getNoteDetails = (data,header) => {
  return request({
    url:'/travelDiary/getNoteDetails',
    method: "POST",
    data:data,
    header:header
  })
}

//获取游记评论区列表
const getNoteComments = (data,header) => {
  return request({
    url:'/travelDiary/getNoteComments',
    method: "POST",
    data:data,
    header:header
  })
}

//点赞
const likeNote = (data,header) => {
  return request({
    url:'/travelDiary/likeNote',
    method: "POST",
    data:data,
    header:header
  })
}

//点赞
const collectNote = (data,header) => {
  return request({
    url:'/travelDiary/collectNote',
    method: "POST",
    data:data,
    header:header
  })
}

//评论
const makeComment = (data,header) => {
  return request({
    url:'/travelDiary/makeComment',
    method: "POST",
    data:data,
    header:header
  })
}




export default{
  getNoteListByTime,
  getNoteListBySearchTitle,
  getNoteListBySearchAuthor,
  getNoteDetails,
  getNoteComments,
  likeNote,
  collectNote,
  makeComment
  }
