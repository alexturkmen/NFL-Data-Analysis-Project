console.log("Hello")

var svg = d3.select("svg"),
  margin = 250,
  width = svg.attr("width") - margin,
  height = svg.attr("height") - margin;

var xScale = d3.scaleBand().range([0, width]).padding(0.4),
  yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv("../static/js/ratings.csv").then(data=>{
  // if (error) {
  //   throw error;
  // }

  xScale.domain(
    data.map(function (d) {
      return d.Year;
    })
  );

  yScale.domain([
    0,
    d3.max(data, function (d) {
      return d.NeilsonRating;
    }),
  ]);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  g.append("g").call(
    d3
      .axisLeft(yScale)
      .tickFormat(function (d) {
        return d;
      })
      .ticks(10)
  );

  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
      return xScale(d.Year);
    })
    .attr("y", function (d) {
      return yScale(d.NeilsonRating);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return height - yScale(d.NeilsonRating);
    });
}).catch(err=>console.log(err));
