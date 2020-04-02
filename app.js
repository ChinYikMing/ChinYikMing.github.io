const covid = axios.create({
  baseURL: 'https://api.covid19api.com/',
  timeout: 10000
});

var countryName = [];
var slug = [];
var newConfirmed = [];
var totalConfirmed = [];
var newDeaths = [];
var totalDeaths = [];
var newRecovered = [];
var totalRecovered = [];

var newConfirmedCount = 0;
var totalConfirmedCount = 0;
var newDeathsCount = 0;
var totalDeathsCount = 0;
var newRecoveredCount = 0;
var totalRecoveredCount = 0;

var todayDate;

covid.get('summary')
  .then(function (res) {
    // handle success
    /* parsing data */
    let countryData = res.data.Countries;
    for(let i = 0; i < countryData.length; i++){
      let value = Object.values(countryData[i]);
      let index = 0;
      countryName[i] = value[index];
      slug[i] = value[index+1];
      newConfirmed[i] = value[index+2];
      totalConfirmed[i] = value[index+3];
      newDeaths[i] = value[index+4];
      totalDeaths[i] = value[index+5];
      newRecovered[i] = value[index+6];
      totalRecovered[i] = value[index+7];
    }
  
    /* calculate total */
    calculateData();
    
    /* get the date of today */
    todayDate = new Date(res.data.Date);
    let data = document.getElementById("date");
    date.innerHTML = "Date: " + todayDate.toDateString() + " (" + "updates at 10:15 a.m. every day" + ")";
  
    insertInfoTable();
  })
  .catch(function (err) {
    // handle error
    console.log(err);
  })
  .then(function () {
    // always executed
  })
  .finally(function() {
    //always executed 
  });

function myMatching(){
  let input = document.getElementById("input").value;
  let tableCell = document.getElementsByTagName("td");
  for(let i = 0; i < tableCell.length; i+=8){
    if(tableCell[i].innerHTML.toUpperCase().indexOf(input.toUpperCase()) > -1){
      tableCell[i].parentNode.style.display = "";
    }  else {
      tableCell[i].parentNode.style.display = "none";
    }
  }
}

function calculateData(){
  for(let i = 2; i < countryName.length; i++){
    newConfirmedCount += newConfirmed[i];
  }
  for(let i = 2; i < countryName.length; i++){
    totalConfirmedCount += totalConfirmed[i];
  }
  for(let i = 2; i < countryName.length; i++){
    newDeathsCount += newDeaths[i];
  }
  for(let i = 2; i < countryName.length; i++){
    totalDeathsCount += totalDeaths[i];
  }
  for(let i = 2; i < countryName.length; i++){
    newRecoveredCount += newRecovered[i];
  }
  for(let i = 2; i < countryName.length; i++){
    totalRecoveredCount += totalRecovered[i];
  }
}

function insertInfoTable(){
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let tfoot = document.createElement("tfoot");
  
  /* thead */
  let header = document.createElement("tr");
  let header1 = document.createElement("th");
  header1.innerHTML = "Country Name";
  let header2 = document.createElement("th");
  header2.innerHTML = "Slug";
  let header3 = document.createElement("th");
  header3.innerHTML = "New Confirmed";
  let header4 = document.createElement("th");
  header4.innerHTML = "Total Confirmed";
  let header5 = document.createElement("th");
  header5.innerHTML = "New Deaths";
  let header6 = document.createElement("th");
  header6.innerHTML = "Total Deaths";
  let header7 = document.createElement("th");
  header7.innerHTML = "New Recovered";
  let header8 = document.createElement("th");
  header8.innerHTML = "Total Recovered";
  
  header.appendChild(header1);
  header.appendChild(header2);
  header.appendChild(header3);
  header.appendChild(header4);
  header.appendChild(header5);
  header.appendChild(header6);
  header.appendChild(header7);
  header.appendChild(header8);
  
  thead.appendChild(header);
  /* end of thead */
  
  /* tbody */
  for(let i = 2; i < countryName.length; i++){
      let body = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.innerHTML = countryName[i];
      let td2 = document.createElement("td");
      td2.innerHTML = slug[i];
      let td3 = document.createElement("td");
      td3.innerHTML = newConfirmed[i];
      let td4 = document.createElement("td");
      td4.innerHTML = totalConfirmed[i];
      let td5 = document.createElement("td");
      td5.innerHTML = newDeaths[i];
      let td6 = document.createElement("td");
      td6.innerHTML = totalDeaths[i];
      let td7 = document.createElement("td");
      td7.innerHTML = newRecovered[i];
      let td8 = document.createElement("td");
      td8.innerHTML = totalRecovered[i];
    
      body.appendChild(td1);
      body.appendChild(td2);
      body.appendChild(td3);
      body.appendChild(td4);
      body.appendChild(td5);
      body.appendChild(td6);
      body.appendChild(td7);
      body.appendChild(td8);
    
      tbody.appendChild(body);
  }
  /* end of tbody */
  
  /* tfoot */
  let foot = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.innerHTML = countryName.length-2 + " countries";
  let td2 = document.createElement("td");
  td2.innerHTML = countryName.length-2 + " slugs";
  let td3 = document.createElement("td");
  td3.innerHTML = newConfirmedCount;
  let td4 = document.createElement("td");
  td4.innerHTML = totalConfirmedCount;
  let td5 = document.createElement("td");
  td5.innerHTML = newDeathsCount;
  let td6 = document.createElement("td");
  td6.innerHTML = totalDeathsCount;
  let td7 = document.createElement("td");
  td7.innerHTML = newRecoveredCount;
  let td8 = document.createElement("td");
  td8.innerHTML = totalRecoveredCount;
  
  foot.appendChild(td1);
  foot.appendChild(td2);
  foot.appendChild(td3);
  foot.appendChild(td4);
  foot.appendChild(td5);
  foot.appendChild(td6);
  foot.appendChild(td7);
  foot.appendChild(td8);
  
  tfoot.appendChild(foot);
  /* end of tfoot */
  
  /* create table */
  table.appendChild(thead);
  table.appendChild(tbody);
  table.appendChild(tfoot);
  
  tableContainer.appendChild(table);
}
