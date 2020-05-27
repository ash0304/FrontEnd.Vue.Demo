<template>
  <div class="platform">
    <div class="decoration"></div>
    <!-- 大容器 -->
    <div class="width-1300 content-box">
      <!-- 平台內容區 -->
      <div class="platform-content">
        <div v-for="item in gameTypeList" :key="item.index" class="platform-box">
          <template v-if="currentPlatform === item.index">
            <!-- 左側資訊 -->
            <div class="platform-detail animated fadeInLeftBig">
              <div class="platform-name-shadow">{{ `${item.PlatformName}${$t('sports.sport')}` }}</div>
              <div class="platform-name">{{ `${item.PlatformName}${$t('sports.sport')}` }}</div>
              <div class="platform-slogan">
                <div class="sub-title">崭新玩法·感受精彩</div>
                <div class="text">丰富的体育赛事一应俱全，项目玩法多元，下半场波胆、让球崭新玩法，感受不一样的精彩</div>
              </div>
              <div :style="platformObject(item, 'icon')" class="platform-icon"></div>
              <div
                class="platform-enter"
                @click="gameLogin(item.ID, item.GameCode)"
              >{{ $t('live.enter') }}</div>
            </div>
            <!-- 右側大圖 -->
            <div
              id="container"
              ref="container"
              class="platform-img-box animated zoomIn"
              @mouseover="item.isActive = true"
              @mouseleave="item.isActive = false"
            >
              <div :style="platformObject(item, 'left')" class="platform-left"></div>
              <div :style="platformObject(item, 'right')" class="platform-right"></div>
              <div id="inner" ref="inner" class="platform-center">
                <img :src="item.srcCenter" />
              </div>
              <div :style="platformBgObject(item)" class="platform-bg"></div>
            </div>
          </template>
        </div>
      </div>
      <!-- 選取平台區 -->
      <div class="select-area">
        <div class="select-skew-box">
          <div class="select-skew left"></div>
          <div class="select-skew right"></div>
          <div class="select-gallery">
            <div
              class="select-container"
              :class="{ lessThanFour: itemLength < 4 }"
              :style="{'margin-left': `${marginLeft}px`}"
            >
              <div
                v-for="item in gameTypeList"
                :key="item.index"
                class="select-item"
                :class="{active: currentPlatform === item.index}"
                @click="clickPlatform(item)"
              >{{ `${item.PlatformName}${$t('sports.sport')}` }}</div>
            </div>
          </div>
        </div>
        <div v-if="itemLength > 4" class="select-btn prev" @click="listMove(0)"></div>
        <div v-if="itemLength > 4" class="select-btn next" @click="listMove(1)"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sports',
  data() {
    return {
      gameUrl: '',
      gameTypeList: [
        {
          PlatformName: 'TEST1',
          isActive: false,
          index: 0,
          srcCenter: require(`../assets/images/sports/sport_01.png`),
          srcLeft: require(`../assets/images/sports/sport_01_left.png`),
          srcRight: require(`../assets/images/sports/sport_01_right.png`),
          srcIcon: require(`../assets/images/sports/sport_01_icon.png`),
          bgSrc: require(`../assets/images/sports/sport_bg_01.jpg`),
          bgSrcHover: require(`../assets/images/sports/sport_bg_hover_01.jpg`)
        },
        {
          PlatformName: 'TEST2',
          isActive: false,
          index: 1,
          srcCenter: require(`../assets/images/sports/sport_02.png`),
          srcLeft: require(`../assets/images/sports/sport_02_left.png`),
          srcRight: require(`../assets/images/sports/sport_02_right.png`),
          srcIcon: require(`../assets/images/sports/sport_01_icon.png`),
          bgSrc: require(`../assets/images/sports/sport_bg_02.jpg`),
          bgSrcHover: require(`../assets/images/sports/sport_bg_hover_02.jpg`)
        },
        {
          PlatformName: 'TEST3',
          isActive: false,
          index: 2,
          srcCenter: require(`../assets/images/sports/sport_03.png`),
          srcLeft: require(`../assets/images/sports/sport_03_left.png`),
          srcRight: require(`../assets/images/sports/sport_03_right.png`),
          srcIcon: require(`../assets/images/sports/sport_01_icon.png`),
          bgSrc: require(`../assets/images/sports/sport_bg_03.jpg`),
          bgSrcHover: require(`../assets/images/sports/sport_bg_hover_03.jpg`)
        },
        {
          PlatformName: 'TEST4',
          isActive: false,
          index: 3,
          srcCenter: require(`../assets/images/sports/sport_04.png`),
          srcLeft: require(`../assets/images/sports/sport_04_left.png`),
          srcRight: require(`../assets/images/sports/sport_04_right.png`),
          srcIcon: require(`../assets/images/sports/sport_01_icon.png`),
          bgSrc: require(`../assets/images/sports/sport_bg_04.jpg`),
          bgSrcHover: require(`../assets/images/sports/sport_bg_hover_04.jpg`)
        },
        {
          PlatformName: 'TEST5',
          isActive: false,
          index: 4,
          srcCenter: require(`../assets/images/sports/sport_05.png`),
          srcLeft: require(`../assets/images/sports/sport_05_left.png`),
          srcRight: require(`../assets/images/sports/sport_05_right.png`),
          srcIcon: require(`../assets/images/sports/sport_01_icon.png`),
          bgSrc: require(`../assets/images/sports/sport_bg_05.jpg`),
          bgSrcHover: require(`../assets/images/sports/sport_bg_hover_05.jpg`)
        },
        {
          PlatformName: 'TEST6',
          isActive: false,
          index: 5,
          srcCenter: require(`../assets/images/sports/sport_06.png`),
          srcLeft: require(`../assets/images/sports/sport_06_left.png`),
          srcRight: require(`../assets/images/sports/sport_06_right.png`),
          srcIcon: require(`../assets/images/sports/sport_01_icon.png`),
          bgSrc: require(`../assets/images/sports/sport_bg_06.jpg`),
          bgSrcHover: require(`../assets/images/sports/sport_bg_hover_06.jpg`)
        },
        {
          PlatformName: 'TEST7',
          isActive: false,
          index: 6,
          srcCenter: require(`../assets/images/sports/sport_07.png`),
          srcLeft: require(`../assets/images/sports/sport_07_left.png`),
          srcRight: require(`../assets/images/sports/sport_07_right.png`),
          srcIcon: require(`../assets/images/sports/sport_01_icon.png`),
          bgSrc: require(`../assets/images/sports/sport_bg_07.jpg`),
          bgSrcHover: require(`../assets/images/sports/sport_bg_hover_07.jpg`)
        },
        {
          PlatformName: 'TEST8',
          isActive: false,
          index: 7,
          srcCenter: require(`../assets/images/sports/sport_08.png`),
          srcLeft: require(`../assets/images/sports/sport_08_left.png`),
          srcRight: require(`../assets/images/sports/sport_08_right.png`),
          srcIcon: require(`../assets/images/sports/sport_01_icon.png`),
          bgSrc: require(`../assets/images/sports/sport_bg_08.jpg`),
          bgSrcHover: require(`../assets/images/sports/sport_bg_hover_08.jpg`)
        }
      ],
      marginLeft: 0,
      currentPlatform: 0,
      itemLength: 8
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  updated() {
    this.$nextTick(() => {
      this.seeSaw()
    }, 0)
  },
  methods: {
    clickPlatform(item) {
      this.currentPlatform = item.index
    },
    seeSaw() {
      const vm = this
      const mouse = {
        _x: 0,
        _y: 0,
        x: 0,
        y: 0,
        updatePosition: function(event) {
          const e = event || window.event
          this.x = e.clientX - this._x
          this.y = (e.clientY - this._y) * -1
        },
        setOrigin: function(e) {
          this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2)
          this._y = e.offsetTop + Math.floor(e.offsetHeight / 2)
        },
        show: function() {
          return '(' + this.x + ', ' + this.y + ')'
        }
      }
      mouse.setOrigin(this.$refs.container[0])

      let counter = 0
      const updateRate = 10
      const isTimeToUpdate = function() {
        return counter++ % updateRate === 0
      }

      const onMouseEnterHandler = function(event) {
        update(event)
      }

      const onMouseLeaveHandler = function(event) {
        vm.$refs.inner[0].style = ''
      }

      const onMouseMoveHandler = function(event) {
        if (isTimeToUpdate()) {
          update(event)
        }
      }

      const update = function(event) {
        mouse.updatePosition(event)
        updateTransformStyle(
          (mouse.y / vm.$refs.inner[0].offsetHeight / 2).toFixed(2),
          (mouse.x / vm.$refs.inner[0].offsetWidth / 2).toFixed(2)
        )
      }
      const updateTransformStyle = function(x, y) {
        const style = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)'
        vm.$refs.inner[0].style.transform = style
        vm.$refs.inner[0].style.webkitTransform = style
      }
      vm.$refs.container[0].onmouseenter = onMouseEnterHandler
      vm.$refs.container[0].onmouseleave = onMouseLeaveHandler
      vm.$refs.container[0].onmousemove = onMouseMoveHandler
    },
    gameLogin(PlatformID, GameCode) {
      if (this.token) {
        this.hintModalHandler(this.$t(`Demo用 无开放此功能`))
        return
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
    },
    platformObject(item, type) {
      if (type === 'left') {
        return {
          background: `url(${item.srcLeft}) no-repeat`
        }
      } else if (type === 'right') {
        return {
          background: `url(${item.srcRight}) no-repeat`
        }
      } else if (type === 'icon') {
        return {
          background: `url(${item.srcIcon}) no-repeat`
        }
      } else {
        return {
          background: `url(${item.srcCenter}) no-repeat`
        }
      }
    },
    platformBgObject(item) {
      if (item.isActive) {
        return {
          background: `url(${item.bgSrcHover}) no-repeat`,
          transition: 'background 0.3s ease-in-out'
        }
      } else {
        return {
          background: `url(${item.bgSrc}) no-repeat`,
          transition: 'background 0.3s ease-in-out'
        }
      }
    },
    listMove(dir) {
      if (!dir) {
        if (this.marginLeft >= 0) {
          return
        } else {
          this.marginLeft += 200
        }
      }
      if (dir) {
        if (this.marginLeft === -200 * (this.gameTypeList.length - 4)) {
          return
        } else {
          this.marginLeft -= 200
        }
      }
    },
    hintModalHandler(text, callbackFnc) {
      this.$modalHint.show({
        text,
        isDoubleModal: false,
        callbackFnc
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../styles/platform.scss';
</style>
