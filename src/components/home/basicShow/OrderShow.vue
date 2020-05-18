<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-18 17:38:14
 * @LastEditTime: 2019-10-21 09:28:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="mapIndex">
    <div class="title">
      <span>教育资源信息化大数据分析</span>
    </div>
    <div class="contener">
      <div class="l-content box">
        <div>
          <section v-for="(item, index) in personList" :key="index">
            <img :src="item.userimgPath">
            <div>
              <p>人员名称：{{item.PrjBizStf}}</p>
              <p>项目名称：{{item.PrjName}}</p>
              <p>项目金额：{{item.PrjCapital}}</p>
            </div>
          </section>
        </div>
        <span class="i1"></span>
        <span class="i2"></span>
        <span class="i3"></span>
        <span class="i4"></span>
      </div>
      <div class="c-content">
        <div class="map" style="height: 100%; width: 100%;">
          <Map></Map>
        </div>
<!--        <div class="bottom">-->
<!--          学校师生总量：-->
<!--          <div>-->
<!--            <span>9</span>-->
<!--            <span>7</span>-->
<!--            <span>8</span>-->
<!--            <span>3</span>-->
<!--            <span>4</span>-->
<!--            <span>.</span>-->
<!--            <span>5</span>-->
<!--            <span>3</span>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div class="r-content">
        <section class="userBox box" v-for="(item, index) in rightList" :key="index">
          <div>
            <i class="line1">{{item.name}}</i>
<!--            <aside class="line2"></aside>-->
            <i class="line3">{{item.num}}</i>
          </div>
          <span class="i1"></span>
          <span class="i2"></span>
          <span class="i3"></span>
          <span class="i4"></span>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import Map from './mapAgency'
export default {
  components: {
    Map
  },
  mounted () {
    // var rightList = [
    //   {
    //     name: '用户',
    //     num: 1888
    //   }
    // ];
    // var bottonData = [1,2,3,4,5,6];
    //
    // var  personList = [
    //   {
    //     name: '品客科技',
    //     proName: '衡水一中',
    //     num: '100万',
    //     imgPath: '/static/images/pkLogo.png'
    //   },
    //   {
    //     name: '品客科技',
    //     proName: '衡水一中',
    //     num: '100万',
    //     imgPath: ''
    //   }
    // ];


    this.$api.article.screenShow('get','bigScreen',{userName:this.$store.state.userName})
      .then( (res) => {
        this.personList = res.personList;
        this.rightList = res.rightList;
      });
    // this.bottonData = bottonData;
  },
  data () {
    return {
      value: 1,
      rightList: [],
      personList: []
    }
  },

  methods: {
    fd () {
      let el = document.documentElement
      if (this.value) {
        this.value = 0
        el.requestFullscreen && el.requestFullscreen()
        // 兼容火狐
        el.mozRequestFullScreen && el.mozRequestFullScreen()

        // 兼容谷歌等
        el.webkitRequestFullscreen && el.webkitRequestFullscreen()

        // 兼容IE,只能写msRequestFullscreen
        try {
          el.msRequestFullscreen && el.msRequestFullscreen()
        } catch (e) {}
      } else {
        this.value = 1
        if (document.exitFullScreen) {
          document.exitFullscreen()
        }
        // 兼容火狐
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        }
        // 兼容谷歌等
        if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
        // 兼容IE
        try {
          if (document.webkitExitFullscreen) {
            document.msExitFullscreen()
          }
        } catch (e) {}
      }
    }
  }
}
</script>

<style lang="less" >
  .mapIndex {
    height: 100%;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #0A0F32;
    background-image: url('../../../assets/images/screen/bg3.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .title {
      height: 80px;
      text-align: center;
      background-image: url("../../../assets/images/screen/bg5.png");
      background-repeat: no-repeat;
      background-size:  auto 100%;
      background-position: center;
      > span {
        font-size: 24px;
        position: relative;
        top: 30px;
        line-height: 50px;
        color: #fff;
      }
    }

    .contener {
      width: 100%;
      height: calc(100% - 100px);
      padding: 10px;
      display: flex;
      .l-content {
        width: 24%;
        flex-grow: 0;
        flex-shrink: 0;
        padding: 20px 10px;
        > div {
          height: 100%;
          width: 100%;
          overflow-y: auto;
          > section {
            display: flex;
            padding: 10px;
            align-items: center;
            color: #9bdef0;
            font-size: 16px;
            div {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              p {
                margin: 8px 0;
              }
            }
            img {
              width: 100px;
              height: 120px;
              /*background: red;*/
              margin-right: 10px;
            }
          }
        }
      }
      .c-content {
        width: 348px;
        height: 100%;
        flex-grow: 1;
        flex-shrink: 1;
        padding: 10px;
        position: relative;
        .bottom {
          position: absolute;
          bottom: 50px;
          left: 30px;
          color: #f0f0f0;
          font-size: 16px;
          line-height: 180%;
          span {
            height: 30px;
            display: inline-block;
            /*margin: 0 5px 0 0;*/
            float: left;
            text-align: center;
            line-height: 30px;
            width: 24px;
            font-size: 22px;
            background: #1e4586;
          }
        }
      }
      .r-content {
        width: 20%;
        margin-right: 20px;
        height: 100%;
        flex-grow: 0;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .userBox {
          height: 22%;
          > div {
            height: 60%;
            text-align: center;
            padding: 10% 0;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .line1 {
              font-family: MicrosoftYaHei;
              font-size: 32px;
              color: #9bdef0;
            }
            .line2 {
              height: 20px !important;
              width: 100%;
              background-color: red;
              background-image: url('../../../assets/images/screen/bg2.png');
              background-size: 100% auto;
            }
            .line3 {
              font-family: SourceHanSansCN-Medium;
              font-size: 50px;
              color: #00f1ff;
            }
          }
        }
      }

    }

  }

  .box {
    position: relative;
    border: solid 1px rgba(3, 159, 222, .4);
    .i1 {
      height: 10px;
      width: 10px;
      position: absolute;
      left: -2px;
      top: -2px;
      z-index: 10;
      background-image: url('../../../assets/images/screen/角-左上.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .i2 {
      height: 10px;
      width: 10px;
      position: absolute;
      right: -2px;
      top: -2px;
      z-index: 10;
      background-image: url('../../../assets/images/screen/角-右上.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .i3 {
      height: 10px;
      width: 10px;
      position: absolute;
      left: -2px;
      bottom: -2px;
      z-index: 10;
      background-image: url('../../../assets/images/screen/角-左下.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .i4 {
      height: 10px;
      width: 10px;
      position: absolute;
      z-index: 10;
      right: -2px;
      bottom: -2px;
      background-image: url('../../../assets/images/screen/角-右下.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }

</style>
