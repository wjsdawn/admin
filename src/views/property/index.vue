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
          <el-button type="primary" @click="handleAdd()">添加类别</el-button>
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
    <el-dialog
      title="编辑产业类别"
      :visible.sync="dialogEdit"
      :before-close="handleClose">
      <el-form :model="editProperty">
        <el-form-item label="产业类别">
          <el-input v-model="editProperty.property"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditClose">取 消</el-button>
        <el-button type="primary" @click="dialogEditConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加产业类别"
      :visible.sync="dialogAdd"
      :before-close="handleClose">
      <el-form :model="addProperty">
        <el-form-item label="产业类别">
          <el-input v-model="addProperty.property"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddClose">取 消</el-button>
        <el-button type="primary" @click="dialogAddConfirm">确 定</el-button>
      </span>
    </el-dialog>
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
      list: [],
      listLoading: true,
      dialogEdit: false,
      dialogAdd: false,
      editProperty: {},
      addProperty: {}
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
    handleClose(done) {
      this.$confirm('确认关闭')
        .then(_ => {
          this.editForm = {}
          this.addForm = {}
          done()
        }).catch(_ => {})
    },
    handleDelete(index, row) {
      console.log(index)
    },
    handleEdit(index, row) {
      this.editProperty = JSON.parse(JSON.stringify(this.list[index]))
      this.dialogEdit = true
    },
    dialogEditClose(index, row) {
      this.dialogEdit = false
      this.editProperty = {}
    },
    dialogEditConfirm(index, row) {
      this.dialogEdit = false
    },
    handleAdd(index, row) {
      this.dialogAdd = true
    },
    dialogAddClose(index, row) {
      this.dialogAdd = false
      this.AddProperty = {}
    },
    dialogAddConfirm(index, row) {
      this.dialogAdd = false
    }
  }
}
</script>
