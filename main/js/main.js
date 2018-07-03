	var blockButton = document.getElementsByClassName("button");
	var menuTop = document.getElementsByClassName("menuItem")[0];
	var menu = {
		height : 0, 
		width : 0};
	var rPanel = document.getElementById("rightPanel");
	var unLock = document.getElementById("unLockLink");

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~*SCALING*~

	window.onload = function(){
		menu.height = blockButton[0].height * 3.25;
		menu.width = blockButton[0].width * 1.5;
		menuTop.style.marginTop = (document.body.scrollHeight - menu.height)/2 -50 + "px";
		menuTop.parentElement.style.minWidth = menu.width + "px";
		// rightPanel
		rPanel.children[0].style.maxHeight = (menu.height*0.66) + "px";
		rPanel.children[1].style.maxHeight = (menu.height*0.33) + "px";
		rPanel.children[0].style.minWidth = menu.width + "px";

		mapUnLock();
		midPanel.alignSelf();

		what2buy.whRatio = what2buy.productImg[0].naturalWidth/what2buy.productImg[0].naturalHeight;
		what2buy.layout();
		whoWeR.layout();

		document.body.style.opacity = 1;
	} 
	// ~*RESIZE WINDOW*~
	window.onresize = function(){
		menu.height = blockButton[0].height * 3.25;
		menu.width = blockButton[0].width * 1.5;

		rPanel.children[1].style.maxWidth=(rPanel.offsetWidth*0.75)+"px";

		if(window.innerHeight>600){			
			menuTop.style.marginTop = (document.body.scrollHeight - menu.height)/2 -50 + "px";
			menuTop.parentElement.style.minWidth = menu.width + "px" 	
			// rightPanel
			rPanel.children[0].style.maxHeight = (menu.height*0.66) + "px";
			rPanel.children[1].style.maxHeight=(menu.height*0.33)+"px";
			rPanel.children[0].style.minWidth = menu.width + "px";
		}
		mapUnLock();
		midPanel.alignSelf();
		what2buy.layout();
		whoWeR.layout();
		what2buy.alignLastItem();
	}

	// ~*position unlock Link*~
	function mapUnLock(){
		var oAspectRatio = rPanel.children[1].children[0].naturalHeight/rPanel.children[1].children[0].naturalWidth;
		var cAspectRatio = rPanel.children[1].children[0].offsetHeight/rPanel.children[1].children[0].offsetWidth;
		var heightDiff = (rPanel.children[1].children[0].offsetHeight - (rPanel.children[1].children[0].offsetWidth *oAspectRatio))/2;
		var widthDiff = (rPanel.children[1].children[0].offsetWidth - (rPanel.children[1].children[0].offsetHeight *(1/oAspectRatio)))/2;
		var hSizeRatio = rPanel.children[1].children[0].height / rPanel.children[1].children[0].naturalHeight;
		var wSizeRatio = rPanel.children[1].children[0].width / rPanel.children[1].children[0].naturalWidth;
		if (cAspectRatio>oAspectRatio){
			unLock.style.top = ((rPanel.children[1].children[0].offsetTop + rPanel.children[1].children[0].offsetHeight)-heightDiff)+"px";
			unLock.style.left = rPanel.children[1].children[0].offsetLeft + rPanel.children[1].children[0].offsetWidth + "px";	
			unLock.style.width = (unLock.naturalWidth * wSizeRatio) + "px";
			unLock.style.height = "auto";
		} else if(cAspectRatio<oAspectRatio){
			unLock.style.top = (rPanel.children[1].children[0].offsetTop + rPanel.children[1].children[0].offsetHeight)+"px";
			unLock.style.left = ((rPanel.children[1].children[0].offsetLeft + rPanel.children[1].children[0].offsetWidth)-widthDiff) + "px";
			unLock.style.height = (unLock.naturalHeight * hSizeRatio) + "px";
			unLock.style.width = "auto";
		}
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~*MIDDLE PANEL*~

	// is this a problem for firefox ? 
	var midPanel = document.getElementById('midPanel');
	midPanel.tabs = document.getElementsByClassName("midTab");
	midPanel.tabTxt = document.querySelectorAll("#whatItIs .midTabTxt, #how2Buy .midTabTxt");
	midPanel.alignSelf = function(){
		this.style.left = (menuTop.parentElement.offsetLeft + (blockButton[0].width/2)) + 'px';
		this.style.marginTop = menuTop.style.marginTop;

		this.style.height = menu.height + "px";
		this.style.width = rPanel.offsetWidth + "px";
		// this.style.minWidth = (rPanel.children[1].children[0].offsetWidth + (rPanel.children[1].children[0].offsetLeft - midPanel.offsetLeft)) + "px";
		// ~~~~~~~~~~~~. clipping. ~~~~~~~~~~~~~~~~~. 
		var clipHorizontal = (100 * ((blockButton[0].width * 0.5) / this.offsetWidth)) + "%";
		var clipVertical = (100 * ((blockButton[0].height * 0.25) / this.offsetHeight)) + "%";
		this.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, " + clipHorizontal + " 100%, 0% " + clipVertical + ")"; 
		this.style.WebkitClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, " + clipHorizontal + " 100%, 0% " + clipVertical + ")"; 
		// ~~~~~~~~~~~~. txt. ~~~~~~~~~~~~~~~~~. 
		for (var i = 0; i < this.tabTxt.length; i++) {
			this.tabTxt[i].style.paddingLeft = blockButton[0].width + 33 + "px";
			this.tabTxt[i].style.paddingTop = blockButton[0].height * 0.25 + "px";
			this.tabTxt[i].style.paddingBottom = blockButton[0].height * 0.25 + "px";
		}
	}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~*BUTTONS*~
	
	function buttonClick(index){
		blockButton[index].addEventListener('click', function(event){
			event.stopPropagation();
			console.log("u clicked button number " + (index-1)/2);
			if(blockButton[index].status == 0){
				for (j = 1; j < blockButton.length; j+=2){
					blockButton[j].status = 0;
					blockButton[j].style.opacity = 0;
				}
				blockButton[index].style.opacity = 1;
				blockButton[index].status = 1;

				rPanel.style.transform = "translate(100%, 0%)";				
			}else{
				blockButton[index].style.opacity = 0;
				blockButton[index].status = 0;
				rPanel.style.transform = "translate(0%, 0%)";
			}


			// needs shorter syntax, this is the most convoluted way of doing this 
			if (midPanel.tabs[(index-1)/2].status == 0) {
				for (i = 0; i < midPanel.tabs.length; i++) {
					midPanel.tabs[i].status = 0;
				}
				midPanel.tabs[(index-1)/2].status = 1;
				for (i = 0; i < midPanel.tabs.length; i++) {
					if(midPanel.tabs[i].status == 0){midPanel.tabs[i].style.transform = "translate(-100%, 0%)"}
				}
				midPanel.tabs[(index-1)/2].style.transform = "translate(0%, 0%)"	
			}else{
				midPanel.tabs[(index-1)/2].style.transform="translate(-100%, 0%)";
				midPanel.tabs[(index-1)/2].status = 0;
			}			
		})
	}

	function buttonHover(index){
		blockButton[index].addEventListener("mouseover", function(){
			for (j = 1; j < blockButton.length; j+=2){
				blockButton[j].style.opacity = 0;
			}
			blockButton[index].style.opacity = 1;
		});
		blockButton[index].addEventListener("mouseout", function(){
			for (j = 1; j < blockButton.length; j+=2){
				if(blockButton[j].status==1){
					blockButton[j].style.opacity = 1;
				}else{blockButton[j].style.opacity = 0}				
			}
		})
	}

	for(i = 0; i < blockButton.length; i++){
		blockButton[i].status = 0;
		if(i<midPanel.tabs.length){
			midPanel.tabs[i].status = 0;
			midPanel.tabs[i].addEventListener('click', function(event){
				event.stopPropagation();
			})	
		} 
		buttonClick(i);
		buttonHover(i);	
	} 


	document.body.addEventListener("click", function(){

		for (i = 0; i < midPanel.tabs.length; i++) {
					midPanel.tabs[i].status = 0;
					midPanel.tabs[i].style.transform = "translate(-100%, 0%)"					
				}
		for (j = 1; j < blockButton.length; j+=2){
					blockButton[j].status = 0;
					blockButton[j].style.opacity = 0;
				}
		rPanel.style.transform = "translate(0%, 0%)"
	})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~*What 2 Buy*~

