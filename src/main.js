import Vue from 'vue'
import App from './App'

import TodoService from './service/todo.service'

import WeatherService from './service/weather.service'

import MockTodoService from './service/mock/todo.service'

import WordService from './service/word.service'

import UserService from './service/user.service'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.$todoService = new TodoService()

Vue.$weatherService = new WeatherService()

Vue.$wordService = new WordService()

Vue.$userService = new UserService()

Vue.todoService = new MockTodoService()



const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', 'pages/todos/main', '^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#77a7ff',
      navigationBarTitleText: '日程管理',
      navigationBarTextStyle: 'white'
    }
  }
}
