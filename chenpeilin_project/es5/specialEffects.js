'use strict';

// 弹窗
// boxWidth/boxHeight:窗口大小，自定义;str:窗口的内容
function popup(boxWidth, boxHeight, str, fend) {
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
        if (fend) {
            fend();
        }
    };
    No.onclick = function () {
        bodydiv.style.display = 'none';
        bodydiv.removeChild(div);
    };
};

//<script src="../specialEffects.js"></script>
// 点击Top回到顶端
// ele:传id名  backTop(top)
function backTop(ele) {
    window.onscroll = function () {
        if (window.scrollY > 1000) {
            ele.style.display = "block";
        } else if (window.scrollY <= 1000) {
            ele.style.display = "none";
        }
    };
    ele.onclick = function () {
        clearInterval(timer);
        var timer = setInterval(function () {
            var speed = parseInt(window.scrollY / 10);
            // 控制匀速
            if (speed <= 10) {
                speed = 8;
            }
            // scrollY才清除，认清判断对象
            if (window.scrollY <= 10) {
                clearInterval(timer);
            }
            // 不要用scrollTo  负数的时候有bug因为负数，滚动时间有bug
            window.scrollBy(0, -speed);
        }, 30);
    };
};

// 吸顶菜单
// ele:传id名  suckMenu(curry)
function suckMenu(ele) {
    window.onscroll = function () {
        if (window.scrollY > 200) {
            // css加上
            // .suckfixed{
            // position:fixed;
            // left: 0;
            // top: 0;
            // }
            ele.style.display = 'block';
            ele.className = "suckfixed";
        } else if (window.scrollY <= 200) {
            ele.className = "";
            ele.style.display = 'none';
        }
    };
};
// 综合版本  吸顶+回到顶部
function suck_top(suck, top) {
    window.onscroll = function () {
        if (window.scrollY > 200) {
            // css加上
            // .suckfixed{
            // position:fixed;
            // left: 0;
            // top: 0;
            // }
            suck.style.display = 'block';
            suck.className = "suckfixed";
        } else if (window.scrollY <= 200) {
            suck.className = "";
            suck.style.display = 'none';
        };
        if (window.scrollY > 1000) {
            top.style.display = "block";
            top.style.zIndex = "100";
        } else if (window.scrollY <= 1000) {
            top.style.display = "none";
        }
    };
    top.onclick = function () {
        clearInterval(timer);
        var timer = setInterval(function () {
            var speed = parseInt(window.scrollY / 10);
            // 控制匀速
            if (speed <= 10) {
                speed = 8;
            }
            // scrollY才清除，认清判断对象
            if (window.scrollY <= 10) {
                clearInterval(timer);
            }
            // 不要用scrollTo  负数的时候有bug因为负数，滚动时间有bug
            window.scrollBy(0, -speed);
        }, 30);
    };
}

// 遮罩
// ele : 传id 
function shade(elehidebox) {
    hidebox.onmouseover = function (e) {
        var e = e || e.target;
        startMove(e.target, { 'opacity': 30 });
    };
    hidebox.onmouseout = function (e) {
        var e = e || e.target;
        startMove(e.target, { 'opacity': 0 });
    };
};

// 遮罩向上
// ele : 传父元素id和遮罩的类名
function shadeUp(elelist, elep) {
    elelist.onmouseover = function (ev) {
        //鼠标经过
        var ev = ev || window.event;
        if (ev.target.tagName.toLowerCase() == 'li') {
            var now = ev.target.children[0];
        }
        if (ev.target.tagName.toLowerCase() == 'p') {
            var now = ev.target; //p
        }
        // 改定时器毫秒数
        startMove(now, { 'bottom': 0 });
    };
    elelist.onmouseout = function (ev) {
        //鼠标离开
        var ev = ev || window.event;
        if (ev.target.tagName.toLowerCase() == 'li') {
            var now = ev.target.children[0];
        }
        if (ev.target.tagName.toLowerCase() == 'p') {
            var now = ev.target; //p
        }
        startMove(now, { 'bottom': -50 });
    };
};

// 弹窗
// boxWidth/boxHeight:窗口大小，自定义;str:窗口的内容
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

//百度分享
//ele:id  share(father)
function share(elefather, elebtn) {
    elefather.onmouseover = function () {
        startMove(elefather, { 'right': 0 });
    };
    elefather.onmouseout = function () {
        startMove(elefather, { 'right': -100 });
    };
    elebtn.onclick = function () {
        elefather.style.display = 'none';
    };
};

// 表单验证
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
        var reg = /^[\u2E80-\u9FFF$]+/;
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

// 封装生成随机验证码：含有字母和数字，可以忽略大小写
function verificationCode() {
    var res = '';
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < 4; i++) {
        res += str.charAt(randomNumber(0, str.length - 1));
    }
    return res;
};

// 过滤敏感字符
function filter(str) {
    var sens = ['fuck', '草', 'sb', '尼玛', '小学生'];
    for (var i = 0; i < sens.length; i++) {
        var reg = new RegExp(sens[i], 'gi');
        str = str.replace(reg, '**');
    }
    return str;
}