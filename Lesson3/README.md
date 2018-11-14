## Lesson III. d3 time format与line chart

#### 2015 Infographics and Data Visualization with d3 MOOC: really similar to our class
** mindmeister https://www.mindmeister.com/fr/524424244/mooc-data-visualization-and-infographics-with-d3-alberto-cairo-scott-murray

### 1. bar chart
    
** 雯智的bar chart [0_bars.html](0_bars.html) Good try！

```
xScale.domain(data.map(function(d) {return d.Country;}));
yScale.domain([0, d3.max(data, function(d) {return +d.Unemployment;})]);

.attr("x", function(d) { return xScale(d.Country);})
.attr("y", function(d) { return yScale(d.Unemployment);})
.attr("width", xScale.bandwidth())
.attr("height", function(d) {
    return height - yScale(d.Unemployment);
})
```

** 我做了一些小改动 [1_d3_bars.html](1_d3_bars.html)
```
//
Prepare your data well
* 去掉没用的column
* 然后，复制到Sublime里改，复制粘贴的方式把数据间隔变成半角逗号
* 存成csv

// 数字格式化
data.forEach(function(d){
    d.Unemployment = + d.Unemployment;
})

// 排序
// 升序
data.sort(function(a,b){ return a.Unemployment - b.Unemployment; })
data.sort(function(a,b){ return d3.ascending(a.Unemployment, b.Unemployment);})
// 降序
data.sort(function(a,b){ return b.Unemployment - a.Unemployment; })
data.sort(function(a,b){ return d3.descending(a.Unemployment, b.Unemployment); })

// 过滤掉0的数据
function noZero(d){return d.Unemployment != 0;}
data = data.filter(noZero)

// add label (axis title)
svg.append("text")
    .attr("class", "yTitle")
    .attr("transform", "translate(" + margin.left + " ," + margin.top + ")")
```

### 2. d3 time format 

** API https://github.com/d3/d3-time-format/blob/master/README.md#timeFormat

** 理解：你可以把它理解成d3里的时间转换器：[d3.timeParse()] js能读懂的时间 ~ 人能读懂的时间 [d3.timeFormat()]

** go through [2_d3_time_format.html](2_d3_time_format.html)

* 各种%：https://bl.ocks.org/zanarmstrong/raw/ca0adb7e426c12c06a95/

* 其他语言：https://github.com/d3/d3-time-format/tree/master/locale

** go through [3_d3_time_parse.html](3_d3_time_parse.html)

* 大多数情况下，我们在引用数据里的时间时，js并不认识它，只是一堆字符，string，所以我们要用到d3.timeParse()，make time be time。

** more: Scott Murray's MOOC tutorial on time format https://www.youtube.com/watch?v=CQsNxDwO5SA&list=PL0tDk-f4v1ujc8NrGswT158m2y_7bKs3B&index=1

### 3. d3.line()

** Peter Cook: https://d3indepth.com/shapes/

** 不像散点图的circle/柱形图中的rect，我们可以通过简单的定位，给半径/高宽，就定义出它的在SVG中的样子，线形图、面积图、堆叠图、饼图等，我们需要借助d3自带的图形生成器。

** shape generator

```
* d3.line()

* d3.area()

* d3.stack()

* d3.arc() //弧形 -> 饼图 mainly

* d3.pie() //角度 -> 饼图

* d3.symbol() //各种符号，＋ 星星 菱形
```

** join data

```
var lineGenerator = d3.line();

方法1：

var points = [
	[0, 80],
	[100, 100],
	[200, 30],
	[300, 50],
	[400, 40],
	[500, 80]
];

var pathData = lineGenerator(points);
// pathData is "M0,80L100,100L200,30L300,50L400,40L500,80"

d3.select('path')
  .attr('d', pathData);

方法2-最为常用：

var data = [
	{value: 10}, 
	{value: 50}, 
	{value: 30}, 
	{value: 40}, 
	{value: 20}, 
	{value: 70},
	{value: 50}
];

lineGenerator
	.x(function(d, i) {
		return xScale(i);
	})
	.y(function(d) {
		return yScale(d.value);
	});
```

