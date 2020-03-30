// import the data from data.js
const tableData = data;

// Referene the HTML table using D3
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }

// Keep track of all filters

var filters = {};

// This function will replace your handleClick function
function updateFilters() {
  let inputDate = d3.select("#datetime").property("value");
  let inputCity = d3.select("#city").property("value");
  let inputState = d3.select("#state").property("value");
  let inputCountry = d3.select("#country").property("value");
  let inputShape = d3.select("#shape").property("value");
  // Save the element, value, and id of the filter that was changed  
   filtersInput = {
    "datetime": inputDate,
    "city": inputCity,
    "state": inputState,
    "country": inputCountry,
    "shape": inputShape
  };
  // If a filter value was entered then add that filterId and value  
  // to the filters list. Otherwise, clear that filter from the filters object  
  for (var key in filtersInput) {
    if (!filtersInput[key]) {
      delete filtersInput[key];
    }
    
  }
  filters = Object.entries(filtersInput);
  // Call function to apply all filters and rebuild the table  
  filterTable(filters);
}
function filterTable() {  
  // Set the filteredData to the tableData  
  let filteredData = tableData.filter(item => 
  // Loop through all of the filters and keep any data that  
  // matches the filter values  
    filters.every(([key, value]) => item[key] === value)
  );
  // Finally, rebuild the table using the filtered Data  
  buildTable(filteredData);
}
// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("#filter-btn").on("click", updateFilters);
// Build the table when the page loads
buildTable(tableData);