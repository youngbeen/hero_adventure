<template>
  <div class="window-store" v-show="isShow" v-bind:style="{ 'width': width, 'left': left }">
    <div class="close" v-on:click="close()">
      <img src="../assets/icon_close.png" alt="关闭">
    </div>
    <div class="box-content">
      <div class="box-coin">持有金币：<strong>{{ player.gold }}</strong>G</div>
      <div class="head">正在出售{{ system.storeItems.length }}种商品：</div>
      <div class="box-store">
        <div class="store-row" v-for="(item, index) in system.storeItems">
          <div class="name" v-bind:class="{ 'epic': item.quality === 'e' ? true : false, 'good': item.quality === 'g' ? true : false }" v-bind:title="item.description">{{ item.name }}</div>
          <div class="price">
            价格：<strong>{{ item.buy }}</strong>
          </div>
          <div class="action">
            <div class="btn-sm" v-show="player.gold >= item.buy" v-on:click="buy(index, 1)">买1</div>
            <div class="btn-sm" v-show="player.gold >= item.buy" v-on:click="buy(index)">买MAX</div>
            <div class="btn-sm-disable" v-show="player.gold < item.buy">买1</div>
            <div class="btn-sm-disable" v-show="player.gold < item.buy">买MAX</div>
          </div>
        </div>
      </div>
      <div class="head">包裹中的物品(<span>{{ bag.length }}</span>/5种)：</div>
      <div class="bag">
        <div class="row" v-for="(item, index) in bag">
          <div class="bag-name" v-bind:class="{ 'epic': item.quality === 'e' ? true : false, 'good': item.quality === 'g' ? true : false }" v-bind:title="item.description">{{ item.name }}</div>
          <div class="bag-count">X {{ item.count }}</div>
          <div class="bag-price">
            售价：<strong>{{ item.sell }}</strong>
          </div>
          <div class="bag-action">
            <div class="btn-sm" v-on:click="sell(index, 1)">卖1</div>
            <div class="btn-sm" v-on:click="sell(index)">卖MAX</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 加载中电波 -->
    <div class="loading" v-show="isLoading">
      <img src="../assets/icon_loading.png" alt="加载中...">
    </div>
  </div>
</template>

<script>
  import eventBus from '../EventBus'
  import Player from '../models/Player'
  import System from '../models/System'
  import PlayerCtrl from '../controllers/PlayerCtrl'
  import ItemCtrl from '../controllers/ItemCtrl'

  export default {
    name: 'store',
    data () {
      return {
        isShow: false,
        isLoading: true,  // 弹框是否正在播放动效中
        width: '40%',  // 窗体的宽度
        left: '30%',  // 窗体的left
        player: Player,
        system: System
      }
    },
    computed: {
      bag () {
        let bagItems = []

        for (let i = 0; i < this.player.items.length; i++) {
          let itemInfo = ItemCtrl.findItemInfoById(this.player.items[i].id)
          itemInfo.count = this.player.items[i].count
          bagItems.push(itemInfo)
        }

        return bagItems
      }
    },
    methods: {
      buy (index, amount) {
        // NOTE: 不传数量默认是全量
        if (index >= 0) {
          if (amount && amount > 0) {
            // 定量操作
            let bagIndex = PlayerCtrl.hasItem(System.storeItems[index].id)

            if (bagIndex > -1) {
              // 已持有该物品，增加数量
              // 要购买的数量，当前还能购买的数量，金币能购买的数量 三者的最小值即为最终应该购买的量
              let buyCount = Math.min(amount, System.storeItems[index].maxCount - Player.items[bagIndex].count, Math.floor(Player.gold / System.storeItems[index].buy))
              if (buyCount) {
                PlayerCtrl.changeGold(-1 * buyCount * System.storeItems[index].buy)
                PlayerCtrl.changeItemCount(System.storeItems[index].id, buyCount)
              } else {
                window.alert('已达到持有上限，无法继续购买')
              }
            } else if (bagIndex === -1 && Player.items.length < 5) {
              // 未持有该物品，并且包裹有剩余空间
              // 要购买的数量，物品购买的数量上限，金币能购买的数量 三者的最小值即为最终应该购买的量
              let buyCount = Math.min(amount, System.storeItems[index].maxCount, Math.floor(Player.gold / System.storeItems[index].buy))
              if (buyCount) {
                PlayerCtrl.changeGold(-1 * buyCount * System.storeItems[index].buy)
                PlayerCtrl.addItem(System.storeItems[index].id, buyCount)
              } else {
                window.alert('已达到持有上限，无法继续购买')
              }
            } else {
              // 包裹已无剩余空间，无法够买
              window.alert('包裹无剩余空间，请先出售不需要的物品腾出空间')
            }
          } else {
            // 全量操作，直接购满上限，金币不足的情况下会购满所有金币能购买的量
            let bagIndex = PlayerCtrl.hasItem(System.storeItems[index].id)

            if (bagIndex > -1) {
              // 已持有该物品，充满数量
              // 当前还能购买的数量，金币能购买的数量 的最小值即为最终应该购买的量
              let buyCount = Math.min(System.storeItems[index].maxCount - Player.items[bagIndex].count, Math.floor(Player.gold / System.storeItems[index].buy))
              PlayerCtrl.changeGold(-1 * buyCount * System.storeItems[index].buy)
              PlayerCtrl.changeItemCount(System.storeItems[index].id, buyCount)
            } else if (bagIndex === -1 && Player.items.length < 5) {
              // 未持有该物品，并且包裹有剩余空间
              // 物品购买的数量上限，金币能购买的数量 的最小值即为最终应该购买的量
              let buyCount = Math.min(System.storeItems[index].maxCount, Math.floor(Player.gold / System.storeItems[index].buy))
              PlayerCtrl.changeGold(-1 * buyCount * System.storeItems[index].buy)
              PlayerCtrl.addItem(System.storeItems[index].id, buyCount)
            } else {
              // 包裹已无剩余空间，无法够买
              window.alert('包裹无剩余空间，请先出售不需要的物品腾出空间')
            }
          }
        }
      },
      sell (index, amount) {
        // NOTE: 不传数量默认是全量
        if (index >= 0) {
          if (amount && amount > 0) {
            // 定量操作
            // 要出售的数量跟当前持有量的较小值即为最终应该出售的量
            let sellCount = Math.min(Number(amount), Player.items[index].count)
            PlayerCtrl.changeGold(sellCount * this.bag[index].sell)
            PlayerCtrl.changeItemCount(Player.items[index].id, -1 * sellCount)
          } else {
            // 全量操作
            let sellCount = Player.items[index].count
            PlayerCtrl.changeGold(sellCount * this.bag[index].sell)
            PlayerCtrl.changeItemCount(Player.items[index].id, -1 * sellCount)
          }
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
        }, 400)
      }
    },
    mounted () {
      let _this = this

      eventBus.$on('notifyShowStore', () => {
        _this.show()
      })
    }
  }
