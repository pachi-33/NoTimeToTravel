// pages/myStory/index.js
import Api from "../../utils/api.js";
import util from "../../utils/util.js";
Page({
  data: {
    nickname: "爱旅游的yeye",
    avatarUrl: "cloud://cloud1-3gqiovxdc0a8a188.636c-cloud1-3gqiovxdc0a8a188-1325653378/avatar/1713321285200.png",
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
          nickname: res.nickname,
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
  bindInputNickname: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  bindConfirmName: async function (_this) {
    console.log("nickname=========", this.data.nickname)
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
      console.log("已登录");
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
    console.log("头像路径",fileuuid)
    let suffix = /\.\w+$/.exec(tmpFile)[0]
    wx.cloud.uploadFile({
      cloudPath: 'avatar/' + new Date().getTime() + fileuuid + suffix,
      filePath: tmpFile,
      success: res => {
        console.log("上传成功", res)
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
                  this.setData({
                    avatarUrl: res.data.avatarUrl,
                  });
                } else {
                  wx.showToast({
                    title: "修改失败",
                    icon: "none",
                    duration: 2000,
                  });
                  util.checkUserLogin().then((res) => {
                    console.log("已登录");
                    this.setData({
                      nickname: res.nickname,
                      avatarUrl: res.avatarUrl,
                    });
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }).catch(error => {
          console.log(error)
        })
      },
      fail: console.error
    })
  },
  bindInputNameBlur:function (e) {
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
        console.log("==============", err);
      });
    this.setData({
      canEditNickName:false
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