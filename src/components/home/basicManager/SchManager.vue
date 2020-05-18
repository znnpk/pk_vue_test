<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="searchData" placeholder="当前仅支持学校名称以及学制搜索">></el-input>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-search" circle @click="search"/>
      </el-col>
      <el-button @click="clearFilter" type="info"  >清除所有过滤器</el-button>
      <el-button type="success" @click="schAddFormVisible = true" round>新增</el-button>
    </el-row>
    <el-dialog title="学校新增" :visible.sync="schAddFormVisible" width="40%"
               :before-close="dailogClose" center >
      <el-form :model="schAddForm" ref="schAddForm" :rules="rules" label-width="80px" >
        <el-row>
        <el-col  :span="12">
          <el-form-item  label="校名">
            <el-input  v-model="schAddForm.schName" style="width: 90%" required/>
          </el-form-item>
        </el-col>
          <el-col :span="12">
            <el-form-item  label="公私">
              <template>
                <div>
                  <el-radio-group v-model="schAddForm.schCorpIndiv">
                    <el-radio-button label="公立"/>
                    <el-radio-button label="私立"/>
                  </el-radio-group>
                </div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-col  :span="12">
          <el-form-item  label="教师人数">
            <el-input-number v-model="schAddForm.schTeacherNum" :min="0" :max="999999" label="描述文字"/>
          </el-form-item>
        </el-col>
          <el-col  :span="12">
            <el-form-item  label="学生人数">
              <el-input-number v-model="schAddForm.schStudentNum" :min="0" :max="999999" label="描述文字"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item  label="学制">
            <template>
              <div style="margin-top: 20px">
                <el-checkbox-group v-model="schAddForm.schInst" size="small">
                  <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </template>
          </el-form-item>
        </el-col>
          <el-col  :span="12">
            <el-form-item  label="创办时间">
              <el-date-picker  v-model="schAddForm.schOpenTm" type="date"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-col  :span="12">
          <el-form-item  label="校长">
            <el-input  v-model="schAddForm.schAdmin" style="width: 70%"/>
          </el-form-item>
        </el-col>
        <el-col  :span="12">
          <el-form-item  label="联系人">
            <el-input  v-model="schAddForm.schContactor" style="width: 70%"/>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item   prop ="schContactorTele" label="联系电话">
            <el-input  v-model="schAddForm.schContactorTele" style="width: 70%"/>
          </el-form-item>
        </el-col>
          <el-col  :span="12">
            <el-form-item  label="学校省市区":label-width="textLabelWidth"  style="margin-left: -20px">
              <template>
                <div >
                  <el-cascader
                    size="large"
                    :options="options"
                    :props="{ expandTrigger: 'hover' }"
                    v-model="schAddForm.schProv"
                    @change="handleChange">
                  </el-cascader >
                </div>
              </template>
