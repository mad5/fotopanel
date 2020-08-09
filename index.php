<!doctype html>
<html>
<head>
<style>
body {
	padding: 0;
	margin: 0;
	background-color: black;
	overflow:hidden;
}
</style>
</head>
<body>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="fotopanel.js"></script>

<div id="panelarea"></div>

<script>



var f = new fotopanel("#panelarea");
f.setFullsize();

f.initPanels();

function nextPic() {
	f.addFoto("https://source.unsplash.com/random/800x600&dat="+(new Date()).getTime());	
}

setInterval(function() {
		nextPic();
}, 10000);
nextPic();

</script>


</body>
</html>