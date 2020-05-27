<template>
  <ValidationObserver v-slot="{ handleSubmit }" class="profile member-container" tag="div">
    <div class="member-title">
      <div class="title-text">{{ $t('profile.title') }}</div>
    </div>
    <div class="member-body">
      <div v-if="memberInfo" class="profile-content">
        <el-form :label-position="'right'" label-width="100px">
          <el-form-item :label=" $t('profile.account') ">
            <el-input v-model="memberInfo.Account" disabled style="width: 185px;" />
          </el-form-item>
          <el-form-item :label=" $t('profile.name') ">
            <ValidationProvider v-slot="{ errors }" rules="name">
              <el-input
                v-model="name"
                :disabled="!nameInputTipShow"
                maxlength="20"
                style="width: 185px;"
              />
              <div v-if="nameInputTipShow" class="input-tip">
                <span v-if="!name">{{ $t('profile.hint1') }}</span>
                <span v-else>{{ errors[0] }}</span>
              </div>
              <el-tooltip
                v-else
                class="item"
                effect="dark"
                :content="$t('profile.hint3')"
                placement="right"
              >
                <div class="name-tip"></div>
              </el-tooltip>
            </ValidationProvider>
          </el-form-item>
          <el-form-item :label="$t('profile.sex')">
            <el-radio-group v-model="memberInfo.Sex" style="width: 185px;">
              <el-radio-button :label="0">{{ $t('profile.female') }}</el-radio-button>
              <el-radio-button :label="1">{{ $t('profile.male') }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('profile.birth')">
            <div class="flex">
              <el-select
                v-model="year"
                :placeholder="$t('profile.year')"
                :disabled="memberInfo.Birthday!==null"
                style="width: 185px;"
                @change="changeDateList(year, month);month = null"
              >
                <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
              </el-select>
              <el-select
                v-model="month"
                :placeholder="$t('profile.month')"
                :disabled="memberInfo.Birthday!==null"
                style="width: 185px; margin: 0 10px;"
                @change="changeDateList(year, month)"
              >
                <el-option v-for="item in monthList" :key="item" :label="item+1" :value="item+1" />
              </el-select>
              <el-select
                v-model="date"
                :placeholder="$t('profile.day')"
                :disabled="memberInfo.Birthday!==null"
                style="width: 185px;"
              >
                <el-option v-for="item in dateList" :key="item" :label="item+1" :value="item+1" />
              </el-select>
              <div v-if="birthdayInputTipShow" class="input-tip">
                <span v-if="!birthValidate">{{ $t('profile.hint2') }}</span>
                <span v-else>{{ birthValidate }}</span>
              </div>
              <el-tooltip
                v-else
                class="item"
                effect="dark"
                :content="$t('profile.hint3')"
                placement="right"
              >
                <div class="name-tip"></div>
              </el-tooltip>
            </div>
          </el-form-item>
          <el-form-item :label="$t('profile.phone')">
            <ValidationProvider v-slot="{ errors }" rules="phone">
              <el-input v-model="memberInfo.Phone" maxlength="20" style="width: 185px;" />
              <div class="input-tip">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
          <el-form-item label="QQ">
            <ValidationProvider v-slot="{ errors }" rules="qq">
              <el-input v-model="memberInfo.QQ" maxlength="12" style="width: 185px;" />
              <div class="input-tip">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
          <el-form-item :label="$t('profile.wechat')">
            <ValidationProvider v-slot="{ errors }" rules="wechat">
              <el-input v-model="memberInfo.WeChat" maxlength="20" style="width: 185px;" />
              <div class="input-tip">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
          <el-form-item :label="$t('profile.mail')">
            <ValidationProvider v-slot="{ errors }" rules="email">
              <el-input
                v-model="memberInfo.Email"
                maxlength="30"
                type="email"
                style="width: 185px;"
              />
              <div class="input-tip">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </el-form-item>
          <el-form-item>
            <div class="member-center-btn pointer" @click="handleSubmit(editMemberInfo)">
              <span>{{ $t('profile.save') }}</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </ValidationObserver>
</template>
<script>
export default {
  name: 'Profile',
  data() {
    return {
      memberInfo: {
        Account: 'ash123',
        Sex: 1,
        Phone: '',
        QQ: '',
        WeChat: '',
        Email: ''
      },
      year: 1994,
      month: 3,
      date: 4,
      name: 'Ash',
      yearList: [...Array(100).keys()],
      monthList: [...Array(12).keys()],
      dateList: [],
      nameInputTipShow: true,
      birthdayInputTipShow: true
    }
  },
  computed: {
    birthValidate() {
      if (this.date === '') {
        return this.$t('validation.birth')
      } else if (
        (this.year || this.month || this.date) &&
        (!this.year || !this.month || !this.date)
      ) {
        return this.$t('validation.birth')
      } else return ''
    }
  },
  created() {
    this.createBirthdayList()
  },
  methods: {
    createBirthdayList() {
      const dateObj = new Date()
      const startYear = dateObj.getFullYear() - 18
      this.yearList = this.yearList.map(year => startYear - year)
    },
    changeDateList(year, month) {
      if (!year || !month) {
        return
      }
      if (
        month === 1 ||
        month === 3 ||
        month === 5 ||
        month === 7 ||
        month === 8 ||
        month === 10 ||
        month === 12
      ) {
        this.dateList = [...Array(31).keys()]
      }
      if (month === 4 || month === 6 || month === 9 || month === 11) {
        this.dateList = [...Array(30).keys()]
      }
      if (month === 2) {
        if (year % 4 === 0) {
          this.dateList = [...Array(29).keys()]
        }
        if (year % 4 !== 0) {
          this.dateList = [...Array(28).keys()]
        }
      }
      this.date = null
    },
    editMemberInfo() {
      if (this.birthValidate || this.date === null) {
        this.date = ''
        return
      }
      this.hintHandler('个人资料更新成功', this.getMemberInfo)
    },
    hintHandler(text, callbackFnc) {
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
.profile {
  .profile-content {
    padding-top: 20px;
    .el-form-item {
      /deep/.el-radio-group {
        display: flex;
        justify-content: space-between;
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
          background: #fff;
          border: 1px solid #4266ee;
          color: #4266ee;
        }
        .el-radio-button__inner {
          padding: 12px 35px;
          border-radius: 8px;
          border: 1px solid #dbe3f1;
        }
      }
      .input-tip {
        display: inline-block;
        padding-left: 20px;
      }
    }
    .name-tip {
      position: relative;
      top: 6px;
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url('../../../assets/images/memberCenter/img_precautions.png')
        center center no-repeat;
      transition: 0.5s;
      cursor: pointer;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
  .tool {
    height: 70px !important;
  }
}
</style>
