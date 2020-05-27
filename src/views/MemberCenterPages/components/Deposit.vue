<template>
  <ValidationObserver v-slot="{ handleSubmit }" class="Deposit member-container" tag="div">
    <div class="member-title">
      {{ $t('Deposit.title') }}
      <span>{{ $t('Deposit.hint5') }}</span>
      <div @click="$router.push({name:'DepositHelp'})">{{ $t('Deposit.tutorial') }}</div>
    </div>

    <div class="bank-deposit-content">
      <el-form :label-position="'right'" label-width="100px">
        <el-form-item :label="$t('BankCard.bank')">
          <div class="payment-list flex">
            <div
              v-for="item in paymentList"
              :key="item.ID"
              class="payment-item pointer"
              :class="[currentPayment === item.ID?'active':'',`item-${item.ID}`]"
              @click="changePaymet(item.ID)"
            >
              <span>{{ item.PaymentName }}</span>
            </div>
          </div>
        </el-form-item>
        <template v-if="currentPayment===1">
          <el-form-item :label="$t('BankCard.bank')">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <el-select
                v-model="bankcardDepositForm.BankCardID"
                style="width: 100%;"
                @change="selectBankCard"
              >
                <el-option
                  v-for="item in bankcardList"
                  :key="item.BankCardID"
                  :label="item.BankName"
                  :value="item.BankCardID"
                />
              </el-select>
              <div class="input-tip">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
          <el-form-item :label="$t('Deposit.cardNumber')">
            <ValidationProvider v-slot="{ errors }" rules="card">
              <el-input v-model="bankcardDepositForm.PaymentAccount" maxlength="20" />

              <div class="input-tip">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
          <el-form-item :label="$t('Deposit.name')">
            <ValidationProvider v-slot="{ errors }" rules="required|name">
              <el-input v-model="bankcardDepositForm.PaymentName" maxlength="20" />
              <div class="input-tip">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item v-if="currentPayment===5" :label="$t('Deposit.payment')">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <el-select
                v-model="currentChannelID"
                style="width: 100%"
                @change="selectTTPChannel($event)"
              >
                <el-option
                  v-for="item in thirdPartyDepositChannelList"
                  :key="item.ChannelID"
                  :value="item.ChannelID"
                  :label="item.ChannelName"
                />
              </el-select>
              <div class="input-tip">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
        </template>

        <el-form-item :label="$t('Deposit.depositAmount')">
          <ValidationProvider
            v-slot="{ errors }"
            :rules="`required|amount:${MiniLimit},${UpperLimit}`"
          >
            <el-input
              v-model="bankcardDepositForm.DepositAmount"
              maxlength="9"
              :placeholder="$t('Deposit.hint4')"
            />
            <div class="input-tip">
              <span v-if="errors[0]">{{ errors[0] }}，</span>
              {{ $t('Deposit.hint1') }} {{ MiniLimit }} {{ $t('Deposit.hint2') }} {{ UpperLimit }} {{ $t('Deposit.hint3') }}
            </div>
          </ValidationProvider>
        </el-form-item>
        <el-form-item>
          <div v-if="MiniLimit !=='--'&&UpperLimit!=='--'" class="quick">
            <span
              v-for="item in quickDiv"
              :key="'quick'+item"
              :class="{disable:item>UpperLimit,active:bankcardDepositForm.DepositAmount === item.toString()}"
              @click="bankcardDepositForm.DepositAmount = item.toString()"
            >{{ item + $t('Wallet.yen') }}</span>
          </div>
        </el-form-item>
        <el-form-item v-if="currentPayment===1" :label="$t('Deposit.caution')">
          <div class="caution">
            <div>
              1. 填写附言完整转帐资讯可提升审核效率。
              <br />2.该收款帐户仅支持银行网银转帐，若使用其他渠道转入而导致财务异常均由个人承担。
              <br />3. 如充值 24 小时后尚未到帐，请联系在线客服。
              <br />
            </div>
          </div>
        </el-form-item>
        <el-form-item v-else :label="$t('Deposit.caution')">
          <div class="caution">
            <div>
              1. 支付完成前请勿关闭浏览器，否则可能造成支付失败。
              <br />2. 如充值 24 小时后尚未到帐，请联系在线客服。
              <br />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div
            class="member-center-btn pointer"
            :class="{'disable':disable}"
            @click="handleSubmit(submit)"
          >
            <span>{{ $t('Deposit.submit') }}</span>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div
      v-if="thirdPartyDepositInfoModalOpen"
      class="qr-modal-bg custom-modal-bg"
      :class="{'bounce-in': effectShow, 'bounce-out': !effectShow}"
      @click.self="closeInfoModal"
    >
      <div class="qr-modal">
        <div class="qr-title">{{ $t('Deposit.info') }}</div>
        <div class="qr-body">
          <el-form :label-position="'right'" label-width="125px">
            <el-form-item :label="$t('Deposit.payAmount')">
              <div class="deposit-amount">
                <span>{{ modalDepositAmount | thousandFilter }}</span>
              </div>
            </el-form-item>
            <el-form-item :label="$t('Deposit.scan')">
              <div class="qr-code">
                <qrcode-vue :value="qrcodeUrl" :size="150" level="L"></qrcode-vue>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <div class="member-center-btn pointer" @click="closeInfoModal">
          <span>{{ $t('Deposit.complete') }}</span>
        </div>
      </div>
    </div>
    <div v-if="depositInfoOpen && depositInfo" class="deposit-info-modal-bg custom-modal-bg">
      <div class="deposit-info-modal">
        <div class="close-mark pointer" @click="closeInfoModal"></div>

        <div class="deposit-info-title">{{ $t('Deposit.info') }}</div>
        <div class="deposit-info-body">
          <el-form :label-position="'right'" label-width="125px">
            <el-form-item :label="$t('Deposit.toBank')">
              <div class="flex flex-between">
                <span>{{ depositInfo.BankName }}</span>
                <span class="pointer" @click="copyInfo(depositInfo.BankName)">
                  <i class="el-icon-document-copy"></i>
                </span>
              </div>
            </el-form-item>
            <el-form-item :label="$t('Deposit.toAccount')">
              <div class="flex flex-between">
                <span>{{ depositInfo.BankCard }}</span>
                <span class="pointer" @click="copyInfo(depositInfo.BankCard)">
                  <i class="el-icon-document-copy"></i>
                </span>
              </div>
            </el-form-item>
            <el-form-item :label="$t('Deposit.toName')">
              <div class="flex flex-between">
                <span>{{ depositInfo.CardName }}</span>
                <span class="pointer" @click="copyInfo(depositInfo.CardName)">
                  <i class="el-icon-document-copy"></i>
                </span>
              </div>
            </el-form-item>
            <el-form-item :label="$t('Deposit.amount')">
              <div class="flex flex-between">
                <span class="amount">{{ depositInfo.Amount | thousandFilter }}</span>
                <span class="pointer" @click="copyInfo(depositInfo.Amount | thousandFilter)">
                  <i class="el-icon-document-copy"></i>
                </span>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div
          class="member-center-btn pointer"
          @click="depositInfoOpen=false"
        >{{ $t('modal.close') }}</div>
      </div>
    </div>
  </ValidationObserver>
