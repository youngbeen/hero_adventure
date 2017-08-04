<template>
  <div class="window-character" v-show="isShow" v-bind:style="{ 'width': width, 'left': left }">
    <div class="close" v-on:click="close()">
      <img src="../assets/icon_close.png" alt="关闭">
    </div>
    <div class="box-list">
      <div class="row">
        <div class="title">金币：</div>
        <div class="value gold">{{ player.gold }}</div>
        <div class="action"></div>
      </div>
      <div class="row">
        <div class="title">当前HP：</div>
        <div class="value">
          <div class="box-bar">
            <div class="bar" v-bind:style="{ 'width': hpPercentStr }"></div>
            <div class="label">
              {{ player.hp }}/{{ player.maxHp }}
            </div>
          </div>
        </div>
        <div class="action" v-if="mode === 'edit'">
          <div class="btn" v-show="!isLoading && player.gold >= totalRecoverPrice && totalRecoverPrice > 0" v-on:click="recover()">完全恢复{{ totalRecoverPrice }}G</div>
          <div class="btn" v-show="!isLoading && player.gold < totalRecoverPrice && player.gold > 0" v-on:click="recover()">恢复{{ player.gold }}G</div>
          <div class="btn-disable" v-show="!isLoading && (totalRecoverPrice <= 0 || player.gold <= 0)">恢复</div>
        </div>
      </div>
      <div class="row">
        <div class="title">可用技能点</div>
        <div class="value point">{{ player.availablePoint }}</div>
        <div class="action"></div>
      </div>
      <div class="row">
        <div class="title">力量</div>
        <div class="value">{{ player.power }} <span>(<strong class="pro">+{{ player.extraPower }}</strong>)</span></div>
        <div class="action" v-if="mode === 'edit'">
          <div class="btn" v-show="!isLoading && player.availablePoint > 0" v-on:click="improve('power')">提升+1</div>
          <div class="btn-disable" v-show="!isLoading && player.availablePoint <= 0">提升+1</div>
        </div>
      </div>
      <div class="row">
        <div class="title">体力</div>
        <div class="value">{{ player.defence }} <span>(<strong class="pro">+{{ player.extraDefence }}</strong>)</span></div>
        <div class="action" v-if="mode === 'edit'">
          <div class="btn" v-show="!isLoading && player.availablePoint > 0" v-on:click="improve('defence')">提升+1</div>
          <div class="btn-disable" v-show="!isLoading && player.availablePoint <= 0">提升+1</div>
        </div>
      </div>
      <div class="row">
        <div class="title">敏捷</div>
        <div class="value">{{ player.agility }} <span>(<strong class="pro">+{{ player.extraAgility }}</strong>)</span></div>
        <div class="action" v-if="mode === 'edit'">
          <div class="btn" v-show="!isLoading && player.availablePoint > 0" v-on:click="improve('agility')">提升+1</div>
          <div class="btn-disable" v-show="!isLoading && player.availablePoint <= 0">提升+1</div>
        </div>
      </div>
      <hr>
      <div class="btn-long" v-if="mode === 'edit'" v-on:click="showSkill()">技能</div>
    </div>
    <!-- 加载中电波 -->
    <div class="loading" v-show="isLoading">
      <img src="../assets/icon_loading.png" alt="加载中...">
    </div>
  </div>
</template>

