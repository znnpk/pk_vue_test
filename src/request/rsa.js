

import  JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

const rsa = {
//JSEncrypt加密方法
  rsaEncode(pas,publicKey){
    //实例化jsEncrypt对象
    let jse = new JSEncrypt();
    //设置公钥
    jse.setPublicKey(publicKey);
    // console.log('加密：'+jse.encrypt(pas))
    return jse.encrypt(pas);
  },
//解密方法
  rsaDecode(pas,privateKey){
    let jse = new JSEncrypt();
    // 私钥
    jse.setPrivateKey(privateKey)
    // console.log('解密：'+jse.decrypt(pas))
    return jse.decrypt(pas);
  },
  rsaTest(){
    let serverRsaPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRsnciXRfr3vvsTN9t+U7UT/tA7t+niHk7Vy3aYnhabuGQqLdu8PFpnu8FUFYzarjpfq1hCX7oslw1v0PoGMrJDPwSqZq4ebpQM4evyUbn07Bp9IFGLJcYjqHgFK+1Zg1CRqrEDgG+Pn5CgdDYoBfWn9M+Pj4s+u5lUd3m00c6lwIDAQAB";
    let data = "123456dfefeaddfggiwoo";
    let encodeData = rsa.rsaEncode(data,serverRsaPublicKey);
    console.log(encodeData);

    let serverRsaPrivateKey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBANGydyJdF+ve++xM3235TtRP+0Du36eIeTtXLdpieFpu4ZCot27w8Wme7wVQVjNquOl+rWEJfuiyXDW/Q+gYyskM/BKpmrh5ulAzh6/JRufTsGn0gUYslxiOoeAUr7VmDUJGqsQOAb4+fkKB0NigF9af0z4+Piz67mVR3ebTRzqXAgMBAAECgYAlAegAiolkOTAgndh4oh0FXzAqX33dJTqv/Ey9U8+FtjfcvcnRrHgOedwZBfqQjG8h1hdnHrPlAUVAvwaO+YEf9D77ulPtq09I57sd5oT8dw9UbiTF7P7yUjg/0EfDnp7VthOS1LHnz1mNiQdYasGq/yBRHZGyxu5eV4W6G4pR4QJBAPrS4WxZXvUtH9/6mLaOER5aM+fIr38bHHqIwijj1eMZxUTlSZlxj42eitCZ/32YU2D9Di3xt/hijLJXGUNT23kCQQDWBk9bRsAaVQ13GPvx8b7CLc5XmGeJpwcp9CcSoOQyBQ4j9j3CJe3ERvl2DZpcZfnG15lVsT819cAlQfmUojKPAkEAsJF5PSPg0+mTMcIgdQqnhF1tgrJk0K6OKrhRLiXNMNS4aRqb6BfoPYKpJ9Xw5EIyF+msbK1nm8QMVZM45ouGyQJAHK7FzdbCggTqBA8OHNOoG//limm7XoBK/n1hCycSzf1NctZaWn2Yytg0MHUMPdvQyKw2OXzCmumvcY7Q8vF10wJAbpoj0zFiTflKdVQnV/Et46OYW0BenOnQiHjGkUKhwvlfRUhh4np56gK2TnYvdVWSJXqWY6e6goxX9bq/NoUgIQ==";
    console.log(rsa.rsaDecode(encodeData,serverRsaPrivateKey));

  }
}
export default {
  rsa,
}


