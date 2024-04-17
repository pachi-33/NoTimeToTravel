// app.js
App({
  onLaunch() {
    //初始化云存储
    wx.cloud.init({
      env:'cloud1-3gqiovxdc0a8a188'
    })
    
  },
  globalData: {
    userInfo: null
  }
})
