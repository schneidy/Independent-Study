//Globals
var data = [];

// Inital loading
$(document).ready(function(){
    overallInit();
});


// Loading of overall viz
function overallInit(){

    // Our projection.
    var xy = d3.geo.albersUsa();

    // Main SVG container
    var svg = d3.select("#viz").append("svg");
    svg.attr("id", "mainSVG");
    svg.append("g").attr("id", "states");

    // Adding States
    d3.json("../json/us-states.json", function(collection) {
          svg.select("#states")
            .selectAll("path")
            .data(collection.features)
            .enter().append("path")
            .attr("d", d3.geo.path().projection(xy))
            .attr("id", function(q) {return q.properties.name.split(' ').join('');})
            ;
    });

};

// Topic Selection and coloring
function topicSelection(topic){
    data = [];
    d3.selectAll("path")[0].forEach(function(state){
        //cleans up the state id
        var stateName = state.id.replace( /([a-z])([A-Z])/, "$1 $2").replace( /([a-z])([A-Z])/, "$1 $2");
        var abbr = stateAbbr[stateName];
        var url = "php/proxy.php?topic="+topic+"&state="+abbr;
        d3.json(url, function(json){
            var numBills = json.length;
            var color =  d3.scale.category20c();
            data.push({state : state.id, billTotal : numBills});
            data = data.sort(function(a, b){return b.billTotal - a.billTotal})
            
            d3.select(state).transition().duration(1000).style("fill", function(){
                var newColor;
                if(numBills <= 100){
                    newColor = d3.hsl(100, 10, (1 - numBills/100));
                }else if(numBills > 100 && numBills <= 250){
                   // Green for total bills over 100
                   newColor = d3.hsl(125, 10, 1 - numBills/250);
                }else if(numBills > 250 && numBills <= 1000){
                    // Blue for total bills over 250
                    newColor = d3.hsl(150, 10, 1 - numBills/1000);
                }else{ 
                    // Purple for total bills over 1000
                    newColor = d3.hsl(175, 10, 1 - numBills/2500);
                    console.log(numBills);
                }

                return newColor;
            });
        });

    });

};
