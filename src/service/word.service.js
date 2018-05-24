export default class WordService {
  constructor() {
    this.wordApiUrl = 'https://zhufengshop.com/api/home/word'
  }

  getWord() {
    return new Promise((resolve, reject) => {
      const _this = this
      function f() {
        wx.getStorage({
          key: 'signInfo',
          success: keyRes => {
            wx.request({
              url: _this.wordApiUrl,

              method: 'GET',

              header: {
                'Authorization': `Bearer ${JSON.parse(keyRes.data).jwt.token}`
              },

              success: res => {
                if (res.statusCode === 200) {
                  wx.setStorage({
                    key: 'wordInfo',
                    data: JSON.stringify(res.data)
                  })
                }
              }
            })
          },
          fail: () => {
            f()
          }
        })
      }
      f()
    })
  }
}
