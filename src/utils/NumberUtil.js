// this util module is about to provide number support utils

export default {
  // random函数 -- [随机数上限值]，[随机数下限值]
  random (diceLimit, diceBase) {
    // 修正值，起始点默认为0，最高点默认为9
    diceLimit ? diceLimit = parseInt(diceLimit) : diceLimit = 9
    diceBase ? diceBase = parseInt(diceBase) : diceBase = 0
    // 若起始点比最高点还高的情况，修正为起始点等于最高点
    diceBase > diceLimit ? diceBase = diceLimit : diceBase

    let diceEnd = diceLimit - diceBase + 1

    let myRoll = Math.floor(Math.random() * diceEnd) + diceBase
    return myRoll
  },

  // 多随机数生成函数 -- [生成几个随机数], [随机数上限值]，[随机数下限值], [是否允许重复]
  multiRandom (diceNum, diceLimit, diceBase, isDuplicate) {
    // 修正值，默认生成2个随机数，起始点默认为0，最高点默认为9，默认不允许重复
    diceNum ? diceNum = parseInt(diceNum) : diceNum = 2
    diceLimit ? diceLimit = parseInt(diceLimit) : diceLimit = 9
    diceBase ? diceBase = parseInt(diceBase) : diceBase = 0
    isDuplicate ? isDuplicate = true : isDuplicate = false

    let generatedDices = []

    for (let i = 0; i < diceNum; i++) {
      // 循环生成随机数
      let dice = this.random(diceLimit, diceBase)
      if (!isDuplicate && generatedDices.indexOf(dice) !== -1) {
        // 不允许重复，而且已经确定重复的情况
        // 不加入结果，撤销自增
        i--
      } else {
        // 合法的dice，放入数组
        generatedDices.push(dice)
      }
    }

    // 测试检验用，看生成的dice数量是否达标
    if (generatedDices.length !== diceNum) {
      console.warn('Error: wrong random result counts in NumberUtil-multiRandom')
    }

    return generatedDices
  },

  // 根据力量计算伤害值 -- 力量值
  calcDamage (power) {
    power = Number(power) || 0

    if (power > 0) {
      // NOTE: 最终伤害值 = 力量 x 放大系数 + (-放大系数 x 进一(力量 / 10) ~ +放大系数 x 进一(力量 / 10))
      const div = 2  // 伤害放大系数
      let shakeDamage = div * Math.ceil(power / 10)
      // 浮动伤害增加或者减少各占50%几率
      if (this.random(1) > 0) {
        shakeDamage = -1 * shakeDamage
      }
      let damage = power * div + shakeDamage

      return damage
    } else {
      return 0
    }
  },

  // 根据体力计算HP -- 体力值
  calcHP (defence) {
    defence = Number(defence) || 0

    if (defence > 0) {
      // NOTE: 最终HP值 = 基本HP + 取整(体力 x 放大系数)
      const baseHp = 60
      const div = 3.2
      let hp = baseHp + Math.floor(defence * div)

      return hp
    } else {
      return 0
    }
  },

  // 根据敏捷计算闪避 -- 敏捷值
  // NOTE: 最终返回的是闪避千分比的分子部分，例如 101‰ 返回101
  calcDodge (agility) {
    agility = Number(agility) || 0

    if (agility > 0) {
      // NOTE: 最终闪避千分比分子 = 基本闪避 + 敏捷
      const baseDodge = 100
      let dodge = baseDodge + agility

      return dodge
    } else {
      return 0
    }
  }
}
