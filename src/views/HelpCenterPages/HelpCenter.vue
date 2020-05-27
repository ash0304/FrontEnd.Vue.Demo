<template>
  <div class="help-center">
    <div class="help-center-container">
      <div class="side-bar">
        <div class="side-bar-container flex flex-center margin-center">
          <router-link v-for="(item, index) in sidebarList" :key="item.EName" :to="item.routerUrl">
            <div
              class="side-bar-item flex flex-column flex-center flex-items-center pointer"
              @mouseenter="item.isActive = true"
              @mouseleave="item.isActive = false"
              @click="clickitem(item, index)"
            >
              <div class="icon">
                <img :src="item.src" />
                <!-- <img :src="item.src" /> -->
              </div>
              <div class="side-bar-text">{{ $t(`helpCenter.${item.EName}`) }}</div>
            </div>
          </router-link>
          <div class="bottom-bar" :style="{left: `${currentIdx * 125.28}px`}"></div>
        </div>
      </div>
      <div class="current-page-box">
        <div class="current-page">{{ $t(`helpCenter.${currentPage}`) }}</div>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelpCenter',
  data() {
    return {
      currentIdx: 0,
      currentPage: '',
      sidebarList: [
        {
          Name: '关于我们',
          EName: 'About',
          routerUrl: '/HelpCenter/About',
          src: require(`../../assets/images/helpCenter/menu_icon01.png`),
          srcHover: require(`../../assets/images/helpCenter/menu_icon01_1.png`),
          isActive: false,
          isNow: false
        },
        {
          Name: '联系我们',
          EName: 'ContactUs',
          routerUrl: '/HelpCenter/ContactUs',
          src: require(`../../assets/images/helpCenter/menu_icon02.png`),
          srcHover: require(`../../assets/images/helpCenter/menu_icon02_1.png`),
          isActive: false,
          isNow: false
        },
        {
          Name: '合作伙伴',
          EName: 'AgentHelp',
          routerUrl: '/HelpCenter/AgentHelp',
          src: require(`../../assets/images/helpCenter/menu_icon03.png`),
          srcHover: require(`../../assets/images/helpCenter/menu_icon03_1.png`),
          isActive: false,
          isNow: false
        },
        {
          Name: '充值帮助',
          EName: 'DepositHelp',
          routerUrl: '/HelpCenter/DepositHelp',
          src: require(`../../assets/images/helpCenter/menu_icon04.png`),
          srcHover: require(`../../assets/images/helpCenter/menu_icon04_1.png`),
          isActive: false,
          isNow: false
        },
        {
          Name: '提款帮助',
          EName: 'WithdrawalHelp',
          routerUrl: '/HelpCenter/WithdrawalHelp',
          src: require(`../../assets/images/helpCenter/menu_icon05.png`),
          srcHover: require(`../../assets/images/helpCenter/menu_icon05_1.png`),
          isActive: false,
          isNow: false
        },
        {
          Name: '常见问题',
          EName: 'Question',
          routerUrl: '/HelpCenter/Question',
          src: require(`../../assets/images/helpCenter/menu_icon06.png`),
          srcHover: require(`../../assets/images/helpCenter/menu_icon06_1.png`),
          isActive: false,
          isNow: false
        },
        {
          Name: '用户规范',
          EName: 'Rules',
          routerUrl: '/HelpCenter/Rules',
          src: require(`../../assets/images/helpCenter/menu_icon07.png`),
          srcHover: require(`../../assets/images/helpCenter/menu_icon07_1.png`),
          isActive: false,
          isNow: false
        }
      ]
    }
  },
  watch: {
    $route() {
      const targetIndex = this.sidebarList.findIndex(item => {
        return item.EName === this.$route.name
      })
      this.currentIdx = targetIndex
      this.currentPage = this.sidebarList[targetIndex].EName
    }
  },
  created() {
    this.sidebarList.forEach(item => {
      item.isNow = false
      if (item.EName === this.$route.name) {
        item.isNow = true
        this.currentPage = item.EName
      }
    })
    this.currentIdx = this.sidebarList.findIndex(item => {
      return item.EName === this.$route.name
    })
  },
  methods: {
    clickitem(target, index) {
      this.sidebarList.forEach(item => {
        item.isNow = false
        if (item.EName === target.EName) {
          item.isNow = true
        }
      })
    },
    styleObject(item, type) {
      if (type) {
        return {
          background: `url(${item.srcHover}) no-repeat`
        }
      } else {
        return {
          background: `url(${item.src}) no-repeat`
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.help-center {
  padding-top: 50px;
  height: auto;
  .help-center-container {
    position: relative;
    padding: 10px 50px 70px;
    height: auto;
    width: 1200px;
    background-color: #f2f2f2;
    margin: 0 auto 50px;
    .side-bar {
      margin-bottom: 50px;
      border-bottom: 2px solid #e8e8e8;
      .side-bar-container {
        text-align: left;
        width: 877px;
        position: relative;
        a {
          color: #aaa;
          .side-bar-item {
            width: calc(877px / 7);
            position: relative;
            height: 97px;
            .icon {
              width: 36px;
              height: 36px;
              img {
                width: 100%;
                filter: brightness(200%);
              }
            }
            .side-bar-text {
              font-size: 18px;
              line-height: 32px;
            }
            &:hover {
              .side-bar-text {
                color: #4765f3;
              }
            }
          }
          &.router-link-exact-active {
            .side-bar-item {
              .side-bar-text {
                color: #4765f3;
              }
              .icon {
                img {
                  filter: brightness(100%);
                }
              }
            }
          }
        }
        .bottom-bar {
          width: calc(877px / 7);
          background-color: #4765f3;
          height: 4px;
          border-radius: 2px;
          position: absolute;
          bottom: 0;
          transition: 0.3s left ease-in-out;
        }
      }
    }
    .current-page-box {
      .current-page {
        color: #4765f3;
        font-weight: bold;
        font-size: 18pt;
        margin-bottom: 30px;
      }
    }
  }
}
</style>
