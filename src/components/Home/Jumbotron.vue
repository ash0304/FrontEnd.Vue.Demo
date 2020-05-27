<template>
  <div class="Jumbotron">
    <swiper v-if="jumbotronList.length > 0" :options="swiperOption">
      <swiper-slide v-for="(slide, index) in jumbotronList" :key="index">
        <div class="img-area" :style="{'background-image': `url(${slide.imgFile})`}"></div>
      </swiper-slide>
      <div slot="button-prev" class="swiper-button-prev"></div>
      <div slot="button-next" class="swiper-button-next"></div>
    </swiper>
    <div class="page-container flex flex-end">
      <div slot="pagination" class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
    <div class="site-msg">
      <span class="title">{{ $t('jumbotron.msg') }}</span>
      <swiper v-if="msgList.length>1" :options="swiperOptionMsg" class="msg-container">
        <swiper-slide v-for="item in msgList" :key="item.ID">
          <div class="msg">{{ item.Content }}</div>
        </swiper-slide>
      </swiper>
      <span class="service" @click="openCS">
        <picture></picture>
        {{ $t('navbar.cs') }}
      </span>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Jumbotron',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      msgList: [
        {
          Content: '近日申辦查調案件增加網站回應較慢請略為等候。',
          ID: 1007,
          ModifyDate: '2020-05-06T18:04:24.869476',
          Title: '財政部財政資訊中心'
        },
        {
          Content: '近日申辦查調案件增加網站回應較慢請略為等候。',
          ID: 1008,
          ModifyDate: '2020-05-06T18:04:24.869476',
          Title: '財政部財政資訊中心'
        },
        {
          Content: '近日申辦查調案件增加網站回應較慢請略為等候。',
          ID: 1009,
          ModifyDate: '2020-05-06T18:04:24.869476',
          Title: '財政部財政資訊中心'
        },
        {
          Content: '近日申辦查調案件增加網站回應較慢請略為等候。',
          ID: 1010,
          ModifyDate: '2020-05-06T18:04:24.869476',
          Title: '財政部財政資訊中心'
        }
      ],
      jumbotronList: [
        {
          imgFile: require('../../assets/images/jumbotron/banner01.jpeg')
        },
        {
          imgFile: require('../../assets/images/jumbotron/banner02.jpeg')
        },
        {
          imgFile: require('../../assets/images/jumbotron/banner03.jpeg')
        },
        {
          imgFile: require('../../assets/images/jumbotron/banner04.jpeg')
        },
        {
          imgFile: require('../../assets/images/jumbotron/banner05.jpeg')
        }
      ],
      swiperOptionMsg: {
        direction: 'horizontal',
        autoplay: {
          delay: 5000,
          disableOnInteraction: true
        },
        loop: true
      },
      swiperOption: {
        slidesPerView: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet(index, className) {
            return `<div class="${className} swiper-pagination-bullet-custom"></div>`
          }
        },
        effect: 'fade',
        loop: true
      }
    }
  },
  methods: {
    openCS() {
      window.open('https://www.google.com/', '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.Jumbotron {
  position: relative;
  width: 100%;
  overflow: hidden;
  z-index: 0;
  $msg-height: 50px;
  /deep/.site-msg {
    font-size: 14px;
    text-align: left;
    height: $msg-height;
    width: 100%;
    position: relative;
    color: #2a2a2a;
    .title {
      font-weight: bold;
      font-size: 20px;
      color: #4765f3;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-520px, -50%);
      letter-spacing: 3px;
    }
    .service {
      cursor: pointer;
      position: absolute;
      right: 50%;
      line-height: 35px;
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #4765f3;
      top: 50%;
      transform: translate(600px, -50%);
      @keyframes animate1 {
        from {
          transform: rotate3d(0, 1, 0, 180deg);
        }
        to {
          transform: rotate3d(0, 1, 0, 0deg);
        }
      }
      &:hover {
        color: #0e2dc3;
        > picture {
          animation: none;
        }
      }
      > picture {
        animation: animate1 3s infinite alternate-reverse;
        width: 35px;
        height: 35px;
        margin-right: 5px;
        background: url('../../assets/images/home/icon_service_blue.png')
          no-repeat center center;
        background-size: cover;
      }
    }
    .msg-container {
      height: $msg-height;
      line-height: $msg-height;
      width: 950px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-460px);
      .msg {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .img-area {
    width: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../../assets/images/home/banner.jpg');
    padding-top: calc(580 / 1920 * 100%);
  }

  .page-container {
    width: 320px;
    height: 20px;
    position: absolute;
    bottom: 13%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    display: flex;
    align-items: center;
    // border: 1px solid #fff;
    .swiper-pagination {
      display: flex;
      align-items: center;
      /deep/.swiper-pagination-bullet-custom {
        opacity: 0.3;
        width: 60px;
        height: 4px;
        border-radius: 10px;
        margin: 0 2px;
        background-color: rgba(71, 101, 243, 0.8);
        transition: 0.5s;
        &.swiper-pagination-bullet-active {
          opacity: 1;
          height: 10px;
          background-color: #4765f3;
        }
      }
    }
  }

  .swiper-container {
    height: 100%;
  }
  .login {
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
    z-index: 1;
    transition: 0.2s;
    pointer-events: none;
    &.login-hint {
      filter: brightness(250%);
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    filter: brightness(90%);
    height: 72px;
    width: 36px;
    background: url('../../assets/images/home/swiper_right.png') center right
      no-repeat;
    background-size: contain !important;
    right: 0;
    &.swiper-button-prev {
      background: url('../../assets/images/home/swiper_left.png') center left
        no-repeat;
      right: auto;
      left: 0;
    }
    &:hover {
      filter: brightness(100%);
    }
  }
}
</style>
