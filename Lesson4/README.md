## Lesson 4. Multiple Lines、 Voronoi简介 & d3 Transition

hello~ Venti Americano thank you :)


#### Homework Review

* 何茵的分析与悬浮文字框 https://bl.ocks.org/simaozhengqi/5f56755e306a4258de8c202e95fa9f19

* 薛雨菲和陈晓晗的双线图 http://bl.ocks.org/xyfaye/0f11da8ad27ebae4cd39a8c0f00cc89d
    https://bl.ocks.org/Anthea98/0ecb941c29d377e83fb0d2dad6a52851

* domain.nice(): 让轴完结在一个完整的刻度处。
    
* 最上面一条线变成直线的问题 https://bl.ocks.org/mbostock/3371592

* selection.attr 与 selection.style 哥大LEDE program director: Jonoson Soma http://jonathansoma.com/tutorials/d3/using-attr-and-style/


### 1. multiple line chart

* go through [1_multiple_lines.html](1_multiple_lines.html)

* 重难点：将wide data重组

```
	// multiple lines的数据需要structure like this:
	[
		{
			country: "Australia",
			emissions: [
						{ year: 1961, amount: 90589.568 },
						{ year: 1962, amount: 94912.961 },
						{ year: 1963, amount: 101029.517 },
						…
					   ]
		},
		{
			country: "Bermuda",
			emissions: [
						{ year: 1961, amount: 176.016 },
						{ year: 1962, amount: 157.681 },
						{ year: 1963, amount: 150.347 },
						…
					   ]
		},
		…
	]
```

* 加强理解，again: Scott's Line Charts https://www.youtube.com/watch?v=QiNi2aYANUc&list=PL0tDk-f4v1ujc8NrGswT158m2y_7bKs3B&index=2


### 2. restructure data with d3.nest()

* 如果数据是long data，那么我们可以直接用d3自带的命令d3.nest().key().entries()来重组数据

```
var dataset =  d3.nest()
                .key(function(d) {
                    return d.Country;
                })
                .sortValues(function (a, b) { return dateFormat.parse(a.Year) - dateFormat.parse(b.Year)})
                .entries(data);
```

* go through [2_multiple_lines_d3nest.html](2_multiple_lines_d3nest.html) comapre the d3.v3 & d3.v4

* 加深理解

    ** grouping data http://learnjsdata.com/group_data.html

    ** more about nest, rollup, and sorting http://bl.ocks.org/phoebebright/raw/3176159/


### 3. 关于数据处理，munging data

* d3 arrays help page: https://github.com/mbostock/d3/wiki/Arrays

* js教程 http://learnjsdata.com

* 专业处理数据的js库 lodash.js (an extension of the popular underscore.js library): https://lodash.com/docs


### 4. 给multiple lines加mouseover & label

* [3_multiple_line_label_tooltip.html](3_multiple_line_label_tooltip.html)

```
//1. add label
	groups.append("text")

//2. add hover on lines
	groups.on("mouseover", mouseoverGroup)
		  .on("mouseout", mouseoutGroup)

//3. add tooltip on circles
	circles
		.on("mouseover", mouseoverCircle)
		.on("mousemove", mousemoveCircle)
		.on("mouseout",	mouseoutCircle);
```


### 5. mouseover升级版：(elective)

* 单值对应的mouseover [4_one_line_mouseover.html](4_one_line_mouseover.html)

* 让hover这件事无比顺滑：voronoi “泰森多边形法”

* Reference and how-to's:

    ** Mike's block Multi-Line Voronoi https://bl.ocks.org/mbostock/8033015

    ** 教程: http://www.visualcinnamon.com/2015/07/voronoi.html (note:另一种tooltip: Bootstrap lib)

    ** Demo: Zan Armstrong's temperature lines: http://bl.ocks.org/zanarmstrong/38d7f79f61a03acc0ef0

* voronoi 机场地图:

    ** US Airports: http://bl.ocks.org/mbostock/4360892

    ** Arc Aiport map: http://bl.ocks.org/mbostock/7608400, https://mbostock.github.io/d3/talk/20111116/airports.html

    ** World Airports: https://www.jasondavies.com/maps/voronoi/airports/

    ** World Capitals: https://www.jasondavies.com/maps/voronoi/capitals/


### 6. lines with interpolation 差值

* 作用：让线形图变得更加顺滑。 Mike's Spline Editor: http://bl.ocks.org/mbostock/4342190

* 教程: Smoothing out the lines in d3.js: http://www.d3noob.org/2013/01/smoothing-out-lines-in-d3js.html?spref=tw

* 注意: 让线变得顺滑可能会影响对于真实数值的表达，有时候会造成严重误读，切要注意。

* d3v4: http://bl.ocks.org/emmasaunders/c25a147970def2b02d8c7c2719dc7502
        https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529

* 用法: d3.line().curve(d3.curveStepBefore) 直接加在line generator后面

### 7. d3 transition 过渡

* 作用：突出数据变化，提升交互体验。

* “渐现”：[5_scatter_transition_in.html](5_scatter_transition_in.html)

````
//其实这里用处并不大，只是加一个比较吸引眼球的。。逐渐出现。。的效果

circles.sort(function(a, b) {
        return d3.ascending(+a.educationalAttainment, +b.educationalAttainment);
    })
    .transition()
    .delay(function(d, i) {
        return i * 10;
    })
    .duration(500)
    .attr("r", dotRadius);
