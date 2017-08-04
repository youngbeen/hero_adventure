
export default {
  items: [
    {
      id: '01',  // 物品id
      name: '体力药剂',  // 物品名称
      description: '战斗中使用，立即恢复20%体力值',  // 物品详情
      maxCount: 99,  // 最大携带量
      isUse: true,   // 是否能在战斗中主动使用
      buy: 15,  // 购买单价
      sell: 5,  // 出售单价
      sellRandom: 1,  // 出售几率，计算规则是 1 / random
      dropRandom: 3, // 掉落概率 = 1 / random
      quality: 'c'  // 物品等级（只是标注稀有程度，并不代表实际提升效果）
    },
    {
      id: '02',  // 物品id
      name: '能量药剂',  // 物品名称
      description: '战斗中使用，立即增加30能量值',  // 物品详情
      maxCount: 8,  // 最大携带量
      isUse: true,   // 是否能在战斗中主动使用
      buy: 20,  // 购买单价
      sell: 5,  // 出售单价
      sellRandom: 1,  // 出售几率，计算规则是 1 / random
      dropRandom: 3, // 掉落概率 = 1 / random
      quality: 'c'  // 物品等级（只是标注稀有程度，并不代表实际提升效果）
    },
    {
      id: '03',  // 物品id
      name: '力量药剂',  // 物品名称
      description: '战斗中使用，接下来的5个回合力量值提升5%',  // 物品详情
      maxCount: 8,  // 最大携带量
      isUse: true,   // 是否能在战斗中主动使用
      buy: 50,  // 购买单价
      sell: 8,  // 出售单价
      sellRandom: 3,  // 出售几率，计算规则是 1 / random
      dropRandom: 5, // 掉落概率 = 1 / random
      quality: 'g'  // 物品等级（只是标注稀有程度，并不代表实际提升效果）
    },
    {
      id: '04',  // 物品id
      name: '无敌药剂',  // 物品名称
      description: '战斗中使用，接下来的3个回合不会受到任何直接伤害',  // 物品详情
      maxCount: 8,  // 最大携带量
      isUse: true,   // 是否能在战斗中主动使用
      buy: 50,  // 购买单价
      sell: 8,  // 出售单价
      sellRandom: 3,  // 出售几率，计算规则是 1 / random
      dropRandom: 6, // 掉落概率 = 1 / random
      quality: 'g'  // 物品等级（只是标注稀有程度，并不代表实际提升效果）
    },
    {
      id: '05',  // 物品id
      name: '复活十字',  // 物品名称
      description: '力尽时自动使用，恢复50%体力值并继续战斗',  // 物品详情
      maxCount: 1,  // 最大携带量
      isUse: false,   // 是否能在战斗中主动使用
      buy: 80,  // 购买单价
      sell: 10,  // 出售单价
      sellRandom: 1,  // 出售几率，计算规则是 1 / random
      dropRandom: 10, // 掉落概率 = 1 / random
      quality: 'g'  // 物品等级（只是标注稀有程度，并不代表实际提升效果）
    },
    {
      id: '99',  // 物品id
      name: '修理机器人',  // 物品名称
      description: '使你在每场战斗后可自由召唤一个可进行修理操作的机器人，永久使用！',  // 物品详情
      maxCount: 1,  // 最大携带量
      isUse: false,   // 是否能在战斗中主动使用
      buy: 9999,  // 购买单价
      sell: 1,  // 出售单价
      sellRandom: 100,  // 出售几率，计算规则是 1 / random
      dropRandom: 1000, // 掉落概率 = 1 / random
      quality: 'e'  // 物品等级（只是标注稀有程度，并不代表实际提升效果）
    }
  ]
}
