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
    var tweetBar = d3.select("#viz").append("div");
    tweetBar.attr("id", "tweetSearches");

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

    

    // Adding Twitter Searches
    d3.json("http://localhost/php/lib.php?tableNames", function(json){
        d3.select("#tweetSearches")
            .selectAll("p")
            .data(json.tweets)
            .enter()
            .append("div")
            .attr("class", "twitTopics")
            .attr("id", function(d){return d.tweet.Tables_in_superTueTweets;})
            .append("p")
            .text(function(d){
                var tweetSubjects = d.tweet.Tables_in_superTueTweets.replace( /([a-z])([A-Z])/, "$1 $2");
                return tweetSubjects;
            });
            //test code below
            
            d3.selectAll(".twitTopics")[0].forEach(function (f){numTweets(f)})
            ;
    });


    function click(d){
        var x = 0,
        y = 0,
        k = 1;

        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = -centroid[0];
            y = -centroid[1];
            k = 4;
            centered = d;
        } else {
            centered = null;
        }

        g.selectAll("path")
            .classed("active", centered && function(d) { return d === centered; });

        g.transition()
            .duration(1000)
            .attr("transform", "scale(" + k + ")translate(" + x + "," + y + ")")
            .style("stroke-width", 1.5 / k + "px");
    }



};


// returns the number of tweets
function numTweets(topic){
    var url ="http://localhost/php/lib.php?topic="+topic.id.toString()+"&count";
    d3.json(url, function(json){
        var num = json.tweets[0].tweet.numTweets;
        d3.select(topic).append("p").text(num);
    });
}

