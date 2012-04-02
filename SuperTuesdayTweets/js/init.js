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
            .attr("onclick", function(q) {return 'console.log("' + q.properties.name + '")';})
            .style("fill", function(q) {
                if(window.primaryStates.indexOf(q.properties.name) != -1){
                    return "red";
                }
            });
    });

    
    // Adding Twitter Searches
    for(search in twitterSearches){
        d3.select("#tweetSearches")
            .append("div")
                .attr("class", "twitTopics")
                .attr("id", twitterSearches[search].split(' ').join(''))
                .text(twitterSearches[search])
            ;
    };

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


// returns number of rows
function numRows(){
    var jsonInfo = d3.text("../CSVs/ronpaul.csv", function(datasetText){
            var parsedCSV = d3.csv.parseRows(datasetText);

            var sampleHTML = d3.select("body")
                .append("table")
                .style("border-collapse", "collapse")
                .style("border", "2px black solid")

                .selectAll("tr")
                .data(parsedCSV)
                .enter().append("tr")

                .selectAll("td")
                .data(function(d){return d;})
                .enter().append("td")
                .style("border", "1px black solid")
                .style("padding", "5px")
                .text(function(d){return d;})
                .style("font-size", "12px");

    });
}


