// pages/myStory/index.js
import Api from "../../utils/api.js";
import util from "../../utils/util.js";
Page({
  data: {
    nickname: "游客",
    avatarUrl:
      "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYjda9Dp372N3T05q_nn3PgvoXBoReXvaXBfkthtXQLN7m5_YI6FoTre-xvJBDFLMA",
    canEditNickName: false,
    // 顶部布局参数
    menuTop: 0,
    menuHeight: 0,
    menuLeft: 0,
  },
  onLoad(options) {
    const res = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: res.top + res.height,
      menuHeight: res.height,
      menuLeft: res.width + 10,
    });
    util
      .checkUserLogin()
      .then((res) => {
        console.log("已登录");
        this.setData({
          nickname: res.nickName,
          avatarUrl: res.avatarUrl,
        });
      })
      .catch((err) => {
        console.log("==============", err);
      });
  },
  bindTapEditNickName: function () {
    this.setData({
      canEditNickName: true,
    });
  },
  bindConfirmName: async function () {
    let res = await Api.updateUserInfo({
      nickName: this.data.nickname,
    });
    console.log(res);
    this.setData({
      canEditNickName: false,
    });
    if (res.data && res.data.status === "200") {
      wx.showToast({
        title: "修改成功",
        icon: "success",
        duration: 2000,
      });
    } else {
      wx.showToast({
        title: "修改失败",
        icon: "none",
        duration: 2000,
      });
    }
  },
  bindChooseAvatar: function (e) {
    const tmpURL = e.detail.avatarUrl;
    wx.uploadFile({
      url: "https://ctrip.x3322.net:3000/api/travelDiary/uploadFile", //仅为示例，非真实的接口地址
      filePath: tmpURL,
      name: "avatar",
      formData: {
        mediaType: "img",
      },
      success(res) {
        if (res.statusCode === 200) {
          const { url, mediaType } = res.data;
          Api.setAvatar({
            img: url,
          })
            .then((res) => {
              if (res.data && res.data.status === "200") {
                wx.showToast({
                  title: "修改成功",
                  icon: "success",
                  duration: 2000,
                });
                this.setData({
                  avatarUrl: res.data.avatarUrl,
                });
              } else {
                wx.showToast({
                  title: "修改失败",
                  icon: "none",
                  duration: 2000,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    });
  },
  bindTapMyStory: function () {
    wx.navigateTo({
      url: "/pages/myStory/index",
    });
  },
  bindTapMyCollect: function () {
    wx.navigateTo({
      url: "/pages/myCollection/index",
    });
  },
});
