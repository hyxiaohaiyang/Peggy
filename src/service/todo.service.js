import store from '../store'

export default class TodoService {
  constructor() {
    this.todoApiUrl = 'https://zhufengshop.com/api/todo'
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

  createTodo(createdAt, type, rank, content, endAt) {
    createdAt = new Date(createdAt)
    if (type === 2) endAt = new Date(endAt)

    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.todoApiUrl}`,

        method: 'POST',

        dataType: 'json',

        data: {
          type: type,
          createdAt: createdAt,
          rank: rank,
          content: content,
          endAt: endAt
        },

        header: {
          'Authorization': `Bearer ${JSON.parse(wx.getStorageSync('signInfo')).jwt.token}`
        },

        success: res => {
          if (res.statusCode === 200) {
            store.commit('todo/addNowTodo', res.data)
            resolve(true)
          } else {
            reject(false)
          }
        },

        fail: () => {
          reject(false)
        }
      })
    })

  }

  updateTodo(todo) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.todoApiUrl}/${todo._id}`,

        method: 'PUT',

        dataType: 'json',

        data: todo,

        header: {
          'Authorization': `Bearer ${JSON.parse(wx.getStorageSync('signInfo')).jwt.token}`
        },

        success: res => {
          if (res.statusCode === 200) {
            store.commit('todo/updateNowTodo', res.data)
            resolve(true)
          } else {
            reject(false)
          }
        },

        fail: () => {
          reject(false)
        }


      })
    })
  }

  deleteTodo(todo) {
    console.log(todo)
    const datestr = this.timeStampParse(todo.createdAt)

    store.commit('todo/deleteNowTodo', {
      date: datestr,
      todo: todo
    })

    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
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
