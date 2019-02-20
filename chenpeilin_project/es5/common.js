'use strict';

// 平方
function square(num) {
    return num * num;
};
//  立方
function cube(num) {
    return num * num * num;
};
//  某个范围的随机数
function randomNumber(min, max) {
    return parseInt(Math.random() * (max - min + 1)) + min;
};
// 随机色
function randomColor(type) {
    if (type == 16) {
        //当传过来的实参是16，就生成16进制的随机颜色返回
        var str = '0123456789abcdef';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            var num = randomNumber(0, 15);
            color += str[num];
        }

        return color; // #162743
    } else if (type == 'rgb') {
        //如果传过来的实参是；rgb，就返回rgb颜色
        var r = randomNumber(0, 255);
        var g = randomNumber(0, 255);
        var b = randomNumber(0, 255);

        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}
// 阶乘
function factorial(_num) {
    if (_num == 0 || _num == 1) {
        return 1;
    }
    return _num * factorial(--_num);
}
// 传入参数，求参数的和
function parameter() {
    var total = 0;
    for (var i = 0; i <= arguments.length; i++) {
        total += i;
    }
    return total;
}
// 下拉菜单
function pullMenu(fatherBox, sonMenu) {
    // 这里的box为父盒子(注意为一级菜单的父级元素)
    // 这里的menu为二级菜单
    fatherBox.onmouseover = function () {
        sonMenu.style.display = "block";
    };
    fatherBox.onmouseout = function () {
        sonMenu.style.display = "none";
    };
}

// indexOf
function indexOf(arr, ele) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == ele) {
            return i;
        }
        // 这样执行不了全程
        // else{
        //     return -1;
        // }
    }
    return -1;
}

// includes
function includes(arr, ele) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == ele) {
            return true;
        }
    }
    return false;
}
// map
function map(fn) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        res.push(fn(arr[i]));
    }
    return res;
}
// 封装生成随机验证码：含有字母和数字，可以忽略大小写
function verificationCode() {
    var res = '';
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < 5; i++) {

        res += str.charAt(randomNumber(0, str.length - 1));
    }

    return res;
}
function codeJudge() {}
// 过滤敏感字符
function filter(str) {
    var sens = ['fuck', '草', 'sb', '尼玛', '小学生'];
    for (var i = 0; i < sens.length; i++) {
        var reg = new RegExp(sens[i], 'gi');
        str = str.replace(reg, '**');
    }
    return str;
}
// 正则不考虑验证码
function leaveOut(res) {
    var str = 'abcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < str.length; i++) {
        var reg = new RegExp(str[i], 'gi');
        res = res.replace(reg, str[i]);
    }
    return res;
}
// url参数  经常用！！！
function strObj(listStr) {
    // listStr = 'key0=1&key1=2&key2=3'
    var obj = {};
    var arr = listStr.split('&');
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i].split('=');
        obj[str[0]] = str[1];
    }
    return obj;
}

