webpackJsonp([3],{"9bBU":function(e,t,i){i("mClu");var l=i("FeBl").Object;e.exports=function(e,t,i){return l.defineProperty(e,t,i)}},C4MV:function(e,t,i){e.exports={default:i("9bBU"),__esModule:!0}},LqM4:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=i("bOdI"),s=i.n(l),a=i("RRo+"),r=i.n(a),o={name:"home",inject:["reload"],mounted:function(){document.getElementById("userLoginName").innerHTML="你好："+this.$store.state.userName+'<i class="el-icon-arrow-down el-icon--right"/>',this.touxiang=this.$api.article.getImageForTouXiang("pkLogo.png")},data:function(){var e,t=this;return e={rules:{rePassword:[{validator:function(e,i,l){i!==t.userEditform.userPassword?l(new Error("两次输入密码不一致!")):l()},trigger:"blur"}],telephone:[{validator:function(e,t,i){var l=/^1[3|4|5|7|8][0-9]{9}$/;if(!t)return i();setTimeout(function(){r()(+t)?l.test(t)?i():i(new Error("电话号码格式不正确")):i(new Error("请输入数字值"))},100)},trigger:"blur"}]},hideUpload:!1,dialogImageUrl:"",dialogVisible:!1,formLabelWidth:"80px",limitNum:1,form:{},touxiang:""},s()(e,"formLabelWidth","100px"),s()(e,"textLabelWidth","70px"),s()(e,"userEditform",{userName:"",userPassword:"",rePassword:"",employeeId:"",name:"",age:"",sex:"",telephone:"",department:"",birthday:"",joinDay:"",rsk:""}),s()(e,"loading",!1),s()(e,"name",""),s()(e,"userImageEditVisible",!1),s()(e,"editUserFormVisible",!1),s()(e,"imageUrl",""),s()(e,"username",""),s()(e,"isCollapse",!1),e},methods:{uploadTouXiang:function(){alert("头像功能测试"),this.userImageEditVisible=!0},userImageUp:function(){var e=this.$api.article.getUpPathForTouXiang("userImageUp");return console.log(e),e},handleBeforeUpload:function(e){"image/png"!==e.type&&"image/gif"!==e.type&&"image/jpg"!==e.type&&"image/jpeg"!==e.type&&this.$notify.warning({title:"警告",message:"请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片"}),e.size/1024/1024/2>2&&this.$notify.warning({title:"警告",message:"图片大小必须小于2M"});var t=new FormData;t.append("picFile",e),console.log(t.get("picFile")),this.$api.article.upImage("em/userImageUp",t).then(function(e){})},handleExceed:function(e,t){},handleRemove:function(e,t){this.hideUpload=t.length>=this.limitNum},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},uploadFile:function(){this.$refs.upload.submit()},imgChange:function(e,t){this.hideUpload=t.length>=this.limitNum,t&&this.$refs.uploadElement.clearValidate()},tocancel:function(){this.userImageEditVisible=!1},deleUser:function(){var e=this;"尚未登录的人"!==this.$store.state.userName?this.$confirm("确认删除 请三思?","提示",{}).then(function(){e.$api.article.emManger("deleteUserByUserName",{userName:e.$store.state.userName}).then(function(t){console.log(t),200===t.code?(console.log("删除成功"),e.$notify.success({title:"成功",message:"删除修改成功！\n 请重新登录！"}),sessionStorage.removeItem("user"),e.$router.replace("/login")):(console.log("删除失败"),e.$notify.error({dangerouslyUseHTMLString:!0,title:"错误",message:t.message}))})}).catch(function(){}):this.$notify.info({title:"信息",message:"当前尚未登录"})},dailogClose:function(e){this.$confirm("确认关闭？").then(function(t){e()}).catch(function(e){})},editSubmit:function(){var e=this;if("尚未登录的人"!==this.$store.state.userName){var t=this;t.$refs.userEditform.validate(function(i){if(!i)return!1;e.$api.article.emManger("updateUserByUserName",{employee:e.userEditform}).then(function(i){console.log(i),200===i.code?(console.log("修改成功"),e.$notify.success({title:"成功",message:"恭喜修改成功"}),e.editUserFormVisible=!1,t.reload()):(console.log("修改失败"),e.$notify.error({title:"错误",message:"抱歉修改失败"}))})})}else this.$notify.info({title:"信息",message:"当前尚未登录"})},loadingData:function(){var e=this,t=this.$store.state.userName;this.$api.article.emManger("getUserByUserName",{userName:t}).then(function(t){console.log(t),200===t.code?(console.log("获取数据成功"),console.log(t.users[0]),e.userEditform=t.users[0]):(console.log("获取数据修改失败"),e.$notify.error({title:"错误",message:"服务器拒绝您获取相关信息"}))})},toggleSideBar:function(){this.isCollapse=!this.isCollapse},logout:function(){var e=this;this.$confirm("确认退出?","提示",{}).then(function(){sessionStorage.removeItem("user"),e.$router.replace("/login")}).catch(function(){})},handleOpen:function(e,t){console.log(e,t)},handleClose:function(e,t){console.log(e,t)},handleSelect:function(e,t){console.log(e,t)}}},n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app"},[i("el-container",[i("el-aside",{staticClass:"app-side app-side-left",class:e.isCollapse?"app-side-collapsed":"app-side-expanded"},[i("div",{staticClass:"app-side-logo",on:{click:e.uploadTouXiang}},[i("img",{attrs:{src:e.touxiang,width:(e.isCollapse,"60"),height:"60"}})]),e._v(" "),i("el-dialog",{attrs:{title:"上传头像",visible:e.userImageEditVisible,width:"30%",center:""},on:{"update:visible":function(t){e.userImageEditVisible=t}}},[i("el-form",{attrs:{model:e.form,enctype:"multipart/form-data"}},[i("el-form-item",{ref:"uploadElement",attrs:{"label-width":e.formLabelWidth}},[i("el-upload",{ref:"upload",class:{hide:e.hideUpload},attrs:{action:"#",accept:"image/png,image/gif,image/jpg,image/jpeg","list-type":"picture-card",limit:e.limitNum,"auto-upload":!1,"on-exceed":e.handleExceed,"before-upload":e.handleBeforeUpload,"on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,"on-change":e.imgChange}},[i("i",{staticClass:"el-icon-plus"})]),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),i("el-form-item",[i("el-row",[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.uploadFile}},[e._v("立即上传")]),e._v(" "),i("el-button",{attrs:{size:"small"},on:{click:e.tocancel}},[e._v("取消")])],1)],1)],1)],1),e._v(" "),i("div",[i("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{collapse:e.isCollapse,"background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b",router:""},on:{open:e.handleOpen}},[i("el-menu-item",{attrs:{index:"/show"}},[i("i",{staticClass:"el-icon-s-home"}),e._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[e._v("我们的首页")])]),e._v(" "),i("el-submenu",{attrs:{index:"2"}},[i("template",{slot:"title"},[i("i",{staticClass:"el-icon-s-custom"}),e._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[e._v("基本管理")])]),e._v(" "),i("el-menu-item-group",[i("el-menu-item",{attrs:{index:"/EmManager"}},[e._v("用户管理")]),e._v(" "),i("el-menu-item",{attrs:{index:"/SchManager"}},[e._v("学校管理")]),e._v(" "),i("el-menu-item",{attrs:{index:"/AgencyManger"}},[e._v("中间商管理")])],1)],2),e._v(" "),i("el-submenu",{attrs:{index:"3"}},[i("template",{slot:"title"},[i("i",{staticClass:"el-icon-s-cooperation"}),e._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[e._v("订单管理")])]),e._v(" "),i("el-menu-item-group",[i("el-menu-item",{attrs:{index:"/SchOrder"}},[e._v("与校订单")]),e._v(" "),i("el-menu-item",{attrs:{index:"/AgencyOrder"}},[e._v("与中间商订单")])],1)],2),e._v(" "),i("el-submenu",{attrs:{index:"4"}},[i("template",{slot:"title"},[i("i",{staticClass:"el-icon-s-marketing"}),e._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[e._v("其他展示")])]),e._v(" "),i("el-menu-item-group",[i("el-menu-item",{attrs:{index:"/OrderShow"}},[e._v("中间商")])],1)],2)],1)],1)],1),e._v(" "),i("el-container",[i("el-header",{staticClass:"app-header"},[i("div",{staticStyle:{width:"60px",cursor:"pointer"},on:{click:function(t){return t.preventDefault(),e.toggleSideBar(t)}}},[i("i",{directives:[{name:"show",rawName:"v-show",value:!e.isCollapse,expression:"!isCollapse"}],staticClass:"el-icon-d-arrow-left"}),e._v(" "),i("i",{directives:[{name:"show",rawName:"v-show",value:e.isCollapse,expression:"isCollapse"}],staticClass:"el-icon-d-arrow-right"})]),e._v(" "),i("router-view",{attrs:{name:"top"}}),e._v(" "),i("div",{staticClass:"app-header-userinfo"},[i("el-dropdown",{attrs:{trigger:"hover","hide-on-click":!0}},[i("span",{staticClass:"el-dropdown-link",staticStyle:{color:"white"},attrs:{id:"userLoginName"}}),e._v(" "),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{attrs:{divided:""},nativeOn:{click:function(t){e.editUserFormVisible=!0}}},[e._v("用户编辑")]),e._v(" "),i("el-dropdown-item",{attrs:{divided:""},nativeOn:{click:function(t){return e.logout(t)}}},[e._v("退出登录")]),e._v(" "),i("el-dropdown-item",{attrs:{divided:""},nativeOn:{click:function(t){return e.deleUser(t)}}},[e._v("用户删除")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"用户编辑",visible:e.editUserFormVisible,"before-close":e.dailogClose,center:"",width:"40%"},on:{"update:visible":function(t){e.editUserFormVisible=t},open:e.loadingData}},[i("el-form",{ref:"userEditform",attrs:{model:e.userEditform,rules:e.rules,"label-width":"10px"}},[i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"用户","label-width":e.textLabelWidth}},[i("el-input",{attrs:{disabled:""},model:{value:e.userEditform.userName,callback:function(t){e.$set(e.userEditform,"userName",t)},expression:"userEditform.userName"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",[i("el-input",{attrs:{type:"hidden"},model:{value:e.userEditform.id,callback:function(t){e.$set(e.userEditform,"id",t)},expression:"userEditform.id"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:200}},[i("el-form-item",{staticStyle:{width:"95%"},attrs:{prop:"userPassword",label:"密码","label-width":e.textLabelWidth}},[i("el-input",{attrs:{"show-password":"",placeholder:"不想修改就不用填写了"},model:{value:e.userEditform.userPassword,callback:function(t){e.$set(e.userEditform,"userPassword",t)},expression:"userEditform.userPassword"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:200}},[i("el-form-item",{attrs:{prop:"rePassword",label:"确认密码","label-width":e.textLabelWidth}},[i("el-input",{staticStyle:{width:"92%"},attrs:{"show-password":"",placeholder:"不想修改就不用填写了"},model:{value:e.userEditform.rePassword,callback:function(t){e.$set(e.userEditform,"rePassword",t)},expression:"userEditform.rePassword"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:200}},[i("el-form-item",{attrs:{label:"员工id","label-width":e.textLabelWidth}},[i("el-input",{attrs:{type:"text"},model:{value:e.userEditform.employeeId,callback:function(t){e.$set(e.userEditform,"employeeId",t)},expression:"userEditform.employeeId"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:200}},[i("el-form-item",{attrs:{STYLE:"margin-left: 14PX",label:"姓名","label-width":e.textLabelWidth}},[i("el-input",{attrs:{type:"text"},model:{value:e.userEditform.name,callback:function(t){e.$set(e.userEditform,"name",t)},expression:"userEditform.name"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:200}},[i("el-form-item",{attrs:{label:"年龄","label-width":e.textLabelWidth}},[i("el-input-number",{attrs:{min:18,max:100,label:"描述文字"},model:{value:e.userEditform.age,callback:function(t){e.$set(e.userEditform,"age",t)},expression:"userEditform.age"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:200}},[i("el-form-item",{attrs:{STYLE:"margin-left: 35PX",label:"性别","label-width":e.textLabelWidth}},[[i("el-radio",{attrs:{label:"M"},model:{value:e.userEditform.sex,callback:function(t){e.$set(e.userEditform,"sex",t)},expression:"userEditform.sex"}},[e._v("男")]),e._v(" "),i("el-radio",{attrs:{label:"F"},model:{value:e.userEditform.sex,callback:function(t){e.$set(e.userEditform,"sex",t)},expression:"userEditform.sex"}},[e._v("女")])]],2)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:200}},[i("el-form-item",{attrs:{prop:"telephone",label:"电话","label-width":e.textLabelWidth}},[i("el-input",{attrs:{type:"text"},model:{value:e.userEditform.telephone,callback:function(t){e.$set(e.userEditform,"telephone",t)},expression:"userEditform.telephone"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:200}},[i("el-form-item",{attrs:{STYLE:"margin-left: 14PX",label:"部门","label-width":e.textLabelWidth}},[i("el-input",{attrs:{type:"text"},model:{value:e.userEditform.department,callback:function(t){e.$set(e.userEditform,"department",t)},expression:"userEditform.department"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:200}},[i("el-form-item",{staticStyle:{width:"95%"},attrs:{label:"生日","label-width":e.textLabelWidth}},[i("el-date-picker",{staticStyle:{width:"93%"},attrs:{placeholder:"选择日期",type:"date"},model:{value:e.userEditform.birthday,callback:function(t){e.$set(e.userEditform,"birthday",t)},expression:"userEditform.birthday"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:200}},[i("el-form-item",{staticStyle:{"margin-left":"-15px"},attrs:{label:"入职日期","label-width":e.textLabelWidth}},[i("el-date-picker",{staticStyle:{width:"88%"},attrs:{placeholder:"选择日期",type:"date"},model:{value:e.userEditform.joinDay,callback:function(t){e.$set(e.userEditform,"joinDay",t)},expression:"userEditform.joinDay"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:400}},[i("el-form-item",{staticStyle:{width:"95%"},attrs:{label:"自我介绍","label-width":e.textLabelWidth}},[i("el-input",{staticClass:"date_picker",attrs:{type:"textarea"},model:{value:e.userEditform.rsk,callback:function(t){e.$set(e.userEditform,"rsk",t)},expression:"userEditform.rsk"}})],1)],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.editUserFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.editSubmit}},[e._v("提交修改")])],1)],1)],1)],1),e._v(" "),i("el-main",{staticClass:"app-body"},[[i("router-view")]],2)],1)],1)],1)},staticRenderFns:[]};var d=i("VU/8")(o,n,!1,function(e){i("m097")},null,null);t.default=d.exports},bOdI:function(e,t,i){"use strict";t.__esModule=!0;var l,s=i("C4MV"),a=(l=s)&&l.__esModule?l:{default:l};t.default=function(e,t,i){return t in e?(0,a.default)(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},m097:function(e,t){},mClu:function(e,t,i){var l=i("kM2E");l(l.S+l.F*!i("+E39"),"Object",{defineProperty:i("evD5").f})}});
//# sourceMappingURL=3.7006e7251b930eac58c5.js.map