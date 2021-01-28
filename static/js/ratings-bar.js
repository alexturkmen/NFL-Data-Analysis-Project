(function (d3) {
  "use strict";

  const titleText = "Neilson Rating for NFL Superbowl Games";
  const xAxisLabelText = "Neilson Rating";

  const svg = d3.select("svg");

  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const render = (data) => {
    const xValue = (d) => d["NeilsonRating"];
    const yValue = (d) => d.Year;
    const margin = { top: 50, right: 40, bottom: 77, left: 180 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxisTickFormat = (number) =>
      d3.format(".3s")(number).replace("G", "B");

    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat(xAxisTickFormat)
      .tickSize(-innerHeight);

    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll(".domain, .tick line")
      .style("font-size", "30px")
      .remove();

    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`)
      .style("font-size", "19px");

    xAxisG.select(".domain").remove();

    xAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", 65)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")
      .text(xAxisLabelText)
      .style("font-size", "30px");

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d) => yScale(yValue(d)))
      .attr("width", (d) => xScale(xValue(d)))
      .attr("height", yScale.bandwidth())
      .style("font-size", "10px");

    g.append("text")
      .attr("class", "title")
      .attr("y", -10)
      .text(titleText)
      .style("font-size", "30px");
  };

  d3.csv("../static/csv/ratings.csv").then((data) => {
    data.forEach((d) => {
      d.NeilsonRating = d.NeilsonRating;
      d.Year = d.Year;
      console.log(d.Year, d.NeilsonRating);
    });
    render(data);
  });
})(d3);
