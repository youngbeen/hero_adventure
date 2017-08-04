<template>
  <div class="window-equip" v-if="isShow" v-bind:style="{ 'width': width, 'left': left }">
    <!-- <div class="close" v-on:click="close()">
      <img src="../assets/icon_close.png" alt="关闭">
    </div> -->
    <div class="box-upgrade">
      <div class="old" v-if="currentEquipment">
        <div class="name" v-bind:class="{ 'epic': currentEquipment.quality === 'e' ? true : false, 'good': currentEquipment.quality === 'g' ? true : false }">{{ currentName }}</div>
        <div class="text">耐久度：{{ currentEquipment.leftDuration }}/{{ currentEquipment.duration }}</div>
        <!-- 加成信息 -->
        <div class="text" v-if="currentEquipment.provide[0] > 0">力量 + {{ currentEquipmentProvide[0] }}</div>
        <div class="text" v-if="currentEquipment.provide[1] > 0">体力 + {{ currentEquipmentProvide[1] }}</div>
        <div class="text" v-if="currentEquipment.provide[2] > 0">敏捷 + {{ currentEquipmentProvide[2] }}</div>
        <div class="text">售价：{{ currentEquipment.sell }}</div>
        <div class="desc">{{ currentEquipment.description }}</div>
      </div>
      <div class="old" v-else>
        无
      </div>
      <div class="arrow"></div>
      <div class="new" v-if="newEquipment">
        <div class="name" v-bind:class="{ 'epic': newEquipment.quality === 'e' ? true : false, 'good': newEquipment.quality === 'g' ? true : false }">{{ newName }}</div>
        <div class="text">耐久度：{{ newEquipment.duration }}/{{ newEquipment.duration }}</div>
        <!-- 加成信息 -->
        <div class="text" v-if="newEquipment.provide[0] > 0">力量 + {{ newEquipmentProvide[0] }}</div>
        <div class="text" v-if="newEquipment.provide[1] > 0">体力 + {{ newEquipmentProvide[1] }}</div>
        <div class="text" v-if="newEquipment.provide[2] > 0">敏捷 + {{ newEquipmentProvide[2] }}</div>
        <div class="text">售价：{{ newEquipment.sell }}</div>
        <div class="desc">{{ newEquipment.description }}</div>
      </div>
      <div class="new" v-else>
        无
      </div>
    </div>
    <div class="box-btn">
      <div class="btn" v-on:click="equip()">装备</div>
      <div class="btn" v-on:click="abandon()">丢弃</div>
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
  import EquipmentCtrl from '../controllers/EquipmentCtrl'

  export default {
    name: 'window-loots',
    data () {
      return {
        isShow: false,
        isLoading: true,  // 弹框是否正在播放动效中
        loots: [
          // {
          //   type: 'weapon',
          //   id: '01'
          //   name: '小刀',
          //   number: 1,
          //   quality: 'c',
          //   duration: 50
          // }
        ],   // 战利品列表
        width: '40%',  // 窗体的宽度
        left: '30%',  // 窗体的left
        player: Player
      }
    },
    computed: {
      currentEquipment () {
        if (this.loots.length) {
          switch (this.loots[0].type) {
            case 'weapon':
              if (this.player.equipments.weapon.id) {
                let weapon = EquipmentCtrl.findWeaponInfoById(this.player.equipments.weapon.id)

                if (weapon) {
                  // 找到了对应的武器，附加品质数据，当前的耐久度
                  weapon.leftDuration = Player.equipments.weapon.duration
                  weapon.quality = Player.equipments.weapon.quality
                }

                return weapon
              } else {
                return ''
              }
            case 'head':
              if (this.player.equipments.head.id) {
                let head = EquipmentCtrl.findHeadInfoById(this.player.equipments.head.id)

                if (head) {
                  // 找到了对应的装备，附加品质数据，当前的耐久度
                  head.leftDuration = Player.equipments.head.duration
                  head.quality = Player.equipments.head.quality
                }

                return head
              } else {
                return ''
              }
            case 'body':
              if (this.player.equipments.body.id) {
                let body = EquipmentCtrl.findBodyInfoById(this.player.equipments.body.id)

                if (body) {
                  // 找到了对应的装备，附加品质数据，当前的耐久度
                  body.leftDuration = Player.equipments.body.duration
                  body.quality = Player.equipments.body.quality
                }

                return body
              } else {
                return ''
              }
            case 'hand':
              if (this.player.equipments.hand.id) {
                let hand = EquipmentCtrl.findHandInfoById(this.player.equipments.hand.id)

                if (hand) {
                  // 找到了对应的装备，附加品质数据，当前的耐久度
                  hand.leftDuration = Player.equipments.hand.duration
                  hand.quality = Player.equipments.hand.quality
                }

                return hand
              } else {
                return ''
              }
            case 'leg':
              if (this.player.equipments.leg.id) {
                let leg = EquipmentCtrl.findLegInfoById(this.player.equipments.leg.id)

                if (leg) {
                  // 找到了对应的装备，附加品质数据，当前的耐久度
                  leg.leftDuration = Player.equipments.leg.duration
                  leg.quality = Player.equipments.leg.quality
                }

                return leg
              } else {
                return ''
              }
            default:
              return ''
          }
        } else {
          return ''
        }
      },

      currentName () {
        if (this.currentEquipment) {
          if (this.currentEquipment.quality === 'e') {
            return this.currentEquipment.name + '[传说]'
          } else if (this.currentEquipment.quality === 'g') {
            return this.currentEquipment.name + '[优质]'
          } else {
            return this.currentEquipment.name
          }
        } else {
          return ''
        }
      },

      currentEquipmentProvide () {
        if (this.currentEquipment) {
          let newProvide = []
          let div = 1
          if (this.currentEquipment.quality === 'e') {
            div = 1.5
          } else if (this.currentEquipment.quality === 'g') {
            div = 1.2
          }
          for (let i = 0; i < this.currentEquipment.provide.length; i++) {
            newProvide.push(Math.floor(this.currentEquipment.provide[i] * div))
          }
          return newProvide
        } else {
          return []
        }
      },

      newEquipment () {
        if (this.loots.length) {
          switch (this.loots[0].type) {
            case 'weapon':
              let weapon = EquipmentCtrl.findWeaponInfoById(this.loots[0].id)

              if (weapon) {
                // 找到了对应的武器，附加品质数据
                weapon.quality = this.loots[0].quality
              }

              return weapon
            case 'head':
              let head = EquipmentCtrl.findHeadInfoById(this.loots[0].id)

              if (head) {
                // 找到了对应的装备，附加品质数据
                head.quality = this.loots[0].quality
              }

              return head
            case 'body':
              let body = EquipmentCtrl.findBodyInfoById(this.loots[0].id)

              if (body) {
                // 找到了对应的装备，附加品质数据
                body.quality = this.loots[0].quality
              }

              return body
            case 'hand':
              let hand = EquipmentCtrl.findHandInfoById(this.loots[0].id)

              if (hand) {
                // 找到了对应的装备，附加品质数据
                hand.quality = this.loots[0].quality
              }

              return hand
            case 'leg':
              let leg = EquipmentCtrl.findLegInfoById(this.loots[0].id)

              if (leg) {
                // 找到了对应的装备，附加品质数据
                leg.quality = this.loots[0].quality
              }

              return leg
            default:
              return ''
          }
        } else {
          return ''
        }
      },

      newName () {
        if (this.newEquipment) {
          if (this.newEquipment.quality === 'e') {
            return this.newEquipment.name + '[传说]'
          } else if (this.newEquipment.quality === 'g') {
            return this.newEquipment.name + '[优质]'
          } else {
            return this.newEquipment.name
          }
        } else {
          return ''
        }
      },

      newEquipmentProvide () {
        if (this.newEquipment) {
          let newProvide = []
          let div = 1
          if (this.newEquipment.quality === 'e') {
            div = 1.5
          } else if (this.newEquipment.quality === 'g') {
            div = 1.2
          }
          for (let i = 0; i < this.newEquipment.provide.length; i++) {
            newProvide.push(Math.floor(this.newEquipment.provide[i] * div))
          }
          return newProvide
        } else {
          return []
        }
      }
    },
    methods: {
      equip () {
        // 先替换角色的相应装备信息
        switch (this.loots[0].type) {
          case 'weapon':
            Player.equipments.weapon = {
              id: this.loots[0].id,
              quality: this.loots[0].quality,
              duration: Number(this.loots[0].duration)
            }
            break
          case 'head':
            Player.equipments.head = {
              id: this.loots[0].id,
              quality: this.loots[0].quality,
              duration: Number(this.loots[0].duration)
            }
            break
          case 'body':
            Player.equipments.body = {
              id: this.loots[0].id,
              quality: this.loots[0].quality,
              duration: Number(this.loots[0].duration)
            }
            break
          case 'hand':
            Player.equipments.hand = {
              id: this.loots[0].id,
              quality: this.loots[0].quality,
              duration: Number(this.loots[0].duration)
            }
            break
          case 'leg':
            Player.equipments.leg = {
              id: this.loots[0].id,
              quality: this.loots[0].quality,
              duration: Number(this.loots[0].duration)
            }
            break
          default:
        }
        // 再从当前loots列表中剔除第一个已经处理的项
        this.loots.shift()
        // 刷新最终的力量，体力，敏捷
        PlayerCtrl.refreshAbility()
        this.close()
      },
      abandon () {
        // 出售当前装备
        PlayerCtrl.changeGold(this.newEquipment.sell)

        // 再从当前loots列表中剔除第一个已经处理的项
        this.loots.shift()
        this.close()
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
          if (_this.loots.length) {
            // 还有武器或者装备
            console.log('剩余的武器或者装备', _this.loots)
            eventBus.$emit('notifyEquip', _this.loots)
          } else {
            // 全部武器跟装备处理完毕
            eventBus.$emit('notifyEndTurn', true)
          }
        }, 400)
      }
    },
    mounted () {
      let _this = this

      eventBus.$on('notifyEquip', loots => {
        if (loots && loots.length) {
          _this.loots = loots
          _this.show()
        }
      })
    }
  }
</script>

<style scoped>
  .window-equip {
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
    z-index: 2002;
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
    z-index: 2001;
  }
  .loading img {
    width: 160px;
    /*height: 60px;*/
  }
  .box-upgrade {
    display: flex;
    padding: 12px 24px;
  }
  .old {
    width: 40%;
    padding: 6px;

    border-radius: 6px;
    background-color: rgb(200, 200, 200);
  }
  .arrow {
    width: 20%;

    background: url('../assets/arrow_right.png') no-repeat center center;
    background-size: contain;
  }
  .new {
    width: 40%;
    padding: 6px;

    border-radius: 6px;
    background-color: rgb(150, 150, 150);
  }
  .name {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    text-shadow: 1px 1px 1px rgb(50, 50, 50);
  }
  .desc {
    color: rgb(110, 110, 110);
    font-size: 10px;
    font-style: italic;
  }
  .epic {
    color: rgb(244,189,26);
  }
  .good {
    color: rgb(0,93,161);
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
