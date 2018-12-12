# Lesson7: Making Maps

### Homework Update Plot Review

* Interesting data on movie vote and popularity from Chen Yuankai https://bl.ocks.org/hijackdude/raw/2edce69632e6e69e049e0409d39d9c4a/ ，but the point is going small after mouseover...

* Good try guideline in scatter plot from He Yin. Let's talk about it. https://bl.ocks.org/simaozhengqi/raw/fff5fd590f83c33ee84d0151c1f4876b/


## I. 地理数据类型

### 类型：shapefile, geojson, topojson, csv, etc.
    
### 1. shapefile

### 2. geojson:

* 以json为基本格式的地理数据。http://geojson.org/

* GeoJSON支持的地理属性：Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon，他们都被放在一个叫做"geometry"的对象中。另外的属性，如名字、id、人口数、gdp等，放在"properties"里。 
```
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1] // [lon,lat]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
```
* D3InDepth: https://d3indepth.com/geographic/

### 3. topojson: 

* geojson地图数据的减缩版，size上小很多，如果用topojson文件画图，需要引用TopoJSON的js库。

* 一个直白的解说：https://blog.csdn.net/qq542369628/article/details/46123863

* geojson vs topojson [1_geo_topojson.html](1_geo_topojson.html])

* 我们需要使用```topojson.feature(data.objects.name)```把等同于geojson里feature的内容捞出来，再进行地图绘制。

### 4. 数据转换工具：

* mapshaper: https://mapshaper.org/

* Topojson 属性编辑器 & 数据转换: http://geojson.io/

* GeoJSON -> TopoJSON: http://shancarter.github.io/distillery/

* Qgis( Open - Save as ... format)：在layer panel里右键图层，存储为


## II. Where to find geo data?

* WOW it's really a good but difficult question...

* Natural Earth http://www.naturalearthdata.com/downloads/ 很多，但中国数据要小心

* 一些可以注意收藏的城市database，比如LA http://boundaries.latimes.com/sets/  ，北京城市实验室 https://www.beijingcitylab.com/

* geocommons http://geocommons.com/ I don't believe anything useful for you, but in case... You can hang around here...

* 2017高校数据新闻比赛数据库 http://file.caixin.com/datanews_mobile/competition2017/

* 麻辣GIS https://malagis.com/category/gis-resource/

* Here, China, Official: 

* 国家自然资源和地理空间基础信息库 http://www.geodata.gov.cn/web/geo/sjml/index.html 不要犹豫，需要就去联系

* 全国地理信息资源目录服务系统 http://www.webmap.cn/main.do?method=index

* 全国水雨情信息 http://www.webmap.cn/main.do?method=index

* 中国地质调查数据网 http://geodata.cgs.gov.cn/GeoData/GeoChina.html

* Data 文件夹

* Exploring Countries in D3.js http://techslides.com/demos/d3/d3-exploring-countries.html 

* 所有国际来源的地理数据都要注意核实中国边界！



## III. D3 Map Making

### 1. 映射 projection

* 按照既有的一种映射方式，把地理数据转化成svg上的[x,y]。 [lon,lat] - projection -> [x,y]

```
var projection = d3.geoEquirectangular();

projection( [-3.0026, 16.7666] )
// returns [474.7594743879618, 220.7367625635119]
```

* Projection Transitions https://bl.ocks.org/mbostock/3711652

### 2. 地理path生成器 d3.geoPath()

* d3中shape generator的一种，geojson object -> 生成器 -> svg path

```
var projection = d3.geoEquirectangular();

var geoGenerator = d3.geoPath()
  .projection(projection);

var geoJson = {
  "type": "Feature",
  "properties": {
    "name": "Africa"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[-6, 36], [33, 30], ... , [-6, 36]]]
  }
}

geoGenerator(geoJson);
// returns "M464.0166237760863,154.09974265651798L491.1506253268278,154.8895088551978 ... L448.03311471280136,183.1346693994119Z"
```

### 3. 一个简单的map

```
// 1. 映射
var projection = d3.geoMercator();

// 2. 地图生成器
var geoGenerator = d3.geoPath()
  .projection(projection);

// 3. 地理数据
var geo_data = china.features;

// 4. select-data-enter-append-d
var china = china_g.selectAll("path")
  .data(geo_data);

china.enter()
  .append("path")
  .attr("d", geoGenerator);
```

* go through [2_china.html](2_china.html)

* go through [3_china_topo.html](3_china_topo.html)

* go through [4_china_projection.html](4_china_projection.html)
```
projection.center([105, 35])
      .translate([width/2, height/2])
      .scale(400);

一些计算功能：
path data：geoGenerator(china)
path area：geoGenerator.area(china)
中心px：geoGenerator.centroid(china)
边界：geoGenerator.bounds(china)
path length in pixels：geoGenerator.measure(china)
```

### 3. 给地图上色 choropleth

#### 3.1 随意给一些颜色: No use in your project!

```
// 1. 使用现成的d3 color range
var colorScale = d3.scaleOrdinal(d3.schemeCategory20b);

// 2. 按照数据顺序给颜色
china.attr("fill", function(d,i){ return colorScale(i); })
```

