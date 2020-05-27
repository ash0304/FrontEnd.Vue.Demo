<template>
  <div id="service-trigger" class="service-info flex flex-center default">
    <div class="width-1300">
      <div class="title"></div>
      <div class="body flex">
        <div>
          <div class="img">
            <span>{{ aniNum1 }}</span>
          </div>
          <div class="slogan">{{ $t('ServiceInfo.slogan1') }}</div>
          <div class="slogan-eng">{{ $t('ServiceInfo.sloganEng1') }}</div>
          <div class="content">{{ $t('ServiceInfo.content1') }}</div>
        </div>
        <div>
          <div class="img">
            <span>{{ aniNum2 }}</span>
          </div>
          <div class="slogan">{{ $t('ServiceInfo.slogan2') }}</div>
          <div class="slogan-eng">{{ $t('ServiceInfo.sloganEng2') }}</div>
          <div class="content">{{ $t('ServiceInfo.content2') }}</div>
        </div>
        <div>
          <div class="img">
            <span>{{ aniNum3 }}</span>
          </div>
          <div class="slogan">{{ $t('ServiceInfo.slogan3') }}</div>
          <div class="slogan-eng">{{ $t('ServiceInfo.sloganEng3') }}</div>
          <div class="content">{{ $t('ServiceInfo.content3') }}</div>
        </div>
        <div>
          <div class="img">
            <span>{{ aniNum4 }}</span>
          </div>
          <div class="slogan">{{ $t('ServiceInfo.slogan4') }}</div>
          <div class="slogan-eng">{{ $t('ServiceInfo.sloganEng4') }}</div>
          <div class="content">{{ $t('ServiceInfo.content4') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { gsap } from 'gsap'
import scrollmagic from 'scrollmagic'

export default {
  name: 'ServiceInfo',
  data() {
    return {
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      tnum1: 0,
      tnum2: 0,
      tnum3: 0,
      tnum4: 0,
      duration: 1
    }
  },
  computed: {
    aniNum1: function() {
      return this.tnum1.toFixed(0)
    },
    aniNum2: function() {
      return this.tnum2.toFixed(0)
    },
    aniNum3: function() {
      return this.tnum3.toFixed(0)
    },
    aniNum4: function() {
      return this.tnum4.toFixed(0)
    }
  },
  watch: {
    num1: function(newValue) {
      gsap.to(this.$data, { duration: this.duration, tnum1: newValue })
    },
    num2: function(newValue) {
      gsap.to(this.$data, { duration: this.duration, tnum2: newValue })
    },
    num3: function(newValue) {
      gsap.to(this.$data, { duration: this.duration, tnum3: newValue })
    },
    num4: function(newValue) {
      gsap.to(this.$data, { duration: this.duration, tnum4: newValue })
    }
  },
  mounted() {
    setTimeout(() => {
      const num_controller = new scrollmagic.Controller()

      new scrollmagic.Scene({
        triggerElement: '#service-trigger',
        triggerHook: 0.8,
        reverse: false
      })
        .setClassToggle('#service-trigger', 'enter')
        .addTo(num_controller)
        .on('start', this.changeNum)
    }, 500)
  },
  methods: {
    changeNum() {
      this.num1 = 60
      this.num2 = 90
      this.num3 = 80
      this.num4 = 19
    },
    resetNum() {
      this.num1 = 0
      this.num2 = 0
      this.num3 = 0
      this.num4 = 0
    }
  }
}
</script>
<style lang="scss" scoped>
.service-info {
  padding-top: 100px;
  transition: 1s;
  .width-1300 {
    .title {
      height: 85px;
      background: url('../../assets/images/home/title_service.png') no-repeat
        left center;
      background-size: contain;
      margin-bottom: 60px;
    }
    .body {
      justify-content: space-between;
      padding: 0 40px;
      margin-bottom: 50px;
      > div {
        width: 230px;
        @for $i from 1 through 4 {
          &:nth-child(#{$i}) {
            .img {
              background: url('../../assets/images/home/service_info_0#{$i}.png')
                no-repeat
                center
                center;
            }
          }
        }
        .img {
          background-size: contain !important;
          width: 100%;
          height: 215px;
          color: #4167f8;
          font-size: 76px;
          font-weight: bold;
          position: relative;
          > span {
            position: absolute;
            left: 6px;
            bottom: -30px;
            transform: skewX(-10deg);
          }
        }
        .slogan {
          padding-top: 80px;
          color: #2e384d;
          font-size: 22px;
          font-weight: bold;
        }
        .slogan-eng {
          color: #f1f2fe;
          font-size: 18px;
          line-height: 25px;
          margin-top: 2px;
        }
        .content {
          color: #2e384d;
          padding-top: 15px;
          font-size: 14px;
        }
      }
    }
  }
  &.default {
    .title {
      transition: 0.5s;
      opacity: 0;
      transform: translateY(50px);
    }
    .body {
      transition: 0.5s;
      opacity: 0;
      transition-delay: 0.2s;
      transform: translateY(50px);
    }
  }
  &.enter {
    .title {
      transform: translateY(0%);
      opacity: 2;
    }
    .body {
      transform: translateY(0%);
      opacity: 1;
    }
  }
}
</style>
