//Globals
var data;
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


    //Preping states
    var states = svg.append("g")
        .attr("id", "states")
        .attr("class", "Blues");

    // Adding States
    d3.json("json/us-states.json", function(collection) {
        states.selectAll("path")
            .data(collection.features)
            .enter().append("path")
            .attr("class", data ? quantize : null)
            .attr("d", d3.geo.path().projection(xy))
            .attr("id", function(q) {return q.properties.name.split(' ').join('');})
            .attr("class", data ? quantize : null);
    });

    // Adding inital tooltip
    tooltip = d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");

    // Gradient Bar
    rangeBar = svg.append('svg:rect')
        .attr('id', 'rangeOfBills')
        .attr('x',  400)
        .attr('y', 17)
        .attr('width', 200)
        .attr('height', 25)
        .style('fill', 'white');

    var gradient = d3.select("#mainSVG").append("svg:defs")
        .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", "lightgreen")
        .attr("stop-opacity", 1);

    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", "darkblue")
        .attr("stop-opacity", 1);

    svg.append("svg:text")
        .attr("id", "rangeMin")
        .attr("x", 400)
        .attr("y", 15);
    svg.append("svg:text")
        .attr("id", "rangeMax")
        .attr("x", 580)
        .attr("y", 15);


};

// Topic Selection and coloring
function topicSelection(topic, topicMethod){
    
    d3.select("#bills").selectAll("h3").remove();
    d3.select("#bills").select("ul").remove();
    d3.select('#bills').append("h3").text("Searched for " + topic);

    var cleanTopic = topic.replace(/\s/g, '').replace(/\,/g,"");
    var url = "../json/totalBills/totalBills-" + cleanTopic + '.json';
    d3.json(url, function(json){
        data = json;
        fill = d3.scale.linear().domain([data.smallest_amount_bills, data.largest_amount_bills]).range(["lightgreen", "darkblue"]);
        tooltip = d3.select("#tooltip");

        d3.select(states).selectAll("path")
            .transition().duration(1000)
            .style('fill', function(d){
                var state_name = d.properties.name.replace( /([a-z])([A-Z])/, "$1 $2").replace( /([a-z])([A-Z])/, "$1 $2");
                var abbr = stateAbbr[state_name];
                return fill(data[abbr].totalBills);
            }).each(function(state){

                d3.select(this).on("mouseover", function(d){
                    tooltip.selectAll("p").remove();
                    tooltip.style("visibility", "visible")
                        .append("p").text(this.id);
                    tooltip.append("p").text("Total Bills: " + data[stateAbbr[state.properties.name]].totalBills);
                    })
                    .on("mousemove", function(){return d3.select("#tooltip").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
                    .on("mouseout", function(){return d3.select("#tooltip").style("visibility", "hidden");})
                    .on("mousedown", function(){displayBills(stateAbbr[state.properties.name], topic, state.properties.name)});
            });
    
        // Gradient Bar
        d3.select("#rangeOfBills").style("fill", "url(#gradient)");
        d3.select("#rangeMin").text(data.smallest_amount_bills);
        d3.select("#rangeMax").text(data.largest_amount_bills)
    });

};



// Displays the most recent bills on the subject (10 max)
function displayBills(stateID, topic, state){

    //clears bills if there are any.
    d3.select("#bills").selectAll("h3").remove();
    d3.select("#bills").select("ul").remove();

    // Most recent bills
    var recent_bills = data[stateID].most_recent_bills;

    d3.select('#bills').append("h3")
        .text(function(){
            retMsg = recent_bills.length > 0 ? recent_bills.length + " recent bills found" : "There are no recent bills found";
            return retMsg + ' on ' + topic + ' in ' + state;
            });
   
    d3.select("#bills").append("ul");
    recent_bills.forEach(function(bill){
        var bill_li = d3.select("#bills").select("ul").append("li");
            
        bill_li.insert("a")
            .attr("href", bill.url)
            .text(bill.bill_id);
            
        bill_li.insert("p").text(bill.title.substring(0, Math.max(bill.title.length / 3, 25) ) + "...")
            .on("mouseover", function(){d3.select(this).text(bill.title);})
            .on("mouseout", function(){d3.select(this).text(bill.title.substring(0, bill.title.length / 3) + "...")})
    });
    
}
