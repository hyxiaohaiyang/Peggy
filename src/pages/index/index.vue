<template>
  <section class="container">
    <header>
      <div>每日一句</div>
      <div>{{word}}</div>
      <div>
        <i class="iconfont" v-bind:class="weather.weatherIconClass"></i>
        <span>{{weather.weathertext}}</span>
      </div>
    </header>

    <nav>
      <div @click="goToEvaluate">
        <img src="../../../static/img/bing.png" class="nav-img">
        历史日程评估
      </div>
      <div @click="goToTodos">
        <img src="../../../static/img/db.png" class="nav-img">
        历史日程汇总
      </div>
    </nav>

    <main>
      <section class="main-head">
        <span>今日日程</span>
        <time>{{today}}</time>
        <picker @change="bindSortChange" :range="sortBy">
          <view class="picker">
            <i class="iconfont icon-paixujiang"></i>
          </view>
        </picker>

      </section>

      <TodoList v-bind:todos="todos" v-if="todos" height="71" v-on:hasDelete="handleTodoChange" v-on:hasUpdate="handleTodoChange"></TodoList>

    </main>
  </section>


</template>

<script>
  import store from '../../store'

  import TodoList from '../../components/todo_list'

  import Vue from 'vue'

  export default {
    components: {
      TodoList
    },
    data() {
      return {
        today: `${new Date().getMonth() + 1}月${new Date().getDate()}日`,
        sortBy: [
          "依照重要程度排序",
          "依照类型排序",
          "依照完成状态排序"
        ],
        sortTodos: null,
        firstEnter: true
      }
    },
    computed: {
      todos: {
        get: function () {
          if (this.sortTodos) {
            return this.sortTodos
          } else {
            return store.getters['todo/sortNowTodos']('rank')
          }
        }
      },
      word() {
        return store.state.home.word
      },
      weather() {
        return store.state.home.weather
      }
    },
    onShow() {
      if (!this.firstEnter) {
        Vue.$todoService.getTodosFromDate(Date.now())
      }
      this.firstEnter = false
      this.sortTodos = null
    },
    methods: {
      goToTodos() {
        wx.navigateTo({
          url: "/pages/todos/main"
        })
      },
      goToEvaluate() {
        wx.navigateTo({
          url: '/pages/evaluate/main'
        })
      },
      bindSortChange(e) {
        switch (e.mp.detail.value) {
          case "0":
            this.sortTodos = store.getters['todo/sortNowTodos']('rank')
            return
          case "1":
            this.sortTodos = store.getters['todo/sortNowTodos']('type')
            return
          case "2":
            this.sortTodos = store.getters['todo/sortNowTodos']('is_done')
        }
      },
      handleTodoChange() {
        this.sortTodos = null
      }
    },
  }
</script>

<style scoped>
  header {
    height: 10vh;
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
    height: 10vh;
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
    height: 6vh;
    display: flex;
    align-items: center;
    border-bottom: #E3E3E3 2px dashed;
    justify-content: space-around;
  }

  .main-head span {
    border-left: 2.5px solid #222222;
    flex-basis: 25%;
    padding: 0 0 0 2%;
  }

  .main-head time {
    flex-basis: 33.3%;
  }

  .main-head img, .main-head picker {
    max-width: 25px;
    height: 3vh;
    flex-basis: 33.3%;
    line-height: 3vh;
  }

  .main-head i {
    font-size: 3.5vh;
    color: #222222;
  }
</style>
