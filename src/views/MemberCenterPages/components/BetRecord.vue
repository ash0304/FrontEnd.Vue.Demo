<template>
  <div class="BetRecord member-container">
    <div class="member-title">
      {{ $t('record.betTitle') }}
      <span>{{ $t('record.hint1') }}</span>
    </div>
    <div class="member-body">
      <el-form :label-position="'right'" label-width="85px">
        <el-form-item :label="$t('record.gamelist')">
          <el-select
            v-model="listQuery.GamePlatformID"
            filterable
            placeholder
            style="width: 155px;"
          >
            <el-option
              v-for="item in GamePlatformList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('record.status')">
          <div class="flex select-list">
            <span
              v-for="item in StatusList"
              :key="item.value"
              class="pointer"
              :class="{active:listQuery.Status === item.value}"
              @click="listQuery.Status = item.value;handleFilter()"
            >{{ item.label }}</span>
          </div>
        </el-form-item>

        <el-form-item :label="$t('record.sortTime')">
          <div class="flex select-list">
            <span class="pointer" @click="choseDateRange(0)">{{ $t('record.today') }}</span>
            <span class="pointer" @click="choseDateRange(6)">{{ $t('record.week') }}</span>
            <span class="pointer" @click="choseDateRange(29)">{{ $t('record.month') }}</span>
          </div>
        </el-form-item>
        <el-form-item :label="$t('record.betTime')">
          <el-date-picker
            v-model="listQuery.dateRange"
            class="filter-item"
            type="datetimerange"
            :placeholder="$t('record.startTime')"
            :editable="false"
            :format="'yyyy/MM/dd HH:mm:ss'"
            :value-format="'yyyy/MM/dd HH:mm:ss'"
            style="width: 380px;"
            @change="sortDay = $t('record.customTime')"
          />
          <div class="member-center-btn pointer" @click="handleFilter">{{ $t('record.search') }}</div>
        </el-form-item>
      </el-form>
      <div v-if="list.length !== 0" class="table-content">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          fit
          :row-class-name="tableRowClassName"
          style="width: 100%;"
        >
          <el-table-column :label="$t('record.betOrder')" align="center" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.OrderID }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('record.gamelist')" align="center">
            <template slot-scope="scope">
              <span>{{ transferGamePlatformID(scope.row.GamePlatformID) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('record.betTime')" align="center" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.BetTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('record.game')" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.GameName }}</span>
            </template>
          </el-table-column>

          <el-table-column type="expand" align="center" width="40">
            <template slot-scope="scope">
              <el-form class="expand-form">
                <el-form-item :label="$t('record.betAmount')">
                  <div
                    :class="{'negative-num': scope.row.BetAmount<0}"
                  >{{ scope.row.BetAmount | thousandFilter }}</div>
                </el-form-item>
                <el-form-item :label="$t('record.payout')">
                  <div
                    :class="{'negative-num': scope.row.PayoutAmount<0}"
                  >{{ scope.row.PayoutAmount | thousandFilter }}</div>
                </el-form-item>
                <el-form-item :label="$t('record.validBet')">
                  <div
                    :class="{'negative-num': scope.row.ValidBetAmount<0}"
                  >{{ scope.row.ValidBetAmount | thousandFilter }}</div>
                </el-form-item>
                <el-form-item :label="$t('record.status')">
                  <div>{{ StatusList[scope.row.Status].label }}</div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="list.length !== 0" class="sum-content">
        <div>{{ $t('record.total') }}</div>
        <hr />
        <div class="flex sum-data">
          <div>
            <span>{{ $t('record.betAmount') }}</span>
            <span>{{ listCalc.betsum | thousandFilter }}</span>
          </div>
          <div>
            <span>{{ $t('record.payout') }}</span>
            <span>{{ listCalc.paysum | thousandFilter }}</span>
          </div>
          <div>
            <span>{{ $t('record.validBet') }}</span>
            <span>{{ listCalc.validsum | thousandFilter }}</span>
          </div>
        </div>
      </div>
      <div v-else class="no-result">{{ $t('record.noResult2') }}</div>
      <el-pagination
        v-if="list.length !== 0"
        :page-size.sync="listQuery.PageSize"
        :pager-count="5"
        :current-page.sync="listQuery.PageIndex"
        layout="pager"
        :total="total"
        @current-change="getBetRecords"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getNDays } from '../../../utils/getDays'
