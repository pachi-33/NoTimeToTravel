// pages/myStory/index.js
import Api from "../../utils/api";
import util from "../../utils/util";
Page({
  data: {
    noteList: [
      {
        noteId: 0,
        title: "震惊，厦门原来有这么多好玩的",
        coverImg:
          "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img",
        authorNickname: "MAple",
        authorAvatar:
          "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w",
        likeNume: 100,
        status: "waiting",
        reviewComment: "",
        pastTime: "2023-03-03",
        uploadTime: "2023-03-03 12:12:12", //较新的
      },
      {
        noteId: 1,
        title: "我真的很想玩",
        coverImg:
          "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img",
        authorNickname: "MAple",
        authorAvatar:
          "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w",
        likeNume: 100,
        status: "disapproved",
        reviewComment: "标题不合规范",
        pastTime: "2023-03-03",
        uploadTime: "2023-03-03 12:12:12", //较新的
      },
      {
        noteId: 2,
        title: "不玩去欧洲度假的人生是不完整的",
        coverImg:
          "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYZB1p48LLH-Pc7Rzr4nN0YF-uZg7FW7zksw_Kjp0BNDHcZp9R9SRKbg0rA1HBaeK3Q",
        authorNickname: "MAple",
        authorAvatar:
          "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w",
        likeNume: 100,
        status: "disapproved",
        pastTime: "2023-03-03",
        reviewComment: "涉嫌引战",
        uploadTime: "2023-03-03 12:12:12", //较新的
      },
      {
        noteId: 3,
        title: "推荐三种上海美食",
        coverImg:
          "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w",
        authorNickname: "MAple",
        authorAvatar:
          "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w",
        likeNume: 100,
        status: "approved",
        reviewComment: "舞萌是什么？",
        pastTime: "2天前",
        uploadTime: "2023-03-03 12:12:12", //较新的
      },
    ],
    haveNoteList: true,
    // 顶部布局参数
    menuTop: 0,
    menuHeight: 0,
    menuLeft: 0,
  },
  onLoad: function (options) {
    const res = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: res.top,
      menuHeight: res.height,
      menuLeft: res.width + 10,
    });
    util
      .checkUserLogin()
      .then((res) => {
        this.setNoteList();
      })
      .catch((err) => {
        console.log("==============", err);
      });
  },
  bindTapBackIcon: function () {
    wx.navigateBack();
  },
  bindTapNewStroy: function () {
    wx.navigateTo({
      url: "/pages/createStory/index",
    });
  },
  bindTapEdit: function (e) {
    const noteId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/createStory/index?noteId=${noteId}`,
    });
  },
  bindTapDelete: async function (e) {
    const noteId = e.currentTarget.dataset.id;
    await Api.deleteNote({
      noteId: noteId,
    });
    console.log("删除", noteId);
  },
  bindTapMasonryItem: function (e) {
    const noteId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/storyDetail/index?noteId=${noteId}`,
    });
  },
  getMyNoteListWithStatus: async function () {
    try {
      const res = await Api.getMyNoteListWithStatus();
      const newList = res.data.noteList || [];
      return newList;
    } catch (err) {
      console.log("err", err);
      return [];
    }
  },
  setNoteList: async function () {
    const newList = await getMyNoteListWithStatus();
    newList = newList.map((item) => {
      item.pastTime = util.formatPast(
        new Date(item.uploadTime),
        "YYYY-mm-dd"
      );
      return item;
    });
    if (newList.length === 0) {
      this.setData({
        noteList: [],
        haveNoteList: false,
      });
      return;
    }
    this.setData({
      haveNoteList:true,
      noteList: newList,
    });
  },
});
