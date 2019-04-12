// miniprogram/pages/apply/apply.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      eventname: options.eventname
    })
  },

  /*
   * 申请事件报告
   */
  apply: function(){
    //获取分类数据
    var that = this;
    wx.request({
      url: app.globalData.urldomain + 'processEvent/',
      method: 'POST',
      data: {
        eventname: that.data.eventname
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
      }
    })
  }
})