<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="searchData" placeholder="公司名,经销商,业务范围,地址,公司备注的单项搜索">></el-input>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-search" circle @click="search"/>
      </el-col>
      <el-button @click="clearFilter" type="info"  >清除所有过滤器</el-button>
      <el-button type="success" @click="agencyAddFormVisible = true" round>新增</el-button>
    </el-row>
    <el-dialog title="中间商新增" :visible.sync="agencyAddFormVisible" width="30%"
               :before-close="dailogClose" center >
      <el-form :model="agencyAddForm" ref="agencyAddForm" :rules="rules" label-width="80px" >
        <el-row>
          <el-col  :span="24">
            <el-form-item  label="中间商名">
              <el-input  v-model="agencyAddForm.agencyName" style="width: 50%" required/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="24">
            <el-form-item  label="经销商">
              <el-input  v-model="agencyAddForm.agencyDealer" style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="24">
            <el-form-item  label="联系人">
              <el-input  v-model="agencyAddForm.agencyContactor" style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item   prop ="agencyContactTele" label="联系电话">
              <el-input  v-model="agencyAddForm.agencyContactTele" style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="24">
            <el-form-item  label="业务范围">
              <el-input  v-model="agencyAddForm.agencyOperScp" style="width: 75%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" >
            <el-form-item  label="地址" >
              <el-input  v-model="agencyAddForm.agencyAddr" style="width: 90%"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item  label="备注" style="width: 80%">
              <el-input type="textarea" v-model="agencyAddForm.agencyRsk" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="agencyAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAgency">提 交</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="list"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :default-sort = "{prop: 'agencyName', order: 'descending'}"
      border
      ref="schsShowTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">
