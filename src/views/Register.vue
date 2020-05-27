<template>
  <div class="login-register flex flex-center flex-items-center">
    <video ref="videoRef" class="video" autoplay preload="preload" loop muted>
      <source src="../assets/images/public/bg_batch.mp4" type="video/mp4" />
    </video>
    <div class="form-container">
      <router-link to="/Home">
        <div class="logo" :style="{'background-image':`url(${logoUrl})`}"></div>
      </router-link>
      <div class="title">{{ $t('register.userRegister') }}</div>
      <div class="form">
        <ValidationObserver v-slot="{ handleSubmit }" tag="div" class="form-box">
          <ValidationProvider v-slot="{ errors }" rules="required|account" tag="label">
            <div class="form-row">
              <div class="icon member"></div>
              <input
                v-model="registerForm.Account"
                type="text"
                :placeholder="$t('register.enterAccountTip')"
                maxlength="20"
              />
              <div v-if="errors[0]" class="error-msg">
                <div>{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="password"
            rules="required|password"
            tag="label"
          >
            <div class="form-row">
              <div class="icon locker"></div>
              <input
                v-model="registerForm.Password"
                :type="eye1"
                :placeholder="$t('register.enterPasswordTip1')"
                maxlength="20"
              />
              <div
                class="icon-eye"
                :class="{ open: eye1 === 'text' }"
                @click="eye1 = eye1 === 'password' ? 'text' : 'password'"
              ></div>
              <div v-if="errors[0]" class="error-msg">
                <div>{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="required|pwdConfirm:@password" tag="label">
            <div class="form-row">
              <div class="icon locker"></div>
              <input
                v-model="registerForm.PasswordConfirm"
                :type="eye2"
                :placeholder="$t('register.enterPasswordTip2')"
                maxlength="20"
              />
              <div
                class="icon-eye"
                :class="{ open: eye2 === 'text' }"
                @click="eye2 = eye2 === 'password' ? 'text' : 'password'"
              ></div>
              <div v-if="errors[0]" class="error-msg">
                <div>{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="agent" tag="label">
            <div class="form-row">
              <div class="icon member"></div>
              <input
                v-model="registerForm.AgentCode"
                type="text"
                :placeholder="$t('register.agentCode')"
                :disabled="agentCodeDis"
              />
              <div v-if="errors[0]" class="error-msg">
                <div>{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :rules="{required: { allowFalse: false }}"
            tag="label"
          >
            <div class="form-row confirm1 flex flex-between flex-items-center" style="height: 60px">
              <input v-model="confirm1" type="checkbox" />
              <div class="confirm-text">{{ $t('register.ruleConfirm1') }}</div>
              <div v-if="errors[0]" class="error-msg">
                <div>{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :rules="{required: { allowFalse: false }}"
            tag="label"
          >
            <div class="form-row confirm1 flex flex-between flex-items-center">
              <input v-model="confirm2" type="checkbox" />
              <div class="confirm-text">{{ $t('register.ruleConfirm2') }}</div>
              <div v-if="errors[0]" class="error-msg">
                <div>{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <div class="form-row">
            <div
              class="btn"
              :class="{ active: registerForm.Account && registerForm.Password && registerForm.PasswordConfirm && confirm1 }"
              @click="handleSubmit(registerNewMember)"
            >{{ $t('register.register') }}</div>
          </div>
          <div class="form-row flex flex-between flex-items-center">
            <span class="have-tip">
              {{ $t('register.haveAccount') }}
              <router-link to="/Login">
                <a style="color: rgb(17, 142, 227);">{{ $t('register.login') }}</a>
              </router-link>
            </span>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RegisterModal',
  data() {
    return {
      registerForm: {
        AgentCode: '',
        Account: '',
        Password: '',
        PasswordConfirm: '',
        ApplyPath: 1
      },
      confirm1: false,
      confirm2: false,
      agentCodeDis: false,
      pwdVisible: {
        pwd: false,
        confirmPwd: false,
        wPwd: false,
        confirmWPwd: false
      },
      eye1: 'password',
      eye2: 'password',
      logoUrl: require('../assets/images/home/logo.png')
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    token() {
      if (this.token) {
        this.$router.push({ name: 'Home' })
      }
    }
  },
  created() {
    this.$refs.videoRef.play()
    if (!this.token) {
      const agentCode = window.location.href.split('AgentCode=')[1]
      const session_agentCode = sessionStorage.getItem('AgentCode')
      if (agentCode) {
        this.registerForm.AgentCode = agentCode
        sessionStorage.setItem('AgentCode', agentCode)
        this.agentCodeDis = true
      } else if (session_agentCode) {
        this.agentCodeDis = true
        this.registerForm.AgentCode = session_agentCode
      }
    } else {
      this.$router.push({ name: 'Home' })
    }
  },
  mounted() {
    this.$refs.videoRef.play()
  },
  methods: {
    registerNewMember() {
      this.$modalHint.show({
        text: 'Demo用 无开放注册'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.have-tip {
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.5) !important;
}
.confirm-text {
  width: 280px;
}
</style>
