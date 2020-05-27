<template>
  <div class="promo width-1300 flex margin-center">
    <div class="side">
      <div class="side-box">
        <div class="side-title">{{ $t('promo.promo') }}</div>
        <div
          v-for="item in tabObject"
          :key="item.ActivityType"
          :class="{active:listQuery.ActivityType === item.ActivityType}"
          class="side-item"
          @click="listQuery.ActivityType = item.ActivityType"
        >
          <img :src="require(`../assets/images/promo/side_icon_${item.ActivityType}.png`)" />
          <span class="side-text">{{ item.text }}</span>
        </div>
      </div>
    </div>
    <transition-group name="gallery" tag="div" class="gallery">
      <div v-if="!promoListFilter.length" key="nothing" class="no-event" style="color: #4765F3">{{ $t('promo.noResult') }}</div>
      <div
        v-for="item in promoListFilter"
        :key="item.ID"
        class="promo-item"
        @click="modalOpen(item)"
      >
        <div class="promo-body flex">
          <div class="check-detail">
            <div>{{ $t('promo.checkDetail') }}</div>
            <div class="arrow-img"></div>
          </div>
          <div class="promo-time">{{ item.ActivityStartDate | parseTime('{y}-{m}-{d}') }} {{ $t('promo.to') }} {{ item.ActivityEndDate | parseTime('{y}-{m}-{d}') }}</div>
          <div
            class="promo-tag"
            :class="{four: item.ActivityType === 4 }"
            :style="objectStyle(item)"
          >{{ $t(`promo.type${item.ActivityType}`) }}</div>
          <div class="promo-cover" :style="{ 'backgroundImage': `url(${item.ActivityImg})`}"></div>
        </div>
      </div>
    </transition-group>
    <div
      v-if="modalShow"
      class="promo-modal-bg custom-modal-bg"
      :class="{'bounce-in': effectShow, 'bounce-out': !effectShow}"
      @click.self="modalClose"
    >
      <div class="promo-modal">
        <div class="promo-close-btn" @click="modalClose"></div>
        <div class="promo-modal-title">{{ temp.ActivityName }}</div>
        <div class="promo-modal-bottom">
          <div class="promo-modal-body">
            <div class="promo-modal-content" v-html="temp.ActivityContent"></div>
            <div class="promo-modal-rules" v-html="temp.ActivityRule"></div>
          </div>
          <div v-if="token" class="promo-btn-area">
            <div
              v-if="temp.SignUpStatus === 0"
              class="join-btn"
              @click.self="signUpActivity(temp)"
            >立即报名</div>
            <div v-if="temp.SignUpStatus === 1" class="no-join-btn">已报名</div>
            <div v-if="temp.SignUpStatus === 2" class="no-join-btn">不须报名</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { activityList, signUpActivity } from '../api/activity'
import { parseTime } from '../utils/parseTime'
import { mapGetters } from 'vuex'

