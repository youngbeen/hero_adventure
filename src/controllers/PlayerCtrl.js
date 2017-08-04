
import Player from '../models/Player'
import Enemy from '../models/Enemy'
import NumberUtil from '../utils/NumberUtil'
import ItemCtrl from './ItemCtrl'
import EquipmentCtrl from './EquipmentCtrl'

export default {
  // 变更金币数量 -- 要变更的金币数值
  changeGold (gold) {
    gold = parseInt(Number(gold)) || 0

    let targetGold = Player.gold + gold
    if (targetGold > 999999) {
      // 目标金币超过最大值
      targetGold = 999999
    } else if (targetGold < 0) {
      // 目标金币低于0
      targetGold = 0
    }

    Player.gold = targetGold
  },
  // 变更当前敌人HP值 -- 要变更的HP值
  changeEnemyHp (hp) {
    hp = parseInt(Number(hp)) || 0

    let currentEnemy = Enemy.list[Enemy.currentIdx]
    let targetHp = currentEnemy.hp + hp
    if (targetHp > currentEnemy.maxHp) {
      // 目标hp超过最大hp
      targetHp = currentEnemy.maxHp
    } else if (targetHp < 0) {
      // 目标hp低于0
      targetHp = 0
    }

    currentEnemy.hp = targetHp
  },
  // 充满角色的HP值 --
  fullHp () {
    Player.hp = Player.maxHp
  },
  // 变更角色HP值 -- 要变更的HP值
  changeHp (hp) {
    hp = parseInt(Number(hp)) || 0

    let targetHp = Player.hp + hp
    if (targetHp > Player.maxHp) {
      // 目标hp超过最大hp
      targetHp = Player.maxHp
    } else if (targetHp < 0) {
      // 目标hp低于0
      targetHp = 0
    }

    Player.hp = targetHp
  },
  // 根据体力值计算调整HP上限值 --
  setMaxHp () {
    if (Player.maxHp) {
      // 已经初始化过，需要重新计算HP上限
      let newMaxHp = NumberUtil.calcHP(Player.defence)

      Player.maxHp = newMaxHp
      if (Player.hp > Player.maxHp) {
        Player.hp = Player.maxHp
      }
    } else {
      // 还未初始化HP
      Player.maxHp = NumberUtil.calcHP(Player.defence)
      Player.hp = Player.maxHp
    }
  },
  // 复活角色 --
  reborn () {
    Player.hp = Player.maxHp
    Player.eg = 0
    Player.sp = 0
  },
  // 清空角色能力EG值 --
  clearEg () {
    Player.eg = 0
  },
  // 充满角色能力EG值 --
  fullEg () {
    Player.eg = Player.maxEg
  },
  // 变更角色能力EG值 -- 要变更的能量EG值
  changeEg (eg) {
    eg = parseInt(Number(eg)) || 0

    let targetEg = Player.eg + eg
    if (targetEg > Player.maxEg) {
      // 目标eg超过最大eg
      targetEg = Player.maxEg
    } else if (targetEg < 0) {
      // 目标eg低于0
      targetEg = 0
    }

    Player.eg = targetEg
  },
  // 清空角色奥义SP值 --
  clearSp () {
    Player.sp = 0
  },
  // 充满角色奥义SP值 --
  fullSp () {
    Player.sp = Player.maxSp
  },
  // 变更角色奥义SP值 -- 要变更的奥义SP值
  changeSp (sp) {
    sp = parseInt(Number(sp)) || 0

    let targetSp = Player.sp + sp
    if (targetSp > Player.maxSp) {
      // 目标sp超过最大sp
      targetSp = Player.maxSp
    } else if (targetSp < 0) {
      // 目标sp低于0
      targetSp = 0
    }

    Player.sp = targetSp
  },
  // 变更角色可用技能点 -- 要变更的技能点值
  changeAvailablePoint (point) {
    point = parseInt(Number(point)) || 0

    let targetPoint = Player.availablePoint + point
    if (targetPoint > 99) {
      // 目标point超过上限值
      targetPoint = 99
    } else if (targetPoint < 0) {
      // 目标point低于0
      targetPoint = 0
    }

    Player.availablePoint = targetPoint
  },
  // 变更角色技能点加持的属性 -- 属性类别, 变更值
  // NOTE: 属性类别值为 'power', 'defence', 'agility'
  changeExtra (type, value) {
    value = parseInt(Number(value)) || 0

    if (type === 'power') {
      // 变更力量power值
      let targetPower = Player.extraPower + value
      if (targetPower > 99) {
        targetPower = 99
      } else if (targetPower < 0) {
        targetPower = 0
      }
      Player.extraPower = targetPower
    } else if (type === 'defence') {
      // 变更体力defence值
      let targetDefence = Player.extraDefence + value
      if (targetDefence > 99) {
        targetDefence = 99
      } else if (targetDefence < 0) {
        targetDefence = 0
      }
      Player.extraDefence = targetDefence
    } else if (type === 'agility') {
      // 变更敏捷agility值
      let targetAgility = Player.extraAgility + value
      if (targetAgility > 99) {
        targetAgility = 99
      } else if (targetAgility < 0) {
        targetAgility = 0
      }
      Player.extraAgility = targetAgility
    }
  },
  // 刷新面板力量，体力，敏捷 --
  refreshAbility () {
    let gearPros = this.getAllProvides()
    Player.power = Player.basePower + Player.extraPower + gearPros.power
    Player.defence = Player.baseDefence + Player.extraDefence + gearPros.defence
    Player.agility = Player.baseAgility + Player.extraAgility + gearPros.agility
  },
  // 是否持有某物品 -- 物品id
  // NOTE: 返回的是物品所在的index，-1代表未持有，其他代表持有的位置index
  hasItem (id) {
    let hasIndex = -1

    for (let i = 0; i < Player.items.length; i++) {
      if (Player.items[i].id === id) {
        hasIndex = i
        break
      }
    }

    return hasIndex
  },
  // 增加持有某物品 -- 物品id，持有量
  addItem (id, number) {
    number = Number(number) || 0

    if (id && number > 0 && this.hasItem(id) === -1 && Player.items.length < 5) {
      // id合法，数量合法，且该物品还未持有，并且角色的包裹还剩空间容纳
      Player.items.push({
        id: id,
        count: number
      })
    }
  },
  // 变更某个物品的持有量 -- 物品id，增加或减少数值
  changeItemCount (id, number) {
    number = Number(number) || 0
    let itemInfo = ItemCtrl.findItemInfoById(id)
    let hasIndex = this.hasItem(id)

    if (id && hasIndex > -1 && itemInfo) {
      // id合法并且确实已持有该物品，也已找到对应的物品信息
      if (number > 0) {
        // 增加物品持有量，超过携带量上限的部分需要折算为金币
        if (Player.items[hasIndex].count + number > itemInfo.maxCount) {
          // 超过携带上限
          let overCount = Player.items[hasIndex].count + number - itemInfo.maxCount
          this.changeGold(overCount * itemInfo.sell)
          Player.items[hasIndex].count = itemInfo.maxCount
        } else {
          // 未超过携带上限
          Player.items[hasIndex].count += number
        }
      } else {
        // 减少物品持有量，减完的情况需要去掉物品持有
        Player.items[hasIndex].count += number
        if (Player.items[hasIndex].count <= 0) {
          // 物品持有量已用光，去掉物品
          Player.items.splice(hasIndex, 1)
        }
      }
    }
  },
  // 获取所有当前持有物品的详情 --
  getAllItemsInfo () {
    let details = []

    for (let i = 0; i < Player.items.length; i++) {
      let itemInfo = ItemCtrl.findItemInfoById(Player.items[i].id)

      if (itemInfo) {
        itemInfo.count = Player.items[i].count
        details.push(itemInfo)
      }
    }

    return details
  },
  // 清除所有当前持有物品 --
  clearAllItems () {
    Player.items = []
  },
  // 使用物品 -- 物品id
  useItem (id) {
    if (id && this.hasItem(id) > -1) {
      // 扣减物品数量
      this.changeItemCount(id, -1)

      // 结算效果
      switch (id) {
        case '01':
          // 体力药剂
          let recoverHp = Math.round(Player.maxHp * 0.2)
          this.changeHp(recoverHp)
          break
        case '02':
          // 能量药剂
          const recoverEg = 30
          this.changeEg(recoverEg)
          break
        case '03':
          // 力量药剂 TODO
          break
        case '04':
          // 无敌药剂 TODO
          break
        default:
          // 无匹配的物品，不执行任何操作
      }
    }
  },
  // 摧毁武器或者装备 -- 摧毁部位type值
  // 部位type值包括 weapon, head, body, hand, leg
  destroyPlayerEquipment (type) {
    switch (type) {
      case 'weapon':
        Player.equipments.weapon = {
          id: '',
          quality: '',
          duration: 0
        }
        break
      case 'head':
        Player.equipments.head = {
          id: '',
          quality: '',
          duration: 0
        }
        break
      case 'body':
        Player.equipments.body = {
          id: '',
          quality: '',
          duration: 0
        }
        break
      case 'hand':
        Player.equipments.hand = {
          id: '',
          quality: '',
          duration: 0
        }
        break
      case 'leg':
        Player.equipments.leg = {
          id: '',
          quality: '',
          duration: 0
        }
        break
      default:
        // 错误情况，不处理
    }
    this.refreshAbility()
  },
  // 变更所有装备耐久度 -- 变更的耐久度值
  changeArmorDuration (duration) {
    duration = parseInt(Number(duration)) || 0

    this.changeDuration('head', duration)
    this.changeDuration('body', duration)
    this.changeDuration('hand', duration)
    this.changeDuration('leg', duration)
  },
  // 充满武器或者装备耐久度 -- 变更部位type值
  // 部位type值包括 weapon, head, body, hand, leg
  fullDuration (type) {
    switch (type) {
      case 'weapon':
        if (Player.equipments.weapon.id) {
          // 存在武器，变更对应的耐久度
          let weaponInfo = EquipmentCtrl.findWeaponInfoById(Player.equipments.weapon.id)
          Player.equipments.weapon.duration = weaponInfo.duration
        }
        break
      case 'head':
        if (Player.equipments.head.id) {
          // 存在装备，变更对应的耐久度
          let headInfo = EquipmentCtrl.findHeadInfoById(Player.equipments.head.id)
          Player.equipments.head.duration = headInfo.duration
        }
        break
      case 'body':
        if (Player.equipments.body.id) {
          // 存在装备，变更对应的耐久度
          let bodyInfo = EquipmentCtrl.findBodyInfoById(Player.equipments.body.id)
          Player.equipments.body.duration = bodyInfo.duration
        }
        break
      case 'hand':
        if (Player.equipments.hand.id) {
          // 存在装备，变更对应的耐久度
          let handInfo = EquipmentCtrl.findHandInfoById(Player.equipments.hand.id)
          Player.equipments.hand.duration = handInfo.duration
        }
        break
      case 'leg':
        if (Player.equipments.leg.id) {
          // 存在装备，变更对应的耐久度
          let legInfo = EquipmentCtrl.findLegInfoById(Player.equipments.leg.id)
          Player.equipments.leg.duration = legInfo.duration
        }
        break
      default:
        // 错误情况，不处理
    }
    this.refreshAbility()
  },
  // 变更角色武器/装备耐久度 -- 变更部位type值, 变更的耐久度值
  // 部位type值包括 weapon, head, body, hand, leg
  changeDuration (type, duration) {
    duration = parseInt(Number(duration)) || 0

    switch (type) {
      case 'weapon':
        if (Player.equipments.weapon.id) {
          // 存在武器，变更对应的耐久度
          Player.equipments.weapon.duration += duration
          let weaponInfo = EquipmentCtrl.findWeaponInfoById(Player.equipments.weapon.id)
          if (Player.equipments.weapon.duration < 0) {
            Player.equipments.weapon.duration = 0
          } else if (Player.equipments.weapon.duration > weaponInfo.duration) {
            Player.equipments.weapon.duration = weaponInfo.duration
          }
        }
        break
      case 'head':
        if (Player.equipments.head.id) {
          // 存在装备，变更对应的耐久度
          Player.equipments.head.duration += duration
          let headInfo = EquipmentCtrl.findHeadInfoById(Player.equipments.head.id)
          if (Player.equipments.head.duration < 0) {
            Player.equipments.head.duration = 0
          } else if (Player.equipments.head.duration > headInfo.duration) {
            Player.equipments.head.duration = headInfo.duration
          }
        }
        break
      case 'body':
        if (Player.equipments.body.id) {
          // 存在装备，变更对应的耐久度
          Player.equipments.body.duration += duration
          let bodyInfo = EquipmentCtrl.findBodyInfoById(Player.equipments.body.id)
          if (Player.equipments.body.duration < 0) {
            Player.equipments.body.duration = 0
          } else if (Player.equipments.body.duration > bodyInfo.duration) {
            Player.equipments.body.duration = bodyInfo.duration
          }
        }
        break
      case 'hand':
        if (Player.equipments.hand.id) {
          // 存在装备，变更对应的耐久度
          Player.equipments.hand.duration += duration
          let handInfo = EquipmentCtrl.findHandInfoById(Player.equipments.hand.id)
          if (Player.equipments.hand.duration < 0) {
            Player.equipments.hand.duration = 0
          } else if (Player.equipments.hand.duration > handInfo.duration) {
            Player.equipments.hand.duration = handInfo.duration
          }
        }
        break
      case 'leg':
        if (Player.equipments.leg.id) {
          // 存在装备，变更对应的耐久度
          Player.equipments.leg.duration += duration
          let legInfo = EquipmentCtrl.findLegInfoById(Player.equipments.leg.id)
          if (Player.equipments.leg.duration < 0) {
            Player.equipments.leg.duration = 0
          } else if (Player.equipments.leg.duration > legInfo.duration) {
            Player.equipments.leg.duration = legInfo.duration
          }
        }
        break
      default:
        // 错误情况，不处理
    }
    this.refreshAbility()
  },

  // 获取当前所有装备提供的增益 --
  // NOTE: 耐久度为0的武器或装备无法提供任何增益！
  getAllProvides () {
    let proPower = 0
    let proDefence = 0
    let proAgility = 0
    // 结算武器增益
    if (Player.equipments.weapon.id && Player.equipments.weapon.duration > 0) {
      let weaponInfo = EquipmentCtrl.findWeaponInfoById(Player.equipments.weapon.id)

      if (Player.equipments.weapon.quality === 'e') {
        // 传说品质，1.5倍增益
        proPower += Math.floor(1.5 * weaponInfo.provide[0])
        proDefence += Math.floor(1.5 * weaponInfo.provide[1])
        proAgility += Math.floor(1.5 * weaponInfo.provide[2])
      } else if (Player.equipments.weapon.quality === 'g') {
        // 优良品质，1.2倍增益
        proPower += Math.floor(1.2 * weaponInfo.provide[0])
        proDefence += Math.floor(1.2 * weaponInfo.provide[1])
        proAgility += Math.floor(1.2 * weaponInfo.provide[2])
      } else {
        // 普通品质，1倍增益
        proPower += weaponInfo.provide[0]
        proDefence += weaponInfo.provide[1]
        proAgility += weaponInfo.provide[2]
      }
    }
    // 结算头部装备增益
    if (Player.equipments.head.id && Player.equipments.head.duration > 0) {
      let headInfo = EquipmentCtrl.findHeadInfoById(Player.equipments.head.id)

      if (Player.equipments.head.quality === 'e') {
        // 传说品质，1.5倍增益
        proPower += Math.floor(1.5 * headInfo.provide[0])
        proDefence += Math.floor(1.5 * headInfo.provide[1])
        proAgility += Math.floor(1.5 * headInfo.provide[2])
      } else if (Player.equipments.head.quality === 'g') {
        // 优良品质，1.2倍增益
        proPower += Math.floor(1.2 * headInfo.provide[0])
        proDefence += Math.floor(1.2 * headInfo.provide[1])
        proAgility += Math.floor(1.2 * headInfo.provide[2])
      } else {
        // 普通品质，1倍增益
        proPower += headInfo.provide[0]
        proDefence += headInfo.provide[1]
        proAgility += headInfo.provide[2]
      }
    }
    // 结算身体部装备增益
    if (Player.equipments.body.id && Player.equipments.body.duration > 0) {
      let bodyInfo = EquipmentCtrl.findBodyInfoById(Player.equipments.body.id)

      if (Player.equipments.body.quality === 'e') {
        // 传说品质，1.5倍增益
        proPower += Math.floor(1.5 * bodyInfo.provide[0])
        proDefence += Math.floor(1.5 * bodyInfo.provide[1])
        proAgility += Math.floor(1.5 * bodyInfo.provide[2])
      } else if (Player.equipments.body.quality === 'g') {
        // 优良品质，1.2倍增益
        proPower += Math.floor(1.2 * bodyInfo.provide[0])
        proDefence += Math.floor(1.2 * bodyInfo.provide[1])
        proAgility += Math.floor(1.2 * bodyInfo.provide[2])
      } else {
        // 普通品质，1倍增益
        proPower += bodyInfo.provide[0]
        proDefence += bodyInfo.provide[1]
        proAgility += bodyInfo.provide[2]
      }
    }
    // 结算手部装备增益
    if (Player.equipments.hand.id && Player.equipments.hand.duration > 0) {
      let handInfo = EquipmentCtrl.findHandInfoById(Player.equipments.hand.id)

      if (Player.equipments.hand.quality === 'e') {
        // 传说品质，1.5倍增益
        proPower += Math.floor(1.5 * handInfo.provide[0])
        proDefence += Math.floor(1.5 * handInfo.provide[1])
        proAgility += Math.floor(1.5 * handInfo.provide[2])
      } else if (Player.equipments.hand.quality === 'g') {
        // 优良品质，1.2倍增益
        proPower += Math.floor(1.2 * handInfo.provide[0])
        proDefence += Math.floor(1.2 * handInfo.provide[1])
        proAgility += Math.floor(1.2 * handInfo.provide[2])
      } else {
        // 普通品质，1倍增益
        proPower += handInfo.provide[0]
        proDefence += handInfo.provide[1]
        proAgility += handInfo.provide[2]
      }
    }
    // 结算腿部装备增益
    if (Player.equipments.leg.id && Player.equipments.leg.duration > 0) {
      let legInfo = EquipmentCtrl.findLegInfoById(Player.equipments.leg.id)

      if (Player.equipments.leg.quality === 'e') {
        // 传说品质，1.5倍增益
        proPower += Math.floor(1.5 * legInfo.provide[0])
        proDefence += Math.floor(1.5 * legInfo.provide[1])
        proAgility += Math.floor(1.5 * legInfo.provide[2])
      } else if (Player.equipments.leg.quality === 'g') {
        // 优良品质，1.2倍增益
        proPower += Math.floor(1.2 * legInfo.provide[0])
        proDefence += Math.floor(1.2 * legInfo.provide[1])
        proAgility += Math.floor(1.2 * legInfo.provide[2])
      } else {
        // 普通品质，1倍增益
        proPower += legInfo.provide[0]
        proDefence += legInfo.provide[1]
        proAgility += legInfo.provide[2]
      }
    }

    return {
      power: proPower,
      defence: proDefence,
      agility: proAgility
    }
  }
}
