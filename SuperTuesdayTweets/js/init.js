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

    //Initial State map code from the D3 library "symbol-map" example.
    // The radius scale for the centroids.
    //var r = d3.scale.sqrt()
    //.domain([0, 1e6])
    //.range([0, 10]);

    // Our projection.
    var xy = d3.geo.albersUsa();

    // Main SVG container
    var svg = d3.select("#viz").append("svg");
    svg.attr("id", "mainSVG");
    svg.append("g").attr("id", "states");
    
    // Side Bar for tweet information
    var tweetBar = d3.select("#viz").append("div");
    tweetBar.attr("id", "tweetSearches");

    // Adding States
    d3.json("../json/us-states.json", function(collection) {
          svg.select("#states")
            .selectAll("path")
            .data(collection.features)
            .enter().append("path")
            .attr("d", d3.geo.path().projection(xy))
            .attr("id", function(q) {return q.properties.name.split(' ').join('');})
            .attr("onclick", function(q) {return "stateInit(this)";})
            .style("fill", function(q) {
                if(window.primaryStates.indexOf(q.properties.name) != -1){
                    return "red";
                }
            });
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


// returns the number of tweets
function numTweets(topic){
    var url ="http://localhost/php/lib.php?topic="+topic.id.toString()+"&count";
    d3.json(url, function(json){
        var num = json.tweets[0].tweet.numTweets;
        d3.select(topic).append("p").text(num);
    });
}

