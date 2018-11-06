var svgWidth = 1000,
    svgHeight = 500;

var margin = {top: 20, right: 25, bottom: 20, left: 200};

var chartWidth = svgWidth - margin.left - margin.right,
    chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("body") //或者用class或id去call某一个div
            .append("svg")
            .attr("width", svgWidth) //attr: attribute
            .attr("height", svgHeight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            // .attr("transform", "translate(200, 20)")


            // <g transform="translate(200,20)"> 