<script>
  import eventBus from '../EventBus'
  import Player from '../models/Player'
  import PlayerCtrl from '../controllers/PlayerCtrl'

  export default {
    name: 'character',
    data () {
      return {
        isShow: false,
        isLoading: true,  // 弹框是否正在播放动效中
        width: '40%',  // 窗体的宽度
        left: '30%',  // 窗体的left
        mode: 'show',  // 窗体模式，'show' - 展示模式， 'edit' - 编辑模式
        player: Player
      }
    },
    computed: {
      hpPercentStr () {
        return this.player.hp / this.player.maxHp * 100 + '%'
      },
      totalRecoverPrice () {
        return Math.round((this.player.maxHp - this.player.hp) / 2)
      }
    },
    methods: {
      recover () {
        if (Player.gold >= this.totalRecoverPrice) {
          // 金币足够完全恢复
          PlayerCtrl.changeGold(-1 * this.totalRecoverPrice)
          PlayerCtrl.fullHp()
        } else {
          // 金币不足，按照金币去恢复
          let recoverHp = Player.gold * 2
          PlayerCtrl.changeGold(-1 * Player.gold)
          PlayerCtrl.changeHp(recoverHp)
        }
      },
      improve (type) {
        if (Player.availablePoint) {
          if (type === 'power') {
            PlayerCtrl.changeAvailablePoint(-1)
            PlayerCtrl.changeExtra(type, 1)
          } else if (type === 'defence') {
            PlayerCtrl.changeAvailablePoint(-1)
            PlayerCtrl.changeExtra(type, 1)
          } else if (type === 'agility') {
            PlayerCtrl.changeAvailablePoint(-1)
            PlayerCtrl.changeExtra(type, 1)
          }
        }
      },
      showSkill () {
        eventBus.$emit('notifyShowSkill', {
          mode: 'edit'
        })
      },
      show () {
        let _this = this
        this.isLoading = true
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

      eventBus.$on('notifyShowCharacter', (params) => {
        if (params && params.mode === 'edit') {
          _this.mode = 'edit'
        } else {
          _this.mode = 'show'
        }
        _this.show()
      })
    }
  }
</script>

<style scoped>
  .window-character {
    position: fixed;
    /*width: 80%;*/
    /*height: 40%;*/
    /*left: 10%;*/
    top: 20%;

    background-color: white;
    border: 6px solid rgb(50, 50, 50);
    border-radius: 12px;

    transition: width .2s, left .2s;
    z-index: 2100;
  }
  .close {
    position: absolute;
    right: -20px;
    top: -20px;
    width: 30px;
    height: 30px;
    /*line-height: 30px;*/

    background-color: white;
    border: 6px solid rgb(50, 50, 50);
    border-radius: 20px;
    /*font-size: 38px;*/
    /*text-align: center;*/
    cursor: pointer;
    z-index: 2102;
  }
  .close img {
    width: 100%;
    height: 100%;
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
    z-index: 2101;
  }
  .loading img {
    width: 160px;
    /*height: 60px;*/
  }
  .row {
    display: flex;
    padding: 6px 24px;
  }
  .title {
    width: 20%;
    height: 30px;
    line-height: 30px;
  }
  .value {
    width: 50%;
    height: 30px;
    line-height: 30px;
  }
  .gold {
    color: rgb(214,218,20);
    font-size: 18px;
    font-weight: bold;
    text-shadow: 1px 1px 1px rgb(108,106,108);
  }
  .point {
    color: rgb(50, 50, 50);
    /*font-size: 18px;*/
    font-weight: bold;
  }
  .pro {
    color: rgb(180, 180, 180);
  }
  .action {
    width: 30%;
  }
  .box-bar {
    position: relative;
    height: 30px;

    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
  }
  .bar {
    height: 100%;
    background-color: rgb(99, 99, 99);
  }
  .label {
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
  .btn {
    margin: 0 6px;
    /*width: 90px;*/
    height: 30px;
    line-height: 30px;

    color: white;
    background-color: rgb(130, 130, 130);
    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
  .btn-long {
    margin: 6px auto;
    width: 180px;
    height: 30px;
    line-height: 30px;

    color: white;
    background-color: rgb(130, 130, 130);
    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
  .btn-disable {
    margin: 0 6px;
    /*width: 90px;*/
    height: 30px;
    line-height: 30px;

    color: white;
    background-color: rgb(200, 200, 200);
    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
    text-align: center;
    cursor: not-allowed;
  }
</style>
