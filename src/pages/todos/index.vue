<template>
  <section class="container">
    <Calendar
      v-on:changeMonth="changeMonth"
      :markDate="markDate"
      v-if="markDate"
      v-on:choseDay="choseDayHandle"
    ></Calendar>

    <main >
      <TodoList v-bind:todos="nowTodos" v-if="nowTodos && !create" height="400"></TodoList>
      <TodoCreate v-if="create" v-bind:choseDay="choseDay"></TodoCreate>
    </main>

    <footer>
      <div @click="goToCreateTodos" v-if="!create">
        <img src="../../../static/img/分组.png" class="footer-img">
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

    created() {
      Vue.$todoService.getTodosDateSet()
    },
    data() {
      return {
        create: false,
        choseDay: new Date()
      }
    },
    methods: {
      changeMonth(date) {
        Vue.$todoService.getTodosDateSet(`${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}`)
      },
      choseDayHandle(date) {
        this.create = false
        this.choseDay = date
        Vue.$todoService.getTodosFromDate(date)
      },
      goToCreateTodos() {
        this.create = true
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
