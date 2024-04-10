// pages/searchDetail/index.js
import util from "../../utils/util.js";
import Api from "../../utils/api.js";

Page({
  data: {
    times: 0, //测试代码内容
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
  onLoad: async function (options) {
    const res = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: res.top,
      menuHeight: res.height,
      menuLeft: res.width + 10,
      loading: true,
      searchValue: options.searchValue || "",
      isSearchByTitle: options.isSearchByTitle === "true" ? true : false,
      noteList: await this.getNewSearchList(true) || [], //待接口完善后i需改

    });
    console.log("现在在searchDetail页面",this.data);
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
  getNewSearchList: async function (refresh = false) {
    console.log("submit search")
    this.setData({
      isSearching: false,
      isSearchOptionActive: false,
      loading: true,
    });
    console.log("searchValue", this.data.searchValue);
    const data = {
      beforeWhen: refresh
        ? util.formatTime(new Date(), "YYYY-mm-dd HH:mm:ss")
        : "",
      beforeNoteId: refresh
        ? ""
        : this.noteList[this.noteList.length - 1].noteId,
      listLength: 100,
    };
    if (this.data.isSearchByTitle) {
      data.keyWords = this.data.searchValue;
      Api.getNoteListBySearchTitle(data)
        .then((res) => {
          console.log("res", res);
          let newList = res.data || [];
          newList = newList.map((item) => {
            item.pastTime = util.formatPast(
              new Date(item.uploadTime.replaceAll("-", "/")),
              "YYYY-mm-dd"
            );
            return item;
          });
          this.setData({
            loading: false,
          });
          return newList;
        })
        .catch((err) => {
          console.log("err", err);
          this.setData({
            loading: false,
          });
          return [];
        });
    } else {
      data.authorNickname = this.data.searchValue;
      Api.getNoteListBySearchAuthor(data)
        .then((res) => {
          console.log("res", res);
          let newList = res.data || [];
          newList = newList.map((item) => {
            item.pastTime = util.formatPast(
              new Date(item.uploadTime.replaceAll("-", "/")),
              "YYYY-mm-dd"
            );
            return item;
          });
          this.setData({
            loading: false,
          });
          return newList;
        })
        .catch((err) => {
          console.log("err", err);
          this.setData({
            loading: false,
          });
          return [];
        });
    }

  },
  bindSubmitSearch: async function () {
    let newList = await this.getNewSearchList(true);
    if(newList.length === 0){
      this.setData({
        haveNoteList: false,
      });
    }
    this.setData({
      noteList: newList,
    });
  },
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
  bindTapBackIcon: function () {
    wx.navigateBack();
  },
  bindSrollToLower: async function () {
    let newList = await this.getNewSearchList();
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
    let newList = await this.getNewSearchList(true);
    if(newList.length === 0){
      this.setData({
        haveNoteList: false,
      });
    }
    this.setData({
      noteList: newList,
    });
  },
});