### 4. datum() and data()

** datum(): 和data()一样把数据给元素, 但，是把一堆作为一个array、一个整体，给一个元素，后面不跟enter()。而enter()是用来给N个元素的。

我们可以用 `d3.select("body").data()` 或 `D3 SELECTIONS.data()` 来看相应选择下join进去的data是什么， 感受data与datum的区别：

go through [4_d3_data_datum.html](4_d3_data_datum.html).

### 5. Let's draw a line chart

** go through [5_emissions_line_chart.html](5_emissions_line_chart.html)

** 脑中有网画d3，给你网: open [homework2_line_chart.html](homework2_line_chart.html)

### 6. get labels 添加标签

** Line chart label use in NYT，繁杂中突出重点 https://www.nytimes.com/interactive/2016/01/12/upshot/david-bowie-songs-that-fans-are-listening-most-heroes-starman-major-tom.html

** go through [6_emissions_line_label.html](6_emissions_line_label.html)

### 7. d3 mouse events

初级交互：鼠标触发事件

* selection.on("mouseover", `<do something>`)
* selection.on("mouseout", `<do something>`)
* selection.on("mousemove", `<do something>`)
* selection.on("click", `<do something>`)

`<do something>` 部分，可能直接是一个无名function(){}; 或者call一个前面命名好的function。

你可以get到鼠标相应动作当前的DOM元素，元素内的数据和次序index都可以一起get到。 

例如,

````
// 无名function:
var rect = ...;

rect.on("click", function(d, i) {
    d3.select(this).attr("class", "clicked");
})
````

vs.
````
// 命名过的function:
function handle_click(d,i) {
    d3.select(this).attr("class", "clicked");
}

// use it in the click event handler:
rect.on("click", handle_click);  // 直接写function的名字，不加括号
````

### 8. d3 tooltips 文本框

d3加文本框的方法很多，这里展现一种最基础方式。在HTML上直接append文本框内容，利用mouse触发文本框显现。

要点：

* CSS中，position: absolute;

* 直接append到body上，而不是任何的div或svg上

* mouseover中设置tooltip的position, text, 和 visibility

````
.tooltip {
    position: absolute;
    z-index: 10;
}

var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip");

circles
    .on("mouseover", mouseoverFunc) // see below...
    .on("mousemove", mousemoveFunc) // see below...
    .on("mouseout", mouseoutFunc); // see below...
````

go through [7_emissions_line_tooltip.html](7_emissions_line_tooltip.html)

另一种加tooltip的方法：plugin, d3.tip:  http://labratrevenge.com/d3-tip/.



## Homework

**DDL**: 5pm on Nov.20th

**Reading**:

1. Catch up.

2. Multiple lines youtube last class I give you https://www.youtube.com/watch?v=QiNi2aYANUc&list=PL0tDk-f4v1ujc8NrGswT158m2y_7bKs3B&index=2

**Homework**: 

1. 给上节课作业的散点图加悬浮框，显示你觉得重要的信息，加上引导读者去进行悬浮操作的文字，new gist "Lesson 3 scatter with tooltip" (15pt)

2. Make a line chart (one line) any time series data from unicef https://data.unicef.org/resources/resource-type/datasets/, gist subline "Lesson3 line chart" (20pt)

* x、y axis title/unit 5pt

* line chart with axis 5pt

* Note the important point on the chart 5pt

* headline, paragraph brief explanation, source and credit 5pt

* 精细化处理，style，辅助线，等等，参考我第一堂课给你们的那些优秀媒体的作品链接 

* 迟交-5pt

3. 思考：selection.attr 与 selection.style的区别？欢迎邮件哦~
