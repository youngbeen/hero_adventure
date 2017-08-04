<template>
  <div id="app">
    <!-- debug -->
    <debug></debug>
    <!-- 敌人信息栏 -->
    <enemy-box></enemy-box>
    <!-- 角色行动指令随机盒子 -->
    <action-draw></action-draw>
    <!-- 角色武器视觉 -->
    <player-effect></player-effect>
    <!-- 角色信息栏 -->
    <player-info></player-info>
    <!-- 装备耐久提醒 -->
    <broken-tip></broken-tip>
    <!-- 功能区 -->
    <setting></setting>
    <!-- 包裹界面，使用物品界面 -->
    <window-bag></window-bag>
    <!-- 战利品结算 -->
    <window-loots></window-loots>
    <!-- 物品更替界面 -->
    <confirm-items></confirm-items>
    <!-- 装备更替界面 -->
    <window-equip></window-equip>
    <!-- 结束界面 -->
    <window-endturn></window-endturn>
    <!-- 保存与加载弹框 -->
    <window-save></window-save>
    <!-- 角色 -->
    <window-character></window-character>
    <!-- 锻造屋 -->
    <window-forge></window-forge>
    <!-- 商店 -->
    <window-store></window-store>
  </div>
</template>

<script>
  import Player from './models/Player'
  import GameCtrl from './controllers/GameCtrl'
  import PlayerCtrl from './controllers/PlayerCtrl'
  import Debug from './components/Debug'
  import EnemyBox from './components/EnemyBox'
  import ActionDraw from './components/ActionDraw'
  import PlayerInfo from './components/PlayerInfo'
  import PlayerEffect from './components/PlayerEffect'
  import Setting from './components/Setting'
  import BrokenTip from './components/BrokenTip'
  import Bag from './components/Bag.vue'
  import Loots from './components/Loots.vue'
  import ConfirmItems from './components/ConfirmItems.vue'
  import Equip from './components/Equip.vue'
  import EndTurn from './components/EndTurn.vue'
  import SaveNLoad from './components/SaveNLoad.vue'
  import Character from './components/Character.vue'
  import Forge from './components/Forge.vue'
  import Store from './components/Store.vue'

  export default {
    name: 'app',
    data () {
      return {
        player: Player
      }
    },
    methods: {
      test () {
        PlayerCtrl.changeHp(-10)
      }
    },
    components: {
      'debug': Debug,
      'enemy-box': EnemyBox,
      'action-draw': ActionDraw,
      'player-effect': PlayerEffect,
      'player-info': PlayerInfo,
      'broken-tip': BrokenTip,
      'setting': Setting,
      'window-bag': Bag,
      'window-loots': Loots,
      'confirm-items': ConfirmItems,
      'window-equip': Equip,
      'window-endturn': EndTurn,
      'window-save': SaveNLoad,
      'window-character': Character,
      'window-forge': Forge,
      'window-store': Store
    },
    created () {
      GameCtrl.init()
      GameCtrl.refreshEnemies()

      this.$watch('player.defence', value => {
        console.log('角色体力值发生了变更')
        PlayerCtrl.setMaxHp()
      })
    }
  }
</script>

<style>
  #app {
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    /*text-align: center;
    color: #2c3e50;
    margin-top: 60px;*/
  }
</style>
