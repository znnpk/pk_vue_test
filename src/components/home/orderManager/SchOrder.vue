<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="searchData" placeholder="校方项目编号,绑定账户,项目名称,项目学校的单项搜索">></el-input>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-search" circle @click="search"/>
      </el-col>
      <el-button @click="clearFilter" type="info"  >清除所有过滤器</el-button>
      <el-button type="success" @click="schPrjAddFormVisible = true" round>新增</el-button>
    </el-row>
    <el-dialog title="校方项目新增" :visible.sync="schPrjAddFormVisible" width="45%"
               :before-close="dailogClose"  @open="getSchNames" center >
      <el-form :model="schPrjAddForm" ref="schPrjAddForm" :rules="rules" label-width="80px" >
        <el-row>
          <el-col  :span="12">
            <el-form-item  label="绑定账户">
              <el-input disabled v-model="schPrjAddForm.schPrjBizStf"  style="width: 30%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="12">
            <el-form-item  label="项目名称">
              <el-input  v-model="schPrjAddForm.schPrjName" style="width: 70%"/>
            </el-form-item>
          </el-col>
          <el-col  :span="12">
            <el-form-item  label="项目资金">
              <el-input  v-model="schPrjAddForm.schPrjCapital" placeholder="单位:万元"  style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item    label="项目学校">
              <template>
              <el-select v-model="schPrjAddForm.schPrjSch"  clearable placeholder="请选择" @change="changeSchPrincipal">
                <el-option
                  v-for="item in schsForSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  style="width: 70%"
                >
                </el-option>
              </el-select>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" >
            <el-form-item  label="校方负责人" >
              <el-input disabled v-model="schPrjAddForm.schPrjSchPrincipal" style="width: 70%"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item  label="校方负责人电话" >
              <el-input  disabled v-model="schPrjAddForm.schPrjSchPrincipalTele" style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" >
            <el-form-item  label="开始时间" >
              <el-date-picker  v-model="schPrjAddForm.schPrjStartTm" type="date"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item  label="结束时间" >
              <el-date-picker  v-model="schPrjAddForm.schPrjEndTm" type="date"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="24">
            <el-form-item  label="业务内容">
              <el-input  v-model="schPrjAddForm.schPrjBizContent" style="width: 78%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item  label="备注" style="width: 80%">
              <el-input type="textarea" v-model="schPrjAddForm.schPrjRsk" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="schPrjAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSchPrj">提 交</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="list"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :default-sort = "{prop: 'schPrjId', order: 'descending'}"
      border
      ref="schsShowTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">
