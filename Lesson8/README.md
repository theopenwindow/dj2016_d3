# Lesson 8 Scrolling, Stepper and ...

## Things Interesting

### 1. Book <Visualization Data: A Handbook for Data Driven Design>, 2nd Edition will be published on 29th June 2019 http://www.visualisingdata.com/2018/12/announcing-the-second-edition-of-my-book-due-2019/

### 2. The Data Journalism Handbook 2.0 comes out https://datajournalismhandbook.org/handbook/two/

## Homework Review

### Stacks

* 河流图与普通堆叠图的transition, from Sun Yixuan: https://bl.ocks.org/Rockysunny/ee1a8357dfe06c896de15368651d8fc5

* Y轴对于streamgraph的意义非常“微妙” https://datavizcatalogue.com/methods/stream_graph.html

### Map

#### Color scale for choropleth map: https://d3indepth.com/scales/

* scale on color from Li Jiaqi: https://bl.ocks.org/Amber3232/6c735f8899563113a0b8fd081d425201

* scaleQuantize（数据范围的输入->分开的输出）, scaleQuantile（数据的输入->分开的输出）, scaleThreshold（手动定义数据范围设定）
```
	Jiaqi's domain expand:[0.1, 26105.4]
	但这不应该作为颜色的domain，这组数据更适合用scaleQuantile，也就是说所有的数据给进去，再给它几个确定的颜色，按照分位法分配

	var colorScale = d3.scaleQuantile().range(["#b6e0ff", "#99bfff", "#759cff", "#c4b2ff", "#edb2ff", "#ffdae9"]);
	var year2018 = getCol(gdp, 'year2018');
	colorScale.domain(year2018);
```

* scalePow 指数

* scaleSqrt 开方，especially on bubble map

* bubble map from Chen Xiaohan: http://bl.ocks.org/Anthea98/0b528b4965b3d81408aa08c773f419e8

* Good found: https://www.data-to-viz.com/story/GPSCoordWithoutValue.html

#### filter 南极 


## I. Steppers

### 1. Steper all buttons

* Code from Jim Vallandingham http://vallandingham.me/stepper_steps.html

```
html:
	<button id="step1" class="step-link active">Step1</button>
	<button id="step2" class="step-link">Step2</button>
	<button id="step3" class="step-link">Step3</button>

	<div class="annotation-step" id="step1-annotation" style="display:block;"></div>
	<div class="annotation-step" id="step2-annotation"></div>
	<div class="annotation-step" id="step3-annotation"></div>

css:
	button {}
	button.active, button:hover {}
	.annotation {
	  	position: absolute;
	}

js:
	1.1 得到当前button的id
	1.2 相应id的button给特别的class,"active"；其他暗调
	1.3 相应id（作为id的一部分）的div出现；其他display none

```

* go through [1_stepper_all_buttons]

### 2. Steper Previous and Next

```
js逻辑：
2.1 click 触发 changeStage()

2.2 changeStage(){
	a. get当前id
		previous -> handlePrev()
		next -> handleNext()
	b. 根据当前state，变按钮、文字、图
		updateButtonLook(stage, totalStages)
		showText(stage);
		handleChart(stage)
}

3.1 handlePrev(){
		当前stage 减1
		stage -= 1; (stage = stage -1; )
	}
	handleNext(){
		当前stage 加1
	}

3.2 updateButtonLook(stage, totalStages){
	//stage是0就'prev'变灰，stage是最后一个则'next'变灰
}

3.3 showText(stage){
	//stage -> which to show
}

3.4 handleChart(stage){
	// 可以用我们前面学的update的思路做redraw
}
```

* JS Operators https://www.w3schools.com/js/js_operators.asp
```
x += y 就是 x = x + y
x -= y 就是 x = x - y
```

* go through [2_stepper_prev_next.html](2_stepper_prev_next.html)


### Stepper Examples

* 这种交互方式越来越少，近几年逐渐被scrolling取代

* The Facebook Offering: How It Compares https://archive.nytimes.com/www.nytimes.com/interactive/2012/05/17/business/dealbook/how-the-facebook-offering-compares.html

* But this one: pretty good! https://www.wsj.com/graphics/china-emergence-of-a-trade-leviathan/


## II. Scrolling

### scroll my way

```
html:
front 与 back
front 里：N个part

css:
back: fixed
front: absolute

js:
1. get到页面滚到哪了 
	$(window).scroll(function(){
		var windowTop = $(window).scrollTop();
	})

2. 把页面分成几个区间
	var front1 = $("#front1").offset().top - h,
		front2 = $("#front2").offset().top - h;	 

3. 滚到某一个区间，执行某一个function
	if(windowTop >= front1 && windowTop < front2){
		blahblahblah();
	}

4. 用changesection来确保，滚到这个区间，相应的function只执行一次
	if(windowTop >= front1 && windowTop < front2 && section[0]==0){
		blahblahblah();
		changeSection(0)
	}
```

* go through [3_scrolling_my_way]

### [4_scrolling_freeman]

### Pudding [How to implement scrollytelling with six different libraries](https://pudding.cool/process/how-to-implement-scrollytelling/#scrollstory )

### Mike [How To Scroll](https://bost.ocks.org/mike/scroll/)

### Examples [Scrolling In Data Visualization](http://vallandingham.me/scroll_talk/examples/)


## III. Responsive

### 1. columns

* Bootstrap https://getbootstrap.com/

* Semantic UI http://www.semantic-ui.cn/

* Pro Publica Data Nerds developed an open source tool for building custom responsive grids https://www.propublica.org/nerds/meet-column-setter

### 2. @media CSS https://www.w3schools.com/csSref/css3_pr_mediaquery.asp
```
<style>
	//All screens mainly for mobile

	@media screen and (min-width: 800px){
		//800px - 1500px的屏幕
	}

	@media screen and (min-width: 1500px){
		//大于1500px的屏幕
	}
</style>
```

### 3. Responsive Charts in D3

* http://eyeseast.github.io/visible-data/2013/08/28/responsive-charts-with-d3/

* More comprehensive: http://blog.webkid.io/responsive-chart-usability-d3/

* https://www.safaribooksonline.com/blog/2014/02/17/building-responsible-visualizations-d3-js/


## Homework: Send me your proposal and sketch (with real data trend! Don't imagine it!)

