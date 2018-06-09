<template>
  <section class="container">
    <img src="../../../static/img/share.png" v-if="!isShare">
    <button open-type="getUserInfo" @getuserinfo="onGotUserInfo" v-if="!click && !isShare"> 请先获取用户信息 </button>
    <header v-if="!isShare">
      <button open-type="share"></button>
      <open-data type="userAvatarUrl" v-if="click"></open-data>
      <open-data type="userNickName" v-if="click"></open-data>
    </header>

    <header v-if="isShare">
      <img v-bind:src="shareAvatarUrl"/>
      <span>{{shareNickName}}</span>
    </header>

    <main class="main-ring-canvas">
      <canvas canvas-id="ringCanvas1" class="canvas"></canvas>
      <canvas canvas-id="ringCanvas2" class="canvas"></canvas>
    </main>

    <main class="main-canvas" v-bind:class="{g: isShare}">
      <canvas canvas-id="lineCanvas" class="canvas"></canvas>
    </main>
  </section>
</template>

<script>
  import {genNonDuplicateID} from "../../utils"

  const wxCharts = require('../../utils/wxcharts-min');

  import Vue from 'vue'

  export default {
    data() {
      return {
        shareAvatarUrl: null,
        shareNickName: null,
        isShare: false,
        click: false
      }
    },
    onLoad(option) {
      if (option.shareKey) {
        this.isShare = true
        Vue.$evaluateService.getShareEvaluateInfo(option.shareKey)
          .then(data => {
            this.renderEvaluateData(data.data)
            this.shareAvatarUrl = data.avatarUrl
            this.shareNickName = data.nickName
          })
          .catch((e) => {
            wx.showToast({
              title: '当前用户的分享信息已经过期',
              icon: 'none',
              duration: 2000
            })
          })
      } else {
        this.isShare = false
        const old = JSON.parse(wx.getStorageSync('signInfo'))
        if (!old.userinfo) {
          wx.getUserInfo({
            success: function(res) {
              Vue.$userService.postUserInfo(res.userInfo.avatarUrl, res.userInfo.nickName)
              old.userinfo = true
              wx.setStorageSync('signInfo', JSON.stringify(old))
            }
          })
        } else {
          this.click = true
        }
        Vue.$evaluateService.getEvaluateInfo()
          .then(data => {
            this.renderEvaluateData(data)
          })
      }
    },
    onShareAppMessage: function () {
      const shareKey = genNonDuplicateID(5)
      Vue.$evaluateService.createShare(shareKey)
      return {
        title: '我的日程总结',
        path: `/pages/evaluate/main?shareKey=${shareKey}`
      }
    },
    methods: {
      onGotUserInfo(d) {
        this.click = true
        wx.getUserInfo({
          success: function(res) {
            Vue.$userService.postUserInfo(res.userInfo.avatarUrl, res.userInfo.nickName)
            const old = JSON.parse(wx.getStorageSync('signInfo'))
            old.userinfo = true
            wx.setStorageSync('signInfo', JSON.stringify(old))
          }
        })
      },
      renderEvaluateData(data) {
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
      }
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

  header open-data:nth-child(2), header img {
    position: static;
    overflow: hidden;
    display: block;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-top: 1vh;
  }

  header open-data:nth-child(3), header span {
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

  .g {
    margin-top: 10vh;
  }


</style>
