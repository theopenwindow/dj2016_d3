## Lesson1. 初始d3思维

1. 为什么是d3? https://d3js.org/

    * 作用 https://github.com/d3/d3/wiki/Gallery

    * 才华横溢的Mike Bostock, d3 creator, former @nytgraphics https://bost.ocks.org/mike/

    * d3 versions https://cdnjs.com/libraries/d3/

    * d3 version 3 https://github.com/d3/d3-3.x-api-reference/blob/master/API-Reference.md

    * d3 version 4 https://github.com/d3/d3/blob/master/API.md

2. Alternative "d3"

    * Highcharts https://www.highcharts.com/demo

    * Echarts https://ecomfe.github.io/echarts-examples/public/index.html

4. 对比[1_homework_style.html](1_homework_style.html)与[2_project_style.html](1_project_style.html),未来做项目时不要把html、css、js写在一个页面里，作业中为提交方便暂用这种方式。

5. Go through [2_console_javascript.html](2_console_javascript.html): 复习console.log的作用，“array数组”/ “object对象”等概念

6. Prepare data for d3

    * 保存原格式数据
    * 变量名称：清晰、短、无空格
    * 所有“列”需要命名
    * 数据格式：无逗号

````
    var object = {
      Country: “USA”,
      “Number of Bananas per Capita (millions)”: “556”,
      ”Total Length of Peels if Laid End to End (kilometers)”: “412415123”
    }


    如果要得到“556”，你需要type:


    object[“Number of Bananas per Capita (millions)”]

    对比无逗号：

    var object = { 
      country: “USA”,
      numBananas: “556”,
      peelLength: “412415123”
    }

    易读，且，精简call到556的方式

    object.numBananas  //returns “556”
````

7. 加载数据：[4_d3_load_data.html](4_d3_load_data.html)
````
    d3.csv("data.csv",function(error, data){
      if (error)  { console.log("error loading", error); }
      //your d3 code
    })
    csv 可以替换成其他数据形式，如tsv/json。
````
  
8. 用d3写一个简单的表格：初识d3思维 [5_table.html](5_table.html)

    * How selections work demo: selectAll vs. select: http://prcweb.co.uk/lab/selection/

````
    d3.select().data().enter().append();
````

9. 用d3引用csv数据，写一个表格 [6_table_d3_data.html](6_table_d3_data.html)

10. 用d3引用csv数据，写一个heatmap表格 [7_heatmap_table.html](7_heatmap_table.html)

## Homework

DDL: 5pm on Nov.6th

**Readings**:

    * Read Mike Bostock's Nested Selections: https://bost.ocks.org/mike/nest/. 

    * Thinking with Joins https://bost.ocks.org/mike/join/.

    * 超经典的三个小圈圈 https://bost.ocks.org/mike/circles/.

    * d3教程大神Scott Murray的视频Binding Data https://www.youtube.com/watch?v=XtxfXcFDMaQ&index=2&list=PL0tDk-f4v1ujCTy4xgYIwzky0uFEm7wiY.


**Gist**: 任意下载一组数据，再用d3写成table，发送gist链接， subject line:'Lesson 1: d3 table.'  (30pt)
* 以其中一列为默认排序，点击任意table header可以以该列为标准进行排序；
* 创立一列以其它数据为基础的统计数据，和、差、百分比等都可以。
* 用你自己的方式美化它，要比我的example好哦！
* 需要有标题、相应解释文字、数据来源及作者署名。 (25pts)
