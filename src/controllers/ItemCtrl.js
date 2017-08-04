
import Item from '../models/Item'
import NumberUtil from '../utils/NumberUtil'

export default {
  // 获取随机售卖物品 --
  getStoreItems () {
    let sells = []

    for (let i = 0; i < Item.items.length; i++) {
      if (NumberUtil.random(Item.items[i].sellRandom, 1) === 1) {
      // if (NumberUtil.random(1, 1) === 1) {
        // 售卖当前物品
        sells.push({
          type: 'item',
          id: Item.items[i].id,  // 物品id
          name: Item.items[i].name,  // 物品名称
          description: Item.items[i].description,  // 物品详情
          maxCount: Item.items[i].maxCount,  // 最大携带量
          isUse: Item.items[i].isUse,   // 是否能在战斗中主动使用
          buy: Item.items[i].buy,  // 购买单价
          sell: Item.items[i].sell,  // 出售单价
          sellRandom: Item.items[i].sellRandom,  // 出售几率，计算规则是 1 / random
          dropRandom: Item.items[i].dropRandom, // 掉落概率 = 1 / random
          quality: Item.items[i].quality  // 物品等级（只是标注稀有程度，并不代表实际提升效果）
        })
      }
    }

    return sells
  },
  // 获取随机掉落物品 --
  getDropItems () {
    let drops = []

    for (let i = 0; i < Item.items.length; i++) {
      if (NumberUtil.random(Item.items[i].dropRandom, 1) === 1) {
      // if (NumberUtil.random(1, 1) === 1) {
        // 成功掉落当前物品
        drops.push({
          type: 'item',
          number: 1,
          count: 1,
          id: Item.items[i].id,  // 物品id
          name: Item.items[i].name,  // 物品名称
          description: Item.items[i].description,  // 物品详情
          maxCount: Item.items[i].maxCount,  // 最大携带量
          isUse: Item.items[i].isUse,   // 是否能在战斗中主动使用
          buy: Item.items[i].buy,  // 购买单价
          sell: Item.items[i].sell,  // 出售单价
          sellRandom: Item.items[i].sellRandom,  // 出售几率，计算规则是 1 / random
          dropRandom: Item.items[i].dropRandom, // 掉落概率 = 1 / random
          quality: Item.items[i].quality  // 物品等级（只是标注稀有程度，并不代表实际提升效果）
        })
      }
    }

    return drops
  },
  // 获取物品详情 -- 物品id
  findItemInfoById (id) {
    if (id) {
      for (let i = 0; i < Item.items.length; i++) {
        if (Item.items[i].id === id) {
          // 找到了匹配的物品，返回详情
          return {
            id: Item.items[i].id,  // 物品id
            name: Item.items[i].name,  // 物品名称
            description: Item.items[i].description,  // 物品详情
            maxCount: Item.items[i].maxCount,  // 最大携带量
            isUse: Item.items[i].isUse,   // 是否能在战斗中主动使用
            buy: Item.items[i].buy,  // 购买单价
            sell: Item.items[i].sell,  // 出售单价
            sellRandom: Item.items[i].sellRandom,  // 出售几率，计算规则是 1 / random
            dropRandom: Item.items[i].dropRandom, // 掉落概率 = 1 / random
            quality: Item.items[i].quality  // 物品等级（只是标注稀有程度，并不代表实际提升效果）
          }
        }
      }

      // 未找到物品
      return ''
    } else {
      // id非法
      return ''
    }
  }
}
