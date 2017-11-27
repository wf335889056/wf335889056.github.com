$(function(){
	var changeText = $('.placePage .placeStyle a');
	var pText = $('.placePage .placeStyle p');
	var ppText = $('.placePage .placeStyle p > span');
	var pastText = pText.text();
	// console.log(ppText.empty());
	ppText.empty();
	pText.text(pText.text() + '...');
	var nowText = pText.text();
	// console.log(nowText);
	changeText.click(function(){
		// $('.placePage .placeStyle a i span').addClass('turnTop');
		if(changeText.text() == '◇展开'){
			pText.text(pastText);
			changeText.html('<i><span class = "turnTop">◇</span></i>收起').css('color','#ff9912');		
		}else{
			// pText.substr(0);
			// ppText.empty();
			// pText.text(pText.text() + '...');
			pText.text(nowText);
			changeText.html('<i><span>◇</span></i>展开');
		}
	});

	var sessionHigh = $('.session')
	var changeSin = $('.allplace .allplacePice a');
	changeSin.click(function(){
		changeSin.toggleClass('rotateSin');
		// if(sessionHigh.height() == '0'){
		// 	sessionHigh.height('280');
		// }else{
		// 	sessionHigh.height('0');
		// }
		sessionHigh.slideToggle();
		
		// console.log(sessionHigh.height());
	})
	

});
window.onload = function(){
	var turnLeft = document.getElementById('turnLeft');
	var turnRight = document.getElementById('turnRight');
	var dataText = document.getElementById('dataText');
	var moveTable = document.getElementsByClassName('moveTable')[0];
	turnLeft.onclick = function(){
		// console.log(1);
		moveTable.setAttribute('class','moveTable turnleft');
		dataText.innerText = "2017.9";
	}
	turnRight.onclick = function(){
		moveTable.setAttribute('class','moveTable turnright');
		dataText.innerText = "2017.8";
	}
}





