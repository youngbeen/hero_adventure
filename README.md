# hero-adventure

> play with your luck

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## events
notifyDamageEnemy({ damage: 0 }) -- 对敌人造成伤害({ 造成的伤害值 })
notifyShowGameCode({ code: '' }) -- 展示保存的游戏代码({ 要展示的游戏代码 })
notifyLoadGameCode -- 展示加载游戏代码界面
notifyShowBag -- 展示包裹界面，使用物品
notifyShowLoots([]) -- 展示战利品结算(战利品列表)
notifyEquip([]) -- 进入武器装备更替界面（武器装备战利品列表）
notifyConfirmItems([])  -- 进入物品选择更替界面（待确认的物品列表）
notifyEndTurn(true | false) -- 进入结束界面，修理or购买etc(是否胜利结束)
notifyShowCharacter({ mode: 'show' | 'edit' }) -- 展示角色界面({ 模式: 展示 | 编辑 })
notifyShowSkill({ mode: 'use' | 'edit' }) -- 展示角色技能界面({ 模式: 释放 | 编辑 })
notifyShowForge -- 展示锻造屋界面
notifyShowStore -- 展示商店界面
notifyRefreshActions -- 刷新所有action box项

## z-index
角色武器视觉层 -- 400
角色信息框 -- 500
耐久提醒框 -- 700
功能区 -- 800
攻击特效视觉层 -- 1000
保存，加载；战利品结算，物品更替界面，装备更替界面，结束界面弹框，包裹界面 -- 2000
角色信息界面，锻造屋界面，商店界面 -- 2100
技能界面 -- 2200

## NOTE
画图 深色 --》 浅色
80-505050 -- 边界色
100-646464
130-828282 -- 主色
150-969696
180-b4b4b4
200-c8c8c8

新游设计
具备rpg，养成特点

基础
点击操作，攻击数值随机化
角色拥有体力，能量，奥义
能量会在角色攻击，或者受到伤害后不同幅度增加，角色使用能量来释放一些强大的技能
!奥义会随着角色释放技能逐渐增加，奥义满之后可以释放极其强大的技能
血量值归零角色力尽
力尽之后角色所有武器装备的耐久度降低10%。金币损失10%。恢复体力需要使用金币恢复，金币不足的情况下，除扣除所有金币外，随机永久损坏身上任意部位一件武器或者装备。

系统
行动主要通过action box中的隐藏随机行动方块来触发
!玩家可以选择不同职业游玩，不同职业具有不同的个性技能
战胜敌人可以获得战利品金币，概率获得额外的武器装备，物品等。另外概率会碰到锻造屋（修理武器装备），商店（购买物品）或者其他特殊事件，有小概率可以获取技能点
金币可在每场战斗胜利之后用来主动恢复体力，购买物品（通过商店），修复武器装备的耐久度（通过锻造屋或者修理机器人）等，金币的最大上限值为999999
!技能点可用来分配解锁或升级各种技能，未使用的技能点上限值为99
!?使用技能点增加的主属性值（力量，体力，敏捷）最高上限值暂定为99

action box
action box中包含多种可能的内容，例如攻击，被攻击，刷新
当通过action box中连续抽取到攻击，被攻击的情况，效果程度会越来越大
攻击 - 攻击当前敌人
被攻击 - 当前敌人攻击角色
刷新 - 刷新当前action box，所有内容会重置（action box中有且只有一个刷新行动）
火把 - 可观察到所有当前action box中的行动内容

武器装备
武器与装备的耐久度设计最高值不能超过999
武器可用来装备，角色只能装备一件武器，其他武器自动丢弃
装备分头部，手部，胸部，腿部；同武器一样，各部位只能选择保留一件装备
武器，装备属性各有不同，品质也不同（分普通，优良，传奇）
丢弃的武器装备会抵扣为少量金币
!？有些武器或者装备具有特殊属性，角色在攻击或者被攻击的情况下会持续升级武器装备自身。当达到一定程度等级武器装备的隐藏属性会被解锁
武器在攻击，装备在被攻击的时候会逐渐损失耐久度，耐久度降为0装备提供的属性全部失效。必须通过锻造屋或者修理机器人处花费金币修复装备耐久才能再次使其属性生效

锻造屋
可使用金币在锻造屋进行维修武器装备
只要在锻造屋存在的情况下，始终可以进行武器或者装备的耐久度维修工作
!锻造屋出现的情况下，小概率可以对某些武器或者装备进行打磨，打磨可以将普通品质的武器装备提升为相应的优良品质，所需费用为武器装备售价的20倍

物品
物品可在战斗中使用，最多只能携带5种。不同的物品携带数量上限也不同。超过物品携带量上限的部分会自动折算为金币，超过携带种类数的新物品会提示是否替换或者丢弃，丢弃的物品同样会自动折算为金币
体力药剂，可以在战斗中为角色紧急恢复体力，最大携带量99，永远出售
能量药剂，可以在战斗中为角色增加能量，最大携带量8，永远出售
!力量药剂，使角色在接下来的x个行动中直接攻击伤害增加，最大携带量8，部分概率出售
!无敌药剂，使角色在接下来的3个行动中不受到任何直接伤害，最大携带量8，部分概率出售
复活十字，在角色力尽时可以使角色恢复50%的体力并继续战斗，自动强制使用，最大携带量1，永远出售
修理机器人，可在每场战斗后召唤其以便使你可以自由地修理你的武器装备（仍然需要消耗金币），最大携带量1，小概率出售

角色界面
角色面板扩充（需显示持有金币，当前力量，体力，敏捷以及增益加成的数值部分以及可用的技能点POINT）
!角色面板的恢复体力，以及各种技能解锁，提升功能在查看状态均不可用。只在结算页面唤出编辑状态时才可进行操作
武器装备耐久提醒器
包裹界面
!角色个性技能面板
!角色武器视觉动画
!角色攻击视觉特效动画

职业
!盗贼，特点是高敏捷，dot伤害，金币增益等
!战士，特点是高力量，

技能
基础技能
力量，敏捷，体力
力量power影响角色基础攻击的伤害
敏捷agility影响敌人攻击角色闪避的概率
体力defence影响角色自身的体力防御特性
特殊技能
!群攻 - 可攻击多个敌人
!洞察 - 可观察到所有action box中的行动内容
!铁匠 - 武器跟装备在攻击或者受到伤害时一定几率不会损失耐久度
!逃跑大师 - 一定概率可以逃离当前战斗（以战斗胜利结算，但不会产生任何的战利品）

敌人技能
!顽强回复 - 可恢复一定量的HP