// 时间拼接
function date() {
    var combination = new Date();
    var year = combination.getFullYear();
    var month = combination.getMonth(); //0-11
    var day = combination.getDate();
    var week = combination.getDay(); //0-6
    var str = '日一二三四五六';
    var hours = combination.getHours() < 10 ? '0' + combination.getHours() : combination.getHours();
    var minutes = combination.getMinutes() < 10 ? '0' + combination.getMinutes() : combination.getMinutes();
    var seconds = combination.getSeconds() < 10 ? '0' + combination.getSeconds() : combination.getSeconds();
    return year + '年' + (month + 1) + '月' + day + '日,星期' + str[week] + ',' + hours + '时' + minutes + '分' + seconds + '秒';
}
//毫秒数转时间(天-小时-秒)
function millisecond(ms) {
    // var  year = ;
    // var  month = ;
    // var  week = ;
    var days = parseInt(ms / (1000 * 60 * 60 * 24));
    var hours = parseInt(ms % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var minutes = parseInt(ms % (1000 * 60 * 60) / (1000 * 60));
    var seconds = parseInt(ms % (1000 * 60) / 1000);
    // var  str='日一二三四五六' ;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return days + '天' + hours + '时' + minutes + '分' + seconds + '秒';
}

// 滚轮事件
function trollery(ele, callback) {
    var istrue;
    //IE 谷歌
    ele.onmousewheel = fn;

    //火狐
    if (ele.addEventListener) {
        console.log(666);
        ele.addEventListener('DOMMouseScroll', fn, false);
    };

    function fn(ev) {
        //判断滚轮方向
        var ev = ev || event;
        //true:向上滚了，false：向下滚了
        if (ev.wheelDelta) {
            //ie 谷歌  规定：大于0 上滚，小于0下滚
            istrue = ev.wheelDelta > 0 ? true : false;
        } else {
            //火狐
            istrue = ev.detail < 0 ? true : false;
        }
        // 都不能直接写return istrue  这样没执行返出去，执行一次又返回出去
        callback(istrue); //实参
    }
};

// 表单正则验证
var verification = {
    Tel: function Tel(str) {
        var reg = /^1[3-9]\d{9}$/;
        var res = reg.test(str);
        return res;
    },
    Email: function Email(str) {
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var res = reg.test(str);
        return res;
    },
    Identity: function Identity(str) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var res = reg.test(str);
        return res;
    },
    AccountNum: function AccountNum(str) {
        var reg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
        var res = reg.test(str);
        return res;
    },
    Nickname: function Nickname(str) {
        var reg = /^[\u2E80-\u9FFF$]{3,}/;
        var res = reg.test(str);
        return res;
    },
    birth: function birth(str) {
        var reg = /^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/;
        var res = reg.test(str);
        return res;
    },
    psw: function psw(str) {
        var reg1 = /^[a-zA-Z]\w{5,17}$/;
        var reg2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
        var reg3 = /^\d{6,17}$/;
        var res1 = reg1.test(str);
        var res2 = reg2.test(str);
        var res3 = reg3.test(str);
        if (res1) {
            return '中';
        } else if (res2) {
            return '强';
        } else if (res3) {
            return '小';
        } else {
            return false;
        }
    },
    judge: function judge(str1, str2) {
        if (str1 == str2) {
            return true;
        } else {
            return false;
        }
    }
};

// 封装cookie
//封装获取样式的方法
// var yanse = getCss(box,'backgroundColor');
function getCss(ele, attr) {
    // 高级版本
    if (getComputedStyle(ele, false)) {
        return getComputedStyle(ele, false)[attr];
    }
    // ie8-
    else {
            return ele.currentStyle[attr];
        }
}
//封装设置行内样式
//高级、ie都兼容style
// setCss(box,'backgroundColor','orange');
function setCss(ele, attr, para) {
    ele.style[attr] = para;
}

//二合一
//arguments
function Css() {
    if (arguments.length == 2) {
        if (getComputedStyle(arguments[0], false)) {
            return getComputedStyle(arguments[0], false)[arguments[1]];
        }
        // ie8-
        else {
                return arguments[0].currentStyle[arguments[1]];
            }
    } else if (arguments.length == 3) {
        arguments[0].style[arguments[1]] = arguments[2];
    }
}
// 深拷贝
function deepClone(str) {
    // 转字符串
    var res = JSON.stringify(str);
    // 转对象
    return JSON.parse(res);
}

