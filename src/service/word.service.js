export default class WordService {
  constructor() {
    this.wordApiUrl = 'http://127.0.0.1:3000/api/home/word'
  }

  getWord() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://v1.hitokoto.cn/?c=d&encode=text',

        method: 'GET',

        header: {
          'Authorization': `Bearer ${JSON.parse(wx.getStorageSync('signInfo')).jwt.token}`
        },

        success: res => {
          if (res.statusCode === 200) {
            resolve(res.data)
          }
        }
      })
    })
  }
}
