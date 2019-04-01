import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    ec: {
      onInit: initChart //采用release版本里面的init做法如这个
    }
  },

  onReady() {},

  onLoad: function(options) {
    this.setData({
      eventid: options.eventid,
      eventname: options.eventname,
      reporttime: options.reporttime
    })
    console.log(this.data);
  }
});

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, 'default', {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: "默认",
      subtext: "默认",
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
  return chart;
}