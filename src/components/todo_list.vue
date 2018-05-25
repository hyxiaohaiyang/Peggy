<template>
  <section class="main-todos" v-bind:style="{height: height + 'vh'}">
    <div class="main-todo" v-for="todo in todos" :key="Date.now()" @touchstart="touchS" @touchmove="touchM" @touchend="touchE" v-bind:data-todo="todo">
      <div class="main-todo-title">
        <i class="circle" v-bind:class="{'circle-yellow': todo.rank === 1, 'circle-red': todo.rank === 2}"></i>
        <span class="main-todo-str" v-bind:class="{'main-todo-str-yellow': todo.rank === 1, 'main-todo-str-red': todo.rank === 2, 'main-todo-str-done': todo.is_done === true}" >{{todo.content}}</span>
      </div>
      <div class="main-todo-footer">
        <span class="main-todo-type" v-if="todo.type === 1">单日</span> <span class="main-todo-type" v-else>多日</span>
        <span class="main-todo-typestr" v-if="todo.type === 2">{{ todo.verboseEndAt }}</span>

      </div>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'

	export default {
		props: {
		  todos: [],
      height: 700
    },
    data() {
		  return {
        startX: 0,
        disX: 0,
        goTop: null,
      }
    },
    methods: {
      touchS(e) {
        if(e.touches.length === 1){
          this.startX = e.touches[0].clientX
        }
      },
      touchM(e) {
        this.disX = this.startX - e.touches[0].clientX;
      },
      touchE(e) {
        if (this.disX > 80) {
          wx.showModal({
            title: '确认删除？',
            content: '是否删除该事项',
            success: (res) => {
              if (res.confirm) {
                Vue.$todoService.deleteTodo(e.currentTarget.dataset.todo)
                this.$emit('hasDelete')
              }
            }
          })
        } else if (this.disX < -80) {
          if (e.currentTarget.dataset.todo.is_done) {
            wx.showModal({
              title: '取消已完成？',
              content: '是否将该事项设置为未完成',
              success: (res) => {
                if (res.confirm) {
                  const tmp = e.currentTarget.dataset.todo
                  tmp.is_done = false
                  Vue.$todoService.updateTodo(tmp)
                  this.$emit('hasUpdate')
                }
              }
            })
          } else {
            wx.showModal({
              title: '已完成？',
              content: '是否将该事项设置为已完成',
              success: (res) => {
                if (res.confirm) {
                  const tmp = e.currentTarget.dataset.todo
                  tmp.is_done = true
                  Vue.$todoService.updateTodo(tmp)
                  this.$emit('hasUpdate')
                }
              }
            })
          }
        }
        this.startX = 0;
        this.disX = 0;
      },
    }
	}
</script>

<style scoped>

  .main-todos {
    padding: 0 0 0 5%;
    overflow-y: auto;
    height: 350px;
    border-bottom: 2px dashed #E3E3E3;
  }

  .main-todos .main-todo {
    height: 70px;
    border-bottom: 2px solid #E3E3E3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .main-todos .main-todo:last-child {
    border-bottom: none;
  }

  .main-todos .main-todo .main-todo-title {
    display: flex;
    width: 100%;
    overflow-x: auto;
    flex-direction: row;
    align-items: center;
    justify-content:space-around;

  }

  .main-todos .main-todo .main-todo-title .circle {
    max-width: 11px;
    height: 11px;
    flex-basis: 10%;
    background-color: #ffffff;
    border: 1px #222222 solid;
    border-radius: 100px 100px 100px 100px;
  }

  .main-todos .main-todo .main-todo-title .circle-yellow {
    border: 1px #f7b451 solid;
  }

  .main-todos .main-todo .main-todo-title .circle-red {
    border: 1px #ff1800 solid;
  }

  .main-todos .main-todo .main-todo-title .main-todo-str-done {
    text-decoration: line-through;
    color: #c8c7c8;
  }

  .main-todos .main-todo .main-todo-title .main-todo-str {
    margin-left: 3%;
    flex-basis: 90%;
  }

  .main-todos .main-todo .main-todo-title .main-todo-str-yellow {
    color: #f7b451;
  }

  .main-todos .main-todo .main-todo-title .main-todo-str-red {
    color: #ff1800;
  }

  .main-todos .main-todo .main-todo-footer {
    display: flex;
  }

  .main-todos .main-todo .main-todo-footer .main-todo-type {
    font-size: 10px;
    border: 1px solid #979797;
    border-radius: 3px;
    text-align: center;
    width: 8%;
    margin: 0 0 0 7%;
  }

  .main-todos .main-todo .main-todo-footer .main-todo-typestr {
    color: #9E9E9E;
    font-size: 12px;
    margin-left: 7%;
  }
</style>
