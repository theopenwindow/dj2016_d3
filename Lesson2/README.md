## Lesson II. d3比例尺与scatter plot

### something before code

* US mid-term election 

** The candidates in the midterm elections are among the most diverse set to run in the history of the United States.  https://www.nytimes.com/interactive/2018/10/31/us/politics/midterm-election-candidates-diversity.html

** Forecasting the race for the House https://projects.fivethirtyeight.com/2018-midterm-election-forecast/house/

* <img src="img/alberto.png">

* 尽量避免使用dual-axis chart，除非真的密切相关 [dual-scaled_axes.pdf](dual-scaled_axes.pdf)

### 1. Homework

* IBM指数：果雅迪 http://bl.ocks.org/guoguoguoyadi/48a293f672c55dc34f2da8e9adef1f18
* 优美的居中table和置顶icon，nice font：薛雨菲 http://bl.ocks.org/xyfaye/9933f388624b63ed070f9485613e21e3
* 中文完整table：潘雯智 https://bl.ocks.org/hlydxpwz/be60f41fa6a368ed308586a224afd8a0
* click to sort: 陈晓晗 https://bl.ocks.org/Anthea98/be39d0b05720b6dd135341038078aaa1

### 2. Indentation
    
写代码过程中，注意indentation的设置，建议"Tab Width 4"，如sublime中"View-Indentation-Tab Width 4", 形式整齐、思路清晰。

### 3. stupidtable.js 

* Stupid jQuery Table Sort https://github.com/joequery/Stupid-Table-Plugin

* [1_heatmap_table.html](1_heatmap_table.html)

```
<th data-sort="string">Name</th>
<th data-sort="int">Age</th>
<th data-sort="alphanum">UserID</th>
```

### 4. D3js中文文档 https://github.com/xswei/d3js_doc

### 5. javascript复习要点

* function: https://www.w3schools.com/js/js_functions.asp

* selection: 
https://www.w3schools.com/jsref/dom_obj_select.asp
https://www.w3schools.com/jsref/met_document_getelementsbyclassname.asp
https://www.w3schools.com/jquery/jquery_selectors.asp

```
<html>
    <body>
        <p class="mass">asjdkf; asdjkf; asdjfk;</p>
        <p class="mass">;lkjasf ;lkajsdf ;lakjsdf </p>
        <p id="fruit">There is a class tonight.</p>
    </body>
<html>

[in js way]
document.getElementById("fruit");
document.getElementsByClassName("mass");

[in jquery way]
$("#fruit")
$(".mass")

d3? d3.select()/ d3.selectAll()
```

* sort: https://www.w3schools.com/js/js_array_sort.asp

* max/min: https://www.w3schools.com/js/js_math.asp 

* map: https://www.w3schools.com/jsref/jsref_map.asp

### 6. hello, svg

* svg: Scalable Vector Graphics 可缩放矢量图形

* D3与svg: 用js的语法逻辑，把数据输入svg，svg中可包含很多DOM elements页面元素，圆形、方形等等，呈现出你需要的数据图。

* go through [2_svg.html](2_svg.html)

* 课堂练习 [3_svg_excercise.html](3_svg_excercise.html)

* 要点

````
<circle>
    cx: circle 圆心 x 坐标；
    cy: circle 圆心 y 坐标；
    原点在哪：svg左上角
    r: radius 半径
    fill: 填充颜色
    stroke: 边颜色
<rect>
    rect: rectangle;
    x: rect 左上角 x 坐标；
    y: rect 左上角 y 坐标；
<g>
    g: group;
    目的：作为一个整体，便于选择与下一步操作，与ai中group作用相似

transform：改变位置、大小、角度
````

* 加强理解reading：

    SVG Group Element and D3.js https://www.dashingd3js.com/svg-group-element-and-d3js

    Using the SVG Coordinate Space 对于svg的坐标系理解 https://www.dashingd3js.com/using-the-svg-coordinate-space

### 7. The D3 Margin Convention 留白惯例

* margin，简单，但重要的开端。 保持在表格周围有足够的留白，坐标轴、轴的标题往往需要标注在这里。

