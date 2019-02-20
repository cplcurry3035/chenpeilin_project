<?php
    // 链接公共部分
    include 'connect.php';


    //防止中文乱码
    header("content-type:text/html;charset=utf-8");


    // 参数
    $a = isset($_POST['a'])?$_POST['a']:'';
    $dataid=isset($_POST['dataid'])?$_POST['dataid']:'';

    // 具体商品查询
    if($a=='foundById'){
        found_currentlist($dataid);
    };
    function found_currentlist($dataid){
        global $conn;
        global $res; 
        $sql = "select * from xiaomi_goodslist where cid=$dataid" ;
        $res = $conn->query($sql);
        $row = $res->fetch_all(MYSQLI_ASSOC);
        // var_dump($row);
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
        $res->close();

    };
    
    








    //  关闭数据库
    $conn->close();
















?>