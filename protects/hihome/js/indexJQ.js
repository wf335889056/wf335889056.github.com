$(function(){
	var changeCity = $('.headTitle .pageContainer > a')
	var itdCity = $('.headTitle .introduction')
	itdCity.hide();
	changeCity.on('click',function(){
		itdCity.slideToggle('slow');
		$(this).find('i').toggleClass('rotateAngle');
		console.log($(this).find('i'));
	});
});