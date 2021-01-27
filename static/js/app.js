// Creating  a function to build the scatter plot

function buildScatterPlot() {
  /* data route */
  const url = "/api/salaries";
  d3.json(url).then(function(data) {


  // Creating a function to calculate averages
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


function median(year_no){

  let results = data.filter((item) => {
    return item.year === year_no;
  })

  let salary = results.map((item) => {
    return item.salary;
  })

  if(salary.length ===0) return 0;

  salary.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(salary.length / 2);

  if (salary.length % 2)
    return salary[half];

  return (salary[half - 1] + salary[half]) / 2.0;
}

console.log(median(2015))

console.log(calcAvg(2015))

let trace_avg = {
  type: "scatter",
  // mode: "lines",
  name: "Average",
  x: [2015, 2016, 2017, 2018, 2019, 2020],
  y: [calcAvg(2015), calcAvg(2016), calcAvg(2017), calcAvg(2018), calcAvg(2019), calcAvg(2020)],
  line: {
    color: "#17BECF"
  }
};

let trace_median = {
  type: "scatter",
  // mode: "lines",
  name: "Median",
  x: [2015, 2016, 2017, 2018, 2019, 2020],
  y: [median(2015), median(2016), median(2017), median(2018), median(2019), median(2020)],
  line: {
    color: "green"
  }
};


let dataScatter = [trace_avg, trace_median];

let layout = {
  showlegend: true,
  legend: {
    x: 1,
    y: 1,
    traceorder: 'normal',
    font: {
      family: 'sans-serif',
      size: 12,
      color: '#000'
    },
    bgcolor: '#E2E2E2',
    bordercolor: '#FFFFFF',
    borderwidth: 2
  },
  title: `Average Salary Data by Year`,
  xaxis: {
      title: "Years"
  },
  yaxis: {
      title: "Salary in million $",
    // autorange: true,
    // type: "linear",
    range: [0, 2500000]
  },
};

Plotly.newPlot("plot", dataScatter, layout);

  })

}

// Building the scatter plot
buildScatterPlot();


// *****************************************************


// Creating a function to build the chart with a dropdown menu

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
    // title: "Year",
    showticklabels: false
    // rangeslider: {}
  },
  yaxis: {
    range: [0, 35000000],
    title: "Salary in million $"
  },
  title:`Salary by Player in ${first_year}`
  };

  Plotly.newPlot('plot2', data1, layout1);

})
}

// *****************************************************

// Creating a function to build the dropdown menu, and calling the buildDropDownPlot function within it

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


  // Building the dropdown menu

  buildDropDown()

  // Creating a function to change the background color of the dropdown menu. This function is called within the index.html file

  function clrchange()
  {
  // var bgcolor = document.getElementById('s1').value;
  document.getElementById('selDataset').style.backgroundColor = "#158336d7";
  }













