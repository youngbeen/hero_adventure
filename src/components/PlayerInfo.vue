<template>
  <div class="bed-player-info">
    <div class="box-avatar" v-on:click="showCharacter()">
      <!-- TODO 头像处理 -->
    </div>
    <div class="box-hp">
      <div class="bar-hp" v-bind:style="hpStyle"></div>
      <div class="label-hp">
        {{ player.hp }}/{{ player.maxHp }}[体力]
      </div>
    </div>
    <div class="box-eg">
      <div class="bar-eg" v-bind:style="egStyle"></div>
      <div class="label-eg">
        {{ player.eg }}/{{ player.maxEg }}[能量]
      </div>
    </div>
    <div class="box-sp">
      <div class="bar-sp" v-bind:style="spStyle"></div>
      <div class="label-sp">
        {{ player.sp }}/{{ player.maxSp }}[奥义]
      </div>
    </div>
    <div class="box-bag" v-on:click="openBag()">
      <!-- TODO 包裹图 -->
    </div>
  </div>
</template>

<script>
  import eventBus from '../EventBus'
  import Player from '../models/Player'

  export default {
    name: 'player-info',
    data () {
      return {
        player: Player
      }
    },
    computed: {
      // hp的自动样式
      hpStyle () {
        return {
          width: this.hpPercent
        }
      },
      // eg的自动样式
      egStyle () {
        return {
          width: this.egPercent
        }
      },
      // sp的自动样式
      spStyle () {
        let style = {
          width: this.spPercent
        }

        return style
      },
      // hp百分比
      hpPercent () {
        return this.player.hp / this.player.maxHp * 100 + '%'
      },
      // eg百分比
      egPercent () {
        return this.player.eg / this.player.maxEg * 100 + '%'
      },
      // sp百分比
      spPercent () {
        return this.player.sp / this.player.maxSp * 100 + '%'
      }
    },
    methods: {
      showCharacter () {
        eventBus.$emit('notifyShowCharacter', {
          mode: 'show'
        })
      },
      openBag () {
        // 展示包裹物品界面，可使用物品
        eventBus.$emit('notifyShowBag')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bed-player-info {
    position: fixed;
    width: 60%;
    left: 20%;
    bottom: 0;
    padding: 6px;

    border: 6px solid rgb(50, 50, 50);
    border-radius: 12px;
    background-color: white;
    z-index: 500;
  }
  .box-avatar {
    position: absolute;
    width: 100px;
    height: 100px;
    left: -108px;
    bottom: -6px;

    border: 6px solid rgb(50, 50, 50);
    border-radius: 53px;
    background-color: blue;
    z-index: 501;
  }
  .box-bag {
    position: absolute;
    width: 100px;
    height: 100px;
    right: -108px;
    bottom: -6px;

    border: 6px solid rgb(50, 50, 50);
    border-radius: 53px;
    background-color: blue;
    z-index: 501;
  }
  .box-hp, .box-eg {
    position: relative;
    height: 20px;
    margin-bottom: 3px;

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
  .bar-eg {
    height: 100%;
    background-color: rgb(131, 131, 131);

    transition: width .6s;
  }
  .label-eg {
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
  .box-sp {
    position: relative;
    height: 20px;

    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
  }
  .bar-sp {
    height: 100%;
    background-color: rgb(161, 161, 161);

    transition: width .6s;
  }
  .label-sp {
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
