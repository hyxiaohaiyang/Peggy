const state = {
  allTodos: [],
  nowTodos: []
}

const getters = {
  sortNowTodos: state => sortBy => {
    let tmpArray = [...state.nowTodos]
    switch (sortBy) {
      case 'rank':
        tmpArray
          .sort((a, b) => a.rank - b.rank)
          .forEach(v => {
            if (v.type === 2) {
              // MPVUE不支持html绑定methods，所以将生成描述性截止日期信息逻辑放置于此
              const nowDate = new Date()
              const endDate = new Date(v.endAt)
              v.verboseEndAt = `
              ${nowDate.getMonth() + 1}月${nowDate.getDate()}号--${endDate.getMonth() + 1}月${endDate.getDate()}日
                    剩余${new Date(new Date(v.endAt) - new Date()).getDate()}天
              `
            }
          })
        return tmpArray
    }
  }
}

const mutations = {
  setNowTodos(state, {date, todos}) {
    state.nowTodos = [...todos]
    this.dispatch('todo/updateAllTodos', {
      date: date,
      todos: state.nowTodos
    })
  },
  deleteNowTodo(state, {date, todo}) {
    state.nowTodos.splice(state.nowTodos.findIndex(v => v._id === todo._id), 1)
    this.dispatch('todo/updateAllTodos', {
      date: date,
      todos: state.nowTodos
    })
  },
  updateAllTodos(state, {date, todos}) {
    const index = state.allTodos.findIndex(v => v.date === date)
    if (index === -1) {
      state.allTodos.push({
        date: date,
        todos: todos
      })
    } else {
      state.allTodos[index].todos = [...todos]
    }
  }
}

const actions = {
  async updateAllTodos({state, commit}, {date, todos}) {
    commit('updateAllTodos', {date: date, todos: todos})
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
