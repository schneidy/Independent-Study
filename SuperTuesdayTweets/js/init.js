// Global information
var primaryStates = ["Alaska", "Georgia", "Idaho", "Massachusetts", 
    "North Dakota", "Ohio", "Oklahoma", "Tennessee", "Vermont", "Virginia"];


$(document).ready(function(){
    overallInit();
});

function overallInit(){

    //Initial State map code from the D3 library "symbol-map" example.
    // The radius scale for the centroids.
    //var r = d3.scale.sqrt()
    //.domain([0, 1e6])
    //.range([0, 10]);

    // Our projection.
    var xy = d3.geo.albersUsa();

    var svg = d3.select("#viz").append("svg");
    svg.append("g").attr("id", "states");
    svg.append("g").attr("id", "state-centroids");

    d3.json("../json/us-states.json", function(collection) {
          svg.select("#states")
            .selectAll("path")
            .data(collection.features)
            .enter().append("path")
            .attr("d", d3.geo.path().projection(xy))
            .attr("id", function(q) {return q.properties.name.split(' ').join('');})
            .attr("onclick", function(q) {return 'console.log("' + q.properties.name + '")';})
            .style("fill", function(q) {
                if(window.primaryStates.indexOf(q.properties.name) != -1){
                    return "red";
                }
            });
    });


    // Exmaple code
    /*d3.json("../json/us-state-centroids.json", function(collection) {
        svg.select("#state-centroids")
            .selectAll("circle")
            .data(collection.features
            .sort(function(a, b) { return b.properties.population - a.properties.population; }))
            .enter().append("circle")
            .attr("transform", function(d) { return "translate(" + xy(d.geometry.coordinates) + ")"; })
            .attr("r", 0)
            .transition()
                .duration(1000)
                .delay(function(d, i) { return i * 50; })
                .attr("r", function(d) { return r(d.properties.population); });
    });*/
};

