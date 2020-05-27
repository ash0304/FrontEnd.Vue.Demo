<template>
  <div class="sportsbet-list flex flex-column flex-items-center default">
    <div class="width-1300">
      <div class="title"></div>
      <div class="body">
        <div class="sportsbet-banner-box">
          <div class="sportsbet-player-1 animated fast"></div>
          <div class="sportsbet-player-2 animated fast"></div>
          <div class="sportsbet-soccer-box animated">
            <div class="sportsbet-soccer-cn">足球</div>
            <div class="sportsbet-soccer-en">SOCCER</div>
          </div>
          <div class="sportsbet-soccer-line animated"></div>
          <div class="sportsbet-basketball-box animated">
            <div class="sportsbet-basketball-cn">篮球</div>
            <div class="sportsbet-basketball-en">BASKETBALL</div>
          </div>
          <div class="sportsbet-basketball-line animated"></div>
          <div class="sportsbet-tennis-box animated slow">
            <div class="sportsbet-tennis-cn">网球</div>
            <div class="sportsbet-tennis-en">TENNIS</div>
          </div>
          <div class="sportsbet-button animated slow" @click="goToSports">{{ $t('sportsbet.bet') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import scrollmagic from 'scrollmagic'
export default {
  name: 'SportsBet',
  mounted() {
    setTimeout(() => {
      const controller = new scrollmagic.Controller()

      new scrollmagic.Scene({
        triggerElement: '.sportsbet-list',
        triggerHook: 0.5
      })
        .setClassToggle(
          '.sportsbet-player-1, .sportsbet-soccer-box, .sportsbet-soccer-line',
          'fadeInLeft'
        )
        .addTo(controller)
      new scrollmagic.Scene({
        triggerElement: '.sportsbet-list',
        triggerHook: 0.5
      })
        .setClassToggle(
          '.sportsbet-player-2, .sportsbet-basketball-box, .sportsbet-basketball-line',
          'fadeInRight'
        )
        .addTo(controller)
      new scrollmagic.Scene({
        triggerElement: '.sportsbet-list',
        triggerHook: 0.5
      })
        .setClassToggle('.sportsbet-tennis-box', 'zoomIn')
        .addTo(controller)
      new scrollmagic.Scene({
        triggerElement: '.sportsbet-list',
        triggerHook: 0.5
      })
        .setClassToggle('.sportsbet-button', 'fadeInDown')
        .addTo(controller)
    }, 500)
  },
  methods: {
    goToSports() {
      this.$router
        .push({
          name: 'Sports'
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.sportsbet-list {
  padding-top: 100px;
  min-height: 610px;
  background: url('../../assets/images/home/bg.jpg') center center no-repeat;
  .width-1300 {
    .title {
      height: 85px;
      background: url('../../assets/images/home/e_title.png') no-repeat left
        center;
      background-size: contain;
    }
    .body {
      .sportsbet-banner-box {
        display: flex;
        justify-content: center;
        position: relative;
        width: 1300px;
        height: 610px;
        .sportsbet-player-1 {
          position: absolute;
          width: 416px;
          height: 468px;
          background: url('../../assets/images/home/player_soccer.png');
          top: -80px;
          left: 480px;
        }
        .sportsbet-player-2 {
          position: absolute;
          width: 290px;
          height: 410px;
          background: url('../../assets/images/home/player_basketball.png');
          top: 190px;
          left: 650px;
        }
        .sportsbet-soccer-box {
          position: absolute;
          width: 100px;
          height: 42px;
          background: url('../../assets/images/home/soccer_01.png');
          left: 150px;
          top: 100px;
          cursor: default;
          .sportsbet-soccer-cn {
            position: absolute;
            font-size: 14px;
            color: #4266f0;
            right: 20px;
            top: -10px;
          }
          .sportsbet-soccer-en {
            position: absolute;
            font-size: 16px;
            font-weight: bold;
            color: #4266f0;
            top: 10px;
            left: 20px;
          }
        }
        .sportsbet-soccer-line {
          position: absolute;
          width: 120px;
          height: 44px;
          background: url('../../assets/images/home/soccer_02.png');
          left: 200px;
          top: 150px;
        }
        .sportsbet-basketball-box {
          position: absolute;
          width: 144px;
          height: 52px;
          background: url('../../assets/images/home/basketball_01.png');
          left: 1120px;
          top: 450px;
          cursor: default;
          .sportsbet-basketball-cn {
            position: absolute;
            font-size: 14px;
            color: #4266f0;
            right: 20px;
            top: -10px;
          }
          .sportsbet-basketball-en {
            position: absolute;
            font-size: 16px;
            font-weight: bold;
            color: #4266f0;
            top: 10px;
            left: 20px;
          }
        }
        .sportsbet-basketball-line {
          position: absolute;
          width: 60px;
          height: 1px;
          background: url('../../assets/images/home/basketball_02.png');
          left: 1020px;
          top: 475px;
        }
        .sportsbet-tennis-box {
          position: absolute;
          width: 96px;
          height: 40px;
          background: url('../../assets/images/home/tennis_01.png');
          left: 830px;
          top: -20px;
          cursor: default;
          .sportsbet-tennis-cn {
            position: absolute;
            font-size: 14px;
            color: #7b818e;
            right: 20px;
            top: -10px;
          }
          .sportsbet-tennis-en {
            position: absolute;
            font-size: 16px;
            font-weight: bold;
            color: #7b818e;
            top: 10px;
            left: 20px;
          }
        }
        .sportsbet-button {
          position: absolute;
          margin: 0 auto;
          width: 265px;
          height: 60px;
          line-height: 60px;
          font-weight: bold;
          background: url('../../assets/images/home/e_btn.png');
          color: #4266f0;
          font-size: 20px;
          transition: all 0.3s ease-in-out;
          left: 100px;
          top: 400px;
          &:hover {
            cursor: pointer;
            background: url('../../assets/images/home/e_btn01.png');
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
