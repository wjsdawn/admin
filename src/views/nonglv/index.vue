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
          {{ scope.row.property.toString() }}
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
          <el-button type="primary" @click="handleAdd">添加项目</el-button>
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
      title="编辑项目"
      :visible.sync="dialogEdit"
      :before-close="handleClose"
    >
      <el-form :model="editForm" label-width="200px">
        <el-form-item label="ID">
          <span>{{ editForm.id }}</span>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="editForm.area" :placeholder="editForm.area">
            <el-option label="中心城区" value="中心城区" />
            <el-option label="科技城新区" value="科技城新区" />
            <el-option label="农旅融合区" value="农旅融合区" />
            <el-option label="临港经济发展区东区" value="临港经济发展区东区" />
            <el-option label="临港经济发展区南区" value="临港经济发展区南区" />
            <el-option label="临港经济发展区西区" value="临港经济发展区西区" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型选择">
          <el-select v-model="editForm.property" multiple placeholder="请选择产品类型">
            <el-option
              v-for="item in this.property"
              :key="item.property"
              :label="item.property"
              :value="item.property"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="editForm.principal" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="editForm.project" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="editForm.status" :fill="editForm.status=='审核通过'?'#409EFF':(editForm.status=='审核不通过'?'#F56C6C':'#909399')">
            <el-radio-button label="审核通过"></el-radio-button>
            <el-radio-button label="审核不通过"></el-radio-button>
            <el-radio-button label="待审核"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditClose">取 消</el-button>
        <el-button type="primary" @click="dialogEditConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加项目"
      :visible.sync="dialogAdd"
      :before-close="handleClose"
    >
      <el-form :model="addForm" label-width="200px">
        <el-form-item label="区域">
          <el-select v-model="addForm.area" :placeholder="addForm.area">
            <el-option label="中心城区" value="中心城区" />
            <el-option label="科技城新区" value="科技城新区" />
            <el-option label="农旅融合区" value="农旅融合区" />
            <el-option label="临港经济发展区东区" value="临港经济发展区东区" />
            <el-option label="临港经济发展区南区" value="临港经济发展区南区" />
            <el-option label="临港经济发展区西区" value="临港经济发展区西区" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型选择">
          <el-select v-model="addForm.property" multiple placeholder="请选择产品类型">
            <el-option
              v-for="item in this.property"
              :key="item.property"
              :label="item.property"
              :value="item.property"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="addForm.principal" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="addForm.project" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="addForm.status" :fill="addForm.status=='审核通过'?'#409EFF':(addForm.status=='审核不通过'?'#F56C6C':'#909399')">
            <el-radio-button label="审核通过"></el-radio-button>
            <el-radio-button label="审核不通过"></el-radio-button>
            <el-radio-button label="待审核"></el-radio-button>
          </el-radio-group>
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
import { getNongList } from '@/api/nong-area'
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
      property: null,
      editForm: {},
      addForm: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getNongList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
      getProperty().then(response => {
        this.property = response.data.items
      })
    },
    handleDelete(index, row) {
      console.log(index)
    },
    handleClose(done) {
      this.$confirm('确认关闭')
        .then(_ => {
          this.editForm = {}
          this.addForm = {}
          done()
        }).catch(_ => {})
    },
    // region editForm
    handleEdit(index, row) {
      this.editForm = JSON.parse(JSON.stringify(this.list[index]))
      this.dialogEdit = true
    },
    dialogEditClose() {
      this.dialogEdit = false
      this.editForm = {}
    },
    dialogEditConfirm() {
      this.dialogEdit = false
      // eslint-disable-next-line no-undef
      this.editForm.dateTime = new Date().toLocaleString('cn', { hour12: false })
      console.log('editForm:')
      console.log(this.editForm)
      console.log('--------------------')
    },
    // endregion
    // region addForm
    handleAdd(index, row) {
      this.dialogAdd = true
    },
    dialogAddClose() {
      this.dialogAdd = false
      this.addForm = {}
    },
    dialogAddConfirm() {
      this.dialogAdd = false
      // eslint-disable-next-line no-undef
      this.addForm.dateTime = new Date().toLocaleString('cn', { hour12: false })
      console.log('addForm:')
      console.log(this.addForm)
      console.log('--------------------')
    }
    // endregion
  }
}
</script>
