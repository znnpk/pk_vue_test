<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="searchData" placeholder="输入姓名或者用户名搜索进行搜索">></el-input>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-search" circle @click="search"/>
      </el-col>
      <el-button @click="clearFilter" type="info"  >清除所有筛选</el-button>
    </el-row>
  <el-table
    :data="userLists"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    :default-sort = "{prop: 'userName', order: 'descending'}"
    border
    ref="multipleTable"
    tooltip-effect="dark">
    <el-table-column
      prop="userName"
      sortable
      label="用户名"
      width="180">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ scope.row.userName }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      sortable
      label="姓名"
      width="180">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      sortable
      width="100"
      :filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.sex === '男' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.sex}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="telephone"
      sortable
      width="180"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="department"
      label="部门"
      sortable
      width="180"
      column-key="department"
      :filters="departmentList"
      :filter-method="filterHandler">
    </el-table-column>
    <el-table-column
      label="自我介绍"
      width="auto">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.rsk }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.shortRsk }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
    <div class="block">
      <el-pagination
        :hide-on-single-page="false"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5,10,20,50,100]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
export default {
  name: "EmManager",
  methods: {
    sexFormat (row,column) {
        let sex = row.sex;
        let sexShow = "男女未知";
        if(sex === undefined) {
            sexShow = "未缴费";
        }
        switch(sex) {
            case 'F':
                sexShow = "女";
                break;
            case 'M':
                sexShow = "男";
                break;
        }
        return sexShow;
    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      //返回所有所有按名字包含的list数据组
      let list = this.data.filter((item, index) =>
        item.name.includes(this.searchData)|| item.userName.includes(this.searchData)
      )
      //对当前页面的数据进行的回返 对当前的数据进行按index的数值从list中获取数据 index 大于等于limit*（当前页数-1） 小于limit*页面数
      this.userLists = list.filter((item, index) =>
        index < this.page * this.limit && index >= this.limit * (this.page - 1)
      )
      this.total = list.length
    },
    // 当每页数量改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val
      this.getList()
    },
    // 当当前页改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      this.getList()
    },
    // 搜索过滤数据
    search() {
      this.page = 1
      this.getList()
    },
    clearFilter() {
      this.$refs.multipleTable.clearFilter();
        this.searchData='';
        this.getList();
    },
    filterTag(value, row) {
      return row.sex === value;
    },
    filterHandler(value, row, column) {

      const property = column['property'];
      console.log(property)
      return row[property] === value;
    },
    //用户不同用户的颜色显示 按需求进行的显示
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2 === 1) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    },
    // ,
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
  },
  data() {
    return {
      userLists: [],
      data: [],
      departmentList: [],
      limit: 5,
      total: null,
      page: 1,
      searchData: ""
    }
  },
  created() {
      var listJson = [] ;
    this.$api.article.emManger("get",'ems',{userName:this.$store.state.userName,limit:50})
      .then( (res) => {
                if (res.code === 200) {
                    this.data = res.userLists
                    this.departmentList = res.departmentList
                    this.getList()
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '服务器拒绝您获取相关信息'
                    })
                }
      })

      // 发请求拿到数据并暂存全部数据,方便之后操作
  }
// var listJson = {
//   departmentList:[
//     {
//       text:'2016',
//       value:'2016'
//     },
//     {
//       text:'2017',
//       value:'2017'
//     }
//   ]
//   ,
//   userLists: [
//     {
//       userName:'test',
//       name: '测试用户',
//       sex: 'F',
//       telephone: '13838381438',
//       department:'测试部门',
//       shortRsk:'哈哈哈',
//       rsk :'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！ 虽然每天啊哈哈 但是不是个傻子'
//     },
//     {
//       userName:'test',
//       name: '测试用户',
//       sex: 'M',
//       telephone: '13838381438',
//       department:'测试部门',
//       shortRsk:'哈哈哈',
//       rsk :'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！ 虽然每天啊哈哈 但是不是个傻子'
//     }
//   ]
}

</script>

<style scoped>

</style>
