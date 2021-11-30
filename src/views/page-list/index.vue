<template>
  <div class="wrapper">
    <h3>信息列表</h3>
    <div class="search">
      <el-select size="small" v-model="selectValue" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button size="small" class="search-btn" @click="searchData" type="primary">查询</el-button>
    </div>
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

    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
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
      count: 0,
      pageSize: 10,
      current: 1,
      selectValue: '',
      options: [{
          value: 'skill',
          label: '技能'
        }, {
          value: 'investment',
          label: '投资'
        }, {
          value: 'live',
          label: '生活'
        }],
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
    this.getPageData({ type: this.selectValue });
  },
  methods: {
    async getPageData(params) {
      try {
        const { pageNumber = 0, pageSize = 10, type } = params;
        const res = await queryPageData({
          pageNumber, pageSize, type,
        });
        if (res.code === 1) {
          this.tableData = res.data.dataList || []
          this.count = res.data.totalCount;
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

    handleCurrentChange(page) {
      this.current = page;
      this.getPageData({
        pageSize: this.pageSize,
        pageNumber: (page - 1) * this.pageSize,
        type: this.selectValue
      });
    },

    searchData() {
      this.getPageData({
        pageSize: this.pageSize,
        pageNumber: 0,
        type: this.selectValue,
      });
    },

    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getPageData({
        pageSize,
        pageNumber: 0,
        type: this.selectValue,
      });
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

  .footer {
    margin: 20px 0;
  }

  .search {
    margin: 20px 0;
  }

  .search-btn {
    margin-left: 15px;
  }
</style>