## Lesson II. d3比例尺与scatter plot

### 1. Indentation
    
写代码过程中，注意indentation的设置，建议"Tab Width 4"，如sublime中"View-Indentation-Tab Width 4", 形式整齐、思路清晰。

### 2. 简介stupidtable.js 
* [1_heatmap_table.html](1_heatmap_table.html)

### 3.中文d3 API https://github.com/xswei/d3js_doc

### 4. javascript复习要点

* function: https://www.w3schools.com/js/js_functions.asp

* selection: 

* sort: 

* style: 

### 5. tabulate

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

margin，简单，但重要的开端。 保持在表格周围有足够的留白，坐标轴、轴的标题往往需要标注在这里。
直接挪动"g"，图内的坐标都以g的左上角为新的原点(0,0)。

<img src="img/margins.png">

Mike Bostock关于D3 margin convention的post: http://bl.ocks.org/mbostock/3019563.

建立你自己的d3 graph开头部分，可复用，建议如下：

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

See more examples in [scale_examples.html](scale_examples.html).


Reference:

* Quantitative Scales: https://github.com/mbostock/d3/wiki/Quantitative-Scales
* Ordinal Scales: https://github.com/mbostock/d3/wiki/Ordinal-Scales
* Time Scales: https://github.com/mbostock/d3/wiki/Time-Scales
* Supplementary: http://www.jeromecukier.net/blog/2011/08/11/d3-scales-and-color/
* Videos: [Scott Murray's linear scales](https://www.youtube.com/watch?v=5EZSOsBXdS0&list=PL0tDk-f4v1uh4s33k1qJ7Xl96cOySkLnt), [ordinal scales](https://www.youtube.com/watch?v=WxtJ7VfP_VE&list=PL0tDk-f4v1uh4s33k1qJ7Xl96cOySkLnt&index=2)




## Homework

DDL: 5pm on Nov.13th

Readings:

* 


**Homework**: 

1. 解决JS bug: 发送gist链接，subline: "Lesson2 js bugs" (10pt)

2. Make your first scatter plot, subline: "Lesson2 scatter plot" (20pt)

* 按照上节课讲过的csv数据规范将unemployment_and_GDPgrowth.xlsx转成csv文件

* x轴显示GDP增长率，y轴显示失业率

* 将world的点高亮

3. 【选做】 Try bar chart, 将完成的散点图中任意一组数据以柱状图的形式呈现，subline: "Lesson2 try bars"  (bonus + 10pt)