// 封装cookie
// prop为json对象格式
// {
//     "expires":把时间从外面放进来,
//     "path":"/",
//     "domain":".baidu.com"
// }
var Cookie = {
    setCookie: function setCookie(name, value, prop) {
        //name和value是必写参数。prop是json格式的数据
        var str = name + '=' + value; //必写的

        //prop
        //expires:设置失效时间
        if (prop.expires) {
            str += ' ;expires=' + prop.expires.toUTCString(); //把时间转成字符串 toUTCString
        }
        //prop.path :设置路径
        if (prop.path) {
            str += ' ;path=' + prop.path;
        }
        //设置访问权限domain
        if (prop.domain) {
            str += ' ;domain=' + prop.domain;
        }

        //设置：存
        document.cookie = str;
    },
    getCookie: function getCookie(key) {
        //获取
        var str = document.cookie; //name=jingjing; psw=123456
        var arr = str.split('; '); //[name=jingjing , psw=123456]
        for (var i = 0; i < arr.length; i++) {
            var res = arr[i].split('='); //[name,jingjing] [psw,123456]
            if (key == res[0]) {
                return res[1]; //通过键名取键值
            }
        }
    },
    removeCookie: function removeCookie(key) {
        //cookie:设置时间失效，设置时间为过去的某个时间
        var pastDue = new Date();
        pastDue.setDate(pastDue.getDate() - 10); //设置成昨天
        Cookie.setCookie(key, '', {
            expires: pastDue,
            path: '/'
        });
    }

    // 
};var cookie = {
    set: function set(name, value, prop) {
        //name和value是必写参数。prop是json格式的数据
        var str = name + '=' + value; //必写的

        //prop
        //expires:设置失效时间
        if (prop.expires) {
            str += ';expires=' + prop.expires.toUTCString(); //把时间转成字符串 toUTCString
        }
        //prop.path :设置路径
        if (prop.path) {
            str += ';path=' + prop.path;
        }
        //设置访问权限domain
        if (prop.domain) {
            str += ';domain=' + prop.domain;
        }

        //设置：存
        document.cookie = str;
    },
    get: function get(key) {
        //获取
        var str = document.cookie; //name=jingjing; psw=123456
        var arr = str.split('; '); //[name=jingjing , psw=123456]
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //[name,jingjing] [psw,123456]
            if (key == arr2[0]) {
                return arr2[1]; //通过键名取键值
            }
        }
    },
    remove: function remove(key) {
        //cookie:设置时间失效，设置时间为过去的某个时间
        var now = new Date();
        now.setDate(now.getDate() - 10); //设置成昨天
        cookie.set(key, '', {
            expires: now,
            path: '/'

        });
    }

    /*
        运动框架封装：startMove()过渡    jq animate()
        最终版：多对象，多属性，链式运动框架(运动队列)
        参数一：对象名
        参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'height':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
        参数三：回调函数(可选参数)
     */

};function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) {
            //          console.log(key); //width heigth opacity
            var cur = 0; //存初始值
            if (key == 'opacity') {
                //初始值
                cur = getCss(obj, key) * 100; //透明度
            } else {
                cur = parseInt(getCss(obj, key)); //width heigth borderwidth px为单位的
            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            if (cur != json[key]) {
                //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }
        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) {
            //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) {
                // 延迟代码的执行
                fnend();
            }
        }
    }, 20); //obj.timer 每个对象都有自己定时器
}

// 弹窗
function popup(boxWidth, boxHeight, str) {
    var wWidth = window.innerWidth;
    var wHeight = window.innerHeight;
    var body = document.body;
    // body.style.position='relative';
    var bodydiv = document.createElement('div');
    body.appendChild(bodydiv);
    bodydiv.style.position = 'absolute';
    bodydiv.style.top = 0;
    bodydiv.style.backgroundColor = 'rgba(0,0,0,0.4)';
    bodydiv.style.width = "100%";
    bodydiv.style.height = "100%";
    window.onresize = function () {
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;
        div.style.left = (wWidth - boxWidth) / 2 + 'px';
        div.style.top = (wHeight - boxHeight) / 2 + 'px';
    };
    var div = document.createElement('div');
    bodydiv.appendChild(div);
    div.style.width = boxWidth + 'px';
    div.style.height = boxHeight + 'px';
    div.style.backgroundColor = '#ccc';
    div.style.border = '1px solid #000';
    div.style.position = 'absolute';
    div.style.left = (wWidth - boxWidth) / 2 + 'px';
    div.style.top = (wHeight - boxHeight) / 2 + 'px';
    div.innerHTML = str;
    div.style.textAlign = 'center';
    div.style.lineHeight = boxHeight - 50 + 'px';
    var Yes = document.createElement('input');
    var No = document.createElement('input');
    Yes.type = 'button';
    No.type = 'button';
    div.appendChild(Yes);
    div.appendChild(No);
    div.style.borderRadius = '10px';
    Yes.style.position = 'absolute';
    Yes.value = '确定';
    Yes.style.left = '5px';
    Yes.style.bottom = '5px';
    No.style.position = 'absolute';
    No.value = '取消';
    No.style.right = 5 + 'px';
    No.style.bottom = 5 + 'px';
    Yes.onclick = function () {
        bodydiv.style.display = 'none';
        bodydiv.removeChild(div);
    };
    No.onclick = function () {
        bodydiv.style.display = 'none';
        bodydiv.removeChild(div);
    };
};

