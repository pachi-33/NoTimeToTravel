// pages/myStory/index.js
import Api from "../../utils/api.js";
import util from "../../utils/util.js";
Page({
  data: {
    nickname: "游客",
    avatarUrl: "",
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
        this.setData({
          nickname: res.nickname,
          avatarUrl: res.avatarUrl,
        });
      })
      .catch((err) => {
        console.log("checkUserLogin", err);
      });
  },
  bindTapEditNickName: function () {
    this.setData({
      canEditNickName: true,
    });
  },
  bindInputNickname: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  bindConfirmName: async function (_this) {
    const nickname = this.data.nickname
    let res = await Api.setNickname({
      nickName: nickname,
    });
    console.log(res);
    this.setData({
      canEditNickName: false,
    });
    if (res.data && res.data.status === 200) {
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
    util.checkUserLogin().then((res) => {
      this.setData({
        nickname: res.nickname,
        avatarUrl: res.avatarUrl,
      });
    });
  },
  bindChooseAvatar: function (e) {
    let _this = this
    let tmpFile = e.detail.avatarUrl
    let fileuuid = util.wxuuid()
    let suffix = /\.\w+$/.exec(tmpFile)[0]
    wx.cloud.uploadFile({
      cloudPath: 'avatar/' + new Date().getTime() + fileuuid + suffix,
      filePath: tmpFile,
      success: res => {
        //获取文件临时路径
        const fileIDAvatarURL = res.fileID
        //获取文件下载路径
        wx.cloud.getTempFileURL({
          fileList: [{
            fileID: fileIDAvatarURL,
          }]
        }).then(res => {
          // get temp file URL
          console.log(res.fileList)
          if (res.fileList[0].status === 0) {
            const avatarURL = res.fileList[0].tempFileURL
            Api.setAvatar({
                img: avatarURL,
              })
              .then((res) => {
                if (res.data && res.data.status === 200) {
                  wx.showToast({
                    title: "修改成功",
                    icon: "success",
                    duration: 2000,
                  });
                  console.log("修改成功，res", res)
                } else {
                  wx.showToast({
                    title: "修改失败",
                    icon: "none",
                    duration: 2000,
                  });
                }
                util.checkUserLogin().then((res) => {
                  this.setData({
                    nickname: res.nickname,
                    avatarUrl: res.avatarUrl,
                  });
                });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            wx.showToast({
              title: '上传头像失败',
              icon: "none",
              duration: 2000,
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      fail: console.error
    })
  },
  bindInputNameBlur: function (e) {
    //防止用户输入后未修改
    util
      .checkUserLogin()
      .then((res) => {
        this.setData({
          nickname: res.nickname,
          avatarUrl: res.avatarUrl,
        });
      })
      .catch((err) => {
        console.log("checkUserLogin", err);
      });
    this.setData({
      canEditNickName: false
    })
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