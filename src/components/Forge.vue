<template>
  <div class="window-forge" v-show="isShow" v-bind:style="{ 'width': width, 'left': left }">
    <div class="close" v-on:click="close()">
      <img src="../assets/icon_close.png" alt="关闭">
    </div>
    <div class="box-list">
      <!-- 武器 -->
      <div class="row" v-if="currentWeapon">
        <div class="title">武器：</div>
        <div class="name" v-bind:class="{ 'epic': currentWeapon.quality === 'e' ? true : false, 'good': currentWeapon.quality === 'g' ? true : false }">{{ getName(currentWeapon) }}</div>
        <div class="duration">
          <div class="box-bar">
            <div class="bar" v-bind:style="{ 'width': currentWeapon.percentStr }"></div>
            <div class="label">
              {{ currentWeapon.leftDuration }}/{{ currentWeapon.duration }}
            </div>
          </div>
        </div>
        <div class="forge">
          <div class="btn" v-show="currentWeapon.leftDuration < currentWeapon.duration" v-on:click="fix('weapon')">修理 {{ currentWeapon.fixPrice }}G</div>
          <div class="btn-disable" v-show="currentWeapon.leftDuration >= currentWeapon.duration">修理</div>
        </div>
      </div>
      <!-- 头部 -->
      <div class="row" v-if="currentHead">
        <div class="title">头盔：</div>
        <div class="name" v-bind:class="{ 'epic': currentHead.quality === 'e' ? true : false, 'good': currentHead.quality === 'g' ? true : false }">{{ getName(currentHead) }}</div>
        <div class="duration">
          <div class="box-bar">
            <div class="bar" v-bind:style="{ 'width': currentHead.percentStr }"></div>
            <div class="label">
              {{ currentHead.leftDuration }}/{{ currentHead.duration }}
            </div>
          </div>
        </div>
        <div class="forge">
          <div class="btn" v-show="currentHead.leftDuration < currentHead.duration" v-on:click="fix('head')">修理 {{ currentHead.fixPrice }}G</div>
          <div class="btn-disable" v-show="currentHead.leftDuration >= currentHead.duration">修理</div>
        </div>
      </div>
      <!-- 身体部 -->
      <div class="row" v-if="currentBody">
        <div class="title">身甲：</div>
        <div class="name" v-bind:class="{ 'epic': currentBody.quality === 'e' ? true : false, 'good': currentBody.quality === 'g' ? true : false }">{{ getName(currentBody) }}</div>
        <div class="duration">
          <div class="box-bar">
            <div class="bar" v-bind:style="{ 'width': currentBody.percentStr }"></div>
            <div class="label">
              {{ currentBody.leftDuration }}/{{ currentBody.duration }}
            </div>
          </div>
        </div>
        <div class="forge">
          <div class="btn" v-show="currentBody.leftDuration < currentBody.duration" v-on:click="fix('body')">修理 {{ currentBody.fixPrice }}G</div>
          <div class="btn-disable" v-show="currentBody.leftDuration >= currentBody.duration">修理</div>
        </div>
      </div>
      <!-- 手部 -->
      <div class="row" v-if="currentHand">
        <div class="title">手甲：</div>
        <div class="name" v-bind:class="{ 'epic': currentHand.quality === 'e' ? true : false, 'good': currentHand.quality === 'g' ? true : false }">{{ getName(currentHand) }}</div>
        <div class="duration">
          <div class="box-bar">
            <div class="bar" v-bind:style="{ 'width': currentHand.percentStr }"></div>
            <div class="label">
              {{ currentHand.leftDuration }}/{{ currentHand.duration }}
            </div>
          </div>
        </div>
        <div class="forge">
          <div class="btn" v-show="currentHand.leftDuration < currentHand.duration" v-on:click="fix('hand')">修理 {{ currentHand.fixPrice }}G</div>
          <div class="btn-disable" v-show="currentHand.leftDuration >= currentHand.duration">修理</div>
        </div>
      </div>
      <!-- 腿部 -->
      <div class="row" v-if="currentLeg">
        <div class="title">腿甲：</div>
        <div class="name" v-bind:class="{ 'epic': currentLeg.quality === 'e' ? true : false, 'good': currentLeg.quality === 'g' ? true : false }">{{ getName(currentLeg) }}</div>
        <div class="duration">
          <div class="box-bar">
            <div class="bar" v-bind:style="{ 'width': currentLeg.percentStr }"></div>
            <div class="label">
              {{ currentLeg.leftDuration }}/{{ currentLeg.duration }}
            </div>
          </div>
        </div>
        <div class="forge">
          <div class="btn" v-show="currentLeg.leftDuration < currentLeg.duration" v-on:click="fix('leg')">修理 {{ currentLeg.fixPrice }}G</div>
          <div class="btn-disable" v-show="currentLeg.leftDuration >= currentLeg.duration">修理</div>
        </div>
      </div>
    </div>
    <div class="btn-long" v-on:click="fixAll()">修理全部 {{ totalFixPrice }}G</div>
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
  import EquipmentCtrl from '../controllers/EquipmentCtrl'

  export default {
    name: 'forge',
    data () {
      return {
        isShow: false,
        isLoading: true,  // 弹框是否正在播放动效中
        width: '40%',  // 窗体的宽度
        left: '30%',  // 窗体的left
        player: Player
      }
    },
    computed: {
      currentWeapon () {
        if (this.player.equipments.weapon.id) {
          let weapon = EquipmentCtrl.findWeaponInfoById(this.player.equipments.weapon.id)

          if (weapon) {
            weapon.quality = this.player.equipments.weapon.quality
            weapon.leftDuration = this.player.equipments.weapon.duration
            weapon.percentStr = weapon.leftDuration / weapon.duration * 100 + '%'
            weapon.fixPrice = Math.ceil(weapon.sell * 10 * (1 - weapon.leftDuration / weapon.duration))
            return weapon
          } else {
            return ''
          }
        } else {
          return ''
        }
      },
      currentHead () {
        if (this.player.equipments.head.id) {
          let head = EquipmentCtrl.findHeadInfoById(this.player.equipments.head.id)

          if (head) {
            head.quality = this.player.equipments.head.quality
            head.leftDuration = this.player.equipments.head.duration
            head.percentStr = head.leftDuration / head.duration * 100 + '%'
            head.fixPrice = Math.round(head.sell * 10 * (1 - head.leftDuration / head.duration))
            return head
          } else {
            return ''
          }
        } else {
          return ''
        }
      },
      currentBody () {
        if (this.player.equipments.body.id) {
          let body = EquipmentCtrl.findBodyInfoById(this.player.equipments.body.id)

          if (body) {
            body.quality = this.player.equipments.body.quality
            body.leftDuration = this.player.equipments.body.duration
            body.percentStr = body.leftDuration / body.duration * 100 + '%'
            body.fixPrice = Math.round(body.sell * 10 * (1 - body.leftDuration / body.duration))
            return body
          } else {
            return ''
          }
        } else {
          return ''
        }
      },
      currentHand () {
        if (this.player.equipments.hand.id) {
          let hand = EquipmentCtrl.findHandInfoById(this.player.equipments.hand.id)

          if (hand) {
            hand.quality = this.player.equipments.hand.quality
            hand.leftDuration = this.player.equipments.hand.duration
            hand.percentStr = hand.leftDuration / hand.duration * 100 + '%'
            hand.fixPrice = Math.round(hand.sell * 10 * (1 - hand.leftDuration / hand.duration))
            return hand
          } else {
            return ''
          }
        } else {
          return ''
        }
      },
      currentLeg () {
        if (this.player.equipments.leg.id) {
          let leg = EquipmentCtrl.findLegInfoById(this.player.equipments.leg.id)

          if (leg) {
            leg.quality = this.player.equipments.leg.quality
            leg.leftDuration = this.player.equipments.leg.duration
            leg.percentStr = leg.leftDuration / leg.duration * 100 + '%'
            leg.fixPrice = Math.round(leg.sell * 10 * (1 - leg.leftDuration / leg.duration))
            return leg
          } else {
            return ''
          }
        } else {
          return ''
        }
      },
      totalFixPrice () {
        let total = 0

        if (this.currentWeapon) {
          total += this.currentWeapon.fixPrice
        }
        if (this.currentHead) {
          total += this.currentHead.fixPrice
        }
        if (this.currentBody) {
          total += this.currentBody.fixPrice
        }
        if (this.currentHand) {
          total += this.currentHand.fixPrice
        }
        if (this.currentLeg) {
          total += this.currentLeg.fixPrice
        }

        return total
      }
    },
    methods: {
      fixAll () {
        if (Player.gold < this.totalFixPrice) {
          window.alert('金币不足！')
        } else {
          if (this.currentWeapon) {
            this.fix('weapon')
          }
          if (this.currentHead) {
            this.fix('head')
          }
          if (this.currentBody) {
            this.fix('body')
          }
          if (this.currentHand) {
            this.fix('hand')
          }
          if (this.currentLeg) {
            this.fix('leg')
          }
        }
      },
      fix (type) {
        switch (type) {
          case 'weapon':
            if (this.currentWeapon.leftDuration < this.currentWeapon.duration) {
              if (Player.gold < this.currentWeapon.fixPrice) {
                window.alert('金币不足！')
              } else {
                PlayerCtrl.changeGold(-1 * this.currentWeapon.fixPrice)
                PlayerCtrl.fullDuration(type)
              }
            }
            break
          case 'head':
            if (this.currentHead.leftDuration < this.currentHead.duration) {
              if (Player.gold < this.currentHead.fixPrice) {
                window.alert('金币不足！')
              } else {
                PlayerCtrl.changeGold(-1 * this.currentHead.fixPrice)
                PlayerCtrl.fullDuration(type)
              }
            }
            break
          case 'body':
            if (this.currentBody.leftDuration < this.currentBody.duration) {
              if (Player.gold < this.currentBody.fixPrice) {
                window.alert('金币不足！')
              } else {
                PlayerCtrl.changeGold(-1 * this.currentBody.fixPrice)
                PlayerCtrl.fullDuration(type)
              }
            }
            break
          case 'hand':
            if (this.currentHand.leftDuration < this.currentHand.duration) {
              if (Player.gold < this.currentHand.fixPrice) {
                window.alert('金币不足！')
              } else {
                PlayerCtrl.changeGold(-1 * this.currentHand.fixPrice)
                PlayerCtrl.fullDuration(type)
              }
            }
            break
          case 'leg':
            if (this.currentLeg.leftDuration < this.currentLeg.duration) {
              if (Player.gold < this.currentLeg.fixPrice) {
                window.alert('金币不足！')
              } else {
                PlayerCtrl.changeGold(-1 * this.currentLeg.fixPrice)
                PlayerCtrl.fullDuration(type)
              }
            }
            break
          default:
            // 错误类型，不处理
        }
      },
      getName (item) {
        if (item.quality === 'e') {
          return item.name + '[传说]'
        } else if (item.quality === 'g') {
          return item.name + '[优良]'
        } else {
          return item.name
        }
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

      eventBus.$on('notifyShowForge', () => {
        _this.show()
      })
    }
  }
</script>

<style scoped>
  .window-forge {
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
    padding: 12px 24px;
  }
  .title {
    width: 10%;
    height: 30px;
    line-height: 30px;
  }
  .name {
    width: 50%;
    height: 30px;
    line-height: 30px;
  }
  .duration {
    width: 20%;
  }
  .forge {
    width: 20%;
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
  .epic {
    color: rgb(244,189,26);
  }
  .good {
    color: rgb(0,93,161);
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
