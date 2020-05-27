<template>
  <div class="Message member-container">
    <div class="member-title">
      <div class="title-text">{{ $t('msg.title') }}</div>

      <div
        v-if="list.length !== 0"
        class="clear-all-box"
        :class="{'show': listLength > 0}"
        @click="handleBatchDelete"
      >{{ $t('msg.allClear') }}</div>
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
          <!-- <el-table-column :label="'序'" align="center" width="40">
              <template slot-scope="scope">
                <span>{{ scope.row.Order }}</span>
              </template>
          </el-table-column>-->
          <el-table-column :label="$t('msg.msgTitle')" align="center">
            <template slot-scope="scope">
              <div
                class="news-title"
                style="cursor:pointer"
                @click="handleDetail(scope.row)"
              >{{ scope.row.Title }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('announce.sendTime')" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.SentDate | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('msg.status')" align="center" width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.Status === 0" style="color: red;">{{ $t('msg.unread') }}</span>
              <span v-if="scope.row.Status === 1" style="color: green;">{{ $t('msg.readed') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="60">
            <template slot-scope="scope">
              <div class="del-btn" style="cursor:pointer" @click="handleDelete(scope.row)"></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="no-result">{{ $t('announce.noResult') }}</div>
      <div class="pager-content">
        <el-pagination
          v-if="list.length !== 0"
          :page-size.sync="listQuery.PageSize"
          :pager-count="5"
          :current-page.sync="listQuery.PageIndex"
          layout="pager"
          :total="total"
          @current-change="siteNotifyList"
        ></el-pagination>
      </div>
    </div>

    <!-- Double Check Modal -->
  </div>
</template>
<script>
import { parseTime } from '../../../utils/parseTime'

export default {
  name: 'Message',
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
      },
      temp: {
        ID: 0
      }
    }
  },
  created() {
    this.siteNotifyList()
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
.Message {
  min-height: 580px;
  .clear-all-box {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 20px;
    color: #4266ee;
    border: 1px solid #4266ee;
    font-size: 14px;
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: normal;
    cursor: pointer;
    &:hover {
      filter: brightness(120%);
    }
  }
  .news-title {
    text-align: left;
    color: #39404d;
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .no-result {
    background: url('../../../assets/images/memberCenter/no_message.png') center
      center no-repeat;
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
  .del-btn {
    width: 40px;
    height: 40px;
    opacity: 1;
    background: url('../../../assets/images/memberCenter/delete.png') center
      center no-repeat;
    &:hover {
      opacity: 0.8;
    }
  }
  .member-body {
    padding-top: 20px;
  }
  .doubleCheck-modal-bg {
    .doubleCheck-modal {
      width: 440px;
      height: 300px;
      position: fixed;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      margin: auto;
      background-color: #242a66;
      z-index: 2001;
      .doubleCheck-title {
        font-size: 24px;
        color: white;
        margin-top: 40px;
        margin-bottom: 55px;
        font-weight: bold;
      }
      .doubleCheck-body {
        color: white;
        width: 300px;
        height: 100px;
        font-size: 20px;
        letter-spacing: 2px;
        line-height: 25px;
        margin: 0 auto;
      }
    }
  }
}
</style>
