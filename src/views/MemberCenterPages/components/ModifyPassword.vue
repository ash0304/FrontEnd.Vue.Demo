<template>
  <div class="modify-password member-container">
    <div class="member-title">
      <div class="title-text">{{ $t('memberCenter.modifyPwd') }}</div>
      <div class="modify-type flex pointer" :class="{wdl:modifyType===1}">
        <div
          class="type-item login-password"
          :class="{active: modifyType===0}"
          @click="switchModifyType(0)"
        >{{ $t('register.password') }}</div>
        <div
          class="type-item withdrawal-password"
          :class="{active: modifyType===1}"
          @click="switchModifyType(1)"
        >{{ $t('memberCenter.wdlPwd') }}</div>
      </div>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }" class="member-body" tag="div">
      <div class="form-body">
        <el-form :label-position="'right'" label-width="125px">
          <el-form-item
            :class="{invalid: formValidation.OldPassword}"
            :label="modifyType===0 ? $t('memberCenter.originPwd') : $t('memberCenter.originWdlPwd')"
          >
            <ValidationProvider v-slot="{ errors }" rules="required|account">
              <el-input
                v-model="modifyForm.OldPassword"
                type="password"
                style="width: 300px;"
                :placeholder="modifyType===0 ? $t('memberCenter.holder1') : $t('memberCenter.holder2')"
              />
              <div class="input-tip">
                <span class="tip-item">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
          <el-form-item
            :class="{invalid: formValidation.NewPassword}"
            :label="modifyType===0 ? $t('memberCenter.newPwd') : $t('memberCenter.newWdlPwd')"
          >
            <ValidationProvider v-slot="{ errors }" name="password" rules="required|password">
              <el-input
                v-model="modifyForm.NewPassword"
                type="password"
                style="width: 300px;"
                :placeholder="modifyType===0 ? $t('memberCenter.holder3') : $t('memberCenter.holder4')"
              />
              <div class="input-tip">
                <span class="tip-item">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
          <el-form-item
            :class="{invalid: formValidation.NewPasswordConfirm}"
            :label="$t('memberCenter.holder5')"
          >
            <ValidationProvider v-slot="{ errors }" rules="required|pwdConfirm:@password">
              <el-input
                v-model="modifyForm.NewPasswordConfirm"
                type="password"
                style="width: 300px;"
                :placeholder="modifyType===0 ? $t('memberCenter.rePwd') : $t('memberCenter.reWdlPwd')"
              />
              <div class="input-tip">
                <span class="tip-item">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
          <el-form-item>
            <div class="member-center-btn pointer" @click="handleSubmit(modifyPassword)">
              <span>{{ $t('memberCenter.confirm') }}</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </ValidationObserver>
  </div>
</template>
<script>
export default {
  name: 'ModifyPassword',
  data() {
    return {
      modifyType: 0,
      modifyForm: {
        OldPassword: '',
        NewPassword: '',
        NewPasswordConfirm: ''
      },
      formValidation: {
        OldPassword: false,
        NewPassword: false,
        NewPasswordConfirm: false
      }
    }
  },
  beforeMount() {},
  methods: {
    switchModifyType(type) {
      this.modifyType = type
      for (const key of Object.keys(this.modifyForm)) {
        this.modifyForm[key] = ''
        this.formValidation[key] = false
      }
    },
    modifyPassword() {
      if (this.modifyType === 0) {
        this.hintModalHandler(this.$t(`Demo用 无开放此功能`))
        return
      }
      if (this.modifyType === 1) {
        this.hintModalHandler(this.$t(`Demo用 无开放此功能`))
        return
      }
    },
    hintModalHandler(text, callbackFnc) {
      this.$modalHint.show({
        text,
        isDoubleModal: false,
        callbackFnc
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.modify-password {
  overflow: hidden;
  .member-title {
    display: block !important;
    padding-bottom: 0 !important;
    > div {
      &:last-child {
        font-size: 14px;
        font-weight: normal;
        padding-top: 20px;
        position: relative;
        &:before {
          content: '';
          bottom: 0;
          left: 42px;
          width: 30px;
          height: 2px;
          background: #5b6ef2;
          position: absolute;
          transition: 0.5s;
        }
        &.wdl {
          &:before {
            content: '';

            left: 160px;
          }
        }
        > div {
          padding: 10px;
          margin: 0 20px;
          &.active {
            color: #5b6ef2;
          }
        }
      }
    }
  }
  .member-body {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    .modify-type {
      .type-item {
        &.active {
          background: #0259d9;
          color: #fff;
        }
      }
    }
    .form-body {
      min-height: 400px;
      padding-top: 20px;
      padding-left: 30px;
      padding-right: 50px;
      /deep/.el-form-item {
        .el-input__inner {
          height: 40px;
        }
        &.invalid {
          .input-tip {
            color: red;
          }
          .el-input__inner {
            border: 1px solid red;
          }
        }
      }
    }
  }
}
</style>