var what2buy = document.querySelector("#what2buy");
what2buy.liNodes = document.querySelectorAll("#what2buy li");
what2buy.hexFrame = document.querySelectorAll("#what2buy .hexFrame");
what2buy.productImg = document.querySelectorAll("img.product");
what2buy.productDiv = document.querySelectorAll("div.product");
what2buy.productTxt = document.querySelectorAll("div.product > .midTabTxt");
what2buy.arrowUp = document.querySelectorAll(".arrow.up");
what2buy.arrowDown = document.querySelectorAll(".arrow.down");
what2buy.currentItem = 0;
what2buy.layout = function(){
	var h = midPanel.offsetHeight;
	var w = midPanel.offsetWidth;
	var txtPadding = parseInt(window.getComputedStyle(this.productTxt[0], null).getPropertyValue("padding-left")) * 2;
	for (i = 0; i < this.liNodes.length; i++) {
		this.liNodes[i].style.height = h + "px";
		this.liNodes[i].style.marginLeft = blockButton[0].width + "px";
		
		this.hexFrame[i].style.maxHeight =((h * 0.9) *(1/this.whRatio)) + 'px';
		this.hexFrame[i].style.width = this.hexFrame[i].offsetHeight * this.whRatio + "px";	
		// this.productImg[i].style.width = this.hexFrame[i].style.offsetWidth + 'px';

		// this.productTxt[i].style.width = (this.productImg[0].offsetWidth - txtPadding) + "px";

		// calculate maxH 
		// maxH = maxW * naturalH / naturalW 
		// maxW = (w-btnMargin)*0.8
	}
}
what2buy.alignLastItem = function(){
	var offset =what2buy.offsetHeight*this.currentItem;
	this.scrollTo(null, offset);
	console.log('scrolling');
}

