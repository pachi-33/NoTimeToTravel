// pages/storyDetail/index.js
Page({
  data: {
    content: {
      noteId: "",
      noteTitle: "我是标题",
      noteContent: "内容内容内容内容",
      authorNickname: "MAple",
      viewNum: "100",
      likeNum: "200",
      collectNum: "300",
      lastModifyTime: "2024-04-04 12:12:12",
      location: "上海",
      resources: [{
          mediaType: "image",
          url: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img",
        },
        {
          mediaType: "image",
          url: "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYjda9Dp372N3T05q_nn3PgvoXBoReXvaXBfkthtXQLN7m5_YI6FoTre-xvJBDFLMA",
        },
        {
          mediaType: "image",
          url: "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYfa6mRnywhNbBFV5eAt7oTz3zjlNJeujfQx0PVA1ufenPHBvxYXRNJ5chyi6RPaE7A",
        },
        {
          mediaType: "image",
          url: "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYZB1p48LLH-Pc7Rzr4nN0YF-uZg7FW7zksw_Kjp0BNDHcZp9R9SRKbg0rA1HBaeK3Q",
        },
        {
          mediaType: "image",
          url: "https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJPRaN5CDI6NZFg_qbSxeqF8UBpM4lXJ_1o9S9bsOOxMpuXGLeKyAKleWlAXmVLmQOw",
        },
        {
          mediaType: "image",
          url: "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w",
        },
      ],
    },
    haveCommentList:true,
    comments: [{
        commentId:1,
        commentBy: "nickname1",
        commentContent:"哇塞，姐妹你好厉害",
        commentTime:"2024-05-05 12:12:12" //较新的
      },
      {
        commentId:2,
        commentBy: "nickname2",
        commentContent:"666",
        commentTime:"2024-05-05 12:12:12" //较久的
      },
      {
        commentId:3,
        commentBy: "nickname2",
        commentContent:"哇塞，xd你好厉害",
        commentTime:"2024-05-05 12:12:12" //较久的
      },
      {
        commentId:4,
        commentBy: "nickname2",
        commentContent:"我想玩博德之门",
        commentTime:"2024-05-05 12:12:12" //较久的
      },
      {
        commentId:5,
        commentBy: "nickname2",
        commentContent:"我也想玩",
        commentTime:"2024-05-05 12:12:12" //较久的
      },
      {
        commentId:6,
        commentBy: "nickname2",
        commentContent:"呜呜呜呜呜我的阿斯",
        commentTime:"2024-05-05 12:12:12" //较久的
      },
      {
        commentId:7,
        commentBy: "nickname2",
        commentContent:"666",
        commentTime:"2024-05-05 12:12:12" //较久的
      },
    ],
    imgheightList: [],
    userComment: "",
    current: 0,
    // 顶部布局参数
    menuTop: 0,
    menuHeight: 0,
    menuLeft: 0,
    //底部布局参数
    commentpos: 0,
  },

  onLoad(options) {
    const res = wx.getMenuButtonBoundingClientRect();
    const systeminfo = wx.getSystemInfoSync();
    console.log(
      "systeminfo",
      systeminfo.sreenHeight,
      systeminfo.statusBarHeight,
      systeminfo
    );
    this.setData({
      menuTop: res.top,
      menuHeight: res.height,
      menuLeft: res.width + 10,
      commentpos: systeminfo.windowHeight - systeminfo.statusBarHeight - 70,
    });
    console.log("commentpos", this.data.commentpos);
  },

  bindChange: function (e) {
    this.setData({
      current: e.detail.current,
    });
  },
  imageLoad: function (e) {
    let screenwidth = wx.getSystemInfoSync().windowWidth;
    let imgwidth = e.detail.width;
    let imgheight = e.detail.height;
    //宽高比
    const ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight);
    //计算的高度值
    const newHeight = 675 / ratio;
    const imgheights = this.data.imgheightList;
    //把每一张图片的对应的高度记录到数组里
    imgheights[e.target.dataset.id] = newHeight;
    this.setData({
      imgheightList: imgheights,
    });
    console.log(this.data.imgheightList);
  },
  bindCommentInput:function(e){
    this.setData({
      userComment: e.detail.current,
    });
  },
  bindTapBackIcon: function () {
    wx.navigateBack();
  },
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