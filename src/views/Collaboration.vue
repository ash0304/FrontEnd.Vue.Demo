<template>
  <div class="Collaboration">
    <full-page id="fullpage" ref="fullpage" :options="options">
      <div class="section">
        <div class="s1">
          <div class="s1-box animated" :class="{fadeInLeft: active === 0}">
            <div class="title1"></div>
            <div class="sub-title1">{{ $t('collaboration.sub_title1') }}</div>
            <div class="icon-list flex flex-between">
              <div class="ft flex flex-column flex-items-center">
                <div class="icon icon1"></div>
                <div class="t1">{{ $t('collaboration.memberOper') }}</div>
                <div class="t2">{{ $t('collaboration.memberOper_1') }}</div>
                <div class="t2">{{ $t('collaboration.memberOper_2') }}</div>
              </div>
              <div class="ft">
                <div class="icon icon2"></div>
                <div class="t1">{{ $t('collaboration.formDetail') }}</div>
                <div class="t2">{{ $t('collaboration.formDetail_1') }}</div>
                <div class="t2">{{ $t('collaboration.formDetail_2') }}</div>
              </div>
              <div class="ft">
                <div class="icon icon3"></div>
                <div class="t1">{{ $t('collaboration.billDetail') }}</div>
                <div class="t2">{{ $t('collaboration.billDetail_1') }}</div>
                <div class="t2">{{ $t('collaboration.billDetail_2') }}</div>
              </div>
              <div class="ft">
                <div class="icon icon4"></div>
                <div class="t1">{{ $t('collaboration.commissionForm') }}</div>
                <div class="t2">{{ $t('collaboration.commissionForm_1') }}</div>
                <div class="t2">{{ $t('collaboration.commissionForm_2') }}</div>
              </div>
            </div>
            <div class="title2"></div>
            <div class="contact-info flex">
              <div class="info-item">
                <div class="title flex">
                  <div class="icon title-qq"></div>
                  <div>{{ $t('collaboration.qq_title') }}</div>
                </div>
                <div class="number">
                  <div class="line"></div>
                  <span>22007871</span>
                </div>
              </div>
              <div class="info-item">
                <div class="title flex">
                  <div class="icon title-mail"></div>
                  <div>{{ $t('collaboration.mail_title') }}</div>
                </div>
                <div class="number">
                  <div class="line"></div>
                  <span>22007871@qq.com</span>
                </div>
              </div>
              <div class="info-item">
                <div class="title flex">
                  <div class="icon title-telegram"></div>
                  <div>{{ $t('collaboration.telegram_title') }}</div>
                </div>
                <div class="number">
                  <div class="line"></div>
                  <span>@TZTVIP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="s2">
          <div class="s2-box">
            <div class="title1 animated fast" :class="{fadeInDown: active === 1}"></div>
            <div
              class="sub-title animated fast"
              :class="{fadeInDown: active === 1}"
            >{{ $t('collaboration.s2_sub_title') }}</div>
            <div class="img-group">
              <div class="ipad animated fast" :class="{fadeInUp: active === 1}"></div>
              <div class="dollor animated fast" :class="{fadeInUp: active === 1}"></div>
              <div class="stage animated fast" :class="{fadeInUp: active === 1}"></div>
              <div class="pyrid animated" :class="{fadeInDown: active === 1}">
                <div class="text-column">
                  <div class="text t1">{{ $t('collaboration.agent_level1') }}</div>
                  <div class="text t2">{{ $t('collaboration.agent_level2') }}</div>
                  <div class="text t3">{{ $t('collaboration.agent_level3') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="s3">
          <div class="s3-box">
            <div class="title1 animated" :class="{fadeInDown: active === 2}"></div>
            <div
              class="sub-title animated"
              :class="{fadeInDown: active === 2}"
            >{{ $t('collaboration.s3_sub_title') }}</div>
            <div class="img-group">
              <div class="phone animated fast" :class="{fadeInUp: active === 2}"></div>
              <div class="trophy animated" :class="{fadeInUp: active === 2}"></div>
              <div class="flower animated fast" :class="{fadeInDown: active === 2}"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="s4">
          <div class="s4-box">
            <div class="title1 animated" :class="{fadeInDown: active === 3}"></div>
            <div
              class="sub-title animated"
              :class="{fadeInDown: active === 3}"
            >{{ $t('collaboration.s4_sub_title') }}</div>
            <div class="f-list flex animated" :class="{fadeInDown: active === 3}">
              <div class="item">{{ $t('collaboration.s4_f1') }}</div>
              <div class="item">{{ $t('collaboration.s4_f2') }}</div>
              <div class="item">{{ $t('collaboration.s4_f3') }}</div>
            </div>
            <div class="img-group">
              <div class="macbook animated" :class="{fadeInUp: active === 3}"></div>
              <div class="universe animated" :class="{fadeInDown: active === 3}"></div>
            </div>
          </div>
        </div>
      </div>
    </full-page>
    <ul>
      <li :class="{active: active === 0}">
        <a href="#page1">
          <div class="anchor"></div>
        </a>
      </li>
      <li :class="{active: active === 1}">
        <a href="#page2">
          <div class="anchor"></div>
        </a>
      </li>
      <li :class="{active: active === 2}">
        <a href="#page3">
          <div class="anchor"></div>
        </a>
      </li>
      <li :class="{active: active === 3}">
        <a href="#page4">
          <div class="anchor"></div>
        </a>
      </li>
    </ul>
    <div v-if="active !== 3" class="move-down pointer" @click="$refs.fullpage.api.moveSectionDown()"></div>
  </div>
</template>
<script>
export default {
  name: 'Collaboration',
  data() {
    return {
      innerWidth: 0,
      innerHeight: 0,
      options: {
        afterLoad: this.afterLoad,
        licenseKey: 'YOUR_KEY_HERE',
        menu: '#menu',
        anchors: ['page1', 'page2', 'page3', 'page4']
      },
      active: 0
    }
  },
  created() {
    this.innerHeight = window.innerHeight
    // this.innerWidth = window.innerWidth
  },
  mounted() {
    window.onresize = () => {
      // this.innerHeight = window.innerHeight
      // this.innerWidth = window.innerWidth
    }
  },
  methods: {
    afterLoad(origin, destination, direction) {
      this.active = destination.index
    }
  }
}
</script>
<style lang="scss" scoped>
.Collaboration {
  color: red;
  min-width: 1300px;
  background: url('../assets/images/collaboration/bg.png') no-repeat;
  background-position: center top;
  background-size: 1920px 937px;
  .s1 {
    position: relative;
    height: 100%;
    .s1-box {
      height: 600px;
      width: 600px;
      position: absolute;
      top: 20%;
      left: 20%;
      opacity: 0;
      .title1 {
        width: 524px;
        height: 64px;
        background: url('../assets/images/collaboration/corporation_title.png');
      }
      .title2 {
        width: 240px;
        height: 24px;
        background: url('../assets/images/collaboration/corporation_title_01.png');
      }
      .sub-title1 {
        color: grey;
        font-size: 24px;
        text-align: left;
        line-height: 72px;
      }
      .icon-list {
        width: 600px;
        height: 250px;
        .ft {
          .icon {
            width: 104px;
            height: 104px;
            &.icon1 {
              background: url('../assets/images/collaboration/corporation_1icon1.png');
            }
            &.icon2 {
              background: url('../assets/images/collaboration/corporation_1icon2.png');
            }
            &.icon3 {
              background: url('../assets/images/collaboration/corporation_1icon3.png');
            }
            &.icon4 {
              background: url('../assets/images/collaboration/corporation_1icon4.png');
            }
          }
          .t1 {
            color: black;
            font-size: 18px;
            line-height: 36px;
          }
          .t2 {
            color: #ccc;
            font-size: 14px;
            line-height: 36px;
          }
        }
      }
      .contact-info {
        width: 600px;
        flex-wrap: wrap;
        .info-item {
          width: 300px;
          font-size: 14px;
          line-height: 30px;
          text-align: left;
          color: #1890ff;
          flex-shrink: 0;
          .title {
            align-items: center;
            margin: 25px 0 10px;
            .icon {
              width: 30px;
              height: 30px;
              background-size: 100%;
              margin-right: 10px;
              &.title-qq {
                background-image: url('../assets/images/collaboration/icon-qq.png');
              }
              &.title-mail {
                background-image: url('../assets/images/collaboration/qq_mail.png');
              }
              &.title-telegram {
                background-image: url('../assets/images/collaboration/telegram01.png');
              }
            }
          }
          .number {
            color: rgb(100, 100, 100);
            line-height: 23px;
            display: flex;
            .line {
              width: 30px;
              height: 23px;
              background: url('../assets/images/collaboration/corporation_line1.png')
                no-repeat;
              background-position: 50% 0;
            }
          }
        }
      }
    }
  }
  .s2 {
    position: relative;
    height: 100%;
    .s2-box {
      width: 800px;
      height: 500px;
      position: absolute;
      left: 21%;
      top: 15%;
      .title1 {
        opacity: 0;
        width: 354px;
        height: 34px;
        position: relative;
        background: url('../assets/images/collaboration/corporation_title_02.png');
      }
      .sub-title {
        opacity: 0;
        width: 800px;
        height: 50px;
        text-align: left;
        color: rgb(128, 128, 128);
        font-size: 16px;
        line-height: 50px;
        margin-bottom: 100px;
      }
      .img-group {
        position: relative;
        height: 440px;
        width: 760px;
        .ipad {
          opacity: 0;
          width: 566px;
          height: 400px;
          position: absolute;
          background: url('../assets/images/collaboration/page2_img_iPad.png');
        }
        .dollor {
          width: 760px;
          height: 242px;
          position: absolute;
          background: url('../assets/images/collaboration/page2_img_2.png');
          left: -108px;
          top: -30px;
          opacity: 0;
        }
        .stage {
          width: 663px;
          height: 298px;
          position: absolute;
          background: url('../assets/images/collaboration/page2_img_3.png');
          bottom: 0;
          opacity: 0;
        }
        .pyrid {
          width: 410px;
          height: 304px;
          position: absolute;
          background: url('../assets/images/collaboration/page2_img_1.png');
          left: 78px;
          top: 30px;
          opacity: 0;
          .text-column {
            position: relative;
            color: white;
            font-size: 16px;
            height: 304px;
            .text {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              font-size: 18px;
              &.t1 {
                bottom: 212px;
              }
              &.t2 {
                bottom: 130px;
              }
              &.t3 {
                bottom: 40px;
              }
            }
          }
        }
      }
    }
  }
  .s3 {
    position: relative;
    height: 100%;
    .s3-box {
      width: 800px;
      height: 500px;
      position: absolute;
      left: 21%;
      top: 15%;
      .title1 {
        opacity: 0;
        width: 570px;
        height: 36px;
        background: url('../assets/images/collaboration/corporation_title_03.png');
      }
      .sub-title {
        opacity: 0;
        width: 800px;
        height: 50px;
        text-align: left;
        color: rgb(128, 128, 128);
        font-size: 16px;
        line-height: 50px;
      }
      .img-group {
        width: 700px;
        height: 370px;
        position: relative;
        margin-left: -53px;
        .flower {
          opacity: 0;
          width: 700px;
          height: 370px;
          background: url('../assets/images/collaboration/page3_img_2.png');
          position: absolute;
        }
        .trophy {
          opacity: 0;
          width: 428px;
          height: 290px;
          background: url('../assets/images/collaboration/page3_img_1.png');
          position: absolute;
          left: 125px;
          top: 185px;
        }
        .phone {
          opacity: 0;
          width: 685px;
          height: 153px;
          background: url('../assets/images/collaboration/page3_img_iPhone.png');
          position: absolute;
          bottom: -160px;
        }
      }
    }
  }
  .s4 {
    position: relative;
    height: 100%;
    .s4-box {
      width: 800px;
      height: 500px;
      position: absolute;
      left: 21%;
      top: 15%;
      .title1 {
        opacity: 0;
        width: 438px;
        height: 38px;
        background: url('../assets/images/collaboration/corporation_title_04.png');
      }
      .sub-title {
        opacity: 0;
        width: 800px;
        height: 50px;
        text-align: left;
        color: rgb(128, 128, 128);
        font-size: 16px;
        line-height: 50px;
      }
      .f-list {
        opacity: 0;
        color: black;
        font-size: 16px;
        .item {
          width: 160px;
          height: 33px;
          line-height: 33px;
          position: relative;
          padding-left: 18px;
          text-align: left;
          &::before {
            content: ' ';
            position: absolute;
            width: 9px;
            height: 33px;
            background: url('../assets/images/collaboration/corporation_line2.png');
            top: 0;
            left: 0;
          }
        }
      }
      .img-group {
        width: 700px;
        height: 370px;
        position: relative;
        margin-left: -90px;
        margin-top: 0px;
        .macbook {
          opacity: 0;
          width: 552px;
          height: 391.53px;
          background: url('../assets/images/collaboration/page4_img_MacBook.png') no-repeat;
          background-size: 100%;
          position: absolute;
          left: 94px;
          top: 120px;
        }
        .universe {
          opacity: 0;
          width: 730px;
          height: 471px;
          background: url('../assets/images/collaboration/page4_img_1.png') no-repeat;
          background-size: 100%;
          position: absolute;
        }
      }
    }
  }
  ul {
    position: absolute;
    left: 0;
    top: 50%;
    li {
      margin-bottom: 5px;
      margin-left: -15px;
      transition: all 0.3s ease-in-out;
      a {
        .anchor {
          width: 30px;
          height: 10px;
          background: url('../assets/images/collaboration/control_off.png');
        }
      }
      &:hover,
      &.active {
        margin-left: 0px;
        .anchor {
          background: url('../assets/images/collaboration/control_on.png');
        }
      }
    }
  }
  .move-down {
    position: absolute;
    left: 50%;
    top: 90%;
    width: 42px;
    height: 54px;
    background: url('../assets/images/collaboration/arrow.png') no-repeat;
    background-size: cover;
    animation: bottomToTop 2.5s linear infinite;
    @keyframes bottomToTop {
      0%,
      70%,
      90%,
      100% {
        transform: translateY(-30px);
      }
      40% {
        transform: translateY(-50px);
      }
      60%,
      80% {
        transform: translateY(-35px);
      }
    }
  }
}
</style>
