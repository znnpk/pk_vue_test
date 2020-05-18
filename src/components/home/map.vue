<template>
  <div id="chart" style="width:100%; height: 100%">
  </div>
</template>

<script>
import geoJson from '../../assets/js/china.geojson'
import echarts from 'echarts'

export default {
  mounted () {
    this.dataInt()
  },
  methods: {
    dataInt () {
      var getMapPointSeries = (_data, color) => {
        var data = _data.values;
        return [
          {
            name: _data.name,
            type: 'scatter',
            coordinateSystem: 'geo',
            data: data,
            symbolSize: 4,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: color
              }
            }
          },
          {
            // name: `${_data.name}  Top 3`,
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: data,
            symbolSize: 10,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
                color: '#eee'
              }
            },
            zlevel: 2,
            itemStyle: {
              normal: {
                color: color,
                fontWeight: 100,
                shadowBlur: 10,
                shadowColor: '#333'
              }
            }
          }
        ]
      }

      var mapPoint = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0)',
          textStyle: {
            color: 'red',
            fontSize: 12
          },
          formatter: function (params) {
            return `<div class='itemImg'>
                      订单数量：${params.data.orderSum}<br />
                      订单总资金: ${params.data.orderAmtNum}万元
                      </div>`
          },
          show: true  //是否显示点的信息
        },
        geo: {
          map: 'china',
          coordinateSystem: 'geo',
          label: {
            normal: {
              show: true,
              color: '#113a85'
            },
            emphasis: {
              show: true,
              color: '#f0f0f0'
            }
          },
          roam: true,
          mapType: 'china',
          itemStyle: {
            normal: {
              areaColor: '#042461',
              borderColor: '#113a85'
            },
            emphasis: {
              areaColor: '#113a85'
            }
          }
        },
        series: []
      }

      // var mapData = [
      //   {
      //     name: '中间商',
      //     values: [
      //       {
      //         name: '欧普',
      //         value: [125.03, 46.58],
      //         orderAmtNum :'89.9',
      //         orderSum : '3',
      //       },
      //       {
      //         name: '欧明',
      //         value: [117.312, 31.672],
      //         orderAmtNum :'39.9',
      //         orderSum : '3',
      //       }
      //     ]
      //   }
      // ]

      function initChart (res) {
        echarts.registerMap('china', geoJson)
        var myChart = echarts.init(document.getElementById('chart'), 'dark')
        mapPoint.series = getMapPointSeries(res.schList, 'green');
        // mapPoint.series = getMapPointSeries(res.agencyList, 'yellow');
        myChart.setOption(mapPoint)
      }
      //   直接从客户端请求数据
      this.$api.article.screenShow('get','maps',{userName:this.$store.state.userName})
        .then( (res) => {
          initChart(res)
        })
    }
  }
}
</script>
