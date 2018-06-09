import {IS_DEV} from "../utils"

export default class userSerivce {
  constructor() {
    this.loginApiUrl = (() => IS_DEV ? 'http://127.0.0.1:3000/api/login' : 'https://zhufengshop.com/api/login')();
    this.userInfoApiUrl = (() => IS_DEV ? 'http://127.0.0.1:3000/api/userinfo' : 'https://zhufengshop.com/api/userinfo')();
  }


  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        timeout: 5000,
        success: (res) => {

          console.log(res.code)
          wx.request({
            url: this.loginApiUrl,

            method: 'POST',

            data: {
              code: res.code
            },

            success: (res) => {
              if (res.statusCode === 200) {
                wx.setStorageSync('signInfo', JSON.stringify(res.data))
                resolve()
              } else {
                wx.showToast({
                  title: '登录失败，请检查您的网路连接',
                  icon: 'none',
                  duration: 2000
                })
                reject()
              }
            }

          })
        },
        fail: () => {
          console.log('Re Login!')
          req()
        }
      })
    })
  }

  postUserInfo(avatarUrl, nickName) {
    wx.request({
      url: this.userInfoApiUrl,

      method: 'POST',

      header: {
        'Authorization': `Bearer ${JSON.parse(wx.getStorageSync('signInfo')).jwt.token}`
      },

      data: {
        avatarUrl: avatarUrl,
        nickName: nickName
      }
    })
  }
}
