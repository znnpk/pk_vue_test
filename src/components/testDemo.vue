<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="searchData" placeholder="输入姓名或者地址搜索">></el-input>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-search" circle @click="search"></el-button>
      </el-col>
      <el-button @click="resetDateFilter" type="info">清除日期过滤器</el-button>
      <el-button @click="clearFilter" type="info"  >清除所有过滤器</el-button>
      <el-button type="success" @click="dialogFormVisible = true" round>新增</el-button>
      <el-button type="danger" @click="deleteSomeData" round>删除</el-button>
    </el-row>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="list"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :default-sort = "{prop: 'date', order: 'descending'}"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="40"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
        :filters="dateList"
        :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="handleClick(scope.row)"  size="small"/>
          <el-button type="danger" icon="el-icon-delete" circle @click="handleClick(scope.row)"  size="small"/>
        </template>
      </el-table-column>
    </el-table>
    <!--  <div style="margin-top: 20px">-->
    <!--    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
    <!--    <el-button @click="toggleSelection()">取消选择</el-button>-->
    <!--  </div>-->
    <div class="block">
      <el-pagination
        :hide-on-single-page="true"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 2, 5, 10]"
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
  name: "AgencyManger",
  mounted(){
  },
  methods: {
    deleteSomeData(){
      this.multipleSelection.forEach(function(v){
        alert(v.date)
      })
      // alert(this.multipleSelection[0].name);
    },

    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.data = listJson.list
      this.dateList = listJson.dateList
      this.getList()
    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      //返回所有所有按名字包含的list数据组
      let list = this.data.filter((item, index) =>
        item.name.includes(this.searchData)||item.address.includes(this.searchData)
      )
      //对当前页面的数据进行的回返 对当前的数据进行按index的数值从list中获取数据 index 大于等于limit*（当前页数-1） 小于limit*页面数
      this.list = list.filter((item, index) =>
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
    handleClick(row) {
      alert(row.name)
    },
    resetDateFilter() {
      this.$refs.multipleTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.multipleTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //用户不同用户的颜色显示 按需求进行的显示
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    }
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      list: [],
      data: [],
      dateList:[],
      limit: 5,
      total: null,
      page: 1,
      searchData: ""
    }
  },
  created() {
    this.$api.article.testSome('hahha')
    this.pageList()
  }
}
var listJson = {
  dateList:[
    {
      text:'2016-05-01',
      value:'2016-05-01'
    },
    {
      text:'2016-05-02',
      value:'2016-05-02'
    },
    {
      text:'2016-05-03',
      value:'2016-05-03'
    },
    {
      text:'2016-05-04',
      value:'2016-05-04'
    }
  ]
  ,
  list: [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      tag: '家'
    },
    {
      date: '2016-05-02',
      name: '小小',
      address: '上海市普陀区金沙江路 1518 弄',
      tag: '家'
    },
    {
      date: '2016-05-02',
      name: '小妮',
      address: '上海市普陀区金沙江路 1518 弄',
      tag: '家'
    },
    {
      date: '2016-05-02',
      name: '小胖',
      address: '上海市普陀区金沙江路 1518 弄',
      tag: '家'
    },
    {
      date: '2016-05-02',
      name: '小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      tag: '家'
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄',
      tag: '公司'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
      tag: '家'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄',
      tag: '公司'
    }
  ]
}

</script>

<style scoped>

</style>
