// File for functions relating to state visualizations.
function stateInit(state){
    var xy = d3.geo.albersUsa();

    var line = state.getAttribute("d");
    var stateName = state.getAttribute("id")

    //console.log(stateName);
    d3.select("#states").remove();
    d3.select("#mainSVG")
        .append("g")
        .attr("id", "state")
        .append("svg:path")
        .attr("d", line)
        .attr("id", stateName)
        .attr("transform", "scale(2)")
        .attr("translate", "(-200,-200)")
        ;
    //d3.select("#states").remove();
    
    //var svg = d3.select("#mainSVG");
    //svg.append(stateName);


    //d3.select("#state").append(state);
    console.log();
    
}
