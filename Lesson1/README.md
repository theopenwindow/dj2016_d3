## PART I. 初始d3思维

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
````
  csv 可以替换成其他数据形式，如tsv/json。

8. 用d3写一个简单的表格：初识d3思维 [5_table.html](5_table.html)
````
    d3.select().data().enter().append();
````

9. 用d3引用csv数据，写一个表格 [6_table_d3_data.html](6_table_d3_data.html)

10. 用d3引用csv数据，写一个heatmap表格 [7_heatmap_table.html](7_heatmap_table.html)

## Homework

DDL: 5pm on Nov.6th

Readings:

* Read Chapter 3 of IDVW: http://chimera.labs.oreilly.com/books/1230000000345/ch02.html. You can stop at the SVG part at the end of chapter 3, for now. (Chapter 2 may be nice background but is optional.)

* Loading data with D3, at http://learnjsdata.com/read_data.html.


**Homework:** 复习js 解决[js_errors.html](js_errors.html) 中的问题，让它显示正确。 发送gist链接，subject line: "Lesson 1, JS errors"。 (20pt)

**Homework**: 任意下载一组数据，按照以上要求format your data。发送gist链接， subject line:'Lesson 1: d3 load CSV data.'  You'll need this file next week. (12pt)
