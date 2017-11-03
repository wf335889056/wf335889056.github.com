(function (window) {
    'use strict'
    $(function () {
        $('#fullDiv').slideDown(3000);
        // $('#city').mouseenter(function () {
        //     $('.weather').slideDown(500)
        // }).mouseleave(function () {
        //     $('.weather').fadeOut(500);
        // })
    });
    $(window).on('resize', function () {
        var winWidth;
        if (window.innerWidth) {
            winWidth = window.innerWidth;
        } else if ((document.body) && (document.body.clientWidth)) {
            winWidth = document.body.clientWidth;
        }
        document.onclick = function (event) {
            var e = event ? event : window.event;
            // console.log(e.screenY);
        }
        //backgroundIamge
        var imgArr = $('[data-img]');
        imgArr.each(function (index, item) {
            var imgUrl = item.dataset.img;
            item.style.backgroundImage = 'url(' + imgUrl + ')';
        })

        var screenWidth = $(window).width();
        if (screenWidth < 768) {
            $('#home .map').css('marginLeft', '-80px')
        }
        ;

    }).trigger('resize');

//music play
    var musicBtn = $('#musicBtn')[0];
    var music = $('#music')[0];
    musicBtn.onclick = function () {
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
    }

//aboutMe
    var $btn = $('.meTitle ul li span');
    $btn.click(function () {

        if ($('.meContent').css('width') == '200px') {
            $('.me').animate({width: '50px'});
            // console.log($('.meContent').width);
            $('.meContent').animate({width: '0px'});
        } else {
            $('.me').animate({width: '250px'});
            $('.meContent').animate({width: '200px'});
        }
        $('.meContent').toggle('1000');
        $('.meTitle ul li span').parent('li').siblings().slideToggle();
    })
    var meUl = $('.meTitle ul')[0];
    var meDiv = $('.meContent')[0];
    var meArr = meDiv.getElementsByTagName('div');
    var meList = meUl.getElementsByTagName('li');
    for (var i = 0; i < meList.length; i++) {
        meList[i].index = i;
        meList[i].onclick = function () {
            // console.log(123);
            for (var j = 0; j < meArr.length; j++) {
                meArr[j].className = '';
            }
            // console.log(this.index);
            meArr[this.index].className = 'active';
        }
    }
    ;

//homeList
    var homeBg = $('.fullBg')[0];
    var homeList = homeBg.getElementsByTagName('li');
// console.log(homeList);
    var prevH = $('#prevH')[0];
    var indexH = 0;
    prevH.onclick = function () {
        for (var i = 0; i < homeList.length; i++) {
            homeList[i].className = '';
        }
        indexH--;
        if (indexH < 0) {
            indexH = 3;
        }
        homeList[indexH].className = 'active';
    };
    var nextH = $('#nextH')[0];
    nextH.onclick = function () {
        for (var i = 0; i < homeList.length; i++) {
            homeList[i].className = '';
        }
        indexH++;
        if (indexH > 3) {
            indexH = 0;
        }
        // console.log(indexH);
        homeList[indexH].className = 'active';
    }
    var cruuH = $('#currH')[0];
    cruuH.onclick = function () {
        for (var i = 0; i < homeList.length; i++) {
            homeList[i].className = '';
        }
        indexH = 0;
        homeList[0].className = 'active';
    }

    var navList = $('.nav')[0].getElementsByTagName('li');
    navList[1].onclick = function () {
        for (var i = 0; i < homeList.length; i++) {
            homeList[i].children[0].style.display = 'none';
        }
    }
    navList[0].onclick = function () {
        for (var i = 0; i < homeList.length; i++) {
            homeList[i].children[0].style.display = 'block';
        }
    }

    var fullS = $('#fullS')[0];
    fullS.addEventListener('click', function () {
        var docElm = document.documentElement;
        fullScreen(docElm);
        $('#fullH').toggleClass('active');
    })

    function fullScreen(element) {
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

        if (requestMethod) {
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

//     var docElm = document.documentElement;
// //W3C
//     if (docElm.requestFullscreen) {
//         docElm.requestFullscreen();
//         console.log(docElm.requestFullscreen());
//     }
//
// //FireFox
//     else if (docElm.mozRequestFullScreen) {
//         docElm.mozRequestFullScreen();
//     }
// //Chrome等
//     else if (docElm.webkitRequestFullScreen) {
//         docElm.webkitRequestFullScreen();
//     }
// //IE11
//     else if (elem.msRequestFullscreen) {
//         elem.msRequestFullscreen();
//     }

//     document.addEventListener("fullscreenchange", function () {
//         fullscreenState.innerHTML = (document.fullscreen) ? "" : "not ";
//     }, false);
//
//     document.addEventListener("mozfullscreenchange", function () {
//         fullscreenState.innerHTML = (document.mozFullScreen) ? "" : "not ";
//     }, false);
//
//     document.addEventListener("webkitfullscreenchange", function () {
//         fullscreenState.innerHTML = (document.webkitIsFullScreen) ? "" : "not ";
//     }, false);
//     document.addEventListener("msfullscreenchange", function () {
//         fullscreenState.innerHTML = (document.msFullscreenElement) ? "" : "not ";
//     }, false);
    }

//canI
    var canLi = $('.canContent ul li');
    var canDiv = $('.canList div');
    canLi.each(function (index) {
        $(this).on('click', function (event) {
            $(canDiv[index]).slideDown('slow');
            var e = event ? event : window.event;
            //判断浏览器所支持的阻止冒泡的方式
            if (event.stopPropagation) {
                //w3c定义 api标准
                event.stopPropagation()
            } else {
                //旧的IE浏览器版本
                event.cancelBubble = true;
            }
        })
        $(canDiv[index]).on('click', function (event) {
            var e = event ? event : window.event;
            //判断浏览器所支持的阻止冒泡的方式
            if (event.stopPropagation) {
                //w3c定义 api标准
                event.stopPropagation()
            } else {
                //旧的IE浏览器版本
                event.cancelBubble = true;
            }
        })
        $(document).on('click', function () {
            $(canDiv[index]).fadeOut('slow');
        })
    })

})(window)



