<template>
  <div class="window-end-turn" v-show="isShow" v-bind:style="{ 'width': width, 'left': left }">
    <div class="box-end-turn">
      <div class="row">
        <div class="box box-1" title="角色" v-on:click="showCharacter()">
        </div>
        <div class="box box-2" title="锻造屋" v-show="isForgeOpen" v-on:click="showForge()">
        </div>
        <div class="box box-3" title="商店" v-show="isStoreOpen" v-on:click="showStore()">
        </div>
      </div>
    </div>
    <div class="btn" v-on:click="restart()">继续冒险</div>
    <!-- 加载中电波 -->
    <div class="loading" v-show="isLoading">
      <img src="../assets/icon_loading.png" alt="加载中...">
    </div>
  </div>
</template>

<script>
  import eventBus from '../EventBus'
  import NumberUtil from '../utils/NumberUtil'
  import GameCtrl from '../controllers/GameCtrl'
  import PlayerCtrl from '../controllers/PlayerCtrl'

  export default {
    name: 'end-turn',
    data () {
      return {
        isShow: false,
        isLoading: true,  // 弹框是否正在播放动效中
        isForgeOpen: false,  // 是否允许修理
        isStoreOpen: false,  // 是否允许购买物品
        width: '40%',  // 窗体的宽度
        left: '30%'  // 窗体的left
      }
    },
    methods: {
      showCharacter () {
        eventBus.$emit('notifyShowCharacter', {
          mode: 'edit'
        })
      },
      showForge () {
        eventBus.$emit('notifyShowForge')
      },
      showStore () {
        eventBus.$emit('notifyShowStore')
      },
      restart () {
        this.close()
        GameCtrl.refreshGame()
      },
      // 展示 -- [是否以胜利方式进入结算]
      show (success) {
        let _this = this
        this.isLoading = true
        // 1/4的概率出现锻造屋
        if (success && NumberUtil.random(4, 1) === 1) {
          this.isForgeOpen = true
        } else if (PlayerCtrl.hasItem('99') > -1) {
          // 角色持有修理机器人
          this.isForgeOpen = true
        } else {
          this.isForgeOpen = false
        }
        // 1/8的概率出现商店
        if (success && NumberUtil.random(8, 1) === 1) {
          // 刷新商店中售卖的物品列表
          GameCtrl.refreshStoreItems()
          this.isStoreOpen = true
        } else {
          this.isStoreOpen = false
        }
        this.isShow = true
        setTimeout(function () {
          _this.width = '80%'
          _this.left = '10%'
          _this.isLoading = false
        }, 400)
      },
      close () {
        let _this = this
        this.isLoading = true
        this.width = '40%'
        this.left = '30%'
        setTimeout(function () {
          _this.isShow = false
          _this.isLoading = false
        }, 400)
      }
    },
    mounted () {
      let _this = this

      eventBus.$on('notifyEndTurn', (success) => {
        _this.show(success)
      })
    }
  }
</script>

<style scoped>
  .window-end-turn {
    position: fixed;
    /*width: 80%;*/
    /*height: 40%;*/
    /*left: 10%;*/
    top: 20%;

    background-color: white;
    border: 6px solid rgb(50, 50, 50);
    border-radius: 12px;

    transition: width .2s, left .2s;
    z-index: 2000;
  }
  .loading {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    background-color: white;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    z-index: 2001;
  }
  .loading img {
    width: 160px;
    /*height: 60px;*/
  }
  .box-end-turn {
    padding: 12px 24px;
  }
  .row {
    display: flex;
    justify-content: space-around;
  }
  .box {
    width: 60px;
    height: 60px;

    border: 2px solid rgb(130, 130, 130);
    border-radius: 6px;
    align-items: center;
    cursor: pointer;
  }
  .box-1 {
    background: url('../assets/icon_chara.png') no-repeat center center;
    background-size: 60px 60px;
  }
  .box-2 {
    background: url('../assets/icon_forge.png') no-repeat center center;
    background-size: 60px 60px;
  }
  .box-3 {
    background: url('../assets/icon_store.png') no-repeat center center;
    background-size: 60px 60px;
  }
  .btn {
    margin: 6px auto;
    width: 90px;
    height: 30px;
    line-height: 30px;

    color: white;
    background-color: rgb(130, 130, 130);
    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
</style>
