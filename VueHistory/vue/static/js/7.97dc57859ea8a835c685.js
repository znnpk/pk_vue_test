webpackJsonp([7],{"+RSF":function(e,t){},"62pU":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"EmManager",methods:{sexFormat:function(e,t){var a=e.sex,r="男女未知";switch(void 0===a&&(r="未缴费"),a){case"F":r="女";break;case"M":r="男"}return r},getList:function(){var e=this,t=this.data.filter(function(t,a){return t.name.includes(e.searchData)||t.userName.includes(e.searchData)});this.userLists=t.filter(function(t,a){return a<e.page*e.limit&&a>=e.limit*(e.page-1)}),this.total=t.length},handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.limit=e,this.getList()},handleCurrentChange:function(e){console.log("当前页: "+e),this.page=e,this.getList()},search:function(){this.page=1,this.getList()},clearFilter:function(){this.$refs.multipleTable.clearFilter(),this.searchData="",this.getList()},filterTag:function(e,t){return t.sex===e},filterHandler:function(e,t,a){var r=a.property;return console.log(r),t[r]===e},tableRowClassName:function(e){e.row;return e.rowIndex%2==1?"warning-row":"success-row"},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()}},data:function(){return{userLists:[],data:[],departmentList:[],limit:5,total:null,page:1,searchData:""}},created:function(){var e=this;this.$api.article.emManger("getUsers",{userName:this.$store.state.userName}).then(function(t){console.log(t),200===t.code?(console.log("获取数据成功"),e.data=t.userLists,e.departmentList=t.departmentList,e.getList()):(console.log("获取数据失败"),e.$notify.error({title:"错误",message:"服务器拒绝您获取相关信息"}))})}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{placeholder:"输入姓名或者用户名搜索进行搜索"},model:{value:e.searchData,callback:function(t){e.searchData=t},expression:"searchData"}},[e._v(">")])],1),e._v(" "),a("el-col",{attrs:{span:2}},[a("el-button",{attrs:{icon:"el-icon-search",circle:""},on:{click:e.search}})],1),e._v(" "),a("el-button",{attrs:{type:"info"},on:{click:e.clearFilter}},[e._v("清除所有筛选")])],1),e._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.userLists,"row-class-name":e.tableRowClassName,"default-sort":{prop:"userName",order:"descending"},border:"","tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"userName",sortable:"",label:"用户名",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.row.userName))])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",sortable:"",label:"姓名",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.row.name))])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"sex",label:"性别",sortable:"",width:"100",filters:[{text:"男",value:"男"},{text:"女",value:"女"}],"filter-method":e.filterTag,"filter-placement":"bottom-end"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:"男"===t.row.sex?"primary":"success","disable-transitions":""}},[e._v(e._s(t.row.sex))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"telephone",sortable:"",width:"180",label:"电话"}}),e._v(" "),a("el-table-column",{attrs:{prop:"department",label:"部门",sortable:"",width:"180","column-key":"department",filters:e.departmentList,"filter-method":e.filterHandler}}),e._v(" "),a("el-table-column",{attrs:{label:"自我介绍",width:"auto"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[e._v(e._s(t.row.rsk))]),e._v(" "),a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.row.shortRsk))])],1)])]}}])})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"hide-on-single-page":!0,background:"","current-page":e.page,"page-sizes":[5,10,25],"page-size":e.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var l=a("VU/8")(r,s,!1,function(e){a("+RSF"),a("q05c")},"data-v-3fe55438",null);t.default=l.exports},q05c:function(e,t){}});
//# sourceMappingURL=7.97dc57859ea8a835c685.js.map