<template>
  <div class="wrapper">
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="item_logo"
      label="主图"
      width="150">
      <template slot-scope="scope">
        <img width="100px" :src="scope.row.item_logo" />
      </template>
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      width="120">
      <template slot-scope="types">
        <span>{{types.row.type | getTextByStatus}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="120">
    </el-table-column>
    <el-table-column
      prop="rich_text"
      label="描述"
      width="120">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间"
      width="200">
      <template slot-scope="time">
        <span>{{time.row.create_time | transformTimeStyle}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="modify_time"
      label="修改时间"
      width="200">
      <template slot-scope="time">
        <span>{{time.row.modify_time | transformTimeStyle}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="deleteTableData(scope.row)" type="text" size="small">删除</el-button>
        <el-button @click="editItemInfo(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { queryPageData, deleteData } from '../../api/user'

const statusMap = {
  skill: '技能',
  investment: '投资',
  live: '生活'
};
export default {
  name: "PageList",
  data() {
    return {
      tableData: [],
    };
  },
  filters: {
    getTextByStatus(type) {
      return statusMap[type];
    },
    transformTimeStyle(time) {
      return `${new Date(time).toLocaleDateString()}-${new Date(time).toLocaleTimeString('en-CN', { hour12: false})}`
    }
  },
  created() {
    this.getPageData();
  },
  methods: {
    async getPageData() {
      try {
        const res = await queryPageData();
        if (res.code === 1) {
          this.tableData = res.data || []
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTableData(row) {
      const { item_id } = row;
      try {
        const res = await deleteData({ item_id });
        if (res.code === 1) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getPageData();
        }
      } catch (error) {
        console.log(error);
      }
    },

    editItemInfo(row) {
      const { item_id } = row;
      this.$router.push(`/fill-info?item_id=${item_id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 20px;
    margin: 30px;
  }
</style>