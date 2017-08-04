
import Enemy from '../models/Enemy'
import Player from '../models/Player'
import GameCtrl from './GameCtrl'

export default {
  // 直接杀死所有敌人，获取胜利
  killAllEnemies () {
    for (let i = 0; i < Enemy.list.length; i++) {
      Enemy.list[i].hp = 0
    }

    Enemy.currentIdx = Enemy.list.length - 1

    GameCtrl.checkResult()
  },
  // 直接设置金币数 -- 设置的金币数
  setGold (gold) {
    Player.gold = parseInt(gold)
  }
}
