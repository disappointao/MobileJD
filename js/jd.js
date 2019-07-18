$(function () {
    header();
    setTime();
    bannerEffect()
});
function header() {
    var banner= document.querySelector('.jd_banner');
    var bannerHeight=banner.offsetHeight;
    window.onscroll=function () {
        var scroll=document.documentElement.scrollTop;
        var ratio=scroll/bannerHeight;
        if(ratio>=1){
            ratio=1;
        }
        document.querySelector('.jd_header').style.background='rgba(236,49,44,'+ratio+")";
    }

}

/*倒计时效果*/
function timeBack(){
    /*1.获取用于展示时间的span*/
    var spans=document.querySelector(".jd_sk_time").querySelectorAll("span");
    /*2.设置初始的倒计时时间,以秒做为单位*/
    var totalTime=3700; //1*60*60   3700%3600=100 /60
    /*3.开启定时器*/
    var timerId=setInterval(function(){
        totalTime--;
        /*判断倒计时时间是否已经完成*/
        if(totalTime < 0){
            /*清除时钟*/
            clearInterval(timerId);
            return;
        }
        /*得到剩余时间中的  时  分  秒*/
        /*获取时*/
        var hour=Math.floor(totalTime/3600);

        /*获取分*/
        var minute=Math.floor(totalTime%3600/60);

        /*获取秒*/
        var second=Math.floor(totalTime%60);
        /*赋值，将时间填充到span中  12*/
        spans[0].innerHTML=Math.floor(hour/10);
        spans[1].innerHTML=Math.floor(hour%10);

        spans[3].innerHTML=Math.floor(minute/10);
        spans[4].innerHTML=Math.floor(minute%10);

        spans[6].innerHTML=Math.floor(second/10);
        spans[7].innerHTML=Math.floor(second%10);
    },1000);
}

/*轮播图*/
function  bannerEffect(){
    var banner=document.querySelector(".jd_banner");
    var imgBox=banner.querySelector("ul:first-of-type");
    var first=imgBox.querySelector("li:first-of-type");
    var last=imgBox.querySelector("li:last-of-type");
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
    var lis=imgBox.querySelectorAll("li");
    var count=lis.length;
    var bannerWidth=banner.offsetWidth;
    imgBox.style.width=count*bannerWidth+"px";
    for(var i=0;i<lis.length;i++){
        lis[i].style.width=bannerWidth+"px";
    }
    var index=1;

    imgBox.style.left=-bannerWidth+"px";

    window.onresize=function(){
        bannerWidth=banner.offsetWidth;
        imgBox.style.width=count*bannerWidth+"px";
        for(var i=0;i<lis.length;i++){
            lis[i].style.width=bannerWidth+"px";
        }
        imgBox.style.left=-index*bannerWidth+"px";
    }
    var setIndicator=function(index){
        var indicators=banner.querySelector("ol").querySelectorAll("li");
        for(var i=0;i<indicators.length;i++){
            indicators[i].classList.remove("active");
        }
        indicators[index-1].classList.add("active");
    }
    var timerId;
    var startTime=function(){
        timerId=setInterval(function(){
            index++;
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=(-index*bannerWidth)+"px";
            setTimeout(function(){
                if(index==count-1){
                    index=1;
                    imgBox.style.transition="none";
                    imgBox.style.left=(-index*bannerWidth)+"px";
                }
            },500);
        },2000);
    }
    startTime();

    var startX,moveX,distanceX;
    var isEnd=true;
    imgBox.addEventListener("touchstart",function(e){
        clearInterval(timerId);
        startX= e.targetTouches[0].clientX;
    });
    imgBox.addEventListener("touchmove",function(e){
        if(isEnd==true){
            moveX= e.targetTouches[0].clientX;
            distanceX=moveX-startX;
            imgBox.style.transition="none";
            imgBox.style.left=(-index*bannerWidth + distanceX)+"px";
        }
    });
    imgBox.addEventListener("touchend",function(e){
        isEnd=false;
        if(Math.abs(distanceX) > 100){
            if(distanceX > 0){
                index--;
            }
            else{
                index++;
            }
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(Math.abs(distanceX) > 0){
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        startX=0;
        moveX=0;
        distanceX=0;
    });
    imgBox.addEventListener("webkitTransitionEnd",function(){
        if(index==count-1){
            index=1;
            imgBox.style.transition="none";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(index==0){
            index=count-2;
            imgBox.style.transition="none";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        setIndicator(index);
        setTimeout(function(){
            isEnd=true;
            clearInterval(timerId);
            startTime();},100);
    });
}
function setTime(){
    var kill_time=document.querySelectorAll('.kill_time');
    var totalTime=kill_time[0].innerHTML*3600+kill_time[1].innerHTML*60+kill_time[2].innerHTML*1;
    setInterval(function () {
        totalTime--;
        if (totalTime<=0){
            totalTime=0;
        }
        var hour=Math.floor(totalTime/3600);
        var min=Math.floor(totalTime/60%60);
        if(min<10){
            min="0"+min;
        }else{
            min=min;
        }
        var s=Math.floor(totalTime%60);
        kill_time[0].innerHTML=String(Math.floor(10/10))+String(hour%10);
        kill_time[1].innerHTML=min;
        kill_time[2].innerHTML=s;
    },1000)
}