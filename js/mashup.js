/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';

const stores = ["Steam", "GamersGate", "Green Man Gaming", "Amazon", "Gamestop", "Direct2Drive", "GOG", "Origin", "Get Games", "Shiny Loot", "Humble Bundle", "Desura", "Uplay", "Indie Games Stand", "Fanatical", "Gamesrocket", "Games Republic", "Sila Games", "Playfield", "Imperial Games", "Windows Games Store", "Fun Stock Digital", "Game Billet", "Voidu", "Epic Games Store", "Razer Game Store", "Games Planet", "Gamesload", "2Game", "IndieGala", "Blizzard Shop", "All You Play", "DLGamer"]
const scopes = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]
async function gamename(name) {


    let url = 'https://www.cheapshark.com/api/1.0/games?title=' + name;
    return fetch(url)
    .then(response => response.json())

    
}
async function gameinfo(id) {
    let url = 'https://www.cheapshark.com/api/1.0/games?id=' + id;
    return fetch(url)
    .then(response => response.json())
}

async function horoscope(type, day) {
    
    let url = 'https://aztro.sameerkumar.website?sign=' + type + '&day=' + day;
    return (fetch(url, {
        method: 'POST'
    }))
    .then(response => response.json())
    
}

async function gallery(horoscoper) {
    let url = 'https://api.artic.edu/api/v1/artworks/search?q=' + horoscoper
    return fetch(url)
    .then(response => response.json())
}


async function galleryimage(imageid){

    let url = 'https://api.artic.edu/api/v1/artworks/' + imageid + '?fields=id,title,image_id'
    return fetch(url)
    .then(response => response.json())
}

async function popupkiller() {
    let popup = document.getElementById('checker')

    while (popup.firstChild) {
        popup.removeChild(popup.firstChild);
    }

}


