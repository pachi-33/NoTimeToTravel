import Api from "api.js";
const formatTime = (date, format) => {
  console.log("data", date)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  console.log("结果", year, month, day)

  if (format === "YYYY-mm-dd HH:mm:ss")
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  else if (format === "YYYY-mm-dd")
    return `${year}-${month}-${day}`;
};

const formatPast = (date, format) => {
  // 传入格式处理、存储转换值
  let t = date.getTime(),
    s;
  // 获取js 时间戳
  let time = new Date().getTime();
  // 当前时间戳 - 传入时间戳
  time = Number.parseInt(`${time - t}`);
  if (time < 10000) {
    return "刚刚";
  } else if (time < 60000 && time >= 10000) {
    s = Math.floor(time / 1000);
    return `${s}秒前`;
  } else if (time < 3600000 && time >= 60000) {
    s = Math.floor(time / 60000);
    return `${s}分钟前`;
  } else if (time < 86400000 && time >= 3600000) {
    s = Math.floor(time / 3600000);
    return `${s}小时前`;
  } else if (time < 259200000 && time >= 86400000) {
    s = Math.floor(time / 86400000);
    return `${s}天前`;
  } else {
    return formatTime(date, format);
  }
};

const checkUserLogin = async () => {
  try {
    let res = await Api.getUserInfo();
    console.log("用户是否登录？", res.data)
    if (res.data && res.data.status === 200) {
      return {
        nickname: res.data.nickname,
        avatarUrl: res.data.avatarUrl
      };
    } else {
      wx.navigateTo({
        url: "/pages/login/index",
      });
      throw new Error("用户未登录");
    }
  } catch (err) {
    wx.navigateTo({
      url: "/pages/login/index",
    });
    console.log(err);
    throw new Error("用户未登录");
  }
};

module.exports = {
  formatTime,
  formatPast,
  checkUserLogin,
};