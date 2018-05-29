<template>
  <section class="container">
    <Calendar
      v-on:changeMonth="changeMonth"
      :markDate="markDate"
      v-if="markDate"
      v-on:choseDay="choseDayHandle"
    ></Calendar>

    <main >
      <TodoList v-bind:todos="nowTodos" v-if="nowTodos && !create" height="35" v-on:hasDelete="handleDelete"></TodoList>
      <TodoCreate v-if="create" v-bind:choseDay="choseDay" v-on:hasCreate="handleCreate"></TodoCreate>
    </main>

    <footer>
      <div @click="goToCreateTodos" v-if="!create">
        <img src="../../../static/img/zu.png" class="footer-img">
      </div>
    </footer>

  </section>
</template>

<script>
  import Calendar from '../../components/calendar'

  import TodoList from '../../components/todo_list'

  import TodoCreate from '../../components/todo_create'

  import store from '../../store'

  import Vue from 'vue'

  export default {
    components: {
      Calendar,
      TodoList,
      TodoCreate
    },

    computed: {
      nowTodos() {
        return store.getters['todo/sortNowTodos']('rank')
      },
      markDate() {
        return store.state.todo.markDate
      }
    },

    onLoad() {
      Vue.$todoService.getTodosDateSet()
    },
    data() {
      return {
        create: false,
        choseDay: new Date(),
        choseMonth: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
      }
    },
    methods: {
      changeMonth(date) {
        this.choseMonth = `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}`
        Vue.$todoService.getTodosDateSet(this.choseMonth)
      },
      choseDayHandle(date) {
        this.create = false
        this.choseDay = date
        Vue.$todoService.getTodosFromDate(date)
      },
      goToCreateTodos() {
        this.create = true
      },
      handleCreate(createdAt) {
        Vue.$todoService.getTodosDateSet(this.choseMonth)
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 2000
        })
        this.create = false
      },
      handleDelete() {
        Vue.$todoService.getTodosDateSet(this.choseMonth)
      }
    }
  }
</script>

<style scoped>
  main {
    width: 100%;
  }

  footer {
    width: 100%;
    margin: 2% 4% 2% 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    height: 8vh;
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
