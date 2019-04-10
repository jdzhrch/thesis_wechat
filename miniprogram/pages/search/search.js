import util from '../../utils/network_util.js';
// miniprogram/pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    events: [{
        eventId: 11,
        name: '寒门状元之死',
        url: 'bill',
        reportTime: "2019.12.30",
        catNum: 1,
        reportVer: 1
      },
      {
        eventId: 12,
        name: '美国CLINIQUE倩碧黄油无油/特效润肤露125ml',
        url: 'bill',
        reportTime: "2019.3.30",
        catNum: 4,
        reportVer: 1,
      },
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

  /*
   * util文件夹里面有network工具可以看下能否直接使用
   */
  getHistory: function() {},
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
    console.log(eventInfo);
    wx.navigateTo({
      url: '../report/report?eventid=' + eventInfo.eventid + '&eventname=' + eventInfo.eventname + '&reporttime=' + eventInfo.reporttime + '&reportVer=' + eventInfo.reportVer //传参跳转即可
    })
  }
})