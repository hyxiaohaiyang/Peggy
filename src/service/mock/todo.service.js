class TodoService {
  mockTodayTodos = [
    {
      type: 1,
      content: '早上8点公司开会',
      rank: 1,
      createdAt: 1526806173662
    },
    {
      type: 2,
      content: '项目设计项目设计项目设计项目设计项目设计',
      rank: 1,
      createdAt: 1526806173662,
      deadline: 1527410924000
    },
    {
      type: 1,
      content: '晚上跑步两圈',
      rank: 0,
      createdAt: 1526806173662
    },
    {
      type: 1,
      content: '作业两面',
      rank: 0,
      createdAt: 1526806173662
    },
    {
      type: 1,
      content: '背30个单词',
      rank: 0,
      createdAt: 1526806173662
    }
  ]

  mock19todos = [
    {
      type: 1,
      content: '作业两面',
      rank: 0,
      createdAt: 1526806173662
    },
    {
      type: 1,
      content: '背30个单词',
      rank: 0,
      createdAt: 1526806173662
    }]


  getTodayTodos() {
    return Promise.resolve(this.mockTodayTodos)
  }

  getTodosFromDate() {
    return Promise.resolve(this.mock19todos)
  }
}

export default TodoService
