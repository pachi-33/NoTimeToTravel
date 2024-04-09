const pubUrl = "https://ctrip.x3322.net:3000/api/"//这是我要请求的数据接口的公共部分
const http = (options) =>{
  return new Promise((resolve,reject) => {
    wx.request({
      url: pubUrl+options.url,
      method:options.method || 'GET',
      data:options.data || {},
      header: options.header || {
        'content-type':'application/x-www-form-urlencoded'
      },
      success:resolve,
      fail:reject
    })
  })
}
export default http
