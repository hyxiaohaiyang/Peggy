<template>
  <section class="todo-create ">
    <section class="todo-create-tab">
      <button v-bind:class="{'activate': choseType === 1}" @click="choseType = 1">当日</button>
      <button v-bind:class="{'activate': choseType === 2}" @click="choseType = 2">多日</button>
    </section>

    <section class="todo-create-input animated slideInLeft" v-if="choseType === 1">
      <img src="../../static/img/pencil.png"/>
      <div>
        <input v-bind:placeholder="'这里填写'+date+'日的安排'" v-model="content" :adjust-position="true" :cursor-spacing="120" />
      </div>
    </section>

    <section class="todo-create-type2-input animated slideInRight" v-if="choseType === 2">
      <div class="type2-date">
        <img src="../../static/img/db.png">
        <span class="type2-date-starttime">{{startDay}}</span>
        <span>-------</span>
        <picker mode="date" :value="endAt" :start="pickerStart" :end="pickerEnd" @change="bindDateChange">
          <view class="picker">
            <span v-if="!endAt">请选择截止日期</span><span v-else>{{verboseEndAt}}</span>
          </view>
        </picker>
      </div>
      <div class="todo-create-input">
        <img src="../../static/img/pencil.png" style="flex-basis: 20%"/>
        <div style="flex-basis: 80%">
          <input v-bind:placeholder="'这里填写'+date+'日的安排'" v-model="content" :adjust-position="true" :cursor-spacing="120" />
        </div>
      </div>
    </section>

    <section class="todo-create-choicerank">
      <div @click="choseRank = 0" v-bind:class="{'choice': choseRank === 0}"><i></i>普通</div>
      <div class="str-yellow" @click="choseRank = 1" v-bind:class="{'choice': choseRank === 1}"><i class="circle-yellow"></i>一般</div>
      <div class="str-red" @click="choseRank = 2" v-bind:class="{'choice': choseRank === 2}"><i class="circle-red"></i>重要</div>
    </section>

    <button class="todo-create-createBtn" @click="submit">确定添加</button>
  </section>
</template>

<script>


  import {formatTime} from "../utils"

  import Vue from 'vue'

  export default {
    props: {
      choseDay: null
    },
    computed: {
      verboseEndAt() {
        return this.toVerboseTimeString(new Date(this.endAt))
      }
    },
    data() {
      return {
        date: null,
        choseType: 1,
        choseRank: 0,
        content: '',
        endAt: null,
        startDay: null,
        pickerStart: null,
        pickerEnd: null
      }
    },
    created() {
      this.parseChoseDay()
    },
    methods: {
      toVerboseTimeString(date) {
        // 将时间对象转换成可读字符串
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      },

      parseChoseDay() {
        // choseDay是日历组件选择是传递过来的数据，一般为2018/5/22如此的数据，当没选择时传进来的是当天的的时间对象
        // 此函数提取出时间对象的日期
        try {
          this.startDay = this.toVerboseTimeString(this.choseDay)
          this.pickerStart = formatTime(this.choseDay, "yyyy-MM-dd")
          this.date = this.choseDay.getDate() // date是用来在输入框中提示用的，显示选择的日期
        } catch (e) {
          const d = new Date(this.choseDay)
          this.pickerStart = formatTime(d, "yyyy-MM-dd")
          this.startDay = this.toVerboseTimeString(d)
          this.date = d.getDate()
        } finally {
          this.pickerEnd = formatTime(new Date(new Date(this.pickerStart).getTime() + 2592000000), "yyyy-MM-dd")
        }


      },
      bindDateChange(e) {
        this.endAt = e.mp.detail.value
      },
      submit() {
        Vue.$todoService.createTodo(this.choseDay, this.choseType, this.choseRank, this.content, this.endAt)
          .then(() => {
            this.$emit('hasCreate', this.choseDay)
          })
          .catch((g) => {
            wx.showToast({
              title: '创建失败，请检查您的网络连接',
              icon: 'none',
              duration: 2000
            })
          })
      }
    }
  }
</script>

<style scoped>
  .todo-create {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
  }

  .todo-create .todo-create-tab {
    display: flex;
    flex-direction: row;
    border: 1px solid #85D8FF;
    border-radius: 3px;
  }

  .todo-create .todo-create-tab button {
    color: #85D8FF;
    font-size: 14px;
    cursor: pointer;
    background: #fff;
    width: 63.5px;
    height: 29px;
    text-align: center;
    line-height: 29px;
    border-radius: 0 !important;
  }

  .todo-create .todo-create-tab .activate {
    color: #fff;
    background: #85D8FF;
    width: 63.5px;
    height: 29px;
    text-align: center;
    line-height: 29px;
  }

  .todo-create .todo-create-input {
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .todo-create .todo-create-input img {
    max-width: 31px;
    height: 31px;
    flex-basis: 30%;
  }

  .todo-create .todo-create-input div {
    flex-basis: 70%;
    border-bottom: 2px solid #8d8d8d;
    color: #A1A1A1;
  }

  .todo-create .todo-create-type2-input {
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .todo-create .todo-create-type2-input .type2-date {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    font-size: 14px;
    color: #A1A1A1;
  }

  .todo-create .todo-create-type2-input .type2-date img {
    max-width: 28px;
    height: 28px;
    flex-basis: 30%;
  }

  .todo-create .todo-create-type2-input .type2-date .type2-date-starttime,
  .todo-create .todo-create-type2-input .type2-date picker {
    border-bottom: 2px solid #8d8d8d;
  }


  .todo-create .todo-create-choicerank {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
  }

  .todo-create .todo-create-choicerank div {
    height: 27px;
    width: 68px;
    line-height: 27px;
    font-size: 14px;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .todo-create .todo-create-choicerank .choice {
    border: 1px solid #222222;
    border-radius: 3px;
  }

  .todo-create .todo-create-choicerank .choice[class*=str-yellow] {
    border: 1px solid #f7b451;
    border-radius: 3px;
  }

  .todo-create .todo-create-choicerank .choice[class*=str-red] {
    border: 1px solid #ff1800;
    border-radius: 3px;
  }


  .todo-create .todo-create-choicerank .str-yellow {
    color: #f7b451;
  }

  .todo-create .todo-create-choicerank .str-red {
    color: #ff1800;
  }

  .todo-create .todo-create-choicerank div i {
    max-width: 15px;
    height: 15px;
    flex-basis: 20%;
    background-color: #ffffff;
    border: 1px #222222 solid;
    border-radius: 50%
  }

  .todo-create .todo-create-choicerank .circle-yellow {
    border: 1px #f7b451 solid !important;
  }

  .todo-create .todo-create-choicerank .circle-red {
    border: 1px #ff1800 solid !important;
  }

  .todo-create .todo-create-createBtn {
    margin-top: 45px;
    width: 75%;
    height: 41px;
    background: #85D8FF;
    line-height: 41px;
    color: #ffffff;
  }

</style>
