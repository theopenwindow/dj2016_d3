var w,h,ratio,ratio_h,totalFronts,front1,front2,front3,front4,front5;
w = $(window).width();
h = $(window).height();
totalFronts = 5;

//set changing point
front1 = $("#front1").offset().top - h;
front2 = $("#front2").offset().top - h;
front3 = $("#front3").offset().top - h;
front4 = $("#front4").offset().top - h;
front5 = $("#front5").offset().top - h;

//建立一个都是0的array，多少个front多少个0
var section = [];
for(var i=0; i<=totalFronts-1; i++){
	section[i]=0
}
// console.log(section)

//保证当前front是1
function changeSection(n){
	for(var i=0; i<=totalFronts-1; i++){
		if(i==n) {
			section[i]=1;
		} else {
			section[i]=0
		}
	}
}

