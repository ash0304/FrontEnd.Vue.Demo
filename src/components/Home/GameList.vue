<template>
  <div id="game-list" class="game-list flex flex-column flex-items-center flex-center default">
    <div class="width-1300">
      <div class="title"></div>
      <div class="body flex flex-between">
        <div class="type-list">
          <div
            v-for="(item,index) in gameList"
            :key="item.name"
            :class="{active:index === nowGameIndex}"
            @click="nowGameIndex = index"
          >
            <span>{{ item.display }}</span>
          </div>

          <div class="white"></div>
        </div>
        <transition-group name="center" class="center" tag="div">
          <div :key="nowGameIndex" :class="['img-'+(nowGameIndex+1)]"></div>
        </transition-group>
        <transition-group
          name="platform-list"
          class="platform-list"
          :class="{extend:nowGameData.length>6}"
          tag="div"
        >
          <section :key="nowGameIndex">
            <div
              v-for="(item,index) in nowGameData"
              :key="nowGameIndex+'-'+item.ID"
              @click="gameLogin(item.ID, item.GameCode,index)"
            >
              <span>
                <span :style="imgStyleObject(item.imgName)"></span>
                <span>{{ item.PlatformName }}</span>
              </span>
            </div>
          </section>
        </transition-group>

        <transition-group name="bg" class="bg" tag="div">
          <div :key="nowGameIndex" :class="['bg-'+(nowGameIndex+1)]"></div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
