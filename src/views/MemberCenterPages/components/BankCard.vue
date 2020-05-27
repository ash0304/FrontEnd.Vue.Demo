<template>
  <div class="BankCard member-container">
    <div class="member-title">{{ $t('BankCard.title') }}</div>
    <div :class="{'noResult':bankCardList.length === 0}" class="bankCard-content flex">
      <span>{{ $t('BankCard.hint2') }}</span>

      <div v-for="item in bankCardList" :key="item.BankCaredID" class="card-item">
        <div class="bank-name">{{ item.BankName }}</div>
        <div class="bank-number">{{ item.BankCard }}</div>
      </div>

      <div
        :class="{'member-center-btn':bankCardList.length === 0,'disable':bankCardList.length >= 6,'card-item':bankCardList.length > 0}"
        class="add-bankCard pointer"
        @click="handleAddBankCard"
      >{{ $t('BankCard.addCard') }}</div>
    </div>

    <!-- Modal 新增真实姓名 -->
    <div
      v-if="modal2Show"
      class="realName-bg custom-modal-bg"
      :class="{'bounce-in': effect2Show, 'bounce-out': !effect2Show}"
      @click.self="modal2Close"
    >
      <ValidationObserver v-slot="{ handleSubmit }" class="realName-modal" tag="div">
        <div class="close-mark" @click="modal2Close"></div>
        <div class="realName-title">{{ $t('modal.hint') }}</div>
        <div class="realName-body">
          <div class="fill-first">
            {{ $t('BankCard.hint1') }}
            <span>{{ $t('BankCard.name') }}</span>
          </div>
          <el-form :label-position="'center'" label-width="0px">
            <el-form-item>
              <ValidationProvider v-slot="{ errors }" rules="name|required">
                <el-input v-model="nameTemp.Name" maxlength="20" style="width: 60%;" />
                <div class="input-tip">
                  <span v-if="!errors[0]">{{ $t('profile.hint1') }}</span>
                  <span v-else>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </el-form-item>
          </el-form>
        </div>
        <div
          class="member-center-btn pointer"
          @click="handleSubmit(fillMemberName)"
        >{{ $t('BankCard.confirm') }}</div>
      </ValidationObserver>
    </div>
    <!-- Modal 新增银行卡 -->
    <div
      v-if="modalShow"
      class="addbankcard-bg custom-modal-bg"
      :class="{'bounce-in': effectShow, 'bounce-out': !effectShow}"
      @click.self="modalClose"
    >
      <ValidationObserver v-slot="{ handleSubmit,invalid }" class="addbankcard-modal" tag="div">
        <div class="close-mark" @click="modalClose"></div>
        <div class="addbankcard-title">{{ $t('BankCard.addCard') }}</div>
        <div class="addbankcard-body">
          <el-form :label-position="'right'" label-width="80px">
            <el-form-item :label="$t('BankCard.bank')">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="flex flex-center"
                tag="div"
              >
                <el-select
                  v-model="temp.BankID"
                  filterable
                  :placeholder="$t('BankCard.placeholder')"
                  style="width: 40%;"
                >
                  <el-option
                    v-for="item in bankList"
                    :key="item.ID"
                    :label="item.BankName"
                    :value="item.ID"
                  />
                </el-select>
                <div class="input-tip">
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </el-form-item>
            <el-form-item :label="$t('BankCard.province')">
              <ValidationProvider
                v-slot="{ errors }"
                rules="chinese|required"
                class="flex flex-center"
                tag="div"
              >
                <el-input v-model="temp.Province" maxlength="6" style="width: 40%;" />
                <div class="input-tip">
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </el-form-item>
            <el-form-item :label="$t('BankCard.branch')">
              <ValidationProvider
                v-slot="{ errors }"
                rules="chinese|required"
                class="flex flex-center"
                tag="div"
              >
                <el-input v-model="temp.BankBranch" maxlength="6" style="width: 40%;" />
                <div class="input-tip">
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </el-form-item>
            <el-form-item :label="$t('BankCard.cardNumber')">
              <ValidationProvider
                v-slot="{ errors }"
                rules="card|required"
                class="flex flex-center"
                tag="div"
              >
                <el-input v-model="temp.BankCard" maxlength="20" style="width: 40%;" />
                <div class="input-tip">
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </el-form-item>
            <el-form-item :label="$t('BankCard.owner')">
              <ValidationProvider
                v-slot="{ errors }"
                rules="name|required"
                class="flex flex-center"
                tag="div"
              >
                <el-input v-model="temp.CardName" maxlength="20" style="width: 40%;" />
                <div class="input-tip">
                  <span v-if="!errors[0]" class="default">{{ $t('BankCard.hint3') }}</span>
                  <span v-else>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </el-form-item>
            <el-form-item>
              <div class="hint">{{ $t('BankCard.hint4') }}</div>
            </el-form-item>
            <el-form-item>
              <div
                class="member-center-btn pointer"
                :class="{disable:invalid}"
                @click="handleSubmit(createMemberBankCard)"
              >{{ $t('BankCard.confirm') }}</div>
            </el-form-item>
          </el-form>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BankCard',
  data() {
    return {
      bankCardList: [],
      modalShow: false,
      effectShow: false,
      modal2Show: false,
      effect2Show: false,
      profileName: '',
      bankList: [],
      temp: {
        BankID: null,
        Province: '',
        BankBranch: '',
        BankCard: '',
        CardName: ''
      },
      nameTemp: {
        Name: ''
      }
    }
  },
  methods: {
    resetTemp() {
      this.temp = {
        BankID: null,
        Province: '',
        BankBranch: '',
        BankCard: '',
        CardName: ''
      }
    },
    resetNameTemp() {
      this.nameTemp = {
        Name: ''
      }
    },
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
      setTimeout(() => {
        this.modalShow = false
      }, 200)
    },
    modal2Open() {
      this.modal2Show = true
      setTimeout(() => {
        document.body.style['overflow-y'] = 'hidden'
        this.effect2Show = true
      }, 0)
    },
    modal2Close() {
      this.effect2Show = false
      document.body.style['overflow-y'] = 'auto'
      setTimeout(() => {
        this.modal2Show = false
      }, 200)
    },
    handleAddBankCard() {
      this.hintModalHandler(this.$t(`Demo用 无开放此功能`))
      return
      // if (this.profileName) {
      //   this.resetTemp()
      //   this.modalOpen()
      // } else {
      //   this.resetNameTemp()
      //   this.modal2Open()
      // }
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
.BankCard {
  .bankCard-content {
    padding-top: 30px;
    flex-wrap: wrap;
    &.noResult {
      $div-height: 500px;
      flex-direction: column;
      align-items: center;
      height: $div-height;
      padding-top: $div-height/2;
      background: url('../../../assets/images/memberCenter/visa.png') top
        $div-height/2 - 110px center no-repeat;
      background-size: 285px;
      color: #a0a5ab;
      > span {
        padding-bottom: 15px;
        display: inline;
      }
      .add-bankCard {
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #5b6ef2;
        &:hover {
          filter: brightness(120%);
        }
      }
    }
    > span {
      display: none;
    }
    .card-item {
      color: white;
      font-size: 14px;
      font-weight: bold;
      width: 225px;
      height: 120px;
      background: url('../../../assets/images/memberCenter/card-bg.jpg')
        no-repeat;
      background-size: cover;
      border-radius: 8px;
      margin-bottom: 25px;
      margin-right: 30px;
      text-align: left;
      padding: 12px;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      @for $i from 1 through 8 {
        &:nth-child(#{$i}) {
          &:not(.add-bankCard) {
            filter: hue-rotate(85deg * ($i - 2));
          }
        }
      }
      &.add-bankCard {
        background: rgba(244, 248, 249, 0.5) !important;
        border: 1px solid #dbe3f1;
        color: #5b6ef2 !important;
        font-weight: normal;
        display: flex;
        justify-content: center !important;
        align-items: center;
        position: relative;
        padding-top: 50px !important;

        &.disable {
          display: none !important;
        }
        &:before {
          content: '';
          top: 40%;
          left: 50%;
          height: 3px;
          width: 30px;
          transform: translate(-50%, -50%);
          position: absolute;
          background: #5b6ef2;
        }
        &:after {
          content: '';
          top: 40%;
          left: 50%;
          height: 30px;
          width: 3px;
          transform: translate(-50%, -50%);
          position: absolute;
          background: #5b6ef2;
        }
        &:hover {
          filter: brightness(105%);
        }
      }
      .bank-name {
        padding-left: 40px;
        position: relative;
        &:before {
          content: '';
          top: 50%;
          left: 0;
          height: 30px;
          width: 30px;
          transform: translateY(-50%);
          border-radius: 50%;
          position: absolute;
          background: url('../../../assets/images/memberCenter/card-icon.png')
            no-repeat left center #fff;
          background-size: contain;
        }
      }
      .bank-number {
        bottom: 11%;
        right: 30%;
        text-align: right;
      }
    }
  }
  // 设定真实姓名弹窗
  .realName-bg {
    .realName-modal {
      width: 400px;
      height: 350px;
      position: fixed;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      margin: auto;
      background-color: white;
      z-index: 2001;
      text-align: center;
      .close-mark {
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 25px;
        width: 10px;
        height: 10px;
        background: url('../../../assets/images/public/close_modal.png') center
          center no-repeat;
        opacity: 0.5;
        z-index: 1;
        &:hover {
          opacity: 1;
        }
      }
      .realName-title {
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
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
      .fill-first {
        color: #39404d;
        > span {
          color: #7c8ea8;
          font-weight: bold;
        }
      }
      .realName-body {
        position: relative;
        // width: 400px;
        padding-top: 50px;
        .fill-first {
          margin-bottom: 20px;
        }
        .input-tip {
          height: 14px;
          text-align: center;
          font-size: 12px;
          margin-bottom: 20px;
        }
      }
      .member-center-btn {
        margin: 0 auto !important;
      }
    }
  }
  // 新增银行卡弹窗
  .addbankcard-bg {
    .addbankcard-modal {
      width: 670px;
      height: 530px;
      position: fixed;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      margin: auto;
      background-color: white;
      z-index: 2001;
      .close-mark {
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 25px;
        width: 10px;
        height: 10px;
        background: url('../../../assets/images/public/close_modal.png') center
          center no-repeat;
        opacity: 0.5;
        z-index: 1;
        &:hover {
          opacity: 1;
        }
      }
      .addbankcard-title {
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
      .addbankcard-body {
        position: relative;
        // width: 400px;
        height: auto;
        padding: 45px 25px 25px 25px;
        .input-tip {
          margin-left: 20px;
          width: 55%;
          font-size: 12px;
          height: auto !important;
          line-height: 18px !important;
          padding-top: 0;
          display: flex;
          align-items: center;
          .default {
            color: #7c8ea8;
            padding-left: 0;
            background: none;
            font-weight: normal;
          }
        }
        .hint {
          color: #7c8ea8;
          line-height: 18px !important;
        }
      }
    }
  }
}
</style>
