<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="产业类别" align="center">
        <template slot-scope="scope">
          {{ scope.row.property }}
        </template>
      </el-table-column>
      <el-table-column width="200" align="center">
        <template slot="header" slot-scope="scope">
          <el-button type="primary">添加类别</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getProperty } from '@/api/property'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        审核通过: 'success',
        待审核: 'gray',
        审核不通过: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getProperty().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleEdit(index, row) {
      console.log(index)
    },
    handleDelete(index, row) {
      console.log(index)
    }
  }
}
</script>
