<template>
  <div class="bed-enemy-info">
    <div class="box-hp">
      <div class="bar-hp" v-bind:style="hpStyle"></div>
      <div class="label-hp">
        {{ enemy.list[enemy.currentIdx].hp }}/{{ enemy.list[enemy.currentIdx].maxHp }}[体力]
      </div>
    </div>
  </div>
</template>

<script>
  import Enemy from '../models/Enemy'

  export default {
    name: 'enemy-info',
    data () {
      return {
        enemy: Enemy
      }
    },
    computed: {
      // hp的自动样式
      hpStyle () {
        return {
          width: this.hpPercent
        }
      },
      // hp百分比
      hpPercent () {
        return this.enemy.list[this.enemy.currentIdx].hp / this.enemy.list[this.enemy.currentIdx].maxHp * 100 + '%'
      }
    }
  }
</script>

<style scoped>
  .bed-enemy-info {

  }
  .box-hp {
    position: relative;
    height: 20px;
    /*margin-bottom: 3px;*/

    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
  }
  .bar-hp {
    height: 100%;
    background-color: rgb(99, 99, 99);

    transition: width .6s;
  }
  .label-hp {
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-right: 6px;

    color: white;
    text-shadow: 1px 1px 1px rgb(50, 50, 50);
    text-align: right;
  }
</style>
