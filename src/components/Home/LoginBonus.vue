<template>
  <div
    v-show="show && loginBonusStatus !== 3"
    class="login-bonus"
    :class="{got:loginBonusStatus === 2}"
    @click="applyLoginBonus"
  >
    <div class="paper">
      <div></div>
    </div>
    <div class="paper">
      <div></div>
    </div>
    <div class="red">
      <div class="mark"></div>
    </div>
    <div class="close-mark pointer" @click="show = false"></div>
  </div>
</template>
<script>
import { applyLoginBonus } from '../../api/activity'
import { mapGetters } from 'vuex'
export default {
  name: 'LoginBonus',
  data() {
    return {
      show: true
    }
  },
  computed: {
    ...mapGetters(['loginBonusStatus'])
  },
  watch: {
    loginBonusStatus() {
      if (this.loginBonusStatus === 3) {
        this.show = false
      }
    }
  },
  methods: {
    applyLoginBonus() {
      if (this.loginBonusStatus === 1) {
        applyLoginBonus().then(res => {
          if (res.Code === 0) {
            this.$modalHint.show({
              text: `恭喜获得登入奖励 ¥${res.Data} 元`,
              isDoubleModal: false
            })
          } else if (res.Code === 2727) {
            this.$modalHint.show({
              text: '已领取奖励',
              isDoubleModal: false
            })
          } else {
            this.$modalHint.show({
              text: res.Message,
              isDoubleModal: false
            })
          }
          this.$store.dispatch('user/getInfo')
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin fake-ele() {
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
}
.login-bonus {
  position: fixed;
  top: 20%;
  left: 20px;
  z-index: 1000;
  height: 180px;
  width: 80px;
  transform: scale(0.7);
  cursor: pointer;
  &.got {
    filter: grayscale(100%);
    cursor: not-allowed;
    .paper {
      > div {
        transform: translate(0px, 30px) !important;
      }
    }
    .close-mark {
      display: block;
    }
  }
  &:hover {
    .paper {
      > div {
        transform: translate(0px, 0px);
      }
    }
    .red {
      box-shadow: 0 0 40px 2px rgba(237, 174, 0, 0.5);
    }
  }
  > div {
    position: absolute;
  }
  .paper {
    width: 60%;
    height: 60%;
    transform-origin: bottom center;
    margin-left: 10px;
    > div {
      width: 100%;
      height: 100%;
      background-color: #f4e5d9;
      transition: 0.1s;
      box-shadow: 0 0 20px 2px rgba(172, 172, 172, 0.4);
      transform: translate(0px, 30px);
      &:before {
        @include fake-ele;
        font-size: 300%;
        content: '¥';
        color: #edae00;
      }
    }

    &:nth-child(1) {
      top: 5%;
      left: 15%;
      transform: rotate(5deg);
    }
    &:nth-child(2) {
      top: 0;
      left: 0;
      transform: rotate(-5deg);
    }
  }
  .red {
    box-shadow: 0 0 20px 2px rgba(237, 174, 0, 0.5);
    &:before {
      @include fake-ele;
      height: 10%;
      width: calc(100% - 10px);
      // background-color: rebeccapurple;
      transform: translateY(-95%);
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 20px solid #ad2938;
    }
    background-color: #e6364b;
    width: 100%;
    height: 60%;
    bottom: 0;
    .mark {
      position: absolute;
      width: 50px;
      height: 50px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      border-radius: 50%;
      background-color: #edae00;
      &:before {
        @include fake-ele;
        background-color: #ecd3bf;
        width: 50%;
        height: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .close-mark {
    display: none;
    position: absolute;
    right: -15px;
    bottom: -15px;
    width: 40px;
    height: 40px;
    background: url('../../assets/images/public/close.png') center center
      no-repeat;
    opacity: 0.7;
    border-radius: 50%;
    box-shadow: 0 0 20px 2px rgba(172, 172, 172, 0.4);
    &:hover {
      opacity: 1;
    }
  }
}
</style>
