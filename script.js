        var cost=[];
        cost['friends']=100;
        cost['ClickPow']=10;

        var csvArray;
        var num = 0;
        var friends = -1;
        var clicker_level = 1;

            window.onclick=function(){
                save();
            }

            //initialisierung
            window.onload=function(){
                setInterval(autoclick,1000);
                setInterval(save, 1000);


                loadCsv();
                //spielstand aus cache laden
                var stored = localStorage['smak_clicker'];
                if (stored){
                    myVar = JSON.parse(stored); 
                    num = myVar["num"];
                    friends = myVar["friends"];
                    clicker_level = myVar["clicker_level"];
                    if(num >= cost['friends']){
                        document.getElementById("friendser_sek").classList.remove("d-none");
                    }
                    //kosten ausrechnen
                    document.getElementById("click_improvements_cost").innerHTML = clicker_level*cost['ClickPow'];
                    document.getElementById("friendser_cost").innerHTML = cost['friends']*(friends+1);
                    document.getElementById("friendser10_cost").innerHTML = 10*cost['friends']*friends+cost['friends']*55;
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
                    "clicker_level": clicker_level, 
                    "friends": friends,
                    "num": num
                }

                localStorage['smak_clicker'] = JSON.stringify(jstuff);
            }
          
            function reset(){
                num=0;
                friends=-1;
                clicker_level=1;
                document.getElementById("friendser_sek").classList.add("d-none");
                document.getElementById("click_improvements_cost").innerHTML = clicker_level*cost['ClickPow'];
                update();
            }

            //after every btn click
            function update(){
                document.getElementById("number").innerHTML = num;
                document.getElementById("friendser").innerHTML = friends;
                document.getElementById("click_improvements").innerHTML = clicker_level;
                if(num<cost['friends']*(friends+1)){
                    document.getElementById("friendserbtn").disabled=true;
                }else{
                    document.getElementById("friendserbtn").disabled=false;
                }
                if(num<(10*cost['friends']*friends+cost['friends']*55)){
                    document.getElementById("friendserbtn_ext").disabled=true;
                }else{
                    document.getElementById("friendserbtn_ext").disabled=false;
                }
            }
            
            function increaseClickPow(){
                if(num > cost['ClickPow']*clicker_level){
                    num -= cost['ClickPow']*clicker_level;
                    clicker_level++;
                    document.getElementById("click_improvements_cost").innerHTML = clicker_level*cost['ClickPow'];
                    update();
                }
            }

            //numbersection
            function increaseNum(n=1){
                if(friends>0){
                    num+=friends;
                }
                num+=n;
                num += clicker_level;
                if(friends == -1 && num >= cost['friends']){
                    friendser();
                }
                update();
            }

            //autoclickcounter
            function autoclick(){
                if(friends>0){
                    num+=friends;
                }
                update();
            }

            //friendsersection:
            function friendser(){
                friends=0;
                document.getElementById("friendser_cost").innerHTML = cost['friends']*(friends+1);
                document.getElementById("friendser10_cost").innerHTML = 10*cost['friends']*friends+cost['friends']*55;
                document.getElementById("friendser_sek").classList.remove("d-none");
            }

            function increasefriends(n=1){
                let test=0;
                for(i=0;i<n;i++){
                    friends++;
                    test+=(cost['friends']*friends);
                    num-=(cost['friends']*friends);
                }
                document.getElementById("friendser_cost").innerHTML = cost['friends']*(friends+1);
                document.getElementById("friendser10_cost").innerHTML = 10*cost['friends']*friends+cost['friends']*55;
                update();
            }
            //end_friendsersection
            
            //debug
            function debug(){
                let btn=document.getElementById("enable_debug");
                if(btn.innerHTML=="enable_cheats"){
                    document.getElementById("debug").classList.remove("d-none");
                    btn.innerHTML="disable_cheats";
                }else{
                    document.getElementById("debug").classList.add("d-none");
                    btn.innerHTML="enable_cheats";
                }
            }