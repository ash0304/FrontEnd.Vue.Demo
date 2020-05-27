<template>
  <div class="member-center flex flex-center">
    <div class="main width-1300 flex">
      <div class="left">
        <ul>
          <li>{{ $t('memberCenter.financeCenter') }}</li>
          <li v-for="item in routerList1" :key="item.name">
            <router-link class="link" :to="{name:item.name}">
              <span>{{ item.title }}</span>
            </router-link>
          </li>
        </ul>
        <ul>
          <li>{{ $t('memberCenter.personalCenter') }}</li>
          <li v-for="item in routerList2" :key="item.name">
            <router-link class="link" :to="{name:item.name}">
              <span>{{ item.title }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="top flex">
          <div>
            <span>{{ account }}</span>
            <span>
              {{ $t('memberCenter.balance') }}
              <b>¥{{ balance | thousandFilter }}</b>
            </span>
          </div>
          <div>
            {{ $t('memberCenter.createCard') }}
            <router-link :to="{name:'BankCard'}">
              <b v-if="!hasCard" class="pointer">{{ $t('memberCenter.go1') }}</b>
              <b v-else class="pointer">{{ $t('memberCenter.ok1') }}</b>
            </router-link>
          </div>
          <div>
            {{ $t('memberCenter.modifyPwd') }}
            <router-link :to="{name:'ModifyPassword'}">
              <b class="pointer">{{ $t('memberCenter.go2') }}</b>
            </router-link>
          </div>
          <div>
            <b></b>
          </div>
        </div>
        <div class="content">
          <router-view @bankCardUpdate="$event.length>0?hasCard=true:hasCard=false" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { parseTime } from '../../utils/parseTime'
import { thousandFilter } from '../../utils/thousandFilter'

export default {
  name: 'MemberCenter',
  filters: {
    parseTime,
    thousandFilter
  },
  data() {
    return {
      nowPage: 0,
      hasCard: false
    }
  },
  computed: {
    ...mapGetters(['token', 'account', 'balance', 'lastLoginTime', 'csUrl']),
    routerList1() {
      return [
        { name: 'Deposit', title: this.$t('Deposit.title') },
        { name: 'Withdrawal', title: this.$t('Withdrawal.title') },
        { name: 'Wallet', title: this.$t('Wallet.title') },
        { name: 'TradeRecord', title: this.$t('record.tradeTitle') },
        { name: 'BetRecord', title: this.$t('record.betTitle') },
        { name: 'BankCard', title: this.$t('BankCard.title') }
      ]
    },
    routerList2() {
      return [
        { name: 'MyActivity', title: this.$t('memberCenter.myActivity') },
        { name: 'Announce', title: this.$t('announce.title') },
        { name: 'Message', title: this.$t('msg.title') },
        { name: 'Profile', title: this.$t('profile.title') },
        { name: 'ModifyPassword', title: this.$t('memberCenter.modifyPwd') }
      ]
    }
  },
  watch: {
    $route(to, from) {
      if (this.token) {
        this.$store.dispatch('user/getInfo')
      }
    }
  },
  created() {
    if (this.token) {
      this.$store.dispatch('user/getInfo')
    }
  },
  methods: {
    modifyPassword() {
      this.$modalModifyPassword.show()
    },
    openCS() {
      window.open(this.csUrl, '_blank')
    },
    logout() {
      this.$store.dispatch('user/logout').then(res => {
        this.$router
          .push({
            name: 'Home'
          })
          .catch(() => {})
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.member-center {
  background: #f4f8f9;
  color: #39404d;
  text-align: left;
  .main {
    padding: 20px 0 !important;
    .left {
      min-width: 200px;
      margin-right: 20px;
      > ul {
        box-shadow: 0 5px 12px 5px rgba(195, 209, 234, 0.16);
        background: white;
        border-radius: 8px;
        &:first-child {
          > li {
            @for $i from 1 through 6 {
              &:nth-child(#{$i + 1}) {
                .link {
                  background-image: url('../../assets/images/memberCenter/side_#{$i}.png');
                }
              }
            }
          }
        }
        &:last-child {
          margin-top: 20px;
          > li {
            @for $i from 1 through 5 {
              &:nth-child(#{$i + 1}) {
                .link {
                  background-image: url('../../assets/images/memberCenter/side_#{$i + 6}.png');
                }
              }
            }
          }
        }
        > li {
          &:first-child {
            position: relative;
            font-size: 16px;
            padding: 15px 20px;
            &:before {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 0;
              width: 3px;
              height: 18px;
              background: #5b6ef2;
            }
            &:after {
              content: '';
              position: absolute;
              bottom: 0;
              transform: translateX(-50%);
              left: 50%;
              width: 80%;
              height: 1px;
              background: rgba(182, 197, 225, 0.3);
            }
          }
          &:not(:first-child) {
            padding: 0px 0px 0px 20px;
            font-size: 14px;

            .link {
              background-size: 25px;
              background-repeat: no-repeat;
              background-position: left center;
              display: inline-block;
              width: 100%;
              transition: 0.2s;
              transform-origin: left center;
              color: #39404d;
              height: 50px;
              line-height: 50px;
              padding-left: 35px;
            }
            &:hover .link,
            .router-link-active {
              transform: scale(1.3);
            }
          }
        }
      }
    }
    .right {
      width: 100%;
      .top {
        box-shadow: 0 5px 12px 5px rgba(195, 209, 234, 0.16);
        height: 100px;
        background: white;
        margin-bottom: 20px;
        border-radius: 8px;
        align-items: center;
        > div {
          &:first-child {
            flex: 2;
            position: relative;
            &:before {
              background: url('../../assets/images/memberCenter/icon_notlogged_avatar.png')
                no-repeat center center;
              background-size: contain;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 30px;
              width: 60px;
              height: 60px;
              line-height: 50px;
              content: '';
              font-size: 40px;
            }
            > span {
              display: block;
              padding-left: 100px;
              > b {
                font-weight: normal;
                color: red;
              }
            }
          }
          &:not(:first-child) {
            flex: 1;
            b {
              font-weight: normal;
              color: #4266ee;
            }
            height: 30px;
            line-height: 30px;
            background-size: contain !important;
            padding-left: 35px;
            &:nth-child(2) {
              background: url('../../assets/images/memberCenter/hadBank.png')
                no-repeat left center;
            }
            &:nth-child(3) {
              background: url('../../assets/images/memberCenter/hadPassword.png')
                no-repeat left center;
            }
          }
        }
      }
      .content {
        box-shadow: 0 5px 12px 5px rgba(195, 209, 234, 0.16);
        border-radius: 8px;
        background: #fff;
      }
    }
  }
}
</style>
