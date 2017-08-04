<template>
  <div class="bed-debug">
    <button v-on:click="killAll()">KILL ALL</button>
    <button v-on:click="setGold(1)">SET GOLD 1</button>
  </div>
</template>

<script>
  import DebugCtrl from '../controllers/DebugCtrl'

  export default {
    name: 'debug',
    data () {
      return {

      }
    },
    methods: {
      killAll () {
        DebugCtrl.killAllEnemies()
      },
      setGold (gold) {
        DebugCtrl.setGold(gold)
      }
    }
  }
</script>

<style scoped>
  .bed-debug {

  }
</style>
