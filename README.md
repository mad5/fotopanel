# fotopanel.js

![example](fotopanel.jpg)

with fotopanel a display can be automatically filled with images. 
Each newly added image is placed in a free space. 
The other images in the row are reduced in size.

## init

```
<style>
body {
	padding: 0;
	margin: 0;
	background-color: black;
	overflow:hidden;
}
</style>

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
```