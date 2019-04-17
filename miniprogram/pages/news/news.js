// miniprogram/pages/news/news.js
const app = getApp()
Page({
  /*
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  onReachBottom: function() {
    console.log('加载更多')
    setTimeout(() => {
      this.setData({
        isHideLoadMore: true,
        events : [{
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
      })
    }, 1000)
  },
*/
  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    events: [],
    isHideLoadMore: false
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("onshow在onload之前");
    var that = this;
    that.setData({
      openid: app.globalData.openid
    })
    wx.request({
      url: app.globalData.urldomain + 'processEvent',
      method: 'GET',
      data: {
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