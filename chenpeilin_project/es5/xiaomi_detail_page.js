'use strict';

jQuery(function ($) {

    //1. 购物车下来菜单，显示或者隐藏
    // console.log($('#shopping_cart i'));
    $('#shopping_cart').mouseover(function () {
        $('#shopping_cart').css('background-color', '#FF6700');
        $('#shopping_cart span').css('color', '#fff');

        $('.shopping_cart').stop().slideDown(180);
    });
    $('#shopping_cart').mouseout(function () {
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

    // 吸顶
    // console.log(666,$('.swiper-wrapper').offset().left,$('.swiper-wrapper').offset().top,666)
    var top = $('#suck_option').offset().top;
    var swipertop = $('.swiper-wrapper').offset().top;
    var swiperleft = $('.swiper-wrapper').offset().left;
    // console.log(swipertop);
    window.onscroll = function () {

        if (window.scrollY > top + 64) {

            $('#suck_option').attr('class', 'suckfixed');
            // $('.swiper-wrapper').attr('class','swiperfixed')
        } else if (window.scrollY <= top + 64) {
            $('#suck_option').attr('class', '');
        }

        // if(window.scrollY>swipertop+494){
        //     $('#slideshow').attr('class','swiperfixed');


        // }
        // if(window.scrollY>1540){
        //     $('#slideshow').attr('class','');


        // }
        // if(window.scrollY<swipertop+494){
        //     $('#slideshow').attr('class','');


        // }
    };

    // 选项卡出现

    $('.suck_option span').click(function () {
        $('.suck_option span').css('color', '');
        $('.list_common').css('z-index', '');
        $('.list_common').eq($(this).index()).css('z-index', '2');
        $('.suck_option span').eq($(this).index()).css('color', '#FF6B00k');
    });

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

    // ***************************************************************************************数据渲染

    // 带着id到商品详情页-html/xiaomi_goodslist.html?20190211
    var currentlist_id = decodeURI(location.search);
    currentlist_id = currentlist_id.slice(1).split('=')[1];
    console.log(currentlist_id);
    $.ajax({
        url: '../api/xiaomi_details.php',
        type: 'POST',
        data: {
            a: 'foundById',
            dataid: currentlist_id

        },
        async: true,
        success: function success(str) {
            // 总商品
            $all_res = $.parseJSON(str);
            console.log($all_res);
            // 版本信息
            $version_res = $.parseJSON($all_res[0]['versions_information']);
            // 版本颜色
            $version_color = $.parseJSON($all_res[0]['version_color']);
            // 版本图片
            $color_img = $.parseJSON($all_res[0]['color_img']);

            console.log('版本信息', $color_img[0]['img1']);
            // 1.名字渲染
            $('.listname').html($all_res[0]['listname']);
            $('.hostname').html($all_res[0]['listname']);
            // 2.机型优惠
            $('.phone_describe span').eq(0).html($all_res[0]['Explanation1']);
            $('.phone_describe span').eq(1).html($all_res[0]['Explanation2']);
            // 3.该手机的描述
            $('.phone_describe span').eq(2).html($all_res[0]['particular_describe']);
            // 4.价格渲染
            $('.phone_price span').eq(0).html($all_res[0]['original_price'] + '元');
            $('.phone_price span').eq(1).children('del').html($all_res[0]['present_price'] + '元');
            // 5.网址名字渲染
            document.title = $all_res[0]['listname'] + '购买-小米商城';
            // 6.版本
            console.log($version_res);
            var versionli = '';
            versionli += $version_res.map(function (item) {
                return '<li data-version-id=\'' + item.version_id + '\'>\n                            <span>' + item.version_name + '</span>\n                            <span>' + item.present_price + '\u5143</span>\n                        </li>';
            }).join('');
            $('.phoneversion ul').html(versionli);
            // 7.点击高亮
            $('.phoneversion ul li').eq(0).css('border-color', '#FF6700');
            $('.phoneversion ul li').children('span').eq(0).css('color', '#FF6700');
            // 7.1.动态改变下面的值  初始化
            // 手机名
            $('.totalnum_header').children('p').eq(0).children('span').eq(0).html($all_res[0]['listname']);
            // 当前价
            $('.totalnum_header').children('p').eq(1).children('span').eq(0).html($version_res[0]['present_price'] + '元');
            // 优惠前价格
            $('.totalnum_header').children('p').eq(1).children('span').eq(1).children('del').html($version_res[0]['original_price'] + '元');
            // 版本
            $('.totalnum_header').children('p').eq(0).children('span').eq(1).html($version_res[0]['version_name'].slice(0, -4));
            // 总计颜色
            $('.totalnum_header').children('p').eq(0).children('span').eq(2).html($version_color[0]);
            // 最后总计
            $('.totalnum_bottom span').html($version_res[0]['present_price'] + '元');

            var zonji = '1299';
            var version_init = $version_res[0]['version_name'].slice(-3);
            console.log(version_init);
            $('.phoneversion ul').on('click', 'li', function () {
                // console.log($('.phoneversion ul li').children().eq(0));
                $('.phoneversion ul li').css('border-color', '');
                $('.phoneversion ul li').children('span').css('color', '');
                $(this).css('border-color', '#FF6700');
                $(this).children('span').eq(0).css('color', '#FF6700');
                $('.color_tab_control ul').css('display', 'none');
                $('.color_tab_control ul').eq($(this).index()).css('display', 'block');
                // $('.color_tab_control ul').eq(0).children('li').eq(0).css({'border-color':'#FF6700','color':'#FF6700'});


                // 总计框改变值
                // 版本
                $('.totalnum_header').children('p').eq(0).children('span').eq(1).html($version_res[$(this).index()]['version_name'].slice(0, -4));
                version_init = $version_res[$(this).index()]['version_name'].slice(-3);
                // 当前价
                $('.totalnum_header').children('p').eq(1).children('span').eq(0).html($version_res[$(this).index()]['present_price'] + '元');
                // 优惠前价格
                $('.totalnum_header').children('p').eq(1).children('span').eq(1).children('del').html($version_res[$(this).index()]['original_price'] + '元');
                // 最后总计

                $('.totalnum_bottom span').html($version_res[$(this).index()]['present_price'] + '元');
                zonji = $version_res[$(this).index()]['present_price'];
                // 总计框颜色
                $('.totalnum_header').children('p').eq(0).children('span').eq(2).html($version_color[0]);
            });

            // 8.多少个颜色创建多少个颜色ul
            var versionul = '';
            versionul += $version_res.map(function (item) {
                return '<ul class=\'clearfix\'>' + item.version_id + '</ul>';
            }).join('');
            $('.color_tab_control').html(versionul);
            // 每个版本对应一种颜色(颜色长度)
            // console.log($version_res[0]['color']);
            console.log($color_img);
            for (var j = 0; j < $version_res.length; j++) {
                // console.log($version_res[j]['color']);
                // console.log($('.color_tab_control ul').eq(j));
                var colorli = '';
                colorli += $version_res[j]['color'].map(function (item) {
                    return '<li><i><img src="" alt="" /></i>' + item + '</li>';
                }).join('');
                $('.color_tab_control ul').eq(j).html(colorli);
                //i标签颜色换上
                for (var m = 0; m < $version_res[j]['color'].length; m++) {
                    $('.color_tab_control ul').eq(j).children('li').children('i').eq(m).children('img').attr('src', $color_img[m].img1);
                    // 每个颜色框高亮
                    $('.color_tab_control ul').eq(j).children('li').eq(0).css({ 'border-color': '#FF6700', 'color': '#FF6700' });
                };
            };
            // 保留测试结果
            // console.log('hhh',$('.color_tab_control ul').eq(0).children('li').children('i').eq(1).children('img'));
            // console.log(666,$version_res[0]['color'].length);
            // console.log(667,$color_img[1].img1);


            //9. 颜色框点击高亮(事件)
            // 深空灰手机  init初始化
            for (var i = 0; i <= $('.slideshow_img').length - 2; i++) {
                $('.slideshow_img').eq(i).attr('src', $color_img[0]['img' + i]);
            };

            $('.color_tab_control ul').on('click', 'li', function () {
                $(this).parent('ul').children('li').css('border-color', '');
                // 清除对应某个ul的样式不可以用这个  ！！！$('.color_tab_control ul li').css('border-color','');
                $(this).css('border-color', '#FF6700');

                // 对应手机的颜色
                //排他
                for (var i = 0; i <= $('.slideshow_img').length - 2; i++) {
                    $('.slideshow_img').attr('src', '');
                };
                console.log($(this).index());
                // 各个颜色
                for (var i = 0; i <= $('.slideshow_img').length - 2; i++) {
                    $('.slideshow_img').eq(i).attr('src', $color_img[$(this).index()]['img' + i]);
                };
                // $('.slideshow_img').eq(1).attr('src','../img/listimgs/201901_07.jpg');

                // 总计框颜色
                $('.totalnum_header').children('p').eq(0).children('span').eq(2).html($version_color[$(this).index()]);
            });

            // console.log(999,$color_img[2],$color_img[2]['img'+3]);


            // 10.小米服务checked

            $('input').click(function () {
                console.log('总价格', zonji);

                // 排他 二选一 清空
                // $(this).parents('.guarantee').find('.selectserve').find('input').removeAttr('checked');
                $('.selectserve').find('input').removeAttr('checked');
                // $('.selectserve').find('input').prop('checked',false);
                $(this).parents('.guarantee').find('.selectserve').find('.serve_m p').eq(0).css('color', '');
                $(this).parents('.guarantee').find('.selectserve').css('border-color', '');
                // 点击高亮
                $(this).parents('.serve').css('border-color', '#FF6700');
                $(this).parents('.serve').find('input').attr('checked', 'checked');
                $(this).parents('.serve').find('input');
                $(this).parents('.serve').find('.serve_m p').eq(0).css('color', '#FF6700');
                // checked判断
                if (!$(this).prop('checked')) {
                    $(this).parents('.serve').find('input').removeAttr('checked');
                    $(this).parents('.serve').find('.serve_m p').eq(0).css('color', '');
                    $(this).parents('.serve').css('border-color', '');
                };

                var present_serve1 = '';
                var present_serve2 = '';
                var present_serve_price1 = '';
                var present_serve_price2 = '';
                // 服务价格渲染
                if ($(this).parents('.guarantee').attr('data-id') == 1 && $(this).parents('.serve').find('input').prop('checked')) {
                    // console.log('data-id=1',$(this).parents('.guarantee').find('.selectserve').index());

                    if ($(this).index() == 1) {
                        present_serve1 = $(this).parent().next().children().eq(0).html();
                    } else if ($(this).index() == 0) {
                        present_serve1 = $(this).parents('.serve_m').children().eq(0).html();
                    };
                    present_serve_price1 = $(this).parents('.serve').find('.serve_r').children('span').eq(0).html();
                    $('.totalnum_output .output_serve').eq(0).children().eq(0).html(present_serve1);
                    $('.totalnum_output .output_serve').eq(0).children().eq(1).html(present_serve_price1 + '元');
                    // // 总价动态变
                    // var all_serve_price1=$('.priceone').html().slice(0,-1);
                    // var all_serve_price2=$('.pricesecond').html().slice(0,-1);
                    // var allprice=$('.totalnum_bottom span').html().slice(0,-1)
                } else if ($(this).parents('.guarantee').attr('data-id') == 1 && !$(this).parents('.serve').find('input').prop('checked')) {
                    $('.totalnum_output .output_serve').eq(0).children().eq(0).html('');
                    $('.totalnum_output .output_serve').eq(0).children().eq(1).html('');
                };

                if ($(this).parents('.guarantee').attr('data-id') == 2 && $(this).parents('.serve').find('input').prop('checked')) {
                    // console.log('data-id=2');
                    present_serve2 = $(this).parents('.guarantee').find('.serve_m p').eq(0).html();
                    present_serve_price2 = $(this).parents('.serve').find('.serve_r').children('span').eq(0).html();
                    $('.totalnum_output .output_serve').eq(1).children().eq(0).html(present_serve2);
                    $('.totalnum_output .output_serve').eq(1).children().eq(1).html(present_serve_price2 + '元');
                } else if ($(this).parents('.guarantee').attr('data-id') == 2 && !$(this).parents('.serve').find('input').prop('checked')) {
                    $('.totalnum_output .output_serve').eq(1).children().eq(0).html('');
                    $('.totalnum_output .output_serve').eq(1).children().eq(1).html('');
                }
                // 服务渲染
                // $('.totalnum_output .output_serve').eq(0).children().eq(0).html(present_serve1);
                // $('.totalnum_output .output_serve').eq(0).children().eq(1).html(present_serve_price1);
                // $('.totalnum_output .output_serve').eq(1).children().eq(0).html(present_serve2);
                // $('.totalnum_output .output_serve').eq(1).children().eq(1).html(present_serve_price2);


                // 判断打钩开关
                console.log(zonji, 6984654564);
                var total = Number(zonji);

                // var all_serve_price1=Number($('.priceone').html().slice(0,-1));
                // var all_serve_price2=Number($('.pricesecond').html().slice(0,-1));
                // var allprice=Number($('.totalnum_bottom span').html().slice(0,-1));
                // $('.totalnum_bottom span').html(allprice+all_serve_price1);

                // isok1
                if ($('.isok1').prop('checked')) {
                    // console.log('isok1打上了');
                    dynamic_price();
                }
                if (!$('.isok1').prop('checked')) {
                    // console.log('isok1取消了');
                    dynamic_price();
                };
                // isok2
                if ($('.isok2').prop('checked')) {
                    // console.log('isok2打上了');
                    dynamic_price();
                }
                if (!$('.isok2').prop('checked')) {
                    // console.log('isok2取消了');
                    dynamic_price();
                };
                // isok3
                if ($('.isok3').prop('checked')) {
                    // console.log('isok3打上了');
                    dynamic_price();
                }
                if (!$('.isok3').prop('checked')) {
                    // console.log('isok3取消了');
                    dynamic_price();
                    i;
                };
            });

            // 不断调用价格变化函数
            function dynamic_price() {
                // 初始化  价格
                var all_serve_price1 = Number($('.priceone').html().slice(0, -1));
                var all_serve_price2 = Number($('.pricesecond').html().slice(0, -1));
                var allprice = Number($('.totalnum_bottom span').html().slice(0, -1));
                $('.totalnum_bottom span').html(Number(zonji) + all_serve_price1 + all_serve_price2 + '元');
            };

            // // 判断要进行裁剪
            $('#addtocart').css('cursor', 'pointer');
            /*************************************************************点击加入购物车******************************************/
            $('#addtocart').click(function () {

                // a:'insert_cart',
                //         content_id:currentlist_id,
                //         list_name:currentname,
                //         host_img:'../img/listimgs/201901_02.jpg',
                //         gift:1,
                //         price:zonji,
                //         serveice:serveinformation,
                //         maxnum:5,
                //         version_phone:string_version_arr,
                //         color_phone:currentcolor
                var isok1 = $('.isok1').prop('checked');
                var isok2 = $('.isok2').prop('checked');
                var isok3 = $('.isok3').prop('checked');
                var currentname = $all_res[0]['listname'];
                var currentcolor = $('.colorphone').html();

                var a = [{ "status1": "全年意外保障服务", "status2": "手机意外摔落/进水/碾压等损坏", "checked": isok1 }, { "status1": "全年碎屏保障服务", "status2": "手机意外碎屏", "checked": isok2 }, { "status1": "延长保修服务", "status2": "厂保延一年，性能故障免费维修", "checked": isok3 }];
                var serveinformation = JSON.stringify(a);
                var version_arr = $('.version_separate').html().split('+');
                version_arr.push(version_init);
                var string_version_arr = JSON.stringify(version_arr);
                // '../img/listimgs/201901_02.jpg'


                // console.log(123,currentlist_id,currentname,currentcolor,zonji,serveinformation,string_version_arr,currentcolor);
                console.log($);
                $.ajax({
                    url: '../api/xiaomi_shopping_cart.php',
                    type: 'post',
                    data: {
                        a: 'insert_cart',
                        content_id: currentlist_id,
                        list_name: currentname,
                        host_img: $color_img[0]['img1'],
                        gift: 1,
                        price: zonji,
                        serveice: serveinformation,
                        buynum: 1,
                        maxnum: 5,
                        version_phone: string_version_arr,
                        color_phone: currentcolor

                    },
                    async: true,
                    success: function success(str) {

                        $res = $.parseJSON(str);
                        console.log(123666, $res);
                        if ($res.code == '1') {

                            if ($res.currentnum == $res.maxnum) {
                                $('.my_model').css('display', 'block');
                                $('#diglog_shouc_ok').click(function () {

                                    $('.my_model').css('display', 'none');
                                });
                                //popup(100,100,'您已达到最大购买量');
                            } else if ($res.currentnum < $res.maxnum) {
                                location.href = 'xiaomi_jump_cart.html?cid=' + currentlist_id;
                            }
                        } else {
                            alert($res.message);
                        }
                    },
                    error: function error(err) {
                        console.log(err);
                    }

                });
            });

            // 跳转到详情
            $('#shopping_cart').click(function () {
                location.href = 'xiaomi_shopping_cart.html';
            });
        },
        error: function error(err) {
            console.log(err);
        }
    });
});