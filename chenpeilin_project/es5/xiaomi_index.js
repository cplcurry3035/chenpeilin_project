'use strict';

jQuery(function ($) {
    //1. 购物车下来菜单，显示或者隐藏
    // console.log($('#shopping_cart i'));
    $('#shopping_cart').mouseover(function () {

        // $('#shopping_cart').css('background','');
        // $('#shopping_cart i').css("background","url('../img/xiaomi_sprite_sheet.png') no-repeat -60px -50px");
        $('#shopping_cart').css('background-color', '#FF6700');
        $('#shopping_cart span').css('color', '#fff');

        $('.shopping_cart').stop().slideDown(180);
    });
    $('#shopping_cart').mouseout(function () {
        // $('#shopping_cart').css('background','');
        // $('#shopping_cart i').css('background','url("../img/xiaomi_sprite_sheet.png") no-repeat -30px -50px');
        $('#shopping_cart').css('background-color', '');
        $('#shopping_cart span').css('color', '');
        $('.shopping_cart').stop().slideUp(180);
    });

    //2.编辑搜索框高亮

    $('.search_box').on('focus', function () {
        $('.search_box').css('border-color', '#FF6700');
        $('.search_engine span').css('border-color', '#FF6700');
    });
    $('.search_box').on('blur', function () {
        $('.search_box').css('border-color', '#000');
        $('.search_engine span').css('border-color', '#000');
    });

    //3. 下拉菜单,委托直接写子元素标签名即可
    var lis = document.getElementsByClassName('nav_list')[0].getElementsByTagName('li');
    // console.log(lis);

    // $('#nav').on('mouseover',lis,function(){
    //         console.log(123456);
    //         console.log($(this));
    //         $('.products_box').stop().slideDown(180);
    //         $(this).children('a').css('color','#FF6700');

    // });
    // $('#nav').on('mouseout',function(){
    //     $('.nav_list li').children('a').css('color','');
    //     $('.products_box').stop().slideUp(180);    
    // });

    // $('#nav').on('mouseenter',function(){
    //         // 
    //         // console.log($(this));
    //         // $('.products_box').stop().slideDown(180);
    //         // console.log($(this));
    //         $('.products_box').css('display','block')
    //         $(this).children('a').css('color','#FF6700');

    // });
    // $('#nav').on('mouseleave',function(){
    //     // $('.nav_list li').children('a').css('color','');
    //     // console.log($(this));

    //     // $('.products_box').mouseenter(function(){
    //     //     $('.products_box').css('display','block');
    //     // });

    //          $('.products_box').stop().slideUp(180); 


    //     // $('.products_box').stop().slideUp(180);    
    // });
    var nav = document.getElementById('nav');
    var products_box = document.getElementsByClassName('products_box')[0];
    var nav_list = document.getElementsByClassName('nav_list')[0];

    for (var i = 0; i < nav_list.children.length; i++) {
        nav_list.children[i].idx1 = i;
        nav_list.children[i].children[0].idx2 = i;
    };
    // for(var m=0;m<products_box.children[0].children.length;m++){

    //     products_box.children[0].children[m].idx3=m;
    // };
    /*****************************极其重要**************************************/
    var currentidx;
    var isok = false;
    nav.onmouseover = function (e) {

        if (e.target.className == 'zidxshow' || e.target.className == 'ashow') {

            // products_box.style.display='block';
            // products_box.style.transition='display 1s';

            if (e.target.className == 'zidxshow') {

                currentidx = e.target.idx1;
            } else if (e.target.className == 'ashow') {

                currentidx = e.target.idx2;
            };
            console.log(currentidx);

            //$('.products_box li').removeClass('zidx');
            $('.products_box li').removeAttr('id');
            $('.products_box').stop().slideDown(180);
            $('.products_box').children().children().eq(currentidx).attr('id', 'zidx');

            products_box.onmouseover = function () {
                $('.products_box').stop().slideDown(180);
                // $('.products_box li').removeClass('zidx');
                $('.products_box li').removeAttr('id');
                $('.products_box .parent_li').eq(currentidx).attr('id', 'zidx');
            };
        };
    };
    nav.onmouseout = function (e) {
        // console.log(e.target);
        if (e.target.className == 'zidxshow' || e.target.className == 'ashow') {
            // console.log(9999);
            // products_box.style.display='none';
            $('.products_box').stop().slideUp(180);
            products_box.onmouseout = function () {
                // products_box.style.display='none';
                $('.products_box').stop().slideUp(180);
            };
        };
    };
    /*****************************极其重要**************************************/
    // 
    // 
    // 
    // $('.nav_list').on('mouseover','li',function(){
    //     console.log($(this).index());
    //     $('.products_box').stop().slideDown(180);
    //     $('.products_box').children().children().eq($(this).index()).css('display','block');
    //     $('.products_box').children().mouseover(function() {
    //          $('.products_box').children().children().eq($(this).index()).css('display','block'); 
    //     });


    // });
    // $('.nav_list').on('mouseout','li',function(){
    //     console.log($(this).index());
    //      $('.products_box').stop().slideUp(180);
    //       $('.products_box').children().children().eq($(this).index()).css('display','none');

    // })


    //4. 轮播图
    var s1 = new Swiper('.swiper-container', {
        autoplay: { //自动轮播+延时两秒
            delay: 2000,
            disableOnInteraction: false
        },
        loop: true, //无缝回路轮播
        speed: 500, //切换速度
        navigation: { //上下按钮
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        effect: 'fade',
        pagination: { //焦点跟随
            el: '.swiper-pagination',
            clickable: true, //点击焦点跳到指定图片
            renderBullet: function renderBullet(index, className) {
                return '<span class="' + className + '"></span>'; //生成焦点数字
            }
        },
        mousewheel: false //滚动滑轮可以切图

    });

    var oBox = document.getElementById('swiper-container');
    oBox.onmouseover = function () {
        //鼠标经过停止
        s1.autoplay.stop();
    };
    oBox.onmouseout = function () {
        //鼠标经过离开
        s1.autoplay.start();
    };
    $('.swiper-button-prev').mouseover(function () {
        $('.swiper-button-prev').css('background-color', '#0E0013');
    });
    $('.swiper-button-prev').mouseout(function () {
        $('.swiper-button-prev').css('background-color', '');
    });
    $('.swiper-button-next').mouseover(function () {
        $('.swiper-button-next').css('background-color', '#0E0013');
    });
    $('.swiper-button-next').mouseout(function () {
        $('.swiper-button-next').css('background-color', '');
    });

    // 5.类别选项卡
    $('#xiaomi_inventory').on('mouseover', 'li', function () {
        //console.log($(this));
        $('.xiaomi_inventory').css('display', 'none');
        //$(this).parent('li').children('.xiaomi_inventory').css('display','block');
        $(this).children('.xiaomi_inventory').css('display', 'block');
    });
    $('#xiaomi_inventory').on('mouseout', 'li', function () {
        //console.log('移出',$(this));

        $('.xiaomi_inventory').css('display', 'none');
        //console.log('移出')
    });

    // // 6.特效-上移动+阴影
    // // console.log(123,$('.special_effects'));
    //    //初始值
    //    let init_top1=$('.init_top1').css('top').slice(0,-2);
    //    let init_top2=$('.init_top2').css('top').slice(0,-2);
    //    // console.log(init_top1,init_top2)

    //    // let init_special2=$('.special_effects2').css('top').slice(0,-2);


    //     $('.special_effects').mouseenter('on',function(){
    //         //console.log($('.special_effects'));
    //         $('.special_effects').css('box-shadow','');
    //         $(this).css('box-shadow','-5px 20px 25px -5px #DBDBEA,2px -1px 5px -2px #DBDBEA,5px 20px 25px -5px #DBDBEA,-2px -1px 5px -2px #DBDBEA');
    //         $(this).stop().animate({'top':$(this).position().top-5},400);

    //         // $('.xiaomi_shade').eq($(this).index()) .stop().animate({'bottom':0},400);  
    //         // 遮罩不能这么写，因为这样选项卡的时候出现问题
    //         $(this).children('.xiaomi_shade').stop().animate({'bottom':0},400);  

    //     });

    //     $('.special_effects').mouseleave('on',function(){
    //         $(this).css('box-shadow','');

    //         if($(this).index()>=4){
    //             $(this).stop().animate({'top':init_top2},400);
    //         }
    //         else if($(this).index()<4){
    //             $(this).stop().animate({'top':init_top1},400);
    //         };
    //         // $('.xiaomi_shade').eq($(this).index()).stop().animate({'bottom':-100},400);
    //         $(this).children('.xiaomi_shade').stop().animate({'bottom':-100},400);  

    //     });
    // // 特殊拿出来
    // let init_special00=$('.special_effects00').css('top').slice(0,-2);
    // let init_special01=$('.special_effects01').css('top').slice(0,-2);
    // let init_special02=$('.special_effects02').css('top').slice(0,-2);
    // //console.log(init_special01);
    // $('.last_ul_li').on('mouseenter',function(){
    //     $('.last_ul_li').css('box-shadow','');
    //     $(this).css('box-shadow','-5px 20px 25px -5px #DBDBEA,2px -1px 5px -2px #DBDBEA,5px 20px 25px -5px #DBDBEA,-2px -1px 5px -2px #DBDBEA');
    //     console.log(666,$(this).position().top);
    //     $(this).stop().animate({'top':$(this).position().top-5},400);
    //     console.log($(this).index());
    // });
    // $('.last_ul_li').on('mouseleave',function(){
    //     $(this).css('box-shadow','');
    //     if($(this).index()==0){
    //             $(this).stop().animate({'top':init_special00},400);
    //         }
    //         else if($(this).index()==1){
    //             $('.special_effects02').stop().animate({'top':init_special02},400);
    //             $('.special_effects01').stop().animate({'top':init_special01},400);
    //         }
    // })


    //6. 选项卡
    // $('.header_right').children('span').eq(0).attr('class','active');
    $('.header_right').on('mouseover', 'span', function () {
        console.log($(this), $(this).index());
        $('.header_right').children('span').removeClass('active');
        $(this).attr('class', 'active');

        // 多个重复使用相同js  不能直接获取当前元素，而是找父元素！！！
        // $('.ulblock').css('display','none');
        // $('.ulblock').eq($(this).index()).css('display','block');

        // console.log($(this).parent().parent().parent().parent().find('.ulblock'));

        $(this).parent().parent().parent().parent().find('.ulblock').css('display', 'none');
        $(this).parent().parent().parent().parent().find('.ulblock').eq($(this).index()).css('display', 'block');
    });
    // $('.header_right').on('mouseout','span',function(){
    //    // console.log($(this))
    //     $(this).removeClass('active');

    // });


    // 小轮播图
    //初始
    var lunbo = document.getElementById('lunbo');
    var lunLeft = document.getElementById('lunLeft');
    var lunRight = document.getElementById('lunRight');
    var lunbtn = document.getElementById('lunbtn');
    var lunspans = lunbtn.getElementsByTagName('span');
    var luntupian = document.getElementById('luntupian');
    var lunLis = luntupian.getElementsByTagName('li');

    lunLeft.style.display = "none";
    lunRight.style.display = "none";
    rollImage(lunLis, lunbo, lunLeft, lunRight, lunspans, lunbtn);

    // 1
    var lunbo0 = document.getElementById('lunbo0');
    var lunLeft0 = document.getElementById('lunLeft0');
    var lunRight0 = document.getElementById('lunRight0');
    var lunbtn0 = document.getElementById('lunbtn0');
    var lunspans0 = lunbtn0.getElementsByTagName('span');
    var luntupian0 = document.getElementById('luntupian0');
    var lunLis0 = luntupian0.getElementsByTagName('li');

    lunLeft0.style.display = "none";
    lunRight0.style.display = "none";
    rollImage(lunLis0, lunbo0, lunLeft0, lunRight0, lunspans0, lunbtn0);
    // 2
    var lunbo1 = document.getElementById('lunbo1');
    var lunLeft1 = document.getElementById('lunLeft1');
    var lunRight1 = document.getElementById('lunRight1');
    var lunbtn1 = document.getElementById('lunbtn1');
    var lunspans1 = lunbtn1.getElementsByTagName('span');
    var luntupian1 = document.getElementById('luntupian1');
    var lunLis1 = luntupian1.getElementsByTagName('li');

    lunLeft1.style.display = "none";
    lunRight1.style.display = "none";
    rollImage(lunLis1, lunbo1, lunLeft1, lunRight1, lunspans1, lunbtn1);
    // 3
    var lunbo2 = document.getElementById('lunbo2');
    var lunLeft2 = document.getElementById('lunLeft2');
    var lunRight2 = document.getElementById('lunRight2');
    var lunbtn2 = document.getElementById('lunbtn2');
    var lunspans2 = lunbtn2.getElementsByTagName('span');
    var luntupian2 = document.getElementById('luntupian2');
    var lunLis2 = luntupian2.getElementsByTagName('li');

    lunLeft2.style.display = "none";
    lunRight2.style.display = "none";
    rollImage(lunLis2, lunbo2, lunLeft2, lunRight2, lunspans2, lunbtn2);

    // 为您推荐(轮播图)
    /*
            原理：每次运动4个图距离，运动出去的图片，剪切拼接到末尾
            
            1、ul的宽度：图片的宽度*图片个数
            2、开定时器，每次运动4个图距离，往左边运动：-4*iW
            3、出去的图片剪切拼接到后面
            4、上下按钮可以点击切换
            
         */

    //1、ul的宽度：图片的宽度*图片个数
    var wNum = $('#moveimg li').length * $('#moveimg li').eq(0).outerWidth();
    $('#moveimg').css('width', wNum);
    var iW = $('#moveimg li').eq(0).outerWidth() * 5; //运动距离

    //2、开定时器，每次运动4个图距离，往左边运动：-4*iW
    // var timer=null;
    // clearInterval(timer);
    // timer=setInterval(next,5000);//间隔时间

    function next() {
        //动画时间间隔：5000-2000
        $('#moveimg').stop().animate({ 'left': -iW }, 500, function () {
            //出去的图片，剪切放到末尾
            $('#moveimg li:lt(5)').insertAfter($('#moveimg li:last'));
            //ul归位
            $('#moveimg').css('left', 0);
        });
    }

    function prev() {
        //先剪切最后的四个图插入到ul首位
        //      $('#moveimg li:gt(4)').insertBefore($('#moveimg li:first'));
        for (var i = 0; i < 5; i++) {
            $('#moveimg li:last').insertBefore($('#moveimg li:first'));
        }
        //预留4个图位置
        $('#moveimg').css('left', -iW);
        //挪到可视区
        $('#moveimg').stop().animate({ 'left': 0 }, 500);
    }

    //3、上下按钮可以点击切换
    $('#box').hover(function () {
        // clearInterval(timer);
    }, function () {
        //clearInterval(timer);
        // timer=setInterval(next,2000);//间隔2秒切一个图
    });

    //点击切换下一页：四张图
    $('#lunbonext').css('background', '#fff');
    $('#lunboprev').css('background', '#fff');
    var clicktimes = 0;
    $('#lunbonext').click(function () {
        $('#lunboprev').css('background', '#fff');
        clicktimes++;

        if (clicktimes < 4) {
            next();
            if (clicktimes == 3) {
                $('#lunbonext').css('background', '#ccc');
                $('#lunboprev').css('background', '#fff');
            } else {
                $('#lunbonext').css('background', '#fff');
                $('#lunboprev').css('background', '#fff');
            }
        }
        if (clicktimes >= 4) {
            clicktimes = 3;
            $('#lunbonext').css('background', '#ccc');
        };
        console.log('向右', clicktimes);
    });

    $('#lunboprev').click(function () {
        $('#lunbonext').css('background', '#fff');
        clicktimes--;

        if (clicktimes >= 0) {
            prev();
            if (clicktimes == 0) {
                $('#lunboprev').css('background', '#ccc');
                $('#lunbonext').css('background', '#fff');
            } else {
                $('#lunboprev').css('background', '#fff');
            }
        }
        if (clicktimes < 0) {
            clicktimes = 0;
            $('#lunboprev').css('background', '#ccc');
        };
        console.log('向左', clicktimes);
    });

    // 小轮播图(4张)
    function getOffset(Node, offset) {
        if (!offset) {
            offset = {};
            offset.top = 0;
            offset.left = 0;
        }

        if (Node == document.body) {
            //当该节点为body节点时，结束递归
            return offset;
        }

        offset.top += Node.offsetTop;
        offset.left += Node.offsetLeft;

        return getOffset(Node.parentNode, offset); //向上累加offset里的值
    }

    var TOP = $('#moveimg li').offset().top;
    //console.log(TOP-20);


    // 小米闪购·
    // var wNum=$('#moveimg li').length*$('#moveimg li').eq(0).outerWidth();
    $('#moveimg1').css('width', wNum);
    var iW1 = $('#moveimg1 li').eq(0).outerWidth() * 5; //运动距离

    //2、开定时器，每次运动4个图距离，往左边运动：-4*iW
    // var timer=null;
    // clearInterval(timer);
    // timer=setInterval(next,5000);//间隔时间

    function next1() {
        //动画时间间隔：5000-2000
        $('#moveimg1').stop().animate({ 'left': -iW }, 500, function () {
            //出去的图片，剪切放到末尾
            $('#moveimg1 li:lt(4)').insertAfter($('#moveimg1 li:last'));
            //ul归位
            $('#moveimg1').css('left', 0);
        });
    }

    function prev1() {
        //先剪切最后的四个图插入到ul首位
        //      $('#moveimg li:gt(4)').insertBefore($('#moveimg li:first'));
        for (var i = 0; i < 4; i++) {
            $('#moveimg1 li:last').insertBefore($('#moveimg1 li:first'));
        }
        //预留4个图位置
        $('#moveimg1').css('left', -iW);
        //挪到可视区
        $('#moveimg1').stop().animate({ 'left': 0 }, 500);
    }
    $('#lunbonext1').css('background', '#fff');
    $('#lunboprev1').css('background', '#fff');
    var clicktimes1 = 0;
    $('#lunbonext1').click(function () {
        $('#lunboprev1').css('background', '#fff');
        clicktimes1++;

        if (clicktimes1 < 4) {
            next1();
            if (clicktimes1 == 3) {
                $('#lunbonext1').css('background', '#ccc');
                $('#lunboprev1').css('background', '#fff');
            } else {
                $('#lunbonext1').css('background', '#fff');
                $('#lunboprev1').css('background', '#fff');
            }
        }
        if (clicktimes1 >= 4) {
            clicktimes1 = 3;
            $('#lunbonext1').css('background', '#ccc');
        };
    });

    $('#lunboprev1').click(function () {
        $('#lunbonext1').css('background', '#fff');
        clicktimes1--;

        if (clicktimes1 >= 0) {
            prev1();
            if (clicktimes1 == 0) {
                $('#lunboprev1').css('background', '#ccc');
                $('#lunbonext1').css('background', '#fff');
            } else {
                $('#lunboprev1').css('background', '#fff');
            }
        }
        if (clicktimes1 < 0) {
            clicktimes1 = 0;
            $('#lunboprev1').css('background', '#ccc');
        };
    });

    // 点击top回到顶端
    var return_top = document.getElementById('return_top');
    // backTop(return_top);


    // 吸顶菜单
    var suction_top_menu = document.getElementById('suction_top_menu');

    // suckMenu(suction_top_menu);
    suck_top(suction_top_menu, return_top);

    // 跳转登录页面
    $('#unamestatus').click(function () {
        location.href = 'html/xiaomi_login.html';
    });

    // cookie
    var str_uid = decodeURI(Cookie.getCookie('uid'));
    var str_username = decodeURI(Cookie.getCookie('username'));
    if (str_uid != 'undefined') {
        $('#unamestatus').html(str_username);
        $('#unamestatus').css('href', 'javascript:;');
        $('.statusone').html('消息通知');
        $('.statustwo').html('我的订单');
        $('#astatus').mouseover(function () {

            $('#astatus ul').css('display', 'block');
            $('#astatus i').css('display', 'block');
            $('#astatus i').css('display', 'block');
            $('#astatus').css({ 'background': '#fff' });
            $('#astatus span').css({ 'color': '#FF6700', 'border-color': '#fff' });
        });
        $('#astatus').mouseout(function () {
            $('#astatus ul').css('display', 'none');
            $('#astatus i').css('display', 'none');
            $('#astatus').css('background', '');
            $('#astatus span').css({ 'color': '', 'border-color': '' });
        });
    }

    // 退出登录

    console.log(str_uid);
    $('#login_out').click(function () {
        console.log('清除cookie');
        Cookie.removeCookie('uid');
        //cookie.remove('uid');
        // location.href='index.html';
        // $.ajax({
        //     url:'../api/xiaomi_login&register.php',
        //     type:'POST',
        //     data:{
        //         a:'logout_removecookie'

        //     },
        //     async:true,
        //     success:function(str){
        //         $res=$.parseJSON(str);
        //         console.log(123,$res);
        //     },
        //     error:function(err){
        //         console.log(err);

        //     }


        // });

        location.reload();
        if (str_uid == 'undefined') {
            $('#unamestatus').html('登录');
            $('.statusone').html('注册');
            $('.statustwo').html('消息通知');
            $('#astatus ul').css('display', 'none');
            $('#astatus i').css('display', 'none');
        }
    });

    $('#listrender').click(function () {
        location.href = 'html/xiaomi_goodslist.html';
        // ?20190211

    });
});