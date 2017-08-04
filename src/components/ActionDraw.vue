<template>
  <div class="bed-action-draw">
    <div class="box-item" v-for="(action, index) in list" v-on:click="draw(index)">
      <!-- <span v-bind:style="{ 'opacity': action.isOpen ? 1 : 0 }">{{ action.type }}</span> -->
      <img v-bind:src="action.image" v-bind:alt="action.type" v-bind:style="{ 'opacity': action.isOpen || eyeOpen ? 1 : 0 }">
      <div class="cover" v-show="eyeOpen && !action.isOpen"></div>
    </div>
  </div>
</template>

<script>
  import eventBus from '../EventBus'
  import Player from '../models/Player'
  import NumberUtil from '../utils/NumberUtil'
  import GameCtrl from '../controllers/GameCtrl'
  import PlayerCtrl from '../controllers/PlayerCtrl'
  import attackImage from '../assets/icon_attack.png'
  import damageImage from '../assets/icon_damage.png'
  import refreshImage from '../assets/icon_refresh.png'
  import torchImage from '../assets/icon_torch.png'

  export default {
    name: 'action-draw',
    data () {
      return {
        isLock: false,  // 是否正在执行draw的效果，被锁止中
        eyeOpen: false,  // 是否可以观察到所有行动项
        attackCombo: 0,  // 攻击连击数
        damageCombo: 0,  // 被伤害连击数
        list: [
          // {
          //   type: 'attack',
          //   isOpen: false,
          //   image: ''
          // }
        ]
      }
    },
    methods: {
      refreshActions () {
        this.eyeOpen = false
        this.attackCombo = 0
        this.damageCombo = 0
        this.list = []

        for (let i = 0; i < 9; i++) {
          let item = {}
          item.isOpen = false
          let random = NumberUtil.random(8, 1)

          if (random > 3) {
            item.type = 'attack'
            item.image = attackImage
          } else {
            item.type = 'damage'
            item.image = damageImage
          }
          this.list.push(item)
        }

        // 从列表中随机产生2个不重复的位置，用于放置刷新及火把
        let positions = []
        if (NumberUtil.random(2) > 1) {
          // 1/3的概率生成火把
          positions = NumberUtil.multiRandom(2, 8, 0)
          this.list[positions[0]].type = 'refresh'
          this.list[positions[0]].image = refreshImage
          this.list[positions[1]].type = 'torch'
          this.list[positions[1]].image = torchImage
        } else {
          // 无火把
          positions = NumberUtil.multiRandom(1, 8, 0)
          this.list[positions[0]].type = 'refresh'
          this.list[positions[0]].image = refreshImage
        }
      },

      draw (idx) {
        let _this = this

        if (!this.isLock) {
          this.isLock = true

          if (this.list[idx].isOpen) {
            // 已开启的格子
            if (this.list[idx].type === 'refresh') {
              // 点击了刷新格子
              this.refreshActions()
            }

            this.isLock = false
          } else {
            // 未开启的格子
            this.list[idx].isOpen = true
            let damage = 0
            let damageDiv = 1  // 扩大比例

            switch (this.list[idx].type) {
              case 'attack':
                this.damageCombo = 0
                damage = NumberUtil.calcDamage(Player.power) * -1
                if (this.attackCombo >= 4) {
                  // 已经达到5 combo, 1.5倍伤害
                  damageDiv = 1.5
                } else if (this.attackCombo > 0) {
                  // 达到2combo，1.2倍伤害
                  damageDiv = 1.2
                }
                damage = Math.round(damage * damageDiv)
                PlayerCtrl.changeEnemyHp(damage)
                PlayerCtrl.changeEg(3 + this.attackCombo)  // 攻击产生的EG值是3+当前攻击combo
                eventBus.$emit('notifyDamageEnemy', {
                  damage,
                  success: function (result) {
                    console.log('执行效果结束')
                    _this.isLock = false
                    GameCtrl.checkResult()
                  }
                })
                PlayerCtrl.changeDuration('weapon', -1)
                this.attackCombo++
                break
              case 'damage':
                this.attackCombo = 0
                // TODO: 敌人的伤害计算未实装
                damage = NumberUtil.random(20, 1) * -1
                if (this.damageCombo >= 4) {
                  // 已经达到5 combo, 1.5倍伤害
                  damageDiv = 1.5
                } else if (this.damageCombo > 2) {
                  // 达到3combo，1.2倍伤害
                  damageDiv = 1.2
                }
                damage = Math.round(damage * damageDiv)
                if (NumberUtil.random(1000, 1) <= NumberUtil.calcDodge(Player.agility)) {
                  // 闪避
                  // TODO: 显示miss？或者什么效果
                  PlayerCtrl.changeEg(2)  // 闪避产生的EG值是2
                } else {
                  // 未闪避，承受伤害
                  PlayerCtrl.changeHp(damage)
                  PlayerCtrl.changeEg(6 + this.damageCombo)  // 受伤产生的EG值是6+当前受伤combo
                  PlayerCtrl.changeArmorDuration(-1)
                }
                _this.isLock = false
                this.damageCombo++
                GameCtrl.checkResult()
                break
              case 'torch':
                _this.eyeOpen = true
                _this.isLock = false
                break
              default:
                _this.isLock = false
            }
          }
        }
      }
    },
    created () {
      this.refreshActions()
    },
    mounted () {
      let _this = this

      eventBus.$on('notifyRefreshActions', () => {
        _this.refreshActions()
      })
    }
  }
</script>

<style scoped>
  .bed-action-draw {
    margin: 0 auto;
    width: 210px;
  }
  .box-item {
    display: inline-block;
    position: relative;
    margin: 3px;
    width: 60px;
    height: 60px;

    border: 1px solid rgb(150,150,150);
    border-radius: 6px;
    cursor: pointer;
  }
  img {
    width: 60px;
    height: 60px;
  }
  .cover {
    position: absolute;
    width: 60px;
    height: 60px;
    left: 0;
    top: 0;

    background-color: rgba(80, 80, 80, .6);
    border-radius: 6px;
  }
</style>
