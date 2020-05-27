<template>
  <div v-if="token&&getBonus!==3">
    <div v-if="token&&getBonus===1" class="LoginBonus pointer" @click="getBonusMoney"></div>
    <div v-if="token&&getBonus===2" class="LoginBonus haveGet pointer" @click="haveGetAlert"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { applyLoginBonus } from '../api/activity'

export default {
  name: 'LoginBonus',
  computed: {
    ...mapGetters(['token', 'getBonus'])
  },
  methods: {
    getBonusMoney() {
      applyLoginBonus().then(res => {
        if (res.Code === 0) {
          this.$modalHint.show({
            text: `恭喜获得登入奖励 ${res.Data} 元`
          })
          this.$store.dispatch('user/getInfo')
        }
      })
    },
    haveGetAlert() {
      this.$modalHint.show({
        text: '今日登入红包已领取'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.LoginBonus {
  width: 128px;
  height: 128px;
  background: url('../assets/images/public/china.png');
  &.haveGet {
    background: url('../assets/images/public/china-grey.png');
  }
}
</style>
