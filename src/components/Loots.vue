<template>
  <div class="window-loots" v-show="isShow" v-bind:style="{ 'width': width, 'left': left }">
    <div class="close" v-on:click="close()">
      <img src="../assets/icon_close.png" alt="关闭">
    </div>
    <div class="box-loots" v-for="item in loots">
      <div class="item-title" v-bind:class="{ 'epic': item.quality === 'e' ? true : false, 'good': item.quality === 'g' ? true : false }">{{ getItemName(item) }}</div>
      <div class="item-value">x <span class="item-number">{{ item.number }}</span></div>
    </div>
    <div class="btn" v-on:click="close()">好</div>
    <!-- 加载中电波 -->
    <div class="loading" v-show="isLoading">
      <img src="../assets/icon_loading.png" alt="加载中...">
    </div>
  </div>
</template>

<script>
  import eventBus from '../EventBus'
  import System from '../models/System'
  import Player from '../models/Player'
  import PlayerCtrl from '../controllers/PlayerCtrl'
  import ItemCtrl from '../controllers/ItemCtrl'

  export default {
    name: 'window-loots',
    data () {
      return {
        isShow: false,
        isLoading: true,  // 弹框是否正在播放动效中
        loots: [
          // {
          //   type: 'gold',
          //   name: '金币',
          //   number: 21
          // },
          // {
          //   type: 'item',
          //   number: 1,
          //   id: '01',  // 物品id
          //   name: '体力药剂',  // 物品名称
          //   description: '战斗中立即恢复20%体力值',  // 物品详情
          //   maxCount: 99,  // 最大携带量
          //   buy: 15,  // 购买单价
          //   sell: 5,  // 出售单价
          //   sellRandom: 1,  // 出售几率，计算规则是 1 / random
          //   dropRandom: 3, // 掉落概率 = 1 / random
          //   quality: 'c'  // 物品等级（只是标注稀有程度，并不代表实际提升效果）
          // },
          // {
          //   type: 'weapon',
          //   id: '01'
          //   name: '小刀',
          //   number: 1,
          //   quality: 'c',
          //   duration: 50
          // }
        ],   // 战利品列表
        width: '40%',  // 窗体的宽度
        left: '30%'  // 窗体的left
      }
    },
    methods: {
      getItemName (item) {
        if (item.type === 'gold') {
          return item.name
        } else {
          if (item.quality === 'e') {
            return item.name + '[传说]'
          } else if (item.quality === 'g') {
            return item.name + '[优良]'
          } else {
            return item.name
          }
        }
      },
      processLoots () {
        let _this = this
        let items = []  // 待处理的物品
        let gears = []  // 待处理的装备
        // 预处理所有战利品
        for (let i = 0; i < _this.loots.length; i++) {
          if (_this.loots[i].type === 'gold') {
            // 金币战利品，直接结算
            PlayerCtrl.changeGold(Number(_this.loots[i].number))
          } else if (_this.loots[i].type === 'point') {
            // 技能点奖励，直接结算
            PlayerCtrl.changeAvailablePoint(Number(_this.loots[i].number))
          } else if (_this.loots[i].type === 'item') {
            // 物品类战利品
            if (PlayerCtrl.hasItem(_this.loots[i].id) > -1) {
              // 已持有该物品，做叠加处理，超过携带量上限的部分折算为金币
              PlayerCtrl.changeItemCount(_this.loots[i].id, _this.loots[i].number)
            } else if (Player.items.length < 5) {
              // 未持有，并且还可以增加携带的物品种类
              let itemInfo = ItemCtrl.findItemInfoById(_this.loots[i].id)
              if (_this.loots[i].number > itemInfo.maxCount) {
                // 获取的物品个数直接超过了可携带的上限值，超出的部分折算为金币
                let overCount = _this.loots[i].number - itemInfo.maxCount
                this.changeGold(overCount * itemInfo.sell)
                PlayerCtrl.addItem(_this.loots[i].id, itemInfo.maxCount)
              } else {
                // 获取的物品个数正常，直接存放
                PlayerCtrl.addItem(_this.loots[i].id, _this.loots[i].number)
              }
            } else {
              // 未持有物品，但是已经无法放进包裹，放到待处理物品列表
              items.push(_this.loots[i])
            }
          } else {
            // 武器，装备类战利品
            gears.push(_this.loots[i])
          }
        }

        console.log('所有待处理的物品，装备等', items, gears)
        // 按照未处理的物品，未处理的装备挨个弹框处理
        if (items.length) {
          console.log('进入物品更替界面，待处理的物品，外带后续需要处理的装备', items, gears)
          System.todoGears = gears
          eventBus.$emit('notifyConfirmItems', items)
        } else if (gears.length) {
          // 有获取武器或者装备
          console.log('进入武器装备更替界面，待处理的武器装备', gears)
          eventBus.$emit('notifyEquip', gears)
        } else {
          eventBus.$emit('notifyEndTurn', true)
        }
      },
      show () {
        let _this = this
        this.isLoading = true
        this.isShow = true
        setTimeout(function () {
          _this.width = '80%'
          _this.left = '10%'
          _this.isLoading = false
        }, 400)
      },
      close () {
        let _this = this
        this.isLoading = true
        this.width = '40%'
        this.left = '30%'
        setTimeout(function () {
          _this.isShow = false
          _this.isLoading = false
          _this.processLoots()
        }, 400)
      }
    },
    mounted () {
      let _this = this

      eventBus.$on('notifyShowLoots', loots => {
        if (loots && loots.length) {
          _this.loots = loots
          _this.show()
        }
      })
    }
  }
</script>

<style scoped>
  .window-loots {
    position: fixed;
    /*width: 80%;*/
    /*height: 40%;*/
    /*left: 10%;*/
    top: 20%;

    background-color: white;
    border: 6px solid rgb(50, 50, 50);
    border-radius: 12px;

    transition: width .2s, left .2s;
    z-index: 2000;
  }
  .close {
    position: absolute;
    right: -20px;
    top: -20px;
    width: 30px;
    height: 30px;
    /*line-height: 30px;*/

    background-color: white;
    border: 6px solid rgb(50, 50, 50);
    border-radius: 20px;
    /*font-size: 38px;*/
    /*text-align: center;*/
    cursor: pointer;
    z-index: 2002;
  }
  .close img {
    width: 100%;
    height: 100%;
  }
  .loading {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    background-color: white;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    z-index: 2001;
  }
  .loading img {
    width: 160px;
    /*height: 60px;*/
  }
  .box-loots {
    display: flex;
    padding: 12px 24px;
  }
  .item-title {
    width: 80%;
    border-bottom: 1px solid rgb(180, 180, 180);
    font-weight: bold;
  }
  .epic {
    color: rgb(244,189,26);
  }
  .good {
    color: rgb(0,93,161);
  }
  .item-value {
    width: 20%;
    border-bottom: 1px solid rgb(180, 180, 180);
  }
  .item-number {
    color: rgb(130, 130, 130);
    font-size: 20px;
  }
  .btn {
    margin: 6px auto;
    width: 90px;
    height: 30px;
    line-height: 30px;

    color: white;
    background-color: rgb(130, 130, 130);
    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
</style>
