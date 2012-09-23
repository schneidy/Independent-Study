//Globals
var data = {};
var tooltip;

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
    d3.json("json/us-states.json", function(collection) {
          svg.select("#states")
            .selectAll("path")
            .data(collection.features)
            .enter().append("path")
            .attr("d", d3.geo.path().projection(xy))
            .attr("id", function(q) {return q.properties.name.split(' ').join('');})
            ;
    });

    // Adding inital tooltip
    tooltip = d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")

};

// Topic Selection and coloring
function topicSelection(topic){
    data = [];
    d3.selectAll("path")[0].forEach(function(state){
        //cleans up the state id
        var stateName = state.id.replace( /([a-z])([A-Z])/, "$1 $2").replace( /([a-z])([A-Z])/, "$1 $2");
        var abbr = stateAbbr[stateName];
        var cleanTopic = topic.replace(/\s/g, '').replace(/\,/g,"");
        var url = "../json/" + abbr + "-" + cleanTopic + '.json';
        d3.json(url, function(json){
            var numBills = json.length;
            var color = d3.scale.category20c();
            var bills = json;
            data.push({state : state.id, topBills : bills.splice(0, 10)});
            
            d3.select(state).transition().duration(1000).style("fill", function(){
                var newColor;
                var multiplier = .9;
                if(numBills <= 100){
                    newColor = d3.hsl(100, 10, (1 - numBills/150) * multiplier);
                }else if(numBills > 100 && numBills <= 250){
                   // Green for total bills over 100
                   newColor = d3.hsl(125, 10, (1 - numBills/300) * multiplier);
                }else if(numBills > 250 && numBills <= 1000){
                    // Blue for total bills over 250
                    newColor = d3.hsl(150, 10, (1 - numBills/1050) * multiplier);
                }else{ 
                    // Purple for total bills over 1000
                    newColor = d3.hsl(175, 10, (1 - numBills/2550) * multiplier);
                }

                return newColor;
            });
            
            // Tool tip
            d3.select(state)
            .on("mouseover", function(){

                d3.select("#tooltip").selectAll("p").remove();

                d3.select("#tooltip")
                    .style("visibility", "visible")
                    .append("p").text(stateName);

                 d3.select("#tooltip")
                    .append("p").text("Total Bills: " + numBills);
                })
            .on("mousemove", function(){return d3.select("#tooltip").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
            .on("mouseout", function(){return d3.select("#tooltip").style("visibility", "hidden");})
            .on("mousedown", function(){displayBills(state.id, topic)})
            ;
        });

    });

};


// Displays the most recent bills on the subject (10 max)
function displayBills(stateID, topic){

    //clears bills if there are any.
    d3.select("#bills").selectAll("p").remove()
    d3.select("#bills").selectAll("h3").remove();

    data.forEach(function(json){
        if(json.state === stateID){
            // If no bills in that subject found
            if(json.topBills.length == 0){
                d3.select("#bills")
                    .append("h3")
                    .text("There are no bills on " + topic);
            }else{
                // Displaying the bills
                d3.select("#bills")
                    .append("h3")
                    .text(json.topBills.length + " recent bills found on " + topic);
                
                
                json.topBills.forEach(function(bill){
                    //Number of Bills
                    d3.select("#bills")
                        .append("p")
                        .text(bill.bill_id);

                    //console.log(bill.bill_id);
                });
            }
        }
    });
}
