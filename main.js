const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";


fetch(url)
    .then(response => response.json())
    .then(data => {
        CreateTableFromJSON(data);
        CreateTableCorrelation(data);
    });

function CreateTableFromJSON(res) {
    // EXTRACT VALUE FOR HTML HEADER. 
    let col = ['#'];
    for (var i = 0; i < res.length; i++) {
        for (var key in res[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    let table = document.createElement("table");
    table.className="table table-striped";

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    let tr = table.insertRow(-1);   // TABLE ROW.
                

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (let i = 0; i < res.length; i++) {

         tr = table.insertRow(-1);
         

         for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
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

//Funcion que crea la tabla de correlacion

function CreateTableCorrelation(res){

    // Column names
    let col = ['#', "Event", "Correlation"];
    let dict ={};

    //Creamos un diccionario con la lista de eventos
    for (var i = 0; i < res.length; i++) {
        let events=res[i]["events"];
        let tam =events.length;
        for(let i =0; i<tam; i++){

           if(!dict.hasOwnProperty(events[i])){
                dict[events[i]]={TN: 0, FN:0, TP:0, FP:0 };
            }
        }
    }

    //Llenamos los datos del diccionario para caluclar el MCC
    for (var i = 0; i < res.length; i++) {
        let events=res[i]["events"];
        let squirrel = res[i]["squirrel"];
        
        let tam= Object.keys(dict).length;
        for(let event in dict){
            if(events.includes(event)){
                squirrel ? dict[event]["TP"]++: dict[event]["FN"]++;
            }else{
                squirrel ? dict[event]["FP"]++: dict[event]["TN"]++;
            }
        }
    }
    

    //MCC for each event
    let MCC={};
    for(let event in dict){
        let MCCevent= CalculateMCC(dict[event]);
        MCC[MCCevent]=event;
    }
    let datosTabla=Object.keys(MCC).sort((a,b)=>b-a);

    //Creamos la tabla ahora en orden
    // CREATE DYNAMIC TABLE.
    let table = document.createElement("table");
    table.className="table table-striped";
    
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    
    let tr = table.insertRow(-1);   // TABLE ROW.
                    
    
    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (let i = 0; i < datosTabla.length; i++) {
    
            tr = table.insertRow(-1);
    
            for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            
            if(j==0){
                tabCell.innerHTML = i+1;
            }else if(j==1){
                tabCell.innerHTML = MCC[datosTabla[i]];
                tabCell.className="col-8";
            }else{
                tabCell.innerHTML =datosTabla[i];
            }
    
                
        }
     }
    
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showDataCorrelation");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);



}

function CalculateMCC(data){

    let TP=data["TP"];
    let TN=data["TN"];
    let FP=data["FP"];
    let FN=data["FN"];

    let num= TP*TN-FP*FN;
    let denom= Math.sqrt((TP+FP)*(TP+FN)*(TN+FP)*(TN+FN));
    return num/denom;
}