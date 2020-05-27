<template>
  <div class="inner-content">
    <div class="select-box flex flex-items-center flex-between">
      <div
        v-for="(item, index) in tabList"
        :key="index"
        :class="{ active: currentPage === item.tabName }"
        class="select-item txt-c pointer"
        @click="selectTab(item)"
      >{{ item.tabCName }}</div>
      <div
        class="selected-bar"
        :class="{left: currentPage === 'agentJoin' , right: currentPage === 'agentRegister' }"
      ></div>
    </div>
    <div v-if="currentPage === 'agentJoin'">
      <div class="small-title">代理加盟</div>
      <div class="small-text">
        FastPack娱乐期待一切有胆量、有才略、有远见的有识之士加入我们的同富共荣圈。运用您拥有的网络资源或是人脉资源，欢迎您成为我们的合作伙伴， 零门槛 零投资 零风险 高回报！快速简单赚钱！
        我们为您提供多方位支援，每月由系统计算并产生报表给您查询，赚取无上限的代理佣金，提供您便捷简易的佣金领取方式，让您游刃有余，无本生利！
        点击下方「代理申请」即刻提出申请，我们需要您填写欲申请的代理帐号以及正确的个人资料：姓名、手机号与邮箱。个人资料请务必确保真实有效，以便为您支付佣金。成功注册后3日内由专员与您联系开通，并提供您的代理中心入口及推广链接
      </div>
      <div class="small-title">加入FastPack娱乐代理五大优势！</div>
      <div class="small-text-order">1. 独立的易记域名给代理推广</div>
      <div class="small-text-order">2. 佣金每月统一结算，独立代理中心查看报表与领取</div>
      <div class="small-text-order">3. 团队专员全天候优先处理代理线下会员任何问题</div>
      <div class="small-text-order">4. 游戏种类选择丰富多元，您的会员可根据自己喜欢的平台进行游戏</div>
      <div class="small-text-order">5. 针对不同游戏平台，打造最佳返水级距</div>
      <!-- eslint-disable-next-line -->
      <br />
      <div
        class="small-text"
      >FastPack娱乐与 BBIN、AG、MG等平台进行技术深度合作，共同打造高品质游戏平台，目前拥有澳门及菲律宾合法注册之博彩公司。我们采用最为多元、先进、 公正的系统，在众多博彩网站中，我们自豪能为会员提供最优惠的回馈、为代理商创造强劲的营利优势！FastPack娱乐秉持商业联营、资源整合、利益共享的理念，与合作伙伴携手打造利多的荣景。现在加入，不须负担任何费用，就可以开拓无上限的营收。FastPack娱乐绝对是您创造营利的首选！</div>
      <div class="small-title">代理注册规约</div>
      <div
        class="small-text"
      >为防堵有心人士不当滥用FastPack娱乐所提供的代理优惠制度，我们将严格审核每位代理申请注册时所提供的个人资料（包括：姓名、IP、邮箱、电话等）。若经审核发现代理有任何不良营利企图，或与其他代理商、会员进行合谋套利等行为，FastPack娱乐有权立即关闭该合作代理商之帐户、扣除帐户中的本金，并收回该代理商的所有佣金与优惠。</div>
    </div>
    <div v-if="currentPage === 'agentRegister'" class="flex flex-center">
      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="submit-box flex flex-between">
          <div>
            <ValidationProvider v-slot="{ errors }" rules="required|account">
              <div class="submit-item">
                <div class="submit-label">
                  <span class="submit-tag">*</span>
                  代理帐号：
                </div>
                <div class="submit-input">
                  <input
                    v-model="applyForm.AgentAccount"
                    class="modal-input"
                    :class="{error: errors[0]}"
                    maxlength="20"
                    type="text"
                  />
                  <div class="error-msg">
                    <span v-if="errors[0]">{{ errors[0] }}</span>
                  </div>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="password" rules="required|password">
              <div class="submit-item">
                <div class="submit-label">
                  <span class="submit-tag">*</span>
                  代理密码：
                </div>
                <div class="submit-input">
                  <input
                    v-model="applyForm.Password"
                    class="modal-input"
                    :class="{error: errors[0]}"
                    maxlength="20"
                    type="password"
                  />
                  <div class="error-msg">
                    <span v-if="errors[0]">{{ errors[0] }}</span>
                  </div>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required|pwdConfirm:@password">
              <div class="submit-item">
                <div class="submit-label">
                  <span class="submit-tag">*</span>
                  确认密码：
                </div>
                <div class="submit-input">
                  <input
                    v-model="applyForm.PasswordConfirm"
                    class="modal-input"
                    :class="{error: errors[0]}"
                    maxlength="20"
                    type="password"
                  />
                  <div class="error-msg">
                    <span v-if="errors[0]">{{ errors[0] }}</span>
                  </div>
                </div>
              </div>
            </ValidationProvider>
          </div>
          <div>
            <ValidationProvider v-slot="{ errors }" rules="required|name">
              <div class="submit-item">
                <div class="submit-label">
                  <span class="submit-tag">*</span>
                  真实姓名：
                </div>
                <div class="submit-input">
                  <input
                    v-model="applyForm.Name"
                    class="modal-input"
                    :class="{error: errors[0]}"
                    maxlength="20"
                    type="text"
                  />
                  <div class="error-msg">
                    <span v-if="errors[0]">{{ errors[0] }}</span>
                  </div>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required|phone">
              <div class="submit-item">
                <div class="submit-label">
                  <span class="submit-tag">*</span>
                  手机号：
                </div>
                <div class="submit-input">
                  <input
                    v-model="applyForm.CellPhone"
                    class="modal-input"
                    :class="{error: errors[0]}"
                    type="text"
                  />
                  <div class="error-msg">
                    <span v-if="errors[0]">{{ errors[0] }}</span>
                  </div>
                </div>
              </div>
            </ValidationProvider>

            <ValidationProvider v-slot="{ errors }" rules="required|email">
              <div class="submit-item">
                <div class="submit-label">
                  <span class="submit-tag">*</span>
                  邮箱：
                </div>
                <div class="submit-input">
                  <input
                    v-model="applyForm.EMail"
                    class="modal-input"
                    :class="{error: errors[0]}"
                    type="text"
                  />
                  <div class="error-msg">
                    <span v-if="errors[0]">{{ errors[0] }}</span>
                  </div>
                </div>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="submit-btn txt-c pointer" @click="handleSubmit(applyAgent)">提交信息</div>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { addAgentApply } from '../../../api/agent'

