
    window.onload = function() {
        init();
        setInterval(save, 1000);
    };

    var luckPrice = 20;
    var luck = 1;
    var luckAmount = 0;
    var money = 100;
    var coinflip_random = 0.5;

    function init(){
        var vars = localStorage['gamblestuff'];
        if(vars){
            var vars2 = JSON.parse(vars);
            console.log("money: "+ vars2["money"]);
            money = parseInt(vars2["money"], 10);
            luckAmount = vars2["luckAmount"];
            luckPrice = vars2["luckPrice"];
        }
        else{
            console.log("FUCK");
        }
        update();
        //addMoney(0);
    }

    function update(){
        luck = 1 + luckAmount/100;
        luck  = Math.floor(luck*100)/100;
        console.log("Money: "+money);
        document.getElementById("monies").innerHTML = "money: "+money+"$";
        document.getElementById("luck").innerHTML = "luck: "+luckAmount;
        document.getElementById("luck_buyer").innerHTML = "buy luck: "+luckPrice+"$";
        document.getElementById("coin_probabilitys").innerHTML = "win: "+Math.floor(100*(1-coinflip_random/luck))+"%";
        if(money == 0){

        }
    }

    function reset(){
        money = 100;
        luck = 1;
        luckPrice = 20;
        luckAmount = 0;
        update();
    }

    function addMoney(amount){
        money += amount;
        update();
    }
    function substractMoney(amount){
        money -= amount;
        update();
    }

    function coinflip(){
        bet_amount = parseInt(document.getElementById("coin_bet").value, 10);
        
        console.log("flipping a coin with bet = "+bet_amount+" and Money = "+money);

        if(bet_amount <= money){
            if(Math.random() >= coinflip_random/luck){
                addMoney(bet_amount);
            }
            else{
                substractMoney(bet_amount);
            }
        }
    }

    function buyLuck(){
        if(money >= luckPrice){
            money -= luckPrice;
            luckPrice = Math.floor(1.05*luckPrice);
            luckAmount += 1;
            update();
        }
    }


    function save(){
        var jstuff  = {
            "money": money,
            "luckAmount": luckAmount,
            "luckPrice": luckPrice
        }
        localStorage['gamblestuff'] = JSON.stringify(jstuff);
    }
