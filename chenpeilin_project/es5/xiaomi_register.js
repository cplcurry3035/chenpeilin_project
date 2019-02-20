'use strict';

jQuery(function ($) {
    /************************************************************/
    //1. 验证码模块   
    verification_code();
    function verification_code() {
        $('.register_random_code').html('<em><del>' + verificationCode() + '</del></em>');
        $('.register_random_code').css('background-color', randomColor('rgb'));
    };

    // 看不清，换一张
    $('.change_verification_code').click(function () {
        verification_code();
    });

    /************************************************************/
    // 2.正则验证
    var isok_tel = false;
    var isok_psw = false;
    var isok_repsw = false;
    var isok_uname = false;
    var isok_verification_code = false;
    // 手机
    $('#register_tel').blur(function () {
        $tel = $('#register_tel').val();
        $res = verification.Tel($tel);
        if ($tel.trim()) {
            if ($res) {
                // ajax传$tel 返回true（手机可以注册）或者false（手机已被占用），true的时候开关变为true
                $('#register_tel').next().children('.register_judge').html('');
                $('#register_tel').css('color', '');
                $('#register_tel').css('border-color', '');
                $.ajax({
                    url: '../api/xiaomi_login&register.php',
                    type: 'post',
                    data: {
                        a: 'judgeTel',
                        tel: $('#register_tel').val()
                    },
                    async: true,
                    success: function success(str) {
                        $res = $.parseJSON(str);

                        if ($res['code'] == 1) {
                            $('#register_tel').next().children('.register_judge').html($res['message']);
                            $('#register_tel').next().children('.register_judge').css('color', 'green');
                            $('#register_tel').css('border-color', '');
                            $('#register_tel').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat 0 -50px');
                            isok_tel = true;
                            console.log('isok_tel', isok_tel);
                        } else if ($res['code'] == 0) {
                            $('#register_tel').next().children('.register_judge').html($res['message']);
                            $('#register_tel').css('border-color', 'red');
                            $('#register_tel').next().children('.register_judge').css('color', 'red');
                            $('#register_tel').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -450px 0');
                            isok_tel = false;
                        }
                    },
                    error: function error(err) {
                        console.log(err);
                    }
                });
            } else {
                $('#register_tel').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -450px 0');
                $('#register_tel').next().children('.register_judge').html('手机号格式有误');
                $('#register_tel').css('border-color', 'red');
                $('#register_tel').next().children('.register_judge').css('color', 'red');
                isok_tel = false;
            }
        } else {
            $('#register_tel').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -270px 0');
            $('#register_tel').next().children('.register_judge').html('手机号不能为空');
            $('#register_tel').next().children('.register_judge').css('color', 'red');
            $('#register_tel').css('border-color', 'red');
            isok_tel = false;
        }
    });
    // 密码
    $('#register_psw').blur(function () {
        $psw = $('#register_psw').val();
        $res = verification.psw($psw);
        if ($psw.trim()) {
            if ($psw.length >= 6) {
                $('#register_psw').next().children('.register_judge').html('');
                $('#register_psw').css('color', '');
                $('#register_psw').css('border-color', '');
                isok_psw = true;
                $('#register_psw').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat 0 -50px');
                console.log('isok_psw', isok_psw);
            } else {
                $('#register_psw').next().children('.register_judge').html('密码长度要大于6位');
                $('#register_psw').next().children('.register_judge').css('color', 'red');
                $('#register_psw').css('border-color', 'red');
                $('#register_psw').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -450px 0');
                isok_psw = false;
            }
        } else {
            $('#register_psw').next().children('.register_judge').html('密码不能为空');
            $('#register_psw').next().children('.register_judge').css('color', 'red');
            $('#register_repsw').next().children('.register_judge').html('');
            $('#register_psw').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -450px 0');
            $('#register_psw').css('border-color', 'red');
            isok_psw = false;
        };

        // 当两个密码都已填入,图中恶意修改密码这一选项，防止出现验证通过
        if ($('#register_repsw').val() && $('#register_psw').val()) {
            if ($('#register_repsw').val() == $('#register_psw').val()) {
                $('#register_repsw').css('border-color', '');
                $('#register_psw').css('border-color', '');
                $('#register_repsw').next().children('.register_judge').html('验证通过');
                $('#register_repsw').next().children('.register_judge').css('color', 'green');
                $('#register_repsw').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat  0 -50px');
                isok_psw = true;
                isok_repsw = true;
            } else if ($('#register_repsw').val() != $('#register_psw').val()) {
                $('#register_repsw').css('border-color', 'red');
                $('#register_psw').css('border-color', 'red');
                $('#register_repsw').next().children('.register_judge').html('两个密码不符');
                $('#register_psw').next().children('.register_judge').html('两个密码不符');
                $('#register_psw').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -450px 0');
                $('#register_repsw').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -450px 0');
                $('#register_psw').next().children('.register_judge').css('color', 'red');
                $('#register_repsw').next().children('.register_judge').css('color', 'red');
                isok_psw = false;
                isok_repsw = false;
            }
        }
    });

    // 密码强度
    // 再次输入密码验证
    $('#register_repsw').blur(function () {
        $psw = $('#register_psw').val();
        $repsw = $('#register_repsw').val();
        if ($repsw.trim()) {
            if ($psw == $repsw) {
                $('#register_repsw').next().children('.register_judge').html('验证通过');
                $('#register_psw').next().children('.register_judge').html('');
                $('#register_repsw').css('border-color', '');
                $('#register_psw').css('border-color', '');
                $('#register_repsw').next().children('.register_judge').css('color', 'green');
                $('#register_repsw').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat 0 -50px');
                isok_repsw = true;
                console.log('isok_repsw', isok_repsw);
            } else {
                $('#register_psw').next().children('.register_judge').html('两个密码不符');
                $('#register_repsw').next().children('.register_judge').html('两个密码不符');
                $('#register_psw').css('border-color', 'red');
                $('#register_repsw').css('border-color', 'red');
                $('#register_psw').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -450px 0');
                $('#register_repsw').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -450px 0');
                $('#register_psw').next().children('.register_judge').css('color', 'red');
                $('#register_repsw').next().children('.register_judge').css('color', 'red');
                isok_repsw = false;
            }
        } else {

            $('#register_repsw').next().children('.register_judge').html('密码不能为空');
            $('#register_repsw').next().children('.register_judge').css('color', 'red');
            $('#register_repsw').css('border-color', 'red');
            $('#register_repsw').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -270px 0');
            isok_repsw = false;
        }
    });
    // 昵称
    $('#register_uname').blur(function () {
        $uname = $('#register_uname').val();
        $res = verification.Nickname($uname);
        if ($uname.trim()) {
            if ($res) {
                // ajax传$tel 返回true（手机可以注册）或者false（用户名已被占用），true的时候开关变为true

                $('#register_uname').css('border-color', '');
                $('#register_uname').next().children('.register_judge').html('');
                $.ajax({
                    url: '../api/xiaomi_login&register.php',
                    type: 'post',
                    data: {
                        a: 'judgeuname',
                        registeruname: $uname
                    },
                    async: true,
                    success: function success(str) {
                        $res = $.parseJSON(str);

                        if ($res['code'] == 1) {
                            $('#register_uname').next().children('.register_judge').html($res['message']);
                            $('#register_uname').css('border-color', '');
                            $('#register_uname').next().children('.register_judge').css('color', 'green');
                            isok_uname = true;
                            console.log('isok_uname', isok_uname);
                            $('#register_uname').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat 0 -50px ');
                        } else if ($res['code'] == 0) {
                            $('#register_uname').next().children('.register_judge').html($res['message']);
                            $('#register_uname').css('border-color', 'red');
                            $('#register_uname').next().children('.register_judge').css('color', 'red');
                            $('#register_uname').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -450px 0');
                            isok_uname = false;
                        }
                    },
                    error: function error(err) {
                        console.log(err);
                    }
                });
            } else {
                $('#register_uname').next().children('.register_judge').html('用户名格式有误');
                $('#register_uname').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -450px 0');
                $('#register_uname').next().children('.register_judge').css('color', 'red');
                $('#register_uname').css('border-color', 'red');
                isok_uname = false;
            }
        } else {
            $('#register_uname').next().children('.register_judge').html('用户名不能为空');
            $('#register_uname').next().children('.register_judge').css('color', 'red');
            $('#register_uname').css('border-color', 'red');
            $('#register_uname').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -270px 0');
            isok_uname = false;
        }
    });
    // 验证码
    $('.register_code').blur(function () {
        if ($('.register_code').val().trim()) {
            $('.register_code').css('border-color', '');
            $('.verification_code').css('margin-bottom', '');
            $('#register_output').html('');
        } else {
            $('.verification_code').css('margin-bottom', '0');
            $('.register_code').css('border-color', 'red');
            $('#register_output').css({ 'display': 'block', 'color': 'red' });

            $('#register_output').html('验证码不能为空');
        }
    });

    /************************************************************/
    // 点击注册按钮的时候验证
    $('#register_btn').click(function () {
        $('#register_output').css('display', 'none');
        // 点击进来先让所有提示-span的html()消失
        // $('.register_judge').html('');
        // 手机号非空提示
        if (!$('#register_tel').val()) {
            $('#register_tel').next().children('.register_judge').html('手机号不能为空');
            $('#register_tel').next().children('.register_judge').css('color', 'red');
            $('#register_tel').css('border-color', 'red');
            $('#register_tel').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -270px 0');
            isok_tel = false;
            return;
        };
        // 设置密码非空提示
        if (!$('#register_psw').val()) {
            $('#register_psw').next().children('.register_judge').html('密码不能为空');
            $('#register_psw').next().children('.register_judge').css('color', 'red');
            $('#register_psw').css('border-color', 'red');
            $('#register_psw').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -270px 0');
            isok_psw = false;
            return;
        };
        // 确认密码非空提示
        if (!$('#register_repsw').val()) {
            $('#register_repsw').next().children('.register_judge').html('密码不能为空');
            $('#register_repsw').next().children('.register_judge').css('color', 'red');
            $('#register_repsw').css('border-color', 'red');
            $('#register_repsw').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -270px 0');
            isok_repsw = false;
            return;
        };
        // 昵称非空提示
        if (!$('#register_uname').val()) {
            $('#register_uname').next().children('.register_judge').html('用户名不能为空');
            $('#register_uname').css('border-color', 'red');
            $('#register_uname').next().children('.register_judge').css('color', 'red');
            $('#register_uname').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -270px 0');
            isok_uname = false;
            return;
        };
        // 验证码模块
        if ($('.register_code').val().trim()) {
            if ($('.register_code').val().toLowerCase() == $('.register_random_code em del').html().toLowerCase()) {
                $('.verification_code').css('margin-bottom', '0');
                $('.register_code').css('border-color', '');
                $('#register_output').css({ 'display': 'block', 'color': 'green' });
                $('#register_output').html('验证码通过');
                isok_verification_code = true;
                // console.log('isok_verification_code',isok_verification_code);
            } else {
                $('.verification_code').css('margin-bottom', '0');
                $('#register_output').css({ 'display': 'block', 'color': 'red' });
                $('#register_output').html('验证码有误,请重新输入');
                $('.register_code').css('border-color', 'red');
                isok_verification_code = false;
                verification_code();
            }
        } else {
            $('.verification_code').css('margin-bottom', '0');
            $('#register_output').css('display', 'block');
            $('#register_output').html('验证码不能为空');
            $('.register_code').css('border-color', 'red');
            isok_verification_code = false;
        };

        // 途中突然改手机号
        $retel = $('#register_tel').val();
        $reuname = $('#register_uname').val();
        if ($retel) {
            $.ajax({
                url: '../api/xiaomi_login&register.php',
                type: 'post',
                data: {
                    a: 'rejudge1',
                    retel: $retel

                },
                async: true,
                success: function success(str) {
                    $res = $.parseJSON(str);
                    console.log($res);
                    if ($res['code'] == 1) {

                        $('#register_tel').css('border-color', '');
                        $('#register_tel').next().children('.register_judge').css('color', 'green');
                        $('#register_tel').next().children('.register_judge').html($res['message']);
                        $('#register_tel').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat 0 -50px ');
                        isok_tel = true;
                        isok_psw = true;
                        isok_repsw = true;
                        isok_uname = true;
                    } else if ($res['code'] == 0) {
                        $('#register_tel').css('border-color', 'red');
                        $('#register_tel').next().children('.register_judge').css('color', 'red');
                        $('#register_tel').next().children('.register_judge').html($res['message']);
                        $('#register_tel').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -450px 0');
                        isok_tel = false;
                        verification_code();
                    }
                },
                error: function error(err) {
                    console.log(err);
                }
            });
        };
        if ($reuname) {
            $.ajax({
                url: '../api/xiaomi_login&register.php',
                type: 'post',
                data: {
                    a: 'rejudge2',
                    reuname: $reuname

                },
                async: true,
                success: function success(str) {
                    $res = $.parseJSON(str);
                    if ($res['code'] == 1) {
                        $('#register_uname').css('border-color', '');
                        $('#register_uname').next().children('.register_judge').css('color', 'green');
                        $('#register_uname').next().children('.register_judge').html($res['message']);
                        $('#register_uname').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat  0 -50px');

                        isok_tel = true;
                        isok_psw = true;
                        isok_repsw = true;
                        isok_uname = true;
                    } else if ($res['code'] == 0) {
                        $('#register_uname').css('border-color', 'red');
                        $('#register_uname').next().children('.register_judge').css('color', 'red');
                        $('#register_uname').next().children('.register_judge').html($res['message']);
                        $('#register_uname').next().children('i').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -450px 0');
                        isok_uname = false;
                        verification_code();
                    }
                },
                error: function error(err) {
                    console.log(err);
                }
            });
        };
        //协议
        if (!istrue2) {
            alert('请勾上协议');
        }

        // 开关都为真，才将手机号/用户名推入数据库
        if (isok_tel && isok_psw && isok_repsw && isok_uname && isok_verification_code && istrue2) {

            console.log('ajax进行插入');
            $.ajax({
                url: '../api/xiaomi_login&register.php',
                type: 'post',
                data: {
                    a: 'registersuccess',
                    officalpsw: $('#register_psw').val(),
                    officaltel: $('#register_tel').val(),
                    officaluname: $('#register_uname').val()

                },
                async: true,
                success: function success(str) {
                    console.log(str);

                    // 问题：注册后要是再点击，则要重新判断  开关重新打上
                    // location.href='xiaomi_login.html';
                    isok_tel = false;
                    isok_psw = false;
                    isok_repsw = false;
                    isok_uname = false;
                    isok_verification_code = false;

                    location.href = '../xiaomiindex.html';
                },
                error: function error(err) {
                    console.log(err);
                }
            });
        };
    });

    // 协议要勾上
    var istrue1 = true;
    var istrue2 = false;
    $('.register_check').click(function () {
        // istrue!=true

        if (istrue1) {
            $('.register_check').css('background', 'url("../img/xiaomi_sprite_sheet.png") no-repeat -420px 0');
            istrue1 = false;
            istrue2 = true;
            console.log('istrue2的状态:勾上', istrue2);
        } else {
            $('.register_check').css('background', '');
            istrue1 = true;
            istrue2 = false;
            console.log('istrue2的状态:没勾上', istrue2);
        }
    });

    //********************************** 密码强度***************************************************//
    var psw_strength = document.getElementById('register_psw');
    var psw_describe = document.getElementsByClassName("psw_describe")[0];
    var register_only = document.getElementsByClassName("register_only")[0];
    var psw_inner_progess = document.getElementById("psw_inner_progess");
    var psw_progess = document.getElementsByClassName("psw_progess")[0];
    var regxs = [];
    // console.log(psw_strength,psw_progess,psw_inner_progess,psw_describe);
    regxs.push(/[^a-zA-Z0-9_]/g);
    regxs.push(/[a-zA-Z]/g);
    regxs.push(/[0-9]/g);

    psw_strength.onkeyup = function () {
        var val = this.value;
        var len = val.length;
        // 不断初始化为0！！！！
        var sec = 0;
        if (len >= 6) {
            // 至少六个字符
            psw_progess.style.display = 'block';
            register_only.style.top = '215px';
            for (var i = 0; i < regxs.length; i++) {
                if (val.match(regxs[i])) {
                    sec++;
                }
            }
        } else if (len < 6) {
            psw_progess.style.display = 'none';
        }
        console.log(sec);
        var result = sec / regxs.length * 100;
        // psw_inner_progress.style.width = result + "%";
        if (result > 0 && result <= 50) {
            psw_inner_progess.setAttribute("class", "error");
            psw_inner_progess.class = 'error';
            psw_describe.style.left = '110px';
            psw_describe.innerHTML = '密码强度:小';
        } else if (result > 50 && result < 100) {
            psw_inner_progess.setAttribute("class", "middle");
            psw_describe.style.left = '215px';
            psw_inner_progess.class = 'middle';
            psw_describe.innerHTML = '密码强度:中';
        } else if (result == 100) {
            psw_inner_progess.setAttribute("class", "strong");
            psw_describe.style.left = '320px';
            psw_inner_progess.class = 'strong';
            psw_describe.innerHTML = '密码强度:强';
        }
    };

    //********************************** 密码强度
});