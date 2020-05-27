<template>
  <div class="slot-game flex flex-center">
    <div class="list flex">
      <div
        v-for="(item,index) in slotListFilter"
        :key="index"
        :class="{active:slotListIndex === index}"
        @click.self="getSubGameList(index)"
      >
        <span class="index">0{{ index+1 }}</span>
        <span class="name">{{ item.PlatformName }}</span>
        <article>
          <div class="game flex">
            <div
              v-for="gameItem in slotGameList"
              :key="gameItem.GameCode"
              :style="{backgroundImage:`url(${gameItem.imgUrl})`}"
              class="flex flex-end"
              @click="gameLogin(gameItem.ID, gameItem.GameCode)"
            >
              <span>{{ gameItem.GameName }}</span>
            </div>
          </div>
          <div class="title flex">
            <div>
              <span>{{ item.PlatformName }}{{ $t('slotGame.slot') }}</span>
            </div>
            <picture @click="$router.push({name:'Slots',params:{index:index}})"></picture>
          </div>
        </article>
      </div>
    </div>
    <div class="slogan">{{ $t('slotGame.slogan') }}</div>
    <div class="award-list flex width-1300">
      <div v-for="(item,index) in fakeData" :key="index + item.userID">
        <span>
          <aside>{{ $t('slotGame.congratulation') }}</aside>
          {{ item.userID }}****
        </span>
        <span>
          <aside>{{ $t('slotGame.win') }}</aside>
          <b>{{ item.reward }}</b>RMB
        </span>
      </div>
      <div>
        <span>{{ $t('slotGame.superNumber') }}</span>
        <span>{{ thousandFilter(startNumber) }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { thousandFilter } from '../../utils/thousandFilter'
import { gameLogin, gameListByType, getSubGameList } from '../../api/game'
import { mapGetters } from 'vuex'
export default {
  name: 'SlotGame',
  data() {
    return {
      startNumber: 74185296300,
      endNumber: 99999999999,
      gamelist: [
        '仙境冒险',
        '沙漠宝藏',
        '招财狮',
        '月光秘宝',
        '江山美人',
        '龙王',
        '雷声鸟',
        '卡里古拉',
        '斗牛士',
        '达芬奇法典',
        '八宝一后',
        '神的时代',
        '猫女王',
        '超级888',
        '龙之王国',
        '足球狂欢节',
        '翡翠公主',
        '疯狂麻将',
        '鬼屋',
        '好事成双',
        '最伟大的奥德赛',
        '吉祥8',
        '热力宝石',
        '六福兽',
        '金土地',
        '烈焰钻石',
        'VIP百家乐',
        '幸运熊猫'
      ],
      fakeData: [],
      gameUrl: '',
      baseUrl: `${process.env.VUE_APP_BASE_URL}SubGameIcon/`,
      slotList: [],
      slotListIndex: 0,
      slotGameList: [],
      dataInterval: setInterval(this.createFakeData, 6000),
      numInterval1: null,
      numInterval2: null
    }
  },
  computed: {
    ...mapGetters(['token']),
    slotListFilter() {
      return this.slotList.slice(0, 4)
    }
  },
  watch: {
    startNumber() {
      if (this.startNumber >= this.endNumber) {
        clearInterval(this.numInterval1)
        clearInterval(this.numInterval2)
        this.startNumber = this.endNumber
      }
    }
  },
  created() {
    this.createFakeData()
    this.gameListByType()
    this.numberAnimationInit()
  },
  beforeDestroy() {
    clearInterval(this.dataInterval)
    clearInterval(this.numInterval1)
    clearInterval(this.numInterval2)
  },
  methods: {
    numberAnimationInit() {
      this.numInterval1 = setInterval(() => {
        this.startNumber += 1000000
      }, 1000)
      this.numInterval2 = setInterval(() => {
        for (let i = 0; i < 6; i++) {
          const n = 10 ** i
          this.startNumber += n
        }
      }, 1)
    },
    thousandFilter(number) {
      return thousandFilter(number)
    },
    createFakeData() {
      this.fakeData = new Array(3).fill({}).map(item => {
        return {
          userID: this.makeid(this.getRandom(5, 3)),
          gameName: this.gamelist[this.getRandom(20, 0)],
          reward: `${this.getRandom(5678, 1).toString()}.${this.getRandom(
            10,
            0
          )}${this.getRandom(9, 1)}`
        }
      })
    },
    makeid(length) {
      let result = ''
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return result
    },
    getRandom(length, offset) {
      // range 0 + offset ~ length + offset
      return Math.floor(Math.random() * length) + offset
    },
    gameListByType() {
      const data = {
        GameType: 8
      }
      gameListByType(data).then(response => {
        const Data = response
        if (Data.Code === 0) {
          this.slotList = response.Data.map((item, index) => {
            return {
              ...item,
              index: index
            }
          })
          this.getSubGameList()
        } else {
          this.$modalHint.show({
            text: this.$t(`responseMsg.response_${Data.Code}`)
          })
        }
      })
    },
    getSubGameList(index = 0) {
      this.slotListIndex = index
      this.startNumber = Math.floor(Math.random() * 100000000000)
      const game = this.slotList[this.slotListIndex]
      const data = {
        GameID: game.ID,
        PlatformType: 8,
        DeviceType: 0,
        PageIndex: 1,
        PageSize: 6
      }
      getSubGameList(data).then(res => {
        if (res.Code === 0) {
          this.slotGameList = res.Data.Data.map(item => {
            return {
              ...item,
              imgUrl: `${this.baseUrl}${game.PlatformCode}/${item.GameCode}.jpg`
            }
          })
          setTimeout(() => {
            this.showSpinner = false
          }, 1000)
        }
      })
    },
    gameLogin(PlatformID, GameCode) {
      const data = {
        PlatformID: PlatformID,
        GameCode: GameCode,
        DeviceType: 0
      }
      if (this.token) {
        gameLogin(data).then(response => {
          const Data = response
          if (Data.Code === 0) {
            this.gameUrl = response.Data
            window.open(this.gameUrl, '_blank')
          } else {
            this.$modalHint.show({
              text: this.$t(`responseMsg.response_${Data.Code}`)
            })
          }
        })
      } else {
        this.$modalLogin.show()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.slot-game {
  height: 800px;
  // border-bottom: 1px solid #fff;
  background: url('../../assets/images/home/platform_bg.jpg') center bottom -720px
    no-repeat;
  position: relative;
  padding-top: 100px;
  .list {
    height: 410px;
    $list-item-width: 145px;
    > div {
      min-width: $list-item-width;
      margin: 0 5px;
      padding-left: $list-item-width;
      transition: 0.5s;
      position: relative;
      cursor: pointer;
      .index {
        position: absolute;
        display: inline-block;
        top: 30px;
        font-size: 24px;
        font-weight: bold;
        left: $list-item-width/2;
        transform: translateX(-50%);
        pointer-events: none;
      }
      .name {
        position: absolute;
        display: inline-block;
        top: 100px;
        font-size: 28px;
        left: $list-item-width/2;
        transform: translateX(-50%);
        pointer-events: none;
      }
      @for $i from 1 through 4 {
        &:nth-child(#{$i}) {
          background: url('../../assets/images/home/0#{$i}_block.png')
            left
            center
            no-repeat;

          &.active {
            background: url('../../assets/images/home/0#{$i}_block01.png')
              left
              center
              no-repeat;
            > article {
              max-width: 500px;
            }
          }
        }
      }
      > article {
        width: 435px;
        max-width: 0;
        transition: 0.5s;
        transition-timing-function: ease-in-out;
        height: 100%;
        background: url('../../assets/images/home/block_hover.png') left center
          no-repeat;
        background-size: cover;
        overflow: hidden;
        white-space: nowrap;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: default;
        .game {
          width: 435px;
          flex-wrap: wrap;
          justify-content: center;
          padding-top: 35px;
          > div {
            width: 115px;
            height: 115px;
            margin: 2px;
            background-size: cover;
            background-color: #1aa6dc;
            position: relative;
            transition: 1s;
            transition-property: background;
            align-items: flex-end;
            cursor: pointer;
            &:hover {
              filter: brightness(120%);
            }
            &:before {
              position: absolute;
              content: '';
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
              background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0),
                rgba(0, 0, 0, 0) 70%,
                rgba(0, 0, 0, 0.9) 100%
              );
            }

            > span {
              font-size: 12px;
              z-index: 1;
              padding: 10px 8px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        .title {
          padding: 0 35px 30px 35px;
          justify-content: space-between;
          align-items: flex-end;
          > div {
            max-width: 285px;
            > span {
              display: block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              text-align: left;
              &:first-child {
                font-size: 24px;
                padding-bottom: 10px;
              }
            }
          }
          > picture {
            width: 55px;
            height: 55px;
            background: url('../../assets/images/home/enter_btn.png') center
              center no-repeat;
            background-size: cover;
            cursor: pointer;
            &:hover {
              background: url('../../assets/images/home/enter_btn01.png') center
                center no-repeat;
              background-size: cover;
            }
          }
        }
      }
    }
  }
  .slogan{
    position: absolute;
    top: 592px;
    font-size: 24px;
    letter-spacing: 3px;
    pointer-events: none;
  }
  .award-list {
    position: absolute;
    // width: 100%;
    bottom: 75px;
    .ani {
      transform: translateY(-50px);
    }
    > div {
      flex: 1;
      height: 33px;
      font-size: 14px;
      letter-spacing: 2px;
      &:not(:last-child) {
        @keyframes ani {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }

          100% {
            opacity: 1;
          }
        }
        animation: ani 5s ease-in-out;
        border-right: 1px dashed #fff;
        background: url('../../assets/images/home/trophy_icon.png') center left
          45px no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: center;
        > span {
          display: block;
          text-align: left;
          padding-left: 120px;
          > b {
            font-weight: normal;
            color: #7086ff;
            padding-right: 5px;
            padding-left: 5px;
          }
          > aside {
            display: inline;
            padding-right: 10px;
          }
        }
      }
      &:last-child {
        display: flex;
        flex-direction: column;
        justify-content: center;
        > span {
          display: block;
          text-align: right;
          &:last-child {
            color: #7086ff;
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>
