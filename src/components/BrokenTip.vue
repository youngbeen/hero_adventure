<template>
  <div class="bed-broken-tip" v-show="isShow">
    <div v-bind:class="{ 'broken': !currentWeapon.leftDuration, 'warn': currentWeapon.leftDuration }" v-show="currentWeapon && (currentWeapon.leftDuration < 5 || currentWeapon.leftDuration / currentWeapon.duration <= 0.2)">武器({{ currentWeapon.leftDuration }}/{{ currentWeapon.duration }})</div>
    <div v-bind:class="{ 'broken': !currentHead.leftDuration, 'warn': currentHead.leftDuration }" v-show="currentHead && (currentHead.leftDuration < 5 || currentHead.leftDuration / currentHead.duration <= 0.2)">头部({{ currentHead.leftDuration }}/{{ currentHead.duration }})</div>
    <div v-bind:class="{ 'broken': !currentBody.leftDuration, 'warn': currentBody.leftDuration }" v-show="currentBody && (currentBody.leftDuration < 5 || currentBody.leftDuration / currentBody.duration <= 0.2)">身体({{ currentBody.leftDuration }}/{{ currentBody.duration }})</div>
    <div v-bind:class="{ 'broken': !currentHand.leftDuration, 'warn': currentHand.leftDuration }" v-show="currentHand && (currentHand.leftDuration < 5 || currentHand.leftDuration / currentHand.duration <= 0.2)">手部({{ currentHand.leftDuration }}/{{ currentHand.duration }})</div>
    <div v-bind:class="{ 'broken': !currentLeg.leftDuration, 'warn': currentLeg.leftDuration }" v-show="currentLeg && (currentLeg.leftDuration < 5 || currentLeg.leftDuration / currentLeg.duration <= 0.2)">腿部({{ currentLeg.leftDuration }}/{{ currentLeg.duration }})</div>
  </div>
</template>

<script>
  import Player from '../models/Player'
  import EquipmentCtrl from '../controllers/EquipmentCtrl'

  export default {
    name: 'broken-tip',
    data () {
      return {
        player: Player
      }
    },
    computed: {
      isShow () {
        let flag = false
        if (this.currentWeapon && (this.currentWeapon.leftDuration < 5 || this.currentWeapon.leftDuration / this.currentWeapon.duration <= 0.2)) {
          flag = true
        } else if (this.currentHead && (this.currentHead.leftDuration < 5 || this.currentHead.leftDuration / this.currentHead.duration <= 0.2)) {
          flag = true
        } else if (this.currentBody && (this.currentBody.leftDuration < 5 || this.currentBody.leftDuration / this.currentBody.duration <= 0.2)) {
          flag = true
        } else if (this.currentHand && (this.currentHand.leftDuration < 5 || this.currentHand.leftDuration / this.currentHand.duration <= 0.2)) {
          flag = true
        } else if (this.currentLeg && (this.currentLeg.leftDuration < 5 || this.currentLeg.leftDuration / this.currentLeg.duration <= 0.2)) {
          flag = true
        }

        return flag
      },

      currentWeapon () {
        if (this.player.equipments.weapon.id) {
          let weapon = EquipmentCtrl.findWeaponInfoById(this.player.equipments.weapon.id)

          if (weapon) {
            // 找到了对应的武器，附加品质数据，当前的耐久度
            weapon.leftDuration = Player.equipments.weapon.duration
            weapon.quality = Player.equipments.weapon.quality
          }

          return weapon
        } else {
          return ''
        }
      },

      currentHead () {
        if (this.player.equipments.head.id) {
          let head = EquipmentCtrl.findHeadInfoById(this.player.equipments.head.id)

          if (head) {
            // 找到了对应的装备，附加品质数据，当前的耐久度
            head.leftDuration = Player.equipments.head.duration
            head.quality = Player.equipments.head.quality
          }

          return head
        } else {
          return ''
        }
      },

      currentBody () {
        if (this.player.equipments.body.id) {
          let body = EquipmentCtrl.findBodyInfoById(this.player.equipments.body.id)

          if (body) {
            // 找到了对应的装备，附加品质数据，当前的耐久度
            body.leftDuration = Player.equipments.body.duration
            body.quality = Player.equipments.body.quality
          }

          return body
        } else {
          return ''
        }
      },

      currentHand () {
        if (this.player.equipments.hand.id) {
          let hand = EquipmentCtrl.findHandInfoById(this.player.equipments.hand.id)

          if (hand) {
            // 找到了对应的装备，附加品质数据，当前的耐久度
            hand.leftDuration = Player.equipments.hand.duration
            hand.quality = Player.equipments.hand.quality
          }

          return hand
        } else {
          return ''
        }
      },

      currentLeg () {
        if (this.player.equipments.leg.id) {
          let leg = EquipmentCtrl.findLegInfoById(this.player.equipments.leg.id)

          if (leg) {
            // 找到了对应的装备，附加品质数据，当前的耐久度
            leg.leftDuration = Player.equipments.leg.duration
            leg.quality = Player.equipments.leg.quality
          }

          return leg
        } else {
          return ''
        }
      }
    }
  }
</script>

<style scoped>
  .bed-broken-tip {
    position: fixed;
    right: 0;
    top: 50%;
    padding: 6px;

    border: 6px solid rgb(50, 50, 50);
    border-radius: 12px;
    background-color: white;
    z-index: 700;
  }
  .warn {
    color: rgb(117,76,67);
  }
  .broken {
    color: rgb(200, 200, 200);
    text-decoration: line-through;
  }
</style>