</template>
<script>
import { thousandFilter } from '../../../utils/thousandFilter'

export default {
  name: 'Deposit',
  filters: {
    thousandFilter
  },
  data() {
    return {
      paymentList: [
        {
          ID: 1,
          PaymentName: '银行卡',
          Status: 1
        },
        {
          ID: 2,
          PaymentName: '微信',
          Status: 1
        },
        {
          ID: 3,
          PaymentName: '支付宝',
          Status: 1
        },
        {
          ID: 4,
          PaymentName: 'QQ',
          Status: 1
        },
        {
          ID: 5,
          PaymentName: '第三方支付',
          Status: 1
        }
      ],
      currentPayment: 1,
      bankcardList: null,
      bankcardDepositForm: {
        BankCardID: null,
        DepositAmount: null,
        PaymentAccount: '',
        PaymentName: ''
      },
      currentBankCard: null,
      currentChannelID: null,
      MiniLimit: '--',
      UpperLimit: '--',
      thirdPartyDepositInfoModalOpen: false,
      modalDepositAmount: null,
      qrcodeUrl: '',
      PaymentUrl: '',
      thirdPartyDepositChannelList: null,
      effectShow: false,
      depositInfo: null,
      depositInfoOpen: false,
      disable: false
    }
  },
  computed: {
    quickDiv() {
      const list = [100, 300, 500, 1000, 2000]
      return list
    }
  },
  watch: {
    qrcodeUrl() {
      if (this.qrcodeUrl) {
        this.openInfoModal()
      } else {
        this.qrcodeUrl = ''
      }
    },
    PaymentUrl() {
      if (this.PaymentUrl) {
        window.open(this.PaymentUrl, '_blank')
      }
    }
  },
  methods: {
    submit() {
      if (this.currentPayment === 1) {
        this.bankCardDeposit()
      } else {
        this.thirdPartyDeposit()
      }
    },
    changePaymet(type) {
      this.currentPayment = type
      this.getThridPartyDepositChannel()
    },
    getThridPartyDepositChannel() {
      this.resetBankcardDepositForm()
    },
    selectTTPChannel(channelID) {
      const selectedChannel = this.thirdPartyDepositChannelList.find(
        item => item.ChannelID === channelID
      )
      this.MiniLimit = selectedChannel.MiniLimit
      this.UpperLimit = selectedChannel.UpperLimit
    },
    resetBankcardDepositForm() {
      this.bankcardDepositForm.BankCardID = null
      this.bankcardDepositForm.DepositAmount = null
      this.bankcardDepositForm.PaymentAccount = ''
      this.bankcardDepositForm.PaymentName = ''
      this.MiniLimit = '--'
      this.UpperLimit = '--'
    },
    bankCardDeposit() {
      this.hintModalHandler(this.$t(`Demo用 无开放此功能`))
      return
    },
    thirdPartyDeposit() {
      this.hintModalHandler(this.$t(`Demo用 无开放此功能`))
      return
    },
    selectBankCard(data) {
      this.MiniLimit = this.bankcardList.find(
        item => item.BankCardID === data
      ).MiniLimit
      this.UpperLimit = this.bankcardList.find(
        item => item.BankCardID === data
      ).UpperLimit
    },
    openInfoModal() {
      this.thirdPartyDepositInfoModalOpen = true
      this.effectShow = true
    },
    closeInfoModal() {
      this.thirdPartyDepositInfoModalOpen = false
      this.effectShow = false
    },
    hintModalHandler(text) {
      this.$modalHint.show({
        text,
        isDoubleModal: false
      })
    },
    copyInfo(text) {
      const selBox = document.createElement('textarea')
      selBox.style.position = 'fixed'
      selBox.style.left = '0'
      selBox.style.top = '0'
      selBox.style.opacity = '0'
      selBox.value = text
      document.body.appendChild(selBox)
      selBox.focus()
      selBox.select()
      document.execCommand('copy')
      document.body.removeChild(selBox)
      this.$modalHint.show({
        text: '复制成功',
        isDoubleModal: false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.Deposit {
  position: relative;
  .member-title {
    > div {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 20px;
      color: #4266ee;
      border: 1px solid #4266ee;
      font-size: 14px;
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-weight: normal;
      cursor: pointer;
      &:hover {
        filter: brightness(120%);
      }
    }
  }
  .bank-deposit-content {
    padding-top: 30px;
    .payment-list {
      height: 100px;
      width: 100%;
      border-radius: 5px;
      color: white;
      padding: 10px;
      .payment-item {
        font-size: 13px;
        overflow: hidden;
        line-height: 25px;
        white-space: nowrap;
        width: 70px;
        height: 70px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        border-radius: 8px;
        border: 1px solid #dbe3f1;
        color: #39404d;
        margin-left: 12.5px;
        margin-right: 12.5px;
        background-size: 50% !important;
        &.item-1 {
          background: url('../../../assets/images/memberCenter/pay_06.png')
            no-repeat top 10px center;
        }
        &.item-2 {
          background: url('../../../assets/images/memberCenter/pay_02.png')
            no-repeat top 10px center;
        }
        &.item-3 {
          background: url('../../../assets/images/memberCenter/pay_03.png')
            no-repeat top 10px center;
        }
        &.item-4 {
          background: url('../../../assets/images/memberCenter/pay_07.png')
            no-repeat top 10px center;
        }
        &.item-5 {
          background: url('../../../assets/images/memberCenter/pay_04.png')
            no-repeat top 10px center;
        }
        &.active {
          color: #4266ee;
          border-color: #4266ee;
        }
        &:hover {
          border-color: #4266ee;
        }
        &:first-child {
          margin-left: 0px;
        }
        &:last-child {
          margin-right: 0px;
        }
      }
    }
    .quick {
      display: flex;
      text-align: center;
      font-weight: bold;
      > span {
        margin-right: 20px;
        display: block;
        border-radius: 8px;
        color: #757a83;
        width: 85px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #dbe3f1;
        cursor: pointer;
        transition: 1s;
        &.active,
        &:hover {
          border: 1px solid #4266ee;
          color: #4266ee;
        }
        &.disable {
          opacity: 0.5;
          pointer-events: none;
        }
      }
    }
    .caution {
      padding-top: 8px;
      color: #39404d;
      text-align: left;
      line-height: 25px;
      opacity: 0.7;
    }
  }

  .qr-modal-bg {
    .qr-modal {
      width: 450px;
      height: 380px;
      background-color: #fff;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      margin: auto;
      position: absolute;

      .qr-title {
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        text-align: center;
        font-weight: 900;
        padding: 20px 0;
        position: relative;

        &:before {
          content: '';
          bottom: 0;
          left: 0;
          background: rgba(182, 197, 225, 0.3);
          height: 1px;
          width: 100%;
          position: absolute;
        }
      }
      .qr-body {
        padding: 10px 50px;
        .deposit-amount {
          color: #45dca7;
          font-weight: bold;
          text-align: left;
        }
        .qr-code {
          padding-top: 10px;
          width: 150px;
          height: 150px;
        }
        .btn-container {
          padding: 0 130px;
        }
      }
      .member-center-btn {
        margin: 0 auto;
      }
    }
  }
  .deposit-info-modal-bg {
    .deposit-info-modal {
      width: 450px;
      height: 380px;
      background-color: #fff;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      margin: auto;
      position: absolute;
      .deposit-info-title {
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        text-align: center;
        font-weight: 900;
        padding: 20px 0;
        position: relative;

        &:before {
          content: '';
          bottom: 0;
          left: 0;
          background: rgba(182, 197, 225, 0.3);
          height: 1px;
          width: 100%;
          position: absolute;
        }
      }
      .deposit-info-body {
        color: rgba(0, 0, 0, 0.85);
        padding: 20px 40px;
        .el-form-item {
          margin-bottom: 10px;
        }
        span {
          text-align: left;
          &.amount {
            color: #45dca7;
            font-weight: bold;
          }
        }
      }
      .member-center-btn {
        margin: 0 auto;
      }
    }
  }

  .tool {
    height: 70px !important;
    .disable {
      pointer-events: none;
      > span {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>
