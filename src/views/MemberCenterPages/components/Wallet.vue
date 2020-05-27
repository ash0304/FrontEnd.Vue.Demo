<template>
  <div class="Wallet member-container">
    <div class="member-title">
      <div class="title-text">{{ $t('Wallet.title') }}</div>
    </div>
    <div class="member-body">
      <div class="wallet-content">
        <div class="info-row flex">
          <div class="flex" style="align-items: baseline;">
            <div>{{ $t('Wallet.title') }}</div>
            <div class="amonut">¥{{ balance | thousandFilter }}{{ $t('Wallet.yen') }}</div>
          </div>

          <div class="refresh flex pointer" @click="$store.dispatch('user/getInfo')">
            <span>{{ $t('Wallet.refresh') }}</span>
          </div>
          <div class="flex">
            <div
              class="recycle flex pointer"
              style="align-items: flex-end;"
              @click="membeBlanceRecycle"
            >
              <span>{{ $t('Wallet.recycle') }}</span>
            </div>
          </div>
        </div>
        <ValidationObserver v-slot="{ invalid,handleSubmit }" class="transfer-tool flex" tag="div">
          <el-select v-model="transferDataForm.OutPlatformID" style="width:185px;">
            <el-option
              :value="0"
              :label="$t('Wallet.balance')"
              :disabled="transferDataForm.InPlatformID===0"
            />
            <el-option
              v-for="item in walletList"
              :key="item.ID"
              :value="item.ID"
              :label="item.PlatformName"
              :disabled="transferDataForm.InPlatformID===item.ID"
            />
          </el-select>
          <span class="switch-btn" @click="switchData"></span>
          <el-select v-model="transferDataForm.InPlatformID" style="width: 185px;">
            <el-option
              :value="0"
              :label="$t('Wallet.balance')"
              :disabled="transferDataForm.OutPlatformID===0"
            />
            <el-option
              v-for="item in walletList"
              :key="item.ID"
              :value="item.ID"
              :label="item.PlatformName"
              :disabled="transferDataForm.OutPlatformID===item.ID"
            />
          </el-select>
          <span>{{ $t('Wallet.transferAmount') }}</span>
          <ValidationProvider rules="required|amount" tag="div">
            <el-input
              v-model="transferDataForm.Amount"
              class="amount-input"
              maxlength="9"
              :placeholder="$t('Wallet.inputAmount')"
            />
          </ValidationProvider>
          <div
            :class="{disable:invalid}"
            class="member-center-btn flex flex-items-center flex-center pointer"
            @click="handleSubmit(transferMoney)"
          >{{ $t('Wallet.confirm') }}</div>
        </ValidationObserver>
        <div class="game-wallets-list flex">
          <div v-for="(item, index) in walletList" :key="index" class="wallet-item">
            <div class="platform-name">{{ item.PlatformName }}</div>
            <div class="amount flex flex-center flex-items-center">
              <template v-if="typeof(item.amount) === 'number'">
                {{ $t('Wallet.itemBalance') }}
                <span class="money">{{ item.amount | thousandFilter }}</span>
                <span class="yen">{{ $t('Wallet.yen') }}</span>
              </template>
              <template
                v-else-if="item.amount==='err402' || item.amount==='err9999'"
              >{{ $t(`Wallet.${item.amount}`) }}</template>
              <div v-else class="loader"></div>
            </div>

            <div class="actions flex">
              <span
                class="refresh pointer"
                @click="refreshGameWallet(item.ID ,index)"
              >{{ $t('Wallet.refresh') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { thousandFilter } from '../../../utils/thousandFilter'
import { mapGetters } from 'vuex'

export default {
  name: 'Wallet',
  filters: {
    thousandFilter
  },
  data() {
    return {
      transferDirect: 0,
      transferDataForm: {
        InPlatformID: '',
        OutPlatformID: 0,
        Amount: null
      },
      loading: false,
      loadingTransfer: false,
      walletList: [],
      amountList: null
    }
  },
  computed: {
    ...mapGetters(['balance'])
  },
  methods: {
    switchData() {
      const rawIN = this.transferDataForm.InPlatformID
      this.transferDataForm.InPlatformID = this.transferDataForm.OutPlatformID
      this.transferDataForm.OutPlatformID = rawIN
    },
    getMemberPlatformBalance(PlatformID, index) {
      this.$store.dispatch('user/getPlatformAmount', PlatformID).then(res => {
        this.$set(this.walletList[index], 'amount', res)
      })
    },
    refreshGameWallet(PlatformID, index) {
      if (PlatformID) {
        this.$set(this.walletList[index], 'amount', undefined)
        this.$store.dispatch('user/getPlatformAmount', PlatformID).then(res => {
          this.$set(this.walletList[index], 'amount', res)
        })
      }
    },
    transferMoney() {
      this.transferDataForm.Amount = Number(this.transferDataForm.Amount)
      this.hintModalHandler(this.$t(`Demo用 无开放此功能`))
      return
    },
    membeBlanceRecycle() {
      this.$store.dispatch('user/spinnerSwitch', 'open')
      this.$modalHint.show({
        text: '一键回收成功'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.Wallet {
  position: relative;
  .member-body {
    .wallet-content {
      padding-top: 10px;
      .info-row {
        color: #39404d;
        // background-color: #273B9E;
        font-size: 14px;
        position: relative;
        padding: 10px 5px;
        align-items: center;
        margin-left: 5px;
        .amonut {
          color: #f8682f;
          padding: 0 30px;
          background-size: 20px 20px;
          line-height: 28px;
          &:hover {
            background-size: 21px 21px;
          }
        }
        .refresh {
          margin-left: 50px;
          line-height: 28px;
          background: url('../../../assets/images/memberCenter/refresh.png')
            center left no-repeat;
          background-size: contain;
          padding-left: 20px;
          height: 15px;
          line-height: 15px;
          color: #4266ee;
          &:hover {
            filter: brightness(140%);
          }
        }
        .recycle {
          padding-left: 20px;
          border-radius: 5px;
          color: #4266ee;
          &:hover {
            filter: brightness(140%);
          }
        }
      }
      /deep/.transfer-tool {
        margin-bottom: 50px;
        margin-left: 5px;
        .el-select {
          input {
            text-align: center;
          }
        }
        .switch-btn {
          width: 60px;
          height: 40px;
          cursor: pointer;
          background: url('../../../assets/images/memberCenter/switch.png')
            center center no-repeat;
          &:hover {
            filter: brightness(120%);
          }
        }
        > span:not(.switch-btn) {
          display: block;
          line-height: 40px;
          padding: 0 10px 0 20px;
        }
        .member-center-btn {
          margin-left: 30px;

          &.disable {
            filter: grayscale(100%) brightness(130%);
            cursor: not-allowed !important;
          }
        }
      }
      .game-wallets-list {
        flex-wrap: wrap;
        margin-top: 5px;
        .wallet-item {
          margin: 0 5px 15px 5px;
          position: relative;
          width: 220px;
          height: 110px;
          color: #39404d;
          border-radius: 8px;
          border: 1px solid #dbe3f1;
          padding: 15px 10px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .platform-name {
            white-space: nowrap;
            overflow: hidden;
            line-height: 20px;
            width: 100%;
            font-size: 14px;
            text-align: center;
          }
          .amount {
            white-space: nowrap;
            line-height: 20px;
            height: 20px;
            text-align: center;
            font-size: 12px;
            color: #a0a5ab;
            .money {
              margin: 0 10px;
              color: #39404d;
            }
          }

          .actions {
            font-size: 12px;
            margin-top: 10px;
            color: #4266ee;
            justify-content: center;

            > span {
              border: 1px solid #4266ee;
              padding: 0 20px;
              line-height: 23px;
              text-align: center;
              margin-right: 5px;
              border-radius: 20px;
              &:hover {
                color: white;
                background: #4266ee;
              }
            }
          }
        }
      }
    }
  }

  .loader {
    margin-left: -10px;
    font-size: 4px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    -webkit-animation: load5 1.1s infinite ease;
    animation: load5 1.1s infinite ease;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  @-webkit-keyframes load5 {
    0%,
    100% {
      box-shadow: 0em -2.6em 0em 0em #0259d9,
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2),
        2.5em 0em 0 0em rgba(176, 58, 57, 0.2),
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.2),
        0em 2.5em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.2),
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.5),
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.7);
    }
    12.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.7),
        1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(176, 58, 57, 0.2),
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.2),
        0em 2.5em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.2),
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.5);
    }
    25% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.5),
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.7), 2.5em 0em 0 0em #ffffff,
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.2),
        0em 2.5em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.2),
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2);
    }
    37.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.2),
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.5),
        2.5em 0em 0 0em rgba(176, 58, 57, 0.7), 1.75em 1.75em 0 0em #ffffff,
        0em 2.5em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.2),
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2);
    }
    50% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.2),
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2),
        2.5em 0em 0 0em rgba(176, 58, 57, 0.5),
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.7), 0em 2.5em 0 0em #ffffff,
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.2),
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2);
    }
    62.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.2),
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2),
        2.5em 0em 0 0em rgba(176, 58, 57, 0.2),
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.5),
        0em 2.5em 0 0em rgba(176, 58, 57, 0.7), -1.8em 1.8em 0 0em #ffffff,
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2);
    }
    75% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.2),
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2),
        2.5em 0em 0 0em rgba(176, 58, 57, 0.2),
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.2),
        0em 2.5em 0 0em rgba(176, 58, 57, 0.5),
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.7), -2.6em 0em 0 0em #ffffff,
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2);
    }
    87.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.2),
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2),
        2.5em 0em 0 0em rgba(176, 58, 57, 0.2),
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.2),
        0em 2.5em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.5),
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.7), -1.8em -1.8em 0 0em #ffffff;
    }
  }
  @keyframes load5 {
    0%,
    100% {
      box-shadow: 0em -2.6em 0em 0em #0259d9,
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2),
        2.5em 0em 0 0em rgba(176, 58, 57, 0.2),
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.2),
        0em 2.5em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.2),
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.5),
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.7);
    }
    12.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.7),
        1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(176, 58, 57, 0.2),
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.2),
        0em 2.5em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.2),
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.5);
    }
    25% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.5),
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.7), 2.5em 0em 0 0em #ffffff,
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.2),
        0em 2.5em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.2),
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2);
    }
    37.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.2),
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.5),
        2.5em 0em 0 0em rgba(176, 58, 57, 0.7), 1.75em 1.75em 0 0em #ffffff,
        0em 2.5em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.2),
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2);
    }
    50% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.2),
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2),
        2.5em 0em 0 0em rgba(176, 58, 57, 0.5),
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.7), 0em 2.5em 0 0em #ffffff,
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.2),
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2);
    }
    62.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.2),
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2),
        2.5em 0em 0 0em rgba(176, 58, 57, 0.2),
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.5),
        0em 2.5em 0 0em rgba(176, 58, 57, 0.7), -1.8em 1.8em 0 0em #ffffff,
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2);
    }
    75% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.2),
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2),
        2.5em 0em 0 0em rgba(176, 58, 57, 0.2),
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.2),
        0em 2.5em 0 0em rgba(176, 58, 57, 0.5),
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.7), -2.6em 0em 0 0em #ffffff,
        -1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2);
    }
    87.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(176, 58, 57, 0.2),
        1.8em -1.8em 0 0em rgba(176, 58, 57, 0.2),
        2.5em 0em 0 0em rgba(176, 58, 57, 0.2),
        1.75em 1.75em 0 0em rgba(176, 58, 57, 0.2),
        0em 2.5em 0 0em rgba(176, 58, 57, 0.2),
        -1.8em 1.8em 0 0em rgba(176, 58, 57, 0.5),
        -2.6em 0em 0 0em rgba(176, 58, 57, 0.7), -1.8em -1.8em 0 0em #ffffff;
    }
  }
}
</style>