<!--      <el-table-column-->
<!--        type="selection"-->
<!--        width="40"-->
<!--      >-->
<!--      </el-table-column>-->
      <el-table-column
        sortable
        prop="agencyName"
        label="中间商名"
        width="auto">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.agencyName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="agencyDealer"
        label="经销商"
        width="90">
      </el-table-column>
      <el-table-column
        prop="agencyContactor"
        label="联系人"
        width="90">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.agencyContactor }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="agencyContactTele"
        label="联系人电话"
        width="90">
      </el-table-column>
      <el-table-column
        prop="agencyOperScp"
        label="业务范围"
        width="auto">
      </el-table-column>
      <el-table-column
        prop="agencyAddr"
        label="地址"
        width="90">
      </el-table-column>
      <el-table-column
        prop="agencyShortRsk"
        label="备注"
        width="auto">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.agencyRsk }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.agencyShortRsk}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editAgencyForVisible(scope.row)"  size="small"/>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteAgency(scope.row)"  size="small"/>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="中间商编辑" :visible.sync="agencyEditFormVisible" width="30%"
               :before-close="dailogClose" center >
      <el-form :model="agencyEditForm" ref="agencyEditForm" :rules="rules" label-width="80px" >
        <el-row>
          <el-col  :span="12">
            <el-form-item  label="中间商名">
              <el-input  v-model="agencyEditForm.agencyName" style="width: 100%" required/>

            </el-form-item>
          </el-col>
          <el-col  :span="12">
            <el-form-item >
              <el-input  type="hidden" v-model="agencyEditForm.agencyId" style="width: 100%" required/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="24">
            <el-form-item  label="经销商">
              <el-input  v-model="agencyEditForm.agencyDealer" style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="24">
            <el-form-item  label="联系人">
              <el-input  v-model="agencyEditForm.agencyContactor" style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item   prop ="agencyContactTele" label="联系电话">
              <el-input  v-model="agencyEditForm.agencyContactTele" style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="24">
            <el-form-item  label="业务范围">
              <el-input  v-model="agencyEditForm.agencyOperScp" style="width: 75%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" >
            <el-form-item  label="地址" >
              <el-input  v-model="agencyEditForm.agencyAddr" style="width: 90%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item  label="备注" style="width: 80%">
              <el-input type="textarea" v-model="agencyEditForm.agencyRsk" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="agencyEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateAgency">提 交</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination
        :hide-on-single-page="false"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10,20,50,100]"
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
import { regionData  } from 'element-china-area-data'
const cityOptions = ['小学', '初中', '高中', '大学'];
export default {
  inject: ['reload'],
  name: "AgencyManger",
  mounted(){
  },
  methods: {
    saveAgency(){
      var _this = this
      this.$refs['agencyAddForm'].validate((valid) => {
        if (valid) {
          this.$api.article.agencyManger('post','agency',{agencyAddForm:this.agencyAddForm})
            .then(resp => {
              this.$notify.success({
                title: '成功',
                message: '记录已上传'
              })
              this.agencyAddFormVisible = false;
              _this.reload();
            })
        } else {
          return false
        }
      })
    },
    handleChange (value) {
    },

    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.data = listJson.list
      this.dateList = listJson.dateList
      this.getList()
    },
    //为了学制查询所特殊处理的函数
    // searchForSchInst(item,searchData){
    //   let showSch = false;
    //   item.schInst.forEach(v=>{
    //     if (v.name == searchData){
    //       showSch = true;
    //     }
    //   });
    //   return showSch;
  // },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      //返回所有所有按名字包含的list数据组
      let list = this.data.filter((item, index) =>
        item.agencyName.includes(this.searchData)||
        item.agencyDealer.includes(this.searchData)||
        item.agencyOperScp.includes(this.searchData)||
        item.agencyContactor.includes(this.searchData)||
        item.agencyAddr.includes(this.searchData)||
        item.agencyRsk.includes(this.searchData)
      )
      //对当前页面的数据进行的回返 对当前的数据进行按index的数值从list中获取数据 index 大于等于limit*（当前页数-1） 小于limit*页面数
      this.list = list.filter((item, index) =>
        index < this.page * this.limit && index >= this.limit * (this.page - 1)
      )
      this.total = list.length
    }
    ,
    // 当每页数量改变
    handleSizeChange(val) {
      this.limit = val
      this.getList()
    },
    // 当当前页改变
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    // 搜索过滤数据
    search() {
      this.page = 1
      this.getList()
    },
    //为了确定是否关闭模态窗口的确认
    dailogClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 为了编辑学校的数据获取
    editAgencyForVisible(row) {
      this.agencyEditFormVisible =true;
      this.$api.article.agencyManger('get','agency',{agencyId:row.agencyId})
        .then(res=>{
          if(res.code === 200){
            this.agencyEditForm = res.agencyEditForm
          }else {
            this.$notify.error({
              title: '错误',
              message: '学校信息获取失败 稍后重试'
            })
          }
        })
    },
    updateAgency() {
      var _this = this;
      this.$refs['agencyEditForm'].validate((valid) => {
        if (valid) {
          this.$api.article.agencyManger('put','agency',{agencyEditForm:this.agencyEditForm})
            .then(resp => {
              this.$notify.success({
                title: '成功',
                message: '记录修改成功'
              })
              this.agencyEditFormVisible =false;
              _this.reload();
            })
        } else {
          return false
        }
      })


    },
    deleteAgency(row) {
      this.$confirm('确认删除当前这条记录？')
        .then(_ => {
          this.$api.article.agencyManger('delete','agency',{agencyId:row.agencyId})
            .then(res => {
              if(res.code === 200){
                this.$notify.success({
                  title: '成功',
                  message: '删除成功'
                })
              }else {
                this.$notify.error({
                  dangerouslyUseHTMLString: true,
                  title: '错误',
                  message: res.message
                })
              }
              this.reload();
            })
        })
        .catch(_ => {
        });

    },
    clearFilter() {
      this.$refs.schsShowTable.clearFilter();
      this.searchData='';
      this.getList();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.schCorpIndiv === value;
    },
    schInstFilter(value, row,column) {
      let showSch = false;
      const property = column['property']
      row[property].forEach(v=>{
        if (v.name == value){
          showSch = true;
        }
      });
      return showSch;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.schsShowTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.schsShowTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //用户不同用户的颜色显示 按需求进行的显示
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2 === 1) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    }
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback()
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    return {
      options: regionData,
      selectedOptions: [],
      rules: {
        rePassword : [{validator: "test", trigger: 'blur'}],
        agencyContactTele : [{required: true,validator: checkPhone, trigger: 'blur'}]
      },
      textLabelWidth :'100px',
      cities: cityOptions,
      checkList:[],
      agencyLists:[],
      agencyEditForm: {
        agencyId: '',
        agencyName: '',
        agencyAddr: '',
        agencyLoog: '',
        agencyLat: '',
        agencyDealer: '',
        agencyContactor: '',
        agencyContactTele: '',
        agencyOperScp: '',
        agencyStatus: '',
        agencyShortRsk: '',
        agencyRsk: ''
      },
      agencyAddForm: {
        agencyId: '',
        agencyName: '',
        agencyAddr: '',
        agencyLoog: '',
        agencyLat: '',
        agencyDealer: '',
        agencyContactor: '',
        agencyContactTele: '',
        agencyOperScp: '',
        agencyStatus: '',
        agencyShortRsk: '',
        agencyRsk: ''
      },
      agencyEditFormVisible: false,
      agencyAddFormVisible: false,
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
    this.$api.article.agencyManger('get','agencys',{userName:this.$store.state.userName,limit:50})
      .then( (res) => {
        this.data = res.agencyLists
        this.getList()
      })
  }

}

</script>

<style scoped>

</style>
