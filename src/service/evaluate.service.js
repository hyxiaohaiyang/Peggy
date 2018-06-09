import {IS_DEV} from "../utils"

export default class EvaluateService {
  constructor() {
    this.evaludateApiUrl = (() => IS_DEV ? 'http://127.0.0.1:3000/api/evaluate' : 'https://zhufengshop.com/api/evaluate')()
    this.shareApiUrl = (() => IS_DEV ? 'http://127.0.0.1:3000/api/share' : 'https://zhufengshop.com/api/share')()
  }

  getEvaluateInfo() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.evaludateApiUrl,

        method: 'GET',

        header: {
          'Authorization': `Bearer ${JSON.parse(wx.getStorageSync('signInfo')).jwt.token}`
        },

        success: res => {
          if (res.statusCode === 200) {
            resolve(res.data)
          }
        },

        fail: () => {
          reject(false)
        }
      })
    })
  }

  createShare(shareKey) {
    wx.request({
      url: this.shareApiUrl,

      method: 'POST',

      data: {
        shareKey: shareKey
      },

      header: {
        'Authorization': `Bearer ${JSON.parse(wx.getStorageSync('signInfo')).jwt.token}`
      },
    })
  }

  getShareEvaluateInfo(shareKey) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.shareApiUrl}/${shareKey}`,

        method: 'GET',

        success: res => {
          if (res.statusCode === 200) {
            resolve(res.data)
          }  else {
            reject(false)
          }
        },

        fail: () => reject(false)
      })
    })
  }
}