<!--      <el-table-column-->
<!--        type="selection"-->
<!--        width="40">-->
<!--      </el-table-column>-->
      <el-table-column
        sortable
        prop="schPrjId"
        label="校方项目编号"
        width="auto">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.schPrjId }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="schPrjBizStf"
        label="绑定账户"
        width="90">
      </el-table-column>
      <el-table-column
        prop="schPrjName"
        label="项目名称"
        width="90">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.schPrjName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="schPrjCapital"
        label="项目资金"
        width="90">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.schPrjCapital }}万元</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="schPrjSch"
        label="项目学校"
        width="auto">
      </el-table-column>
      <el-table-column
        prop="schPrjBizContent"
        label="业务内容"
        width="90">
      </el-table-column>
      <el-table-column
        prop="schPrjSchPrincipal"
        label="校方负责人"
        width="90">
      </el-table-column>
      <el-table-column
        prop="schPrjSchPrincipalTele"
        label="校方负责人电话"
        width="90">
      </el-table-column>
      <el-table-column
        sortable
        prop="schPrjStartTm"
        label="开始时间"
        width="auto">
      </el-table-column>
      <el-table-column
        sortable
        prop="schPrjEndTm"
        label="结束时间"
        width="auto">
      </el-table-column>
      <el-table-column
        prop="schPrjShortRsk"
        label="备注"
        width="auto">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.schPrjRsk }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.schPrjShortRsk}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button
            :disabled="editPowerCheck(scope.row)"
            type="primary" icon="el-icon-edit" circle @click="editSchPrjForVisible(scope.row)"  size="small"/>
          <el-button
            :disabled="editPowerCheck(scope.row)"
            type="danger" icon="el-icon-delete" circle @click="deleteSchPrj(scope.row)"  size="small"/>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="校方项目编辑" :visible.sync="schPrjEditFormVisible" width="45%"
               :before-close="dailogClose"  @open="getSchNames" center >
      <el-form :model="schPrjEditForm" ref="schPrjEditForm"  label-width="80px" >
        <el-row>
          <el-col  :span="12">
            <el-form-item  label="绑定账户">
              <el-input disabled v-model="schPrjEditForm.schPrjBizStf"  style="width: 30%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="12">
            <el-form-item  label="项目名称">
              <el-input  v-model="schPrjEditForm.schPrjName" style="width: 70%"/>
            </el-form-item>
          </el-col>
          <el-col  :span="12">
            <el-form-item  label="项目资金">
              <el-input  v-model="schPrjEditForm.schPrjCapital" placeholder="单位:万元"  style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item    label="项目学校">
              <template>
                <el-select v-model="schPrjEditForm.schPrjSch"  clearable placeholder="请选择" @change="changeSchPrincipalForEdit">
                  <el-option
                    v-for="item in schsForSelect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    style="width: 70%"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" >
            <el-form-item  label="校方负责人" >
              <el-input disabled  v-model="schPrjEditForm.schPrjSchPrincipal" style="width: 70%"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item  label="校方负责人电话" >
              <el-input disabled v-model="schPrjEditForm.schPrjSchPrincipalTele" style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" >
            <el-form-item  label="开始时间" >
              <el-date-picker  v-model="schPrjEditForm.schPrjStartTm" type="date"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item  label="结束时间" >
              <el-date-picker  v-model="schPrjEditForm.schPrjEndTm" type="date"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="24">
            <el-form-item  label="业务内容">
              <el-input  v-model="schPrjEditForm.schPrjBizContent" style="width: 78%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item  label="备注" style="width: 80%">
              <el-input type="textarea" v-model="schPrjEditForm.schPrjRsk" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="schPrjEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSchPrj">提 交</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination
        :hide-on-single-page="false"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5,10,20,100]"
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
export default {
  inject: ['reload'],
  name: "SchPrjManger",
  mounted(){
  },
  methods: {
    saveSchPrj(){
      var _this = this
      this.$refs['schPrjAddForm'].validate((valid) => {
        if (valid) {
          this.$api.article.schPrjManger('post','schPrj',{schPrjAddForm:this.schPrjAddForm})
            .then(resp => {
              this.$notify.success({
                title: '成功',
                message: '记录已上传'
              })
              this.schPrjAddFormVisible = false;
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
          item.schPrjId==this.searchData||
          item.schPrjBizStf.includes(this.searchData)||
          item.schPrjName.includes(this.searchData)||
          item.schPrjSch.includes(this.searchData)
      );

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

      //为了 编辑是否可进行删除进行操作
      editPowerCheck(row){
        if(row.schPrjBizStf==this.userName){
            return false
        }else {
            return  true
        }
      },
    // 为了编辑学校项目的数据获取
    editSchPrjForVisible(row) {
      this.schPrjEditFormVisible =true;
      this.$api.article.schPrjManger('get',"schPrj",{schPrjId:row.schPrjId})
        .then(res=>{
          if(res.code === 200){
            this.schPrjEditForm = res.schPrjEditForm
          }else {
            this.$notify.error({
              title: '错误',
              message: '学校项目数据获取失败 稍后重试'
            })
          }
        })
    },
    //  为了校方项目更新
    updateSchPrj() {
      var _this = this;
        this.schsForSelect.forEach(v=>{
            if (v.label == this.schPrjEditForm.schPrjSch){
                this.schPrjEditForm.schPrjSch=v.value
            }
        });
      this.$refs['schPrjEditForm'].validate((valid) => {
        if (valid) {
          this.$api.article.schPrjManger('put','schPrj',{schPrjEditForm:this.schPrjEditForm})
            .then(resp => {
              this.$notify.success({
                title: '成功',
                message: '记录修改成功'
              })
              this.schPrjEditFormVisible =false;
              _this.reload();
            })
        } else {
          return false
        }
      })


    },
    //  校方项目的删除
    deleteSchPrj(row) {
      this.$confirm('确认删除当前这条记录？')
        .then(_ => {
          this.$api.article.schPrjManger('delete',"schPrj",{schPrjId:row.schPrjId})
            .then(res => {
              if(res.code === 200){
                this.$notify.success({
                  title: '成功',
                  message: '删除成功'
                })
              }else {
                this.$notify.error({
                  title: '错误',
                  message: '删除失败'
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
    tableRowClassName({row}) {
      if (row.schPrjBizStf == this.userName) {
        return 'success-row';
      } else {
        return 'warning-row';
      }
    },
      // 学校名称变更后进行 相应的联系人以及其电话的变更
      changeSchPrincipal(){
        this.schsForDetail.forEach(v=>{
              if (v.schId == this.schPrjAddForm.schPrjSch){
                  this.schPrjAddForm.schPrjSchPrincipal = v.schContactor;
                  this.schPrjAddForm.schPrjSchPrincipalTele = v.schContactorTele;
              }
          });
      },
      // 编辑类 学校名称变更后进行 相应的联系人以及其电话的变更
      changeSchPrincipalForEdit(){
          this.schsForDetail.forEach(v=>{
              if (v.schId == this.schPrjEditForm.schPrjSch){
                  this.schPrjEditForm.schPrjSchPrincipal = v.schContactor;
                  this.schPrjEditForm.schPrjSchPrincipalTele = v.schContactorTele;
              }
          });
      },
    //  对学校名字进行的填充
    getSchNames(){
        if(this.$store.state.userName == '尚未登录的人'){
            this.$notify.error({
                title: '错误',
                message: '当前可能尚未登录 不可操作订单'
            });
            this.schPrjAddFormVisible = false;
            this.schPrjEditFormVisible=false;
        }else{
            this.schPrjAddForm.schPrjBizStf=this.$store.state.userName;
            this.schPrjEditForm.schPrjBizStf=this.$store.state.userName;
        }
      //  为了学校项目订单的数据回返
      this.$api.article.schManger("get","schNames",{userName:this.$store.state.userName,limit:50})
          .then(res =>{
              this.schsForSelect=res.schsForSelect;
              this.schsForDetail=res.schsForDetail;
          })
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
      userName :[],
      schsForDetail:[],
      schsForSelect:[],
      options: regionData,
      selectedOptions: [],
      rules: {
        rePassword : [{validator: "test", trigger: 'blur'}],
        schPrjContactTele : [{required: true,validator: checkPhone, trigger: 'blur'}]
      },
      textLabelWidth :'100px',
      checkList:[],
      schPrjLists:[],
      schPrjEditForm: {
        schPrjId: '',
        schPrjBizStf: '',
        schPrjName: '',
        schPrjCapital: '',
        schPrjSch: '',
        schPrjBizContent: '',
        schPrjSchPrincipal: '',
        schPrjSchPrincipalTele: '',
        schPrjStartTm: '',
        schPrjEndTm: '',
        schPrjShortRsk: '',
        schPrjRsk: '',
      },
      schPrjAddForm: {
        schPrjId: '',
        schPrjBizStf: '',
        schPrjName: '',
        schPrjCapital: '',
        schPrjSch: '',
        schPrjBizContent: '',
        schPrjSchPrincipal: '',
        schPrjSchPrincipalTele: '',
        schPrjStartTm: '',
        schPrjEndTm: '',
        schPrjShortRsk: '',
        schPrjRsk: '',
      },
      schPrjEditFormVisible: false,
      schPrjAddFormVisible: false,
      formLabelWidth: '120px',
      list: [],
      data: [],
      limit: 5,
      total: null,
      page: 1,
      searchData: ""
    }
  },
  created() {
    this.$api.article.schPrjManger('get','schPrjs',{userName:this.$store.state.userName})
      .then( (res) => {
          this.userName=this.$store.state.userName;
        this.data = res.schPrjLists
        this.getList()
      })
  }

}

</script>

<style scoped>

</style>
