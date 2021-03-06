// gobal vars
var currentEvent;   //store current event selection
var currentType;    //store current user type selection

document.addEventListener('DOMContentLoaded', function () {

    // click on event first button    
    document.getElementsByClassName("navBtn")[0].click();
    document.getElementsByClassName("userType")[0].click();    
    
    //insert listener into search bar to emulate dataTables search
    const inputSearch = document.getElementById("input-search");
    inputSearch.addEventListener("input", () => {
        updateSearch( inputSearch.value );
    })
});

// toggle all collapsible NAV elements
function toggleCollapse( elm ){
    //get button target
    let target = document.getElementById( elm.dataset.target );
    //active key class on target and clicked element
    if(target != undefined){    target.classList.toggle( elm.dataset.key );    }
    elm.classList.toggle("active");

    // disable active class on all other same type elements
    // get all other same type elements
    let buttons = Array.prototype.slice.call( document.getElementsByClassName(elm.classList[0]) );
    buttons.forEach(btn => {
        if(btn != elm){            
            btn.classList.remove("active"); // remove active
            //collapse this btn target
            let btnTarget =  document.getElementById( btn.dataset.target ); //get target
            if(btnTarget != undefined){ btnTarget.classList.add( btn.dataset.key );  }            
        }
    });

    // if click on event menu button
    if(elm.classList.contains("navBtn")){
        currentEvent = elm.dataset.evt;
        let mainTitle = document.getElementById("mainTitle");
        mainTitle.innerHTML = elm.dataset.name
        document.getElementById("wrapper").classList.add("toggled");
        selectUserData();
    }

    // if click on event menu button
    if(elm.classList.contains("userType")){
        currentType = elm.dataset.type;
        selectUserData();
    }
}

// change filter parameters
function selectUserData(){

    if( dataTable != undefined ){    //if another table instance exists, destroy
        dataTable.destroy();
    }

    // print selected table
    let evt = currentEvent;
    let type = currentType;

    let targetTable = document.getElementById("list-table");    //get table
    let tablePrint =  `
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Constancia</th>
            </tr>
        </thead>
        <tbody>
    `;

    // loop events
    for (let i = 0; i < Object.keys(mainData).length; i++) {
        let key1 = Object.keys(mainData)[i];

        if( evt === key1 ){         //if selected event  
            // loop user types
            for (let j = 0; j < Object.keys(mainData[key1]).length; j++) {
                let key2 = Object.keys(mainData[key1])[j];
                
                if( type === key2 ){       //if selected user
                    // loop entries
                    for (let k = 0; k < Object.keys(mainData[key1][key2]).length; k++) {
                        let key3 = Object.keys(mainData[key1][key2])[k];
                        
                            //print entries
                            tablePrint += `
                            <tr>
                                <td class="name-container">
                                    ${mainData[key1][key2][key3]["nombre"]}
                                </td>
                                <td class="file-container">
                                    <a href="${mainData[key1][key2][key3]["archivo"]}" target="_blank"> <i class="fas fa-file-download"></i> </a>
                                </td>
                            </tr>
                        `;
                    }
                    break;
                }    
            }
            break;
        }
    }

    tablePrint += `
        </tbody>
    `;
    // print table
    targetTable.innerHTML = tablePrint;

    // create table object
    createTable();
}

//initialize data table
var dataTable;
function createTable(){
    // This software incorporates work covered by the following copyright and
    // permission notice:

    // The MIT License (MIT)

    // Copyright (c) 2016-present, Karl Saunders (mobius1[at]gmx[dot]com).

    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the "Software"), to deal
    // in the Software without restriction, including without limitation the rights
    // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    // copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    dataTable = new simpleDatatables.DataTable("#list-table", {
        searchable: true,
        // fixedHeight: true,
        perPage:  5,
        perPageSelect: false,
        labels: {
            placeholder: "Buscar...",
            perPage: "{select} resultados por página",
            noRows: "No se encontraron resultados",
            info: "Mostrando {start} - {end} de {rows} entradas",
        }
    })
}


// update search 
function updateSearch( search ){
    let dataTableInput = document.getElementsByClassName("dataTable-input")[0];
    dataTableInput.value = search


    var keyboardEvent = document.createEvent('KeyboardEvent');
    var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

    
    let clickEvent = new Event('keyup');
    dataTableInput.dispatchEvent(clickEvent);

}

    