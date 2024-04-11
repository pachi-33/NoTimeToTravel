import Api from "../../utils/api";

// pages/login/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 顶部布局参数
    menuTop: 0,
    menuHeight: 0,
    menuLeft: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const res = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: res.top,
      menuHeight: res.height,
      menuLeft: res.width + 10,
      times: 0,
    });
  },
  login: function () {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          Api.login({
            code: res.code,
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  bindTapBackIcon: function () {
    console.log("点击返回")
    wx.switchTab({
      url: `/pages/home/index`,
    });
  }
});