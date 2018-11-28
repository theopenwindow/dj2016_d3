# Lesson6: Stacking Chart Types, Intro to Small Multiples


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

* go over [1_area_plot.html](1_area_plot.html)


## 2. Stacked Area

We use the area layout and the stack function for this.

The stacker adds elements to your dataset that say what "level" an item should go in. It calculates a y0, for the y base location, and a y, which is the height from the base position.  These get added to your dataset if they weren't there already.  (Note: A lot of stacked bar examples just construct the y and y0 by hand, instead of using the stack function. But if you use the stack layout, you can do transitions very easily!)

Reference:
  
* Stack API https://github.com/d3/d3-shape#stacks

* See: d3 v4 example https://bl.ocks.org/greencracker/e08d5e789737e91d6e73d7dcc34969bf

```
//用于处理数据，把数据做成直接能画area的状态
var stack = d3.stack()
			.keys()
			.order()
			.offset()

// area生成器
var area = d3.area()
            .curve(d3.curveXXXX)
            .x(function(d) {return xScale(); })
            .y0(function(d) { return yScale(d[0]); })
            .y1(function(d) { return yScale(d[1]); });
```

* See [2_stacked_area.html](2_stacked_area.html)


...















## Homework

DDL Dec 11 5pm

**Homework 1 (25pt)**: Stacked Areas /Streamgraphs 

使用自己的数据做一个Stack Area Chart. 要有d3 tooltip

加分 5‘ 用button完成Stack Area 与Streamgraph之间的过渡转换

Gist Subject "Lesson6: Stacked Area."