
export default {
  gold: 100,   // 金币（需要存档记录）
  career: '01',  // 职业（需要存档记录）
  basePower: 7,  // 基础力量
  baseDefence: 7,  // 基础体力
  baseAgility: 8,  // 基础敏捷
  availablePoint: 0,  // 还可供使用的技能点，用于提升技能（需要存档记录）
  extraPower: 0,  // 技能点增加的力量（需要存档记录）
  extraDefence: 0,  // 技能点增加的体力（需要存档记录）
  extraAgility: 0,  // 技能点增加的敏捷（需要存档记录）
  power: 0,   // 最终力量
  defence: 0,  // 最终体力
  agility: 0,  // 最终敏捷
  hp: 0,    // 体力
  maxHp: 0, // 体力上限
  eg: 0,    // 能量
  maxEg: 100,   // 能量上限
  sp: 0,    // 奥义
  maxSp: 100, // 奥义上限
  items: [  // 包裹，最大可持有物品种类数5种（需要存档记录）
    // {
    //   id: '',  // 物品对应id
    //   count: 0  // 物品拥有数
    // }
  ],
  equipments: {  // （需要存档记录）
    weapon: {
      id: '',
      quality: '',  // 品质，c -- 普通， g -- 优良， e -- 传奇
      duration: 0  // 耐久度
    },  // 武器（使用id对应）
    head: {
      id: '',
      quality: '',  // 品质，c -- 普通， g -- 优良， e -- 传奇
      duration: 0  // 耐久度
    },   // 头盔（使用id对应）
    body: {
      id: '',
      quality: '',  // 品质，c -- 普通， g -- 优良， e -- 传奇
      duration: 0  // 耐久度
    },   // 身体部位（使用id对应）
    hand: {
      id: '',
      quality: '',  // 品质，c -- 普通， g -- 优良， e -- 传奇
      duration: 0  // 耐久度
    },   // 手部（使用id对应）
    leg: {
      id: '',
      quality: '',  // 品质，c -- 普通， g -- 优良， e -- 传奇
      duration: 0  // 耐久度
    }   // 腿部（使用id对应）
  }
}
