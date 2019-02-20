<?php
    /*
        连接数据库：操纵数据库
            * 写好配置信息
            * 检测是否连接成功
    */
    
    //中文乱码
    header("content-type:text/html;charset=utf-8");
    
    //配置信息
    $servername = 'localhost';//主机名
    $username = 'root';//登陆数据库的用户名
    $password = '';//如果用wamp就是为空，用phpstudy 密码是 root
    $dbname = 'chenpeilin_sql';//数据库名称
    //创建数据库连接(最后要关闭)
    $conn = new mysqli($servername,$username,$password,$dbname);
    
    
    if($conn->connect_error) {
        die('连接失败：'.$conn->connect_error);
    }
    // else{
        
    //     echo '成功连接数据库';
    // }   
?>