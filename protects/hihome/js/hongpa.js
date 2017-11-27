$(function(){
	// 左边table  中间
	//左边
	var table = $('.hongpaPage .areaTab');
	var ulArr = $('.hongpaPage .areaTab .rightTab ul');
	var ulliArr = $('.hongpaPage .areaTab .rightTab ul li');
	var liArr = $('.hongpaPage .areaTab .leftTab li');
	//中间
	var aArr = $('.areaList > a');
	var payTab = $('.hongpaPage .payTab');
	//右边

	$('.toBot').css({'transform':'translateY(-600px)'});
	$('.mask').css('display','none');
	var zIndex = 12;
	aArr.click(function(){
		// console.log($(this).index());
		// console.log($(this).css('color') == 'rgb(255, 153, 20)');
		// 如果是橙色，颜色变为
		var bool = true;
		if($(this).css('color') == 'rgb(255, 153, 20)'){
			$(this).find('span').removeClass('turnTop');
			$(this).css({'color':'#282828'}).siblings().css({'color':'#282828'});
			$('.toBot').eq($(this).index()).css({'transform':'translateY(-600px)','transition' : 'all 1s'});
		}else{
			// 如果不是橙色，颜色变为橙色，下滑，其他的上滑
			bool = false;
			$(this).find('span').addClass('turnTop');
			$(this).siblings().find('span').removeClass('turnTop');
			$(this).css({'color':'#ff9914'}).siblings().css({'color':'#282828'});
			$('.toBot').css({'transform':'translateY(-600px)','transition' : 'all 1s'});
			$('.toBot').eq($(this).index()).css({'transform':'translateY(0px)','transition' : 'all 1s'});
		}
		if(bool){
			$('.mask').css('display','none');
		}else{
			$('.mask').css('display','block');
		}
				
		// $('.toBot').eq($(this).index()).css({'transform':'translateY(-600px)','transition' : 'all 1s'});	
	});

	// var aTab = $('.hongpaPage .areaTab ul li a');
	// ulArr.hide();
	// ulArr.eq(0).show();
	// liArr.eq(0).css('backgroundColor','#f1f1f1');
	liArr.click(function(){
		// console.log($(this).index());
		if($(this).index() == '0'){
			table.css({'transform':'translateY(-600px)','transition' : 'all 1s'});
		}
		$(this).siblings().css('backgroundColor','#fff').find('a').css('color','#282828');
		$(this).css('backgroundColor','#f1f1f1').find('a').css('color','#ff9914');
		ulArr.siblings('ul').hide().eq($(this).index()).show();
	});
	ulliArr.click(function(){
		console.log(liArr);
		$(this).siblings().css('backgroundColor','#fff').find('a').css('color','#282828');
		$(this).css('backgroundColor','#f1f1f1').find('a').css('color','#ff9914');
		aArr.css('color','#282828').find('span').removeClass('turnTop');
		$('.mask').css('display','none');
		table.css({'transform':'translateY(-600px)','transition' : 'all 1s'});
	});


	// 中间
	var aMid = $('.payTab .payTop a');
	// payTab.find('.payTop').find('a').click(function(){
	// 	$(this).parent('.payTop').css('backgroundColor','#ff9914');
	// })
	aMid.click(function(){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	})







});

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




}









