<template>
  <div class="TradeRecord member-container">
    <div class="member-title">
      <div class="title-text">{{ $t('record.tradeTitle') }}</div>
    </div>
    <div class="member-body">
      <el-form :label-position="'right'" label-width="85px">
        <el-form-item :label="$t('record.type')" class="date-group">
          <div class="flex select-list">
            <span
              v-for="item in TransactionTypeList"
              :key="item.value"
              class="pointer"
              :class="{active:listQuery.TransactionType === item.value}"
              :value="item.value"
              @click="listQuery.TransactionType = item.value;handleFilter()"
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
        <el-form-item :label="$t('record.time')">
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
          <div class="member-center-btn" @click="handleFilter">{{ $t('record.search') }}</div>
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
          :header-cell-style="{background:'white'}"
        >
          <el-table-column :label="$t('record.orderID')" align="center" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.OrderID }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('record.type')" align="center">
            <template slot-scope="scope">
              <span>{{ TransactionTypeList[scope.row.TransactionType].label }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('record.createTime')" align="center" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.CreateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('record.amount')" align="right">
            <template slot-scope="scope">
              <span
                :class="{'negative-num': scope.row.Amount<0}"
              >{{ scope.row.Amount | thousandFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column type="expand" align="center" width="40">
            <template slot-scope="scope">
              <el-form class="expand-form">
                <el-form-item :label="$t('record.sort')">
                  <div
                    v-if="scope.row.TransactionType !== 3"
                  >{{ ProjectIDList[scope.row.TransactionType].projectList[scope.row.ProjectID - 1].label }}</div>
                  <div
                    v-if="scope.row.TransactionType === 3"
                  >{{ transferProjectID(scope.row.ProjectID) }}</div>
                </el-form-item>
                <el-form-item :label="$t('record.reviewTime')">
                  <div>
                    <div
                      v-if="scope.row.TransactionType === 1 || scope.row.TransactionType === 2 || (scope.row.TransactionType === 5 && scope.row.ProjectID === 3)"
                    >{{ scope.row.ReviewTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
                    <div
                      v-if="scope.row.TransactionType === 3 || scope.row.TransactionType === 6 || scope.row.TransactionType === 4 || (scope.row.TransactionType === 5 && (scope.row.ProjectID === 1 || scope.row.ProjectID === 2) )"
                    >--</div>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('record.balance')">
                  <div>{{ scope.row.Balance | thousandFilter }}</div>
                </el-form-item>
                <el-form-item :label="$t('record.ps')">
                  <div>{{ scope.row.Note }}</div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="no-result">
        {{ $t('record.noResult1') }}
        <div
          class="member-center-btn"
          @click="$router.push({name:'Deposit'})"
        >{{ $t('record.goDeposit') }}</div>
      </div>
      <el-pagination
        v-if="list.length !== 0"
        :page-size.sync="listQuery.PageSize"
        :pager-count="5"
        :current-page.sync="listQuery.PageIndex"
        layout="pager"
        :total="total"
        @current-change="getTransactionRecords"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getNDays } from '../../../utils/getDays'
import { parseTime } from '../../../utils/parseTime'
import { thousandFilter } from '../../../utils/thousandFilter'

export default {
  name: 'TradeRecord',
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
        TransactionType: -1,
        PageIndex: 1,
        PageSize: 10
      }
    }
  },
  computed: {
    TransactionTypeList() {
      return [
        {
          value: -1,
          label: this.$t('record.typeList0')
        },
        {
          value: 1,
          label: this.$t('record.typeList1')
        },
        {
          value: 2,
          label: this.$t('record.typeList2')
        },
        {
          value: 3,
          label: this.$t('record.typeList3')
        },
        {
          value: 4,
          label: this.$t('record.typeList4')
        },
        {
          value: 5,
          label: this.$t('record.typeList5')
        },
        {
          value: 6,
          label: this.$t('record.typeList6')
        }
      ]
    },
    ProjectIDList() {
      return [
        {
          type: 0,
          projectList: [
            {
              value: 0,
              label: this.$t('record.projectList0')
            }
          ]
        },
        {
          type: 1,
          projectList: [
            {
              value: 1,
              label: this.$t('record.projectList1')
            },
            {
              value: 2,
              label: this.$t('record.projectList2')
            },
            {
              value: 3,
              label: this.$t('record.projectList3')
            }
          ]
        },
        {
          type: 2,
          projectList: [
            {
              value: 1,
              label: this.$t('record.projectList4')
            },
            {
              value: 2,
              label: this.$t('record.projectList5')
            }
          ]
        },
        {
          type: 3,
          // 由API覆蓋
          projectList: []
        },
        {
          type: 4,
          projectList: [
            {
              value: 1,
              label: this.$t('record.projectList6')
            }
          ]
        },
        {
          type: 5,
          projectList: [
            {
              value: 1,
              label: this.$t('record.projectList7')
            },
            {
              value: 2,
              label: this.$t('record.projectList8')
            },
            {
              value: 3,
              label: this.$t('record.projectList9')
            }
          ]
        },
        {
          type: 6,
          projectList: [
            {
              value: 1,
              label: this.$t('record.projectList10')
            },
            {
              value: 2,
              label: this.$t('record.projectList11')
            }
          ]
        }
      ]
    }
  },
  methods: {
    transferProjectID(projectID) {
      const tempArr = this.ProjectIDList[3].projectList
        .map(item => {
          return item.ID
        })
        .indexOf(projectID)
      return this.ProjectIDList[3].projectList[tempArr].PlatformName
    },
    choseDateRange(index) {
      this.listQuery.PageIndex = 1
      this.$set(this.listQuery.dateRange, 0, getNDays(index, false, false))
      this.$set(this.listQuery.dateRange, 1, getNDays(0, true, false))
    },
    handleFilter() {
      this.listQuery.PageIndex = 1
      this.hintModalHandler(this.$t(`Demo用 无开放此功能`))
      return
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
.TradeRecord {
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
    .el-form-item {
      margin-bottom: 10px;
      /deep/.el-input__inner {
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
  }
}
</style>
