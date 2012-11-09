// Global information
var primaryStates = ["Alaska", "Georgia", "Idaho", "Massachusetts", 
    "North Dakota", "Ohio", "Oklahoma", "Tennessee", "Vermont", "Virginia"];

var twitterSearches = ["All Tweets", "Super Tuesday", "Obama", "Romney",
    "Santorum", "Gingrich", "Santorum"];
var json;
// Inital loading
$(document).ready(function(){
    overallInit();
});


// Loading of overall viz
function overallInit(){

    var width = 960,
        height = 500,
        centered;

    // SVG container
    var svg = d3.select("#viz").append("svg")
        .attr("id", "mainSVG")
        .attr("width", width)
        .attr("height", height);

    // Our projection.
    var projection = d3.geo.albersUsa()
        .scale(width)
        .translate([0, 0]);

    var path = d3.geo.path()
        .projection(projection);
  
    
    //Background
    var background = svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .on("click", focusOnState);

    // Side Bar for tweet information
    var svgSideBar = d3.select("#sideBar").append("svg")
        .attr("id", "svgSideBar")
        .attr("width", 370)
        .attr("height", height);

    // Preping for states
    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .append("g")
        .attr("id", "states");

    // Adding States
    d3.json("./json/us-states.json", function(collection) {
            g.selectAll("path")
                .data(collection.features)
                    .enter().append("path")
                .attr("d", d3.geo.path().projection(projection))
                .attr("id", function(q) {return q.properties.name.split(' ').join('');})
                .style("fill", function(q) {
                    if(window.primaryStates.indexOf(q.properties.name) != -1){
                        return "red";
                    }})
                .on("click", focusOnState);
    });


    //Clicking on a state
    function focusOnState(d){
        var x = 0,
        y = 0,
        k = 1;

        if (d && centered !== d) {
            svg.transition()
                .duration(1000)
                .style("width", "500");
            var centroid = path.centroid(d);
            x = -centroid[0];
            y = -centroid[1];
            k = 4;
            centered = d;

            //Updates the bar chart with total of tweets containing the state name within the tweet
            updateBarChart(d.properties.name);
        } else {
            centered = null;
            svg.transition()
                .duration(1000)
                .style("width", "900");
            updateBarChart("all");
        }

        g.selectAll("path")
            .classed("active", centered && function(d) { return d === centered; });

        g.transition()
            .duration(1000)
            .attr("transform", "scale(" + k + ")translate(" + (x-50) + "," + y + ")")
            .style("stroke-width", 1.5 / k + "px");
    }


    //Setting up the bar chart
    initialBarChart("all");

};


// Twitter Totals
function twitterTables(){
    
    // Sets heading
    d3.select("#sideBarTitle")
        .text("Total Tweets");
    
    
    // Shows Tweets
    d3.json("./php/lib.php?tableNames", function(json){
        d3.select("#svgSideBar")
            .selectAll("p")
                .data(json.result)
            .enter()
            .append("div")
            .attr("class", "twitTopics")
            .attr("id", function(d){return d.tableName;})
            .append("p")
            .text(function(d){
                var tweetSubjects = d.tableName.replace( /([a-z])([A-Z])/, "$1 $2");
                return tweetSubjects;})
            .append("p")
            .text(function(d){return d.numTweets});
    });

}

// Bar Chart for comparing total tweets between search terms
function initialBarChart(topic){
    var url = "./php/lib.php?tableNames=" + topic;
    d3.json(url, function(data){
        
        var chart = d3.select("#svgSideBar");
        var x = d3.scale.linear()
            .domain([0, d3.max(data.result.map(function(d) { return parseInt(d.numTweets);}))])
            .range([0, 200]);
        var y = d3.scale.ordinal()
            .domain(d3.range(data.result.map(function(d) { return d.tableName;}).length))
            .rangeBands([0, 150]);
        
        var title = chart.append("text")
            .attr("x", 10)
            .attr("y", 25)
            .attr("fill", "black")
            .attr("font-size", 24)
            .attr("stroke", "none")
            .attr("id", "barChartTitle")
            .text("Total Number of Tweets By Topic:");

        var subTitle = chart.append("text")
            .attr("x", 140)
            .attr("y", 55)
            .attr("fill", "black")
            .attr("font-size", 18)
            .attr("stroke", "none")
            .attr("id", "tweetTopic")
            .text("All Tweets");


        // Bars on the chart
        var bars = chart.append("g")
            .attr("transform", "translate(100, 65)")
            .attr("id", "bars");
        bars.selectAll("rect")
            .data(data.result)
        .enter().append("rect")
            .attr("y", function(d, i){var ret = y(i); return ret + 10;})
            .attr("width", function(d){return x(d.numTweets)})
            .attr("height", 20)
            .attr('totalTweets', function(d){return d.numTweets});

        // Total number of tweets for each search term
        bars.selectAll("text")
            .data(data.result)
        .enter().append("text")
            .attr("x", function(d){return x(d.numTweets) + 10})
            .attr("y", function(d, i){var ret = y(i); return ret + 20;})
            .attr("dx", 3)
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .attr("fill", "black")
            .attr("stroke", "none")
            .text(function(d){return d.numTweets})

        // Tweet Search
        var searchTerms = chart.append("g")
            .attr("transform", "translate(90, 75)")
            .attr("id", "searchLabels");
        searchTerms.selectAll("text")
            .data(data.result)
        .enter().append("text")
            .attr("y", function(d, i){var ret = y(i); return ret + 10;})
            .attr("stroke", "none")
            .attr("fill", "black")
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(function(d){return d.tableName})
    });
}

// Updates the total tweets bar chart
function updateBarChart(topic){
    
    //Grabs the new data
    var url = "./php/lib.php?tableNames=" + topic;
    d3.json(url, function(data){
        var chart = d3.select("#bars");
        var x = d3.scale.linear()
            .domain([0, d3.max(data.result.map(function(d) { return parseInt(d.numTweets);}))])
            .range([0, 200]);
 

        // reload data
        var bars = chart.selectAll('rect')
            .data(data.result);

        // tranforms bars into new data
        bars.attr("class", "update")
            .transition()
            .duration(750)
            .attr("width", function(d){return x(d.numTweets) + 10})
            .attr('totalTweets', function(d){return d.numTweets});;

        // reloads total tweets label
        chart.selectAll('text')
            .data(data.result)
            .text(function(d){return d.numTweets})
            .transition()
            .duration(750)
            .attr("x", function(d){return x(d.numTweets) + 10});

        // changes the tweet topic
        d3.select("#tweetTopic").text(function(){return topic == "all" ? "All Tweets" : topic});
    });
}
