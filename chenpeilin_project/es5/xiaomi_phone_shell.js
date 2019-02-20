'use strict';

jQuery(function ($) {
    // 初始化封装

    function render_init(res) {
        // 渲染页面
        $('.shell_ul').html('');
        var pagehtml = '';
        pagehtml += res.currentObj.map(function (item) {
            return '<li list-id=\'' + item.dataid + '\'>\n                        <img src="' + item.img + '" alt="" />\n                        <p>\u624B\u673A\u58F3' + item.listname + '</p>\n                        <p>' + item.describe + '</p>\n                        <p>' + item.price + '\u5143</p>\n                    </li>';
        }).join('');
        $('.shell_ul').html(pagehtml);
    };

    // 页数li
    function create_li($res) {
        var total_length = $res.allLength;
        var current_qty = $res.qty;
        var li_num = Math.ceil(total_length / current_qty);
        console.log(total_length, current_qty, li_num);
        var lipage = '<li class="prev tab"><</li>';
        for (var i = 0; i < li_num; i++) {
            lipage += '<li data-this-id=\'' + (i + 1) + '\' class=\'this_li\'>' + (i + 1) + '</li>';
        };
        lipage += '<li class="next tab">></li>';
        $('#page ul').html(lipage);
        $('#page ul li').eq(1).attr('id', 'active');
    };

    // *******************************ajax列表页初始化渲染***************************************************//
    var current_page_render = 1;
    var current_page_qty = 12;
    var istrue = false;
    if (istrue) {
        //真
        fn = 'order_price';
    } else {
        // 假
        fn = 'list_render';
    }
    $.ajax({
        url: '../api/xiaomi_list_page.php',
        type: 'POST',
        data: {
            a: 'list_render',
            currentpage: 1,
            qty: current_page_qty,
            istrue_status: false
        },
        async: true,
        success: function success(str) {
            $res = $.parseJSON(str);
            console.log($res);
            // 页面渲染
            render_init($res);

            // 计算页数
            create_li($res);

            // 点击数字
            $('.this_li').on('click', function () {
                $('.this_li').removeAttr('id', 'active');
                $(this).attr('id', 'active');
                var pagenum = $(this).attr('data-this-id');

                console.log(pagenum);
                // istrue=true;
                if (istrue) {
                    //真
                    fn = 'order_price';
                } else {
                    // 假
                    fn = 'list_render';
                };

                $.ajax({
                    url: '../api/xiaomi_list_page.php',
                    type: 'POST',
                    data: {
                        a: fn,
                        currentpage: pagenum,
                        qty: current_page_qty

                    },
                    async: true,
                    success: function success(str) {
                        $res1 = $.parseJSON(str);
                        console.log($res1);
                        render_init($res1);
                    },
                    error: function error(err) {
                        console.log(err);
                    }

                });
            });

            // 点击前进后退
            $('.tab').on('click', function () {

                $this_active = $(this).parent().children('#active').attr('data-this-id');
                // $('.this_li').removeAttr('id','active');
                // $('.this_li').eq($this_active).attr('id','active');
                console.log('一开始', $this_active);
                if ($(this).index() == $('#page ul li').length - 1) {
                    //console.log('next');
                    if ($this_active < $('.this_li').length) {
                        $this_active++;
                    } else if ($this_active >= $('.this_li').length) {
                        $this_active = $('.this_li').length;
                    }
                    // $('.this_li').removeAttr('id','active');
                    // $('.this_li').eq($this_active-1).attr('id','active');

                } else if ($(this).index() == 0) {
                    //console.log('prev');
                    if ($this_active > 1) {
                        $this_active--;
                    } else if ($this_active == 1) {
                        $this_active = 1;
                    }
                    // $('.this_li').removeAttr('id','active');
                    // $('.this_li').eq($this_active-1).attr('id','active');

                };
                $('.this_li').removeAttr('id', 'active');
                $('.this_li').eq($this_active - 1).attr('id', 'active');
                console.log('最终', $this_active);
                // istrue=true;
                if (istrue) {
                    //真
                    fn = 'order_price';
                } else {
                    // 假
                    fn = 'list_render';
                };
                $.ajax({
                    url: '../api/xiaomi_list_page.php',
                    type: 'POST',
                    data: {
                        a: fn,
                        currentpage: $this_active,
                        qty: current_page_qty

                    },
                    async: true,
                    success: function success(str) {
                        $res2 = $.parseJSON(str);
                        // console.log($res2);
                        render_init($res2);
                    },
                    error: function error(err) {
                        console.log(err);
                    }

                });
            });

            // 价格排序
            //开关
            var isok = true;
            $('#order_price').click(function () {
                console.log(666);
                istrue = true;
                if (isok) {
                    $('#order_price i').css('transform', 'rotate(180deg)');
                } else {
                    $('#order_price i').css('transform', 'rotate(0deg)');
                };
                $.ajax({
                    url: '../api/xiaomi_list_page.php',
                    type: 'POST',
                    data: {
                        a: 'order_price',
                        isok_status: isok
                    },
                    async: true,
                    success: function success(str) {
                        $res = $.parseJSON(str);
                        // 页面渲染
                        render_init($res);
                        isok = !isok;
                    },
                    error: function error(err) {
                        console.log(err);
                    }

                });
            });
        },
        error: function error(err) {
            console.log(err);
        }
    });
});