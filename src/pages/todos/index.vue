<template>
  <section class="container">
    <Calendar

    ></Calendar>

    <main>
      <TodoList v-bind:todos="nowTodos" v-if="nowTodos" height="500"></TodoList>
    </main>

    <footer>
      <div @click="goToTodos">
        <img src="../../../static/img/分组.png" class="footer-img">
      </div>
    </footer>

  </section>
</template>

<script>
  import Calendar from '../../components/calendar'

  import TodoList from '../../components/todo_list'

  import store from '../../store'

  export default {
    components: {
      Calendar,
      TodoList
    },

    computed: {
      nowTodos() {
        return store.getters['todo/sortNowTodos']('rank')
      }
    },

    created() {
    },
    data() {
      return {
      }
    },
    methods: {
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
