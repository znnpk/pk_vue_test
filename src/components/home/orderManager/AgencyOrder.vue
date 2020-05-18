<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-input v-model="searchData" placeholder="中间商项目编号,绑定账户,项目名称,中间商名,涉及学校的单项搜索">></el-input>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-search" circle @click="search"/>
      </el-col>
      <el-button @click="clearFilter" type="info"  >清除所有过滤器</el-button>
      <el-button type="success" @click="agencyPrjAddFormVisible = true" round>新增</el-button>
    </el-row>
    <el-dialog title="中间商项目新增" :visible.sync="agencyPrjAddFormVisible" width="45%"
               :before-close="dailogClose"  @open="getAgencyNames" center >
      <el-form :model="agencyPrjAddForm" ref="agencyPrjAddForm" :rules="rules" label-width="80px" >
        <el-row>
          <el-col  :span="12">
            <el-form-item  label="绑定账户">
              <el-input disabled v-model="agencyPrjAddForm.agencyPrjBizStf"  style="width: 30%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="12">
            <el-form-item  label="项目名称">
              <el-input  v-model="agencyPrjAddForm.agencyPrjName" style="width: 70%"/>
            </el-form-item>
          </el-col>
          <el-col  :span="12">
            <el-form-item  label="项目资金">
              <el-input  v-model="agencyPrjAddForm.agencyPrjCapital" placeholder="单位:万元"  style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item    label="项目中间商">
              <template>
                <el-select v-model="agencyPrjAddForm.agencyPrjAgency"  clearable placeholder="请选择" @change="changeAgencyPrincipal">
                  <el-option
                    v-for="item in agencysForSelect"
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
          <el-col :span="12">
            <el-form-item    label="项目学校">
              <template>
                <el-select v-model="agencyPrjAddForm.agencyPrjSch"clearable placeholder="请选择" @change="changeAgencyPrincipal">
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
            <el-form-item  label="中间商负责人" >
              <el-input disabled v-model="agencyPrjAddForm.agencyPrjAgencyPrincipal" style="width: 70%"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item  label="中间商负责人电话" >
              <el-input disabled v-model="agencyPrjAddForm.agencyPrjAgencyPrincipalTele" style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" >
            <el-form-item  label="开始时间" >
              <el-date-picker  v-model="agencyPrjAddForm.agencyPrjStartTm" type="date"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item  label="结束时间" >
              <el-date-picker  v-model="agencyPrjAddForm.agencyPrjEndTm" type="date"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="24">
            <el-form-item  label="业务内容">
              <el-input  v-model="agencyPrjAddForm.agencyPrjBizContent" style="width: 78%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item  label="备注" style="width: 80%">
              <el-input type="textarea" v-model="agencyPrjAddForm.agencyPrjRsk" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="agencyPrjAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAgencyPrj">提 交</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="list"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :default-sort = "{prop: 'agencyPrjId', order: 'descending'}"
      border
      ref="agencysShowTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">
      <!--      <el-table-column-->
      <!--        type="selection"-->
      <!--        width="40">-->
      <!--      </el-table-column>-->
      <el-table-column
        sortable
        prop="agencyPrjId"
        label="校方项目编号"
        width="auto">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.agencyPrjId }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="agencyPrjBizStf"
        label="绑定账户"
        width="90">
      </el-table-column>
      <el-table-column
        prop="agencyPrjName"
        label="项目名称"
        width="90">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.agencyPrjName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="agencyPrjCapital"
        label="项目资金"
        width="90">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.agencyPrjCapital }}万元</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="agencyPrjAgency"
        label="项目中间商"
        width="auto">
      </el-table-column>
      <el-table-column
        prop="agencyPrjSch"
        label="项目学校"
        width="auto">
      </el-table-column>
      <el-table-column
        prop="agencyPrjBizContent"
        label="业务内容"
        width="90">
      </el-table-column>
      <el-table-column
        prop="agencyPrjAgencyPrincipal"
        label="中间商负责人"
        width="90">
      </el-table-column>
      <el-table-column
        prop="agencyPrjAgencyPrincipalTele"
        label="中间商负责人电话"
        width="90">
      </el-table-column>
      <el-table-column
        sortable
        prop="agencyPrjStartTm"
        label="开始时间"
        width="auto">
      </el-table-column>
      <el-table-column
        sortable
        prop="agencyPrjEndTm"
        label="结束时间"
        width="auto">
      </el-table-column>
      <el-table-column
        prop="agencyPrjShortRsk"
        label="备注"
        width="auto">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.agencyPrjRsk }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.agencyPrjShortRsk}}</el-tag>
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
            type="primary" icon="el-icon-edit" circle @click="editAgencyPrjForVisible(scope.row)"  size="small"/>
          <el-button
            :disabled="editPowerCheck(scope.row)"
            type="danger" icon="el-icon-delete" circle @click="deleteAgencyPrj(scope.row)"  size="small"/>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="中间商项目编辑" :visible.sync="agencyPrjEditFormVisible" width="45%"
               :before-close="dailogClose"  @open="getAgencyNames" center >
      <el-form :model="agencyPrjEditForm" ref="agencyPrjEditForm" :rules="rules" label-width="80px" >
        <el-row>
          <el-col  :span="12">
            <el-form-item  label="绑定账户">
              <el-input disabled v-model="agencyPrjEditForm.agencyPrjBizStf"  style="width: 30%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="12">
            <el-form-item  label="项目名称">
              <el-input  v-model="agencyPrjEditForm.agencyPrjName" style="width: 70%"/>
            </el-form-item>
          </el-col>
          <el-col  :span="12">
            <el-form-item  label="项目资金">
              <el-input  v-model="agencyPrjEditForm.agencyPrjCapital" placeholder="单位:万元"  style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item    label="项目中间商">
              <template>
                <el-select v-model="agencyPrjEditForm.agencyPrjAgency"  clearable placeholder="请选择" @change="changeAgencyPrincipalForEdit">
                  <el-option
                    v-for="item in agencysForSelect"
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
          <el-col :span="12">
            <el-form-item    label="项目学校">
              <template>
                <el-select v-model="agencyPrjEditForm.agencyPrjSch" clearable placeholder="请选择" >
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
            <el-form-item  label="中间商负责人" >
              <el-input  disabled v-model="agencyPrjEditForm.agencyPrjAgencyPrincipal" style="width: 70%"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item  label="中间商负责人电话" >
              <el-input disabled v-model="agencyPrjEditForm.agencyPrjAgencyPrincipalTele" style="width: 50%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" >
            <el-form-item  label="开始时间" >
              <el-date-picker  v-model="agencyPrjEditForm.agencyPrjStartTm" type="date"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item  label="结束时间" >
              <el-date-picker  v-model="agencyPrjEditForm.agencyPrjEndTm" type="date"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="24">
            <el-form-item  label="业务内容">
              <el-input  v-model="agencyPrjEditForm.agencyPrjBizContent" style="width: 78%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item  label="备注" style="width: 80%">
              <el-input type="textarea" v-model="agencyPrjEditForm.agencyPrjRsk" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="agencyPrjEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateAgencyPrj">提 交</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination
        :hide-on-single-page="false"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10,20,50,100]"
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
  inject: ['reload'],
  name: "AgencyPrjManeger",
  mounted(){
  },
  methods: {
    saveAgencyPrj(){
      var _this = this
      this.$refs['agencyPrjAddForm'].validate((valid) => {
        if (valid) {
          this.$api.article.agencyPrjManger('post','agencyPrj',{agencyPrjAddForm:this.agencyPrjAddForm})
            .then(resp => {
              this.$notify.success({
                title: '成功',
                message: '记录已上传'
              })
              this.agencyPrjAddFormVisible = false;
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
    // searchForAgencyInst(item,searchData){
    //   let showAgency = false;
    //   item.agencyInst.forEach(v=>{
    //     if (v.name == searchData){
    //       showAgency = true;
    //     }
    //   });
    //   return showAgency;
    // },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      //返回所有所有按名字包含的list数据组

      let list = this.data.filter((item, index) =>
        item.agencyPrjId==this.searchData||
        item.agencyPrjBizStf.includes(this.searchData)||
        item.agencyPrjName.includes(this.searchData)||
        item.agencyPrjAgency.includes(this.searchData)||
        item.agencyPrjSch.includes(this.searchData)
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
      if(row.agencyPrjBizStf==this.userName){
        return false
      }else {
        return  true
      }
    },
    // 为了编辑学校项目的数据获取
    editAgencyPrjForVisible(row) {
      this.agencyPrjEditFormVisible =true;
      this.$api.article.agencyPrjManger('get',"agencyPrj",{agencyPrjId:row.agencyPrjId})
        .then(res=>{
          if(res.code === 200){
            this.agencyPrjEditForm = res.agencyPrjEditForm
          }else {
            this.$notify.error({
              title: '错误',
              message: '中间商项目数据获取失败 稍后重试'
            })
          }
        })
    },
    //  为了中间商项目更新
    updateAgencyPrj() {
      var _this = this;
      // this.agencysForSelect.forEach(v=>{
      //   if (v.label == this.agencyPrjEditForm.agencyPrjAgency){
      //     this.agencyPrjEditForm.agencyPrjAgency=v.value
      //   }
      // });
      // this.schsForSelect.forEach(v=>{
      //   if (v.label == this.agencyPrjEditForm.agencyPrjSch){
      //     this.agencyPrjEditForm.agencyPrjSch=v.value
      //   }
      // });
      this.$refs['agencyPrjEditForm'].validate((valid) => {
        if (valid) {
          this.$api.article.agencyPrjManger('put','agencyPrj',{agencyPrjEditForm:this.agencyPrjEditForm})
            .then(resp => {
              this.$notify.success({
                title: '成功',
                message: '记录修改成功'
              })
              this.agencyPrjEditFormVisible =false;
              _this.reload();
            })
        } else {
          return false
        }
      })


    },
    //  中间商项目的删除
    deleteAgencyPrj(row) {
      this.$confirm('确认删除当前这条记录？')
        .then(_ => {
          this.$api.article.agencyPrjManger('delete',"agencyPrj",{agencyPrjId:row.agencyPrjId})
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
      this.$refs.agencysShowTable.clearFilter();
      this.searchData='';
      this.getList();
    },
    formatter(row, column) {
      return row.address;
    },
    agencyInstFilter(value, row,column) {
      let showAgency = false;
      const property = column['property']
      row[property].forEach(v=>{
        if (v.name == value){
          showAgency = true;
        }
      });
      return showAgency;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.agencysShowTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.agencysShowTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //用户不同用户的颜色显示 按需求进行的显示
    tableRowClassName({row}) {
      if (row.agencyPrjBizStf == this.userName) {
        return 'success-row';
      } else {
        return 'warning-row';
      }
    },
    // 学校名称变更后进行 相应的联系人以及其电话的变更
    changeAgencyPrincipal(){
      this.agencysForDetail.forEach(v=>{
        if (v.agencyId == this.agencyPrjAddForm.agencyPrjAgency){
          this.agencyPrjAddForm.agencyPrjAgencyPrincipal = v.agencyContactor;
          this.agencyPrjAddForm.agencyPrjAgencyPrincipalTele = v.agencyContactorTele;
        }
      });
    },
    // 编辑类 学校名称变更后进行 相应的联系人以及其电话的变更
    changeAgencyPrincipalForEdit(){
      this.agencysForDetail.forEach(v=>{
        if (v.agencyId == this.agencyPrjEditForm.agencyPrjAgency){
          this.agencyPrjEditForm.agencyPrjAgencyPrincipal = v.agencyContactor;
          this.agencyPrjEditForm.agencyPrjAgencyPrincipalTele = v.agencyContactorTele;
        }
      });
    },
    //  对学校名字进行的填充
    getAgencyNames(){

      if(this.$store.state.userName == '尚未登录的人'){
        this.$notify.error({
          title: '错误',
          message: '当前可能尚未登录 不可操作订单'
        });
        this.agencyPrjAddFormVisible = false;
        this.agencyPrjEditFormVisible=false;
      }else{
        this.agencyPrjAddForm.agencyPrjBizStf=this.$store.state.userName;
        this.agencyPrjEditForm.agencyPrjBizStf=this.$store.state.userName;
      }
      this.$api.article.agencyManger('get','agencyNames',{userName:this.$store.state.userName,limit:50})
        .then(res =>{
          this.agencysForSelect=res.agencysForSelect;
          this.agencysForDetail=res.agencysForDetail;
          this.schsForSelect=res.schsForSelect;

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
      agencysForDetail:[],
      schsForSelect:[],
      agencysForSelect:[],
      selectedOptions: [],
      rules: {
        rePassword : [{validator: "test", trigger: 'blur'}],
        agencyPrjContactTele : [{required: true,validator: checkPhone, trigger: 'blur'}]
      },
      textLabelWidth :'100px',
      checkList:[],
      agencyPrjLists:[],
      agencyPrjEditForm: {
        agencyPrjSch: '',
        agencyPrjId: '',
        agencyPrjBizStf: '',
        agencyPrjName: '',
        agencyPrjCapital: '',
        agencyPrjAgency: '',
        agencyPrjBizContent: '',
        agencyPrjAgencyPrincipal: '',
        agencyPrjAgencyPrincipalTele: '',
        agencyPrjStartTm: '',
        agencyPrjEndTm: '',
        agencyPrjShortRsk: '',
        agencyPrjRsk: '',
      },
      agencyPrjAddForm: {
        agencyPrjSch: '',
        agencyPrjId: '',
        agencyPrjBizStf: '',
        agencyPrjName: '',
        agencyPrjCapital: '',
        agencyPrjAgency: '',
        agencyPrjBizContent: '',
        agencyPrjAgencyPrincipal: '',
        agencyPrjAgencyPrincipalTele: '',
        agencyPrjStartTm: '',
        agencyPrjEndTm: '',
        agencyPrjShortRsk: '',
        agencyPrjRsk: '',
      },
      agencyPrjEditFormVisible: false,
      agencyPrjAddFormVisible: false,
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
    this.$api.article.agencyPrjManger('get','agencyPrjs',{userName:this.$store.state.userName})
      .then( (res) => {
        this.userName=this.$store.state.userName;
        this.data = res.agencyPrjLists
        this.getList()
      })
  }
}

</script>

<style scoped>

</style>
