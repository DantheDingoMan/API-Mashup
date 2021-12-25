/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';

const stores = ["Steam", "GamersGate", "Green Man Gaming", "Amazon", "Gamestop", "Direct2Drive", "GOG", "Origin", "Get Games", "Shiny Loot", "Humble Bundle", "Desura", "Uplay", "Indie Games Stand", "Fanatical", "Gamesrocket", "Games Republic", "Sila Games", "Playfield", "Imperial Games", "Windows Games Store", "Fun Stock Digital", "Game Billet", "Voidu", "Epic Games Store", "Razer Game Store", "Games Planet", "Gamesload", "2Game", "IndieGala", "Blizzard Shop", "All You Play", "DLGamer"]

// Call functions /////////////////////////////////////////

async function gamesales(name) {
    let url = 'https://www.cheapshark.com/api/1.0/games?title=' + name;
    return fetch(url)
    .then(response => response.json())
}

async function gamesalesprecise(id) {
    let url = 'https://www.cheapshark.com/api/1.0/games?id=' + id;
    return fetch(url)
    .then(response => response.json())
}

//https://www.giantbomb.com/api/search/?&query=lego%20batman&resources=game&format=json

async function gameinfo(gamenames) {
    let url = 'https://www.giantbomb.com/api/search/?format=jsonp&&query=' + gamenames + '&resources=game';
    //return fetch(url, {
        //mode: 'cors'
    //})
    //.then(response => response.json())
    var datas;
    return $.ajax ({
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        url: url,
        complete: function() {

            return datas
        },
        success: function(data) {
            //console.log(data);
            datas = data.results[0]
            
        }
    })
    
}


// End of call functions ////////////////////////////////////

// Popup killer /////////////////////////////////////////////

async function popupkiller() {
    let popup = document.getElementById('checker')

    while (popup.firstChild) {
        popup.removeChild(popup.firstChild);
    }

}

// End of popup killer //////////////////////////////////////

// General function /////////////////////////////////////////

async function gamesearch() {

    // Sale data cleaner
    var divs = document.getElementById("gameinfo");
    while (divs.firstChild) {
        divs.removeChild(divs.firstChild);
    }

    // End of sale data cleaner

    // Search input collection

    let name = document.querySelector('#gameinput').value;

    // End of search input collection

    // Exception handling
    
    if (name == "") {
        
        let popup = document.getElementById('checker')
        
        let warning = document.createElement("p")
        warning.setAttribute("class", "text-center bg-warning p-4")
        warning.innerHTML = "You need to put something in the box"
        window.setTimeout(popupkiller, 3000);

        popup.appendChild(warning)
        
    }

    window.localStorage.setItem("game", name)

    // End of exception handling

    // API data collection

    // Cheapshark

    let game = await gamesales(name);



    let gameid = game[0].gameID;

    let gamesale = await gamesalesprecise(gameid);

    let gamenames = gamesale.info.title

    // End of cheapshark

    // Giant bomb

    let gamedata = await gameinfo(gamenames);


    

    // End of giant bomb

    // End of API data collection /////////////////////////

    // Population of page /////////////////////////////////

    // Game shark
    

    var divlarge = document.createElement("div")

    divlarge.setAttribute("class", "row align-items-start rounded bg-secondary")


    var divmedium = document.createElement("div");
    
    
    var divtitle = document.createElement("h6")

    divtitle.setAttribute("class", "text-center text-white")

    let picture = gamesale.info.thumb;

 

    var divpicture = document.createElement("img");
    divpicture.src = picture;
    divpicture.setAttribute("class", "rounded border border-dark mx-auto d-block")


    
    divmedium.setAttribute("class", "container col-2 align-items-center my-3")
    
    divtitle.innerHTML = gamenames

    let sales = gamesale.deals.length
    
    
    
    var gameprices = document.createElement("select")
    gameprices.id = "pricedrop"
    let lengthofsale = 0;
    
    for (let i = 0; i < sales; i++) {

        let storedID = gamesale.deals[i].storeID


        let priced = gamesale.deals[i].price;


        let store = stores[storedID-1]

        
        
        lengthofsale++;
        var option = document.createElement("option")
        option.text = store + " " + priced;

        gameprices.appendChild(option)

    }

    gameprices.setAttribute("class", "")
    
    



    divmedium.appendChild(divpicture);
    divmedium.appendChild(divtitle);
    divmedium.appendChild(gameprices)

    // End of gameshark

    // Giant bomb

    //deck
    var divsmall = document.createElement("div");

    divsmall.setAttribute("class", "container col my-3")

    var divinfotitle = document.createElement("h6")

    divinfotitle.setAttribute("class", "text-white")

    divinfotitle.innerHTML = "Game information:"

    var divinfo = document.createElement("p");

    divinfo.setAttribute("class", "text-white");
 
    let gamesdata = gamedata.results[0].deck

    divinfo.innerHTML = gamesdata

    divsmall.appendChild(divinfotitle)
    divsmall.appendChild(divinfo)

    divlarge.appendChild(divmedium);
    divlarge.appendChild(divsmall);
    document.getElementById("gameinfo").appendChild(divlarge);


}

function onloader () {
    document.getElementById( "gameinput" ).value = localStorage.getItem( "game" );
    gamesearch();

}