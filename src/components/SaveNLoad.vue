<template>
  <div class="window-save" v-show="isShow" v-bind:style="{ 'width': width, 'left': left }">
    <div class="close" v-on:click="close()">
      <img src="../assets/icon_close.png" alt="关闭">
    </div>
    <!-- 展示保存的代码 -->
    <div class="box-show-code" v-show="type === 'save'">
      <div class="title">你的游戏保存代码是</div>
      <div class="save-code">{{ saveCode }}</div>
      <div class="tip">（请妥善保存你的代码，将其抄录下来以便下次使用）</div>
    </div>
    <!-- 展示加载代码 -->
    <div class="box-load-code" v-show="type === 'load'">
      <div v-show="localCode">
        <div class="title">检测到之前保存的游戏代码</div>
        <div class="old-code">{{ localCode }}</div>
        <div class="btn" v-on:click="loadLocalCode()">立即加载</div>
      </div>
      <div class="title"><span v-show="localCode">或</span>输入你自己保存的游戏代码</div>
      <input type="text" class="input-code" v-model="inputCode">
      <div class="btn" v-on:click="loadInputCode()">开始加载</div>
    </div>
    <!-- 加载中电波 -->
    <div class="loading" v-show="isLoading">
      <img src="../assets/icon_loading.png" alt="加载中...">
    </div>
  </div>
</template>

<script>
  import eventBus from '../EventBus'
  import GameCtrl from '../controllers/GameCtrl'

  export default {
    name: 'window-save',
    data () {
      return {
        isShow: false,
        isLoading: true,  // 弹框是否正在播放动效中
        type: 'save',   // 模式，save - 保存， load - 加载
        saveCode: '',  // 要展示的保存代码
        inputCode: '',  // 手动输入的代码
        localCode: '',  // 缓存中之前自动记录的代码
        width: '40%',  // 窗体的宽度
        left: '30%'  // 窗体的left
      }
    },
    methods: {
      showCode (code) {
        let _this = this
        this.saveCode = code
        window.localStorage.saveCode = code
        this.type = 'save'
        this.isLoading = true
        this.isShow = true
        setTimeout(function () {
          _this.width = '80%'
          _this.left = '10%'
          _this.isLoading = false
        }, 400)
      },
      showLoadCode () {
        let _this = this
        this.inputCode = ''
        this.localCode = ''
        if (window.localStorage.saveCode) {
          this.localCode = window.localStorage.saveCode
        }
        this.type = 'load'
        this.isLoading = true
        this.isShow = true
        setTimeout(function () {
          _this.width = '80%'
          _this.left = '10%'
          _this.isLoading = false
        }, 400)
      },
      loadInputCode () {
        if (this.inputCode) {
          GameCtrl.loadGame(this.inputCode)
          this.close()
        }
      },
      loadLocalCode () {
        if (this.localCode) {
          GameCtrl.loadGame(this.localCode)
          this.close()
        }
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

      eventBus.$on('notifyShowGameCode', params => {
        if (params && params.code) {
          _this.showCode(params.code)
        }
      })

      eventBus.$on('notifyLoadGameCode', () => {
        _this.showLoadCode()
      })
    }
  }
</script>

<style scoped>
  .window-save {
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
  .box-show-code, .box-load-code {
    /*width: 100%;*/
    /*height: 100%;*/
    padding: 30px;
  }
  .save-code {
    color: rgb(24,221,9);
    text-align: center;
    font-size: 40px;
  }
  .tip {
    color: rgb(180, 180, 180);
    text-align: center;
    font-size: 10px;
    font-style: italic;
  }
  .old-code {
    color: rgb(130, 130, 130);
    border: 1px dashed rgb(50, 50, 50);
    text-align: center;
    font-size: 30px;
  }
  .input-code {
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;

    border: 2px solid rgb(200, 200, 200);
    font-size: 30px;
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
