import Player from '../models/Player'
import Equipment from '../models/Equipment'
import NumberUtil from '../utils/NumberUtil'

export default {
  // 根据当前武器情况获取下个武器
  getNewWeapon () {
    let weaponIndex = 0
    // 首先根据当前武器情况决定获取的新武器情况，如果没有武器，则从第一个等级开始，如果有武器的情况，1/5的概率获取下一等级武器，4/5的概率仍然获取当前等级武器
    if (Player.equipments.weapon.id) {
      // 有武器
      if (NumberUtil.random(4) === 0) {
        // 获取下一等级武器
        let nowIndex = this.findWeaponIndexById(Player.equipments.weapon.id)
        let nextIndex = nowIndex + 1

        if (nextIndex < Equipment.weapon.length) {
          // 有更高等级武器
          weaponIndex = nextIndex
        } else {
          // 已无更高等级武器了
          weaponIndex = nowIndex
        }
      } else {
        // 仍获取当前等级武器
        weaponIndex = this.findWeaponIndexById(Player.equipments.weapon.id)
      }
    } else {
      // 无武器
      weaponIndex = 0
    }

    let weaponQuality = 'c'
    // 5/10概率获得普通品质，3/10概率获取优良品质，2/10概率获取传奇品质
    let randomQuality = NumberUtil.random(9)
    if (randomQuality <= 4) {
      // 普通品质
      weaponQuality = 'c'
    } else if (randomQuality <= 7) {
      // 优良品质
      weaponQuality = 'g'
    } else {
      // 传奇品质
      weaponQuality = 'e'
    }

    // 组装最终需要的武器信息并返回
    return {
      id: Equipment.weapon[weaponIndex].id,
      name: Equipment.weapon[weaponIndex].name,
      quality: weaponQuality,
      duration: Equipment.weapon[weaponIndex].duration
    }
  },

  // 根据武器id获取武器对应的索引值
  findWeaponIndexById (id) {
    if (id) {
      for (let i = 0; i < Equipment.weapon.length; i++) {
        if (Equipment.weapon[i].id === id) {
          // 找到了匹配的id的武器
          return i
        }
      }
      // 循环完所有仍未找到匹配项
      return -1
    } else {
      return -1
    }
  },

  // 根据武器id获取武器信息
  findWeaponInfoById (id) {
    if (id) {
      let index = this.findWeaponIndexById(id)

      if (index > -1) {
        return {
          id: Equipment.weapon[index].id,
          name: Equipment.weapon[index].name,  // 名称
          description: Equipment.weapon[index].description,  // 描述
          provide: Equipment.weapon[index].provide,  // 提供的效果，按照顺序分别是力量，体力，敏捷
          duration: Equipment.weapon[index].duration,  // 最大耐久度
          sell: Equipment.weapon[index].sell  // 售卖金币
        }
      } else {
        // 未找到
        return ''
      }
    } else {
      return ''
    }
  },

  // 根据当前头部情况获取下个头部装备
  getNewHead () {
    let headIndex = 0
    // 首先根据当前头部情况决定获取的新头部装备情况，如果没有头部装备，则从第一个等级开始，如果有的情况，1/5的概率获取下一等级装备，4/5的概率仍然获取当前等级装备
    if (Player.equipments.head.id) {
      // 有装备
      if (NumberUtil.random(4) === 0) {
        // 获取下一等级装备
        let nowIndex = this.findHeadIndexById(Player.equipments.head.id)
        let nextIndex = nowIndex + 1

        if (nextIndex < Equipment.head.length) {
          // 有更高等级装备
          headIndex = nextIndex
        } else {
          // 已无更高等级装备了
          headIndex = nowIndex
        }
      } else {
        // 仍获取当前等级装备
        headIndex = this.findHeadIndexById(Player.equipments.head.id)
      }
    } else {
      // 无装备
      headIndex = 0
    }

    let headQuality = 'c'
    // 5/10概率获得普通品质，3/10概率获取优良品质，2/10概率获取传奇品质
    let randomQuality = NumberUtil.random(9)
    if (randomQuality <= 4) {
      // 普通品质
      headQuality = 'c'
    } else if (randomQuality <= 7) {
      // 优良品质
      headQuality = 'g'
    } else {
      // 传奇品质
      headQuality = 'e'
    }

    // 组装最终需要的装备信息并返回
    return {
      id: Equipment.head[headIndex].id,
      name: Equipment.head[headIndex].name,
      quality: headQuality,
      duration: Equipment.head[headIndex].duration
    }
  },

  // 根据头部装备id获取装备对应的索引值
  findHeadIndexById (id) {
    if (id) {
      for (let i = 0; i < Equipment.head.length; i++) {
        if (Equipment.head[i].id === id) {
          // 找到了匹配的id
          return i
        }
      }
      // 循环完所有仍未找到匹配项
      return -1
    } else {
      return -1
    }
  },

  // 根据头部装备id获取装备信息
  findHeadInfoById (id) {
    if (id) {
      let index = this.findHeadIndexById(id)

      if (index > -1) {
        return {
          id: Equipment.head[index].id,
          name: Equipment.head[index].name,  // 名称
          description: Equipment.head[index].description,  // 描述
          provide: Equipment.head[index].provide,  // 提供的效果，按照顺序分别是力量，体力，敏捷
          duration: Equipment.head[index].duration,  // 最大耐久度
          sell: Equipment.head[index].sell  // 售卖金币
        }
      } else {
        // 未找到
        return ''
      }
    } else {
      return ''
    }
  },

  // 根据当前身体情况获取下个身体装备
  getNewBody () {
    let bodyIndex = 0
    // 首先根据当前身体情况决定获取的新身体装备情况，如果没有身体装备，则从第一个等级开始，如果有的情况，1/5的概率获取下一等级装备，4/5的概率仍然获取当前等级装备
    if (Player.equipments.body.id) {
      // 有装备
      if (NumberUtil.random(4) === 0) {
        // 获取下一等级装备
        let nowIndex = this.findBodyIndexById(Player.equipments.body.id)
        let nextIndex = nowIndex + 1

        if (nextIndex < Equipment.body.length) {
          // 有更高等级装备
          bodyIndex = nextIndex
        } else {
          // 已无更高等级装备了
          bodyIndex = nowIndex
        }
      } else {
        // 仍获取当前等级装备
        bodyIndex = this.findBodyIndexById(Player.equipments.body.id)
      }
    } else {
      // 无装备
      bodyIndex = 0
    }

    let bodyQuality = 'c'
    // 5/10概率获得普通品质，3/10概率获取优良品质，2/10概率获取传奇品质
    let randomQuality = NumberUtil.random(9)
    if (randomQuality <= 4) {
      // 普通品质
      bodyQuality = 'c'
    } else if (randomQuality <= 7) {
      // 优良品质
      bodyQuality = 'g'
    } else {
      // 传奇品质
      bodyQuality = 'e'
    }

    // 组装最终需要的装备信息并返回
    return {
      id: Equipment.body[bodyIndex].id,
      name: Equipment.body[bodyIndex].name,
      quality: bodyQuality,
      duration: Equipment.body[bodyIndex].duration
    }
  },

  // 根据身体装备id获取装备对应的索引值
  findBodyIndexById (id) {
    if (id) {
      for (let i = 0; i < Equipment.body.length; i++) {
        if (Equipment.body[i].id === id) {
          // 找到了匹配的id
          return i
        }
      }
      // 循环完所有仍未找到匹配项
      return -1
    } else {
      return -1
    }
  },

  // 根据身体装备id获取装备信息
  findBodyInfoById (id) {
    if (id) {
      let index = this.findBodyIndexById(id)

      if (index > -1) {
        return {
          id: Equipment.body[index].id,
          name: Equipment.body[index].name,  // 名称
          description: Equipment.body[index].description,  // 描述
          provide: Equipment.body[index].provide,  // 提供的效果，按照顺序分别是力量，体力，敏捷
          duration: Equipment.body[index].duration,  // 最大耐久度
          sell: Equipment.body[index].sell  // 售卖金币
        }
      } else {
        // 未找到
        return ''
      }
    } else {
      return ''
    }
  },

  // 根据当前手部情况获取下个手部装备
  getNewHand () {
    let handIndex = 0
    // 首先根据当前手部情况决定获取的新手部装备情况，如果没有手部装备，则从第一个等级开始，如果有的情况，1/5的概率获取下一等级装备，4/5的概率仍然获取当前等级装备
    if (Player.equipments.hand.id) {
      // 有装备
      if (NumberUtil.random(4) === 0) {
        // 获取下一等级装备
        let nowIndex = this.findHandIndexById(Player.equipments.hand.id)
        let nextIndex = nowIndex + 1

        if (nextIndex < Equipment.hand.length) {
          // 有更高等级装备
          handIndex = nextIndex
        } else {
          // 已无更高等级装备了
          handIndex = nowIndex
        }
      } else {
        // 仍获取当前等级装备
        handIndex = this.findHandIndexById(Player.equipments.hand.id)
      }
    } else {
      // 无装备
      handIndex = 0
    }

    let handQuality = 'c'
    // 5/10概率获得普通品质，3/10概率获取优良品质，2/10概率获取传奇品质
    let randomQuality = NumberUtil.random(9)
    if (randomQuality <= 4) {
      // 普通品质
      handQuality = 'c'
    } else if (randomQuality <= 7) {
      // 优良品质
      handQuality = 'g'
    } else {
      // 传奇品质
      handQuality = 'e'
    }

    // 组装最终需要的装备信息并返回
    return {
      id: Equipment.hand[handIndex].id,
      name: Equipment.hand[handIndex].name,
      quality: handQuality,
      duration: Equipment.hand[handIndex].duration
    }
  },

  // 根据手部装备id获取装备对应的索引值
  findHandIndexById (id) {
    if (id) {
      for (let i = 0; i < Equipment.hand.length; i++) {
        if (Equipment.hand[i].id === id) {
          // 找到了匹配的id
          return i
        }
      }
      // 循环完所有仍未找到匹配项
      return -1
    } else {
      return -1
    }
  },

  // 根据手部装备id获取装备信息
  findHandInfoById (id) {
    if (id) {
      let index = this.findHandIndexById(id)

      if (index > -1) {
        return {
          id: Equipment.hand[index].id,
          name: Equipment.hand[index].name,  // 名称
          description: Equipment.hand[index].description,  // 描述
          provide: Equipment.hand[index].provide,  // 提供的效果，按照顺序分别是力量，体力，敏捷
          duration: Equipment.hand[index].duration,  // 最大耐久度
          sell: Equipment.hand[index].sell  // 售卖金币
        }
      } else {
        // 未找到
        return ''
      }
    } else {
      return ''
    }
  },

  // 根据当前腿部情况获取下个腿部装备
  getNewLeg () {
    let legIndex = 0
    // 首先根据当前腿部情况决定获取的新腿部装备情况，如果没有腿部装备，则从第一个等级开始，如果有的情况，1/5的概率获取下一等级装备，4/5的概率仍然获取当前等级装备
    if (Player.equipments.leg.id) {
      // 有装备
      if (NumberUtil.random(4) === 0) {
        // 获取下一等级装备
        let nowIndex = this.findLegIndexById(Player.equipments.leg.id)
        let nextIndex = nowIndex + 1

        if (nextIndex < Equipment.leg.length) {
          // 有更高等级装备
          legIndex = nextIndex
        } else {
          // 已无更高等级装备了
          legIndex = nowIndex
        }
      } else {
        // 仍获取当前等级装备
        legIndex = this.findLegIndexById(Player.equipments.leg.id)
      }
    } else {
      // 无装备
      legIndex = 0
    }

    let legQuality = 'c'
    // 5/10概率获得普通品质，3/10概率获取优良品质，2/10概率获取传奇品质
    let randomQuality = NumberUtil.random(9)
    if (randomQuality <= 4) {
      // 普通品质
      legQuality = 'c'
    } else if (randomQuality <= 7) {
      // 优良品质
      legQuality = 'g'
    } else {
      // 传奇品质
      legQuality = 'e'
    }

    // 组装最终需要的装备信息并返回
    return {
      id: Equipment.leg[legIndex].id,
      name: Equipment.leg[legIndex].name,
      quality: legQuality,
      duration: Equipment.leg[legIndex].duration
    }
  },

  // 根据腿部装备id获取装备对应的索引值
  findLegIndexById (id) {
    if (id) {
      for (let i = 0; i < Equipment.leg.length; i++) {
        if (Equipment.leg[i].id === id) {
          // 找到了匹配的id
          return i
        }
      }
      // 循环完所有仍未找到匹配项
      return -1
    } else {
      return -1
    }
  },

  // 根据腿部装备id获取装备信息
  findLegInfoById (id) {
    if (id) {
      let index = this.findLegIndexById(id)

      if (index > -1) {
        return {
          id: Equipment.leg[index].id,
          name: Equipment.leg[index].name,  // 名称
          description: Equipment.leg[index].description,  // 描述
          provide: Equipment.leg[index].provide,  // 提供的效果，按照顺序分别是力量，体力，敏捷
          duration: Equipment.leg[index].duration,  // 最大耐久度
          sell: Equipment.leg[index].sell  // 售卖金币
        }
      } else {
        // 未找到
        return ''
      }
    } else {
      return ''
    }
  }
}
