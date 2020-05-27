<template>
  <div class="my-activity member-container">
    <div class="member-title">{{ $t('memberCenter.myActivity') }}</div>
    <div class="member-body">
      <template v-if="activityList.length">
        <div
          v-for="(item, index) in activityList"
          :key="index"
          class="activity-item"
        >{{ item.ActivityName }}</div>
      </template>
      <div v-else class="no-result">
        {{ $t('memberCenter.activeNoResult') }}
        <div class="member-center-btn" @click="toPromo">{{ $t('memberCenter.toPromo') }}</div>
      </div>
      <div class="more-activity margin-center">
        <span class="more pointer" @click="toPromo">{{ $t('memberCenter.more') }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyActivity',
  data() {
    return {
      activityList: []
    }
  },
  methods: {
    toPromo() {
      this.$router
        .push({
          name: 'Promo'
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.my-activity {
  min-height: 580px;
  .member-body {
    padding-top: 20px;
    .no-result {
      background: url('../../../assets/images/memberCenter/no_message.png')
        center center no-repeat;
      background-size: 270px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 320px;
      padding-top: 190px;
      > div {
        margin-top: 10px;
      }
    }
    .activity-item {
      padding-left: 40px;
      padding-right: 40px;
      height: 60px;
      border-bottom: 1px solid #ccc;
      color: #7c8ea8;
      font-size: 16px;
      line-height: 60px;

      &:last-child {
        border-bottom: none;
      }
    }
    .more-activity {
      padding-top: 10px;
      .more {
        float: right;
        color: #5b6ef2;
        font-weight: bold;
        font-size: 14px;
        padding-top: 10px;
        &:hover {
          filter: brightness(120%);
        }
      }
    }
  }
}
</style>
