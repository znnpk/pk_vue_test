webpackJsonp([9],{"9Lfz":function(t,e){},"PLv/":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r("RRo+"),c=r.n(s),l=r("Wxq9"),a={inject:["reload"],name:"SchPrjManger",mounted:function(){},methods:{saveSchPrj:function(){var t=this,e=this;console.log(this.schPrjAddForm),this.$refs.schPrjAddForm.validate(function(r){if(!r)return!1;t.$api.article.schPrjManger("schPrjSave",{schPrjAddForm:t.schPrjAddForm}).then(function(r){t.$notify.success({title:"成功",message:"记录已上传"}),t.schPrjAddFormVisible=!1,e.reload()})})},handleChange:function(t){},pageList:function(){this.data=listJson.list,this.dateList=listJson.dateList,this.getList()},getList:function(){var t=this,e=this.data.filter(function(e,r){return e.schPrjId==t.searchData||e.schPrjBizStf.includes(t.searchData)||e.schPrjName.includes(t.searchData)||e.schPrjSch.includes(t.searchData)});this.list=e.filter(function(e,r){return r<t.page*t.limit&&r>=t.limit*(t.page-1)}),this.total=e.length},handleSizeChange:function(t){console.log("每页 "+t+" 条"),this.limit=t,this.getList()},handleCurrentChange:function(t){console.log("当前页: "+t),this.page=t,this.getList()},search:function(){this.page=1,this.getList()},dailogClose:function(t){this.$confirm("确认关闭？").then(function(e){t()}).catch(function(t){})},editPowerCheck:function(t){return t.schPrjBizStf!=this.userName},editSchPrjForVisible:function(t){var e=this;this.schPrjEditFormVisible=!0,this.$api.article.schPrjManger("getSchPrjBySchPrjId",{schPrjId:t.schPrjId}).then(function(t){200===t.code?(e.schPrjEditForm=t.schPrjEditForm,console.log("学校项目信息获取成功")):(console.log("学校项目数据获取失败"),e.$notify.error({title:"错误",message:"学校项目数据获取失败 稍后重试"}))})},updateSchPrj:function(){var t=this,e=this;this.schsForSelect.forEach(function(e){e.label==t.schPrjEditForm.schPrjSch&&(t.schPrjEditForm.schPrjSch=e.value)}),console.log(this.schPrjEditForm),this.$refs.schPrjEditForm.validate(function(r){if(!r)return!1;t.$api.article.schPrjManger("updateSchPrjBySchPrjId",{schPrjEditForm:t.schPrjEditForm}).then(function(r){t.$notify.success({title:"成功",message:"记录修改成功"}),t.schPrjEditFormVisible=!1,e.reload()})})},deleteSchPrj:function(t){var e=this;this.$confirm("确认删除当前这条记录？").then(function(r){e.$api.article.schPrjManger("deleteSchPrjBySchPrjId",{schPrjId:t.schPrjId}).then(function(t){200===t.code?(console.log("删除成功"),e.$notify.success({title:"成功",message:"删除成功"})):(console.log("删除失败"),e.$notify.error({title:"错误",message:"删除失败"})),e.reload()})}).catch(function(t){})},clearFilter:function(){this.$refs.schsShowTable.clearFilter(),this.searchData="",this.getList()},formatter:function(t,e){return t.address},filterTag:function(t,e){return e.schCorpIndiv===t},schInstFilter:function(t,e,r){var s=!1;return e[r.property].forEach(function(e){e.name==t&&(s=!0)}),s},filterHandler:function(t,e,r){return e[r.property]===t},toggleSelection:function(t){var e=this;t?t.forEach(function(t){e.$refs.schsShowTable.toggleRowSelection(t)}):this.$refs.schsShowTable.clearSelection()},handleSelectionChange:function(t){this.multipleSelection=t},tableRowClassName:function(t){return t.row.schPrjBizStf==this.userName?"success-row":"warning-row"},changeSchPrincipal:function(){var t=this;this.schsForDetail.forEach(function(e){e.schId==t.schPrjAddForm.schPrjSch&&(t.schPrjAddForm.schPrjSchPrincipal=e.schContactor,t.schPrjAddForm.schPrjSchPrincipalTele=e.schContactorTele)})},changeSchPrincipalForEdit:function(){var t=this;this.schsForDetail.forEach(function(e){e.schId==t.schPrjEditForm.schPrjSch&&(t.schPrjEditForm.schPrjSchPrincipal=e.schContactor,t.schPrjEditForm.schPrjSchPrincipalTele=e.schContactorTele)})},getSchNames:function(){var t=this;"尚未登录的人"==this.$store.state.userName?(this.$notify.error({title:"错误",message:"当前可能尚未登录 不可操作订单"}),this.schPrjAddFormVisible=!1,this.schPrjEditFormVisible=!1):(this.schPrjAddForm.schPrjBizStf=this.$store.state.userName,this.schPrjEditForm.schPrjBizStf=this.$store.state.userName),this.$api.article.schManger("schNamesGet",{userName:this.$store.state.userName}).then(function(e){t.schsForSelect=e.schsForSelect,t.schsForDetail=e.schsForDetail})}},data:function(){return{userName:[],schsForDetail:[],schsForSelect:[],options:l.regionData,selectedOptions:[],rules:{rePassword:[{validator:"test",trigger:"blur"}],schPrjContactTele:[{required:!0,validator:function(t,e,r){var s=/^1[3|4|5|7|8][0-9]{9}$/;if(!e)return r();setTimeout(function(){c()(+e)?s.test(e)?r():r(new Error("电话号码格式不正确")):r(new Error("请输入数字值"))},100)},trigger:"blur"}]},textLabelWidth:"100px",checkList:[],schPrjLists:[],schPrjEditForm:{schPrjId:"",schPrjBizStf:"",schPrjName:"",schPrjCapital:"",schPrjSch:"",schPrjBizContent:"",schPrjSchPrincipal:"",schPrjSchPrincipalTele:"",schPrjStartTm:"",schPrjEndTm:"",schPrjShortRsk:"",schPrjRsk:""},schPrjAddForm:{schPrjId:"",schPrjBizStf:"",schPrjName:"",schPrjCapital:"",schPrjSch:"",schPrjBizContent:"",schPrjSchPrincipal:"",schPrjSchPrincipalTele:"",schPrjStartTm:"",schPrjEndTm:"",schPrjShortRsk:"",schPrjRsk:""},schPrjEditFormVisible:!1,schPrjAddFormVisible:!1,formLabelWidth:"120px",list:[],data:[],limit:5,total:null,page:1,searchData:""}},created:function(){var t=this;this.$api.article.schPrjManger("getSchPrjs",{userName:this.$store.state.userName}).then(function(e){console.log(e),t.userName=t.$store.state.userName,t.data=e.schPrjLists,console.log(t.data),t.getList()})}},i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-row",[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{placeholder:"校方项目编号,绑定账户,项目名称,项目学校的单项搜索"},model:{value:t.searchData,callback:function(e){t.searchData=e},expression:"searchData"}},[t._v(">")])],1),t._v(" "),r("el-col",{attrs:{span:2}},[r("el-button",{attrs:{icon:"el-icon-search",circle:""},on:{click:t.search}})],1),t._v(" "),r("el-button",{attrs:{type:"info"},on:{click:t.clearFilter}},[t._v("清除所有过滤器")]),t._v(" "),r("el-button",{attrs:{type:"success",round:""},on:{click:function(e){t.schPrjAddFormVisible=!0}}},[t._v("新增")])],1),t._v(" "),r("el-dialog",{attrs:{title:"校方项目新增",visible:t.schPrjAddFormVisible,width:"45%","before-close":t.dailogClose,center:""},on:{"update:visible":function(e){t.schPrjAddFormVisible=e},open:t.getSchNames}},[r("el-form",{ref:"schPrjAddForm",attrs:{model:t.schPrjAddForm,rules:t.rules,"label-width":"80px"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"绑定账户"}},[r("el-input",{staticStyle:{width:"30%"},attrs:{disabled:""},model:{value:t.schPrjAddForm.schPrjBizStf,callback:function(e){t.$set(t.schPrjAddForm,"schPrjBizStf",e)},expression:"schPrjAddForm.schPrjBizStf"}})],1)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"项目名称"}},[r("el-input",{staticStyle:{width:"70%"},model:{value:t.schPrjAddForm.schPrjName,callback:function(e){t.$set(t.schPrjAddForm,"schPrjName",e)},expression:"schPrjAddForm.schPrjName"}})],1)],1),t._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"项目资金"}},[r("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"单位:万元"},model:{value:t.schPrjAddForm.schPrjCapital,callback:function(e){t.$set(t.schPrjAddForm,"schPrjCapital",e)},expression:"schPrjAddForm.schPrjCapital"}})],1)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"项目学校"}},[[r("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:t.changeSchPrincipal},model:{value:t.schPrjAddForm.schPrjSch,callback:function(e){t.$set(t.schPrjAddForm,"schPrjSch",e)},expression:"schPrjAddForm.schPrjSch"}},t._l(t.schsForSelect,function(t){return r("el-option",{key:t.value,staticStyle:{width:"70%"},attrs:{label:t.label,value:t.value}})}),1)]],2)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"校方负责人"}},[r("el-input",{staticStyle:{width:"70%"},attrs:{disabled:""},model:{value:t.schPrjAddForm.schPrjSchPrincipal,callback:function(e){t.$set(t.schPrjAddForm,"schPrjSchPrincipal",e)},expression:"schPrjAddForm.schPrjSchPrincipal"}})],1)],1),t._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"校方负责人电话"}},[r("el-input",{staticStyle:{width:"50%"},attrs:{disabled:""},model:{value:t.schPrjAddForm.schPrjSchPrincipalTele,callback:function(e){t.$set(t.schPrjAddForm,"schPrjSchPrincipalTele",e)},expression:"schPrjAddForm.schPrjSchPrincipalTele"}})],1)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"开始时间"}},[r("el-date-picker",{attrs:{type:"date"},model:{value:t.schPrjAddForm.schPrjStartTm,callback:function(e){t.$set(t.schPrjAddForm,"schPrjStartTm",e)},expression:"schPrjAddForm.schPrjStartTm"}})],1)],1),t._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"结束时间"}},[r("el-date-picker",{attrs:{type:"date"},model:{value:t.schPrjAddForm.schPrjEndTm,callback:function(e){t.$set(t.schPrjAddForm,"schPrjEndTm",e)},expression:"schPrjAddForm.schPrjEndTm"}})],1)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"业务内容"}},[r("el-input",{staticStyle:{width:"78%"},model:{value:t.schPrjAddForm.schPrjBizContent,callback:function(e){t.$set(t.schPrjAddForm,"schPrjBizContent",e)},expression:"schPrjAddForm.schPrjBizContent"}})],1)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:24}},[r("el-form-item",{staticStyle:{width:"80%"},attrs:{label:"备注"}},[r("el-input",{attrs:{type:"textarea"},model:{value:t.schPrjAddForm.schPrjRsk,callback:function(e){t.$set(t.schPrjAddForm,"schPrjRsk",e)},expression:"schPrjAddForm.schPrjRsk"}})],1)],1)],1)],1),t._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.schPrjAddFormVisible=!1}}},[t._v("取 消")]),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:t.saveSchPrj}},[t._v("提 交")])],1)],1),t._v(" "),r("el-table",{ref:"schsShowTable",staticStyle:{width:"100%"},attrs:{data:t.list,"row-class-name":t.tableRowClassName,"default-sort":{prop:"schPrjId",order:"descending"},border:"","tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[r("el-table-column",{attrs:{sortable:"",prop:"schPrjId",label:"校方项目编号",width:"auto"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[r("el-tag",{attrs:{size:"medium"}},[t._v(t._s(e.row.schPrjId))])],1)]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"schPrjBizStf",label:"绑定账户",width:"90"}}),t._v(" "),r("el-table-column",{attrs:{prop:"schPrjName",label:"项目名称",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[r("el-tag",{attrs:{size:"medium"}},[t._v(t._s(e.row.schPrjName))])],1)]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"schPrjCapital",label:"项目资金",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[r("el-tag",{attrs:{size:"medium"}},[t._v(t._s(e.row.schPrjCapital)+"万元")])],1)]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"schPrjSch",label:"项目学校",width:"auto"}}),t._v(" "),r("el-table-column",{attrs:{prop:"schPrjBizContent",label:"业务内容",width:"90"}}),t._v(" "),r("el-table-column",{attrs:{prop:"schPrjSchPrincipal",label:"校方负责人",width:"90"}}),t._v(" "),r("el-table-column",{attrs:{prop:"schPrjSchPrincipalTele",label:"校方负责人电话",width:"90"}}),t._v(" "),r("el-table-column",{attrs:{sortable:"",prop:"schPrjStartTm",label:"开始时间",width:"auto"}}),t._v(" "),r("el-table-column",{attrs:{sortable:"",prop:"schPrjEndTm",label:"结束时间",width:"auto"}}),t._v(" "),r("el-table-column",{attrs:{prop:"schPrjShortRsk",label:"备注",width:"auto"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-popover",{attrs:{trigger:"hover",placement:"top"}},[r("p",[t._v(t._s(e.row.schPrjRsk))]),t._v(" "),r("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[r("el-tag",{attrs:{size:"medium"}},[t._v(t._s(e.row.schPrjShortRsk))])],1)])]}}])}),t._v(" "),r("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{disabled:t.editPowerCheck(e.row),type:"primary",icon:"el-icon-edit",circle:"",size:"small"},on:{click:function(r){return t.editSchPrjForVisible(e.row)}}}),t._v(" "),r("el-button",{attrs:{disabled:t.editPowerCheck(e.row),type:"danger",icon:"el-icon-delete",circle:"",size:"small"},on:{click:function(r){return t.deleteSchPrj(e.row)}}})]}}])})],1),t._v(" "),r("el-dialog",{attrs:{title:"校方项目编辑",visible:t.schPrjEditFormVisible,width:"45%","before-close":t.dailogClose,center:""},on:{"update:visible":function(e){t.schPrjEditFormVisible=e},open:t.getSchNames}},[r("el-form",{ref:"schPrjEditForm",attrs:{model:t.schPrjEditForm,"label-width":"80px"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"绑定账户"}},[r("el-input",{staticStyle:{width:"30%"},attrs:{disabled:""},model:{value:t.schPrjEditForm.schPrjBizStf,callback:function(e){t.$set(t.schPrjEditForm,"schPrjBizStf",e)},expression:"schPrjEditForm.schPrjBizStf"}})],1)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"项目名称"}},[r("el-input",{staticStyle:{width:"70%"},model:{value:t.schPrjEditForm.schPrjName,callback:function(e){t.$set(t.schPrjEditForm,"schPrjName",e)},expression:"schPrjEditForm.schPrjName"}})],1)],1),t._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"项目资金"}},[r("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"单位:万元"},model:{value:t.schPrjEditForm.schPrjCapital,callback:function(e){t.$set(t.schPrjEditForm,"schPrjCapital",e)},expression:"schPrjEditForm.schPrjCapital"}})],1)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"项目学校"}},[[r("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:t.changeSchPrincipalForEdit},model:{value:t.schPrjEditForm.schPrjSch,callback:function(e){t.$set(t.schPrjEditForm,"schPrjSch",e)},expression:"schPrjEditForm.schPrjSch"}},t._l(t.schsForSelect,function(t){return r("el-option",{key:t.value,staticStyle:{width:"70%"},attrs:{label:t.label,value:t.value}})}),1)]],2)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"校方负责人"}},[r("el-input",{staticStyle:{width:"70%"},attrs:{disabled:""},model:{value:t.schPrjEditForm.schPrjSchPrincipal,callback:function(e){t.$set(t.schPrjEditForm,"schPrjSchPrincipal",e)},expression:"schPrjEditForm.schPrjSchPrincipal"}})],1)],1),t._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"校方负责人电话"}},[r("el-input",{staticStyle:{width:"50%"},attrs:{disabled:""},model:{value:t.schPrjEditForm.schPrjSchPrincipalTele,callback:function(e){t.$set(t.schPrjEditForm,"schPrjSchPrincipalTele",e)},expression:"schPrjEditForm.schPrjSchPrincipalTele"}})],1)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"开始时间"}},[r("el-date-picker",{attrs:{type:"date"},model:{value:t.schPrjEditForm.schPrjStartTm,callback:function(e){t.$set(t.schPrjEditForm,"schPrjStartTm",e)},expression:"schPrjEditForm.schPrjStartTm"}})],1)],1),t._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"结束时间"}},[r("el-date-picker",{attrs:{type:"date"},model:{value:t.schPrjEditForm.schPrjEndTm,callback:function(e){t.$set(t.schPrjEditForm,"schPrjEndTm",e)},expression:"schPrjEditForm.schPrjEndTm"}})],1)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"业务内容"}},[r("el-input",{staticStyle:{width:"78%"},model:{value:t.schPrjEditForm.schPrjBizContent,callback:function(e){t.$set(t.schPrjEditForm,"schPrjBizContent",e)},expression:"schPrjEditForm.schPrjBizContent"}})],1)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:24}},[r("el-form-item",{staticStyle:{width:"80%"},attrs:{label:"备注"}},[r("el-input",{attrs:{type:"textarea"},model:{value:t.schPrjEditForm.schPrjRsk,callback:function(e){t.$set(t.schPrjEditForm,"schPrjRsk",e)},expression:"schPrjEditForm.schPrjRsk"}})],1)],1)],1)],1),t._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.schPrjEditFormVisible=!1}}},[t._v("取 消")]),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:t.updateSchPrj}},[t._v("提 交")])],1)],1),t._v(" "),r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"hide-on-single-page":!0,background:"","current-page":t.page,"page-sizes":[1,2,5,10],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var o=r("VU/8")(a,i,!1,function(t){r("VcmR"),r("9Lfz")},"data-v-162d6f56",null);e.default=o.exports},VcmR:function(t,e){}});
//# sourceMappingURL=9.f1c796f10dd79f20dc2b.js.map