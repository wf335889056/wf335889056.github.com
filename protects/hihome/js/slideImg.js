window.onload = function(){
	var box = document.getElementsByClassName('slideImg')[0];
	var imgUl = document.getElementsByClassName('imgUl')[0];
	var imgArr = imgUl.getElementsByTagName('img');
	var list = document.getElementsByClassName('list')[0];
	var liArr = list.getElementsByTagName('li');
	var imgWidth = imgArr[0].offsetWidth;
	//克隆第一张图片放在最后
	var lastImg = imgUl.children[0].cloneNode(true);
	imgUl.appendChild(lastImg);
	// console.log(imgUl);
	liArr[0].className = "current";
		
	
	for(var i=0;i<liArr.length;i++){
		liArr[i].index = i;
		liArr[i].onclick = function(){
			var imgWidth = imgArr[0].offsetWidth;
			//排他思想，去掉其他小圆点背景
			for(var j=0;j<liArr.length;j++){
				liArr[j].className = "";
			}
			// console.log(imgUl.style.left);
			this.className = "current";
			// imgUl.style.left = imgUl.offsetLeft - this.index*730 + "px";
			//鼠标放到小方块上的时候,索引值和key和square同步
			key = square = this.index;
			animate(imgUl,-this.index*imgWidth);
		}
	}
	
	//两个定时器，一个记录小方块，一个记录图片。
	var key = 0;
	var square = 0;
	function autoPlay(){
		// 获取第一张图片的宽度
	var imgWidth = imgArr[0].offsetWidth;
		key++;
		if(key>liArr.length){
			//图片滑到最后一张，跳到第一张
			imgUl.style.left = 0;
			key = 1;
		}
		// console.log(key);
		animate(imgUl,-key*imgWidth);
		//通过square的自增来模拟序列号的索引，然后更换背景
		square++;
		if(square>liArr.length-1){
			//索引等于最后一个的时候立刻变为0
			square = 0;
		}
		for(var i = 0;i <liArr.length; i++){
			liArr[i].className = "";
		}
		liArr[square].className = "current";
	}

	//添加定时器
	var timer = setInterval(autoPlay,4000);
			
	function animate(obj,target){
		clearInterval(obj.timer);
		var speed;
		obj.timer = setInterval(function(){
			 speed = (target - obj.offsetLeft)/10;
			 speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			 obj.style.left = obj.offsetLeft + speed + "px";
			 if(Math.abs(target - obj.offsetLeft)<Math.abs(speed)){
			 	obj.style.left = target + "px";
			 	clearInterval(obj.timer);
			 }	
		},15);
	}


//移动盒子
	var site = document.getElementsByClassName('site')[0];
	var hotsite = document.getElementsByClassName('hotsite')[0];
  	var moveImg = document.getElementsByClassName('moveImg')[0];
  	var moveImg2 = document.getElementsByClassName('moveImg2')[0];
  	var designer = document.getElementsByClassName('designer')[0];
  	var designer_name = document.getElementsByClassName('designer_name')[0];
  	var arrange = document.getElementsByClassName('arrange')[0];
  	var arrangeImg = document.getElementsByClassName('arrangeImg')[0];
  	moveFlash(site,moveImg);
  	moveFlash(hotsite,moveImg2);
  	moveFlash(designer,designer_name);
  	moveFlash(arrange,arrangeImg);
  	console.log(site);
  function moveFlash(site,moveImg){
	  moveImg.addEventListener('touchstart',function (event){
	    var e = event || window.event;
	    //鼠标放下时距离浏览器左侧的距离
	    var x = e.touches[0].pageX;      //
	    //获取现在盒子距离盒子左侧的距离
	    var nowX = moveImg.offsetLeft;    //0
	    var moveLength = site.offsetWidth - moveImg.offsetWidth;
	    
	    moveImg.addEventListener('touchmove',function (event){
	      var e2 = event || window.event;
	      // 鼠标移动时鼠标距离左侧的距离
	      var xx = e2.touches[0].pageX;

	      //鼠标的移动距离,鼠标移动的距离 - 点击时的距离
	      var moveX = xx - x;     

	      //最终距离 = 原来的距离 + 移动的距离
	      var endX = nowX + moveX;
	      //如果盒子现在的距离大于0的时候，盒子的距离设置为0；
	      // console.log(moveImg.offsetLeft);
	      if(moveImg.offsetLeft > 0){      
	        endX = 0;
	        // moveImg.onmousemove = null;
	        e2.preventDefault();
	        // moveImg.removeEventListener('touchmove',this);
	        // moveImg.removeEventListener('touchstart',this);
	      }else if(moveImg.offsetLeft < moveLength){
	        endX = moveLength;
	        // moveImg.onmousemove = null;
	        e2.preventDefault();
	        // moveImg.removeEventListener('touchstart',this);
	      }else{
	        endX = nowX + moveX;
	      }
	      //盒子距离父盒子距离 = 原来的距离 + 移动的距离
	      moveImg.style.left = endX + 'px';
			moveImg.addEventListener('touchend',function(event){
				if(moveImg.offsetLeft > 0){      
		        	moveImg.style.left = 0 + 'px';
		      	}else if(moveImg.offsetLeft < moveLength){
		       	 	moveImg.style.left = moveLength + 'px';
		      	}
	    	})

	    }); 
	});   		
  }

  
// 切换城市
var cityName = document.querySelector('.headTitle .pageContainer > a');
// cityName.innerHTML = "北京" + "<i></i>";
var h2cityName = document.querySelector('.headTitle .pageContainer .introduction h2');
// h2cityName.innerHTML = "北京";
// var h3cityName = document.querySelector('.headTitle .pageContainer .introduction .cityRow h3');
// console.log(h3cityName.innerText);
var cityDivs = document.querySelectorAll('.headTitle .pageContainer .introduction .cityRow div');
for(var i = 0; i < cityDivs.length; i++){
	cityDivs[i].onclick = function(){
		var h3cityName = this.getElementsByTagName('h3')[0];
		// console.log(h3cityName.innerText);
		cityName.innerHTML = h3cityName.innerText + "<i></i>";
		h2cityName.innerHTML = h3cityName.innerText;
	}
}
// event.preventDefault();
}












