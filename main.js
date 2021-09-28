const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";


fetch(url)
    .then(response => response.json())
    .then(data => CreateTableFromJSON(data));

function CreateTableFromJSON(res) {
    // EXTRACT VALUE FOR HTML HEADER. 
    var col = ['#'];
    for (var i = 0; i < res.length; i++) {
        for (var key in res[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.className="table table-striped";

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);   // TABLE ROW.
                

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < res.length; i++) {

         tr = table.insertRow(-1);
         

         for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if(j==0){
                tabCell.innerHTML = i+1;
            }else{
                tabCell.innerHTML = res[i][col[j]];
            }
            if (res[i][col[2]]===true){
                tr.style.backgroundColor="orange";
            }

            
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function createTableCorrelation(res){

    // Column names
    var col = ['#', "Event", "Correlation"];

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.className="table table-striped";

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < res.length; i++) {

         tr = table.insertRow(-1);
         tr.style.color="red";

         for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if(j==0){
                tabCell.innerHTML = i+1;
            }else{
                tabCell.innerHTML = res[i][col[j]];
            }
            
            
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}