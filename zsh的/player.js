
$(function(){

        $('.song').each(function() {
            $(this).click(function() {
                var songName = $(this).text();
                $('span#music_name').text(songName);
                $('#aaa').empty();
                $('#aaa').html('<audio src="./music/' + songName + '.mp3" id="music"></audio>');
                var music = document.getElementById("music");
                var btn = document.getElementById("play_pause_btn");
                var current_time = document.getElementById("music_time");
                var music_progress = document.getElementById("music_progress");
                var voice_progress = document.getElementById("voice");
                music.volume = 0.5;
                var timer;
                clearInterval(timer);
                btn.style.transform = "rotate(0deg)";
                timer = setInterval(function() {
                    showTime(music);
                }, 100);


                //计时
                var showTime = function(music) {
                    //返回音乐时长
                    var music = document.getElementById("music");

                    var music_time = music.duration;
                    var now_time = music.currentTime;
                    var minutes = parseInt(music_time / 60);
                    var seconds = parseInt(music_time - minutes * 60);
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    seconds = seconds < 10 ? '0' + seconds : seconds;

                    //返回播放时长
                    var seconds_now = parseInt(now_time % 60);
                    var minutes_now = parseInt(now_time / 60);
                    seconds_now = seconds_now < 10 ? '0' + seconds_now : seconds_now;
                    minutes_now = minutes_now < 10 ? '0' + minutes_now : minutes_now;

                    //显示到文本中
                    current_time.innerHTML = minutes_now + ":" + seconds_now + "/" + minutes + ":" + seconds;

                    //显示到音乐进度条中
                    var plan = parseFloat(now_time / music_time);
                    var value1 = parseInt(plan * 100); 
                    if(music.paused==false){
                         music_progress.value = value1;
                    }

                   

                    if (music.ended) {
                        console.log("end");
                        music.currentTime = 0;
                        btn.style.transform = "rotate(0deg)";
                        clearInterval(timer2);
                    }
                }
                // 按钮开关
                btn.onclick = function() {
                    
                    if (music.paused) {
                        music.play();
                        $("div.tusiji").fadeIn();
                        // timer2 = setInterval(function() {
                        //     if (deg == 360) { deg = 0; }
                        //     deg += 5;
                        //     // console.log(deg); 
                        //     btn.style.transform = "rotate(" + deg + "deg)"
                        // }, 100);
                    } else {
                        music.pause();
                        $("div.tusiji").fadeOut();
                        // clearInterval(timer2);
                        // btn.style.transform = "rotate(" + deg + "deg)"
                    }
                }

                //音量调节  :
                music_progress.onclick = function(event) {
                    var e = event ? event : window.event;
                    console.log(e.pageX);
                    var start = 100;
                    music.currentTime = (e.pageX - start) * music.duration / 400;
                }

                voice_progress.onclick = function(eevet) {
                    var e = event ? event : window.event;
                    var start = 600;
                    music.volume = (e.pageX - start) / 200;
                    this.value = music.volume * 100;
                    var voice_tb = document.getElementById("voice_tb");
                    voice_tb.innerHTML = "音量：" + this.value + "%";
                }
                //定时器  : 设置时间 / 结束停止计时 / 重新开始

            })
        })
        $($('.song')[0]).trigger('click');
        $('#musicplayer').click(function(event) {
        var event = event ? event : window.event;
        if (event.stopPropagation) {
            // w3c 标准
            event.stopPropagation();
            //IE 6 7 8浏览器
        } else {
            event.cancelBubble = true;
        }
    })
        })
