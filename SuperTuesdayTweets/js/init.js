// Global information
var primaryStates = ["Alaska", "Georgia", "Idaho", "Massachusetts", 
    "North Dakota", "Ohio", "Oklahoma", "Tennessee", "Vermont", "Virginia"];

var twitterSearches = ["All Tweets", "Super Tuesday", "Obama", "Romney",
    "Santorum", "Gingrich", "Santorum"];

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
        .on("click", click);

    // Side Bar for tweet information
    var sideBar = d3.select("#viz").append("div")
        .attr("id", "sideBar")
        .append("h2")
        .attr("id", "sideBarTitle");
    twitterTables();

    // Preping for states
    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .append("g")
        .attr("id", "states");

    // Adding States
    d3.json("../json/us-states.json", function(collection) {
            g.selectAll("path")
                .data(collection.features)
                    .enter().append("path")
                .attr("d", d3.geo.path().projection(projection))
                .attr("id", function(q) {return q.properties.name.split(' ').join('');})
                .style("fill", function(q) {
                    if(window.primaryStates.indexOf(q.properties.name) != -1){
                        return "red";
                    }})
                .on("click", click);
    });


    //Clicking on a state
    function click(d){
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
        } else {
            centered = null;
            svg.transition()
                .duration(1000)
                .style("width", "900");
        }

        g.selectAll("path")
            .classed("active", centered && function(d) { return d === centered; });

        g.transition()
            .duration(1000)
            .attr("transform", "scale(" + k + ")translate(" + (x-50) + "," + y + ")")
            .style("stroke-width", 1.5 / k + "px");
    }



};


// Twitter Totals
function twitterTables(){
    
    // Sets heading
    d3.select("#sideBarTitle")
        .text("Total Tweets");
    
    
    // Shows Tweets
    d3.json("http://localhost/php/lib.php?tableNames", function(json){
        d3.select("#sideBar")
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

// returns the number of tweets
function numTweets(topic){
    var url ="http://localhost/php/lib.php?topic="+topic.id.toString()+"&count";
    d3.json(url, function(json){
        var num = json.tweets[0].tweet.numTweets;
        d3.select(topic).append("p").text(num);
    });
}