import { parseTime } from '../../../utils/parseTime'
import { thousandFilter } from '../../../utils/thousandFilter'

export default {
  name: 'BetRecord',
  filters: {
    parseTime,
    thousandFilter
  },
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      list: [],
      total: 0,
      listLength: 0,
      sortDay: '0',
      listQuery: {
        dateRange: [getNDays(0, false, false), getNDays(0, true, false)],
        GamePlatformID: null,
        Status: -1,
        PageIndex: 1,
        PageSize: 10
      },
      StatusList: [
        {
          value: -1,
          label: this.$t('record.typeList0')
        },
        {
          value: 1,
          label: this.$t('record.statusList1')
        },
        {
          value: 2,
          label: this.$t('record.statusList2')
        },
        {
          value: 3,
          label: this.$t('record.statusList3')
        }
      ],
      GamePlatformList: []
    }
  },
  computed: {
    listCalc() {
      let betsum = 0
      let paysum = 0
      let validsum = 0
      this.list.forEach(item => {
        betsum += item.BetAmount
        paysum += item.PayoutAmount
        validsum += item.ValidBetAmount
      })
      return { betsum, paysum, validsum }
    }
  },
  created() {
    this.getGamePlatform()
  },
  methods: {
    transferGamePlatformID(platformID) {
      const tempArr = this.GamePlatformList.map(item => {
        return item.value
      }).indexOf(platformID)
      return this.GamePlatformList[tempArr].label
    },
    handleFilter() {
      this.listQuery.PageIndex = 1
      this.hintModalHandler(this.$t(`Demo用 无开放此功能`))
      return
    },
    choseDateRange(index) {
      this.listQuery.PageIndex = 1
      this.$set(this.listQuery.dateRange, 0, getNDays(index, false, false))
      this.$set(this.listQuery.dateRange, 1, getNDays(0, true, false))
      this.getBetRecords()
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'even-line'
      } else {
        return 'odd-line'
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
.BetRecord {
  padding: 60px 60px 0px 60px;

  .member-body {
    padding-top: 10px;
    .no-result {
      background: url('../../../assets/images/memberCenter/ill_norecord_day.png')
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
    /deep/.el-form-item {
      margin-bottom: 10px;
      .el-input__inner {
        color: #7d818c !important;
        border-radius: 8px !important;
      }
      .select-list {
        > span {
          color: #7c8ea8;
          margin-right: 20px;
          &.active,
          &:hover {
            color: #4266ee;
          }
        }
      }

      .member-center-btn {
        width: 140px !important;
        display: inline-block;
        margin-left: 30px;
      }
    }

    .table-content {
      padding-top: 30px;
      .check-btn {
        cursor: pointer;
      }

      .negative-num {
        color: red;
        font-weight: bold;
      }
      /deep/.el-table__expanded-cell {
        padding: 10px 0px 0px 0px;

        .expand-form {
          width: 50%;
          float: right;
          .el-form-item {
            text-align: right;
            padding-right: 50px;
            margin-bottom: 0px;
          }
        }
      }
    }
    .sum-content {
      text-align: left;
      color: #39404d;
      margin-top: 60px;
      font-size: 14px;
      hr {
        border-color: #39404d;
        opacity: 0.1;
      }
      > div {
        padding: 0 70px 0 70px;
        span:first-child {
          padding-right: 20px;
        }
      }
      .sum-data {
        justify-content: space-between;
      }
    }
  }
}
</style>
