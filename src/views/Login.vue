<template>
  <div class="login-register flex flex-center flex-items-center">
    <video ref="videoRef" class="video" autoplay preload="preload" loop muted>
      <source src="../assets/images/public/bg_batch.mp4" type="video/mp4" />
    </video>
    <div class="form-container">
      <router-link to="/Home">
        <div class="logo" :style="{'background-image':`url(${logoUrl})`}"></div>
      </router-link>
      <div class="title">{{ $t('login.userLogin') }}</div>
      <div class="form" @keyup.enter="Account && Password?login():''">
        <div class="form-row">
          <div class="icon member"></div>
          <input
            v-model="Account"
            type="text"
            :placeholder="$t('login.enterAccountTip')"
            maxlength="20"
          />
        </div>
        <div class="form-row">
          <div class="icon locker"></div>
          <input
            v-model="Password"
            type="password"
            :placeholder="$t('login.enterPasswordTip')"
            maxlength="20"
          />
        </div>
        <div class="form-row">
          <div
            class="btn"
            :class="{ active: Account && Password }"
            @click="login"
          >{{ $t('login.login') }}</div>
        </div>
        <div class="form-row flex flex-between flex-items-center">
          <a @click="forgetPwd">{{ $t('login.forgetPwd') }}</a>
          <router-link to="/Register">{{ $t('login.accountRegister') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      Account: 'ash123',
      Password: '123456',
      logoUrl: require('../assets/images/home/logo.png')
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  created() {
    this.$refs.videoRef.play()
    if (this.token) {
      this.$router
        .push({
          name: 'Home'
        })
        .catch(() => {})
    }
  },
  mounted() {
    this.$refs.videoRef.play()
  },
  methods: {
    login() {
      const form = {
        LoginAccount: this.Account,
        Password: this.Password
      }
      this.$store.dispatch('user/login', form).then(response => {
        if (response === 'success') {
          this.$store.dispatch('user/getInfo')
          this.$router
            .push({
              name: 'Profile'
            })
            .catch(() => {})
        } else {
          this.$modalHint.show({
            text: this.$t('login.error1')
          })
        }
      })
    },
    forgetPwd() {
      this.$modalHint.show({
        text: '请洽客服，取得重置密码',
        isDoubleModal: false
      })
    }
  }
}
</script>
