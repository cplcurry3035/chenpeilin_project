<?php
    // 链接公共部分
    include 'connect.php';


    //防止中文乱码
    header("content-type:text/html;charset=utf-8");


    // 参数
    $a = isset($_POST['a'])?$_POST['a']:'';
    $page_of_current = isset($_POST['currentpage'])?$_POST['currentpage']:'1';
    $qty = isset($_POST['qty'])?$_POST['qty']:'12';

    // 排序
    $switch=isset($_POST['isok_status'])?$_POST['isok_status']:'';








    //获取得到字符串后，字符串转对象
    // $currentpage    $qty    开始的idx
    //      1           5      0-4(5*(1-1))
    //      2           5      5-9
    //      3           5      10-14
    //      4           5      15-18
    //      5           5      20-24  
    //     count($content)
    //     count($contentArr) 


// 分页功能
    if($a=='list_render'){
        list_to_render($page_of_current,$qty);
        // list_to_render();

    };
    function list_to_render($page_of_current,$qty){
        global $conn;
        global $pageres;
        $pagesql = "SELECT * FROM orderprice_page" ;
        $pageres = $conn->query($pagesql);
        $pagerow = $pageres->fetch_all(MYSQLI_ASSOC);
        common_page($page_of_current,$qty,$pagerow);
        
    
    };

// 公共函数
    function common_page($page_of_current,$qty,$pagerow){
        $pagearr=array(
            "qty"=>$qty,
            "allLength"=>count($pagerow),
            "currentObj"=>array_slice($pagerow,$qty*($page_of_current-1),$qty)
        );
        // var_dump($pagearr);
        echo json_encode($pagearr,JSON_UNESCAPED_UNICODE);

    };



// 排序
    if($a=='order_price'){
        order_data($switch,$page_of_current,$qty);
    }
    function order_data($switch,$page_of_current,$qty){
        global $conn;
        global $pageres;
        if($switch=='true'){

            $pagesql = "SELECT * FROM orderprice_page ORDER BY price" ;
        


        }
        else if($switch=='false'){
            $pagesql = "SELECT * FROM orderprice_page ORDER BY price DESC" ;


        };
        $pageres = $conn->query($pagesql);
        $pagerow = $pageres->fetch_all(MYSQLI_ASSOC);
        common_page($page_of_current,$qty,$pagerow);

    };

// 排序后分页
if($a=='after_order'){
        order_page($page_of_current,$qty);
    }
    function order_page($page_of_current,$qty){
        common_page($page_of_current,$qty,$pagerow);

    };






?>
