import request from 'request.js'

const diaryLogin = (data) => {
  return request({
    url: '/travelDiary/login',
    method: "POST",
    data: data
  })
}

// 按时间获取一定数量的游记列表
const getNoteListByTime = (data) => {
  return request({
    url: '/travelDiary/getNoteListByTime',
    method: "POST",
    data: data,
  })
}
//搜索游记标题 获得列表
const getNoteListBySearchTitle = (data) => {
  return request({
    url: '/travelDiary/getNoteListBySearchTitle',
    method: "POST",
    data: data
  })
}
//搜索作者获取游记列表
const getNoteListBySearchAuthor = (data) => {
  return request({
    url: '/travelDiary/getNoteListBySearchAuthor',
    method: "POST",
    data: data
  })
}
//获取游记详情内容 同时浏览量加一
const getNoteDetails = (data) => {
  return request({
    url: '/travelDiary/getNoteDetails',
    method: "POST",
    data: data
  })
}

//获取游记评论区列表
const getNoteComments = (data) => {
  return request({
    url: '/travelDiary/getNoteComments',
    method: "POST",
    data: data
  })
}

//点赞
const likeNote = (data) => {
  return request({
    url: '/travelDiary/likeNote',
    method: "POST",
    data: data
  })
}

//收藏
const collectNote = (data) => {
  return request({
    url: '/travelDiary/collectNote',
    method: "POST",
    data: data
  })
}

//取消收藏
const cancelcollectNote = (data) => {
  return request({
    url: '/travelDiary/cancelcollectNote',
    method: "POST",
    data: data
  })
}

//评论
const makeComment = (data) => {
  return request({
    url: '/travelDiary/makeComment',
    method: "POST",
    data: data
  })
}

//获得用户信息
const getUserInfo = () => {
  return request({
    url: '/travelDiary/getUserInfo',
    method: "GET"
  })
}

//设置头像
const setAvatar = (data) => {
  return request({
    url: '/travelDiary/setAvatar',
    method: "POST",
    data: data
  })
}

//设置昵称
const setNickname = (data) => {
  return request({
    url: '/travelDiary/setNickname',
    method: "POST",
    data: data
  })
}

//编辑游记
const uploadNote = (data) => {
  return request({
    url: '/travelDiary/uploadNote',
    method: "POST",
    data: data
  })
}

//删除游记
const deleteNote = (data) => {
  return request({
    url: '/travelDiary/deleteNote',
    method: "POST",
    data: data
  })
}

export default {
  getNoteListByTime,
  getNoteListBySearchTitle,
  getNoteListBySearchAuthor,
  getNoteDetails,
  getNoteComments,
  likeNote,
  collectNote,
  cancelcollectNote,
  makeComment,
  getUserInfo,
  setAvatar,
  setNickname,
  uploadNote,
  deleteNote
}