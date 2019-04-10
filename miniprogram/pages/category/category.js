// miniprogram/pages/category/cateogry.js
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
      eventid: options.eventid,
      catid: options.catid
    })
    console.log(this.data);
    //获取分类数据
    /*wx.request({
      url: 'https://your-domain/getCat',
      method: 'GET',
      data: {
        catid: this.data.catid
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        //返回结果是js数组
        //events = res是否可行
        for (var i = 0; i < res.length; i++) {
          console.log(res[i]);
          //todo
        }
      }
    })*/
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
