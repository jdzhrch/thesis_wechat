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
        catNum: "1",
      },
      {
        eventId: 12,
        name: '美国CLINIQUE倩碧黄油无油/特效润肤露125ml',
        url: 'bill',
        reportTime: "2019.3.30",
        catNum: "4",
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },

  /*
   * util文件夹里面有network工具可以看下能否直接使用
   */
  getHistory: function() {
    wx.request({
      url: 'https://your-domain/getHistory',
      method: 'GET',
      data: {
        openid: app.globalData.openid
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        //返回结果是js数组
        //events = res是否可行
        for (var i = 0; i < res.length; i++) {
          console.log(res[i]);
          this.setData({
            //todo
          })
        }
      }
    })
  },

  openReport: function(e){
    var eventInfo = e.currentTarget.dataset;
    console.log(eventInfo);
    wx.navigateTo({
      url: '../report/report?eventid=' + eventInfo.eventid + '&eventname=' + eventInfo.name + '&reporttime=' + eventInfo.reporttime //传参跳转即可
    })
  }
})