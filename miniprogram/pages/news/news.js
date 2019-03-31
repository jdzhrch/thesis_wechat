// miniprogram/pages/news/news.js
Page({
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
/*
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})