//app.js

App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      urldomain : 'http://127.0.0.1:8000/multiDimEvents/'
    }
/*
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log(res.authSetting)
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.avatarUrl = res.userInfo.avatarUrl
              this.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })*/
  },
  getOpenid: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          that.globalData.openid = res.result.openid
          console.log("openid:", that.globalData.openid)
          //存储openidvar 
          res = {
            status: 200,
          }
          resolve(res);
        },
        fail: err => {
            reject('error');
        }
      })
    });
  }, 
})
  

