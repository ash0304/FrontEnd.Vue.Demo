<template>
  <div
    v-if="modalShow"
    class="addWithdrawalPasswordModal custom-modal-bg"
    :class="{'bounce-in': effectShow, 'bounce-out': !effectShow}"
    @click.self="modalClose"
  >
    <ValidationObserver v-slot="{ handleSubmit }" class="addWPassword-modal" tag="div">
      <div class="close-mark" @click="modalClose"></div>
      <div class="addWPassword-title">{{ $t('creatWdlPwd.title') }}</div>
      <div class="addWPassword-body">
        <div class="addWPassword-content">
          <el-form :label-position="'right'" label-width="130px">
            <el-form-item :label="$t('register.password')">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <el-input v-model="dataTemp.AccountPassword" type="password" />
                <div class="input-tip">
                  <span class="tip-item">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </el-form-item>
            <el-form-item :label="$t('creatWdlPwd.title')">
              <ValidationProvider v-slot="{ errors }" name="password" rules="required|password">
                <el-input
                  v-model="dataTemp.WithdrawalPassword"
                  :placeholder="$t('creatWdlPwd.hint1')"
                  type="password"
                />
                <div class="input-tip">
                  <span class="tip-item">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </el-form-item>
            <el-form-item :label="$t('creatWdlPwd.confirmPwd')">
              <ValidationProvider v-slot="{ errors }" rules="required|pwdConfirm:@password">
                <el-input
                  v-model="dataTemp.WithdrawalPasswordConfirm"
                  :placeholder="$t('creatWdlPwd.holder')"
                  type="password"
                />
                <div class="input-tip">
                  <span class="tip-item">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="member-center-btn pointer" @click="handleSubmit(createWithdrawalPassword)">
        <span>{{ $t('memberCenter.confirm') }}</span>
      </div>
    </ValidationObserver>
  </div>
</template>
<script>
import ModalAddWithdrawalPassword from '../../utils/AddWithdrawalPasswordModal'
import { createWithdrawalPassword } from '../../api/member'

export default {
  name: 'AddWithdrawalPasswordModal',
  data() {
    return {
      modalShow: false,
      effectShow: false,
      dataTemp: {
        AccountPassword: '',
        WithdrawalPassword: '',
        WithdrawalPasswordConfirm: ''
      }
    }
  },
  beforeMount() {
    ModalAddWithdrawalPassword.EventBus.$on('show', () => {
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
      for (const key of Object.keys(this.dataTemp)) {
        this.dataTemp[key] = ''
      }
      setTimeout(() => {
        this.modalShow = false
      }, 200)
    },
    createWithdrawalPassword() {
      createWithdrawalPassword(this.dataTemp).then(res => {
        if (res.Code === 0) {
          this.$store.dispatch('user/hasWithdrawalPassword')
          this.modalClose()
          this.$modalHint.show({
            text: '新增成功',
            isDoubleModal: false
          })
        } else {
          this.$modalHint.show({
            text: res.Message,
            isDoubleModal: true
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.addWithdrawalPasswordModal {
  .addWPassword-modal {
    width: 450px;
    height: 500px;
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    margin: auto;
    z-index: 2001;
    background-color: white;

    .close-mark {
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 25px;
      width: 10px;
      height: 10px;
      background: url('../../assets/images/public/close_modal.png') center
        center no-repeat;
      opacity: 0.5;
      z-index: 1;
      &:hover {
        opacity: 1;
      }
    }
    .addWPassword-title {
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
    .addWPassword-body {
      padding: 50px 70px 50px 20px;
    }
    .member-center-btn {
      margin: 0 auto;
    }
  }
}
</style>
