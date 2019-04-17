// miniprogram/pages/search/search.js
import util from '../../utils/network_util.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    events: [],
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

  /*
   * 在搜索框输入文本时触发
   */
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
    var that = this;
    wx.request({
      url: app.globalData.urldomain + 'searchEvent',
      method: 'GET',
      data: {
        searchkeyword: e.detail.value
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        //返回结果是js数组
        that.setData({
          searchresults: res.data
        })
        console.log("search返回结果：")
        console.log(that.data.searchresults)
      }
    })
  },

  inputConfirm: function(e) {
    if (this.data.searchresults.length == 0) {
      //只有在输入框有数据，且searchresults还未有数据时才会跳转
      if (e.detail.value) {
        wx.navigateTo({
          url: '../apply/apply?&eventname=' + e.detail.value //传参跳转即可
        })
      }
    } else{
      wx.showToast({
        title: '请使用已匹配到的结果',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    app.getOpenid().then(function (res) {
      if (res.status == 200) {
        that.setData({
          openid: app.globalData.openid
        })
        wx.request({
          url: app.globalData.urldomain + 'processHistory',
          method: 'GET',
          data: {
            openid: app.globalData.openid
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
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

  openReport: function(e) {
    var eventInfo = e.currentTarget.dataset;
    console.log("打开report页前的数据：")
    console.log(eventInfo);
    wx.navigateTo({
      url: '../report/report?eventid=' + eventInfo.id + '&eventname=' + eventInfo.eventname + '&reporttime=' + eventInfo.reporttime + '&reportver=' + eventInfo.reportver //传参跳转即可
    })
  },

  addHistory: function(e) {
    console.log("addhistory:")
    console.log(e.currentTarget.dataset)
    wx.request({
      url: app.globalData.urldomain + 'processHistory/',
      method: 'POST',
      data: {
        eventid: e.currentTarget.dataset.id,
        openid: app.globalData.openid
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("posthistory请求返回结果：")
        console.log(res.data)
      }
    })
  }
})