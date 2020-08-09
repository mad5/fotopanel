
fotopanel = function(sel) {
	var sizemode = "fix";
	var width = 800;
	var height = 600;
	
	var rows = 2;
	var cols = 3;
	var inSpeed = 18;
	var outSpeed = 10;
	
	var selector = sel;
	
	var setCols = function(r) {
		cols = r
	}
	var setRows = function(r) {
		rows = r
	}
	
	var sizePanels = function() {
		$('.fotopanel').css("height", height/rows);
	}
	
	var setSize = function() {
		width = $(window).width()-1;
		height = $(window).height()-1;
		
		$(selector).css("width", width).css("height", height);
		sizePanels();
	}
	
	var countPanels = 0;
	var nextPanel = 0;
	var panelsPerLine = [];
	var linePerPanel = {};
	
	this.initPanels = function() {
		var html = "";
		html += "<style>.fotopanel { overflow:hidden;position:relative; } .fotopanel img {position:relative;} </style>";
		for(var i=0;i<rows;i++) {
			panelsPerLine[i] = [];
			html += "<div>";
			for(var j=0;j<cols+1;j++) {
				html += "<div style='float:left;' class='fotopanel panel"+countPanels+"'>";
				html += i+" / "+j;
				html += "</div>";
				panelsPerLine[i][j] = ".panel"+countPanels;
				linePerPanel[".panel"+countPanels] = i;
				countPanels++;
			}
			html += "<div style='clear:both;'></div>";
			html += "</div>";
		}
		//console.log(linePerPanel);
		//console.log(panelsPerLine);
		$(selector).html(html);
		sizePanels();
	}
	
	this.setFullsize = function() {
		sizemode = "fullsize";
		setSize();
		$(window).on("resize", setSize);
	}
	
	$(sel).css("background-color", "black").css("box-sizing", "border-box");
	
	var nextLine = 0;
	
	var insertFoto = function(img) {
		//console.log([img, img.width, img.height]);
		
		var line = nextLine; //findLine('.panel'+nextPanel);
		nextLine++;
		if(nextLine>=rows) nextLine=0;
		var smallest = findSmallestInLine(line);
		
		var h = Math.floor(height/rows);
		var w = img.width;
		w = w * (h/img.height);
		
		if(w>width/2) w = Math.floor(width/2);
		w = Math.floor(w);
		
		//$('.panel'+nextPanel).css("width", 0);
		img.height = h;
		img.width = w;
		//$('.panel'+nextPanel).html(img);
		
		
		$(smallest).css("width", 0);
		$(smallest).html(img);
		
		//var otherPanel = findOther('.panel'+nextPanel);
		var otherPanel = findOther(smallest);
		
		//fadeIn('.panel'+nextPanel, w, line, otherPanel);
		fadeIn(smallest, w, line, otherPanel);
		
		nextPanel++;
		if(nextPanel>=countPanels) nextPanel=0;
	} 
	
	var findLine = function(panel) {
		return linePerPanel[panel];
	}
	
	var findSmallestInLine = function(line) {		
		var anz = panelsPerLine[line].length;
		var w = 99999;
		var pn = "";
		for(var i=0;i<anz;i++) {
			if(pn=="" || $(panelsPerLine[line][i]).width()<w) {
				pn = panelsPerLine[line][i];
				w = $(panelsPerLine[line][i]).width();
			}
		}
		return pn;
	}
	
	var findOther = function(panel) {
		var line = findLine(panel);
		/*
		var anz = panelsPerLine[line].length;
		var w = 99999;
		var pn = "";
		for(var i=0;i<anz;i++) {
			if(panel==panelsPerLine[line][i]) continue;
			if(pn=="" || $(panelsPerLine[line][i]).width()<w) {
				pn = panelsPerLine[line][i];
				w = $(panelsPerLine[line][i]).width();
			}
		}
		return pn;
		*/
		
		var anz = panelsPerLine[line].length;
		do {
			var nr = Math.floor( Math.random()*anz );
			pn = panelsPerLine[line][nr];
		} while(pn==panel);
		return pn;
	}
	
	var fadeLock = false;
	
	var fadeIn = function(selector, w, line, otherPanel) {
		var wd = $(selector).width();
		var wdOther = $(otherPanel).width();
		
		fadeLock = true;
		//console.log([wd,w]);
		if(wd<w) {
			wd += inSpeed;
			if(wd>w) wd = w;
			$(selector).css("width", wd);
			
			var gesamtW = wd;
			for(var i=0;i<panelsPerLine[line].length;i++) {
				var P = panelsPerLine[line][i];
				if(P==selector) continue;
				gesamtW += $(P).width();
			}
			
			if(gesamtW>width) {
				
				wdOther -= inSpeed*0.66;
				if(wdOther<=0) wdOther = 0;
				wdOther = Math.floor(wdOther);
				$(otherPanel).css("width", wdOther);
				
				var other2 = [];
				var other2Width = [];
				var gesamtW = wd+wdOther;
				for(var i=0;i<panelsPerLine[line].length;i++) {
					var P = panelsPerLine[line][i];
					if(P==selector || P==otherPanel) continue;
					gesamtW += $(P).width();
					other2.push(P);
					other2Width.push($(P).width());
				}
				while(gesamtW>=width) {
					for(var i=0;i<other2.length;i++) {
						
						var W = other2Width[i];
						W-=outSpeed;
						gesamtW-=outSpeed;
						if(W<0) W=0;
						other2Width[i] = Math.floor(W);
						
						/*
						var W = $(other2[i]).width();
						W-=outSpeed;
						gesamtW-=outSpeed;
						if(W<0) W=0;
						$(other2[i]).css("width", Math.floor(W));
						*/
						
						if(gesamtW<width) break;
					}
				};
				for(var i=0;i<other2.length;i++) {
					$(other2[i]).css("width", other2Width[i]);
				}
			}
			
			var gesamtW=0;
			
			for(var i=0;i<panelsPerLine[line].length;i++) {
				var wdiv = $(panelsPerLine[line][i]).width();
				gesamtW += wdiv;
				var img = $(panelsPerLine[line][i]).find("img")[0];
				var wimg = $(img).width();
				var M = wdiv/2 - wimg/2;
				$(img).css("margin-left", M);
			}
			if(gesamtW>=width) {
				for(var i=0;i<panelsPerLine[line].length;i++) {
					var img = $(panelsPerLine[line][i]).find("img")[0];
					var wimg = $(img).width();
					$(img).css("width", wimg-1);
				}
			}
			
			requestAnimationFrame(function() {fadeIn(selector, w, line, otherPanel); });
			
		} else {
			fadeLock = false;
		}
	}
	
	this.addFoto = function(url) {
		if(fadeLock) {
			//console.log("blocked");
			return;
		}
			
		var img = new Image();
		img.src = url;
		img.onload = function() {
			insertFoto(img);
		}
	}
	
}