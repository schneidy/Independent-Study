// Global information
var primaryStates = ["Alaska", "Georgia", "Idaho", "Massachusetts", 
    "North Dakota", "Ohio", "Oklahoma", "Tennessee", "Vermont", "Virginia"];

var twitterSearches = ["All Tweets", "Super Tuesday", "Obama", "Romney",
    "Santorum", "Gingrich", "Santorum"];
var json;
var selectedBar;
// Inital loading
$(document).ready(function(){
    overallInit();
});


// Loading of overall viz
function overallInit(){

    var width = 580,
        height = 400,
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
        .attr("height", 225);

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
            var centroid = path.centroid(d);
            x = -centroid[0];
            y = -centroid[1];
            k = 4;
            centered = d;

            //Updates the bar chart with total of tweets containing the state name within the tweet
            updateBarChart(d.properties.name);
        } else {
            centered = null;
            updateBarChart("all");
        }

        g.selectAll("path")
            .classed("active", centered && function(d) { return d === centered; });

        g.transition()
            .duration(1000)
            .attr("transform", "scale(" + k + ")translate(" + x + "," + y + ")")
            .style("stroke-width", 1.5 / k + "px");
    }


    //Setting up the submit button
    $('#twitterForm').submit(function(){
        d3.select("#states").transition().duration(1500).attr('transform', 'scale(1,1)');        
        var tweetTopic = this.topic.value;
        updateBarChart(tweetTopic);
    });

    //Setting up the bar chart
    initialBarChart("all");

    //Initial Tweets Shown
    dispTweetsInitial();

    //
    initalTimeline("all");
};


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
            .attr("totalTweets", function(d){return d.numTweets})
            .attr("tweetSearch", function(d){return d.tableName})
            .on("click", function(){dispTweetsUpdate(this, topic)});

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
            .style("stroke-width", "3px")
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
            .data(data.result)
            .on("click", function(){dispTweetsUpdate(this, topic)});

        // tranforms bars into new data
        bars.attr("class", "update")
            .transition()
            .duration(750)
            .attr("width", function(d){return x(d.numTweets) + 10})
            .attr('totalTweets', function(d){return d.numTweets});

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

    // Shows new default tweets
    dispTweetsUpdate(null, topic)

    
}

function dispTweetsInitial(){
    var url = './php/lib.php?topic=allTweets';
    var tweetHolder = d3.select("#tweetContainer");

    d3.json(url, function(json){
    var tweets = tweetHolder.selectAll('p')
        .data(json.tweets)
    .enter().append('p')
        .text(function(d){return d.tweet.text});
    });
}

function dispTweetsUpdate(bar, topic){
    var tweetHolder = d3.select("#tweetContainer");
    if(bar != null && bar != selectedBar){
        selectedBar = bar;
        var searchTerm = d3.select(bar).attr("tweetSearch");
        var url = './php/lib.php?topic='+searchTerm;
        url += topic != 'all' ? '&contains='+topic : '';

        d3.json(url, function(json){
            var tweets = tweetHolder.selectAll('p')
                .data(json.tweets)
                .text(function(d){return d.tweet.text});
        });

        d3.selectAll(".selected")
            .style("stroke", "none")
            .attr("class", "");

        d3.select(bar)
            .attr("class", "selected")
            .style("stroke", "purple")
            .style("stroke-width", "3px");
    }else{
        selectedBar = null;
        d3.selectAll(".selected")
            .style("stroke", "none")
            .attr("class", "");
        var url = './php/lib.php?topic=allTweets&contains='+topic;
        d3.json(url, function(json){
            var tweets = tweetHolder.selectAll('p')
                .data(json.tweets)
                .text(function(d){return d.tweet.text});
        });
    }
}

// Initial timeline
function initalTimeline(topic){

    var width = 370, height = 205;
    var svg = d3.select("#sideBar").append("svg")
        .attr("id", "graphSVG")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(50, 0)");

    var x = d3.time.scale()
        .range([0, width-70]);
    var y = d3.scale.linear()
        .range([height-20, 0]);
    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.totalTweets); });

    var formatDate = d3.time.format("%Y-%m-%d %H:%M:%S");
    
    var url = './php/lib.php?timeline&contains=' + topic;
    d3.json(url, function(json){

        json.result.forEach(function(d){
            d.timePoints.forEach(function(t){
                t.time = formatDate.parse(t.time);
            });
        });

        color.domain(json.result.map(function(d){return d.tableName}));

        var searchTopics = color.domain().map(function(twitTopic, i){
            return{
                name: twitTopic,
                values: json.result[i].timePoints
            };
        });

        // Set the x domain to all possible times
        var time = json.result[0].timePoints.map(function(d){return d.time});
        x.domain(d3.extent(time));

        // Set the y domain to min and max number of tweets
        var maxTweets = d3.max(searchTopics.map(function(d){return d3.max(d.values.map(function(t){return parseInt(t.totalTweets)}));}));
        var minTweets = d3.min(searchTopics.map(function(d){return d3.min(d.values.map(function(t){return parseInt(t.totalTweets)}));}));
        y.domain([minTweets, maxTweets]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + (height-20) + ")")
            .style('font-size', 10)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Total Tweets Per Hour");

        var timeline = svg.selectAll(".tweetLines")
            .data(searchTopics)
        .enter().append("g")
            .attr("class", "tweetLines");

        timeline.append("path")
            .attr("class", "line")
            .attr("d", function(d){return line(d.values);})
            .style("stroke", function(d){return color(d.name)});

    });


}