// lunbotu
// var lunbo= document.getElementById('lunbo');
// var lunLeft= document.getElementById('lunLeft');
// var lunRight= document.getElementById('lunRight');
// var lunbtn = document.getElementById('lunbtn');
// var lunspans = lunbtn.getElementsByTagName('span');
// var luntupian=document.getElementById('luntupian');
// var lunLis =luntupian.getElementsByTagName('li');
function rollImage(lunLis, lunbo, lunLeft, lunRight, lunspans, lunbtn) {
    var iW = lunbo.offsetWidth;
    for (var i = 0; i < lunLis.length; i++) {
        setCss(lunLis[i], 'left', iW + 'px');
    }
    setCss(lunLis[0], 'left', 0 + 'px');
    // f方法记一下num  ++  数组
    var num = 0;
    var lunroll = function lunroll() {
        startMove(lunLis[num], { 'left': -iW });
        num = ++num > lunLis.length - 1 ? 0 : num;
        setCss(lunLis[num], 'left', iW + 'px');
        startMove(lunLis[num], { 'left': 0 });
        spanRoll();
    };
    // var timer = setInterval(lunroll,2000);
    lunbo.onmouseover = function () {
        lunLeft.style.display = "block";
        lunRight.style.display = "block";
        // clearInterval(timer);
    };
    lunbo.onmouseout = function () {
        // timer = setInterval(lunroll,2000);
        lunLeft.style.display = "none";
        lunRight.style.display = "none";
    };
    var lunnext = function lunnext() {
        lunroll();
    };
    var day = new Date();
    var lLeft = function lLeft() {
        startMove(lunLis[num], { 'left': iW });
        num = --num < 0 ? lunLis.length - 1 : num;
        // 为了无缝衔接一定要设置
        setCss(lunLis[num], 'left', -iW + 'px');
        startMove(lunLis[num], { 'left': 0 });
    };
    lunLeft.onclick = function () {
        // startMove(lunLis[num],{'left':iW});
        // num = --num<0?lunLis.length-1:num;
        // // 为了无缝衔接一定要设置
        // setCss(lunLis[num],'left',-iW+'px');
        // startMove(lunLis[num],{'left':0});
        if (new Date() - day > 500) {
            lLeft();
        }
        spanRoll();
    };

    lunRight.onclick = function () {
        if (new Date() - day > 500) {
            lunnext();
        }
        day = new Date();
        spanRoll();
    };
    var spanRoll = function spanRoll() {

        for (var i = 0; i < lunspans.length; i++) {
            for (var i = 0; i < lunspans.length; i++) {
                lunspans[i].className = "";
            }
            lunspans[num].className = "active";
        }
    };
    for (var j = 0; j < lunspans.length; j++) {
        lunspans[j].idx = j;
        lunspans[j].onclick = function () {
            if (num < this.idx) {
                for (var j = 0; j < lunspans.length; j++) {
                    lunspans[j].className = "";
                }
                startMove(lunLis[num], { 'left': -iW });
                setCss(lunLis[this.idx], 'left', iW + 'px');
                startMove(lunLis[this.idx], { 'left': 0 });
                lunspans[this.idx].className = "active";
            } else if (num > this.idx) {
                for (var j = 0; j < lunspans.length; j++) {
                    lunspans[j].className = "";
                }
                startMove(lunLis[num], { 'left': iW });
                setCss(lunLis[this.idx], 'left', -iW + 'px');
                startMove(lunLis[this.idx], { 'left': 0 });
                lunspans[this.idx].className = "active";
            }
            lunspans[this.idx].className = "active";
            num = this.idx;
        };
    }

    // lunbtn.onclick=(e)=>{

    //     if(e.target.tagName=='SPAN'){

    //         if(num<e.target.idx){
    //          startMove(lunLis[num],{'left':-iW});           
    //          setCss(lunLis[e.target.idx],'left',iW+'px');


    //         }
    //         if(num>e.target.idx){
    //             startMove(lunLis[num],{'left':iW});

    //             setCss(lunLis[e.target.idx],'left',-iW+'px');    
    //         }
    //         startMove(lunLis[e.target.idx],{'left':0});
    //         num =e.target.idx;
    //         spangun();
    //     }

    // }
};

/*
    ajax(method,url,data,fn)
    参数一：请求方式   get  和  post
    参数二：路径
    参数三：数据   name=malin&psw=12345
    参数四：成功的回调    回调函数
*/

