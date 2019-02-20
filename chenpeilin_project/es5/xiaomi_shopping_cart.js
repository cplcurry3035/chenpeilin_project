'use strict';

jQuery(function ($) {
    // 没有加入购物车
    var cart_init = '<div class=\'xiaomi_rabbit\'>  \n                    <i></i>\n                    <div class="xiaomi_rabbit_right">\n                        <h1>\u60A8\u7684\u8D2D\u7269\u8F66\u8FD8\u662F\u7A7A\u7684!</h1>\n                        <span>\u9A6C\u4E0A\u53BB\u8D2D\u7269</span>\n                    </div>\n                </div>';

    // 获取地址
    var cart_addr = decodeURI(location.search);;
    cart_addr = cart_addr.slice(1);
    console.log(cart_addr);
    $.ajax({
        url: '../api/xiaomi_shopping_cart.php',
        type: 'POST',
        data: {
            a: 'cartrender'
            // cartaddr:cartaddr
        },
        async: true,
        success: function success(str) {
            /**********初始化信息****************/
            // 数组
            $res = $.parseJSON(str);
            console.log($res);
            // 长度用来判断
            $cart_length = $.parseJSON(str).length;
            // 版本信息
            // $version_information=$.parseJSON($res[0].version_information);
            // 服务信息
            // $serve=$.parseJSON($res[0].services);
            // 三个服务开关
            // var serve0=$serve[0].checked;
            // var serve1=$serve[1].checked;
            // var serve2=$serve[2].checked;

            // console.log($res,$version_information,serve0,serve1,serve2);
            // console.log($cart_length);

            if ($cart_length > 0) {
                var cart_to_render = ' <div class="list_header">\n                                            <div class="col_checked header_col">\n                                                 <input type="checkbox" id="selectall" />\n                                                 \u5168\u9009\n                                            </div>\n                                            <div class="col_img header_col col_delete_all" style=\'cursor:pointer;text-decoration:underline;\'>\n                                                \u5220\u9664\u9009\u4E2D\n                                            </div>\n                                            <div class="col_listname header_col">\u5546\u54C1\u540D\u79F0</div>\n                                            <div class="col_price header_col">\u5355\u4EF7</div>\n                                            <div class="col_num header_col">\u6570\u91CF</div>\n                                            <div class="col_total header_col">\u5C0F\u8BA1</div>\n                                            <div class="col_operate header_col">\u64CD\u4F5C</div>\n                                        </div>\n                                        <div class="list_body">\n                                            <div class=\'item_box\'> \n                                    ';
                cart_to_render += $res.map(function (item) {

                    return '         \n                                <div class="item_box_list_information" data-id=\'' + item.cid + '\'>\n\n                                    <div class="current_list_checkbox current_col">\n                                        <input type="checkbox" />\n                                    </div>\n\n                                    <div class="current_list_img current_col">\n                                        <img src="' + item.describe_img + '" alt="" />\n                                    </div>\n\n                                    <div class="current_list_version_information current_col">\n                                        ' + item.listname + ' ' + $.parseJSON(item.version_information)[2] + ' ' + $.parseJSON(item.version_information)[0] + ' \u5185\u5B58 ' + $.parseJSON(item.version_information)[1] + ' ' + item.color + '\n                                    </div>\n\n                                    <div class="current_list_price current_col">\n                                        <span>' + item.present_price + '</span>\u5143\n                                    </div>\n\n                                    <div class="current_list_num current_col">\n                                        <div class="add_delete">\n                                        <span id=\'deletepiece\' class=\'current_piece\'>-</span>\n                                        <input type="text" value="' + item.buyofnum + '" />\n                                        <span id=\'addpiece\'  class=\'current_piece\'>+</span>\n                                        </div>\n                                        <div class="maxnum_of_buy">\n                                        \u8FD8\u53EF\u4E70 <span>' + (item.maxnumber - item.buyofnum) + '</span> \u4EF6\n                                        </div>\n                                    </div>\n\n                                    <div class="current_list_subtotal current_col">\n                                        <span>' + item.present_price * item.buyofnum + '</span>\u5143\n                                    </div>\n\n                                    <div class="current_list_cancel current_col">\n                                         &times;\n                                    </div>\n                                </div>               \n                                    ';
                }).join('');
                // 件数初始化
                // for(var j=0;j<$res.length;j++){
                //     console.log(66677778888999)
                //     if($('.add_delete input').eq(j).val()==$res[j].maxnumber){
                //         $('.maxnum_of_buy').html('已经到最大购买量');
                //     }

                // };

                cart_to_render += '</div>\n                                    </div>\n                                    <div class="list_footer">\n                                        <span class=\'continue_shop footer_col\'>\u7EE7\u7EED\u8D2D\u7269</span>\n                                        <p  class=\'footer_col footer_piece\'>\n                                            \u5171\n\n                                            <span class=\'allpiece\'>\n                                                0\n                                            </span>\n\n                                            \u4EF6\u5546\u54C1,\u5DF2\u9009\u62E9\n\n                                            <span class=\'selectpiece\'>\n                                                0\n                                            </span>\n                                            \u4EF6\n                                        </p>\n                                        <p class=\'footer_col account\'>\u53BB\u7ED3\u7B97\n                                        </p>\n                                        <p class=\'list_total footer_col\'>\n                                            \u5408\u8BA1:<span>0</span>\u5143\n                                        </p>     \n                                    </div> ';
                $('#my_shopping_cart .container').html(cart_to_render);
                // 件数初始化
                for (var k = 0; k < $res.length; k++) {
                    console.log(66677778888999);
                    if ($('.add_delete input').eq(k).val() * 1 == $res[k].maxnumber * 1) {
                        $('.maxnum_of_buy').eq(k).html('已到最大购买量');
                    }
                };
            } else if ($cart_length == 0) {
                $('#my_shopping_cart .container').html(cart_init);
                // alert('购物车是空的，赶紧去购买吧');
            };

            /*****************************函数初始化区域**********************************/
            // 件数更新
            remain_piece();
            all_piece_init();

            /***************************加减******************************/
            $('.current_piece').click(function () {

                var currentid = $(this).parents('.item_box_list_information').attr('data-id');
                var choose_add_delete = '';
                if ($(this).attr('id') == 'addpiece') {
                    choose_add_delete = 1;
                } else if ($(this).attr('id') == 'deletepiece') {
                    choose_add_delete = 0;
                };
                $thisinput = $(this).parent().find('input');
                $thislimit = $(this).parent().next();
                $this = $(this);
                $.ajax({
                    url: '../api/xiaomi_shopping_cart.php',
                    type: 'POST',
                    data: {
                        a: 'addordelete',
                        pieceid: currentid,
                        choose: choose_add_delete

                    },
                    async: true,
                    success: function success(str) {
                        $res = $.parseJSON(str);
                        console.log($res);
                        $thisinput.val($res.buy_num);
                        //实际件数  剩余件数  渲染
                        $thislimit.html('\u8FD8\u53EF\u4E70<span style=\'font-size:12px;\'>' + $res.updatenum + '</span>\u4EF6');
                        if ($thisinput.val() == $res.max_num) {
                            $thislimit.html('<span style=\'font-size:12px;\'>' + $res.updatenum + '</span>');
                        };
                        // 最大  最小 件数 按钮颜色变              
                        if (choose_add_delete == 0 && $thisinput.val() == $res.min_num) {
                            $this.css('background', '#ccc');
                        } else if (choose_add_delete == 1 && $thisinput.val() == $res.max_num) {
                            $this.css('background', '#ccc');
                        } else {
                            $('.current_piece').css('background', '');
                        };
                        // 调用函数
                        remain_piece();
                        subtotal($this);
                        selectall_follow();
                        change_total();
                        all_piece_init();
                    },
                    error: function error(err) {
                        console.log(err);
                    }

                });
            });

            // /*****************************打钩删除**********************************/     var check_status=[];

            $('.col_delete_all').click(function () {
                // // 记录选项框状态  用来识别复选框状态
                // check_status=[];
                // for(var m=0;m<$('.current_list_checkbox input').length;m++){
                //     if($('.current_list_checkbox input').eq(m).prop('checked')){
                //         check_status.push(m);
                //     }
                // };
                // console.log(check_status);

                // 存要删除的id
                var check_status_arr = [];
                for (var i = 0; i < $('.current_list_checkbox input').length; i++) {
                    if ($('.current_list_checkbox input').eq(i).prop('checked')) {
                        var check_id = $('.current_list_checkbox input').eq(i).parents('.item_box_list_information').attr('data-id');
                        check_status_arr.push(check_id);
                    }
                };
                console.log(123456, check_status_arr);
                var checkid_str = JSON.stringify(check_status_arr);
                console.log(checkid_str);
                $.ajax({
                    url: '../api/xiaomi_shopping_cart.php',
                    type: 'POST',
                    data: {
                        a: 'delete_part',
                        delete_list_part: checkid_str

                    },
                    async: true,
                    success: function success(str) {
                        $res = $.parseJSON(str);
                        console.log($res);
                        if ($res.present_length == 0) {
                            $('#my_shopping_cart .container').html(cart_init);
                        } else if ($res.present_length > 0) {

                            // alert($res.delete_status);
                            for (var n = check_status.length - 1; n >= 0; n--) {
                                $('.current_list_checkbox input').eq(check_status[n]).parents('.item_box_list_information').remove();
                            }
                        };
                        // 调用公共函数
                        selectall_follow();
                        change_total();
                        all_piece_init();
                    },
                    error: function error(err) {
                        console.log(err);
                    }

                });
            });

            /************************当前删除****************************/
            $('.current_list_cancel').click(function () {
                $thislistid = $(this).parents('.item_box_list_information').attr('data-id');
                console.log($thislistid);
                $this = $(this);
                console.log($this);

                $.ajax({
                    url: '../api/xiaomi_shopping_cart.php',
                    type: 'POST',
                    data: {
                        a: 'delete_current_list',
                        delete_list: $thislistid
                    },
                    async: true,
                    success: function success(str) {
                        $this.parents('.item_box_list_information').remove();
                        console.log(str, $cart_length);
                        $res = $.parseJSON(str);
                        if ($res.present_length == 0) {
                            $('#my_shopping_cart .container').html(cart_init);
                        } else if ($res.present_length > 0) {
                            alert($res.delete_status);
                        };
                        selectall_follow();
                        change_total();
                        all_piece_init();
                    },
                    error: function error(err) {
                        console.log(err);
                    }

                });
            });
            /************************全选****************************/
            $('#selectall').click(function () {
                if ($('#selectall').prop('checked')) {
                    $('.current_list_checkbox input').prop('checked', 'checked');
                } else {
                    // $('.current_list_checkbox input').removeAttr('checked');
                    $('.current_list_checkbox input').prop("checked", false);
                };
                selectall_follow();
                change_total();
            });
            /***************子复选框全勾上,全选也勾上***********************/
            $('.current_list_checkbox input').click(function () {
                selectall_follow();
                console.log(6666666666);
                selectall_follow();
                change_total();
            });

            /*******************还可买多少件函数封装**********************/
            function remain_piece() {
                for (var i = 0; i < $('.add_delete').find('input').length; i++) {
                    if ($('.add_delete').find('input').eq(i).val() > 1) {
                        $('.add_delete').eq(i).next().css('display', 'block');
                    } else if ($('.add_delete').find('input').eq(i).val() <= 1) {
                        $('.add_delete').eq(i).next().css('display', 'none');
                    };
                };
            };
            /*******************小计函数封装**********************/
            function subtotal($this) {
                $sub_total = $this.parents('.item_box_list_information').find('.current_list_price span').html() * $this.parents('.item_box_list_information').find('.add_delete input').val();
                $this.parents('.item_box_list_information').find('.current_list_subtotal span').html($sub_total);
            };
            /********删除当前list+子复选框都勾上,复选框也勾上***********/
            var check_status = [];
            function selectall_follow() {
                // 记录选项框状态  用来识别复选框状态
                check_status = [];
                for (var m = 0; m < $('.current_list_checkbox input').length; m++) {
                    if ($('.current_list_checkbox input').eq(m).prop('checked')) {
                        check_status.push(m);
                    }
                };
                console.log(check_status);
                if (check_status.length == $('.current_list_checkbox input').length) {
                    $('#selectall').prop('checked', 'checked');
                } else {
                    $('#selectall').prop('checked', false);
                };
            };

            /*******************总计+已选件数  函数封装**********************/

            function change_total() {
                var total = 0;
                var select_num = 0;

                for (var i = 0; i < check_status.length; i++) {
                    // 总价
                    total += $('.current_list_checkbox input').eq(check_status[i]).parents('.item_box_list_information').find('.current_list_subtotal span').html() * 1;
                    // 已选件数
                    // // eq(check_status[i])    eq(m)注意这个问题！！！！！
                    select_num += $('.current_list_checkbox input').eq(check_status[i]).parents('.item_box_list_information').find('.add_delete input').val() * 1;
                };
                $('.list_total span').html(total);
                $('.selectpiece').html(select_num);
            };

            /*******************总件数封装**********************/
            function all_piece_init() {
                var list_num = 0;
                for (var i = 0; i < $('.current_list_checkbox input').length; i++) {
                    list_num += $('.current_list_checkbox input').eq(i).parents('.item_box_list_information').find('.add_delete input').val() * 1;
                };

                $('.allpiece').html(list_num);
            };
            /********************购物车为点击跳转*****************/
            $('.xiaomi_rabbit_right span').click(function () {
                location.href = '../xiaomiindex.html';
            });

            /*****************购物车登录****************************/
            $('#unamestatus').click(function () {
                Cookie.setCookie('cartaddr', 'xiaomi_shopping_cart.html', { path: '/' });
                location.href = 'xiaomi_login.html';
            });

            // cookie
            var str_uid = decodeURI(Cookie.getCookie('uid'));
            var str_username = decodeURI(Cookie.getCookie('username'));
            if (str_uid != 'undefined') {
                $('#unamestatus').unbind("click");
                $('#unamestatus').html(str_username);
                $('.statustwo').html('我的订单');
                $('.pul').mouseover(function () {

                    $('.loginul').css('display', 'block');
                    $('.loginul i').css('display', 'block');
                    $('.loginul i').css('display', 'block');
                    $('.loginul').css({ 'background': '#fff' });
                    $('.loginul span').css({ 'color': '#FF6700', 'border-color': '#fff' });
                    $('.loginul').mouseover(function () {
                        $('.loginul').css('display', 'block');
                    });
                    // $('.loginul').mouseover(function(){
                    //     $('.loginul').css('display','none');
                    // });
                });
                $('.pul').mouseout(function () {
                    $('.loginul').css('display', 'none');
                    $('.loginul i').css('display', 'none');
                    $('.loginul').css('background', '');
                    $('.loginul span').css({ 'color': '', 'border-color': '' });
                    $('.loginul').mouseout(function () {
                        $('.loginul').css('display', 'none');
                    });
                });
            };

            $('#login_out').click(function () {
                $('#unamestatus').bind("click");
                $('#unamestatus').html('登录');
                $('.statustwo').html('注册');
                Cookie.removeCookie('uid');
                Cookie.removeCookie('username');
                $('#my_shopping_cart .container').html(cart_init);
            });

            /********************不要动***********************/
        },
        error: function error(err) {
            console.log(err);
        }

    });
});