// index.js

import { getLandscapeImages } from "./data";
import util from "../../utils/util.js";

Page({
  data: {
    times: 0,
    token: "",
    noteList: [],
    // 网络布局参数
    crossAxisCount: 2,
    crossAxisGap: 8,
    mainAxisGap: 8,

    // 顶部布局参数
    menuTop: 0,
    menuHeight: 0,
    menuLeft: 0,
  },
  onLoad() {
    const res = wx.getMenuButtonBoundingClientRect();
    let gottoken = wx.getStorageSync("token");
    this.setData({
      menuTop: res.top,
      menuHeight: res.height,
      menuLeft: res.width + 10,
      token: gottoken || "",
      noteList: getNewList(),
    });
  },

getNewList: async function () {
  let that = this;
  let time = util.formatTime(new Date(), "YYYY-mm-dd HH:mm:ss");
  let noteListQuery = {
    loginKey: {
      auth: "user",
      token: that.data.token,
    },
    beforeWhen: time,
    listLength: 100,
  };

  try {
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: "https://ctrip.x3322.net:3000/travelDiary/getNoteComments",
        method: 'POST',
        data: noteListQuery,
        header: {
          "content-type": "application/json", // 默认值
          "Authorization": that.data.token,
        },
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        }
      });
    });

    console.log(res.data);
    let newList = res.data;
    newList = newList.map((item) => {
      item.pastTime = util.formatPast(
        new Date(item.uploadTime.replaceAll("-", "/")),
        "YYYY-mm-dd"
      );
      return item;
    });
    return newList;
  } catch (err) {
    console.log("error:", err);
    return [];
  }
},
    // const newList = new Array(20).fill(0);
    // const imgUrlList = getLandscapeImages();
    // let count = 0;
    // for (let i = 0; i < newList.length; i++) {
    //   newList[i] = {
    //     noteId: i + 1,
    //     title: `helllo ${i}`,
    //     uploadTime: `2024-04-06 12:12:12`,
    //     likeNume: 88,
    //     coverImg: imgUrlList[count++ % imgUrlList.length],
    //     authorAvatar:
    //       "https://res.wx.qq.com/op_res/lS41C5Xp6y6mfUbelCW8PArEcMwWRuhSohPO46vAiELbhAf56_CwONEDgM2vIVxOlT5KDcSxCkV8xIJ6cg3x2Q",
    //     authorNickname: "小明",
    //   };
    //   newList[i].pastTime = util.formatPast(
    //     new Date(newList[i].uploadTime.replaceAll("-", "/")),
    //     "YYYY-mm-dd"
    //   );
    // }
    // return newList;
  bindSrollToLower: function () {
    this.setData({
      noteList: this.data.noteList.concat(getNewList()),
    });
  },
  bindScrollToUpper:function(){
    this.setData({
      noteList: this.data.noteList.concat(getNewList()),
    });
  }
});
