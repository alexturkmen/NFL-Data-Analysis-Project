// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 30},
  width = 600 - margin.left - margin.right,
  height = 1200 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#mygraph")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data

d3.json("../static/js/profiles_1512362725.022629.json").then((importedData) => {
        
        var data = importedData.filter( element => element.draft_year > "2015");      
        //find unique weights
        var lookupw = {};        
        var resultw = [];

        //find unique heights
        var lookuph = {};        
        var resulth = [];
        
        for (var item, i = 0; item = data[i++];) {
        var name = item.weight;

        if (!(name in lookupw)) {
            lookupw[name] = 1;
            resultw.push(name);
        }
        }

        for (var item, i = 0; item = data[i++];) {
            var name = item.height;
    
            if (!(name in lookuph)) {
                lookuph[name] = 1;
                resulth.push(name);
            }
            }

            // Labels of row and columns
var myGroups = resulth.sort()
var myVars = resultw.sort()

// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(myGroups)
  .padding(0.01);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.01);
svg.append("g")
  .call(d3.axisLeft(y));

// Build color scale
var myColor = d3.scaleLinear()
.domain([d3.min(data, function(d) { return d.v; }), d3.max(data, function(d) { return d.v; })])
.range(["#6363FF",  "#FF6364"]);
/*

svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr('width', cellSize)
    .attr('height', cellSize)
    .attr('x', d => x(d.height))
    //put the cells on top of the y increments to prevent x-axis labels overlapping
    .attr('y', d => y(d.weight))
    //set colors based on tuition
    .style("fill", function(d) { return myColor(d.current_salary)}) 
*/
    svg.selectAll()
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) { return x(d.height) })
    .attr("y", function(d) { return y(d.weight) })
    .attr("width", x.bandwidth() )
    .attr("height", y.bandwidth() )
    .style("fill", function(d) { return myColor(d.current_salary)} )
    
    

    }).catch(err=>console.log(err));				
				