````

* “渐入”： [6_scatter_transition_move_in_slow.html](6_scatter_transition_move_in_slow.html)

````
// 记得mouseover里我们已经用过这个用法了吗？让点点逐渐变大，而不是一下子，愣愣地，突然变大……

    circles.on("mouseover", function(d) {
        d3.select(this)
            .transition()
            .duration(50)
            .attr("r", 7); 
    })
// 逐渐还原
    circles.on("mouseout", function (d) {
        d3.select(this)
            .transition()
            .attr("r", 3);
    });
````

**Read**:

Mike的讲解 Working with Transitions: http://bost.ocks.org/mike/transition/
Optional Academic Research: http://vis.berkeley.edu/papers/animated_transitions/

### 8. click to transition 点击->过渡

* 点击变换数据 [7_scatter_data_transition.html](7_scatter_data_transition.html) 

    可跟踪高亮点（middle point)。这个例子中，点击过渡只能变换一次

* 两套数据间可切换 [8_scatter_data_transition_toggle.html](8_scatter_data_transition_toggle.html)

    用一套if-statements get到被点击的button里面的value，再决定transition到哪一组数据

````
<button class="clicker" id="toys">Show Toys!</button>
<button class="clicker" id="books">Show Books!</button>
...
d3.selectAll("button.clicker").on("click", function() {

    // 1. 初始状态下被选择的button样式
    // 2. give click func to btns:
        // 2.1. 获取重要info：“当下”元素的id
            var whichbutton = d3.select(this).attr("id"); // whichbutton 会变成 "toys" 或者 "books"
        // 2.2. change btns 样式
        // 2.3. change circles 位置
        // 2.4. 换掉之前的title
...     
````

* N组数据切换：transition line [9_lines_transition.html](9_lines_transition.html)

    (using Bootstrap for some CSS layout and a map image.)

````
d3.selectAll("button").on("click", function() {

    var selectedline = d3.select("path.line");
    var thisButton = d3.select(this);  // "this"：被操作的那个DOM元素

    // 得到当下的id，决定过渡到什么数据
    var newdata = get_values_for_country(thisButton.attr("id"));  

    // 给选中的按钮一个可识别的样式
    d3.selectAll("button").classed("selected", false);
    thisButton.classed("selected", true);

    // 过渡到新数据
    selectedline.transition().attr("d", line(newdata));
````

## FYI: bootstrap for CSS layouts

Have a look at Bootstrap, in very common usage in industry:

* http://getbootstrap.com/
* https://getbootstrap.com/docs/3.3/css/
* https://getbootstrap.com/docs/3.3/css/#grid-example-basic

可以尝试用在本周作业中，如[9_lines_transition.html](9_lines_transition.html) , though still an ugly page ...

注意: 用bootstrap的时候就不要用d3 tooltip了，bootstrap有自己的tooltip(.~)，如果一定要用改一下class ".mytooltip" or something else. 



## Final Project (due: Jan.2nd, 2019) 

* Data: UNICEF 或 自选

* 网页项目，自定目标读者

* 评分标准 400’：

    ** 图表类型: 使用3个以上图表类型，图表类型的选择要适合数据和作者意图。 80'

    ** 交互: 在需要的地方有过渡、高亮、文本提示框的效果，以及适当处使用排序、过滤、动画、数据更新等。80'

    ** 文字: 行文流畅无语病或错字，能够和数据图相互配合，起到解释数据图、明确数据图意图指向的作用。40'

    ** 故事线: 有意义、有趣的故事线，形成有独到见解的故事。40'

    ** 数据分析: 具有有趣的发现，数据分析合理到位。40'

    ** 图表元素: 标签、坐标轴、图例、图注标注正确。 40'

    ** 视觉设计: 色彩搭配和谐, 具有吸引力, 重点突出。40'

    ** 页面排版: 正确使用代码进行排版,页眉页脚设计完备，项目信息、数据来源、作者署名完备。20'

    ** UX设计: 读者可以被正确引导，知道哪里该滑动、哪里该点击。20'




## Homework

**DDL**: 5pm on Nov.27th

* 这节课需要至少两天去消化吸收，没开玩笑的！

**Reading** 预习：d3 data update

* Peter Cook的教程：https://d3indepth.com/enterexit/

* Mike的update三部曲：

    ** General Update Pattern https://bl.ocks.org/mbostock/3808218

    ** Key Functions https://bl.ocks.org/mbostock/3808221

    ** Update Transitions https://bl.ocks.org/mbostock/3808234

**Homework**: 

1. Multiple Lines (30pt)：使用UNICEF数据，或者和你final project相关的数据，多组时间序列数据。

* Lines 10'
* 要有mouseover，引出线或点的变化，加上tooltip，10'
* Label the outlier lines in the right margin (the highest or lowest, ones that are different) 用简短文字标出 5'
* A short description and identify the source above your chart. 5'
* 加分项：用voronoi加mouseover 15'
* gist subject: "Lesson4 Multiple Lines"

2. Transition Plot With Buttons (20pt) 

* 找一些有趣的line chart/scatter plot/Bars，做数据转换过渡。 （同类型图表中的数据转换）
* 数据条数相等，没有丢失或多余数据
* 加分项：用bootstrap，排版优秀 10'
* gist subject: "Lesson4 Transition Plot"


