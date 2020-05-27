<template>
  <div class="fixed-menu" :class="{disable: !goTopDisplay}">
    <span @click="openCS">{{ $t('navbar.cs') }}</span>
    <span @click="goTop">{{ $t('navbar.top') }}</span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FixedMenu',
  data() {
    return { goTopDisplay: false }
  },
  computed: {
    ...mapGetters(['csUrl'])
  },
  created() {
    window.addEventListener('scroll', this.goTopDisplayControll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.goTopDisplayControll)
  },
  methods: {
    goTopDisplayControll() {
      if (window.scrollY > 300) {
        this.goTopDisplay = true
      } else {
        this.goTopDisplay = false
      }
    },
    openCS() {
      window.open(this.csUrl, '_blank')
    },
    goTop() {
      try {
        window.scrollTo({ behavior: 'smooth', top: 0 })
      } catch (e) {
        const gogog = () => {
          setTimeout(() => {
            if (window.scrollY) {
              window.scrollBy(0, -100)
              gogog()
            }
          }, 1)
        }

        gogog()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$outer-btn-width: 40px;
.fixed-menu {
  z-index: 20;
  position: fixed;
  right: 40px;
  bottom: 200px;
  color: #9797b2;
  &.disable {
    pointer-events: none;
    > span {
      opacity: 0;
    }
  }
  > span {
    display: block;
    margin-bottom: 20px;
    height: 62px;
    width: 60px;
    position: relative;
    display: flex;
    align-items: flex-end;
    transition: opacity 0.3s;
    cursor: pointer;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 10px;
      width: 40px;
      height: 40px;
      background-size: cover !important;
    }
    &:hover {
      color: #4765f3;
      &:before {
        animation: none !important;
      }
    }
    &:nth-child(1) {
      &:before {
        animation: animate1 3s infinite alternate-reverse;
        background: url('../assets/images/home/icon_service_blue.png') no-repeat
          center center;
      }
    }
    &:nth-child(2) {
      transition-delay: 0.1s;
      &:before {
        background: url('../assets/images/home/icon_up_blue.png') no-repeat
          center center;
      }
    }
  }
}
@keyframes animate1 {
  from {
    transform: rotate3d(0, 1, 0, 180deg);
  }
  to {
    transform: rotate3d(0, 1, 0, 0deg);
  }
}
</style>
