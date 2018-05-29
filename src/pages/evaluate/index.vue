<template>
  <section class="container">
    <img src="../../../static/img/share.png">
    <header>
      <button open-type="share"></button>

      <open-data type="userAvatarUrl"></open-data>
      <open-data type="userNickName"></open-data>
    </header>

    <main class="main-ring-canvas">
      <canvas canvas-id="ringCanvas1" class="canvas"></canvas>
      <canvas canvas-id="ringCanvas2" class="canvas"></canvas>
    </main>

    <main class="main-canvas">
      <canvas canvas-id="lineCanvas" class="canvas"></canvas>
    </main>

  </section>
</template>

<script>
  const wxCharts = require('../../utils/wxcharts-min');

  import Vue from 'vue'

  export default {
    data() {
      return {
        userInfo: null,
      }
    },
    onLoad() {
      Vue.$evaluateService.getEvaluateInfo()
        .then(data => {
          const res = wx.getSystemInfoSync();
          let windowWidth = res.windowWidth;
          let windowHeight = res.windowHeight;
          let lastMonthRate, monthRate;

          if (data[0].tSum + data[0].fSum === 0) {
            lastMonthRate = 0
          } else {
            lastMonthRate = Math.round(data[0].tSum / (data[0].tSum + data[0].fSum) * 100)
          }

          if (data[1].tSum + data[1].fSum === 0) {
            monthRate = 0
          } else {
            monthRate = Math.round(data[1].tSum / (data[1].tSum + data[1].fSum) * 100)
          }



          new wxCharts({
            animation: true,
            canvasId: 'ringCanvas2',
            type: 'ring',
            extra: {
              ringWidth: 15,
              pie: {
                offsetAngle: -45
              }
            },
            title: {
              name: `${lastMonthRate}%`,
              color: '#7cb5ec',
              fontSize: 25
            },
            subtitle: {
              name: '上月完成率',
              color: '#666666',
              fontSize: 15
            },
            series: [{
              name: '已完成',
              data: lastMonthRate,
              stroke: false,
              color: '#ed8f8f'
            }, {
              name: '未完成',
              data: 100 - lastMonthRate,
              stroke: false,
              color: '#ffe8eb'
            }],
            disablePieStroke: true,
            width: windowWidth / 2,
            height: 200,
            dataLabel: false,
            legend: true,
            background: '#f5f5f5',
            padding: 0
          })

          new wxCharts({
            animation: true,
            canvasId: 'ringCanvas1',
            type: 'ring',
            extra: {
              ringWidth: 15,
              pie: {
                offsetAngle: -45
              }
            },
            title: {
              name: `${monthRate}%`,
              color: '#7cb5ec',
              fontSize: 25
            },
            subtitle: {
              name: '当月完成率',
              color: '#666666',
              fontSize: 15
            },
            series: [{
              name: '已完成',
              data: monthRate,
              stroke: false,
              color: '#ed8f8f'
            }, {
              name: '未完成',
              data: 100 - monthRate,
              stroke: false,
              color: '#ffe8eb'
            }],
            disablePieStroke: true,
            width: windowWidth / 2,
            height: 200,
            dataLabel: false,
            legend: true,
            background: '#f5f5f5',
            padding: 0
          })

          new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            series: [{
              name: '已完成Todo',
              data: data[2][0],
              format: function (val) {
                return val;
              }
            }, {
              name: '总共的Todo',
              data: data[2][1],
              format: function (val) {
                return val;
              }
            }],
            yAxis: {
              title: '数量',
              format: function (val) {
                return val;
              },
              min: 0
            },
            width: windowWidth,
            height: windowHeight * 0.35
          });
        })
    },
    methods: {}
  }
</script>

<style scoped>
  header {
    width: 100%;
    height: 25vh;
    background: linear-gradient(-180deg, #85D8FF 0%, #62A1FF 100%);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  header button {
    opacity: 0;
    position: absolute;
    top: 1.5vh;
    right: 1.5vh;
    width: 21px;
    height: 21px;
  }

  img {
    position: absolute;
    top: 1.5vh;
    right: 1.5vh;
    width: 21px;
    height: 21px;
  }

  header open-data:nth-child(2) {
    overflow: hidden;
    display: block;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-top: 1vh;
  }

  header open-data:nth-child(3) {
    color: #ffffff;
    margin-bottom: 2vh;
  }

  .main-ring-canvas {
    height: 35vh;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: row;
    border-bottom: #f4f3f4 6px solid;
  }

  .main-canvas {
    height: 35vh;
    width: 100%;
    text-align: center;
  }

  canvas {
    height: 35vh;
    display: block;
    position: relative;
    width: 100%;
  }


</style>
