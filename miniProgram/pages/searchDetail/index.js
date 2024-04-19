// pages/searchDetail/index.js
import util from "../../utils/util.js";
import Api from "../../utils/api.js";

Page({
  data: {
    times: 0, //测试代码内容
    noteList: [{
        noteId: 0,
        title: "厦门真好玩",
        uploadTime: `2024-04-06 12:12:12`,
        pastTime: "2024-04-06",
        likeNume: 200,
        mediaType: "img",
        coverImg: "https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJPRaN5CDI6NZFg_qbSxeqF8UBpM4lXJ_1o9S9bsOOxMpuXGLeKyAKleWlAXmVLmQOw",
        authorAvatar: "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYZB1p48LLH-Pc7Rzr4nN0YF-uZg7FW7zksw_Kjp0BNDHcZp9R9SRKbg0rA1HBaeK3Q",
        authorNickname: "喜欢旅游"
      },
      {
        noteId: 2,
        title: "去厦门，玩这些就够了",
        uploadTime: `2024-04-06 12:12:12`,
        pastTime: "2024-04-06",
        likeNume: 300,
        mediaType: "iag",
        coverImg: "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYjda9Dp372N3T05q_nn3PgvoXBoReXvaXBfkthtXQLN7m5_YI6FoTre-xvJBDFLMA",
        authorAvatar: "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYjda9Dp372N3T05q_nn3PgvoXBoReXvaXBfkthtXQLN7m5_YI6FoTre-xvJBDFLMA",
        authorNickname: "小强"
      },
    ],
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
    console.log(options)
    this.setData({
      menuTop: res.top,
      menuHeight: res.height,
      menuLeft: res.width + 10,
      loading: true,
      searchValue: options.searchValue || "",
      isSearchByTitle: options.isSearchByTitle === "true" ? true : false,
    });
    this.bindScrollToUpper();
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
    console.log("submit search");
    this.setData({
      isSearching: false,
      isSearchOptionActive: false,
      loading: true,
    });
    console.log("searchValue", this.data.searchValue);
    const data = {
      beforeWhen: refresh ?
        util.formatTime(new Date(), "YYYY-mm-dd HH:mm:ss") : "",
      beforeNoteId: refresh ?
        "" : this.data.noteList[this.data.noteList.length - 1].noteId,
      listLength: 100,
    };
    if (this.data.isSearchByTitle) {
      data.keyWords = this.data.searchValue;
      Api.getNoteListBySearchTitle(data)
        .then((res) => {
          let newList = res.data.noteList || [];
          if (newList.length !== 0) {
            newList = newList.map((item) => {
              item.pastTime = util.formatPast(
                new Date(item.uploadTime),
                "YYYY-mm-dd"
              );
              return item;
            });
          }
          this.setData({
            loading: false,
          });
          return newList;
        })
        .catch((err) => {
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
          let newList = res.data.noteList || [];
          if (newList.length !== 0) {
            newList = newList.map((item) => {
              item.pastTime = util.formatPast(
                new Date(item.uploadTime),
                "YYYY-mm-dd"
              );
              return item;
            });
          }
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
  bindTapMasonryItem: function (e) {
    const noteId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/storyDetail/index?noteId=${noteId}`,
    });
  },
  bindSubmitSearch: async function () {
    try {
      let newList = await this.getNewSearchList();
      if (newList.length === 0) {
        this.setData({
          haveNoteList: false,
        });
      }
      this.setData({
        noteList: newList,
      });
    } catch (err) {
      wx.showToast({
        title: "搜索失败",
        icon: "none",
        duration: 2000,
      });
      console.log("err", err);
    }
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
    try {
      let newList = await this.getNewSearchList();
      if (newList.length === 0) {
        wx.showToast({
          title: "你居然看完了全部的物语~",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      let oldList = this.data.noteList
      this.setData({
        noteList: oldList.concat(newList),
      });
    } catch (err) {
      wx.showToast({
        title: "出错了~",
        icon: "none",
        duration: 2000,
      });
      console.log("error:", err);
    }
  },
  bindScrollToUpper: async function () {
    try {
      let newList = await this.getNewSearchList(true);
      console.log("newList", newList)
      if (newList.length === 0) {
        this.setData({
          haveNoteList: false,
        });
      }
      this.setData({
        noteList: newList,
      });
    } catch (err) {
      wx.showToast({
        title: "出错了~",
        icon: "none",
        duration: 2000,
      });
      console.log("error:", err);
    }
  },
});