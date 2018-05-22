export default class WeatherService {
  constructor() {
    this.weatherApiUrl = 'http://127.0.0.1:3000/api/home/weather'
    this.weatherToIconOptions = {
      "0": {
        text: "晴天",
        class: "icon-qing"
      },
      "1": {
        text: "晴天",
        class: "icon-qing"
      },
      "2": {
        text: "晴天",
        class: "icon-qing"
      },
      "3": {
        text: "晴天",
        class: "icon-qing"
      },
      "4": {
        text: "多云",
        class: "icon-duoyun"
      },
      "5": {
        text: "多云",
        class: "icon-duoyun"
      },
      "6": {
        text: "多云",
        class: "icon-duoyun"
      },
      "7": {
        text: "多云",
        class: "icon-duoyun"
      },
      "8": {
        text: "多云",
        class: "icon-duoyun"
      },
      "9": {
        text: "阴天",
        class: "icon-yin"
      },
      "10": {
        text: "阵雨",
        class: "icon-zhongyu"
      },
      "11": {
        text: "雷阵雨",
        class: "icon-303"
      },
      "12": {
        text: "雷阵雨",
        class: "icon-404"
      },
      "13": {
        text: "小雨",
        class: "icon-xiaoyu1"
      },
      "14": {
        text: "中雨",
        class: "icon-zhongyu"
      },
      "15": {
        text: "大雨",
        class: "icon-dayu"
      },
      "16": {
        text: "暴雨",
        class: "icon-303"
      },
      "17": {
        text: "大暴雨",
        class: "icon-303"
      },
      "18": {
        text: "大暴雨",
        class: "icon-303"
      },
      "19": {
        text: "冻雨",
        class: "icon-404"
      },
      "20": {
        text: "雨夹雪",
        class: "icon-404"
      },
      "21": {
        text: "阵雪",
        class: "icon-401"
      },
      "22": {
        text: "小雪",
        class: "icon-401"
      },
      "23": {
        text: "中雪",
        class: "icon-402"
      },
      "24": {
        text: "大雪",
        class: "icon-403"
      },
      "25": {
        text: "暴雪",
        class: "icon-403"
      },
      "32": {
        text: "刮风",
        class: "icon-503-copy"
      },
      "33": {
        text: "大风",
        class: "icon-503-copy"
      },
      "34": {
        text: "飓风",
        class: "icon-503-copy"
      }
    }
  }

  getWeather() {
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        wx.request({
          url: this.weatherApiUrl,

          method: 'POST',

          header: {
            'Authorization': `Bearer ${JSON.parse(wx.getStorageSync('signInfo')).jwt.token}`
          },

          data: {
            longitude: res.longitude,
            latitude: res.latitude
          },

          success: (res) => {
            if (res.statusCode === 200) {
              wx.setStorageSync('weatherInfo', JSON.stringify(res.data))
            }
          }
        })
      }
    })
  }
}
