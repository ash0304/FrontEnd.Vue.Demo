<template>
  <div class="infobar-child">
    <div class="bar-group-box">
      <div class="login-group">
        <template v-if="!token">
          <div
            class="form-group flex"
            @keyup.enter="loginForm.LoginAccount && loginForm.Password?login():''"
          >
            <input
              v-model="loginForm.LoginAccount"
              type="text"
              :placeholder="$t('login.account')"
              maxlength="20"
            />
            <input
              v-model="loginForm.Password"
              type="password"
              :placeholder="$t('login.password')"
              maxlength="20"
            />
          </div>
          <div
            class="base-btn login-btn"
            :class="{'login-active': loginForm.LoginAccount && loginForm.Password}"
            @click="login"
          >{{ $t('navbar.login') }}</div>
          <div
            class="base-btn register-btn pointer"
            @click="$router.push({name:'Register'})"
          >{{ $t('navbar.register') }}</div>
        </template>
        <template v-else>
          <div class="member-info flex flex-items-center">
            <div class="bell">
              <img
                v-if="siteNotifyAmount === 0"
                src="../../../assets/images/public/bell.png"
                alt
                width="100%"
              />
              <img
                v-else
                class="pointer"
                src="../../../assets/images/public/bell02.png"
                width="100%"
                @click="toSiteNote"
              />
            </div>
            <div class="pipe"></div>
            <div class="right">
              <div class="top flex flex-items-center">
                <div></div>
                <div class="account pointer" @click="toMemberCenter">{{ account }}</div>
                <div class="flex options flex-items-center flex-between">
                  <div>
                    <router-link to="/MemberCenter/Deposit">{{ $t('Deposit.Deposit') }}</router-link>
                  </div>
                  <div>
                    <router-link to="/MemberCenter/Withdrawal">{{ $t('Withdrawal.Withdrawal') }}</router-link>
                  </div>
                  <div>
                    <router-link to="/MemberCenter/Wallet">{{ $t('Wallet.trans') }}</router-link>
                  </div>
                </div>
              </div>
              <div class="bottom flex flex-items-center flex-end">
                <div>
                  <router-link to="/MemberCenter/Deposit">
                    <span style="color: #2a2a2a;">{{ $t('Wallet.Wallet') }}：</span>
                    <span style="color: rgb(0, 123, 215);">{{ balance | thousandFilter }}</span>
                    <span style="color: #2a2a2a;">{{ $t('Wallet.yen') }}</span>
                  </router-link>
                </div>
                <div class="pipe"></div>
                <div class="pointer" @click="logout">{{ $t('memberCenter.logout') }}</div>
              </div>
            </div>
          </div>
        </template>
        <!-- <el-select v-model="$i18n.locale" class="lang-btn">
          <el-option
            v-for="item in Object.keys($i18n.messages)"
            :key="item"
            :label="$t(`lang.${item}`)"
            :value="item"
          ></el-option>
        </el-select>-->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { thousandFilter } from '../../../utils/thousandFilter'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'Infobar',
  filters: {
    thousandFilter
  },
  data() {
    return {
      loginForm: {
        LoginAccount: 'ash123',
        Password: '123456'
      }
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'account',
      'balance',
      'logoImg',
      'siteNotifyAmount'
    ])
  },
  methods: {
    toMemberCenter() {
      this.$router
        .push({
          name: 'MemberCenter'
        })
        .catch(() => {})
    },
    login() {
      this.$store.dispatch('user/login', this.loginForm).then(response => {
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
    logout() {
      this.$store.dispatch('user/logout')
      // this.loginForm.LoginAccount = ''
      // this.loginForm.Password = ''
      this.$router
        .push({
          name: 'Home'
        })
        .catch(() => {})
    },
    toSiteNote() {
      this.$router
        .push({
          name: 'Message'
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.infobar-child {
  height: 80px;
  background: none;
  .bar-group-box {
    position: relative;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
    .logo {
      position: absolute;
      left: 80px;
      top: 50%;
      transform: translateY(-50%);
      width: 150px;
      height: 40px;
      background-size: cover;
      z-index: 10000;
    }
    /deep/.login-group {
      height: 82px;
      display: flex;
      align-items: center;
      font-weight: 800;
      > div {
        &.info-btn {
          padding: 0 10px;
          margin: 0;
          border-right: 1px solid #fff;
          &:hover {
            color: rgb(112, 134, 255);
          }
          + div {
            padding: 0 10px;
            margin: 0;
            &:hover {
              color: rgb(112, 134, 255);
            }
          }
        }
        &.base-btn {
          margin: 0 10px 0 0;
          width: 70px;
          height: 36px;
          transition: all 0.3s;
          border-radius: 2px;
        }
        &.login-btn {
          line-height: 36px;
          background: #606060;
          pointer-events: none;
          &.login-active {
            pointer-events: initial;
            cursor: pointer;
            background: #06cdbd;
          }
        }
        &.register-btn {
          line-height: 36px;
          background: #4b62d6;
        }
        &.lang-btn {
          width: 80px;
          input {
            border: 1px solid #3f4462;
            border-radius: 2px;
            background: transparent;
            color: #7086ff;
            height: 36px;
          }
          i {
            color: #7086ff;
          }
        }
      }
      .form-group {
        position: relative;
        input {
          height: 36px;
          line-height: 36px;
          padding-left: 10px;
          border: 1px solid #cdcdd5;
          border-radius: 2px;
          color: #374e69;
          font-size: 14px;
          transition: all 0.3s;
          width: 130px;
          padding-right: 10px;
          margin-right: 10px;
          &:focus {
            border: 1px solid #4b62d6;
          }
        }
        .code-img {
          position: absolute;
          width: 65px;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .member-info {
        .bell {
          width: 22px;
          height: 22px;
        }
        .pipe {
          margin: 0 15px;
          width: 1px;
          height: 56px;
          background-image: linear-gradient(
            180deg,
            rgba(231, 237, 243, 0),
            #d8d8d8 49%,
            rgba(231, 237, 243, 0)
          );
        }
        .right {
          height: 56px;
          color: #2a2a2a;
          padding-right: 10px;
          .top {
            height: 50%;
            .account {
              max-width: 120px;
              font-size: 14px;
              color: #1d2e42;
              font-weight: 700;
              cursor: pointer;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .options {
              margin-left: 20px;
              height: 22px;
              font-size: 17px;
              width: 165px;
              font-weight: initial;
              a {
                color: #2a2a2a;
              }
            }
          }
          .bottom {
            height: 50%;
            font-weight: initial;
            .pipe {
              width: 1px;
              height: 15px;
              background: #d7d7d7;
              margin: 0 10px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1680px) {
  .infobar-child {
    .bar-group-box {
      .login-group {
        .form-group {
          input {
            width: 100px;
          }
        }
        > div {
          &.base-btn {
            width: 45px;
            height: 36px;
          }
        }
      }
    }
    .lang-btn {
      display: none;
    }
  }
}
</style>
