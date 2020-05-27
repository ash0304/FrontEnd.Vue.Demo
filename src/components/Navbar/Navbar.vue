<template>
  <div class="navbar">
    <div class="navbar-outer flex flex-center">
      <div class="navbar-child flex flex-items-center">
        <router-link to="/Home" class="flex flex-items-center">
          <div class="logo-img pointer" :style="{'background-image':`url(${logoUrl})`}">
            <!-- <img :src="logoUrl" /> -->
          </div>
        </router-link>
        <router-link
          v-for="item in navbarList"
          :key="item.routerUrl"
          :to="`/${item.routerUrl==='eSports' ? '#' : ''}${item.routerUrl}`"
          :class="{'router-link-exact-active':$route.name==='SlotsInner'&& item.routerUrl === 'Slots'}"
          @click="toRoute(item)"
        >
          <div class="nav-btn flex" @mouseenter="openDropdownList(item.routerUrl)">
            <div class="nav-btn-name flex flex-items-center flex-center">
              <div class="name">
                {{ item.name }}
                <div class="effect-bar"></div>
              </div>
              <div v-if="item.routerUrl !== 'Home'" class="nav-arrow"></div>
            </div>
          </div>
        </router-link>
        <a
          class="pointer openCs"
          @click="goToCollaboration"
          @mouseenter="openDropdownList('Contact')"
        >
          <div class="nav-btn">
            <div class="nav-btn-name flex flex-items-center flex-center">
              <div class="name">{{ $t('navbar.collaboration') }}</div>
            </div>
          </div>
        </a>
      </div>
      <div class="login-info flex flex-center">
        <Infobar />
      </div>
    </div>
    <div
      v-if="currentHover!==''"
      class="dropdown-menu flex flex-items-center flex-center active"
      :class="{close: closeTrigger}"
      @mouseleave="openDropdownList('Contact')"
    >
      <div style="width: 40px">
        <div
          v-if="gameList[currentHover] && gameList[currentHover].length > 5 && marginLeft < 0"
          class="arrow arrow-l pointer"
          @click="moveList(0)"
        ></div>
      </div>
      <div class="item-container">
        <div
          class="inner flex"
          :class="{'flex-center': gameList[currentHover] && gameList[currentHover].length < 5}"
          :style="{'margin-left': `${marginLeft}px`}"
        >
          <div
            v-for="(subitem, key) in gameList[currentHover]"
            :key="subitem.id"
            class="dropdown-item pointer animated fadeIn"
            :style="{'animation-delay': `0.${3+key}s`}"
            @mouseenter="subitem.hover = !subitem.hover"
            @mouseleave="subitem.hover = !subitem.hover"
          >
            <div
              class="game-img"
              :style="{'background-image': !subitem.hover ? `url(${subitem.imgFile})` : `url(${subitem.imgFileH})`}"
            ></div>
            <div class="game-title">{{ subitem.name }}{{ $t(`navbar.${currentHover}`) }}</div>
            <div class="enter-btn">{{ $t('navbar.enter') }}</div>
          </div>
        </div>
      </div>
      <div style="width: 40px">
        <div
          v-if="gameList[currentHover] && gameList[currentHover].length > 5 && marginLeft > -244 * (gameList[currentHover].length - 5)"
          class="arrow arrow-r pointer"
          @click="moveList(1)"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import Infobar from './components/Infobar'
import HintModal from '../../utils/HintModal'
import { thousandFilter } from '../../utils/thousandFilter'

