/**
 * 接口域名的管理
 * 通过base.js来管理我们的接口域名，不管有多少个都可以通过这里进行接口的定义。即使修改起来，也是很方便的。
 */
const base = {
  devHome: 'http://192.168.8.104:8443/pkServer', //家里的dev
  prodHome: 'http://192.168.8.104:8080/pkServer', //家里的prod
  devCom:'http://192.168.1.145:8443/pkServer', //公司的dev
  testCom:'http://192.168.1.145:8080/pkServer', //公司自己的prod
  proDCom:'http://192.168.1.142:8080/pkServer', //公司的生产
  homeHost:'http://localhost:8443/pkServer', //家里的本地的home测试
  aliyunHost:'http://47.105.126.176:9595/pkServer', //阿里云服务器
  // aliyunHost:'api/pkServer', //阿里云服务器
}
export default base;