<!--              <el-input  v-model="schAddForm.schProv"/>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  >
            <el-form-item  label="地址" >
              <el-input  v-model="schAddForm.schAddr" style="width: 90%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="400">
            <el-form-item  label="备注" style="width: 95%">
              <el-input type="textarea" v-model="schAddForm.schRsk" class="date_picker"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="schAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSch">提 交</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="list"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :default-sort = "{prop: 'name', order: 'descending'}"
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
        prop="schName"
        label="校名"
        width="auto">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.schName }}</el-tag>
            </div>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="schStudentNum"
        label="学生人数"
        width="110">
      </el-table-column>
      <el-table-column
        sortable
        prop="schTeacherNum"
        label="教师人数"
        width="110">
      </el-table-column>
      <el-table-column
        sortable
        prop="schCorpIndiv"
        label="公私立制"
        width="120"
        :filters="[{ text: '公立', value: '公立' }, { text: '私立', value: '私立' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '公立' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.schCorpIndiv}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="schInst"
        label="学制"
        width="120"
        :filters="[{ text: '小学', value: '小学' },{ text: '初中', value: '初中' },
        { text: '高中', value: '高中' },{ text: '大学', value: '大学' },]"
        :filter-method="schInstFilter"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              v-for="tag in scope.row.schInst"
              :key="tag.name"
              :type="tag.type">
              {{tag.name}}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="schOpenTm"
        label="创办时间"
        width="auto">
      </el-table-column>
      <el-table-column
        prop="schAdmin"
        label="校长"
        width="90">
      </el-table-column>
      <el-table-column
        prop="schContactor"
        label="联系人"
        width="90">
      </el-table-column>
      <el-table-column
        prop="schContactorTele"
        label="联系人电话"
        width="90">
      </el-table-column>
      <el-table-column
        prop="schAddr"
        label="地址"
        width="90">
      </el-table-column>
      <el-table-column
        prop="schProv"
        label="省份"
        width="90">
      </el-table-column>
      <el-table-column
        prop="schCity"
        label="地市"
        width="90">
      </el-table-column>
      <el-table-column
        prop="schRegion"
        label="区县"
        width="90">
      </el-table-column>
      <el-table-column
        prop="schRsk"
        label="备注"
        width="auto">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.schRsk }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.schShortRsk }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editSchForVisible(scope.row)"  size="small"/>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteSch(scope.row)"  size="small"/>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="学校编辑" :visible.sync="schEditFormVisible" width="40%"
               :before-close="dailogClose" center >
      <el-form :model="schEditForm" ref="schEditForm" :rules="rules" label-width="80px" >
        <el-row>
          <el-col  :span="12">
            <el-form-item  label="校名">
              <el-input  v-model="schEditForm.schName" style="width: 90%" required/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="公私">
              <template>
                <div>
                  <el-radio-group v-model="schEditForm.schCorpIndiv">
                    <el-radio-button label="公立"/>
                    <el-radio-button label="私立"/>
                  </el-radio-group>
                </div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="12">
            <el-form-item  label="教师人数">
              <el-input-number v-model="schEditForm.schTeacherNum" :min="0" :max="999999" label="描述文字"/>
            </el-form-item>
          </el-col>
          <el-col  :span="12">
            <el-form-item  label="学生人数">
              <el-input-number v-model="schEditForm.schStudentNum" :min="0" :max="999999" label="描述文字"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  label="学制">
              <template>
                <div style="margin-top: 20px">
                  <el-checkbox-group v-model="schEditForm.schInst" size="small">
                    <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                  </el-checkbox-group>
                </div>
              </template>
            </el-form-item>
          </el-col>
          <el-col  :span="12">
            <el-form-item  label="创办时间">
              <el-date-picker  v-model="schEditForm.schOpenTm" type="date"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="12">
            <el-form-item  label="校长">
              <el-input  v-model="schEditForm.schAdmin" style="width: 70%"/>
            </el-form-item>
          </el-col>
          <el-col  :span="12">
            <el-form-item  label="联系人">
              <el-input  v-model="schEditForm.schContactor" style="width: 70%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item   prop ="schContactorTele" label="联系电话">
              <el-input  v-model="schEditForm.schContactorTele" style="width: 70%"/>
            </el-form-item>
          </el-col>
          <el-col  :span="12">
            <el-form-item  label="学校省市区":label-width="textLabelWidth"  style="margin-left: -20px">
              <template>
                <div id="app" >
                  <el-cascader
                    size="large"
                    :options="options"
                    :props="{ expandTrigger: 'hover' }"
                    v-model="schEditForm.schProv"
                    @change="handleChange">
                  </el-cascader >
                </div>
              </template>
              <!--              <el-input  v-model="schEditForm.schProv"/>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  >
            <el-form-item  label="地址" >
              <el-input  v-model="schEditForm.schAddr" style="width: 90%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="400">
            <el-form-item  label="备注" style="width: 95%">
              <el-input type="textarea" v-model="schEditForm.schRsk" class="date_picker"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="schEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSch">提 交</el-button>
      </div>
    </el-dialog>
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
import { regionData  } from 'element-china-area-data'
const cityOptions = ['小学', '初中', '高中', '大学'];
export default {
  inject: ['reload'],
  name: "SchManger",
  mounted(){
  },
  methods: {
    saveSch(){
      var _this = this
      if( this.schAddForm.schProv == '' ){
        alert("学校省市区 为必填项哦！")
        return false
      }
      this.$refs['schAddForm'].validate((valid) => {
        if (valid) {
          this.$api.article.schManger('post','sch',{schAddForm:this.schAddForm})
            .then(resp => {
                this.$notify.success({
                    title: '成功',
                    message: '记录已上传'
                })
              this.schAddFormVisible = false;
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
    searchForSchInst(item,searchData){
      let showSch = false;
      item.schInst.forEach(v=>{
        if (v.name == searchData){
          showSch = true;
        }
      });
      return showSch;

    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      //返回所有所有按名字包含的list数据组
      let list = this.data.filter((item, index) =>
        item.schName.includes(this.searchData)||this.searchForSchInst(item,this.searchData)
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
    editSchForVisible(row) {
          this.schEditFormVisible =true;
          this.$api.article.schManger("get","sch",{schId:row.schId})
              .then(res=>{
                  if(res.code === 200){
                      this.schEditForm = res.schEditForm
                  }else {
                      this.$notify.error({
                          title: '错误',
                          message: '学校信息获取失败 稍后重试'
                      })
                  }
              })
      },
      updateSch() {
          var _this = this;
          this.$refs['schEditForm'].validate((valid) => {
              if (valid) {
                  this.$api.article.schManger("put",'sch',{schEditForm:this.schEditForm})
                      .then(resp => {
                          this.$notify.success({
                              title: '成功',
                              message: '记录修改成功'
                          })
                          this.schEditFormVisible =false;
                          _this.reload();
                      })
              } else {
                  return false
              }
          })


      },
    deleteSch(row) {
      this.$confirm('确认删除当前这条记录？')
        .then(_ => {
          this.$api.article.schManger("delete","sch",{schId:row.schId})
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

        schContactorTele : [{required: true,validator: checkPhone, trigger: 'blur'}]


      },
      textLabelWidth :'100px',
      cities: cityOptions,
      checkList:[],
      schLists:[],
      schEditForm: {
        schId: '',
        schName: '',
        schStudentNum: '',
        schTeacherNum: '',
        schCorpIndiv: '',
        schInst: [],
        schOpenTm: '',
        schAddr: '',
        schAdmin: '',
        schContactor: '',
        schContactorTele: '',
        schShortRsk: '',
        schRsk: '',
        schProv: '',
        schCity: '',
        schRegion: ''
      },
      schAddForm: {
        schId: '',
        schName: '',
        schStudentNum: '',
        schTeacherNum: '',
        schCorpIndiv: '',
        schInst: [],
        schOpenTm: '',
        schAddr: '',
        schAdmin: '',
        schContactor: '',
        schContactorTele: '',
        schShortRsk: '',
        schRsk: '',
        schProv: '',
        schCity: '',
        schRegion: ''
      },
      schEditFormVisible: false,
      schAddFormVisible: false,
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
      //为了所有学校列表的数据获取
      this.$api.article.schManger("get",'schs',{userName:this.$store.state.userName,limit:50})
        .then( (res) => {
          this.data = res.schLists
          this.getList()
        })
    }

}

// var listJson = {
//   list: [
//     {
//       schId: 'test',
//       schName: 'test',
//       schAdmin: 'test',
//       schStudentNum: 'test',
//       schTeacherNum: 'test',
//       schCorpIndiv: 'test',
//       schInst: [{ name: '小学', type: '' },
//     { name: '初中', type: 'warning' },
//     { name: '高中', type: 'danger' },
//     { name: '大学', type: 'success' },
//     ],
//       schOpenTm: 'test',
//       schAddr: 'test',
//       schContactor: 'test',
//       schContactorTele: 'test',
//       schShortRsk: 'test',
//       schRsk: 'test',
//       schProv: 'test',
//       schCity: 'test',
//       schRegion: 'test',
//       date: '2016-05-02',
//       name: '小小',
//       address: '上海市普陀区金沙江路 1518 弄',
//       tag: '家'
//     }
//   ]
// }

</script>

<style scoped>

</style>
