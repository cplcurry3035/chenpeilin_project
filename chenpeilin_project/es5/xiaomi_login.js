'use strict';

jQuery(function ($) {
    /***********************************************/
    //1. 登录页面--选项卡功能
    $lis = $('#login_in .login_in ul li');
    $lis.eq(0).css('color', '#FF4400');
    $lis.click(function () {
        //对应li的下标console.log($(this).index());
        $lis.css('color', '');
        $('.login_in .login_in_show').css('display', 'none');
        $(this).css('color', '#FF4400');
        $('.login_in .login_in_show').eq($(this).index()).css('display', 'block');
    });

    /***********************************************/
    // 2.登录login功能
    var login_btn = document.querySelector('#login_btn');
    var login_verification_code = document.querySelector('.login_verification_code');
    var login_in_random_code = document.querySelector('.login_in_random_code');
    // 验证码初始化
    verification_code();

    // 点击验证码,更新验证码
    login_in_random_code.addEventListener('click', function () {
        verification_code();
    });

    /***********************************************/
    // 3.用户名,密码非空验证
    $login_username = $('#login_username');
    $login_psw = $('#login_psw');
    $login_btn = $('#login_btn');
    $login_output = $('#login_output');
    // 开关很重要！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    var isok1 = false;
    var isok2 = false;

    /***********************************************/
    // 4.七天免登录
    var istrue = false;

    $('#login_checkbox').on('click', function () {
        if ($('#login_checkbox').prop('checked')) {
            istrue = true;
            console.log('已经选中', istrue);
        } else {
            istrue = false;
            console.log('取消选中', istrue);
        }
    });

    // ************************************第一次点击
    $login_btn.click(function () {

        $_login_username = $login_username.val();
        $_login_psw = $login_psw.val();
        if ($_login_username.trim()) {
            // 用户名正则判断
            var res1 = verification.Tel($_login_username);
            var res2 = verification.Nickname($_login_username);
            // console.log(res1,res2);
            if (res1 || res2) {
                // 用户名不为空，开关为true            
                isok1 = true;
                if ($_login_psw.trim()) {
                    // 密码不为空，开关为true
                    isok2 = true;
                    login_verification_code.style.display = 'block';
                    // 验证码非空验证
                    if (isok1 && isok2) {

                        // isok1=false;
                        // isok2=false;
                        //  **********************************第二次点击
                        $login_btn.click(function () {
                            isok1 = false;
                            isok2 = false;
                            if ($('#login_verification_code').val().trim()) {
                                if ($('#login_verification_code').val().toLowerCase() == $('.login_in_random_code em del').html().toLowerCase()) {
                                    // console.log('验证成功');
                                    var dateavoid = 24;
                                    if (istrue) {
                                        dateavoid = 24 * 7;
                                    };

                                    $.ajax({
                                        url: '../api/xiaomi_login&register.php',
                                        type: 'post',
                                        data: {
                                            a: 'login',
                                            username: $('#login_username').val(),
                                            loginpsw: $('#login_psw').val(),
                                            loginavoid: dateavoid

                                        },
                                        async: true,
                                        success: function success(loginstr) {
                                            $res = $.parseJSON(loginstr);
                                            console.log(123, $res);

                                            if ($res['code'] == 1) {
                                                $('#login_username').css('border-color', '');
                                                $('#login_psw').css('border-color', '');
                                                $('#login_output').html($res['login_status']);
                                                $('#login_output').css({ 'display': 'block', 'color': 'green' });
                                                // console.log(Cookie.getCookie('username'));
                                                if (Cookie.getCookie('cartaddr')) {
                                                    location.href = Cookie.getCookie('cartaddr');
                                                    console.log(Cookie.getCookie('cartaddr'));
                                                    Cookie.removeCookie('cartaddr');
                                                } else {
                                                    location.href = '../xiaomiindex.html';
                                                }
                                            } else if ($res['code'] == 2) {
                                                $('#login_username').css('border-color', 'red');
                                                $('#login_psw').css('border-color', 'red');
                                                $('#login_output').html($res['message']);
                                                $('#login_output').css({ 'display': 'block', 'color': 'red' });
                                            } else if ($res['code'] == 0) {
                                                $('#login_username').css('border-color', 'red');
                                                $('#login_psw').css('border-color', 'red');
                                                $('#login_output').css({ 'display': 'block', 'color': 'red', 'border-color': 'red' });
                                                $('#login_output').html($res['message']);
                                            }
                                        },
                                        error: function error(err) {
                                            console.log(err);
                                        }
                                    });
                                } else if ($_login_username.trim() && $_login_psw.trim()) {
                                    $('input').css('border-color', '');
                                    $login_output.css('display', 'block');
                                    $('#login_output span').html('验证码不正确');
                                    $('#login_verification_code').css('border-color', '#EF5B00');
                                    verification_code();
                                }
                            } else if ($_login_username.trim() && $_login_psw.trim() && !isok1 && !isok2) {
                                $login_output.css('display', 'block');
                                $('input').css('border-color', '');
                                $('#login_output span').html('请输入验证码');
                                $('#login_verification_code').css('border-color', '#EF5B00');
                            }
                        });
                    } else {
                        console.log('进不去');
                    }
                } else {
                    isok1 = false;
                    $('input').css('border-color', '');
                    $login_output.css({ 'display': 'block', 'margin-top': '15px' });
                    $('#login_output span').html('请输入密码');
                    $login_psw.css('border-color', '#EF5B00');
                }
            } else if (!res1 || !res2) {
                $('input').css('border-color', '');
                $login_output.css({ 'display': 'block', 'margin-top': '15px' });
                $('#login_output span').html('用户名不正确');
                $login_username.css('border-color', '#EF5B00');
            }
        } else {
            isok2 = false;
            $('input').css('border-color', '');
            $login_output.css({ 'display': 'block', 'margin-top': '15px' });
            $('#login_output span').html('请输入账号');
            $login_username.css('border-color', '#EF5B00');
        }
    });
    // 验证码框验证的时候，output隐藏/失去高亮的颜色
    $('#login_verification_code').on('input', function () {
        $('#login_verification_code').css('border-color', '');
        $login_output.css('display', 'none');
    });

    // 验证码模块
    function verification_code() {
        login_in_random_code.innerHTML = '<em><del>' + verificationCode() + '</del></em>';
        login_in_random_code.style.backgroundColor = randomColor('rgb');
    };

    // 当input文本框内容改变，login_output隐藏
    $('.login_box').on('input', function () {

        $login_output.css('display', 'none');
        $(this).css('border-color', '');
    });
});