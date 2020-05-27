<template>
  <div class="pagination">
    <el-form class="flex">
      <el-form-item class="prev btn">
        <div v-if="page-1 !== 0">
          <span @click="page -= 1">上一页</span>
        </div>
      </el-form-item>
      <el-form-item class="list">
        <el-select v-model.number="page" popper-class="select-center">
          <el-option
            v-for="(item,index) in pagerList"
            :key="index"
            :value="item"
            :label="formatChineseNumeral(item)"
          />
        </el-select>
      </el-form-item>

      <el-form-item class="next btn">
        <div v-if="page+1 <= allPage">
          <span @click="page += 1">下一页</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    pageSize: { type: Number, default: 10 },
    pagerCount: { type: Number, default: 5 },
    currentPage: { type: Number, default: 1 },
    total: { type: Number, default: 0 }
  },
  data() {
    return {
      page: this.currentPage
    }
  },
  computed: {
    // 总页数 有余+1
    allPage() {
      if (this.total % this.pageSize) {
        return parseInt(this.total / this.pageSize) + 1
      }
      return parseInt(this.total / this.pageSize)
    },

    pagerList() {
      const list = []
      const offset_num = parseInt((this.pagerCount - 2) / 2) // 偏移兩測
      let i = offset_num * -1 // 開始位置離現在页數的偏移
      if (!(this.pagerCount - 2) % 2) {
        // 如果是 偶數開始值偏移+1
        i += 1
      }
      // 產生页數 list
      while (list.length < this.pagerCount - 2) {
        list.push(this.currentPage + i)
        i++
      }
      // 去除小於等於1 大於等於最大页
      const list_filter = list.filter(item => item > 1 && item < this.allPage)
      // 加入 more ...
      const next_more = this.currentPage + (this.pagerCount - 2)
      const prev_more = this.currentPage - (this.pagerCount - 2)
      if (prev_more > 1) {
        // more 大於一才加入
        list_filter.splice(0, 0, '+' + prev_more)
        // 更多 跳到當前页數 + pagerCount-2(去掉第一页及最後一页)
      }
      if (next_more < this.allPage) {
        // more 小於 最大页數 才加入
        list_filter.push('+' + next_more)
      }
      // 檢查 list 連續性，不連續 但無more判斷
      if (list_filter[0]) {
        // 如果陣列有值
        if (
          // 第一個值不是 2 也不是 more
          list_filter[0] !== 2 &&
          list_filter[0].toString().indexOf('+') === -1
        ) {
          list_filter.splice(0, 0, '+2') // 輸出 more 為 2
        }
        if (
          // 最後一個值 不是最大值-1 也沒也 more
          list_filter[list_filter.length - 1] !== this.allPage - 1 &&
          list_filter[list_filter.length - 1].toString().indexOf('+') === -1
        ) {
          list_filter.push('+' + (this.allPage - 1))
        }
      }

      // 加入最後一页 及第一页
      if (this.allPage > 1) {
        list_filter.push(this.allPage)
      }
      list_filter.splice(0, 0, 1)
      return list_filter
    }
  },
  watch: {
    currentPage() {
      this.page = this.currentPage
    },
    page() {
      this.$emit('update:current-page', this.page)
      this.$emit('current-change')
    }
  },
  methods: {
    formatChineseNumeral(value) {
      const value_str = value.toString()
      if (!/^[0-9]+$/.test(value)) {
        return '...'
      }
      let unit = '千百十亿千百十万千百十元'
      let str = ''
      unit = unit.substr(unit.length - value_str.length)
      for (let i = 0; i < value_str.length; i++) {
        str +=
          '零一二三四五六七八九'.charAt(value_str.charAt(i)) + unit.charAt(i)
      }
      if (str.substring(0, 2) === '一十') {
        str = str.substring(1)
      }
      return (
        '第' +
        str
          .replace(/零(千|百|十|角)/g, '零')
          .replace(/(零)+/g, '零')
          .replace(/零(万|亿|元)/g, '$1')
          .replace(/(亿)万|壹(十)/g, '$1$2')
          .replace(/^元零?|零分/g, '')
          .replace(/元$/g, '') +
        '页'
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  color: white;
  text-decoration: underline;
  margin-top: 30px;
  > .flex {
    justify-content: center;
    > .btn {
      text-align: center;
      width: 100px;
      span {
        cursor: pointer;
        &:hover {
          filter: brightness(80%);
        }
      }
    }
    /deep/.list {
      width: 150px;
      input {
      overflow: hidden;
        text-align: center;
      }
    }
  }
}
</style>
