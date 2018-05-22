<template>
  <section class="todo-create">
    <section class="todo-create-tab">
      <button v-bind:class="{'activate': choseType === 0}" @click="choseType = 0">当日</button>
      <button v-bind:class="{'activate': choseType === 1}" @click="choseType = 1">多日</button>
    </section>

    <section class="todo-create-input">
      <img src="../../static/img/铅笔.png"/>
      <div>
        <input v-bind:placeholder="'这里填写'+date+'日的安排'" auto-focus/>
      </div>
    </section>

    <section class="todo-create-choicerank">
      <div class="choice"><i></i>普通</div>
      <div class="str-yellow"><i class="circle-yellow"></i>一般</div>
      <div class="str-red"><i class="circle-red"></i>重要</div>
    </section>

    <button class="todo-create-createBtn">确定添加</button>
  </section>
</template>

<script>
  export default {
    props: {
      choseDay: null
    },
    data() {
      return {
        date: null,
        choseType: 0
      }
    },
    created() {
      this.parseChoseDay()
    },
    methods: {
      parseChoseDay() {
        try {
          this.date = this.choseDay.getDate()
        } catch (e) {
          this.date = new Date(this.choseDay).getDate()
        }
      },
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
    justify-content: space-evenly;
  }

  .todo-create .todo-create-input img {
    max-width: 31px;
    height: 31px;
    flex-basis: 30%;
  }

  .todo-create .todo-create-input div {
    flex-basis: 70%;
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
    justify-content: space-evenly;
  }

  .todo-create .todo-create-choicerank .choice {
    border: 1px solid #222222;
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
    margin-top: 35px;
    width: 75%;
    height: 41px;
    background: #85D8FF;
    line-height: 41px;
    color: #ffffff;
  }

</style>
