var width = 350;
var height = 200;


$(document).ready(function(){
   
    //Basic Colors
    basicColors();

    //Manipulation
    manipulation();

    //Linear Scales
    linearScale();

    //Categorical Scales
    categoricalScale();

    //Transitions
    transitions();
});

function basicColors(){
    var svg = d3.select("#basicCode").append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height);

    var circle = svg.append("circle")
        .attr("cx", width/2)
        .attr("cy", 100)
        .attr("r", 20)
        .style("fill", "red");
}

function manipulation(){
    var svg = d3.select("#manipulationCode").append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height);
    var red = d3.rgb(255, 0, 0);

    var circle1 = svg.append("circle")
        .attr("cx", width/3)
        .attr("cy", 100)
        .attr("r", 20)
        .style("fill", red.brighter(2));

    var circle2 = svg.append("circle")
        .attr("cx", width/3 + 50)
        .attr("cy", 100)
        .attr("r", 20)
        .style("fill", red);

    var circle3 = svg.append("circle")
        .attr("cx", width/3 + 100)
        .attr("cy", 100)
        .attr("r", 20)
        .style("fill", red.darker(2));
}

function linearScale(){
    var svg = d3.select("#linearCode").append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height);

    var color = d3.scale.linear().domain([1,10]).range(['red', 'blue']);

    var circle1 = svg.append("circle")
        .attr("cx", width/2 -50)
        .attr("cy", 100)
        .attr("r", 20)
        .style("fill", color(2));

    var circle2 = svg.append("circle")
        .attr("cx", width/2 + 25)
        .attr("cy", 100)
        .attr("r", 20)
        .style("fill", color(9));
}

function categoricalScale(){
    var svg = d3.select("#categoricalCode").append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height);

    var color = d3.scale.category20b();

    var circle = svg.append("circle")
        .attr("cx", width/2 - 50)
        .attr("cy", 100)
        .attr("r", 20)
        .style("fill", color(2));

    var circle2 = svg.append("circle")
        .attr("cx", width/2 + 25)
        .attr("cy", 100)
        .attr("r", 20)
        .style("fill", color(9));
}

function transitions(){
    var svg = d3.select("#transitionCode").append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height);

    var color = d3.scale.category20b();

    var circle = svg.append("circle")
        .attr("cx", width/2)
        .attr("cy", 100)
        .attr("r", 20)
        .style("fill", color(1))
        .on("click", function(){
            d3.select(this)
            .transition()
            .duration(1000) .style("fill", color(Math.floor((Math.random()*20)+1))); 
        });
}
