// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        console.log("登陆成功")
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    }),
    // 云开发环境初始化
    wx.cloud.init({
      env: 'ticecey-7gph1v5886b143e7'
    }),
    wx.cloud.callFunction({
      name: 'getOpenid',
      success(res){
        getApp().globalData.openid = res.result.OPENID
      }
    })
  },
  
  globalData: {
    imageData: [],
    userInfo: null,
    openid: null,
  },
})
