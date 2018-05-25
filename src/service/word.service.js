import store from '../store'
import {IS_DEV} from "../utils"


export default class WordService {
  constructor() {
    this.wordApiUrl = (() => IS_DEV ? 'http://127.0.0.1:3000/api/home/word' : 'https://zhufengshop.com/api/home/word')()
  }

  async getWord() {
    wx.getStorage({
      key: 'signInfo',
      success: keyRes => {
        wx.request({
          url: this.wordApiUrl,

          method: 'GET',

          header: {
            'Authorization': `Bearer ${JSON.parse(keyRes.data).jwt.token}`
          },

          success: res => {
            if (res.statusCode === 200) {
              store.commit('home/setWord', res.data.text)
            }
          }
        })
      },
      fail: () => {
        this.getWord()
      }
    })
  }
}
