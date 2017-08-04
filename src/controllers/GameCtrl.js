
import eventBus from '../EventBus'
import Enemy from '../models/Enemy'
import Player from '../models/Player'
import System from '../models/System'
import NumberUtil from '../utils/NumberUtil'
import CodeUtil from '../utils/CodeUtil'
import enemyImage0 from '../assets/enemy_0.gif'
import enemyImage1 from '../assets/enemy_1.gif'
import PlayerCtrl from '../controllers/PlayerCtrl'
import ItemCtrl from '../controllers/ItemCtrl'
import EquipmentCtrl from '../controllers/EquipmentCtrl'

const enemyImageArray = [
  enemyImage0, enemyImage1
]

export default {
  // 生成游戏存档代码
  // 代码示例 ""!
  // 前3位代码共计6位数字代表当前金币数值
  // 第4位代码共计2位数字代表当前角色职业
  // 第5位代码共计2位数字代表当前角色可用技能点
  // 第6位代码共计2位数字代表当前角色已用技能点增加的力量值power
  // 第7位代码共计2位数字代表当前角色已用技能点增加的体力值defence
  // 第8位代码共计2位数字代表当前角色已用技能点增加的敏捷值agility
  // 第9-10位代码共计4位数字代表包裹里第一类物品，前两位数字代表物品id，后两位数字代表数量（无物品以00代表id及数量）
  // 第11-12位代码共计4位数字代表包裹里第二类物品，前两位数字代表物品id，后两位数字代表数量（无物品以00代表id及数量）
  // 第13-14位代码共计4位数字代表包裹里第三类物品，前两位数字代表物品id，后两位数字代表数量（无物品以00代表id及数量）
  // 第15-16位代码共计4位数字代表包裹里第四类物品，前两位数字代表物品id，后两位数字代表数量（无物品以00代表id及数量）
  // 第17-18位代码共计4位数字代表包裹里第五类物品，前两位数字代表物品id，后两位数字代表数量（无物品以00代表id及数量）
  // 第19位代码共计2位数字代表当前角色装备的武器id（无武器以00数字代表）
  // 第20-21位共计4位数字包含武器的品质以及剩余耐久度信息。例如 3100 代表武器品质为传说品质，剩余耐久度100。其中此4位数第一位代表品质（0-无品质，1-普通，2-优良，3-传说），后三位数字可容纳最高999的剩余耐久度
  // 第22位代码共计2位数字代表当前角色装备的头部装备id（无装备以00数字代表）
  // 第23-24位共计4位数字包含头部装备的品质以及剩余耐久度信息。设计同武器一样
  // 第25位代码共计2位数字代表当前角色装备的身体部装备id（无装备以00数字代表）
  // 第26-27位共计4位数字包含身体部装备的品质以及剩余耐久度信息。设计同武器一样
  // 第28位代码共计2位数字代表当前角色装备的手部装备id（无装备以00数字代表）
  // 第29-30位共计4位数字包含手部装备的品质以及剩余耐久度信息。设计同武器一样
  // 第31位代码共计2位数字代表当前角色装备的腿部装备id（无装备以00数字代表）
  // 第32-33位共计4位数字包含腿部装备的品质以及剩余耐久度信息。设计同武器一样
  saveGame () {
    let rawCodeStr = ''

    let goldStr = Player.gold + ''
    // 补全金币数字到6位数，例如100 ==》 000100
    goldStr = CodeUtil.fixStr(goldStr, 6)
    rawCodeStr += goldStr

    let careerStr = Player.career + ''
    rawCodeStr += careerStr

    let pointStr = Player.availablePoint + ''
    pointStr = CodeUtil.fixStr(pointStr, 2)
    rawCodeStr += pointStr

    let powerStr = Player.extraPower + ''
    powerStr = CodeUtil.fixStr(powerStr, 2)
    rawCodeStr += powerStr
    let defenceStr = Player.extraDefence + ''
    defenceStr = CodeUtil.fixStr(defenceStr, 2)
    rawCodeStr += defenceStr
    let agilityStr = Player.extraAgility + ''
    agilityStr = CodeUtil.fixStr(agilityStr, 2)
    rawCodeStr += agilityStr

    if (Player.items && Player.items[0]) {
      let itemIdStr = Player.items[0].id + ''
      let itemCountStr = Player.items[0].count + ''
      itemCountStr = CodeUtil.fixStr(itemCountStr, 2)
      rawCodeStr += itemIdStr + itemCountStr
    } else {
      rawCodeStr += '0000'
    }
    if (Player.items && Player.items[1]) {
      let itemIdStr = Player.items[1].id + ''
      let itemCountStr = Player.items[1].count + ''
      itemCountStr = CodeUtil.fixStr(itemCountStr, 2)
      rawCodeStr += itemIdStr + itemCountStr
    } else {
      rawCodeStr += '0000'
    }
    if (Player.items && Player.items[2]) {
      let itemIdStr = Player.items[2].id + ''
      let itemCountStr = Player.items[2].count + ''
      itemCountStr = CodeUtil.fixStr(itemCountStr, 2)
      rawCodeStr += itemIdStr + itemCountStr
    } else {
      rawCodeStr += '0000'
    }
    if (Player.items && Player.items[3]) {
      let itemIdStr = Player.items[3].id + ''
      let itemCountStr = Player.items[3].count + ''
      itemCountStr = CodeUtil.fixStr(itemCountStr, 2)
      rawCodeStr += itemIdStr + itemCountStr
    } else {
      rawCodeStr += '0000'
    }
    if (Player.items && Player.items[4]) {
      let itemIdStr = Player.items[4].id + ''
      let itemCountStr = Player.items[4].count + ''
      itemCountStr = CodeUtil.fixStr(itemCountStr, 2)
      rawCodeStr += itemIdStr + itemCountStr
    } else {
      rawCodeStr += '0000'
    }

    // 处理武器，装备信息
    let weaponStr = ''
    if (Player.equipments.weapon.id) {
      // 有武器
      weaponStr += Player.equipments.weapon.id
      weaponStr += CodeUtil.getQualityNumberStr(Player.equipments.weapon.quality)
      weaponStr += CodeUtil.fixStr(Player.equipments.weapon.duration + '', 3)
    } else {
      // 无武器
      weaponStr = '000000'
    }
    rawCodeStr += weaponStr
    let headStr = ''
    if (Player.equipments.head.id) {
      // 有头部装备
      headStr += Player.equipments.head.id
      headStr += CodeUtil.getQualityNumberStr(Player.equipments.head.quality)
      headStr += CodeUtil.fixStr(Player.equipments.head.duration + '', 3)
    } else {
      // 无头部装备
      headStr = '000000'
    }
    rawCodeStr += headStr
    let bodyStr = ''
    if (Player.equipments.body.id) {
      // 有身体部位装备
      bodyStr += Player.equipments.body.id
      bodyStr += CodeUtil.getQualityNumberStr(Player.equipments.body.quality)
      bodyStr += CodeUtil.fixStr(Player.equipments.body.duration + '', 3)
    } else {
      // 无身体部位装备
      bodyStr = '000000'
    }
    rawCodeStr += bodyStr
    let handStr = ''
    if (Player.equipments.hand.id) {
      // 有手部装备
      handStr += Player.equipments.hand.id
      handStr += CodeUtil.getQualityNumberStr(Player.equipments.hand.quality)
      handStr += CodeUtil.fixStr(Player.equipments.hand.duration + '', 3)
    } else {
      // 无手部装备
      handStr = '000000'
    }
    rawCodeStr += handStr
    let legStr = ''
    if (Player.equipments.leg.id) {
      // 有腿部装备
      legStr += Player.equipments.leg.id
      legStr += CodeUtil.getQualityNumberStr(Player.equipments.leg.quality)
      legStr += CodeUtil.fixStr(Player.equipments.leg.duration + '', 3)
    } else {
      // 无腿部装备
      legStr = '000000'
    }
    rawCodeStr += legStr
    // TODO

    let finalCode = CodeUtil.encode(rawCodeStr)

    console.log('最终的加密代码：', finalCode)
    return finalCode
  },

  // 加载游戏 -- 游戏代码
  // 代码示例 ""!
  // 前3位代码共计6位数字代表当前金币数值
  // 第4位代码共计2位数字代表当前角色职业
  // 第5位代码共计2位数字代表当前角色可用技能点
  // 第6位代码共计2位数字代表当前角色已用技能点增加的力量值power
  // 第7位代码共计2位数字代表当前角色已用技能点增加的体力值defence
  // 第8位代码共计2位数字代表当前角色已用技能点增加的敏捷值agility
  // 第9-10位代码共计4位数字代表包裹里第一类物品，前两位数字代表物品id，后两位数字代表数量（无物品以00代表id及数量）
  // 第11-12位代码共计4位数字代表包裹里第二类物品，前两位数字代表物品id，后两位数字代表数量（无物品以00代表id及数量）
  // 第13-14位代码共计4位数字代表包裹里第三类物品，前两位数字代表物品id，后两位数字代表数量（无物品以00代表id及数量）
  // 第15-16位代码共计4位数字代表包裹里第四类物品，前两位数字代表物品id，后两位数字代表数量（无物品以00代表id及数量）
  // 第17-18位代码共计4位数字代表包裹里第五类物品，前两位数字代表物品id，后两位数字代表数量（无物品以00代表id及数量）
  // 第19位代码共计2位数字代表当前角色装备的武器id（无武器以00数字代表）
  // 第20-21位共计4位数字包含武器的品质以及剩余耐久度信息。例如 3100 代表武器品质为传说品质，剩余耐久度100。其中此4位数第一位代表品质（0-无品质，1-普通，2-优良，3-传说），后三位数字可容纳最高999的剩余耐久度
  // 第22位代码共计2位数字代表当前角色装备的头部装备id（无装备以00数字代表）
  // 第23-24位共计4位数字包含头部装备的品质以及剩余耐久度信息。设计同武器一样
  // 第25位代码共计2位数字代表当前角色装备的身体部装备id（无装备以00数字代表）
  // 第26-27位共计4位数字包含身体部装备的品质以及剩余耐久度信息。设计同武器一样
  // 第28位代码共计2位数字代表当前角色装备的手部装备id（无装备以00数字代表）
  // 第29-30位共计4位数字包含手部装备的品质以及剩余耐久度信息。设计同武器一样
  // 第31位代码共计2位数字代表当前角色装备的腿部装备id（无装备以00数字代表）
  // 第32-33位共计4位数字包含腿部装备的品质以及剩余耐久度信息。设计同武器一样
  loadGame (code) {
    // 转义金币数
    let goldStr = code.substr(0, 3)
    let finalGold = CodeUtil.decode(goldStr)
    finalGold = Number(finalGold)
    Player.gold = finalGold
    console.log('最终转义出来的gold：', finalGold)

    // 转义角色职业
    let careerStr = code.substr(3, 1)
    let finalCareer = CodeUtil.decode(careerStr)
    Player.career = finalCareer
    console.log('最终转义出来的career：', finalCareer)

    // 转义角色可用技能点
    let pointStr = code.substr(4, 1)
    let finalPoint = CodeUtil.decode(pointStr)
    finalPoint = Number(finalPoint)
    Player.availablePoint = finalPoint
    console.log('最终转义出来的point：', finalPoint)

    // 转义角色已使用技能点增加的力量power,体力defence，敏捷agility
    let powerStr = code.substr(5, 1)
    let finalPower = CodeUtil.decode(powerStr)
    finalPower = Number(finalPower)
    Player.extraPower = finalPower
    console.log('最终转义出来的extra power：', finalPower)
    let defenceStr = code.substr(6, 1)
    let finalDefence = CodeUtil.decode(defenceStr)
    finalDefence = Number(finalDefence)
    Player.extraDefence = finalDefence
    console.log('最终转义出来的extra defence：', finalDefence)
    let agilityStr = code.substr(7, 1)
    let finalAgility = CodeUtil.decode(agilityStr)
    finalAgility = Number(finalAgility)
    Player.extraAgility = finalAgility
    console.log('最终转义出来的extra agility：', finalAgility)

    // 转义包裹物品
    Player.items = []
    let item1 = code.substr(8, 1)
    item1 = CodeUtil.decode(item1)
    if (item1 !== '00') {
      Player.items.push({
        id: item1,
        count: Number(CodeUtil.decode(code.substr(9, 1)))
      })
    }
    let item2 = code.substr(10, 1)
    item2 = CodeUtil.decode(item2)
    if (item2 !== '00') {
      Player.items.push({
        id: item2,
        count: Number(CodeUtil.decode(code.substr(11, 1)))
      })
    }
    let item3 = code.substr(12, 1)
    item3 = CodeUtil.decode(item3)
    if (item3 !== '00') {
      Player.items.push({
        id: item3,
        count: Number(CodeUtil.decode(code.substr(13, 1)))
      })
    }
    let item4 = code.substr(14, 1)
    item4 = CodeUtil.decode(item4)
    if (item4 !== '00') {
      Player.items.push({
        id: item4,
        count: Number(CodeUtil.decode(code.substr(15, 1)))
      })
    }
    let item5 = code.substr(16, 1)
    item5 = CodeUtil.decode(item5)
    if (item5 !== '00') {
      Player.items.push({
        id: item5,
        count: Number(CodeUtil.decode(code.substr(17, 1)))
      })
    }

    // 转义武器信息
    let weaponStr = code.substr(18, 3)
    let weapon = CodeUtil.decode(weaponStr)
    if (weapon === '000000') {
      PlayerCtrl.destroyPlayerEquipment('weapon')
    } else {
      Player.equipments.weapon = {
        id: weapon.substr(0, 2),
        quality: CodeUtil.getQualityStr(weapon.substr(2, 1)),
        duration: parseInt(weapon.substr(3, 3))
      }
    }
    // 转义头部信息
    let headStr = code.substr(21, 3)
    let head = CodeUtil.decode(headStr)
    if (head === '000000') {
      PlayerCtrl.destroyPlayerEquipment('head')
    } else {
      Player.equipments.head = {
        id: head.substr(0, 2),
        quality: CodeUtil.getQualityStr(head.substr(2, 1)),
        duration: parseInt(head.substr(3, 3))
      }
    }
    // 转义身体部位信息
    let bodyStr = code.substr(24, 3)
    let body = CodeUtil.decode(bodyStr)
    if (body === '000000') {
      PlayerCtrl.destroyPlayerEquipment('body')
    } else {
      Player.equipments.body = {
        id: body.substr(0, 2),
        quality: CodeUtil.getQualityStr(body.substr(2, 1)),
        duration: parseInt(body.substr(3, 3))
      }
    }
    // 转义手部信息
    let handStr = code.substr(27, 3)
    let hand = CodeUtil.decode(handStr)
    if (hand === '000000') {
      PlayerCtrl.destroyPlayerEquipment('hand')
    } else {
      Player.equipments.hand = {
        id: hand.substr(0, 2),
        quality: CodeUtil.getQualityStr(hand.substr(2, 1)),
        duration: parseInt(hand.substr(3, 3))
      }
    }
    // 转义腿部信息
    let legStr = code.substr(30, 3)
    let leg = CodeUtil.decode(legStr)
    if (leg === '000000') {
      PlayerCtrl.destroyPlayerEquipment('leg')
    } else {
      Player.equipments.leg = {
        id: leg.substr(0, 2),
        quality: CodeUtil.getQualityStr(leg.substr(2, 1)),
        duration: parseInt(leg.substr(3, 3))
      }
    }
    // TODO
  },

  // 初始化游戏数据 --
  init () {
    PlayerCtrl.refreshAbility()
    PlayerCtrl.setMaxHp()
  },

  // 刷新游戏
  refreshGame () {
    PlayerCtrl.clearEg()
    PlayerCtrl.clearSp()
    this.refreshEnemies()
    eventBus.$emit('notifyRefreshActions')
  },

  // 刷新敌人
  refreshEnemies () {
    Enemy.currentIdx = 0
    Enemy.list = []

    for (let i = 0; i < 3; i++) {
      // NOTE: 第一个1/1概率，第二个1/2的概率，第三个1/3的概率
      let chance = NumberUtil.random(i + 1, 1)

      if (chance === 1) {
        let randomHp = NumberUtil.random(120, 80)
        let randomEg = NumberUtil.random(120, 80)
        Enemy.list.push({
          name: 'enemy ' + i,  // 名称
          image: enemyImageArray[NumberUtil.random(1)],  // 图片
          hp: randomHp,    // 体力
          maxHp: randomHp, // 体力上限
          eg: randomEg,    // 能量
          maxEg: randomEg,   // 能量上限
          sp: 0,    // 奥义
          maxSp: 100 // 奥义上限
        })
      }
    }

    console.log('生成的敌人信息', Enemy)
  },

  // 校验结果
  checkResult () {
    // 检验角色情况
    if (Player.hp <= 0) {
      // 当前角色力尽
      console.log('角色力尽')
      if (PlayerCtrl.hasItem('05') > -1) {
        // 角色身上有复活十字
        console.log('复活十字自动复活')
        PlayerCtrl.changeItemCount('05', -1)
        let recoverHp = Math.round(Player.maxHp * 0.5)
        PlayerCtrl.changeHp(recoverHp)
      } else {
        console.log('死亡惩罚')
        this.deathPunish()
      }
    } else {
      // 角色还未力尽
    }

    // 检验敌人情况
    let currentEnemy = Enemy.list[Enemy.currentIdx]
    if (currentEnemy.hp <= 0) {
      // 当前敌人已死亡
      if (Enemy.currentIdx < Enemy.list.length - 1) {
        // 还剩余其他的敌人
        Enemy.currentIdx++
      } else {
        // 已没有敌人剩下了，胜利
        console.log('胜利')
        this.loot(Enemy.list.length)
      }
    } else {
      // 当前敌人还未死亡
    }
  },

  // 力尽死亡惩罚 --
  deathPunish () {
    window.alert('你已经力尽...所有武器跟装备耐久度损失10%，损失10%金币')
    // 所有武器装备的耐久度降低10%
    if (Player.equipments.weapon.id) {
      let weaponInfo = EquipmentCtrl.findWeaponInfoById(Player.equipments.weapon.id)
      let reduceDuration = -1 * Math.round(weaponInfo.duration * 0.1)

      PlayerCtrl.changeDuration('weapon', reduceDuration)
    }
    if (Player.equipments.head.id) {
      let headInfo = EquipmentCtrl.findHeadInfoById(Player.equipments.head.id)
      let reduceDuration = -1 * Math.round(headInfo.duration * 0.1)

      PlayerCtrl.changeDuration('head', reduceDuration)
    }
    if (Player.equipments.body.id) {
      let bodyInfo = EquipmentCtrl.findBodyInfoById(Player.equipments.body.id)
      let reduceDuration = -1 * Math.round(bodyInfo.duration * 0.1)

      PlayerCtrl.changeDuration('body', reduceDuration)
    }
    if (Player.equipments.hand.id) {
      let handInfo = EquipmentCtrl.findHandInfoById(Player.equipments.hand.id)
      let reduceDuration = -1 * Math.round(handInfo.duration * 0.1)

      PlayerCtrl.changeDuration('hand', reduceDuration)
    }
    if (Player.equipments.leg.id) {
      let legInfo = EquipmentCtrl.findLegInfoById(Player.equipments.leg.id)
      let reduceDuration = -1 * Math.round(legInfo.duration * 0.1)

      PlayerCtrl.changeDuration('leg', reduceDuration)
    }

    // 当前金币数量损失10%
    let reduceGold = -1 * Math.round(Player.gold * 0.1)
    PlayerCtrl.changeGold(reduceGold)

    // 力尽后必须恢复体力，恢复体力需要使用金币恢复。扣除的金币数量等于当前体力上限值
    let rebornGold = Player.maxHp
    if (Player.gold < rebornGold) {
      // 金币不足以恢复体力，金币不足的情况下，除扣除所有金币外，永久损坏身上任意部位一件武器或者装备
      PlayerCtrl.changeGold(-1 * Player.gold)
      if (Player.equipments.weapon.id) {
        // 有武器，摧毁武器
        PlayerCtrl.destroyPlayerEquipment('weapon')
      } else if (Player.equipments.head.id) {
        // 有头部装备，摧毁
        PlayerCtrl.destroyPlayerEquipment('head')
      } else if (Player.equipments.body.id) {
        // 有身体部装备，摧毁
        PlayerCtrl.destroyPlayerEquipment('body')
      } else if (Player.equipments.hand.id) {
        // 有手部装备，摧毁
        PlayerCtrl.destroyPlayerEquipment('hand')
      } else if (Player.equipments.leg.id) {
        // 有腿部装备，摧毁
        PlayerCtrl.destroyPlayerEquipment('leg')
      }
    } else {
      // 金币足够恢复体力
      PlayerCtrl.changeGold(-1 * rebornGold)
      window.alert('恢复体力消耗了你' + rebornGold + 'G')
    }
    PlayerCtrl.reborn()
    // 以失败方式进入结算界面
    eventBus.$emit('notifyEndTurn', false)
  },

  // 获取战利品 -- [敌人数量]
  loot (enemyCount) {
    // 战胜敌人可以获得战利品金币，概率获得武器装备，物品等，小概率获得技能点奖励
    enemyCount = Number(enemyCount) || 1
    let loots = []

    let goldLimit = 30 * enemyCount
    let goldBase = 10 * enemyCount
    // 根据敌人数量来计算掉落，越多敌人会掉落更多金币，拥有更高几率获取更多，更好的武器装备跟物品
    let lootGold = NumberUtil.random(goldLimit, goldBase)
    loots.push({
      type: 'gold',
      name: '金币',
      number: lootGold
    })

    let lootPoint = ''
    let lootItems = []
    let lootWeapon = ''
    let lootHead = ''
    let lootBody = ''
    let lootHand = ''
    let lootLeg = ''
    if (enemyCount >= 3) {
      // >= 3个敌人，可获取更好武器，装备，物品，以及技能点
      lootItems = ItemCtrl.getDropItems()
      // 1/15的概率获得武器
      if (NumberUtil.random(15, 1) === 1) {
        lootWeapon = EquipmentCtrl.getNewWeapon()
      }
      // 1/10的概率获得头部装备
      if (NumberUtil.random(10, 1) === 1) {
        lootHead = EquipmentCtrl.getNewHead()
      }
      // 1/10的概率获得身体装备
      if (NumberUtil.random(10, 1) === 1) {
        lootBody = EquipmentCtrl.getNewBody()
      }
      // 1/10的概率获得手部装备
      if (NumberUtil.random(10, 1) === 1) {
        lootHand = EquipmentCtrl.getNewHand()
      }
      // 1/10的概率获得腿部装备
      if (NumberUtil.random(10, 1) === 1) {
        lootLeg = EquipmentCtrl.getNewLeg()
      }
      // 1/100的概率获取技能点奖励 TODO
      if (NumberUtil.random(1, 1) === 1) {
        lootPoint = {
          type: 'point',
          name: '技能点',
          number: 1
        }
      }
    } else if (enemyCount > 1) {
      // 2个敌人，可获取武器，装备，物品
      lootItems = ItemCtrl.getDropItems()
      // 1/20的概率获得武器
      if (NumberUtil.random(20, 1) === 1) {
        lootWeapon = EquipmentCtrl.getNewWeapon()
      }
      // 1/15的概率获得头部装备
      if (NumberUtil.random(15, 1) === 1) {
        lootHead = EquipmentCtrl.getNewHead()
      }
      // 1/15的概率获得身体装备
      if (NumberUtil.random(15, 1) === 1) {
        lootBody = EquipmentCtrl.getNewBody()
      }
      // 1/15的概率获得手部装备
      if (NumberUtil.random(15, 1) === 1) {
        lootHand = EquipmentCtrl.getNewHand()
      }
      // 1/15的概率获得腿部装备
      if (NumberUtil.random(15, 1) === 1) {
        lootLeg = EquipmentCtrl.getNewLeg()
      }
    } else {
      // 1个敌人，可获取物品
      lootItems = ItemCtrl.getDropItems()
    }

    // 处理掉落的技能点
    if (lootPoint) {
      loots.push(lootPoint)
    }

    // 处理掉落的物品
    if (lootItems.length) {
      for (let i = 0; i < lootItems.length; i++) {
        loots.push(lootItems[i])
      }
    }

    if (lootWeapon) {
      // 获得了新武器
      lootWeapon.type = 'weapon'
      lootWeapon.number = 1
      loots.push(lootWeapon)
    }
    if (lootHead) {
      // 获得了新头部装备
      lootHead.type = 'head'
      lootHead.number = 1
      loots.push(lootHead)
    }
    if (lootBody) {
      // 获得了新身体装备
      lootBody.type = 'body'
      lootBody.number = 1
      loots.push(lootBody)
    }
    if (lootHand) {
      // 获得了新手部装备
      lootHand.type = 'hand'
      lootHand.number = 1
      loots.push(lootHand)
    }
    if (lootLeg) {
      // 获得了新腿部装备
      lootLeg.type = 'leg'
      lootLeg.number = 1
      loots.push(lootLeg)
    }
    console.log('获取的战利品:', loots)

    eventBus.$emit('notifyShowLoots', loots)
  },

  // 刷新商店售卖物品列表 --
  refreshStoreItems () {
    System.storeItems = []

    let newItems = ItemCtrl.getStoreItems()
    System.storeItems = newItems
  }
}
