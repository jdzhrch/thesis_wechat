import * as echarts from '../../ec-canvas/echarts';

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
      reporttime: options.reporttime
    })
    console.log(this.data);
  },
  onReady: function() {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.test();
  },
  test: function() {
    console.log("testtest");
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

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
    isDisposed: false
  },

  dispose: function() {
    if (this.chart) {
      this.chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
  },

  setOption: function(chart) {
    var option = {
      title: {
        text: this.data.eventname,
        subtext: this.data.reporttime,
        x: 'center'
      },
      backgroundColor: "#ffffff",
      series: [{

        name: '访问来源',
        type: 'pie',
        radius: '55%',
        data: [{
            value: 235,
            name: '视频广告的点点滴滴多多多多多多多多多多多多多多多多多多多多多',
            url: "www.text"
          },
          {
            value: 274,
            name: '联盟广告',
            url: "www.text"
          },
          {
            value: 310,
            name: '邮件营销少时诵诗书所所所所所所所所所所所所所所所',
            url: "www.text"
          }
        ],
        roseType: 'angle',
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };


    //获取分类数据
    /*wx.request({
      url: 'https://your-domain/getCat',
      method: 'GET',
      data: {
        eventid: this.data.eventid
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
          option.series[0].data[0].value = 300
        }
      }
    })*/
    console.log(option.series[0].data)
    chart.setOption(option);
    chart.on('click', function(param) {
      console.log(param);
    });
  }
});