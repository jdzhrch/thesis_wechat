import * as echarts from '../../ec-canvas/echarts';
import * as utils from '../../utils/util.js';

const app = getApp();
Page({
  onShareAppMessage: res => {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  onLoad: function(options) {
    this.setData({
      eventid: options.eventid,
      eventname: options.eventname,
      reporttime: options.reporttime,
      reportver: options.reportver
    })
    console.log("接收到的参数：")
    console.log(this.data);

    var that = this;
    wx.request({
      url: app.globalData.urldomain + 'getCategory',
      method: 'GET',
      data: {
        eventid: options.eventid,
        reportver: options.reportver
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        //返回结果是js数组
        for (var i = 0; i < res.data.length; i++) {
          categoryid: res.data[i].id
          that.data.categories[i] = {
            value: res.data[i].articleNum,
            name: res.data[i].featureList,
          }
        }
        console.log("report页request请求返回结果：");
        console.log(that.data.categories);
        that.mySetOption();
      }
    })
  },
  onReady: function() {
    console.log("onready");
    console.log(this.data);
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.test();

  },
  test: function() {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      this.mySetOption();
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    categories: [],
  },

  dispose: function() {
    if (this.chart) {
      this.chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
  },

  mySetOption: function() {
    console.log("mysetoption:");
    console.log(this.data.categories);

    var option = {
      title: {
        text: this.data.eventname,
        subtext: this.data.reporttime,
        x: 'center'
      },
      backgroundColor: "#ffffff",
      series: [{

        name: "饼图",
        type: 'pie',
        radius: '55%',
        data: this.data.categories,
        roseType: 'angle',
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };

    console.log("mysetoption函数，图的data:");
    console.log(option.series[0].data);
    this.chart.setOption(option);
    //点击扇区跳转
    var eventid = this.data.eventid;
    this.chart.on('click', function(param) {
      console.log(param);
      wx.navigateTo({
        url: '../category/category?eventid=' + eventid + '&catid=' + param.data.catid
      })
    });
  }
});