async function clickgameonly() {

    var divs = document.getElementById("gamelist");
        while (divs.firstChild) {
            divs.removeChild(divs.firstChild);
        }
        

    

    
    let name = document.querySelector('#gamenameinput').value;
    
  
    
    if (name == "") {
        
        let popup = document.getElementById('checker')
        
        let warning = document.createElement("p")
        warning.setAttribute("class", "text-center bg-warning p-4")
        warning.innerHTML = "You need to put something in the box"
        window.setTimeout(popupkiller, 3000);
        popup.appendChild(warning)
        
    }
    
    window.localStorage.setItem("game", name)
    let game = await gamename(name);

    let gameinfos = game[0].gameID

    let gamesale = await gameinfo(gameinfos);

    
    //title and picture
    var divlarge = document.createElement("div")
    divlarge.setAttribute("class", "rounded bg-secondary")
    var divmedium = document.createElement("div");
    
    
    var divtitle = document.createElement("h6")
    divtitle.setAttribute("class", "ps-5")
    let picture = gamesale.info.thumb;

 

    var divpicture = document.createElement("img");
    divpicture.src = picture;
    divpicture.setAttribute("class", "m-3 rounded border border-dark img-responsive")


    
    divmedium.setAttribute("class", "col")
    
    divtitle.innerHTML = gamesale.info.title
    //image there
    divmedium.appendChild(divpicture);
    divmedium.appendChild(divtitle);

    //dropdown of stores and price

    let sales = gamesale.deals.length
    
    
    

    
    var gameprices = document.createElement("select")
    gameprices.id = "pricedrop"
    let lengthofsale = 0;
    
    for (let i = 0; i < sales; i++) {
        console.log(i)
        let storedID = gamesale.deals[i].storeID
        console.log(storedID)

        let priced = gamesale.deals[i].price;
        console.log(priced)

        let store = stores[storedID-1]
        console.log(store)
        
        
        lengthofsale++;
        var option = document.createElement("option")
        option.text = store + " " + priced;
        console.log(option)
        gameprices.appendChild(option)

    }
    let labeltitle = document.createElement("h4")
    labeltitle.innerHTML = "According to " + gamesale.info.title +"'s horoscope for you"
    labeltitle.setAttribute("class", "text-white mt-2")
    divlarge.appendChild(labeltitle)
    gameprices.setAttribute("class", "ps-3")
    
    divmedium.appendChild(gameprices)
    

    
 

    //gallery 
    let horoscopes = document.getElementById("galleryinfo")
    let value = horoscopes.options[horoscopes.selectedIndex].value
    let gallerywait = await gallery(value);  
    let horoscopegentext = gallerywait.data[0].thumbnail.alt_text; 
    let horoscopegen = gallerywait.data[0].is_boosted;

    window.localStorage.setItem("sign", value)
    console.log(gallerywait)

    var divsmall = document.createElement("div");
    var labels = document.createElement("label")
    
    var text = document.createElement("p");
    text.setAttribute("id", "inspirational")
    labels.setAttribute("for", "inspirational")
    var res = JSON.parse(JSON.stringify(horoscopegentext, function(a, b) {
        return typeof b === "string" ? b.toLowerCase() : b
      }));
      
    labels.innerHTML = "Inspirational Quote"
    text.innerHTML = "You are " + res;
    text.setAttribute("class", "text-white text-center m-5 lead")



    divmedium.appendChild(text);
    divlarge.appendChild(divsmall);

    
    
      
    
    // horoscope
    let horoscopeday = "";


    if (horoscopegen == true) {
        horoscopeday = "today";

    }
    else if (horoscopegen == false) {
        horoscopeday = "tomorrow";
    }
    else {
        horoscopeday = "yesterday";
    }

    console.log(lengthofsale)

    let horentity = scopes[lengthofsale];

    let horoscoper = await horoscope(horentity, horoscopeday)
    console.log(horoscoper)

    let hortable = document.createElement("table")
    hortable.setAttribute("class", "table table-light table-striped col")
    let horbody = document.createElement("tbody")

    let row1 = document.createElement("tr");

    let row2 = document.createElement("tr");

    let row3 = document.createElement("tr");

    let row4 = document.createElement("tr");

    let row5 = document.createElement("tr");

    let row6 = document.createElement("tr");

    let row7 = document.createElement("tr");

    let row8 = document.createElement("tr");


    let td1 = document.createElement("td");
    var cellText = document.createTextNode("Date Range")
    td1.appendChild(cellText)


    let td2 = document.createElement("td");
    var cellText2 = document.createTextNode(horoscoper.date_range)
    td2.appendChild(cellText2)
    row1.appendChild(td1)
    row1.appendChild(td2)
    

    let td4 = document.createElement("td");
    var cellText3 = document.createTextNode("Current Date")
    td4.appendChild(cellText3)

    let td3 = document.createElement("td");
    var cellText4 = document.createTextNode(horoscoper.current_date)
    td3.appendChild(cellText4)
    row2.appendChild(td4)
    row2.appendChild(td3)

    

    let td6 = document.createElement("td");
    var cellText5 = document.createTextNode("Description")
    td6.appendChild(cellText5)
    let td5 = document.createElement("td");
    var cellText6 = document.createTextNode(horoscoper.description)
    td5.appendChild(cellText6)
    row3.appendChild(td6)
    row3.appendChild(td5)

    

    let td8 = document.createElement("td");
    var cellText7 = document.createTextNode("Compatibility")
    td8.appendChild(cellText7)
    let td7 = document.createElement("td");
    var cellText8 = document.createTextNode(horoscoper.compatibility)
    td7.appendChild(cellText8)
    row4.appendChild(td8)
    row4.appendChild(td7)

    

    

    let td10 = document.createElement("td");
    var cellText9 = document.createTextNode("Mood")
    td10.appendChild(cellText9)
    let td9 = document.createElement("td");
    var cellText10 = document.createTextNode(horoscoper.mood)
    td9.appendChild(cellText10)
    row5.appendChild(td10)
    row5.appendChild(td9)

    

    let td12 = document.createElement("td");
    var cellText11 = document.createTextNode("Color")
    td12.appendChild(cellText11)
    let td11 = document.createElement("td");
    var cellText12 = document.createTextNode(horoscoper.color)
    td11.appendChild(cellText12)
    row6.appendChild(td12)
    row6.appendChild(td11)

    

    let td14 = document.createElement("td");
    var cellText13 = document.createTextNode("Lucky Number")
    td14.appendChild(cellText13)
    let td13 = document.createElement("td");
    var cellText14 = document.createTextNode(horoscoper.lucky_number)
    td13.appendChild(cellText14)
    row7.appendChild(td14)
    row7.appendChild(td13)

    

    let td16 = document.createElement("td");
    var cellText15 = document.createTextNode("Lucky Time")
    td16.appendChild(cellText15)
    let td15 = document.createElement("td");
    var cellText16 = document.createTextNode(horoscoper.lucky_time)
    td15.appendChild(cellText16)
    row8.appendChild(td16)
    row8.appendChild(td15)
    
    horbody.appendChild(row1)
    horbody.appendChild(row2)
    horbody.appendChild(row3)
    horbody.appendChild(row4)
    horbody.appendChild(row5)
    horbody.appendChild(row6)
    horbody.appendChild(row7)
    horbody.appendChild(row8)

    hortable.appendChild(horbody);
    
    let divhor = document.createElement("div")
    divhor.appendChild(hortable)

    divmedium.append(divhor)

    divlarge.appendChild(divmedium)
    document.getElementById("gamelist").appendChild(divlarge)
}


function onloader () {
    document.getElementById( "gamenameinput" ).value = localStorage.getItem( "game" );
    document.getElementById( "galleryinfo" ).value = localStorage.getItem( "sign" );
}
   

