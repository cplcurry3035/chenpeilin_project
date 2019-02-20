'use strict';

$(function () {
    // 6.特效-上移动+阴影
    // console.log(123,$('.special_effects'));
    //初始值
    var init_top1 = $('.init_top1').css('top').slice(0, -2);
    var init_top2 = $('.init_top2').css('top').slice(0, -2);
    // console.log(init_top1,init_top2)

    // let init_special2=$('.special_effects2').css('top').slice(0,-2);


    $('.special_effects').mouseenter('on', function () {
        //console.log($('.special_effects'));
        $('.special_effects').css('box-shadow', '');
        $(this).css('box-shadow', '-5px 20px 25px -5px #DBDBEA,2px -1px 5px -2px #DBDBEA,5px 20px 25px -5px #DBDBEA,-2px -1px 5px -2px #DBDBEA');
        $(this).stop().animate({ 'top': $(this).position().top - 5 }, 400);

        // $('.xiaomi_shade').eq($(this).index()) .stop().animate({'bottom':0},400);  
        // 遮罩不能这么写，因为这样选项卡的时候出现问题
        $(this).children('.xiaomi_shade').stop().animate({ 'bottom': 0 }, 400);
    });

    $('.special_effects').mouseleave('on', function () {
        $(this).css('box-shadow', '');

        if ($(this).index() >= 4) {
            $(this).stop().animate({ 'top': init_top2 }, 400);
        } else if ($(this).index() < 4) {
            $(this).stop().animate({ 'top': init_top1 }, 400);
        };
        // $('.xiaomi_shade').eq($(this).index()).stop().animate({'bottom':-100},400);
        $(this).children('.xiaomi_shade').stop().animate({ 'bottom': -100 }, 400);
    });
    // 特殊拿出来
    var init_special00 = $('.special_effects00').css('top').slice(0, -2);
    var init_special01 = $('.special_effects01').css('top').slice(0, -2);
    var init_special02 = $('.special_effects02').css('top').slice(0, -2);
    //console.log(init_special01);
    $('.last_ul_li').on('mouseenter', function () {
        $('.last_ul_li').css('box-shadow', '');
        $(this).css('box-shadow', '-5px 20px 25px -5px #DBDBEA,2px -1px 5px -2px #DBDBEA,5px 20px 25px -5px #DBDBEA,-2px -1px 5px -2px #DBDBEA');
        console.log(666, $(this).position().top);
        $(this).stop().animate({ 'top': $(this).position().top - 5 }, 400);
        console.log($(this).index());
    });
    $('.last_ul_li').on('mouseleave', function () {
        $(this).css('box-shadow', '');
        if ($(this).index() == 0) {
            $(this).stop().animate({ 'top': init_special00 }, 400);
        } else if ($(this).index() == 1) {
            $('.special_effects02').stop().animate({ 'top': init_special02 }, 400);
            $('.special_effects01').stop().animate({ 'top': init_special01 }, 400);
        }
    });
});