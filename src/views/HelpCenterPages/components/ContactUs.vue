<template>
  <div class="inner-content">
    <div class="small-title">如有任何问题，请随时跟我们联系：</div>
    <div class="contact-info flex">
      <div v-if="!isTelBlank" class="contact-item">
        <div class="contact-item-title">客服热线</div>
        <div class="contact-item-info">{{ TelService[0] }}</div>
        <div class="contact-item-info">{{ TelService[1] }}</div>
      </div>
      <div v-if="!isQQBlank" class="contact-item">
        <div class="contact-item-title">客服QQ</div>
        <div class="contact-item-info">{{ QQService[0] }}</div>
        <div class="contact-item-info">{{ QQService[1] }}</div>
      </div>
      <div v-if="OnlineService" class="contact-item">
        <div class="contact-item-title">在线客服</div>
        <div class="contact-item-info cursor pointer btn" @click="openOnlineService">点击开始咨询</div>
      </div>
      <div v-if="WechatService" class="contact-item">
        <div class="contact-item-title">客服微信</div>
        <div class="contact-item-info">{{ WechatService }}</div>
        <div v-if="isQRCodeImg" class="contact-item-img">
          <img :src="QRCodeImg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { siteInfo } from '../../../api/gameSite'
export default {
  name: 'ContactUs',
  data() {
    return {
      TelService: null,
      isTelBlank: true,
      isQQBlank: true,
      QQService: null,
      OnlineService: null,
      WechatService: null,
      QRCodeImg: null,
      isQRCodeImg: true
    }
  },
  created() {
    this.siteInfo()
  },
  methods: {
    siteInfo() {
      siteInfo().then(response => {
        const Data = response
        if (Data.Code === 0) {
          // 圖片路徑處理
          const Regexp = /UploadFolder/gi
          this.TelService = response.Data.TelService
          const isBlankString = currentValue => currentValue === ''
          this.isTelBlank = this.TelService.every(isBlankString)
          this.QQService = response.Data.QQService
          this.isQQBlank = this.QQService.every(isBlankString)
          this.OnlineService = response.Data.OnlineService
          this.WechatService = response.Data.WechatService
          this.QRCodeImg = response.Data.QRCodeImg
          if (this.QRCodeImg) {
            this.QRCodeImg = this.QRCodeImg.replace(
              Regexp,
              `${process.env.VUE_APP_BASE_URL}UploadFolder`
            )
            this.isQRCodeImg = true
          } else {
            this.isQRCodeImg = false
          }
        } else {
          const errorMsg = {
            text: this.$t(`responseMsg.response_${Data.Code}`)
          }
          this.$modalHint.show(errorMsg)
        }
      })
    },
    openOnlineService() {
      window.open(this.OnlineService, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.inner-content {
  height: 292px;
  .contact-info {
    width: 100%;
    justify-content: space-between;
    .contact-item {
      width: 250px;
      text-align: left;
      .contact-item-title {
        color: #4765f3;
        font-size: 20px;
        line-height: 30px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .contact-item-info {
        color: #8a8989;
        font-size: 16px;
        line-height: 30px;
        letter-spacing: 2px;
        position: relative;
        &.btn {
          z-index: 1;
          color: #fff;
          width: 120px;
          height: 36px;
          text-align: center;
          font-size: 14px;
          &:before {
            position: absolute;
            content: '';
            top: -12%;
            z-index: -1;
            border-radius: 2px;
            width: 120px;
            height: 36px;
            left: 0px;
            background: #4b62d6;
          }
          &:hover {
            &:before {
              background-color: #2d46b5;
            }
          }
        }
      }
      .contact-item-img {
        width: 150px;
        height: 150px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cursor {
        &:hover {
          color: #8dddff;
          img {
            opacity: 1;
          }
        }
        img {
          opacity: 0.5;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
