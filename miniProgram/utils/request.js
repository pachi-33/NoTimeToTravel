const pubUrl = "https://xtrip.x3322.net:3000/api/"//这是我要请求的数据接口的公共部分
const http = (options) =>{
  return new Promise((resolve,reject) => {
    wx.request({
      url: pubUrl+options.url,
      method:options.method || 'GET',
      data:{data:options.data} || {},
      header: options.header || {
        'content-type':'application/json',
        'Authorization': wx.getStorageSync('token'),
      },
      success:(res)=>{
        if (res.data && res.data.freshToken) {
          wx.setStorage("token",res.data.freshToken)
        }
        else if(res.data && res.data.token){
          wx.setStorage("token",res.data.token)
        }
        resolve(res)
      },
      fail:reject
    })
  })
}
export default http
