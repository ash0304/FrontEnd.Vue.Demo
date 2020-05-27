<template>
  <div class="Announce member-container">
    <div class="member-title">
      <div class="title-text">{{ $t('announce.title') }}</div>
    </div>
    <div class="member-body">
      <div v-if="list.length !== 0" class="table-content">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          fit
          :row-class-name="tableRowClassName"
          style="width: 100%;"
          :header-cell-style="{background:'#fff'}"
        >
          <el-table-column :label="$t('announce.msgTitle')" align="center">
            <template slot-scope="scope">
              <div class="news-title">{{ scope.row.Title }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('announce.sendTime')" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.ModifyDate | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>
          <el-table-column type="expand" align="center" width="40">
            <template slot-scope="scope">
              <div class>{{ scope.row.Content }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="no-result">{{ $t('announce.noResult') }}</div>
      <el-pagination
        v-if="list.length !== 0"
        :page-size.sync="listQuery.PageSize"
        :pager-count="5"
        :current-page.sync="listQuery.PageIndex"
        layout="pager"
        :total="total"
        @current-change="messageList"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { parseTime } from '../../../utils/parseTime'

export default {
  name: 'Announce',
  filters: {
    parseTime
  },
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      list: [],
      total: 0,
      listLength: 0,
      listQuery: {
        PageIndex: 1,
        PageSize: 10
      }
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'even-line'
      } else {
        return 'odd-line'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Announce {
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
    .news-title {
      text-align: left;
      padding-left: 70px;
      padding-right: 20px;
    }
    /deep/.el-table__expanded-cell {
      padding-left: 80px;
      padding-right: 80px;
    }
  }
}
</style>
