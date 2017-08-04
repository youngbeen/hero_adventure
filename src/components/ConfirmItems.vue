<template>
  <div class="window-confirm-items" v-if="isShow" v-bind:style="{ 'width': width, 'left': left }">
    <!-- <div class="close" v-on:click="close()">
      <img src="../assets/icon_close.png" alt="关闭">
    </div> -->
    <div class="box-content">
      <div class="head">需要保留在包裹中的物品(<span>{{ bag.length }}</span>/5种)：</div>
      <div class="bag">
        <div class="box-item" v-for="(item, index) in bag">
          <div class="name" v-bind:class="{ 'epic': item.quality === 'e' ? true : false, 'good': item.quality === 'g' ? true : false }" v-bind:title="item.description">{{ item.name }}</div>
          <div class="count">X {{ item.count }}</div>
          <div class="action">
            <div class="btn" v-on:click="abandon(index)">放弃</div>
          </div>
        </div>
      </div>
      <div class="head">准备放弃的物品({{ trash.length }}种)：</div>
      <div class="trash">
        <div class="box-item" v-for="(item, index) in trash">
          <div class="name" v-bind:class="{ 'epic': item.quality === 'e' ? true : false, 'good': item.quality === 'g' ? true : false }" v-bind:title="item.description">{{ item.name }}</div>
          <div class="count">X {{ item.count }}</div>
          <div class="action">
            <div class="btn" v-show="bag.length < 5" v-on:click="keep(index)">保留</div>
            <div class="btn-disable" v-show="bag.length >= 5">保留</div>
          </div>
        </div>
      </div>
      <div class="btn-long" v-on:click="confirm()">确认</div>
    </div>
    <!-- 加载中电波 -->
    <div class="loading" v-show="isLoading">
      <img src="../assets/icon_loading.png" alt="加载中...">
    </div>
  </div>
</template>

<script>
  import eventBus from '../EventBus'
  import System from '../models/System'
  import PlayerCtrl from '../controllers/PlayerCtrl'

  export default {
    name: 'window-confirm-items',
    data () {
      return {
        isShow: false,
        isLoading: true,  // 弹框是否正在播放动效中
        bag: [],
        trash: [],
        width: '40%',  // 窗体的宽度
        left: '30%'  // 窗体的left
      }
    },
    methods: {
      abandon (index) {
        let throwItem = this.bag[index]

        this.trash.push(throwItem)
        this.bag.splice(index, 1)
      },
      keep (index) {
        let keepItem = this.trash[index]

        this.bag.push(keepItem)
        this.trash.splice(index, 1)
      },
      confirm () {
        // 先将所有bag中保留的项存入
        if (this.bag.length && this.bag.length <= 5) {
          PlayerCtrl.clearAllItems()

          for (let i = 0; i < this.bag.length; i++) {
            PlayerCtrl.addItem(this.bag[i].id, this.bag[i].count)
          }
        }

        // 将所有trash中的物品折算为金币
        for (let i = 0; i < this.trash.length; i++) {
          PlayerCtrl.changeGold(this.trash[i].sell * this.trash[i].count)
        }

        this.close()
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
          if (System.todoGears.length) {
            // 还有要处理的武器或者装备
            console.log('待处理的武器或者装备', System.todoGears)
            eventBus.$emit('notifyEquip', System.todoGears)
            // TODO 是否会错误的消除装备内容？
            System.todoGears = []
          } else {
            // 所有都处理完毕
            eventBus.$emit('notifyEndTurn', true)
          }
        }, 400)
      }
    },
    mounted () {
      let _this = this

      eventBus.$on('notifyConfirmItems', loots => {
        if (loots && loots.length) {
          _this.trash = loots
          // 根据角色当前持有物品获取详细信息
          _this.bag = PlayerCtrl.getAllItemsInfo()
          _this.show()
        }
      })
    }
  }
</script>

<style scoped>
  .window-confirm-items {
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
  .box-content {
    padding: 12px 24px;
  }
  .head {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }
  .bag {
    border: 2px dashed rgb(50, 50, 50);
    border-radius: 6px;
  }
  .box-item {
    display: flex;
    padding: 3px 6px;
  }
  .name {
    width: 50%;
  }
  .count {
    width: 20%;
  }
  .action {
    width: 30%;
  }
  .epic {
    color: rgb(244,189,26);
  }
  .good {
    color: rgb(0,93,161);
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
