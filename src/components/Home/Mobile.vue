<template>
  <div id="mobile" class="mobile">
    <div class="inner-container margin-center flex">
      <div class="left">
        <div class="title"></div>
        <div class="text">{{ $t('mobile.info1') }}</div>
        <div class="icons flex">
          <div class="icon-box">
            <div class="qrcode"></div>
            <div class="caption">{{ $t('mobile.qrCaption') }}</div>
          </div>
          <div class="icon-box">
            <div class="h5"></div>
            <div class="caption">{{ $t('mobile.h5Caption') }}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="phoneA phone1">
          <div class="btn btn1"></div>
        </div>
        <div class="phoneB phone2">
          <div class="btn btn2"></div>
        </div>
        <div class="phoneB phone3">
          <div class="btn btn3"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import scrollmagic from 'scrollmagic'

export default {
  name: 'Mobile',
  mounted() {
    setTimeout(() => {
      const controller = new scrollmagic.Controller()

      new scrollmagic.Scene({
        triggerElement: '#mobile',
        triggerHook: 0.8,
        reverse: false
      })
        .setClassToggle('.phone1, .phone2, .phone3, .left', 'ani')
        .addTo(controller)
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
.mobile {
  width: 100%;
  height: 800px;
  background: url('../../assets/images/home/bg_app_download.png');
  position: relative;
  .inner-container {
    height: 800px;
    padding-top: 100px;
    width: 1300px;
    .left {
      width: 400px;
      transform: translateX(-100px);
      transition: 2s all;
      opacity: 0;
      &.ani {
        transform: translateX(0px);
        opacity: 1;
      }
      .title {
        width: 322px;
        height: 90px;
        background: url('../../assets/images/home/title_app_download.png');
      }
      .text {
        margin-top: 20px;
        color: #39404d;
        text-align: left;
        font-size: 17px;
        line-height: 40px;
      }
      .icons {
        width: 350px;
        height: 164px;
        background: url('../../assets/images/home/app_download_img1.png');
        position: relative;
        margin-top: 150px;
        .icon-box {
          width: 50%;
          .qrcode {
            margin: -10px auto 0;
            width: 108px;
            height: 108px;
            background: url('../../assets/images/home/app_download_qrcode.png');
          }
          .h5 {
            margin: -10px auto 0;
            width: 72px;
            height: 82px;
            background: url('../../assets/images/home/app_download_iconh5.png');
          }
          .caption {
            color: #39404d;
            font-size: 16px;
            line-height: 40px;
          }
        }
      }
    }
    .right {
      position: relative;
      width: 900px;
      .phoneA {
        position: absolute;
        width: 300px;
        height: calc(300px / 0.51);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        z-index: 3;
        left: 40%;
      }
      .phoneB {
        position: absolute;
        width: 300px;
        height: calc(300px / 0.51);
        background-size: 85% 85%;
        background-position: center center;
        background-repeat: no-repeat;
        z-index: 2;
      }
      .phone1 {
        background-image: url('../../assets/images/home/img_app2.png');
        transform: translateY(50px);
        transition: 2s all;
        opacity: 0;
        &.ani {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .phone2 {
        background-image: url('../../assets/images/home/img_app3.png');
        left: 60%;
        transform: translateX(50px);
        transition: 2s all;
        opacity: 0;
        &.ani {
          opacity: 1;
          transform: translateX(0px);
        }
      }
      .phone3 {
        background-image: url('../../assets/images/home/img_app4.png');
        left: 20%;
        transform: translateX(-50px);
        transition: 2s all;
        opacity: 0;
        &.ani {
          opacity: 1;
          transform: translateX(0px);
        }
      }
      .btn {
        width: 83px;
        height: 99px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        &.btn1 {
          background-image: url('../../assets/images/home/icon_app4.png');
          bottom: -6%;
          left: 36.5%;
        }
        &.btn2 {
          background-image: url('../../assets/images/home/icon_app3.png');
          bottom: 0;
          left: 36.5%;
        }
        &.btn3 {
          background-image: url('../../assets/images/home/icon_app2.png');
          bottom: 0;
          left: 36.5%;
        }
      }
    }
  }
}
</style>
