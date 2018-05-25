import {formatTime} from "../../utils"

const state = {
  nowTodos: [],
  markDate: []
}

const getters = {
  sortNowTodos: state => sortBy => {
    let tmpArray = [...state.nowTodos]
    switch (sortBy) {
      case 'rank':
        tmpArray
          .sort((a, b) => b.rank - a.rank)
        break
      case 'type':
        tmpArray
          .sort((a, b) => a.type - b.type)
        break
      case 'is_done':
        // TODO

    }
    tmpArray.forEach(v => {
      if (v.type === 2) {
        // MPVUE不支持html绑定methods，所以将生成描述性截止日期信息逻辑放置于此
        const createdDate = new Date(v.createdAt)
        const nowDate = new Date()
        const endDate = new Date(v.endAt)
        v.verboseEndAt = `
              ${createdDate.getMonth() + 1}月${createdDate.getDate()}号--${endDate.getMonth() + 1}月${endDate.getDate()}日
                    剩余${parseInt((endDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)) + 1}天
              `
      }
    })
    return tmpArray
  }
}

const mutations = {
  setNowTodos(state, {date, todos}) {
    state.nowTodos = [...todos]
  },
  setMarkDate(state, markDate) {
    state.markDate = [...markDate]
  },
  addMarkDate(state, markDate) {
    state.markDate = [...new Set([...state.markDate, formatTime(new Date(markDate), 'yyyy/M/d')])]
  },
  deleteMarkDate(state, markDate) {
    state.markDate.splice(state.markDate.findIndex(v => v === formatTime(new Date(markDate), 'yyyy/M/d')), 1)
  },
  addNowTodo(state, todo) {
    state.nowTodos = [...state.nowTodos, todo]
  },
  deleteNowTodo(state, {date, todo}) {
    state.nowTodos.splice(state.nowTodos.findIndex(v => v._id === todo._id), 1)
  },
  updateNowTodo(state, todo) {
    state.nowTodos.splice(state.nowTodos.findIndex(v => v._id === todo._id), 1, todo)
  },
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
