<script>
  import Vue from 'vue'

  export default {
    created() {
      if (!this.checkToken()) {
        this.login()
      }

      Vue.$weatherService.getWeather()

    },
    methods: {
      login() {
        wx.login({
          timeout: 5000,
          success: (res) => {
            wx.request({
              url: 'http://127.0.0.1:3000/api/login',

              method: 'POST',

              data: {
                code: res.code
              },

              success: (res) => {
                if (res.statusCode === 200) {
                  wx.setStorageSync('signInfo', JSON.stringify(res.data))
                }
              }

            })
          },
          fail: () => {
            console.log('Re Login!')
            this.login()
          }
        })
      },
      checkToken() {
        const token = wx.getStorageSync('signInfo');
        if (token) {
          const payload = JSON.parse(token);
          return Date.now() <= payload.jwt.expiresOn;
        } else {
          return false
        }
      }
    }
  }
</script>

<style>
  @import url(../static/font/iconfont.css);
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200 rpx 0;
    box-sizing: border-box;

    font-size: 14px;
    color: #222222;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
    background-color: #ffffff;

  }
</style>
