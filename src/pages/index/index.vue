<template>
  <section class="container">
    <header>
      <div>每日一句</div>
      <div>失败乃成功之母</div>
      <div>
        <i class="iconfont icon-dayu"></i>
        <span>大雨</span>
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

      <section class="main-todos">
        <div class="main-todo" v-for="todo in todos" :key="Date.now()" @touchstart="touchS" @touchmove="touchM" @touchend="touchE" v-bind:data-todo="todo" v-bind:animation="goTop">
          <div class="main-todo-title">
            <i class="circle" v-bind:class="{'circle-yellow': todo.rank === 1}"></i>
            <span class="main-todo-str" v-bind:class="{'main-todo-str-yellow': todo.rank === 1}">{{todo.content}}</span>
          </div>
          <div class="main-todo-footer">
            <span class="main-todo-type" v-if="todo.type === 1">单日</span> <span class="main-todo-type" v-else>多日</span>
            <span class="main-todo-typestr" v-if="todo.type === 2">5月20日--5月28日&nbsp;&nbsp;&nbsp;剩余7天</span>
          </div>
        </div>
      </section>
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

  export default {
    data() {
      return {
        today: `${new Date().getMonth() + 1}月${new Date().getDate()}日`,
        todos: null,
        startX: null,
        disX: null,
        goTop: null
      }
    },
    created() {
      Vue.todoService.getTodayTodos()
        .then(data => this.setTodayTodos(data))
    },
    methods: {
      setTodayTodos(todos) {
        this.todos = todos
      },
      touchS(e) {
        if(e.touches.length === 1){
          this.startX = e.touches[0].clientX
        }
      },
      touchM(e) {
        this.disX = this.startX - e.touches[0].clientX;
      },
      touchE(e) {
        if (this.disX > 80) {
          wx.showModal({
            title: '确认删除？',
            content: '是否删除该Todo',
            success: (res) => {
              if (res.confirm) {
                this.goTop = wx.createAnimation({
                  duration: 500,
                  timingFunction: "ease",
                  delay: 0
                });
                this.todos.splice(this.todos.findIndex(v => v.content === e.currentTarget.dataset.todo.content), 1);
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                });
                this.goTop.translateY(-40).step().translateY(0).step()
                this.goTop = this.goTop.export();
              }
            }
          })
        }
        this.startX = 0;
        this.disX = 0;
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
    margin: 0 35% 0 0;
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

  .main-todos {
    padding: 0 0 0 5%;
    overflow-y: auto;
    height: 350px;
    border-bottom: 2px dashed #E3E3E3;
  }

  .main-todos .main-todo {
    height: 70px;
    border-bottom: 2px solid #E3E3E3;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }


  .main-todos .main-todo:last-child {
    border-bottom: none;
  }

  .main-todos .main-todo .main-todo-title {
    display: flex;
    width: 100%;
    overflow-x: auto;
    flex-direction: row;
    align-items: center;
  }

  .main-todos .main-todo .main-todo-title .circle {
    max-width: 11px;
    height: 11px;
    flex-basis: 10%;
    background-color: #ffffff;
    border: 1px #222222 solid;
    border-radius: 100px 100px 100px 100px;
  }

  .main-todos .main-todo .main-todo-title .circle-yellow {
    border: 1px #f7b451 solid;
  }

  .main-todos .main-todo .main-todo-title .main-todo-str {
    margin-left: 3%;
    flex-basis: 90%;
  }

  .main-todos .main-todo .main-todo-title .main-todo-str-yellow {
    color: #f7b451;
  }

  .main-todos .main-todo .main-todo-footer {
    display: flex;
  }

  .main-todos .main-todo .main-todo-footer .main-todo-type {
    font-size: 10px;
    border: 1px solid #979797;
    border-radius: 3px;
    text-align: center;
    width: 8%;
    margin: 0 0 0 7%;
  }

  .main-todos .main-todo .main-todo-footer .main-todo-typestr {
    color: #9E9E9E;
    font-size: 12px;
    margin-left: 7%;
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
