<template>
  <div
    v-if="modalShow"
    class="siteNotify-modal-bg flex flex-items-center custom-modal-bg"
    :class="{'bounce-in': effectShow, 'bounce-out': !effectShow}"
    @click.self="modalClose"
  >
    <div class="siteNotify-modal">
      <div class="siteNotify-modal-subtitle">{{ Title }}</div>
      <div class="siteNotify-modal-time">{{ SentDate | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
      <div class="siteNotify-modal-content margin-center" v-html="Content"></div>
      <div class="member-center-btn pointer" @click="modalClose">{{ $t('modal.close') }}</div>
    </div>
  </div>
</template>
<script>
import ModalSiteNotify from '../../utils/SiteNotifyModal'
import { parseTime } from '../../utils/parseTime'

export default {
  name: 'SiteNotifyModal',
  filters: {
    parseTime
  },
  data() {
    return {
      modalShow: false,
      effectShow: false,
      Content: '',
      SentDate: '',
      Title: ''
    }
  },
  beforeMount() {
    ModalSiteNotify.EventBus.$on('show', params => {
      this.modalOpen(params)
    })
  },
  methods: {
    modalOpen(params) {
      this.Title = params.Title
      this.SentDate = params.SentDate
      this.Content = params.Content
      this.modalShow = true
      setTimeout(() => {
        document.body.style['overflow-y'] = 'hidden'
        this.effectShow = true
      }, 0)
    },
    modalClose() {
      this.effectShow = false
      document.body.style['overflow-y'] = 'auto'
      setTimeout(() => {
        this.modalShow = false
      }, 200)
    }
  }
}
</script>
<style lang="scss" scoped>
$modal-height: 500px;
.siteNotify-modal-bg {
  overflow: auto;
  justify-content: center;
  @media (min-height: $modal-height) {
    align-items: center;
  }
  .siteNotify-modal {
    width: 500px;
    height: $modal-height;
    position: relative;
    z-index: 2001;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
      max-width: 100%;
    }
    .siteNotify-modal-subtitle {
      font-size: 20px;
      color: #39404d;
      width: 430px;
      text-align: left;
      margin: 40px auto 0px auto;
    }
    .siteNotify-modal-time {
      font-size: 12px;
      color: #95969a;
      width: 430px;
      text-align: left;
      margin: 0px auto 30px auto;
    }
    .siteNotify-modal-content {
      padding-left: 35px;
      padding-right: 35px;
      height: 315px;
      color: #39404d;
      text-align: left;
      word-wrap: break-word;
      overflow-y: auto;
    }
    .member-center-btn {
      margin-top: 10px;
    }
  }
}
</style>
