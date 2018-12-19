$(window).scroll(function(){
	// All functions triggered by scroll written here:

	var windowTop = $(window).scrollTop();

	if(windowTop >= front1 && windowTop < front2 && section[0]==0){
		main0();
		changeSection(0)
	}

	if(windowTop >= front2 && windowTop < front3 && section[1]==0){
		main1();
		changeSection(1)
	}

	if(windowTop >= front3 && windowTop < front4 && section[2]==0){
		main2();
		changeSection(2)
	}

	if(windowTop >= front4 && windowTop < front5 && section[3]==0){
		main3();
		changeSection(3)
	}

	if(windowTop >= front5 && section[4]==0){
		main4();
		changeSection(4)
	}
})


