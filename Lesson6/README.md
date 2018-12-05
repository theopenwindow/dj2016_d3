# Lesson6: Stacking Chart Types, Intro to Small Multiples

### Homework1 Review

* Finished bar 逻辑思路
```
    // 控制区
    d3.select("#menu select")
        .on("change", function() {

            从下拉菜单得到value，get调用哪一列
            column = d3.select("#menu select").property("value"); 

            //利用function拿到画图的具体数据：get这一列数据；filter前20；
            dataset = top20_by_column(data, column);

            //update bars
            redraw(dataset, column);
    });

    // 初始：
    redraw(dataset, column);

    // filter 前20
    function top20_by_column(data,column){}

    // update function
    function redraw(){}
```

* wenzhi's finished bars http://bl.ocks.org/hlydxpwz/0517f0bdca4f0ce7d92d770165c68002

## 1. Area Plot

并不是新来的！只是一位填了色的老朋友~

````
var area = d3.area()
    .x(function(d) {
        return xScale(dateParse(d.year));
    })
    .y0(height) //补齐area下面贴近x轴的那一段
    .y1(function(d) {
        return yScale(+d.amount);
    });
````

* go through [1_area_plot.html](1_area_plot.html)


## 2. Stacked Area

d3.stack()会完成两件事：1. 告诉数据进那一“层”；2. 计算出每一层的lower values(对应area generator里的y0),和higher values(area generator里的y1)。

Reference:
  
* Stack API https://github.com/d3/d3-shape#stacks

* See: d3 v4 example https://bl.ocks.org/greencracker/e08d5e789737e91d6e73d7dcc34969bf

```

// 1. area生成器
    var area = d3.area()
        .curve(d3.curveXXXX)
        .x(function(d) {return xScale(); })
        .y0(function(d) { return yScale(d[0]); })
        .y1(function(d) { return yScale(d[1]); });

// 2. prepare your data as wide dataset

// 3. stack function: 准备处理数据，把数据做成直接能画area的状态

    var stack = d3.stack()
        .keys()
        .order()
        .offset()    

// 3. stack the data! 每一层data的每个object都会出现两个number，代表lower value和higher value

    var layers = stack(dataset)

// 4. get the maxY

    var maxY = d3.max(
        layers,  function(l){
            return d3.max(l, function(d) { return d[1]; })
        }
    )

// 5. then let's draw the stacked area！

    svg.selectAll(".layer")
        .data(layers) //layers数据进入.layer
        .enter() // “意识占地儿”但什么都没有
        .append("path")  // 贴上path
        .attr("class", "layer") // literally 给layer这个class
        .attr('d', area) // 用上面的area生成器来把layer画出来，已经准备好了谁是y0谁是y1
        .style("fill", function(d) { return colorScale(d.key); }) // 按照key来给颜色

```

* Go through [2_stacked_area.html](2_stacked_area.html)

* Wide Data & Long Data 转换：http://jonathansoma.com/tutorials/d3/wide-vs-long-data/ 
...


## 3. Streamgraph 河流图

### .order() 层的顺序

* stackOrderNone 默认顺序，和keys中的顺序保持一致
* stackOrderAscending 从下到上layer values和递增，最小的一层在下面
* stackOrderDescending 从下到上layer values和递减，最大的一层在下面
* stackOrderInsideOut 从中间到两边layer values和递减，最大的一层在中间 (河流图)
* stackOrderReverse 使default keys反过来

### .offset() 抵消

* stackOffsetNone 默认无抵消
* stackOffsetExpand 使各层的和标准化为1（100%）
* stackOffsetSilhouette 使层的y轴中心位于0
* stackOffsetWiggle 使层的扭曲最小 (最长用于河流图)


## 4. Stacked Bar Chart

```
var series = svg.selectAll(".layer")
    .data(layers) 
    .enter().append("g")
    .style("fill", function(d) { return colorScale(d.key); });

series
    .selectAll("rect.layer")
    .data(function(d){ return d; })
    .enter().append("rect")
    .attr("class","layer")
    .attr("x",function(d) { return xScale(d.data.Year); })
    .attr("y",function(d) { return yScale(d[1]); })
    .attr("width", xScale.bandwidth())
    //lower value的坐标 - higher value的坐标就是rect的height啦！
    .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]) ; })
```

* go through [3_stacked_bar.html](3_stacked_bar.html)


## 5. Stacked Bar Percent (Normalized)

* stack.offset(d3.stackOffsetExpand);

* 需要Transition的元素
```
// 1. 改y轴的tick format 
    yAxis.tickFormat(d3.format(".0%"))

// 2. stack
    2.1 stack.offset(d3.stackOffsetExpand);
    2.2 layers = stack(dataset)
    2.3 y-domain
    2.4 yscale：rect获得新的"y"和"height"
    
// 3. y轴
```