* 直接挪动"g"，图内的坐标都以g的左上角为新的原点(0,0)。

<img src="margins.png">

* Mike Bostock关于D3 margin convention的post: http://bl.ocks.org/mbostock/3019563.

* go through [4_margin.js](4_margin.js)

* 建立你自己的d3 graph开头部分，可复用，建议如下：

````
var svgWidth = 1000,
    svgHeight = 500;

var margin = {top: 20, right: 25, bottom: 20, left: 200};

var chartWidth = svgWidth - margin.left - margin.right,
    chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("body") //或者用class或id去call某一个div
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
````

### 8. The D3 Scale 比例尺：把数据转化成图像

* domain 输入值域，即，我们的数据

* range 输出范围，我们想要数据呈现在屏幕上的样子，可能是一段距离、面积大小，也可能是一个颜色范围

Jerome Cukier对于d3 scales的图像示意:

<img src="http://i0.wp.com/www.jeromecukier.net/wp-content/uploads/2011/08/d3scale1.png">

* d3.scale.domain([输入值域]).range([输出范围])

* go through [4_scale.html](4_scale.html)

```
** Linear scale处理连续性数据，如1-100：

var x = d3.scaleLinear()
        .domain([10, 130])
        .range([0, 960]);

** Ordinal scale处理类别性数据，如地名、人名：

var x = d3.scaleOrdinal()
        .domain(["西城","东城","朝阳"])
        .range([0, 100])
        .padding(0.1);


** 用d3计算出大小范围：

// 方法1：分别得出大小值
var myMax = d3.max(data, function(d) {
    return +d.value;
});

var myMin = d3.min(data, function(d) {
    return +d.value;
});

// 方法2：直接得出值域范围

var myMaxAndMin = d3.extent(data, function(d) {
    return +d.value;
});  // returns an array of [max, min] for you


** 铺出所有类别：

data.map(function(d) { return d.XXX; })

````

* d3中的scale，除了linear, ordinal, band，还有非常多，参考 d3-scale API https://github.com/d3/d3-scale

### 9. Now it's easy to draw a scatter plot!

* Go through [2_scatter_plot.html](2_scatter_plot.html)

    ** d3 axis https://github.com/d3/d3-axis

See more examples in [scale_examples.html](scale_examples.html).


Reference:

* Quantitative Scales: https://github.com/mbostock/d3/wiki/Quantitative-Scales
* Ordinal Scales: https://github.com/mbostock/d3/wiki/Ordinal-Scales
* Time Scales: https://github.com/mbostock/d3/wiki/Time-Scales
* Supplementary: http://www.jeromecukier.net/blog/2011/08/11/d3-scales-and-color/
* Videos: [Scott Murray's linear scales](https://www.youtube.com/watch?v=5EZSOsBXdS0&list=PL0tDk-f4v1uh4s33k1qJ7Xl96cOySkLnt), [ordinal scales](https://www.youtube.com/watch?v=WxtJ7VfP_VE&list=PL0tDk-f4v1uh4s33k1qJ7Xl96cOySkLnt&index=2)




## Homework

DDL: 5pm on Nov.13th

Reading:

* Peter Cook的教程，清晰易读，关于scales：https://d3indepth.com/scales/

* 之前的章节，加强对d3逻辑的理解

* 预习：line charts video from Scott Murray: https://www.youtube.com/watch?v=QiNi2aYANUc&list=PL0tDk-f4v1ujc8NrGswT158m2y_7bKs3B&index=2


**Homework**: 

1. 解决JS bug: 发送gist链接，subline: "Lesson2 js bug fixed" (10pt)

2. Make your first scatter plot, subline: "Lesson2 scatter plot" (20pt)

* 按照上节课讲过的csv数据规范将unemployment_and_GDPgrowth.xlsx转成csv文件

* x轴显示GDP增长率，y轴显示失业率

* 将world的点高亮

* 尽量专业性美化表格，但不要加没有意义的元素

3. 【选做】 Try bar chart, 将完成的散点图中任意一组数据以柱状图的形式呈现，subline: "Lesson2 try bars"  (bonus + 10pt)

* 迟交-5pt

