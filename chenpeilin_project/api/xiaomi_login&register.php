
<?php
    // 陈培林  php_api



    // 链接公共部分
    include 'connect.php';


    //防止中文乱码
    header("content-type:text/html;charset=utf-8");



    // 接收参数(说明:$a,$b为门槛，$a->get方式,$b->post方式,用来判断,用来调用不同函数。其他是参数,变量)
    $a = isset($_POST['a'])?$_POST['a']:'';
    $b = isset($_GET['b'])?$_GET['b']:'';
    $register_uname = isset($_POST['registeruname'])?$_POST['registeruname']:'';   
    $login_uname = isset($_POST['username'])?$_POST['username']:'';
    $login_psw = isset($_POST['loginpsw'])?$_POST['loginpsw']:''; 
    $date = isset($_POST['loginavoid'])?$_POST['loginavoid']:'';  
    $tel = isset($_POST['tel'])?$_POST['tel']:'';
    $goodsId = isset($_GET['cid'])?$_GET['cid']:'';
    $offical_register_psw = isset($_POST['officalpsw'])?$_POST['officalpsw']:'';
    $offical_register_tel = isset($_POST['officaltel'])?$_POST['officaltel']:'';
    $offical_register_uname = isset($_POST['officaluname'])?$_POST['officaluname']:'';
    $register_retel = isset($_POST['retel'])?$_POST['retel']:'';
    $register_reuname = isset($_POST['reuname'])?$_POST['reuname']:'';
    


    //需求一: 用户登录($a='login'+$userName+$psw)
    if($a=='login'){
        loginUsername($login_uname,$login_psw,$date);
    };
    
    
    function loginUsername($login_uname,$login_psw,$date){
        global $conn;
        global $res1;
        global $res2;
        global $res_psw;
        // 中文用户名
        $sql1 = "select * from users where username='$login_uname'";       
        $res1 = $conn->query($sql1);
        $row1 = $res1->fetch_all(MYSQLI_ASSOC);
        // 手机号
        $sql2 = "select * from users where tellphone='$login_uname'";        
        $res2 = $conn->query($sql2);
        $row2 = $res2->fetch_all(MYSQLI_ASSOC);
        // 密码
        $sql_psw = "select * from users where  password='$login_psw'";        
        $res_psw = $conn->query($sql_psw);
        $row_psw = $res_psw->fetch_all(MYSQLI_ASSOC);
        // var_dump($row1,$row2,$row_psw);
        // var_dump($row[0]['uid']);   
        // if(count($row1)>0||count($row2)>0){
        //     // 验证成功，设置cookie
        //     if(count($row1)>0){
        //         setcookie('uid', $row1[0]['uid'], time() + 3600*24, '/');
        //         setcookie('username', $row1[0]['username'], time() + 3600*24, '/');

        //     };
        //     if(count($row2)>0){
        //         setcookie('uid', $row2[0]['uid'], time() + 3600*24, '/');
        //         setcookie('username', $row2[0]['username'], time() + 3600*24, '/');

        //     };
        //     $userarr = array(
        //         "code"=>1,
        //         "usernme"=>$login_uname,
        //         "message"=>'登录成功'
        //     );
        //     // var_dump($userarr);
        //     // 将关联数组(对象)转字符串，返回前端
        //      echo json_encode($userarr,JSON_UNESCAPED_UNICODE);
        // } 
        // else if(count($row1)==0&&count($row2)==0){
        //     $userarr = array(
        //         "code"=>0,
        //         "message"=>'登录失败'
        //     );
        //     echo json_encode($userarr,JSON_UNESCAPED_UNICODE);
        // }; 
        
        if(count($row1)>0||count($row2)>0){
            if(count($row_psw)>0){
                if(count($row1)>0){
                    setcookie('uid', $row1[0]['uid'], time() + 3600*$date, '/');
                    setcookie('username', $row1[0]['username'], time() + 3600*$date, '/');

                };
                if(count($row2)>0){
                    setcookie('uid', $row2[0]['uid'], time() + 3600*$date, '/');
                    setcookie('username', $row2[0]['username'], time() + 3600*$date, '/');

                };
                $userarr = array(
                    "code"=>1,
                    "message"=>$login_uname,
                    "login_status"=>'登录成功'
                    );
                echo json_encode($userarr,JSON_UNESCAPED_UNICODE);


            }
            else if(count($row_psw)==0){
                $userarr = array(
                    "code"=>2,
                    "message"=>'用户名和密码有误',
                     "login_status"=>'登录失败'
                    );
                echo json_encode($userarr,JSON_UNESCAPED_UNICODE);

            }

        }
        else if(count($row1)==0||ount($row2)==0){
            $userarr = array(
                "code"=>0,
                "message"=>'用户名和密码有误',
                 "login_status"=>'登录失败'
                );
            echo json_encode($userarr,JSON_UNESCAPED_UNICODE);
        
        };
        
        $res1->close();
        $res2->close();
        $res_psw->close();
    };


    //需求二: 用户退出($a='logout')
    if($a=='logout_removecookie'){
        logoutuser();
    };

    function  logoutuser(){
        if (!isset($_COOKIE['uid'])){
            $logoutarr = array(
                "code"=>0,
                "message"=>'请先登录'
            );
            echo json_encode($logoutarr,JSON_UNESCAPED_UNICODE);
            
        }
        else{
            setcookie('uid', '', time() - 3600*24*10, '/');
            $logoutarr = array(
                "code"=>1,
                "message"=>'退出成功'
            );
            echo json_encode($logoutarr,JSON_UNESCAPED_UNICODE);
            
        }
    };


    //需求三: 手机号注册
    if($a=='judgeTel'){
        judge_tel($tel);
    };
    function judge_tel($tel){
        $sql = "select * from users where tellphone='$tel'";
        global $conn;
        global $res;
        $res = $conn->query($sql);       
        $row = $res->fetch_all(MYSQLI_ASSOC);
        if(count($row)>0){
            $judgeTelarr = array(
                "code"=>0,
                "message"=>'手机号已被注册'
            );
            echo json_encode($judgeTelarr,JSON_UNESCAPED_UNICODE);

        }
        else if(count($row)==0){
            // INSERT INTO users(tellphone) VALUES ('13420107949');
            
            $judgeTelarr = array(
                "code"=>1,
                "message"=>'手机号可以注册'
            );
            echo json_encode($judgeTelarr,JSON_UNESCAPED_UNICODE);

        }

        $res->close();
        
    };


    // 需求四:昵称注册
    if($a=='judgeuname'){
        judge_uname($register_uname);
    };
    function judge_uname($register_uname){
        $sql = "select * from users where username='$register_uname'";
        global $conn;
        global $res;
        $res = $conn->query($sql);       
        $row = $res->fetch_all(MYSQLI_ASSOC);
        // var_dump($res);
        if(count($row)>0){
            $judgeunamearr = array(
                "code"=>0,
                "message"=>'昵称已被注册'
            );
            echo json_encode($judgeunamearr,JSON_UNESCAPED_UNICODE);

        }
        else if(count($row)==0){
            $judgeunamearr = array(
                "code"=>1,
                "message"=>'昵称可以注册'
            );
            echo json_encode($judgeunamearr,JSON_UNESCAPED_UNICODE);

        }

        $res->close();
        
    };

    // 需求五:注册成功
    if($a=='registersuccess'){
        register_to_success($offical_register_uname,$offical_register_psw,$offical_register_tel);
    };

    function register_to_success($offical_register_uname,$offical_register_psw,$offical_register_tel){
         global $conn;
         global $res;
         global $res1;

        $sql = "INSERT INTO users(username,password,tellphone) VALUES ('$offical_register_uname','$offical_register_psw','$offical_register_tel')";
        $res = $conn->query($sql); 
        // 设置cookie
        $sql1 = "select * from users where username='$offical_register_uname'";       
        $res1 = $conn->query($sql1);
        $row1 = $res1->fetch_all(MYSQLI_ASSOC);
        setcookie('uid', $row1[0]['uid'], time() + 3600*24, '/');
        setcookie('username', $row1[0]['username'], time() + 3600*24, '/');

       
        
        
        if($res){
            echo '插入成功';
        }
        else{
            echo '插入失败';
        }
        
    }


    // 需求六:途中修改手机号,昵称
    if($a=='rejudge1'){
        rejudge_tel($register_retel);

    };
    function rejudge_tel($register_retel){
        global $conn;
        $sql = "select * from users where tellphone='$register_retel'" ;       
        global $res;
        $res = $conn->query($sql);
        $row = $res->fetch_all(MYSQLI_ASSOC);

        if(count($row)>0){
            $retelarr = array(
                "code"=>0,
                "message"=>'手机号已被注册'
            );
            echo json_encode($retelarr,JSON_UNESCAPED_UNICODE);
            
        }
        else if(count($row)==0){
           $retelarr = array(
                "code"=>1,
                "message"=>'手机号可以注册'
            );
            echo json_encode($retelarr,JSON_UNESCAPED_UNICODE);
        }
    };


    if($a=='rejudge2'){
        rejudge_uname($register_reuname);

    };
    function rejudge_uname($register_reuname){
        global $conn;
        $sql = "select * from users where username='$register_reuname'" ;
        
        global $res;
        $res = $conn->query($sql);
        $row = $res->fetch_all(MYSQLI_ASSOC);

        if(count($row)>0){
            $reunamearr = array(
                "code"=>0,
                "message"=>'昵称已被注册'
            );
            echo json_encode($reunamearr,JSON_UNESCAPED_UNICODE);

        }
        else if(count($row)==0){
            $reunamearr = array(
                "code"=>1,
                "message"=>'昵称可以注册'
            );
            echo json_encode($reunamearr,JSON_UNESCAPED_UNICODE);
        }
    };
    
     
    
    //需求四: 列表页数据渲染
    // if(a==){
    //     datarender();

    // };
    // function datarender(){

    // };


    //需求五: 排序(传当前页,根据当前页进行排序)
    
    


    //需求六: 根据cid查找相对应对象,用于跳转详情页($b='correspondent_goods'+$goodsId)
    if($b=='correspondent_goods'){
        find_goods($goodsId);
    };

    function find_goods($goodsId){
        $sql = "select * from goodslist where cid=$goodsId";
        global $conn;
        global $res;
        $res = $conn->query($sql); 
        $row = $res->fetch_all(MYSQLI_ASSOC);
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
        $res->close();
    };


    












     $conn->close();

?>