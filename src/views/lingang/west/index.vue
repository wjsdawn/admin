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
      <el-table-column label="区域" align="center">
        <template slot-scope="scope">
          {{ scope.row.area }}
        </template>
      </el-table-column>
      <el-table-column label="产业类别" width="250" align="center" >
        <template slot-scope="scope">
          {{ scope.row.property }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="500" align="center">
        <template slot-scope="scope">
          {{scope.row.project}}
        </template>
      </el-table-column>
      <el-table-column label="负责人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.principal }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center">
        <template slot="header" slot-scope="scope">
          <el-button type="primary">添加项目</el-button>
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
import { getLingangWestList } from '@/api/lingang-west'

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
      getLingangWestList().then(response => {
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
