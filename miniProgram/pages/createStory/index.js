// pages/createStory/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mediaList: [],
    inputValue: "",
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
  bindTextAreaBlur: function (e) {
    this.setData({
      inputVal: e.detail.value,
    });
  },
  bindChooseMedia: function () {
    if (this.data.mediaList.length >= 9) {
      wx.showToast({
        title: "最多上传9张图片",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    let remainChooseCount = 9 - this.data.mediaList.length;
    wx.chooseMedia({
      count: remainChooseCount,
      sizeType: ["compressed"], //先使用小程序官方的压缩，后续可以考虑自己压缩
      mediaType: ["image", "video"],
      sourceType: ["album", "camera"],
      success: (res) => {
        let {	tempFiles} = res;
        tempFiles = tempFiles.forEach((item) => {
          item.type = item.type === "video" ? "video" : "image";
        });
        this.setData({
          photoList: res.tempFilePaths,
        });
      },
    });
  },
  bindSubmit:function(){},
  bindPreviewMedia:function(){},
  catchDelMedia:function(){},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
