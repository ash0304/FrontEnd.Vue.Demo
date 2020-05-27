<template>
  <ValidationObserver v-slot="{ handleSubmit }" class="Withdrawal member-container" tag="div">
    <div class="member-title">
      <div class="title-text">{{ $t('Withdrawal.title') }}</div>
    </div>
    <div class="member-body">
      <div class="withdrawal-content">
        <el-form :label-position="'right'" label-width="100px">
          <el-form-item :label="$t('Withdrawal.pwd')" class="flex-item">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <div>
                <el-input
                  v-model="withdrawalForm.WithdrawalPassword"
                  type="password"
                  maxlength="20"
                  :placeholder="$t('Withdrawal.holder1')"
                />
                <div class="noPassword pointer" @click="openAddPasswordModal">
                  <span>{{ $t('Withdrawal.hint1') }}</span>
                </div>
              </div>
              <div class="input-tip">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
          <el-form-item :label="$t('BankCard.title')" class="flex-item">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <div>
                <el-select
                  v-model="withdrawalForm.MemberBankCardID"
                  :placeholder="$t('Withdrawal.holder2')"
                >
                  <el-option
                    v-for="(item, index) in bankCardList"
                    :key="index"
                    :value="item.BankCaredID"
                    :label="item.BankName +' - '+ item.BankCard.replace(/[*]/g,'')"
                  />
                </el-select>
                <div
                  v-if="bankCardList && bankCardList.length===0"
                  class="noPassword pointer"
                  @click="toBankCard"
                >
                  <span>{{ $t('Withdrawal.hint2') }}</span>
                </div>
              </div>
              <div class="input-tip">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
          <el-form-item :label="$t('Withdrawal.amount')">
            <ValidationProvider
              v-slot="{ errors }"
              :rules="`required|amount:${WithdrawalMiniLimit},${WithdrawalUpperLimit}`"
            >
              <el-input
                v-model="withdrawalForm.Amount"
                maxlength="9"
                :placeholder="$t('Withdrawal.holder3')"
              />
              <div class="input-tip">
                <span v-if="errors[0]">{{ errors[0] }}，</span>
                <span>
                  {{ $t('Withdrawal.hint3') }} {{ WithdrawalMiniLimit }} {{ $t('Wallet.yen') }}
                  <span
                    v-if="HasWithdrawalUpperLimit"
                  >{{ $t('Withdrawal.hint4') }} {{ WithdrawalUpperLimit }} {{ $t('Wallet.yen') }}</span>
                </span>
              </div>
            </ValidationProvider>
          </el-form-item>
          <el-form-item :label="$t('Deposit.caution')">
            <div class="caution">
              <div class="tip-item">1. 提款申请提交后，须经由财务人员审核，若 48 小时未审核完成，请联系客服。</div>
              <div class="tip-item">2. 每次提款依本厅提款相关规范，可能收取手续费。</div>
            </div>
          </el-form-item>
          <el-form-item>
            <div
              class="member-center-btn pointer"
              :class="{'disable':disable}"
              @click="handleSubmit(withdrawal)"
            >
              <span>{{ $t('Withdrawal.submit') }}</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </ValidationObserver>
</template>
<script>
export default {
  name: 'Withdrawal',
  data() {
    return {
      WithdrawalMiniLimit: '--',
      WithdrawalUpperLimit: '--',
      HasWithdrawalUpperLimit: false,
      withdrawalForm: {
        Amount: null,
        MemberBankCardID: null,
        WithdrawalPassword: null
      },
      bankCardList: null,
      showPasswordTip: false,
      disable: false
    }
  },
  methods: {
    openAddPasswordModal() {
      this.$modalAddWithdrawalPassword.show()
    },
    toBankCard() {
      this.$router
        .push({
          name: 'BankCard'
        })
        .catch(() => {})
    },
    withdrawal() {
      this.disable = true
      this.hintModalHandler(this.$t(`Demo用 无开放此功能`))
      return
    },
    hintModalHandler(text) {
      this.$modalHint.show({
        text
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.Withdrawal {
  .withdrawal-content {
    padding-top: 30px;
    overflow: hidden;
    /deep/.el-form-item {
      &.flex-item {
        .el-form-item__content {
          > span > div {
            display: flex;
          }
        }
      }
      .el-form-item__content {
        text-align: left;
        .el-input,
        .el-select {
          width: 300px;
        }
        .noPassword {
          text-align: left;
          width: 130px;
          font-size: 14px;
          font-weight: bold;
          margin-left: 20px;
          color: #7c8ea8;
        }

        .caution {
          padding-top: 8px;
          color: #39404d;
          text-align: left;
          line-height: 25px;
          opacity: 0.7;
        }
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