export default {
  name: 'Navbar',
  components: { Infobar },
  filters: {
    thousandFilter
  },
  data() {
    return {
      gameList: {
        Sports: [
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_sports_0${(0 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_sports_0${(0 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST1'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_sports_0${(1 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_sports_0${(1 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST2'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_sports_0${(2 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_sports_0${(2 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST3'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_sports_0${(3 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_sports_0${(3 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST4'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_sports_0${(4 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_sports_0${(4 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST5'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_sports_0${(5 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_sports_0${(5 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST6'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_sports_0${(6 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_sports_0${(6 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST7'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_sports_0${(7 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_sports_0${(7 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST8'
          }
        ],
        Live: [
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_casino_0${(0 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_casino_0${(0 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST1'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_casino_0${(1 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_casino_0${(1 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST2'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_casino_0${(2 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_casino_0${(2 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST3'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_casino_0${(3 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_casino_0${(3 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST4'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_casino_0${(4 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_casino_0${(4 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST5'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_casino_0${(5 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_casino_0${(5 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST6'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_casino_0${(6 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_casino_0${(6 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST7'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_casino_0${(7 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_casino_0${(7 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST8'
          }
        ],
        Bingo: [
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_lottery_0${(0 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_lottery_0${(0 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST1'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_lottery_0${(1 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_lottery_0${(1 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST2'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_lottery_0${(2 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_lottery_0${(2 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST3'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_lottery_0${(3 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_lottery_0${(3 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST4'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_lottery_0${(4 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_lottery_0${(4 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST5'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_lottery_0${(5 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_lottery_0${(5 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST6'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_lottery_0${(6 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_lottery_0${(6 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST7'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_lottery_0${(7 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_lottery_0${(7 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST8'
          }
        ],
        ChessGame: [
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_poker_0${(0 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_poker_0${(0 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST1'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_poker_0${(1 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_poker_0${(1 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST2'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_poker_0${(2 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_poker_0${(2 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST3'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_poker_0${(3 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_poker_0${(3 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST4'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_poker_0${(4 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_poker_0${(4 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST5'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_poker_0${(5 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_poker_0${(5 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST6'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_poker_0${(6 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_poker_0${(6 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST7'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_poker_0${(7 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_poker_0${(7 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST8'
          }
        ],
        Fishing: [
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_fish_0${(0 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_fish_0${(0 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST1'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_fish_0${(1 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_fish_0${(1 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST2'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_fish_0${(2 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_fish_0${(2 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST3'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_fish_0${(3 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_fish_0${(3 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST4'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_fish_0${(4 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_fish_0${(4 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST5'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_fish_0${(5 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_fish_0${(5 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST6'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_fish_0${(6 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_fish_0${(6 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST7'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_fish_0${(7 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_fish_0${(7 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST8'
          }
        ],
        Slots: [
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_slot_0${(0 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_slot_0${(0 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST1'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_slot_0${(1 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_slot_0${(1 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST2'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_slot_0${(2 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_slot_0${(2 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST3'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_slot_0${(3 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_slot_0${(3 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST4'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_slot_0${(4 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_slot_0${(4 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST5'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_slot_0${(5 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_slot_0${(5 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST6'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_slot_0${(6 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_slot_0${(6 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST7'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_slot_0${(7 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_slot_0${(7 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST8'
          }
        ],
        eSports: [
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_esports_0${(0 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_esports_0${(0 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST1'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_esports_0${(1 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_esports_0${(1 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST2'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_esports_0${(2 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_esports_0${(2 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST3'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_esports_0${(3 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_esports_0${(3 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST4'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_esports_0${(4 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_esports_0${(4 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST5'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_esports_0${(5 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_esports_0${(5 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST6'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_esports_0${(6 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_esports_0${(6 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST7'
          },
          {
            GameCode: null,
            imgFile: this.bgObj(`sub_esports_0${(7 % 8) + 1}.png`),
            imgFileH: this.bgObj(`sub_esports_0${(7 % 8) + 1}_h.png`),
            hover: false,
            name: 'TEST8'
          }
        ]
      },
      logoUrl: require('../../assets/images/home/logo.png'),
      currentHover: '',
      verifyCodeUrl: '',
      loginForm: {
        Account: 'ashtest',
        Password: '123456',
        DeviceTypeID: 1,
        VerifyKey: '',
        VerifyCode: ''
      },
      loginHintClass: false,
      closeTrigger: false,
      marginLeft: 0
    }
  },
  computed: {
    navbarList() {
      return [
        {
          name: this.$t('navbar.sports'),
          routerUrl: 'Sports'
        },
        {
          name: this.$t('navbar.live'),
          routerUrl: 'Live'
        },
        {
          name: this.$t('navbar.eSports'),
          routerUrl: 'eSports'
        },
        {
          name: this.$t('navbar.slots'),
          routerUrl: 'Slots'
        },
        {
          name: this.$t('navbar.fishing'),
          routerUrl: 'Fishing'
        },
        {
          name: this.$t('navbar.chessgame'),
          routerUrl: 'ChessGame'
        },
        {
          name: this.$t('navbar.bingo'),
          routerUrl: 'Bingo'
        },
        {
          name: this.$t('navbar.promo'),
          routerUrl: 'Promo'
        }
      ]
    }
  },
  created() {
    HintModal.EventBus.$on('loginHint', () => {
      this.loginHint()
    })
  },
  methods: {
    loginHint() {
      this.loginHintClass = true
      this.$refs.account.focus()
      setTimeout(() => {
        this.loginHintClass = false
      }, 200)
    },
    goToCollaboration() {
      const routeData = this.$router.resolve({
        name: 'Collaboration'
      })
      window.open(routeData.href, '_blank')
    },
    openDropdownList(platform) {
      if (
        (this.currentHover === '' && platform === 'Promo') ||
        (this.currentHover === '' && platform === 'Home') ||
        (this.currentHover === '' && platform === 'Contact')
      ) {
        return
      }
      this.marginLeft = 0
      this.currentHover = platform
      this.closeDropdownList()
    },
    closeDropdownList() {
      setTimeout(() => {
        if (
          this.currentHover === 'Sports' ||
          this.currentHover === 'Live' ||
          this.currentHover === 'Bingo' ||
          this.currentHover === 'ChessGame' ||
          this.currentHover === 'Slots' ||
          this.currentHover === 'Fishing' ||
          this.currentHover === 'eSports'
        ) {
          return
        } else {
          this.closeTrigger = true
          setTimeout(() => {
            this.currentHover = ''
            this.closeTrigger = false
          }, 300)
        }
      }, 10)
    },
    openCS() {
      window.open('http://www,google.com/', '_blank')
    },
    moveList(dir) {
      if (!dir) {
        if (this.marginLeft === 0) {
          return
        }
        this.marginLeft += 244
      }
      if (dir) {
        if (
          this.marginLeft ===
          (this.gameList[this.currentHover].length - 5) * -244
        ) {
          return
        }
        this.marginLeft -= 244
      }
    },
    bgObj(url) {
      return require(`../../assets/images/navbar/${url}`)
    },
    toRoute(route) {
      console.log(route)
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  position: sticky;
  height: 80px;
  width: 100%;
  top: 0px;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  a {
    color: #717882;
    font-size: 16px;
    height: 100%;
    .nav-btn {
      width: 110px;
      height: 100%;
      justify-content: center;
      align-items: center;
      .nav-btn-name {
        width: 100%;
        transition: all 0.3s;
        height: 100%;
        .name {
          height: 100%;
          line-height: 80px;
          position: relative;
          .effect-bar {
            width: 0;
            height: 4px;
            background: #4765f3;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            transition: all 0.3s ease-in-out;
          }
        }
      }
      .nav-arrow {
        width: 13px;
        height: 13px;
        background: url('../../assets/images/public/btn_down_gray.png') center
          no-repeat;
        background-size: cover;
        transition: all 0.3s;
        margin-left: 3px;
      }
      &:hover {
        .nav-arrow {
          background: url('../../assets/images/public/btn_up_blue.png')
            no-repeat 50%;
          background-size: cover;
        }
      }
    }
    .nav-btn:hover > .nav-btn-name {
      color: #4765f3;
    }
    &.router-link-exact-active {
      &:hover {
        .nav-arrow {
          transform: rotate(0);
        }
      }
      .nav-arrow {
        background: url('../../assets/images/public/btn_up_blue.png') no-repeat
          50%;
        background-size: cover;
        transform: rotate(180deg);
      }
      .nav-btn > .nav-btn-name {
        font-weight: 700;
        color: #4765f3;
        font-size: 18px;
        transition: all 0.3s;
        .name {
          .effect-bar {
            width: 50%;
          }
        }
      }
    }
  }
  .navbar-outer {
    background: transparent;
    height: 100%;
    .openCs {
      .effect-bar {
        width: 0px;
        height: 3px;
        background: #4765f3;
        position: absolute;
        bottom: 0;
        left: 5px;
        transition: width 0.3s ease-in-out;
      }
      &:hover {
        color: #4765f3;
        .effect-bar {
          width: 110px;
        }
      }
    }
  }
  .navbar-child {
    height: 100%;
    .logo-img {
      width: 180px;
      height: 48px;
      background-size: 100% 100%;
    }
  }
  .dropdown-menu {
    color: black;
    position: absolute;
    background: rgba(255, 255, 255, 0.9);
    top: 80px;
    left: 0px;
    width: 100%;
    height: 280px;
    text-align: left;
    overflow: hidden;
    box-shadow: 0px 8px 10px rgba(21, 22, 35, 0.25);
    z-index: 1000;
    transition: height 0.5s;
    pointer-events: none;
    font-size: 14px;
    animation: 0.3s dropShow;
    &.active {
      pointer-events: auto;
      opacity: 1;
    }
    &.close {
      animation: 0.3s dropClose;
    }
    .item-container {
      width: 1220px;
      overflow: hidden;
      .inner {
        transition: 0.3s margin-left ease-in-out;
        .dropdown-item {
          position: relative;
          padding-left: 20px;
          padding-right: 10px;
          overflow: hidden;
          white-space: nowrap;
          height: 280px;
          width: 244px;
          line-height: 50px;
          flex-shrink: 0;
          .game-title {
            position: absolute;
            bottom: 35px;
            left: 60%;
            transition: 0.3s all;
            font-size: 12pt;
          }
          .enter-btn {
            position: absolute;
            bottom: 20px;
            left: 50%;
            width: 84px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            background: #f8f8f8;
            box-shadow: 0 1px 4px 1px rgba(95, 108, 145, 0.1);
            color: #4266ee;
            font-size: 12px;
            border-radius: 12px;
            margin: 0 auto 0 -42px;
            transition: 0.3s all;
          }
          .game-img {
            position: absolute;
            width: 100%;
            height: 100%;
            background-size: 244px 214.72px;
            background-position: center;
            background-repeat: no-repeat;
            top: 0;
            transition: 0.3s all;
            &:hover {
              background-size: calc(244px * 1.1) calc(214.72px * 1.1);
            }
          }
          &:hover {
            .enter-btn {
              transform: scale(1.1);
            }
            .game-title {
              transform: scale(1.1);
            }
          }
        }
      }
    }
    @keyframes dropShow {
      from {
        height: 0px;
      }

      to {
        height: 280px;
      }
    }
    @keyframes dropClose {
      from {
        height: 280px;
      }

      to {
        height: 0px;
      }
    }
  }
}
@media (max-width: 1680px) {
  .navbar {
    a {
      .nav-btn {
        width: 75px;
        font-size: 12px;
      }
      &.router-link-exact-active {
        .nav-btn > .nav-btn-name {
          width: 75px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
