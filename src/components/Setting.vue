<template>
  <div class="bed-setting">
    <div class="btn" v-on:click="save()">保存</div>
    <div class="btn" v-on:click="load()">加载</div>
  </div>
</template>

<script>
  import eventBus from '../EventBus'
  import GameCtrl from '../controllers/GameCtrl'

  export default {
    name: 'setting',
    data () {
      return {

      }
    },
    methods: {
      // 保存游戏
      save () {
        let gameCode = GameCtrl.saveGame()

        if (gameCode) {
          eventBus.$emit('notifyShowGameCode', { code: gameCode })
        }
      },
      // 加载游戏
      load () {
        eventBus.$emit('notifyLoadGameCode')
      }
    }
  }
</script>

<style scoped>
  .bed-setting {
    position: fixed;
    width: 60px;
    height: 60px;
    right: 0;
    bottom: 0;

    z-index: 800;
  }
  .btn {
    margin-bottom: 3px;
    height: 20px;
    line-height: 20px;

    color: white;
    background-color: rgb(130, 130, 130);
    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
</style>
