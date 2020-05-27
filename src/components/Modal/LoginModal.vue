<template>
  <div
    v-if="modalShow"
    class="login-modal-bg custom-modal-bg"
    :class="{'bounce-in': effectShow, 'bounce-out': !effectShow}"
    @click.self="modalClose"
  >
    <div class="login-modal">
      <div class="close-mark" @click="modalClose"></div>

      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="login-body">
          <div class="login-logo"></div>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <div class="row">
              <div class="row-label">{{ $t('login.account') }}</div>
              <div class="row-input">
                <input
                  v-model="Account"
                  class="login-input"
                  type="text"
                  maxlength="20"
                  @keyup.enter="login"
                />
                <img
                  v-if="errors[0]"
                  class="pointer notice-icon"
                  src="../../assets/images/public/notice_icon.png"
                />
                <span>{{ errors[0] }}</span>
              </div>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" rules="required">
            <div class="row">
              <div class="row-label">{{ $t('login.password') }}</div>
              <div class="row-input">
                <input
                  v-model="Password"
                  class="login-input"
                  type="password"
                  maxlength="20"
                  @keyup.enter="login"
                />
                <img
                  v-if="errors[0]"
                  class="pointer notice-icon"
                  src="../../assets/images/public/notice_icon.png"
                />
                <span>{{ errors[0] }}</span>
              </div>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" rules="required">
            <div class="row">
              <div class="row-label">{{ $t('login.verifyCode') }}</div>
              <div class="row-input">
                <input
                  v-model="VerifyCode"
                  class="login-input code"
                  type="text"
                  maxlength="4"
                  @keyup.enter="login"
                />
                <img
                  class="pointer verifyCode"
                  height="20px"
                  :src="verifyCodeUrl"
                  @click="getCapture"
                />
                <span>{{ errors[0] }}</span>
              </div>
            </div>
          </ValidationProvider>

          <div class="login-bottom">
            <span class="pointer" @click="forgetPwd">{{ $t('login.forgetPwd') }}</span>
            <span class="pointer" @click="openRegister">
              {{ $t('login.register') }}
              <img src="../../assets/images/public/re_icon.png" />
            </span>
          </div>
        </div>
        <div class="login-btn" @click="handleSubmit(login)">{{ $t('login.login') }}</div>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import ModalLogin from '../../utils/LoginModal'

export default {
  name: 'LoginModal',
  data() {
    return {
      modalShow: false,
      effectShow: false,
      Account: '',
      Password: '',
      VerifyKey: '',
      VerifyCode: '',
      verifyCodeUrl: ''
    }
  },
  created() {
    this.getCapture()
  },
  beforeMount() {
    ModalLogin.EventBus.$on('show', () => {
      this.modalOpen()
    })
  },
  methods: {
    modalOpen() {
      this.modalShow = true
      setTimeout(() => {
        document.body.style['overflow-y'] = 'hidden'
        this.effectShow = true
      }, 0)
    },
    modalClose() {
      this.effectShow = false
      document.body.style['overflow-y'] = 'auto'
      this.getCapture()
      this.Account = ''
      this.Password = ''
      this.VerifyCode = ''
      setTimeout(() => {
        this.modalShow = false
      }, 200)
    },
    openRegister() {
      this.modalClose()
      this.$router
        .push({
          name: 'Register'
        })
        .catch(err => {
          console.log(err)
        })
    },
    forgetPwd() {
      this.$modalHint.show({
        text: '请洽客服，取得重置密码',
        isDoubleModal: true
      })
    },
    createKey(minLength, maxLength) {
      const value =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const length = Math.floor(
        Math.random() * (maxLength - minLength + 1) + minLength
      )
      let randomString = ''
      for (let i = 0; i < length; i++) {
        const randomPoz = Math.floor(Math.random() * value.length)
        randomString += value.substring(randomPoz, randomPoz + 1)
      }
      return randomString
    },
    getCapture() {
      this.VerifyKey = this.createKey(10, 15)
      this.verifyCodeUrl = `${process.env.VUE_APP_BASE_API}/gameweb/VerifyCode/Get?key=${this.VerifyKey}`
    },
    login() {
      const loginForm = {
        Account: this.Account,
        Password: this.Password,
        DeviceTypeID: 1,
        VerifyKey: this.VerifyKey,
        VerifyCode: this.VerifyCode
      }
      this.$store.dispatch('user/login', loginForm).then(res => {
        if (res.Code === 0) {
          this.$store.dispatch('user/getInfo')
          this.$store.dispatch('user/hasWithdrawalPassword')
          this.modalClose()
          this.$router
            .push({
              name: 'Home'
            })
            .catch(() => {})
        } else if (res.Code === 102) {
          this.$modalHint.show({
            text: '帐号或密码错误',
            isDoubleModal: true
          })
        } else if (res.Code === 104) {
          this.$modalHint.show({
            text: '帐号已冻结，请联系客服',
            isDoubleModal: true
          })
        } else {
          this.$modalHint.show({
            text: res.Message,
            isDoubleModal: true
          })
        }
        this.VerifyCode = ''
        this.getCapture()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$modal-width: 396px;
.login-modal-bg {
  .login-modal {
    text-align: left;
    width: $modal-width;
    height: 508px;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    margin: auto;
    background: url('../../assets/images/public/login_w.png') top center
      no-repeat;
    background-size: contain;
    z-index: 2001;
    .close-mark {
      cursor: pointer;
      position: absolute;
      right: -50px;
      top: -50px;
      width: 50px;
      height: 50px;
      background: url('../../assets/images/public/close.png') center center
        no-repeat;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
    .login-logo {
      width: 182px;
      height: 76px;
      background: url('../../assets/images/public/login_title.png') no-repeat;
      margin: 0 auto 30px auto;
    }
    .login-body {
      width: 320px;
      position: relative;
      margin: 50px auto 0px auto;
      font-size: 18px;
      .row {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 10px;
        .row-label {
          width: 50px;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          text-align: right;
          margin-right: 10px;
        }
        .row-input {
          width: 270px;
          position: relative;
          .login-input {
            color: white;
            width: 100%;
            height: 40px;
            background: rgba(0, 0, 0, 0.3);
            border: none;
            border-radius: 5px;
            padding-left: 20px;
          }
          .verifyCode {
            position: absolute;
            right: 10px;
            top: 20px;
          }
          .notice-icon {
            position: absolute;
            width: 20px;
            height: 20px;
            right: 10px;
            top: 20px;
          }
          > span {
            font-size: 12px;
            color: #45dca7;
          }
        }
      }
      img {
        position: absolute;
        right: 90px;
        top: calc(50% + 10px);
        transform: translateY(-50%);
      }
      .login-bottom {
        position: relative;
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
        img {
          position: absolute;
          right: 5px;
          top: 9px;
        }
        > span {
          margin-left: 10px;
          margin-right: 10px;
          font-size: 14px;
        }
      }
    }
    .login-btn {
      position: relative;
      background: url('../../assets/images/public/login_btn.png') no-repeat;
      height: 42px;
      width: 150px;
      margin: 40px auto 20px auto;
      cursor: pointer;
      text-align: center;
      line-height: 42px;
      font-size: 14px;
      &:hover {
        background: url('../../assets/images/public/login_btn01.png') no-repeat;
      }
    }
  }
}
</style>