* 交互的逻辑
```
// 1. default graph & radio input setting

// 2. select input -> change data function
    d3.selectAll("input").on("change", handleFormClick);
    handleFormClick();

// 3. handleFormClick(){}
    if (this.value === "bypercent") { 
        currentMode = "bypercent"; 

        y轴format
        stack.offset
        layers
        draw(layers);
    } else {
        currentMode = "bycount"; 
        
        y轴format
        stack.offset
        layers
        draw(layers);
    }

// 4. draw(){}
    draw(){
        y-domain;
        var series;
        enter()
        rect
        改变rect
        series.exit().remove()
        变轴
    }

```

* Go through [4_stacked_bar_percent.html](4_stacked_bar_percent.html)

### some more examples: 

* Grouped bar chart example: http://bl.ocks.org/mbostock/3887051

Fancier - Animations!

* Stacked to Grouped Bars Animation: http://bl.ocks.org/mbostock/3943967
* Stacked to multiples transition: http://bl.ocks.org/mbostock/4679202


## 6. Small Multiples

### Really Good Tutorial from Vallanding Ham: http://vallandingham.me/small_mults_talk/

* a Senior Data Visualization and Data Science Engineer.http://vallandingham.me

### 6.1： "手画"

```
// 1. prepare dataset with keys

// 2. 计算出每一个key的最大值 (如果用统一的y轴，另说)

    dataset.forEach(function(d) {
        d.maxValue = d3.max(d.values, function(v) { return +v.Measles; });
    });

// 3. 直接把dataset给svg，有多少组data就建多少svg

    var svg = d3.select("body").selectAll("svg")
        .data(dataset)
        .enter().append("svg")
        .attr("width", ...)

// 4. 每个svg上画area

    svg.append("path")
        .attr("class", "area")
        .attr("d", function(d) {
            yScale.domain([0, d.maxValue]); //如果你每一个图的y domain不一样，可以像这样放在"d"后面写
            return area(d.values);
        });
```

* Go through [5_small_multiples_simple.html](5_small_multiples_simple.html)

### 6.2：d3.each()

* .each：使得它附着的selection全都会call这个function； 区分于.call：只在本selection上去叫里面的function。

* d3InDepth的讲解 https://d3indepth.com/selections/#each-and-call

* API https://github.com/d3/d3-selection#selection_each

```

// 1. prepare dataset and domains

// 2. 加data个svg，用d3.each让每一个都执行function multiple

    var svg = d3.select("body").selectAll("svg")
        .data(countries) 
        .enter().append("svg")
        .attr("width", )
        .attr("height", )
        .append("g")
        .attr("transform", "translate()")
        .each(multiple); 

// 3. multiple()

    function multiple(){

         // 3.1 选择this
                var localsvg = d3.select(this); //这里的this就是执行了multiple的每一个g啦

        // 3.2 各自的y-domain
                yScale.domain([0, d3.max(country.values, function(d) { return d[illness]; })]);

        // 3.3 开始画……area, line, text ……
                localsvg.append("path")
                    .attr("class", "area")
                    .attr("d", function(d) {
                        return area(d.values);
                    });
    }

```

* Go through [6_small_multiples_each.html](6_small_multiples_each.html)

### 6.3 linked small multiples
```
具体怎么画都是可以查出来的，逻辑清楚最要紧

画图的逻辑：
    1. N个div
    2. +svg +g:
        2.1 +rect (热区)
        2.2 +g +area & path & texts & circle & axis

交互的逻辑：
    I click button -> sort charts with countries/ values
    II mouseover to show values
        1. rect + mouseover/move/out
        2. mouseover: 
            2.1 circle 显示
            2.2 两端年份隐去
        3. mousemove:
            3.1 得到当前坐标x(d3.mouse(this)[0])，得到对应数据(xScale.invert()) => year
            3.2 parse year => date
            3.3 给circle相应的cx、cy ，with date (with bisect)
            3.4 给caption和curyear相应的坐标
        4. mouseout:
            4.1 circle 隐去
            4.2 两端年份显示
            4.3 caption和curyear内容remove
```

* Go through [7_small_multiples_linked.html](7_small_multiples_linked.html)


### Read more: 

* Interactive and Responsive Small Multiples with D3 https://blog.scottlogic.com/2017/04/05/interactive-responsive-small-multiples.html

* Small Multiple Maps Using D3 https://blog.webkid.io/multiple-maps-d3/

* Another Intro https://www.infragistics.com/community/blogs/b/tim_brock/posts/an-introduction-to-small-multiples



## Homework

DDL Dec 11 5pm


**Readings**:

* https://flowingdata.com/2014/10/15/linked-small-multiples/
* Mike's tutorial: http://bost.ocks.org/mike/map/

**Homework 1 (25pt)**: Stacked Areas /Streamgraphs 

使用自己的数据做一个Stack Area Chart. 要有d3 tooltip

加分 5‘ 用button完成Stack Area 与Streamgraph之间的过渡转换

Gist Subject "Lesson6 Stacked Area"


**Homework 2 (25pt)**: 

用自己的项目数据做一个 small multiples。 可以用上面的任何一个model去做，但如果画了其他种类的small multiples，或有复杂一些的work on it可以额外加分！尽量使用和项目相关的数据。 

gist "Lesson6 Small Multiples"