export default {
  name: 'Promo',
  filters: {
    parseTime
  },
  data() {
    return {
      currentSelect: -1,
      listQuery: {
        PageIndex: 1,
        PageSize: 1000,
        ActivityType: -1
      },
      promoList: [],
      modalShow: false,
      effectShow: false,
      temp: {
        ID: 0,
        ActivityName: '',
        ActivityStartDate: '',
        ActivityEndDate: '',
        ActivityContent: '',
        ActivityRule: '',
        SignUpStatus: 0
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    promoListFilter() {
      if (this.listQuery.ActivityType !== -1) {
        return this.promoList.filter(
          item => item.ActivityType === this.listQuery.ActivityType
        )
      } else {
        return this.promoList
      }
    },
    tabObject() {
      return [
        {
          ActivityType: -1,
          text: this.$t('promo.type0')
        },
        {
          ActivityType: 1,
          text: this.$t('promo.type1')
        },
        {
          ActivityType: 2,
          text: this.$t('promo.type2')
        },
        {
          ActivityType: 3,
          text: this.$t('promo.type3')
        },
        {
          ActivityType: 4,
          text: this.$t('promo.type4')
        }
      ]
    }
  },
  created() {
    this.getActivityList()
  },
  methods: {
    modalOpen(item) {
      this.temp.ID = item.ID
      this.temp.ActivityName = item.ActivityName
      this.temp.ActivityStartDate = item.ActivityStartDate
      this.temp.ActivityEndDate = item.ActivityEndDate
      this.temp.ActivityContent = item.ActivityContent
      this.temp.ActivityRule = item.ActivityRule
      this.temp.SignUpStatus = item.SignUpStatus
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
    },
    signUpActivity(item) {
      const passData = {
        ActivityID: item.ID
      }
      signUpActivity(passData).then(response => {
        const Data = response
        if (Data.Code === 0) {
          this.getActivityList()
          item.SignUpStatus = 1
        } else {
          const errorMsg = {
            text: this.$t(`responseMsg.response_${Data.Code}`)
          }
          this.$modalHint.show(errorMsg)
        }
      })
    },
    objectStyle(item) {
      const fixUrl = require(`../assets/images/promo/promo_tag_${item.ActivityType}.png`)
      return {
        background: `url(${fixUrl})`,
        'background-size': '100px 44px'
      }
    },
    chosePromo(id) {
      if (this.currentSelect === id) {
        this.currentSelect = -1
      } else {
        this.currentSelect = id
      }
    },
    getActivityList() {
      activityList(this.listQuery).then(response => {
        const Data = response
        if (Data.Code === 0) {
          this.promoList = response.Data.Data
          // 圖片路徑處理
          const Regexp = /UploadFolder/gi
          this.promoList.forEach(item => {
            item.ActivityImg = item.ActivityImg.replace(
              Regexp,
              `${process.env.VUE_APP_BASE_URL}UploadFolder`
            )
            item.ActivityRule = item.ActivityRule.replace(
              Regexp,
              `${process.env.VUE_APP_BASE_URL}UploadFolder`
            )
          })
        } else {
          const errorMsg = {
            text: this.$t(`responseMsg.response_${Data.Code}`)
          }
          this.$modalHint.show(errorMsg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
html {
  scroll-behavior: smooth;
}
.promo {
  $main-color: white;
  height: auto;
  padding-top: 60px !important;
  .side {
    min-width: 192px;
    position: relative;
    padding-top: 50px;
    .side-box {
      box-shadow: 0 5px 12px 5px rgba(195, 209, 234, 0.16);
      border-radius: 8px;
      .side-title {
        position: relative;
        width: 152px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        margin: 0 auto;
        color: #39404d;
        text-align: left;
        text-indent: 14px;
        border-bottom: 1px solid rgba(182, 197, 225, 0.3);
        &::before {
          content: '';
          width: 4px;
          height: 20px;
          background: #4b62d6;
          position: absolute;
          left: -20px;
          top: 20px;
        }
      }
      .side-item {
        width: 132px;
        height: 60px;
        background: #ffffff;
        position: relative;
        cursor: pointer;
        font-size: 14px;
        color: rgba(46, 56, 77, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 30px;
          height: 30px;
        }
        .side-text {
          width: 72px;
          height: 30px;
          line-height: 30px;
        }
        &.active {
          img {
            transform: scale3d(1.3, 1.3, 1.3);
            transition: transform 0.3s ease-in-out;
          }
          .side-text {
            margin-left: 10px;
            font-size: 18px;
            color: #5b6ef2;
          }
        }
        &:hover {
          img {
            transform: scale3d(1.3, 1.3, 1.3);
            transition: transform 0.3s ease-in-out;
          }
          .side-text {
            margin-left: 10px;
            font-size: 18px;
            color: #5b6ef2;
          }
        }
      }
    }
  }

  .gallery {
    z-index: 1;
    width: 100%;
    margin-left: 10px;
    padding-top: 30px;
    min-height: 700px;
    position: relative;
    .no-event {
      font-size: 18px;
      font-weight: bold;
      padding-top: 100px;
      position: absolute;
      top: 0;
      left: 50%;
    }
    .promo-item {
      width: 1016px;
      min-height: 384px;
      margin-bottom: 50px;
      background: url('../assets/images/promo/promo_itembg.png') no-repeat;
      background-size: 100% 100%;
      padding: 50px 0 0px 30px;
      position: relative;
      transition: 1s;
      cursor: pointer;
      .promo-body {
        position: relative;
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
        .promo-cover {
          position: relative;
          min-width: 956px;
          height: 298px;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          z-index: 1;
        }
        .check-detail {
          position: absolute;
          color: #4765F3;
          top: -25px;
          right: 40px;
          font-size: 16px;
          display: flex;
          .arrow-img {
            width: 24px;
            height: 24px;
            background: url('../assets/images/promo/right_arrow.png') no-repeat;
            background-size: 24px 24px;
            animation: arrow-right 0.7s infinite;
          }
        }
        .promo-time {
          position: absolute;
          top: -30px;
          left: 15px;
          color: rgba(46,56,77,.5);
          font-size: 16px;
        }
        .promo-tag {
          position: absolute;
          width: 100px;
          height: 44px;
          line-height: 40px;
          text-align: center;
          z-index: 2;
          top: -10px;
          left: 10px;
          &.four {
            color: rgb(149, 83, 17);
          }
        }
      }
    }
  }
  .custom-modal-bg {
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    margin: auto;
    background: rgba(0, 0, 0, 0.8) !important;
    z-index: 2000;

    &.bounce-in {
      opacity: 1;
      transition: 0.2s opacity ease-in-out;
    }

    &.bounce-out {
      opacity: 0;
      transition: 0.2s opacity ease-in-out;
    }
  }
  .promo-modal-bg {
    z-index: 2050;
    .promo-modal {
      position: relative;
      width: 1034px;
      height: 653px;
      margin: 50px auto 0 auto;
      z-index: 2051;
      background: #ffffff;
      .promo-close-btn {
        position: absolute;
        background: url('../assets/images/promo/close_btn.png') center center
          no-repeat;
        right: 20px;
        top: 10px;
        font-size: 48px;
        width: 48px;
        height: 48px;
        line-height: 48px;
        z-index: 2052;
        &:hover {
          transform: rotate(180deg);
          transition: transform 0.5s ease-in-out;
          cursor: pointer;
        }
      }
      .promo-modal-title {
        position: relative;
        color: #2472ff;
        height: 80px;
        line-height: 80px;
        font-size: 24px;
        font-weight: 500;
      }
      .promo-modal-bottom {
        padding: 10px 40px 20px 40px;
        overflow: hidden;
        .promo-modal-body {
          height: 460px;
          overflow: auto;
          margin-bottom: 20px;
          color: black;
          text-align: left;
        }
        .promo-btn-area {
          height: 45px;
          .join-btn {
            width: 160px;
            height: 44px;
            margin: 0 auto;
            line-height: 44px;
            background: linear-gradient(90deg, #2567de, #0aa1e0);
            text-align: center;
            color: #fff;
            &:hover {
              cursor: pointer;
              background: linear-gradient(90deg, #0aa1e0, #2567de);
              transition: background 0.3s ease-in-out;
            }
          }
          .no-join-btn {
            width: 160px;
            height: 44px;
            margin: 0 auto;
            line-height: 44px;
            background: #ffffff;
            text-align: center;
            border: 1px solid #2472ff;
            color: #2472ff;
          }
        }
      }
    }
  }
}
.gallery-enter-active,
.gallery-leave-active {
  transition: all 0.2s !important;
}

.gallery-leave-to,
.gallery-enter {
  opacity: 0;
}

@keyframes arrow-right {
  0% {
    transform: translateX(0)
  }
  50% {
    transform: translateX(10px)
  }
  100% {
    transform: translateX(0px)
  }
}
</style>
