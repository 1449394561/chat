<template>
<div class="t_container">
            <div class="m_aside">
                <div class="t_box_left">

                <div class="t_list">
                    <div class="t_min">最佳评分 8 <i></i></div>
                    <div class="t_min">最佳年份 2021 <i></i></div>
                    <div class="t_min">年均增长率 2% <i class="down"></i></div>
                </div>
                <div id="chart_1" class="echart" style="width: 100%; height: 22rem;margin-top: 0.1rem;"></div>
                                </div>
                <div class="t_box_left_d">
                <header class="t_title">
                    <span>年度电影箱线图</span>
                </header>
                <div id="chart_3" class="echart" style="width: 100%; height: 24rem;margin-top: 0.1rem;"></div>
                </div>
            </div>

            <div class="m_main">
                <div id="echart4" class="center-top-bg"></div>
                <div class="center-bottom-bg">
                    <div class="toptable" style="padding: 5px;">
                    <!-- <div class="trr" style=" margin-left: 0px;">电影票房</div><div class="trr">电影评分</div><div class="trr">电影评分</div><div class="trr">电影评分</div> -->
                    <thead>
                        <tr>
                            <th>电影名称</th>
                            <th>电影票房</th>
                            <th>电影评分</th>
                            <th>投票人数</th> 
                            <th>导演</th>
                        </tr>
                        </thead>
        <div class="page-example3" style="">

            <vue-seamless-scroll :data="listdata"  :class-option="defaultOption" >
                <ul class="ul-scoll">
                    <li v-for="(item, index) in listdata" :key='index'>
                        <span style="width: 200px;" class="title">{{item.moviename}}</span>
                        <span style="width: 145px;" class="title">{{item.gross}}</span>
                        <span style="width: 145px;  margin-left: 10px;" class="title">{{item.pf}}</span>
                        <span style="width: 100px;" class="title">{{item.votes}}</span>
                        <span style="width: 160px;" class="title">{{item.director}}</span>
                    </li>
                </ul>
            </vue-seamless-scroll>
        </div>
    </div>
                </div>
            </div>
            <div class="m_aside">
                <div class="t_box_right">
                <header class="t_title">
                    <span>电影类型统计</span>
                </header>
                <div id="chart_2" class="echart" style="width: 100%; height: 18rem;margin-top: 2.5rem;"></div>
                </div>
            
                <div id="chart_5" class="t_box_right_d">

                </div>
            </div>

    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import * as echarts from "echarts";
