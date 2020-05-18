<template>
  <div class="app">
    <el-container >
      <el-aside  class="app-side app-side-left"
                 :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'"
      >
        <div class="app-side-logo"  @click="uploadTouXiang">
          <img :src="touxiang"
               :width="isCollapse ? '60' : '60'"
               height="60" />
        </div>
        <el-dialog title="上传头像"
                   :visible.sync="userImageEditVisible"
                   width="30%"
                   center>
          <el-form :model="form" enctype="multipart/form-data">
            <el-form-item :label-width="formLabelWidth"
                          ref="uploadElement">
              <el-upload ref="upload"
                         action="#"
                         accept="image/png,image/gif,image/jpg,image/jpeg"
                         list-type="picture-card"
                         :limit=limitNum
                         :auto-upload="false"
                         :on-exceed="handleExceed"
                         :before-upload="handleBeforeUpload"
                         :on-preview="handlePictureCardPreview"
                         :on-remove="handleRemove"
                         :on-change="imgChange"
                         :class="{hide:hideUpload}">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%"
                     :src="dialogImageUrl"
                     alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-button size="small"
                           type="primary"
                           @click="uploadFile" >立即上传</el-button>
                <el-button size="small"
                           @click="tocancel">取消</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-dialog>
        <div >
          <!-- 我是样例菜单 -->
          <el-menu

            class="el-menu-vertical-demo"
            @open="handleOpen"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/show">
              <i class="el-icon-s-home"></i>
              <span slot="title">我们的首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">基本管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/EmManager">用户管理</el-menu-item>
                <el-menu-item index="/SchManager">学校管理</el-menu-item>
                <el-menu-item index="/AgencyManger">中间商管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-cooperation"></i>
                <span slot="title">订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/SchOrder">与校订单</el-menu-item>
                <el-menu-item index="/AgencyOrder">与中间商订单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-marketing"></i>
                <span slot="title">其他展示</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/OrderShow">中间商</el-menu-item>
                <!--                <el-menu-item index="/SchShow">当前学校情况</el-menu-item>-->
                <!--                <el-menu-item index="/AgencyShow">当前中间商情况</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header class="app-header">
          <div style="width: 60px; cursor: pointer;"
               @click.prevent="toggleSideBar">
            <i v-show="!isCollapse" class="el-icon-d-arrow-left"/>
            <i v-show="isCollapse" class="el-icon-d-arrow-right"/>
          </div>
          <router-view name="top"/>
          <div class="app-header-userinfo" >
            <el-dropdown trigger="hover"
                         :hide-on-click="true">
              <span id="userLoginName" class="el-dropdown-link" style="color:white" >
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item divided
                                  @click.native="editUserFormVisible =true">用户编辑</el-dropdown-item>
                <el-dropdown-item divided
                                  @click.native="logout">退出登录</el-dropdown-item>
                <el-dropdown-item divided
                                  @click.native="deleUser">用户删除</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
            <el-dialog title="用户编辑" :visible.sync="editUserFormVisible" :before-close="dailogClose"
                       @open="loadingData" center width="40%" >
              <el-form :model="userEditform" ref="userEditform" :rules="rules"
                       label-width="10px"   >
                <el-row>
                  <el-col  :span="12">
                    <el-form-item  label="用户":label-width="textLabelWidth">
                      <el-input disabled v-model="userEditform.userName"/>
                    </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item >
                      <el-input type="hidden" v-model="userEditform.id"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="200">
                    <el-form-item prop="userPassword" label="密码":label-width="textLabelWidth"  style="width: 95%">
                      <el-input show-password v-model="userEditform.userPassword"
                                placeholder="不想修改就不用填写了"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="200">
                    <el-form-item prop="rePassword" label="确认密码" :label-width="textLabelWidth" >
                      <el-input show-password v-model="userEditform.rePassword"
                                placeholder="不想修改就不用填写了" style="width: 92%"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="200">
                    <el-form-item  label="员工id":label-width="textLabelWidth" >
                      <el-input type="text" v-model="userEditform.employeeId"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="200">
                    <el-form-item  STYLE="margin-left: 14PX" label="姓名":label-width="textLabelWidth">
                      <el-input type="text" v-model="userEditform.name"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="200">
                    <el-form-item  label="年龄":label-width="textLabelWidth" >
                      <el-input-number v-model="userEditform.age" :min="18" :max="100" label="描述文字"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="200">
                    <el-form-item STYLE="margin-left: 35PX" label="性别":label-width="textLabelWidth">
                      <template>
                        <el-radio v-model="userEditform.sex" label="M">男</el-radio>
                        <el-radio v-model="userEditform.sex" label="F">女</el-radio>
                      </template>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="200">
                    <el-form-item prop="telephone"  label="电话":label-width="textLabelWidth">
                      <el-input type="text" v-model="userEditform.telephone"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="200">
                    <el-form-item  STYLE="margin-left: 14PX" label="部门":label-width="textLabelWidth">
                      <el-input type="text" v-model="userEditform.department"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="200">
                    <el-form-item  label="生日" :label-width="textLabelWidth" style="width: 95%">
                      <el-date-picker style="width: 93%" placeholder="选择日期" v-model="userEditform.birthday" type="date"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="200">
                    <el-form-item style="margin-left: -15px" label="入职日期" :label-width="textLabelWidth">
                      <el-date-picker style="width: 88%" placeholder="选择日期" v-model="userEditform.joinDay" type="date"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="400">
                    <el-form-item  label="自我介绍":label-width="textLabelWidth" style="width: 95%">
                      <el-input type="textarea" v-model="userEditform.rsk" class="date_picker"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editUserFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit" >提交修改</el-button>
              </div>
            </el-dialog>
          </div>
        </el-header>
        <el-main class="app-body">
          <template>
            <router-view/>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'home',
  inject: ['reload'],
  mounted(){
    document.getElementById("userLoginName").innerHTML="你好："+this.$store.state.userName+"<i class=\"el-icon-arrow-down el-icon--right\"/>";
    this.$api.article.emManger('get',"emImageByUserName",{userName:this.$store.state.userName})
      .then((res) => {
        this.touxiang=res.emImagePath;
      })
  },
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.userEditform.userPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
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
      rules: {
        rePassword: [{validator: validatePass2, trigger: 'blur'}],
        telephone: [{validator: checkPhone, trigger: 'blur'}]
      },
      hideUpload: false,
      dialogImageUrl: '',
      dialogVisible: false,//图片预览弹窗
      formLabelWidth: '80px',
      limitNum: 1,
      form: {},
      touxiang:"",
      formLabelWidth: '100px',
      textLabelWidth: '70px',
      userEditform: {
        userName: '',
        userPassword: '',
        rePassword: '',
        employeeId:'',
        name:'',
        age:'',
        sex:'',
        telephone:'',
        department:'',
        birthday:'',
        joinDay:'',
        rsk:''
      },
      loading: false,
      name:'',
      userImageEditVisible:false,
      editUserFormVisible:false,
      imageUrl: '',
      username: '',
      isCollapse: false
    }
  },
  methods: {
    uploadTouXiang(){
      this.userImageEditVisible = true;
    },
    // 上传文件之前的钩子
    handleBeforeUpload (file) {
      if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$notify.warning({
          title: '警告',
          message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      let size = file.size / 1024 / 1024 / 2
      if (size > 2) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
      let fd = new FormData();//通过form数据格式来传
      fd.append("picFile", file); //传文件
      fd.append("userName", this.$store.state.userName); //传文件

      this.$api.article.emManger('post','userImage',fd).then((res) => {
        this.$api.article.emManger('get',"emImageByUserName",{userName:this.$store.state.userName})
          .then((res) => {
            this.touxiang=res.emImagePath;
          })

        this.userImageEditVisible = false;
      })
    },
    // 文件超出个数限制时的钩子
    handleExceed (files, fileList) {

    },
    // 文件列表移除文件时的钩子
    handleRemove (file, fileList) {
      this.hideUpload = fileList.length >= this.limitNum;

    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFile () {
      this.$refs.upload.submit()
    },
    imgChange (files, fileList) {
      this.hideUpload = fileList.length >= this.limitNum;
      if (fileList) {
        this.$refs.uploadElement.clearValidate();
      }
    },
    tocancel () {
      this.userImageEditVisible = false
    },
    deleUser(){
      if(this.$store.state.userName === '尚未登录的人'){
        this.$notify.info({
          title: '信息',
          message: '当前尚未登录'
        });
        return ;
      }
      this.$confirm('确认删除 请三思?', '提示', {})
        .then(() => {
          this.$api.article.emManger('delete','emByUserName',{userName:this.$store.state.userName})
            .then( (res) => {
              if (res.code === 200) {
                this.$notify.success({
                  title: '成功',
                  message: '删除修改成功！\n 请重新登录！'
                });

                sessionStorage.clear();
                this.$router.replace('/login')
              } else {
                this.$notify.error({
                  dangerouslyUseHTMLString: true,
                  title: '错误',
                  message: res.message
                })
              }
            })
        })
        .catch(() => { })
    },
    dailogClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    editSubmit(){
      if(this.$store.state.userName === '尚未登录的人'){
        this.$notify.info({
          title: '信息',
          message: '当前尚未登录'
        });
        return ;
      }
      var _this = this
      _this.$refs['userEditform'].validate((valid) => {
        if (valid) {
          this.$api.article.emManger('put','emByUserName',{employee:this.userEditform})
            .then( (res) => {
              if (res.code === 200) {
                this.$notify.success({
                  title: '成功',
                  message: '恭喜修改成功',

                });
                this.editUserFormVisible = false
                _this.reload()
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '抱歉修改失败'
                })
              }
            })
        } else {
          return false
        }
      })

    },
    loadingData () {
      var userName= this.$store.state.userName;
      this.$api.article.emManger('get','emByUserName',{userName:userName})
        .then( (res) => {
          if (res.code === 200) {

            this.userEditform = res.users[0]
          } else {
            this.$notify.error({
              title: '错误',
              message: '服务器拒绝您获取相关信息'
            })
          }
        })
    },
    toggleSideBar() {
      this.isCollapse = !this.isCollapse
    },
    logout: function () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          sessionStorage.clear();
          this.$router.replace('/login')
        })
        .catch(() => { })
    },
    handleOpen(key, keyPath) {

    },
    handleClose(key, keyPath) {

    },
    handleSelect(key, keyPath) {

    },
  }
}
</script>

<style>
  .hide .el-upload--picture-card {
    display: none;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .date_picker{
    width: 490px;
  }
  .app-side,.app-side-left,.app-side-logo{
    background-color:#545c64;
  }
  .app-header{
    background-color:#545c64;
  }
  .el-dropdown-link{
  }
</style>
