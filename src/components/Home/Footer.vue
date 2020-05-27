<template>
  <div class="Footer">
    <div class="platform-row flex flex-center">
      <div v-for="(item, index) of platformList" :key="index" class="icon flex flex-items-center">
        <img :src="bgUrl(item)" />
      </div>
    </div>
    <div class="section margin-center flex flex-column flex-center">
      <div class="flex flex-center">
        <div class="nav-item" @click="handleClick('about')">{{ $t('footer.about') }}</div>
        <div class="nav-item" @click="handleClick('question')">{{ $t('footer.question') }}</div>
        <div class="nav-item" @click="handleClick('agenthelp')">{{ $t('footer.agenthelp') }}</div>
        <div class="nav-item" @click="handleClick('deposithelp')">{{ $t('footer.deposithelp') }}</div>
        <div
          class="nav-item"
          @click="handleClick('withdrawalhelp')"
        >{{ $t('footer.withdrawalhelp') }}</div>
        <div class="nav-item" @click="handleClick('contactus')">{{ $t('footer.contactus') }}</div>
        <!-- <div class="nav-item">{{ $t('footer.app') }}</div> -->
        <a :href="agentUrl" class="nav-item" target="_blank">{{ $t('footer.agentLogin') }}</a>
      </div>
      <div
        class="copyright flex flex-center flex-items-center"
      >{{ siteName }} {{ $t('footer.copyright') }} © 2019-2029</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      platformList: [
        'ag',
        'bbin',
        'eg',
        'ka',
        'mg',
        'pg',
        'ps',
        'sa',
        'vr',
        'wm'
      ],
      siteName: 'Demo',
      TelService: [],
      isTelBlank: true,
      isQQBlank: true,
      QQService: null,
      OnlineService: null,
      WechatService: null,
      QRCodeImg: null,
      isQRCodeImg: true,
      agentUrl: process.env.VUE_APP_AGENT_URL
    }
  },
  methods: {
    bgUrl(name) {
      return require(`../../assets/images/footer/${name}_logo.svg`)
    },
    goTop() {
      window.scrollTo({ behavior: 'smooth', top: 0 })
    },
    openOnlineService() {
      window.open(this.OnlineService, '_blank')
    },
    handleClick(txt) {
      switch (txt) {
        case 'about':
          this.$router
            .push({
              name: 'About'
            })
            .catch(() => {})
          break
        case 'question':
          this.$router
            .push({
              name: 'Question'
            })
            .catch(() => {})
          break
        case 'agenthelp':
          this.$router
            .push({
              name: 'AgentHelp'
            })
            .catch(() => {})
          break
        case 'deposithelp':
          this.$router
            .push({
              name: 'DepositHelp'
            })
            .catch(() => {})
          break
        case 'withdrawalhelp':
          this.$router
            .push({
              name: 'WithdrawalHelp'
            })
            .catch(() => {})
          break
        case 'contactus':
          this.$router
            .push({
              name: 'ContactUs'
            })
            .catch(() => {})
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Footer {
  width: 100%;
  height: 200px;
  background: rgb(51, 54, 61);
  font-size: 11pt;
  .platform-row {
    width: 100%;
    height: 70px;
    background-color: rgb(249, 249, 249);
    .icon {
      height: 100%;
      margin: 0 20px;
      img {
        height: 45%;
        filter: grayscale(100%);
        transition: .3s all ease-in-out;
        &:hover {
          filter: grayscale(0%);
        }
      }
    }
  }
  .section {
    width: 1200px;
    height: 130px;
    color: rgb(137, 148, 167);
    letter-spacing: 0px;
    line-height: 24px;
    overflow: hidden;
    .nav-item {
      margin: 0 20px;
      cursor: pointer;
      transition: all 0.3s;
      color: #8994a7;
      &:hover {
        color: rgb(255, 255, 255);
      }
    }
    .copyright {
      margin-top: 20px;
      font-size: 11pt;
    }
  }
}
</style>
