import Vue from 'vue'
import Vuex from 'vuex'

import Todo from './modules/Todo'

import Home from './modules/Home'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todo: Todo,
    home: Home
  }
})
