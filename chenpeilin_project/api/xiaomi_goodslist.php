<?php
    // 链接公共部分
    include 'connect.php';


    //防止中文乱码
    header("content-type:text/html;charset=utf-8");


    // 参数
    $a = isset($_POST['a'])?$_POST['a']:'';


    // init初始化，数据渲染
    //明星产品
        $sql1 = "select * from xiaomi_goodslist where starid=201901" ;
        $res1 = $conn->query($sql1);
        $row1 = $res1->fetch_all(MYSQLI_ASSOC);
        // 小米产品
        $sql2 = "select * from xiaomi_goodslist where sortid=201900" ;
        $res2 = $conn->query($sql2);
        $row2 = $res2->fetch_all(MYSQLI_ASSOC);
        // 红米产品
        $sql3 = "select * from xiaomi_goodslist where sortid=201911" ;
        $res3 = $conn->query($sql3);
        $row3 = $res3->fetch_all(MYSQLI_ASSOC);
        // 把三个放进一个数组最后出来
        $all_listarr=array($row1,$row2,$row3
            );
        // var_dump($all_listarr);
        echo json_encode($all_listarr,JSON_UNESCAPED_UNICODE);
        $res1->close();
        $res2->close();
        $res3->close();

        //  关闭数据库
        $conn->close();
















?>