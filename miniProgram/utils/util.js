const formatTime = (date, format) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  if (format === "YYYY-mm-dd HH:mm:ss")
    return `${[year, month, day].map(formatNumber).join("-")} ${[
      hour,
      minute,
      second,
    ]
      .map(formatNumber)
      .join(":")}`;
  else if (format === "YYYY-mm-dd")
    return `${[year, month, day].map(formatNumber).join("-")}`;
};

const formatPast = (date, format) => {
  // 传入格式处理、存储转换值
  let t = date.getTime(),s;
  // 获取js 时间戳
  let time = new Date().getTime();
  console.log("hello");
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

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

module.exports = {
  formatTime,
  formatPast,
};
