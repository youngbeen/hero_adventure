<template>
  <div class="bed-player-effect">
    <div class="left-hand"></div>
  </div>
</template>

<script>
  export default {
    name: 'player-effect',
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  .bed-player-effect {
    position: fixed;
    bottom: 0;
    left: 0;

    z-index: 400;
  }
  .left-hand {
    width: 300px;
    height: 300px;

    background: url('../assets/rogue_left.gif') no-repeat center center;
    background-size: contain;
  }
</style>
