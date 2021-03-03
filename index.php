<!DOCTYPE html>
<head>
    <title>index</title>
    <style>
        *{
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>THE clickergame</h1>
    <h2 id="counter">0</h2>
    <button id="up" onclick="inc();">CLICK ME</button>

<script>
    function inc($i=1){
        $c=document.getElementById("counter");
        $c.innerHTML = Number($c.innerHTML)+$i;
    }
</script>
</body>

