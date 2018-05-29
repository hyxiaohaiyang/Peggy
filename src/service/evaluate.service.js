import {IS_DEV} from "../utils"

export default class EvaluateService {
  constructor() {
    this.evaludateApiUrl = (() => IS_DEV ? 'http://127.0.0.1:3000/api/evaluate' : 'https://zhufengshop.com/api/evaluate')()
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
}
