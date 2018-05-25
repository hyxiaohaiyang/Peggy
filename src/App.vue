<script>
  import Vue from 'vue'

  export default {
    beforeCreate() {
      function checkToken() {
        const token = wx.getStorageSync('signInfo');
        if (token) {
          const payload = JSON.parse(token);
          return Date.now() <= payload.jwt.expiresOn;
        } else {
          return false
        }
      }
      if (!checkToken()) {
        Vue.$userService.login()
          .then(() => {
            // 这里通过Promise.all 并行
            Promise.all([Vue.$wordService.getWord(), Vue.$weatherService.getWeather(), Vue.$todoService.getTodosFromDate(Date.now())])
          })
      } else {
        Promise.all([Vue.$weatherService.getWeather(),Vue.$wordService.getWord(), Vue.$todoService.getTodosFromDate(Date.now())])
      }

    },
    methods: {
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