import { gameLogin, gameListByType } from '@/api/game'
import { mapGetters } from 'vuex'
import Slots from '@/views/SlotsPages/SlotsInner'
import scrollmagic from 'scrollmagic'
const imgName = Slots.methods.imgName
const slotListImg = Slots.data().slotListImg
export default {
  name: 'GameList',
  data() {
    return {
      nowGameIndex: -1,
      gameData: {}
    }
  },
  computed: {
    ...mapGetters(['token']),
    nowGameData() {
      if (this.nowGameIndex !== -1 && Object.entries(this.gameData).length) {
        const name = this.gameList[this.nowGameIndex].name
        return this.gameData[name]
      } else {
        return []
      }
    },
    gameList() {
      return [
        {
          display: this.$t('navbar.sports'),
          displayEng: 'SPORT GAMES',
          name: 'Sports',
          id: '1'
        },
        {
          display: this.$t('navbar.live'),
          displayEng: 'LIVE CASINO',
          name: 'Live',
          id: '4'
        },
        {
          display: this.$t('navbar.slots'),
          displayEng: 'CASINO GAMES',
          name: 'Slots',
          id: '8'
        },
        {
          display: this.$t('navbar.fishing'),
          displayEng: '',
          name: 'Fishing',
          id: '32'
        },
        {
          display: this.$t('navbar.chessgame'),
          displayEng: '',
          name: 'ChessGame',
          id: '64'
        },
        {
          display: this.$t('navbar.bingo'),
          displayEng: 'LOTTERY GAMES',
          name: 'Bingo',
          id: '16'
        }
      ]
    }
  },
  created() {
    this.getAllList()
  },
  mounted() {
    setTimeout(() => {
      const controller = new scrollmagic.Controller()

      new scrollmagic.Scene({
        triggerElement: '#game-list',
        triggerHook: 0.8,
        reverse: false
      })
        .setClassToggle('#game-list', 'enter')
        .addTo(controller)
    }, 500)
  },
  methods: {
    gameLogin(PlatformID, GameCode, index) {
      const data = {
        PlatformID: PlatformID,
        GameCode: GameCode,
        DeviceType: 0
      }
      if (this.gameList[this.nowGameIndex].name === 'Slots') {
        this.$router.push({ name: 'SlotsInner', params: { index: index }})
      } else {
        if (this.token) {
          gameLogin(data).then(response => {
            const Data = response
            if (Data.Code === 0) {
              window.open(response.Data, '_blank')
            } else {
              this.$modalHint.show({
                text: this.$t(`responseMsg.response_${Data.Code}`)
              })
            }
          })
        } else {
          this.$modalHint.show({
            text: this.$t('login.error3'),
            callbackFnc: () => {
              this.$router
                .push({
                  name: 'Login'
                })
                .catch(() => {})
            }
          })
        }
      }
    },
    imgStyleObject(img) {
      return Slots.methods.imgStyleObject(img)
    },
    getAllList() {
      for (const item of this.gameList) {
        this.gameListByType(item.id, item.name)
      }
      console.log(this.gameData)
    },
    gameListByType(id, name) {
      gameListByType({ GameType: id }).then(response => {
        const Data = response
        if (Data.Code === 0) {
          const gameData = Data.Data.map(item => {
            return {
              ...item,
              imgName: imgName(item.PlatformCode, slotListImg)
            }
          })
          this.gameData[name] = gameData
          setTimeout(() => {
            this.nowGameIndex = 0
          }, 500)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.game-list {
  padding-top: 100px;
  min-height: 855px;
  .width-1300 {
    .title {
      height: 85px;
      background: url('../../assets/images/home/title_betting.png') no-repeat
        left center;
      background-size: contain;
      margin-bottom: 60px;
    }
    .body {
      color: #39404d;
      padding-left: 60px;
      position: relative;
      .type-list {
        position: relative;
        height: 710px;
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: space-around;

        .white {
          width: 100%;
          height: 20px;
          background: #fff;
          position: absolute;
          transform: skewX(20deg) translateX(63px);
          bottom: 50%;
          right: 0%;
          pointer-events: none;
        }
        > div {
          font-size: 20px;

          transition: 0.5s;
          display: block;
          transition: 0.5s;
          width: 180px;
          height: calc(100% / 6);
          position: relative;
          > span {
            transition: 0.5s;
            display: block;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            &:before {
              content: '';
              top: 50%;
              width: 100%;
              height: 65px;
              position: absolute;
              box-shadow: 0 0 12px rgba(90, 116, 231, 0.25);
              background: #fff;
              z-index: -1;
              opacity: 0;
              transition: 0.5s;
              pointer-events: none;
            }
          }

          &:hover {
            > span {
              color: #4765f3;
              font-weight: bold;
              cursor: pointer;
              font-size: 22px;
            }
          }
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3) {
            > span {
              &:before {
                left: 12px;
                transform: skewX(20deg) translate(0px, -50%);
              }
            }
          }
          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(6) {
            > span {
              &:before {
                left: -12px;
                transform: skewX(-20deg) translate(0px, -50%);
              }
            }
          }
          &:nth-child(1),
          &:nth-child(6) {
            transform: translateX(-25%);
          }
          &:nth-child(3),
          &:nth-child(4) {
            transform: translateX(25%);
          }
          &.active {
            pointer-events: none;
            > span {
              font-size: 26px;
              color: #4765f3;
              font-weight: bold;
              transform: translateX(35px);
              &:before {
                opacity: 1;
              }
            }
          }
        }
        &:before {
          content: '';
          top: 0;
          left: 0;
          width: 185px;
          height: 50%;
          position: absolute;
          border-right: 3px solid #4765f3;
          box-shadow: 0 0 12px rgba(90, 116, 231, 0.25);
          transform: skewX(20deg);
          background: #fff;
          z-index: -2;
        }
        &:after {
          z-index: -2;
          content: '';
          bottom: 0;
          left: 0;
          width: 185px;
          height: 50%;
          position: absolute;
          border-right: 3px solid #4765f3;
          box-shadow: 0 2px 12px 0 rgba(90, 116, 231, 0.25);
          transform: skewX(-20deg);
          background: #fff;
        }
      }
      .center {
        width: 100%;
        position: relative;
        > div {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: 0.5s;
          background-size: 1500px !important;
          &:before {
            content: '';
            top: 0;
            left: 0;
            background-size: 1400px !important;
            width: 100%;
            height: 100%;
            position: absolute;
            animation: float-things 2s linear infinite alternate-reverse;
          }
          &:after {
            content: '';
            top: 0;
            left: 0;
            background-size: 1400px !important;
            width: 100%;
            height: 100%;
            position: absolute;
            animation: float-things 2s linear -0.5s infinite alternate-reverse;
          }

          @for $i from 1 through 6 {
            &.img-#{$i} {
              background: url('../../assets/images/home/center_0#{$i}.png')
                no-repeat
                center
                center;
              &:before {
                background: url('../../assets/images/home/center_0#{$i}_thing01.png')
                  no-repeat
                  center
                  center;
              }
              &:after {
                background: url('../../assets/images/home/center_0#{$i}_thing02.png')
                  no-repeat
                  center
                  center;
              }
            }
          }
        }
      }
      .platform-list {
        position: absolute;
        right: 0;
        height: 100%;
        width: 180px;
        // align-items: center;
        overflow: hidden;
        &.extend {
          > section {
            // justify-content: space-around;
            > div {
              flex: 1;
              height: 100%;
              &:after {
                box-shadow: 0 0 5px rgba(90, 116, 231, 0.25);
              }
            }
          }
        }
        > section {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0;

          transition: 0.5s;
          > div {
            transition-delay: 0.5s;
            $item-height: 76px;
            width: 100%;
            height: 125px;
            position: relative;
            background: url('../../assets/images/home/arrow_diamonds_blue.png')
              no-repeat center right;
            background-size: contain;
            $right-range: 31px;
            cursor: pointer;
            &:before {
              transition: 0.3s;
              content: '';
              right: $right-range;
              height: $item-height;
              width: 8px;
              background: #4765f3;
              top: calc(50% + 1px);
              transform: translateY(-50%);
              position: absolute;
              pointer-events: none;
            }
            &:after {
              box-shadow: 0 0 12px rgba(90, 116, 231, 0.25);
              content: '';
              left: 0;
              height: $item-height;
              width: calc(100% - #{$right-range});
              top: calc(50% + 1px);
              transform: translateY(-50%);
              position: absolute;
              pointer-events: none;
              background: rgba(255, 255, 255, 0.4);
              z-index: -1;
            }
            &:hover {
              &:before {
                width: calc(100% - #{$right-range});
              }
              > span {
                color: white;
                > span:first-child {
                  background: #fff;
                }
              }
            }
            > span {
              display: block;
              height: 100%;
              position: relative;
              font-size: 20px;
              color: #39404d;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding-right: $right-range;
              > span {
                display: block;

                &:first-child {
                  mask-size: contain !important;
                  background: #518eff;
                  height: 30px;
                  width: 80%;
                }
              }
            }
          }
        }
      }
      .bg {
        z-index: -3;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        > div {
          width: 100%;
          height: 100%;
          transition: 0.5s;
          background-size: cover !important;
          @for $i from 1 through 6 {
            &.bg-#{$i} {
              background: url('../../assets/images/home/center_0#{$i}_bg.jpg')
                no-repeat
                center
                center;
            }
          }
        }
      }
    }
  }
  &.default {
    opacity: 0;
    transition: 1s;
    filter: blur(20px);
    .type-list {
      transform: translateX(-50%);
      transition: 1s;
    }
    .platform-list {
      transform: translateX(50%);
      transition: 1s;
    }
  }
  &.enter {
    opacity: 1;
    filter: blur(0px);
    .type-list,
    .platform-list {
      transform: translateX(0%);
    }
  }
}
.bg-leave-active {
  transition: 0.1s !important;
}

.bg-leave-to {
  opacity: 0;
}
.bg-enter {
  filter: blur(20px);
  opacity: 0;
}

.center-enter {
  filter: blur(20px);
  transform: scale(0.1);
  opacity: 0;
}
.center-leave-to {
  opacity: 0;
}

.platform-list-enter,
.platform-list-leave-to {
  opacity: 0;
  filter: blur(20px);
  transform: translateX(80%);
}

@keyframes float-things {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(50px);
  }
}
</style>
