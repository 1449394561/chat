<template>
    <div class="map-content">
      <div class="page" id="map-container"></div>
      <div id="panel"></div>
    </div>
  </template>
  <script>
  import AMap from "AMap";
  import AMapUI from "AMapUI";
  export default {
    name: "Amap",
  
    data() {
      return {
        map: null,
      };
    },
    mounted() {
      var map = new AMap.Map('map-container', {
        zoom: 4
    });

    AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {

        if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }

        var pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            //autoSetFitView:false,
            map: map, //所属的地图实例

            getPath: function(pathData, pathIndex) {

                return pathData.path;
            },
            getHoverTitle: function(pathData, pathIndex, pointIndex) {

                if (pointIndex >= 0) {
                    //point 
                    return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                }

                return pathData.name + '，点数量' + pathData.path.length;
            },
            renderOptions: {

                renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
            }
        });

        window.pathSimplifierIns = pathSimplifierIns;

        //设置数据
        pathSimplifierIns.setData([{
            name: '路线0',
            path: [
                [116.405289, 39.904987],
                [113.964458, 40.54664],
                [111.47836, 41.135964],
                [108.949297, 41.670904],
                [106.380111, 42.149509],
                [103.774185, 42.56996],
                [101.135432, 42.930601],
                [98.46826, 43.229964],
                [95.777529, 43.466798],
                [93.068486, 43.64009],
                [90.34669, 43.749086],
                [87.61792, 43.793308]
            ]
        }]);

        //对第一条线路（即索引 0）创建一个巡航器
        var navg1 = pathSimplifierIns.createPathNavigator(0, {
            loop: true, //循环播放
            speed: 1000000 //巡航速度，单位千米/小时
        });

        navg1.start();
    });
    },
    methods: {
      // 1.路线规划，不乘坐地铁2.自行车出行（暂时不做）3.最快捷模式（综合出行[包含地铁]），用1,2,3来区分出行方式（goMethod）
      // 路线规划文档地址https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
      getRoute() {
        new AMap.Transfer({
          map: this.map,
          panel: "panel",
        }).search(
          [
            { keyword: "宁波大学", city: "宁波" },
            { keyword: "梧州学院", city: "梧州" },
          ],
          function (status, data) {
            console.log(data);
          }
        );
      },
    },
  };
  </script>
  <style  scoped>
  .page {
    height: calc(100vh - 50px);
  }
  .map-content {
    position: relative;
  }
  #panel {
    position: absolute;
    top: 0;
    right: 0;
  }
  </style>
  