export default {
  name: 'AgentHelp',
  data() {
    return {
      currentPage: 'agentJoin',
      tabList: [
        {
          tabName: 'agentJoin',
          tabCName: '代理加盟'
        },
        {
          tabName: 'agentRegister',
          tabCName: '代理注册'
        }
      ],
      applyForm: {
        AgentAccount: '',
        Password: '',
        PasswordConfirm: '',
        Name: '',
        CellPhone: '',
        EMail: ''
      }
    }
  },
  methods: {
    selectTab(item) {
      this.currentPage = item.tabName
      this.resetForm()
    },
    resetForm() {
      this.applyForm = {
        AgentAccount: '',
        Password: '',
        PasswordConfirm: '',
        Name: '',
        CellPhone: '',
        EMail: ''
      }
    },
    applyAgent() {
      addAgentApply(this.applyForm).then(res => {
        const Data = res
        if (res.Code === 0) {
          this.hintModalHandler('申请提交成功，进入审核')
          this.resetForm()
        } else {
          this.hintModalHandler(this.$t(`responseMsg.response_${Data.Code}`))
        }
      })
    },
    hintModalHandler(text) {
      this.$modalHint.show({
        text,
        isDoubleModal: false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.select-box {
  background-color: #fff;
  border-radius: 45px;
  height: 45px;
  width: 240px;
  position: relative;
  margin: 0 auto 30px;
  .select-item {
    width: 120px;
    height: 45px;
    line-height: 45px;
    color: #8a8989;
    border-radius: 2px;
    font-size: 14px;
    z-index: 2;
    transition: 0.3s all ease-in-out;
    &:hover {
      color: #2472ff;
    }
    &.active {
      color: #fff;
    }
  }
  .selected-bar {
    background-color: #4765f3;
    width: 120px;
    height: 45px;
    border-radius: 45px;
    position: absolute;
    z-index: 0;
    transition: 0.3s all ease-in-out;
    &.left {
      left: 0;
    }
    &.right {
      left: 120px;
    }
  }
}
.submit-box {
  height: auto;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 550px;
  span {
    margin-bottom: 20px;
  }
  .submit-item {
    position: relative;
    color: rgba(27, 27, 27, 0.6);
    height: 100px;
    .submit-label {
      position: relative;
      width: 110px;
      height: 25px;
      font-weight: 800;
      color: #8a8989;
      text-align: left;
      .submit-tag {
        color: #45dca7;
      }
    }
    .submit-input {
      width: 250px;
      input {
        background: #fff !important;
        border: 1px solid #cdcdd5 !important;
        border-radius: 2px !important;
        transition: all 0.3s ease-in-out;
        &:focus {
          border: 1px solid #4b62d6 !important;
        }
      }
      .error-msg {
        margin-top: 5px;
        color: #45dca7;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        text-align: left;
        position: relative;
        padding-left: 30px;
        white-space: nowrap;
        span::before {
          left: 0px;
          content: ' ';
          width: 20px;
          height: 20px;
          background: url('../../../assets/images/register/notice_icon.png');
          position: absolute;
        }
      }
    }
  }
}
.submit-btn {
  background-color: #4765f3;
  width: 120px;
  height: 45px;
  border-radius: 45px;
  line-height: 45px;
  color: #ffffff;
  margin: 0 auto;
  font-size: 14px;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #2d46b5;
  }
}

.small-text-order {
  color: #8a8989;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
}
</style>
