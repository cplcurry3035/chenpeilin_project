'use strict';

$(function () {
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

    var nav = document.getElementById('nav');
    var products_box = document.getElementsByClassName('products_box')[0];
    var nav_list = document.getElementsByClassName('nav_list')[0];

    for (var i = 0; i < nav_list.children.length; i++) {
        nav_list.children[i].idx1 = i;
        nav_list.children[i].children[0].idx2 = i;
    };

    var currentidx;
    var isok = false;
    nav.onmouseover = function (e) {

        if (e.target.className == 'zidxshow' || e.target.className == 'ashow') {

            if (e.target.className == 'zidxshow') {

                currentidx = e.target.idx1;
            } else if (e.target.className == 'ashow') {

                currentidx = e.target.idx2;
            };

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
    // 全部商品品列表下拉菜单
    $('#all_goods_list').mouseover(function () {

        $('#xiaomi_inventory').css('display', 'block');
    });
    $('#all_goods_list').mouseout(function () {
        $('#xiaomi_inventory').css('display', 'none');
    });

    // !!!!!!!!!!!
    /*****************************************************/
    // 数据渲染

    // 带着id到商品详情页-html/xiaomi_goodslist.html?20190211
    // $('#listrender').click(function(){
    //     location.href='html/xiaomi_goodslist.html?20190211';


    // });

    // var list = decodeURI(location.search);
    // list = list.slice(1);
    // console.log(list);


    $.ajax({
        url: '../api/xiaomi_goodslist.php',
        type: 'POST',
        data: {
            // a:list

        },
        async: true,
        success: function success(str) {

            $res = $.parseJSON(str);
            // console.log(123,$res);
            var totalhtml = '';
            // 明星产品
            var datahtml_star = '<h1>明星产品</h1><ul class="clearfix mr1">';
            datahtml_star += $res[0].map(function (item) {
                return '<li data-id=\'' + item.cid + '\'>\n                            <a href=\'javascript:;\'>\n                                <img src=\'' + item.hostimg + '\' alt="" />\n                                <div class=\'list_information clearfix\'>\n                                    <p>\n                                        <span>\n                                            ' + item.listname + '\n                                        </span> \n                                        <br />\n                                        <span>\n                                            ' + item.simple_describe + '\n                                        </span>\n                                    </p>\n                                    <p>\n                                        <span>\n                                            ' + item.original_price + '\u5143\u8D77\n                                        </span>\n                                        <span><del>\n                                            ' + item.present_price + '\u5143\u8D77\n                                        </del></span>\n                                    </p>\n                                </div>\n                            </a>\n                        </li>';
            }).join('');
            totalhtml = datahtml_star + '</ul>';
            $('#phone_list .container').html(totalhtml);
            // 小米产品
            var datahtml_xiaomi_phone = '<h1>小米手机</h1><ul class="clearfix mr2">';
            datahtml_xiaomi_phone += $res[1].map(function (item) {
                return '<li data-id=\'' + item.cid + '\'>\n                            <a href=\'javascript:;\'>\n                                <img src=\'' + item.hostimg + '\' alt="" />\n                                <div class=\'list_information clearfix\'>\n                                    <p>\n                                        <span>\n                                            ' + item.listname + '\n                                        </span> \n                                        <br />\n                                        <span>\n                                            ' + item.simple_describe + '\n                                        </span>\n                                    </p>\n                                    <p>\n                                        <span>\n                                            ' + item.original_price + '\u5143\u8D77\n                                        </span>\n                                        <span><del>\n                                            ' + item.present_price + '\u5143\u8D77\n                                        </del></span>\n                                    </p>\n                                </div>\n                            </a>\n                        </li>';
            }).join('');
            totalhtml += datahtml_xiaomi_phone + '</ul>';
            $('#phone_list .container').html(totalhtml);
            // 红米产品
            var datahtml_redmi_phone = '<h1>红米手机</h1><ul class="clearfix mr2">';
            datahtml_redmi_phone += $res[2].map(function (item) {
                return '<li data-id=\'' + item.cid + '\'>\n                            <a href=\'javascript:;\'>\n                                <img src=\'' + item.hostimg + '\' alt="" />\n                                <div class=\'list_information clearfix\'>\n                                    <p>\n                                        <span>\n                                            ' + item.listname + '\n                                        </span> \n                                        <br />\n                                        <span>\n                                            ' + item.simple_describe + '\n                                        </span>\n                                    </p>\n                                    <p>\n                                        <span>\n                                            ' + item.original_price + '\u5143\u8D77\n                                        </span>\n                                        <span><del>\n                                            ' + item.present_price + '\u5143\u8D77\n                                        </del></span>\n                                    </p>\n                                </div>\n                            </a>\n                        </li>';
            }).join('');
            totalhtml += datahtml_redmi_phone + '</ul>';
            $('#phone_list .container').html(totalhtml);
            // 第一个特殊li
            $first_li = $('#phone_list .container .clearfix li').eq(0);
            var first_li_str = '<a href="javascript:;">\n                        <img src="' + $res[0][0].hostimg + '" alt="" />\n                        <div class=\'firstli\'>\n                            <p>' + $res[0][0].listname + '</p>\n                            <p>' + $res[0][0].simple_describe + '</p>\n                            <p>\n                                <span>' + $res[0][0].original_price + '\u5143\u8D77</span>\n                                <span><del>' + $res[0][0].present_price + '\u5143\u8D77</del></span>\n                            </p>\n                            <span>\u4E86\u89E3\u66F4\u591A>></span>\n                            \n                        </div>\n                    </a>';
            $first_li.html(first_li_str);
            $first_li.attr('class', 'firstlicss');
        },
        error: function error(err) {
            console.log(err);
        }
    });

    // 点击相应的产品带id传到
    $('#phone_list').on('click', 'li', function () {
        var data_id = $(this).attr('data-id');
        window.open('xiaomi_detail_page.html?cid=' + data_id);
    });
});