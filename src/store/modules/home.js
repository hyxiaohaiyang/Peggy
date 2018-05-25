const state = {
  word: '',
  weather: {
    weathertext: '',
    weatherIconClass: ''
  }
}

const getters = {

}

const mutations = {
  setWord(state, word) {
    state.word = word
  },
  setWeather(state, {weathertext, weatherIconClass}) {
    state.weather.weathertext = weathertext
    state.weather.weatherIconClass = weatherIconClass
  }
}

const actions = {

}


export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}