#### 3.2 according to some value:

##### a. 加载多组数据的时候：queue() https://github.com/mbostock/queue

```
queue()
    .defer(d3.json, "data/china_diaoyudao.json")
    .defer(d3.csv, "data/china_district_gdp.csv", typeAndSet)
    .await(loaded);

function typeAndSet(){
    // 准备相应的数据
}

function loaded(error, china, gdp){
    // 开始使用这些数据，参数的顺序和上面defer的顺序一致
}
```

##### b. 用d3.map().set与d3.map().get把两组数据连起来 https://github.com/mbostock/d3/wiki/Arrays#d3_map

```
// 1. 要有一列identical的数据：这里是地区中文名

// 2. 定义查找器
var districtByName = d3.map();

// 3. 在csv中，以这列identical的数据为key，把数据set进查找器
districtByName.set(d.district, d)

// 4. 给地图上色：利用identical data找到相应的value：.Year2017
var district = districtByName.get(d.properties.name);
var colorScale2 = d3.scaleLinear().range(["#fee0d2", "#de2d26"]);
colorScale2(district.Year2017);
```

##### c. d3.legend plugin http://d3-legend.susielu.com/

```
var linear = colorScale2;

svg.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(20,20)");

var legendLinear = d3.legendColor()
    .shapeWidth(30)
    .orient("horizontal")
    .labelFormat(d3.format(".0f"))
    .scale(linear);

svg.select(".legendLinear")
    .call(legendLinear);
```         

#### go through [5_china_color.html](5_china_color.html)

#### eg. Lynn's example code [6_world_comparisons.html](6_world_comparisons.html)

#### 一个可收藏的配色工具color brewer http://colorbrewer2.org/#type=sequential&scheme=Greens&n=9

### 4. circles on map

```
circles.enter()
    .append("circle")
    .attr("cx", function(d){ return projection([d.longitude, d.latitude])[0]} )
    .attr("cy", function(d){ return projection([d.longitude, d.latitude])[1]})
```

* go through [7_china_hospital.html](7_china_hospital.html)

### 5. 变形地图

#### 5.1 Tilegram 瓦片地图 

* https://pitchinteractiveinc.github.io/tilegrams/

* 可复用的代码：https://github.com/PitchInteractiveInc/tilegrams/blob/master/MANUAL.md

#### 5.2 More than that

* Let’s Tesselate: Hexagons For Tile Grid Maps http://blog.apps.npr.org/2015/05/11/hex-tile-maps.html

* Google News Lab and tilegrams https://medium.com/google-news-lab/tilegrams-make-your-own-cartogram-hexmaps-with-our-new-tool-df46894eeec1

* 搭配食用 Equal Area Cartograms and Multivariate Labels https://richardbrath.wordpress.com/2015/10/15/equal-area-cartograms-and-multivariate-labels/ Remember to follow Simon Rogers!

* eg: 互动 | 一张图揭示区域间发展不均衡 http://datanews.caixin.com/2017-10-23/101159740.html


## IV. Other Map API

### 1. Carto DB

* 分析&交互：https://carto.com/

* demo: [8_cartodb_hospital.html](8_cartodb_hospital.html)

### 2. Mapbox

* 高颜值 https://www.mapbox.com/use-cases/data-visualization/

* eg: 中国的博物馆300000:1 http://datanews.caixin.com/mobile/museum/

### 3. Leaflet

* https://leafletjs.com/index.html

### 4. baidu map: 

* http://lbsyun.baidu.com/index.php?title=jspopular

* eg: 高铁站离你有多远？http://datanews.caixin.com/interactive/2018/gaotiezhan/

### 5. Mapping Tools Conclusion from Lede Program

* http://ledeprogram.com/mapping-tools/

* Go deep to the Lede Program Page if you're interested, all kinds of knowledge and skills. But be careful, you need find your 'jam'. Take it easy, no rush.


## V. Readings

* Cartography Guide https://www.axismaps.com/guide/

* Blindfolded Cartography https://www.axismaps.com/blog/2015/05/blindfolded-cartography/

* A great big guide to when to use maps in data visualisation https://medium.com/thoughts-on-journalism/a-great-big-guide-to-when-to-use-maps-in-data-visualisation-5661d833ac62

* When Maps Shouldn’t Be Maps http://www.ericson.net/content/2011/10/when-maps-shouldnt-be-maps/

* Coloring Maps from Adam Pearce https://roadtolarissa.com/blog/2015/01/04/coloring-maps-with-d3/


## Homework

DDL Dec 18, 5pm


**Readings**:

* https://flowingdata.com/2014/10/15/linked-small-multiples/
* Mike's tutorial: http://bost.ocks.org/mike/map/


**HW Last (20pts) d3 Map**: 用一个你可以放在项目里数据，或者其他适合做地图的数据，做一张地图。要有tooltips和图例，解释地图数据呈现的内容，可以用choropleth或者dots on map。

**Final Project Proposal**: Proposal and sketch. Shoot email!

* what you need for now: 1. 结构； 2. 数据； 3. take home message 4. 草图

