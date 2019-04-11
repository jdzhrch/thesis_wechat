// miniprogram/pages/search/search.js
import util from '../../utils/network_util.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    events: [
    ],
    isHideLoadMore: false
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  onLoad: function() {
    var that = this;
    app.getOpenid().then(function(res) {
      if (res.status == 200) {
        that.setData({
          openid: app.globalData.openid
        })
        wx.request({
          url: app.globalData.urldomain+'getHistory',
          method: 'GET',
          data: {
            openid: app.globalData.openid
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            //返回结果是js数组
            that.setData({
              events: res.data
            })
            console.log("request请求返回结果：")
            console.log(that.data.events)
          }
        })
      } else {
        console.log(res.data);
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("onshow在onload之前");

  },

  successtest: function(res) {
    console.log(res)
  },

  openReport: function(e) {
    var eventInfo = e.currentTarget.dataset;
    console.log("打开report页前的数据：")
    console.log(eventInfo);
    wx.navigateTo({
      url: '../report/report?eventid=' + eventInfo.id + '&eventname=' + eventInfo.eventname + '&reporttime=' + eventInfo.reporttime + '&reportver=' + eventInfo.reportver //传参跳转即可
    })
  }
})