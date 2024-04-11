// pages/myCollection/index.js
import Api from "../../utils/api.js";
import util from "../../utils/util.js";
Page({
  data: {
    noteList: [
      {
        noteId: 0,
        title: "震惊，怎么到现在还没写完",
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
        title: "我真的很想玩博德之门",
        coverImg:
          "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img",
        authorNickname: "MAple",
        authorAvatar:
          "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w",
        likeNume: 100,
        status: "disapproved",
        reviewComment: "",
        pastTime: "2023-03-03",
        uploadTime: "2023-03-03 12:12:12", //较新的
      },
      {
        noteId: 2,
        title: "不玩博德之门的人生是不完整的",
        coverImg:
          "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img",
        authorNickname: "MAple",
        authorAvatar:
          "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w",
        likeNume: 100,
        status: "disapproved",
        pastTime: "2023-03-03",
        reviewComment: "不玩不会死，但是不玩就不完整",
        uploadTime: "2023-03-03 12:12:12", //较新的
      },
      {
        noteId: 3,
        title: "不玩舞萌的人生是不完整的",
        coverImg:
          "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img",
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
  onLoad(options) {
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
        console.log("已登录");
      })
      .catch((err) => {
        console.log("==============", err);
      });
  },
  bindTapBackIcon: function () {
    wx.navigateBack();
  },
  bindTapMasonryItem: function (e) {
    const noteId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/storyDetail/index?noteId=${noteId}`,
    });
  },
  getMyCollection: async function () {
    try {
      const res = await Api.getMyCollect();
      const newList = res.data.noteList || [];
      return newList;
    } catch (err) {
      console.log("err", err);
      return [];
    }
  },
  setNoteList: async function () {
    const newList = await getMyCollection();
    newList = newList.map((item) => {
      item.pastTime = util.formatPast(
        new Date(item.uploadTime.replaceAll("-", "/")),
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
      haveNoteList: true,
      noteList: newList,
    });
  },
});
