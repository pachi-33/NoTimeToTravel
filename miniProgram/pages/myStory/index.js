// pages/myStory/index.js
import Api from "../../utils/api";
Page({
  data: {
    noteList: [{
        noteId:0,
        title:'震惊，怎么到现在还没写完',
        coverImg: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img',
        authorNickname:'MAple',
        authorAvatar: 'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w',
        likeNume:100,
        status:'waiting',
        reviewComment:'',
        pastTime:'2023-03-03',
        uploadTime:'2023-03-03 12:12:12' //较新的
      },
      {
        noteId:1,
        title:'我真的很想玩博德之门',
        coverImg: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img',
        authorNickname:'MAple',
        authorAvatar: 'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w',
        likeNume:100,
        status:'disapproved',
        reviewComment:'',
        pastTime:'2023-03-03',
        uploadTime:'2023-03-03 12:12:12' //较新的
      },
      {
        noteId:2,
        title:'不玩博德之门的人生是不完整的',
        coverImg: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img',
        authorNickname:'MAple',
        authorAvatar: 'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w',
        likeNume:100,
        status:'disapproved',
        pastTime:'2023-03-03',
        reviewComment:'不玩不会死，但是不玩就不完整',
        uploadTime:'2023-03-03 12:12:12' //较新的
      },
      {
        noteId:3,
        title:'不玩舞萌的人生是不完整的',
        coverImg: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img',
        authorNickname:'MAple',
        authorAvatar: 'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w',
        likeNume:100,
        status:'approved',
        reviewComment:'舞萌是什么？',
        pastTime:'2天前',
        uploadTime:'2023-03-03 12:12:12' //较新的
      },
    ],
    haveNoteList:true,
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
  bindTapBackIcon:function(){
    wx.navigateBack();
  },
  bindTapNewStroy:function(){
    wx.navigateTo({
      url: '/pages/createStory/index',
    })
  },
  bindTapEdit:function(e){
    const noteId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/createStory/index?noteId=${noteId}`,
    })
  },
  bindTapDelete:async function(e){
    const noteId = e.currentTarget.dataset.id;
    await Api.deleteNote({
      noteId:noteId
    });
    console.log("删除",noteId)
  },
  bindTapMasonryItem:function(e){
    const noteId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/storyDetail/index?noteId=${noteId}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})