function buildScatterPlot() {
  /* data route */
  const url = "/api/salaries";
  d3.json(url).then(function(data) {

    // console.log(data);

function calcAvg(year_no) {
  let results = data.filter((item) => {
    return item.year === year_no;
  })

  let salary = results.map((item) => {
    return item.salary;
  })
  
  var total = 0;
  for(var i = 0; i < salary.length; i++) {
      total += salary[i];
  }
  var avg = total / salary.length;

  return avg;

}

console.log(calcAvg(2015))

let trace = {
  type: "scatter",
  mode: "lines",
  // name: name,
  x: [2015, 2016, 2017, 2018, 2019, 2020],
  y: [calcAvg(2015), calcAvg(2016), calcAvg(2017), calcAvg(2018), calcAvg(2019), calcAvg(2020)],
  line: {
    color: "#17BECF"
  }
};

let dataScatter = [trace];

let layout = {
  title: `Average Salary Data by Year`,
  xaxis: {
      title: "Years"
  //   range: [startDate, endDate],
  //   type: "date"
  },
  yaxis: {
      title: "Salary in million $",
    autorange: true,
    type: "linear"
  },
  showlegend: false
};

Plotly.newPlot("plot", dataScatter, layout);

  })

}

buildScatterPlot();








function buildDropdownPlot(first_year) {
  /* data route */
  const url = "/api/salaries";
  d3.json(url).then(function(response) {

    console.log(response);


  let resultsByYear = response.filter((item) => {
  return item.year === parseInt(first_year);
  })

  // console.log(resultsByYear)

  let yearsForGraph = resultsByYear.map((item) => {
  return item.year;
  })

  console.log(yearsForGraph)

  let salariesForGraph = resultsByYear.map((item) => {
  return item.salary;
  })

  let namesForGraph = resultsByYear.map((item) => {
    return item.player;
    })

    console.log(namesForGraph)

  let trace1 = {
  x: namesForGraph,
  y: salariesForGraph,
  mode: 'markers',
  type: 'scatter',
  marker: { size: 5 }
  }

  let data1 = [trace1]


  let layout1 = {
  xaxis: {
    title: "Year"
    // rangeslider: {}
  },
  yaxis: {
    range: [0, 25000000]
  },
  title:'Salary Dropdown'
  };

  Plotly.newPlot('plot2', data1, layout1);

})
}






function buildDropDown() {

  // Creating a dropdown variable

  let dropDown = d3.select("#selDataset");

  // Using a forEach loop, append the options into #selDataset

    let years = [2015, 2016, 2017, 2018, 2019, 2020]
    years.forEach((item) => {
      dropDown.append("option").text(item).property("value", item);
    });

  

      // Handling the change event
      
      dropDown.on("change", handleSelect);

      // Creating the handleSelect function     
      
      function handleSelect() {
      let year_on_dropdown = dropDown.property("value");
      console.log(year_on_dropdown)
      // console.log(sampleID)
      buildDropdownPlot(year_on_dropdown);
      }

      // Adding the dispatch function to add the plots to the screen when the page is loaded

      dropDown.dispatch("change");


  }

  buildDropDown()

  function clrchange()
  {
  // var bgcolor = document.getElementById('s1').value;
  document.getElementById('selDataset').style.backgroundColor = "#158336d7";
  }