import dataTool from "echarts/extension/dataTool";
import vueSeamlessScroll from 'vue-seamless-scroll'
import SC from "../js/gxzzzzq"
export default {
//import 引入的组件需要注入到对象中才能使用
components: {
    vueSeamlessScroll
},
props: {},
name: 'V2',
data() {
//这里存放数据
return {
    xxt:[],
    listdata:[],
    cdata:[{
				            name: '大数据',
				            value: 2181
				        }, {
				            name: '云计算',
				            value: 1386
				        },
                    ],
    svm:[
            [1200, 1400, 1000, 1200, 3000, 2300, 1300, 1700, 1400, 1200, 3000, 2300, 2400, 2100, 2800, 3100, 3000, 2800, 2700, 2900],
            [2000, 1200, 3000, 2000, 1700, 3000, 2000, 1800, 2000, 1900, 3000, 2000, 2500, 2200, 2600, 2700, 2900, 3000, 3200, 3100]
        ],
    user:''
};
},


//生命周期 - 挂载完成（可以访问 DOM 元素）
mounted() {
    this.echart_1()
    this.echart_2()
    this.echart_4()
    this.echart_5()
    
},
//计算属性 类似于 data 概念
computed: {
    defaultOption () {

return {

                    step: 0.2, // 数值越大速度滚动越快
                    limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
                    hoverStop: true, // 是否开启鼠标悬停stop
                    direction: 1, // 0向下 1向上 2向左 3向右
                    openWatch: true, // 开启数据实时监控刷新dom
                    singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                    singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                    waitTime: 1000 // 单步运动停止的时间(默认值1000ms)

    }

 }
},
//监控 data 中的数据变化
watch: {},
//方法集合
methods: {


    loadData(){
             const config1 = {
             headers:{
                Authorization: 'Security-ceyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NzIxMTE1NTEsImlzcyI6InNhbnMiLCJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiZXhwIjoxNjcyMTk3OTUxfQ.1KVjehA4HsE_mN6vPjLdi5YCiLOOH5AYi9an198yKbsCnrmDgcdnkfFUJFYFPQUOwN79v5uU64JV0v0fVtblAQ',
                    }
                };
        this.axios.get("/api/kuang/mydept/movie/list").then(res => {
            if (res.status === 200) {

                this.xxt=res.data.typelist
                this.listdata=res.data.movielist
                //   console.log(this.svm)
                //   console.log(this.listdata)
                //   sessionStorage.setItem("user", JSON.stringify(res.data))  // 缓存用户信息
                this.echart_3()
                } else {
                        this.$message({
                        type: "error",
                        message: 'error'
                        })
                        }
          })
    },
    loadData1(){
             const config1 = {
             headers:{
                Authorization: 'Security-ceyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NzIxMTE1NTEsImlzcyI6InNhbnMiLCJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiZXhwIjoxNjcyMTk3OTUxfQ.1KVjehA4HsE_mN6vPjLdi5YCiLOOH5AYi9an198yKbsCnrmDgcdnkfFUJFYFPQUOwN79v5uU64JV0v0fVtblAQ',
                    }
                };
        this.axios.get("http://127.0.0.1:5000/cloud").then(res => {
            if (res.status === 200) {

                this.cdata=res.data

                this.echart_4()
                console.log(res.data)
                } else {
                        this.$message({
                        type: "error",
                        message: 'error'
                        })
                        }
          })
    },

    echart_1(){
        var myChart = echarts.init(document.getElementById('chart_1'));
        var xAxisData1 = ['2', '2.5', '3','3.5', '4','4.5', '5','5.5', '6','6.5', '7','7.5', '8'];
        var legendData = ['2018', '2019','2020','2021'];
        var title = "各评分平均电影票房";//标题
        var serieData = [];
        var metaDate = [
            [0.01,0,13.6,10.9,35,8,19,24,29,48,46,151,178.5],
            [0.78, 0.05, 1.828,0, 16.76,8.8, 15.9, 39, 59, 126.8, 62, 91, 228.5],
            [0, 0, 0.01, 1.2, 0, 17, 14, 27.6, 120, 45, 62.7, 0, 47.7],
            [0,0,0,0.4,0,0,81.6,42.6,91.3,71,138.8,50.9,304],
        ]
        for (var v = 0; v < legendData.length; v++) {
            var serie = {
                name: legendData[v],
                type: 'line',
                symbol: "circle",
                symbolSize: 10,
                data: metaDate[v]
            };
            serieData.push(serie);
        }
        var colors = ["#036BC8", "#FFF", "#5EBEFC", "#2EF7F3"];
        var option = {
            // backgroundColor: '#0f375f',
            title: {
                text: title,
                textAlign: 'left',
                textStyle: {
                    color: "#fff",
                    fontSize: "16",
                    fontWeight: "bold"
                }
            },
            legend: {
                show: true,
                left: "center",
                data: legendData,
                y: "5%",
                itemWidth: 18,
                itemHeight: 12,
                textStyle: {
                    color: "#fff",
                    fontSize: 14
                },
            },
            toolbox: {
                orient: 'vertical',
                right: '1%',
                top: '20%',
                iconStyle: {
                    color: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                },
                feature: {
                    saveAsImage: {},
                    magicType: {
                        // show: true,
                        type: ['line','bar','stack','tiled']
                    }
                }
            },
            color: colors,
            grid: {
                left: '2%',
                top: "12%",
                bottom: "0%",
                right: "5%",
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#6173A3'
                    }
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#9ea7c4',
                        fontSize: 12
                    }
                },
                axisTick: {
                    show: false
                },
                data: xAxisData1,
            }, ],
            yAxis: [{
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#9ea7c4',
                        fontSize: 12
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#6173A3'
                    }
                },
            }, ],
            series: serieData
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    },
    echart_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_2'));  
        var giftImageUrl = "data:image/png;base64,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";
        myChart.setOption({
            graphic: {
                elements: [{
                    type: 'image',
                    style: {
                        image: giftImageUrl,
                        width: 30,
                        height: 30
                    },
                    left: '73%',
                    top: 'center'
                }]
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['销售额'],
                left:'27%'
            },
            grid: {
                left: '1%',
                right: '60%',
                top: '20%',
                bottom: '0%',
                containLabel: true,
            },
            xAxis: {
                type: 'value',
                position:'top',
                splitLine: {show: false},
                boundaryGap: [0, 0.01],
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#9ea7c4',
                        fontSize: 12
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#6173A3'
                    }
                },
            },
            yAxis: {
                type: 'category',
                data: ['Comedy','Action','Animation','Adventure','Romance','Fantasy','Mystery','Horror','Thriller','Crime','Sci-Fi','Drama'],
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#9ea7c4',
                        fontSize: 7
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#6173A3'
                    }
                },
            },
            series: [{
                name: '',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                type: 'bar',
                data: [53728,49123,25379,36371,22329,15593,16389,20434,16228,24485,11208,54235]
            },{
                type: 'pie',
                radius: ['30%', '90%'],
                center: ['75%', '50%'],
                roseType: 'radius',
                color: [ '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'],
                data: [{
                    value: 15.5,
                    name: 'Comedy'
                }, {
                    value: 14.2,
                    name: 'Action'
                }, {
                    value: 7.3,
                    name: 'Animation'
                }, {
                    value: 10.5,
                    name: 'Adventure'
                }, {
                    value: 6.4,
                    name: 'Romance'
                },{
                    value: 4.5,
                    name: 'Fantasy'
                },{
                    value: 4.7,
                    name: 'Mystery'
                },{
                    value: 5.9,
                    name: 'Horror'
                },{
                    value: 4.6,
                    name: 'Thriller'
                },{
                    value: 7,
                    name: 'Crime'
                },{
                    value: 3.2,
                    name: 'Sci-Fi'
                },{
                    value: 15.6,
                    name: 'Drama'
                }
            ],
                label: {
                    normal: {
                        textStyle: {
                            fontSize: 14
                        },
                        formatter: function(param) {
                            return param.name + ':\n' + Math.round(param.percent) + '%';
                        }
                    }
                },
                labelLine: {
                    normal: {
                        smooth: true,
                        lineStyle: {
                            width: 2
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 30,
                        shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                },
       
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function(idx) {
                    return Math.random() * 200;
                }
            }]
        });
    },

    echart_3() {
        var myChart = echarts.init(chart_3);

    var data = echarts.dataTool.prepareBoxplotData(this.xxt);
    let option = {
      tooltip: {
        trigger: "item", //触发类型,数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        axisPointer: {
          //指示器类型。
          type: "shadow",
        },
      },
      grid: {
        //直角坐标系网格。
        //show: true,//default: false
        left: "10%",
        right: "10%",
        bottom: "15%",
        //borderWidth: 1,
        //borderColor: '#000',
      },
      xAxis: {
        
        axisLabel: { 
            // rotate: 45,
            textStyle: {
                        color: '#9ea7c4',
                        fontSize: 7
                    }
                },
        type: "category", //'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
        data: ['Crime', 'Action', 'Animatio', 'Adventure', 'Romance', 'Fantasy', 'Mystery','Horror','Thriller','Crime','SciFi','Drama']
        // show: false,
        
      },
      yAxis: {},
      series: [
        {
          name: "boxplot", //箱线图
          type: "boxplot",
          hoverAnimation: true,
          itemStyle: {
            borderColor: "#108EE9", //boxplot图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
          },
          data: data.boxData,
          tooltip: {
            formatter: function (param) {
              return [
                "类目名 " + param.name + ": ",
                "upper: " + param.data[5],
                "Q3: " + param.data[4],
                "median: " + param.data[3],
                "Q1: " + param.data[2],
                "lower: " + param.data[1],
              ].join("<br/>");
            },
          },
        },
        {
          name: "异常值", //异常值
          type: "scatter", //分散
          data: data.outliers,
        },
      ],
    };

    // console.log(data.outliers, "异常值");
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    },
    echart_4(){

        const wordChart= echarts.init(document.getElementById("echart4"));
				const wordOpt = {

				    series: [{
				        type: 'wordCloud',
				        shape: 'circle', //circle cardioid diamond triangle-forward triangle
				       	left: '1%',
				       	right: '1%',
				       	top: '1%',
				       	right: '2%',
				       	width: '100%',
				       	height: '100%',
				        gridSize: 0, //值越大，word间的距离越大，单位像素
				        sizeRange: [10, 46], //word的字体大小区间，单位像素
				        rotationRange: [-90, 90], //word的可旋转角度区间
				        textStyle: {
				            normal: {
				                color: function() {
				                    return 'rgb(' + [
				                        Math.round(Math.random() * 160),
				                        Math.round(Math.random() * 160),
				                        Math.round(Math.random() * 160)
				                    ].join(',') + ')';
				                }
				            },
				            emphasis: {
				                shadowBlur: 2,
				                shadowColor: '#000'
				            }
				        },
				        data: 
                            this.cdata
				    }],

				};

				wordChart.setOption(wordOpt);
      },
    echart_5(){
        echarts.registerMap("SC", SC);
        let Chart = echarts.init(document.getElementById("chart_5"));

        const option = {

            title: {
                text: '\n  广西各地电影院数量',
                textStyle: {
                    color: "#fff",
                    fontSize: "18",
                    fontWeight: "bold"
                }
            },

		//数据映射
        visualMap: {
          type: "piecewise",//分段标签
          min: 0,//最小值
          max: 50,//最大值，不设置为无限大
          right: 30,//距离右侧位置
          bottom: 30,//距离底部位置
          orient: "vertical",//组件竖直放置
          align: "left",//色块在左
          textGap: 14,//文字主体之间的距离
          itemSymbol: "circle",//右下角映射组件使用圆点形状
          show: true,
          seriesIndex: 0,//指定取哪个系列的数据(series.data)，若不设置则会影响图上标点颜色设置。
          textStyle: {
            color:"#fff"
          },
          //一以下是分段式视觉映射组件的每一段的范围
          //gt：大于、gte：大于等于、lt：小于、lte：小于等于。
          pieces: [
            {
              gt: 35,
              label: "35个以上",
              color: "#1492FF",

            },
            {
              gte: 20,
              lte: 35,
              label: "20-35个",
              color: "#59AAF5",
            },
            {
              gte: 10,
              lt: 20,
              label: "10-20个",
              color: "#99CBF9",
            },
          ],
          /*
          pieces或者inRange内设置颜色试验时都能生效，个人认为需要传入组件控制颜色时
          再选择用inRange，两个都存在并给予不同的颜色，显示以pieces为主。
          */
          //inRange: {
          //    color: ["#99CBF9", "#59AAF5", "#1492FF"],
          //},
        },
        geo: {
          map: "SC",//上面引入的数据名
          show: true,
          roam: false,//关闭拖拽
          label: {  //地图显示的地点名
            show: true,
            color: "#fff",
            fontSize: 16,
          },
          itemStyle: { 
            areaColor: "#99CBF9", //地图区域的颜色(没有数据时会按照这个颜色显示)
            borderColor: "#fff",  //地图区域的边框
            borderWidth: 0.6,
          },
          emphasis: {  //高亮的显示设置
            label: {
              color: "#fff",
            },
            itemStyle: {
              areaColor: "#9DE3FF",
            },
          },
          select: { //选中显示设置
            label: {
              color: "#fff",
            },
            itemStyle: {
              areaColor: "#9DE3FF",
            },
          },
        },
        series: [
        //配置数据的显示
          {
            type: "map",  //类型map
            geoIndex: 0, //指定geo属性后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。
            data:[{name: "南宁市",value: 95},
            {name: "梧州市",value: 21},
            {name: "柳州市",value: 37},
            {name: "桂林市",value: 48},
            {name: "玉林市",value: 32},
            {name: "贵港市",value: 15},
            {name: "贺州市",value: 11},
            {name: "来宾市",value: 12},
            {name: "钦州市",value: 20},
            {name: "北海市",value: 16},
            {name: "防城港市",value: 13},
            {name: "河池市",value: 16},
            {name: "崇左市",value: 11},
            {name: "白色市",value: 25},

                                            ],
          },
        //以下配置了图中白色标记圆点的显示
          {
            type: "scatter", //类型：散点
            coordinateSystem: "geo", //使用地理坐标系
            itemStyle: {
              color: {
                type: "radial", // 径向渐变，前三个参数分别是圆心 x, y 和半径
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0.5,
                    color: "#fff", // 50% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgb(0 0 0 / 0%)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              borderColor: "#fff", //边框白色
              borderWidth: 1,      //边框宽度
            },
            symbolSize: 10,    //散点大小
            data: [
              { name: "南宁市", value: [108.45, 23.13] }
            ],
            zlevel: 1,
          },
        ],
      };
      Chart.setOption(option);

    }
},
//生命周期 - 创建完成（可以访问当前 this 实例）
created() {
    // this.loadData()
    // this.loadData1()

},

beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有 keep-alive 缓存功能，这个函数会触发
}
</script>
<style scoped>
/* .ul-scoll{
    width: 700px;
} */
.ul-scoll li span{
    height: 10vh;
    float: left;
}
.page-example3{
        width: 760px;
        height: 250px;
        overflow: hidden;
        font-size: 20px;
        color:#61d2f7;
        /* border: 1px solid rgb(21, 55, 126); */
        margin-left: 0px;
    }
.toptable thead tr{

    
    color:#61d2f7;
    width: 100%;
    height: 42px;
    font-size: 20px;
}
.toptable thead tr th{
    font-weight: 600;
    text-align: center;
    width: 20vw;
}


ul{
    list-style: none;
    margin: 0;
    padding: 0;
}
a{
    text-decoration: none;
}
/*正文内容*/
.t_container{
    width: 100%;
    height: 100vh;
    background: url('../img/bg.jpg') no-repeat;
    background-size: 100vw 100vh;
}
.m_aside{
    float: left;
    width: 29vw;
    height: 83vh;
}
.m_main{
    float: left;
    margin-left: 0px;
    width: 39vw;
    height: 88vh;
}
.t_box_left{
    width: 27vw;
    height: 46vh;
    background: url('../img/t_bg.png') no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    float: left;
    position: relative;
    margin-left: 1rem;
    margin-top: 2.31rem;
}
.t_box_left_d{
    width: 27vw;
    height: 46vh;
    background: url('../img/t_bg.png') no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    float: left;
    position: relative;
    margin-left: 1rem;
    margin-top: 1rem;
}
.t_box_right{
    width: 27.5vw;
    height: 46vh;
    background: url('../img/t_bg.png') no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    float: right;
    position: relative;
    margin-left: 0rem;
    margin-top: 2.31rem;
}
.t_box_right_d{
    width: 27.5vw;
    height: 46vh;
    background: url('../img/t_bg.png') no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    float: right;
    position: relative;
    margin-left: 0rem;
    margin-top: 1rem;
}
.t_title{
    text-align: center;
    font-size: 1.16rem;
    color: #fff;
    font-weight: bold;
    height: 0.4rem;
    line-height: 0.4rem;
    width: 100%;
    margin-top: 1rem;
}
.t_list{
    margin-top: 0.3rem;
    width: 100%;
    text-align: center;
    line-height: 0rem;
    height: 1.2rem;
}
.t_min{
    display: inline-block;
    margin-top: 0.3rem;
    width: 5.4rem;
    height: rem;
    line-height: 0.4rem;
    background: url('../img/t_border.png') no-repeat;
    background-size: 100% 100%;
    font-size: 0.16rem;
    color: #fff;
    position: relative;
}
.t_min i{
    position: absolute;
    display: inline-block;
    width: 0.20rem;
    height: 0.28rem;
    background: url('../img/top.png') no-repeat;
    background-size: 100vw 100vh;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 0.05rem;
}
.t_min i.down{
    background: url('../img/down.png') no-repeat;
    background-size: 100vw 100vh;
}
.center-top-bg {
    background: url("../img/box-bg-center-top.png") no-repeat center top;
    background-size: 100% 100%;
    height: 534px;
    margin-top: 2.31rem;
}
.center-d-bg {
    background: url("../img/box-bg-center-top.png") no-repeat center top;
    background-size: 100% 100%;
    height: 234px;
    margin-top: 2.31rem;
}
.center-bottom-bg {
    background: url("../img/box-bg-center-top.png") no-repeat center top;
    background-size: 100% 100%;
    height: 346px;
    margin-top: 1rem;
}
</style>