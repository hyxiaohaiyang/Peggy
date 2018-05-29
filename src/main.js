import Vue from 'vue'
import App from './App'

import TodoService from './service/todo.service'

import WeatherService from './service/weather.service'

import WordService from './service/word.service'

import UserService from './service/user.service'
import EvaluateService from "./service/evaluate.service"

Vue.config.productionTip = false
App.mpType = 'app'

Vue.$todoService = new TodoService()

Vue.$weatherService = new WeatherService()

Vue.$wordService = new WordService()

Vue.$userService = new UserService()

Vue.$evaluateService = new EvaluateService()



const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: ['pages/logs/main', 'pages/todos/main', '^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#77a7ff',
      navigationBarTitleText: 'PEGGY',
      navigationBarTextStyle: 'white'
    }
  }
}
