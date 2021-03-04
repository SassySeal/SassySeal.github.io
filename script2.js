//sollen im Cache gespeichert werden
var csvArray;
var eaten_smaks = 0;
var clickpower = 1;
var friends = 0;

//sollen aus der csv datei geholt werden
var friends_reward_step = 10;
var friends_price_base = 1.04;

window.onclick=function(){
    save();
    update();
}

//init
window.onload=function(){
    setInterval(save, 1000);

    loadCsv();

    //spielstand aus cache laden
    
    var stored = localStorage['smak_clicker'];
    if (stored){
        myVar = JSON.parse(stored); 
        eaten_smaks = myVar["eaten_smaks"];
        clickpower = myVar["clickpower"];
        friends = myVar["friends"];

    }
    
   update();
}

function loadCsv(){
    $.ajax({
        type: "GET",
        url: "test.csv",
        dataType: "text",
        success: function(data){
            var csvRows = [];
            rows = data.replace(/(\r\n|\n|\r)/gm, ";");
            rows = rows.split(';');
            //console.log(rows);
            for(var i = 0; i < rows.length; i++){
                var temp = rows[i];
                csvRows[i] = temp.split(',');
            }
            //console.log(csvRows);
            csvArray = csvRows;
        }
    });
}

function save(){
    var jstuff  = {
        "eaten_smaks": eaten_smaks, 
        "clickpower": clickpower,
        "friends": friends
    }

    localStorage['smak_clicker'] = JSON.stringify(jstuff);
}

function reset(){
    eaten_smaks=0;
    clickpower=1;
    friends=1;
    update();
}

//logarithm y to base x
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

//Funktion soll aufgerufen werden, wenn Button "Smak" gedrückt wird
function smak(){
    eaten_smaks += clickpower * friends * Math.floor((friends/friends_reward_step)+1) * Math.floor((friends/(5*friends_reward_step))+1) * Math.floor((friends/(10*friends_reward_step))+1);
    update();
}

//Funktion soll aufgerufen werden, wenn Button "Increase Click Power" gedrückt wird
function increase_clickpower(){
    eaten_smaks -= Math.pow(5,getBaseLog(2,clickpower)+1)*10;
    clickpower *= 2;
}

//Funktion soll aufgerunden werden, wenn Button "Get Friends" gerdrückt wird
function get_friends(){
    eaten_smaks -= Math.floor(Math.pow(friends_price_base*3,friends));
    friends += 1;
}

function update(){
    document.getElementById("span_eaten_smaks").innerHTML = eaten_smaks;
    document.getElementById("span_friends").innerHTML = friends;
    document.getElementById("span_clickpower").innerHTML = clickpower;
    document.getElementById("clickpower_cost").innerHTML = "("+Math.pow(5,getBaseLog(2,clickpower)+1)*10+")";
    document.getElementById("friends_cost").innerHTML = "("+Math.floor(Math.pow(friends_price_base*3,friends))+")";

    if(eaten_smaks < Math.pow(5,getBaseLog(2,clickpower)+1)*10){
        document.getElementById("button_clickpower").disabled = true;
    } else {
        document.getElementById("button_clickpower").disabled = false;
    }

    if(eaten_smaks< Math.floor(Math.pow(friends_price_base*3,friends))){
        document.getElementById("button_friends").disabled = true;
    } else {
        document.getElementById("button_friends").disabled = false;
    }

    if(clickpower == 1 && eaten_smaks<30){
        document.getElementById("section_clickpower").classList.add("d-none");
    } else {
        document.getElementById("section_clickpower").classList.remove("d-none");
    }

    if(clickpower<4){
        document.getElementById("section_friends").classList.add("d-none");
    } else {
        document.getElementById("section_friends").classList.remove("d-none");
    }
}

function debug(){
    let button=document.getElementById("button_debug");
    if(button.innerHTML=="open debug mode"){
        document.getElementById("debug").classList.remove("d-none");
        button.innerHTML="close debug mode";
    }else{
        document.getElementById("debug").classList.add("d-none");
        button.innerHTML="open debug mode";
    }
}