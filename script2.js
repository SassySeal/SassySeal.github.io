//sollen im Cache gespeichert werden
var csvArray;
var eaten_smaks = 0;
var clickpower = 1;
var friends = 0;

//sollen aus der csv datei geholt werden
var friends_reward_step = 10;
var friends_price_base = 1.04;

//logarithm y to base x
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

//Funktion soll aufgerufen werden, wenn Button "Smak" gedrückt wird
function smak(){
    eaten_smaks += clickpower * Math.floor((friends/friends_reward_step)+1) * Math.floor((friends/5*friends_reward_step)+1) * Math.floor((friends/10*friends_reward_step)+1)
}

//Funktion soll aufgerufen werden, wenn Button "Increase Click Power" gedrückt wird
function increase_clickpower(){
    clickpower *= 2;
    eaten_smaks -= 5^(getBaseLog(2*clickpower)-1)*10;
}

//Funktion soll aufgerunden werden, wenn Button "Get Friends" gerdrückt wird
function get_friends(){
    friends += 1;
    eaten_smaks -= friends_price_base^friends;
}

function update(){
    document.getElementById("eaten_smaks").innerHTML = eaten_smaks;
    document.getElementById("friends").innerHTML = friends;
    document.getElementById("clickpower").innerHTML = clickpower;

    if(eaten_smaks<friends_price_base^friends){
        document.getElementById("button_get_friends").disabled = true;
    } else {
        document.getElementById("button_get_friends").disabled = false;
    }

    if(eaten_smaks < 5^(getBaseLog(2*clickpower)-1)*10){
        document.getElementById("button_buy_clickpower").disabled = true;
    } else {
        document.getElementById("button_buy_clickpower").disabled = false;
    }
}