for (i = 0; i < what2buy.hexFrame.length; i++) {
	what2buy.hexFrame[i].addEventListener('click', function(event){
		var element = event.currentTarget;
		switch(element.children[2].style.transform){
			case "":
				element.children[2].style.transform = element.children[1].style.transform	= "translateX(-200%)";
				break;
			case "translateX(-100%)":
				element.children[2].style.transform = element.children[1].style.transform	= "translateX(-200%)";
				break;
			case "translateX(-200%)":
				element.children[2].style.transform = element.children[1].style.transform	= "translateX(-100%)";
				break;
			default:
				console.log("something wrong: check cssTransform on .product");
		}
		
	})
}
what2buy.arrowUp[0].classList.add('hidden')
for (var i = 1; i < what2buy.arrowUp.length; i++) {
	what2buy.arrowUp[i].addEventListener('click', function(event){
		what2buy.currentItem --;
		what2buy.scrollBy({
			top: -midPanel.offsetHeight,
			left: 0,
			behavior: "smooth"
		})
		console.log(what2buy.currentItem);
		// what2buy.currentItem = (i-1);
	})
}

what2buy.arrowDown[what2buy.arrowDown.length-1].classList.add('hidden')
for (var i = 0; i < what2buy.arrowDown.length-1; i++) {	
	what2buy.arrowDown[i].addEventListener('click', function(event){
		what2buy.currentItem ++;
		what2buy.scrollBy({
			top: midPanel.offsetHeight,
			left: 0,
			behavior: "smooth"
		});
		// what2buy.currentItem = (i+1);
		console.log(what2buy.currentItem);
	})
	// if (i == (what2buy.arrowDown.length - 2)) {
	// 	what2buy.arrowDown[i].addEventListener('click', function(event){what2buy.lastItem = true});
	// }else{
	// 	what2buy.arrowDown[i].addEventListener('click', function(event){what2buy.lastItem = false});
	// }
}


var whoWeR = document.querySelector("#whoWeR");
whoWeR.container = document.querySelectorAll("#whoWeR .bioContainer");
whoWeR.hexFrame = document.querySelectorAll("#whoWeR .hexFrame");
whoWeR.panel = document.querySelector("#whoWeR .bioPanel");
whoWeR.layout = function(){

	var h = midPanel.offsetHeight;
	var aspect = blockButton[0].offsetWidth/blockButton[0].offsetHeight;
	this.panel.style.height = h - 30 + 'px';
	this.panel.style.marginLeft = blockButton[0].width + "px";
	for (var i = 0; i < this.hexFrame.length; i++) {
		this.hexFrame[i].style.width =  this.hexFrame[i].offsetHeight * (aspect/1) + 'px';
		if ((i+1)%2){
			this.container[i].style.flexFlow = "row-reverse";
		}
	}
} 









// NOTES 2 SELF
// ~~ stop selecting elements by .children[]
// ~~ select by document.querySelectorAll()
// ~~ check cross-browser performance step-by-step