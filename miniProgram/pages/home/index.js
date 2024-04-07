// index.js

import { getLandscapeImages } from "./data";

function getNewList() {
  const newList = new Array(20).fill(0);
  const imgUrlList = getLandscapeImages();
  let count = 0;
  for (let i = 0; i < newList.length; i++) {
    newList[i] = {
      id: i + 1,
      title: `scroll-view`,
      time: `19:20`,
      like: 88,
      image_url: imgUrlList[count++ % imgUrlList.length],
    };
  }
  return newList;
}

Page({
  data: {
    times: 0,
    // 底部列表数据
    bottomList: getNewList(),

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
    this.setData({
      menuTop: res.top,
      menuHeight: res.height,
      menuLeft: res.width + 10,
      times: 0,
    });
  },
  bindSrollToLower() {
    console.log(this.data)
    if (this.data.times < 10) {
      this.setData({
        times:this.data.times+1,
        bottomList: this.data.bottomList.concat(getNewList()),
      });
    }
  },
});
