
function switchStep(newStep)
{
    $(".step-link").toggleClass("active", false); // 取消所有link的active class
    $("#" + newStep).toggleClass("active", true); // 保留当前link的active class
}

function switchAnnotation(newStep)
{
    $(".annotation-step").hide(); //隐藏所有注释
    $("#" + newStep + "-annotation").delay(300).fadeIn(500); //当前逐渐显示
}

$(document).ready(function() {
    $("button.step-link").click(function(e) {
        var clickedStep = $(this).attr('id'); // get到当前link的id
        //用得到的current id做变量，执行上面两个function
        console.log(clickedStep)
        switchStep(clickedStep);
        switchAnnotation(clickedStep);
        return false;
    });
});