</script>

<style scoped>
  .window-store {
    position: fixed;
    /*width: 80%;*/
    /*height: 40%;*/
    /*left: 10%;*/
    top: 20%;

    background-color: white;
    border: 6px solid rgb(50, 50, 50);
    border-radius: 12px;

    transition: width .2s, left .2s;
    z-index: 2100;
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
    z-index: 2102;
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
    z-index: 2101;
  }
  .loading img {
    width: 160px;
    /*height: 60px;*/
  }
  .box-content {
    padding: 12px 24px;
  }
  .box-coin {
    color: rgb(130, 130, 130);
    font-size: 12px;
    font-style: italic;
    text-align: right;
  }
  .box-coin strong {
    color: rgb(80, 80, 80);
  }
  .box-store {
    height: 180px;
    border-top: 6px solid rgb(200, 200, 200);
    border-bottom: 6px solid rgb(200, 200, 200);
    overflow-y: scroll;
  }
  .store-row {
    display: flex;
    padding: 3px;

    /*background-color: rgb(200, 200, 200);*/
  }
  .row {
    display: flex;
    padding: 3px;
  }
  .name {
    width: 50%;
  }
  .price {
    width: 20%;
  }
  .action {
    width: 30%;
  }
  .head {
    font-size: 16px;
  }
  .bag {
    border: 2px dashed rgb(50, 50, 50);
    border-radius: 6px;
  }
  .bag-name {
    width: 40%;
  }
  .bag-count {
    width: 10%;
  }
  .bag-price {
    width: 20%;
  }
  .bag-action {
    width: 30%;
  }
  .epic {
    color: rgb(244,189,26);
  }
  .good {
    color: rgb(0,93,161);
  }
  .btn-sm {
    display: inline-block;
    margin: 0 6px;
    width: 60px;
    height: 30px;
    line-height: 30px;

    color: white;
    background-color: rgb(130, 130, 130);
    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
  .btn-sm-disable {
    display: inline-block;
    margin: 0 6px;
    width: 60px;
    height: 30px;
    line-height: 30px;

    color: white;
    background-color: rgb(200, 200, 200);
    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
    text-align: center;
    cursor: not-allowed;
  }
  .btn {
    margin: 0 6px;
    /*width: 90px;*/
    height: 30px;
    line-height: 30px;

    color: white;
    background-color: rgb(130, 130, 130);
    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
  .btn-long {
    margin: 6px auto;
    width: 180px;
    height: 30px;
    line-height: 30px;

    color: white;
    background-color: rgb(130, 130, 130);
    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
  .btn-disable {
    margin: 0 6px;
    /*width: 90px;*/
    height: 30px;
    line-height: 30px;

    color: white;
    background-color: rgb(200, 200, 200);
    border: 1px solid rgb(50, 50, 50);
    border-radius: 5px;
    text-align: center;
    cursor: not-allowed;
  }
</style>
