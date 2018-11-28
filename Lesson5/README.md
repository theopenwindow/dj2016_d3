# Lesson5: Data Updates, Data Binding by Key, More Transitions

codeInTheRain~ https://rainymood.com/

## Homework Review

* ZhaoBo's voronoi multiple lines http://bl.ocks.org/AmpleBo/087e45cbf934d9527c0fcac621ccae73

* Transition Scatters with Bootstrap https://bl.ocks.org/AmpleBo/18d76a34cfb77ac7c197a136247fdc84

* Wenzhi's multiple lines http://bl.ocks.org/hlydxpwz/d7ce754ac761484a203c39e6c6d4e5cb 

* semantic UI http://www.semantic-ui.cn/


### Multiple Lines Voronoi

* 重难点：处理数据

```
var nested = d3.nest()
    .key(function(d) { 
        // this key is the pair of x/y coords - to keep them single
        return xScale(timeParse(d.year)) + "," + yScale(+d.amount);
    })
    .rollup(function(v) {
        return v[0]; // first of the objects, prevents use of 2 in same place
    })
    .entries(d3.merge(dataset.map(function(d) { return d.emissions; })))
    .map(function (d) { return d.value;});  // the result is just a flat list of values
```

* d3.nest() 例子 http://bl.ocks.org/phoebebright/raw/3176159/

* d3.nest() API https://github.com/d3/d3-collection#nests

* group data http://learnjsdata.com/group_data.html


### 转手收藏：编程学习中文资源网站

* segmentfault中文技术交流平台 https://segmentfault.com

* 掘金 https://juejin.im/

* InfoQ https://www.infoq.cn/

* 基础语法 MDN; w3schools

* stackoverflow: my favorite



## New Here

### 1. Data Binding, Update Pattern, Keys

Recover:

* Thinking With Joins: http://bost.ocks.org/mike/join/

Best Tutorial Here:

* Peter Cook https://d3indepth.com/enterexit/

Read:

* 将整个过程清晰“可视化”: http://kristw.github.io/d3-data-binding/?utm_content=buffer4c96b&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer
* General Update Pattern 1: http://bl.ocks.org/mbostock/3808218
* Update Pattern 2: Key Functions: http://bl.ocks.org/mbostock/3808221
* Update Pattern 3: Transitions: http://bl.ocks.org/mbostock/3808234


使用**key function** 非常重要：清楚展现哪些元素代表enter进来/remove掉的数据。

* Object Constancy Intro: http://bost.ocks.org/mike/constancy/  

The key function is used like this:

````

var bars = d3.selectAll("rect")
    .data(mydata, function(d) {
        return d.key; // 你可以选用data中任意一列具有唯一指代性的数据
    });

// the function above it not filtering the data set, or reducing it, or searching it!
// Now you can join your data:

bars
    .enter()
    .append("rect")
    .merge(bars)
    .transform()
    ....

// and from here you probably do a bars.exit() and bars update, too.

````

* go over [2_bar_updates.html](2_bar_updates.html)

### 2. Dropdown Select Menu Use

* go over [3_scatter_updates.html](2_bar_updates.html)



### DRY Code

DRY: Don't Repeat Yourself. 如果你有大量的code在重复做类似的事情，应该就可以用function xxx(data){}的方式来重组他们。大量的cut-and-paste 的工作也会带来errors。It's easier to debug smaller code.

### 用正则表达式（Regex）来替换illegal characters

如果你想利用数据中的某一项来作为id(like "path.line#Afgahnistan")，需要修正其中的illegal characters,比如空格、逗号、引号、句号等等，同时用半角下划线来替代他们，that's regex!
参考：https://blog.csdn.net/huimiri5756/article/details/81048814

````
return d.country.replace(/ |,|\./g, '_'); 
````



## Homework


**Homework 1 (15pt)**: Finish Bar Homework

文件 [bar_homework.html](bar_homework.html)的comment中, 有很多 //TODO 项目，完成所有的 //TODO 。 Git Subject "Lesson 5 Finished Bar."  Make sure you fill in the select menu!

**Homework 2 (35pt)**: An Updating Plot With 2+ Datasets

用update做一个两组以上数据transition的图。

1. 轴需要transition
2. the enter, update, exit pattern 要有 transitions, 都放在一个 function 中，比如 "draw"/"update"
3. 使用按钮/下拉菜单来完成数据转换
4. d3 tooltips
5. 在有趣的点旁边进行高亮标注 (如果不是很多的话可以都标)

可以是bars/scatters/lines，使用final project相关数据!  如果是一个比较大的dataset，也可以做这个dataset内部的数据切换，比如top10，bottom 10，所有…… 或者是不同column之间的切换。Git Subject "Lesson5 My Update Plot."

