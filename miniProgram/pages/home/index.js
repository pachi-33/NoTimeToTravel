// index.js

import { getLandscapeImages,getMediaType } from "./data";
import util from "../../utils/util.js";
import Api from "../../utils/api.js";

Page({
  data: {
    times: 0, //测试代码内容
    token: "111",
    noteList: [],
    isSearching: false,
    isSearchByTitle: true, //默认按照标题搜索
    isSearchOptionActive: false,
    loading: false,
    haveNoteList: false,
    searchValue: "",
    // 网络布局参数
    crossAxisCount: 2,
    crossAxisGap: 8,
    mainAxisGap: 8,
    // 顶部布局参数
    menuTop: 0,
    menuHeight: 0,
    menuLeft: 0,
  },
  onLoad: async function () {
    const res = wx.getMenuButtonBoundingClientRect();
    let gottoken = wx.getStorageSync("token");
    this.setData({
      menuTop: res.top,
      menuHeight: res.height,
      menuLeft: res.width + 10,
      token: gottoken || "",
      loading: true,
      noteList: await this.getNewList(true) || [], //待接口完善后i需改
    });
    console.log(this.data.noteList);
  },

  getNewList: async function (refresh = false) {
    let noteListQuery = {
      beforeNoteId: "",
      beforeWhen: refresh
        ? util.formatTime(new Date(), "YYYY-mm-dd HH:mm:ss")
        : "",
      beforeNoteId: refresh
        ? ""
        : this.noteList[this.noteList.length - 1].noteId,
      listLength: 100,
    };
    let header = {
      "content-type": "application/json",
      Authorization: this.data.token,
    };
    // try {
    //   let res = await Api.getNoteListByTime(noteListQuery, header);
    //   console.log("getNewList的res", res)
    //   let newList = res.data || [];
    //   newList = newList.map((item) => {
    //     item.pastTime = util.formatPast(
    //       new Date(item.uploadTime.replaceAll("-", "/")),
    //       "YYYY-mm-dd"
    //     );
    //     return item;
    //   });
    //   this.setData({
    //     loading: false,
    //   });
    //   if(refresh && newList.length === 0){
    //     this.setData({
    //       haveNoteList: false,
    //     });
    //   }
    //   else{
    //     this.setData({
    //       haveNoteList: true,
    //     });
    //   }
    //   return newList;
    // } catch (err) {
    //   console.log("error:", err, "返回空数组,是否刷新",refresh);
    //   this.setData({
    //     loading: false,
    //   });
    //   if(refresh){
    //     this.setData({
    //       haveNoteList: false,
    //     });
    //   }
    //   return [];
    // }
    //测试代码
    let oldtime = this.data.times
    this.setData({
      times: oldtime + 1
    })
    const newList = new Array(20).fill(0);
    const imgUrlList = getLandscapeImages();
    const mediaTypeList = getMediaType();
    let count = 0;
    for (let i = 0; i < newList.length; i++) {
      newList[i] = {
        noteId: i + 1,
        title: `helllo ${i}`,
        uploadTime: `2024-04-06 12:12:12`,
        likeNume: 88,
        mediaType: mediaTypeList[count % mediaTypeList.length],
        coverImg: imgUrlList[count % imgUrlList.length],
        authorAvatar: "https://res.wx.qq.com/op_res/lS41C5Xp6y6mfUbelCW8PArEcMwWRuhSohPO46vAiELbhAf56_CwONEDgM2vIVxOlT5KDcSxCkV8xIJ6cg3x2Q",
        authorNickname: "小明",
      };
      count++;
      newList[i].pastTime = util.formatPast(
        new Date(newList[i].uploadTime.replaceAll("-", "/")),
        "YYYY-mm-dd"
      );
      console.log("长度",mediaTypeList.length,"count",count)
      if( newList[i].mediaType==="video")
      console.log("视频地址",i)
    }
    console.log(this.data.times)
    this.setData({haveNoteList:true})
    if (this.data.times < 2)
      return newList;
    else return [];
  },

  bindTapTitle: function () {
    this.setData({
      isSearchByTitle: true,
    });
  },
  bindTapAuthor: function () {
    this.setData({
      isSearchByTitle: false,
    });
  },
  bindSubmitSearch: function (refresh = false) {
    //跳转到搜索详情页
    wx.navigateTo({
      url: `/pages/searchDetail/index?searchValue=${this.data.searchValue}&isSearchByTitle=${this.data.isSearchByTitle}`,
    });
  },
  bindTapMasonryItem:function(e){
    const noteId = e.currentTarget.dataset.id;
    console.log("点击了",noteId)
    wx.navigateTo({
      url: `/pages/storyDetail/index?noteId=${noteId}`,
    })
  },
  // bindTESTTODETAIL:function(){
  //   wx.navigateTo({
  //     url: '/pages/storyDetail/index',
  //   })
  // },
  bindSearchInput: function (e) {
    this.setData({
      searchValue: e.detail.value,
    });
  },
  bindSearchFocus: function () {
    this.setData({
      isSearching: true,
    });
  },
  bindSearchBlur: function () {
    this.setData({
      isSearching: false,
    });
  },
  bindtapsearchOption: function () {
    this.setData({
      isSearchOptionActive: true,
    });
  },
  hideSearchOption: function () {
    this.setData({
      isSearchOptionActive: false,
    });
  },
  bindSrollToLower: async function () {
    let newList = await this.getNewList();
    console.log("newlist", newList);
    if (newList.length === 0) {
      wx.showToast({
        title: "你居然看完了全部的物语~",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    this.setData({
      noteList: this.data.noteList.concat(newList),
    });
  },
  bindScrollToUpper: async function () {
    let newList = await this.getNewList(true);
    this.setData({
      noteList: newList,
    });
  },
});