function ajax(method, url, data, fn) {
    //1.创建对象
    var xhr = new XMLHttpRequest();
    //告诉对象，要什么
    if (method == 'get' && data) {
        //如果是get的方式，data接在url后面
        //如果请求的地址是同一个地址，浏览器自动缓存
        url = url + '?day=' + new Date() + '&' + data;
    }

    xhr.open(method, url, true);

    //2.发送请求
    if (method == 'get') {
        xhr.send(null);
    } else {
        //设置请求头
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }

    //3.3号线去后台制作

    //4.号线。接收数据，做渲染

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //个性需求
                if (fn) {
                    fn(xhr.responseText); //实参
                }
            } else {
                alert('出错了，因为：' + xhr.status); //404找不到
            }
        }
    };
};

// 
// $(function(){


// //1. 购物车下来菜单，显示或者隐藏
//     // console.log($('#shopping_cart i'));
//     $('#shopping_cart').mouseover(function(){

//         // $('#shopping_cart').css('background','');
//         // $('#shopping_cart i').css("background","url('../img/xiaomi_sprite_sheet.png') no-repeat -60px -50px");
//         $('#shopping_cart').css('background-color','#FF6700');
//         $('#shopping_cart span').css('color','#fff');

//         $('.shopping_cart').stop().slideDown(180);

//     });
//     $('#shopping_cart').mouseout(function(){
//         // $('#shopping_cart').css('background','');
//         // $('#shopping_cart i').css('background','url("../img/xiaomi_sprite_sheet.png") no-repeat -30px -50px');
//         $('#shopping_cart').css('background-color','');
//         $('#shopping_cart span').css('color','');
//         $('.shopping_cart').stop().slideUp(180);

//     });


//     //2.编辑搜索框高亮

//     $('.search_box').on('focus',function(){
//         $('.search_box').css('border-color','#FF6700');
//         $('.search_engine span').css('border-color','#FF6700');

//     });
//     $('.search_box').on('blur',function(){
//         $('.search_box').css('border-color','#000');
//         $('.search_engine span').css('border-color','#000');

//     });


//     //3. 下拉菜单,委托直接写子元素标签名即可
//     var lis = document.getElementsByClassName('nav_list')[0].getElementsByTagName('li');

//     var nav = document.getElementById('nav');
//     var products_box=document.getElementsByClassName('products_box')[0];
//     var nav_list=document.getElementsByClassName('nav_list')[0];

// for(var i=0;i<nav_list.children.length;i++){
//     nav_list.children[i].idx1=i;
//     nav_list.children[i].children[0].idx2=i;
// };

// var currentidx;
// var isok=false;
// nav.onmouseover=function(e){

//     if(e.target.className=='zidxshow'||e.target.className=='ashow'){

//         if(e.target.className=='zidxshow'){

//             currentidx=e.target.idx1;

//         } 
//         else if(e.target.className=='ashow'){

//             currentidx=e.target.idx2;
//         };


//         $('.products_box li').removeAttr('id');
//         $('.products_box').stop().slideDown(180);
//         $('.products_box').children().children().eq(currentidx).attr('id','zidx');

//         products_box.onmouseover=function(){
//             $('.products_box').stop().slideDown(180);
//                     // $('.products_box li').removeClass('zidx');
//                     $('.products_box li').removeAttr('id');
//                     $('.products_box .parent_li').eq(currentidx).attr('id','zidx');

//                 }; 


//             };
//     };
//     nav.onmouseout=function(e){
//             // console.log(e.target);
//             if(e.target.className=='zidxshow'||e.target.className=='ashow'){
//                 // console.log(9999);
//                 // products_box.style.display='none';
//                 $('.products_box').stop().slideUp(180); 
//                  products_box.onmouseout=function(){
//                 // products_box.style.display='none';
//                     $('.products_box').stop().slideUp(180); 
//                 }
//             };
//     };
//         // 5.类别选项卡
//     $('#xiaomi_inventory').on('mouseover','li',function(){
//         //console.log($(this));
//         $('.xiaomi_inventory').css('display','none');
//         //$(this).parent('li').children('.xiaomi_inventory').css('display','block');
//         $(this).children('.xiaomi_inventory').css('display','block');


//     });
//     $('#xiaomi_inventory').on('mouseout','li',function(){
//         //console.log('移出',$(this));

//          $('.xiaomi_inventory').css('display','none');
//         //console.log('移出')

//     });
//     // 全部商品品列表下拉菜单
//     $('#all_goods_list').mouseover(function(){

//         $('#xiaomi_inventory').css('display','block');
//     });
//     $('#all_goods_list').mouseout(function(){
//         $('#xiaomi_inventory').css('display','none');

//     });
// });