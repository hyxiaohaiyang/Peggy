<template>
  <section class="container">
    <header>
      <div>每日一句</div>
      <div>{{word}}</div>
      <div>
        <i class="iconfont" v-bind:class="weatherIconClass"></i>
        <span>{{weathertext}}</span>
      </div>
    </header>

    <nav>
      <div>
        <img src="../../../static/img/饼图.png" class="nav-img">
        历史日程评估
      </div>
      <div>
        <img src="../../../static/img/PK邀请.png" class="nav-img">
        好友日程PK
      </div>
    </nav>

    <main>
      <section class="main-head">
        <span>今日日程</span>
        <time>{{today}}</time>
        <img src="../../../static/img/排序.png"/>
      </section>

     <TodoList v-bind:todos="todos" v-if="todos" height="700"></TodoList>

    </main>

    <footer>
      <div @click="goToTodos">
        <img src="../../../static/img/日期.png" class="footer-img">
      </div>
    </footer>
  </section>


</template>

<script>
  import Vue from 'vue'

  import store from '../../store'

  import TodoList from '../../components/todo_list'

  export default {
    components: {
      TodoList
    },
    data() {
      return {
        today: `${new Date().getMonth() + 1}月${new Date().getDate()}日`,
        weathertext: null,
        weatherIconClass: null,
        word: null
      }
    },
    computed: {
      todos() {
        return store.getters['todo/sortNowTodos']('rank')
      }
    },
    created() {
      Vue.$todoService.getTodosFromDate(Date.now())
      this.parseWeatherData()
      Vue.$wordService.getWord()
        .then(data => {
          if (data.length > 40) {
            this.word = '失败乃成功之母'
          } else {
            this.word = data
          }

        })
    },
    methods: {
      parseWeatherData() {
        const weatherInfo = JSON.parse(wx.getStorageSync('weatherInfo'))
        const options = Vue.$weatherService.weatherToIconOptions
        this.weathertext = options[weatherInfo.code].text
        this.weatherIconClass = options[weatherInfo.code].class
      },
      goToTodos() {
        wx.navigateTo({
          url: "/pages/todos/main"
        })
      }
    },
  }
</script>

<style scoped>
  header {
    height: 60px;
    border-bottom: #f4f3f4 6px solid;
    width: 100%;
    display: flex;
    align-items: center;
  }

  header :first-child {
    color: #7ad3ff;
    margin: 0 5% 0 5%;
    flex: 0 0 12%;
    font-size: 16px;
  }

  header :nth-child(2) {

    flex-basis: 60%;
  }

  header :last-child {
    display: flex;
  }

  header :last-child i {
    font-size: 35px;
    color: #626365;

  }

  header :last-child span {
    color: #b4b4b4;

  }

  nav {
    height: 60px;
    border-bottom: #f4f3f4 6px solid;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    line-height: 60px;
  }

  nav div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  nav .nav-img {
    width: 24px;
    height: 24px;
    margin: 0 10px 0 0;
  }

  main {
    width: 100%;
  }


  .main-head {
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: #E3E3E3 2px dashed;
    justify-content: space-around;
  }

  .main-head span {
    border-left: 2px solid #222222;
    flex-basis: 25%;
    padding: 0 0 0 2%;
  }

  .main-head time {
    flex-basis: 33.3%;
  }

  .main-head img {
    max-width: 25px;
    height: 18px;
    flex-basis: 33.3%;
  }

  footer {
    width: 100%;
    margin: 2% 4% 0 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

  }

  footer div {
    cursor: pointer;
    background: #85D8FF;
    box-shadow: 0 3px 3px 0 rgba(93,198,248,0.42);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  footer div .footer-img {
    width: 29px;
    height: 32px;
  }
</style>
