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
      <canvas canvas-id="lineCanvas" disable-scroll="true" class="canvas"></canvas>
    </main>

  </section>
</template>

<script>
  const wxCharts = require('../../utils/wxcharts-min');
  export default {
    data() {
      return {
        userInfo: null,
      }
    },
    onLoad() {
      const res = wx.getSystemInfoSync();
      let windowWidth = res.windowWidth;
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
          name: '60%',
          color: '#7cb5ec',
          fontSize: 25
        },
        subtitle: {
          name: '上周完成率',
          color: '#666666',
          fontSize: 15
        },
        series: [{
          name: '已完成',
          data: 60,
          stroke: false,
          color: '#ed8f8f'
        }, {
          name: '未完成',
          data: 40,
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
        canvasId: 'ringCanvas2',
        type: 'ring',
        extra: {
          ringWidth: 15,
          pie: {
            offsetAngle: -45
          }
        },
        title: {
          name: '90%',
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
          data: 90,
          stroke: false,
          color: '#ed8f8f'
        }, {
          name: '未完成',
          data: 10,
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
      let simulationData = this.createSimulationData();
      new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: simulationData.categories,
        animation: true,
        // background: '#f5f5f5',
        series: [{
          name: '每周完成量',
          data: simulationData.data,
          format: function (val, name) {
            return val.toFixed(2) + '万';
          }
        }, {
          name: '每月完成量',
          data: [2, 0, 0, 3, 32, 4, 0, 0, 2, 0],
          format: function (val, name) {
            return val.toFixed(2) + '万';
          }
        }],
        xAxis: {
          disableGrid: false
        },
        yAxis: {
          title: '数量',
          format: function (val) {
            return val.toFixed(2);
          },
          min: 0
        },
        width: windowWidth,
        height: 200,
        dataLabel: false,
        dataPointShape: true,
        extra: {
          lineStyle: 'straight'
        }
      })
    },
    methods: {
      createSimulationData: function () {
        var categories = [];
        var data = [];
        for (var i = 0; i < 10; i++) {
          categories.push('2018-' + (i + 1));
          data.push(Math.random() * (20 - 10) + 10);
        }
        // data[4] = null;
        return {
          categories: categories,
          data: data
        }
      },
    }
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
    display: flex;
    flex-direction: row;
  }

  canvas {
    height: 35vh;
    display: block;
    position: relative;
    width: 100%;
  }


</style>
