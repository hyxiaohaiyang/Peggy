import store from '../store'

export default class TodoService {
  constructor() {
    this.todoApiUrl = 'http://127.0.0.1:3000/api/todo'
  }

  timeStampParse(timeStamp) {
    const date = new Date(timeStamp);

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  getTodosFromDate(timeStamp) {
    const dateStr = this.timeStampParse(timeStamp);

    wx.getStorage({
      key: 'signInfo',
      success: res => {
        wx.request({
          url: `${this.todoApiUrl}/${dateStr}`,

          method: 'GET',

          header: {
            'Authorization': `Bearer ${JSON.parse(res.data).jwt.token}`
          },

          success: res => {
            if (res.statusCode === 200) {
              store.commit('todo/setNowTodos', {
                date: dateStr,
                todos: res.data
              })
            }
          }
        })
      },
      fail: () => {
        this.getTodosFromDate(timeStamp)
      }
    })
  }

  getTodosDateSet(year_month = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`) {
    wx.getStorage({
      key: 'signInfo',
      success: res => {
        wx.request({
          url: `${this.todoApiUrl}/date/${year_month}`,

          method: 'GET',

          header: {
            'Authorization': `Bearer ${JSON.parse(res.data).jwt.token}`
          },

          success: (res) => {
            if (res.statusCode === 200) {
              store.commit('todo/setMarkDate', res.data)
            }
          }
        })
      },
      fail: () => {
        this.getTodosDateSet(year_month)
      }
    })
  }

  deleteTodo(todo) {
    const datestr = this.timeStampParse(todo.createdAt)

    store.commit('todo/deleteNowTodo', {
      date: datestr,
      todo: todo
    })

    wx.request({
      url: `${this.todoApiUrl}/${todo._id}`,

      method: 'DELETE',

      header: {
        'Authorization': `Bearer ${JSON.parse(wx.getStorageSync('signInfo')).jwt.token}`
      }
    })
  }
}
