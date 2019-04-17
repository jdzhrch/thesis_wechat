// miniprogram/pages/category/cateogry.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    articles: [{
      title: "李光耀去世",
      url: "www.baidu.com",
      pv: 3000
    }, {
      title: "李光耀去世啊啊啊啊",
      url: "www.baidu.com",
      pv: 1234
    }],
    isHideLoadMore: false
  },

  onLoad: function(options) {
    this.setData({
      categoryid: options.categoryid,
      featurelist: options.featurelist
    })
    console.log(this.data);
    //获取分类数据
    var that = this;
    wx.request({
      url: app.globalData.urldomain + 'getArticle',
      method: 'GET',
      data: {
        categoryid: options.categoryid
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //返回结果是js数组
        that.setData({
          articles: res.data
        });
        console.log(that.data);
      }
    })
  },
  openArticle: function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.hideToast();
            wx.showToast({
              title: '文章链接已复制到剪贴板',
              icon: 'none',
              duration: 2000
            })
            console.log(res.data) // data
          }
        })
      }
    })
  }
})
