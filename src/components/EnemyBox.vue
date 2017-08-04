<template>
  <div class="bed-enemy-area">
    <enemy-info></enemy-info>
    <!-- 敌人画像 -->
    <div class="box-enemy">
      <div class="item-current-enemy" v-bind:style="{ 'backgroundImage': 'url(' + currentEnemy.image + ')' }">
        {{ currentEnemy.name }}
        <div class="damage" v-bind:style="{ 'top': damageTop, 'opacity': isDamageShow ? 1 : 0 }">{{ damageValue }}</div>
      </div>
      <div class="item-next-enemy" v-if="enemy.currentIdx < enemy.list.length - 1" v-bind:style="{ 'backgroundImage': 'url(' + nextEnemy.image + ')' }">
        {{ nextEnemy.name }}
      </div>
    </div>
  </div>
</template>

<script>
  import eventBus from '../EventBus'
  import Enemy from '../models/Enemy'
  import EnemyInfo from '../components/EnemyInfo'

  export default {
    name: 'enemy-area',
    data () {
      return {
        isDamageLock: false,  // 伤害卡片是否正在锁死展示中，锁死状态下理论上会忽略新的卡片展示效果请求
        isDamageShow: false,  // 伤害卡片是否展示
        damageValue: 0,  // 对当前敌人造成的伤害值
        damageTop: '0',  // 伤害卡片top值
        enemy: Enemy
      }
    },
    computed: {
      currentEnemy () {
        return this.enemy.list[this.enemy.currentIdx]
      },
      nextEnemy () {
        if (this.enemy.currentIdx < this.enemy.list.length - 1) {
          // 下一个敌人存在
          return this.enemy.list[this.enemy.currentIdx + 1]
        } else {
          return {}
        }
      }
    },
    methods: {
      // 展示伤害效果卡片 -- 造成的伤害值
      showDamageEffect (damage, callback) {
        let _this = this
        if (!this.isDamageLock) {
          this.isDamageLock = true
          // this.isDamageShow = false
          this.damageValue = damage || 0
          // this.damageTop = '0'

          // NOTE: 展示卡片，更改其top值，利用css 动效0.4秒时间播放效果
          this.isDamageShow = true
          this.damageTop = '-100px'
          // 0.5s后自动隐藏卡片并重置位置
          setTimeout(function () {
            _this.isDamageShow = false
            _this.damageValue = 0
            _this.damageTop = '0'
          }, 500)
          // 1s后自动重置卡片锁止状态
          setTimeout(function () {
            _this.isDamageLock = false
            if (callback && typeof (callback) === 'function') {
              callback(true)
            }
          }, 1000)
        }
      }
    },
    components: {
      'enemy-info': EnemyInfo
    },
    mounted () {
      let _this = this

      eventBus.$on('notifyDamageEnemy', params => {
        let damage = 0
        if (params && params.damage) {
          damage = parseInt(Number(params.damage)) || 0
        }
        _this.showDamageEffect(damage, params.success || '')
      })
    }
  }
</script>

<style scoped>
  .bed-enemy-area {

  }
  .box-enemy {
    position: relative;
    height: 280px;
  }
  .item-current-enemy {
    position: relative;
    margin: 0 auto;
    width: 280px;
    height: 280px;

    color: white;
    /*background-color: red;*/
    /*background-image: url('../assets/enemy_0.gif');*/
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    text-shadow: 1px 1px 1px rgb(50, 50, 50);
  }
  .damage {
    position: absolute;
    width: 280px;
    height: 280px;
    line-height: 280px;
    left: 0;
    /*top: 0;*/

    color: rgb(75,75,75);
    font-size: 60px;

    transition: top .4s;
  }
  .item-next-enemy {
    position: absolute;
    width: 200px;
    height: 200px;
    right: 10%;
    top: 40px;

    color: white;
    /*background-color: blue;*/
    /*background-image: url('../assets/enemy_1.gif');*/
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    text-shadow: 1px 1px 1px rgb(50, 50, 50);
    z-index: -1;
  }
</style>
