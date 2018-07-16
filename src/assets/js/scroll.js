export function scroll(length) {
    var scrollTimer;
    var width;
    var timer, resetTimer;
    var isMoving = false;
    var countReset = 0;
 /*   var length=parseInt($("#lunboCount").val());*/
    var scrollIndex = length;
    var imgScroll = function () {
        clearInterval(scrollTimer);
        scrollTimer = setInterval(function () {
            if (scrollIndex > length) {
                return;
            }
            if (isMoving) {
                return;
            }
            scrollIndex += 1;
            setRadio();
            countReset = 0;
            $(".imgUl").css({
                "transition": "all ease 1s",
                "-moz-transition": "all ease 1s",
                "-webkit-transition": "all ease 1s",
                "transform": "translate(" + (-scrollIndex * width) + "px,0px" + ")"
            });
            isMoving = true;
        }, 2500);
    }

    var init = function () {
       setRadio();
        width = $(".imgUl li:first")[0].offsetWidth;
        imgScroll();
        $(".imgUl").bind("transitionend", function () {
            width = $(".imgUl li:first")[0].offsetWidth;
            isMoving = false;
            if (!scrollTimer)
                imgScroll();
            if (scrollIndex >= length+1) {
                scrollIndex -= length;
                $(".imgUl").css({
                    "transition": "none",
                    "-moz-transition": "none",
                    "-webkit-transition": "none",
                    "transform": "translate(" + (-scrollIndex * width) + "px,0px" + ")"
                });
            } else if (scrollIndex == 0) {
                scrollIndex += length;
                $(".imgUl").css({
                    "transition": "none",
                    "-moz-transition": "none",
                    "-webkit-transition": "none",
                    "transform": "translate(" + (-scrollIndex * width) + "px,0px" + ")"
                });
            }
        })

        countResetFn();
        bind();
    };

    var bind = function () {
        var el = document.querySelector(".imgUl");

        var mc = new Hammer.Manager(el);

        mc.add(new Hammer.Pan({threshold: 0, pointers: 0}));

        mc.on("panright panleft", onPan);

    }

    var countResetFn = function () {
        resetTimer = setInterval(function () {
            countReset++;
            if (countReset > 4) {
                clearInterval(resetTimer);
                isMoving = false;
            }
        }, 1000)
    }

    function onPan(ev) {
        if (timer || isMoving) {
            /*丢键或者正在动画*/
            return;
        } else {
            clearInterval(timer);
            clearInterval(scrollTimer);
            scrollTimer = undefined;
            /*   console.log(ev)
             var currentMargin= parseInt($(".imgUl").css("margin-left"));
             $(".imgUl").css({"transition":"all ease 0.1s","-moz-transition":"all ease 0.1s","-webkit-transition":"all ease 0.1s","margin-left":(currentMargin+ev.deltaX)+"px"});
             */
            if (ev.type == "panright") {
                scrollIndex -= 1;
            } else {
                scrollIndex += 1;
            }
            setRadio();
            isMoving = true;
            countReset = 0;
            $(".imgUl").css({
                "transition": "all ease 1s",
                "-moz-transition": "all ease 1s",
                "-webkit-transition": "all ease 1s",
                "transform": "translate(" + (-scrollIndex * width) + "px,0px" + ")"
            });
            timer = setTimeout(function () {
                clearInterval(timer);
                timer = null;
            }, 100);
        }
    }

    var setRadio=function(){
        $(".white").each(
            function(index,node){
               if((scrollIndex+1)%length==(node.getAttribute("value"))%length){
                   node.style["background-color"]="#0193e6";
               }else{
                   node.style["background-color"]="white";
               }
            }
        )
    }

    $(".white").click(
        function(e){
            var target= e.target;
            console.log(target.getAttribute("value"))
            if (timer || isMoving) {
                /*丢键或者正在动画*/
                return;
            }
            scrollIndex=parseInt(target.getAttribute("value"))-1;
            if(scrollIndex==0)
                scrollIndex=length;
            setRadio();
            $(".imgUl").css({
                "transition": "none",
                "-moz-transition": "none",
                "-webkit-transition": "none",
                "transform": "translate(" + (-scrollIndex * width) + "px,0px" + ")"
            });
        }
    )

    return {
      init:init
    }
};
