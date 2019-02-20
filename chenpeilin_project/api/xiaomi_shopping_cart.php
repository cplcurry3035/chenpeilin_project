<?php
    // 链接公共部分
    include 'connect.php';


    //防止中文乱码
    header("content-type:text/html;charset=utf-8");

    // 参数
    $a = isset($_POST['a'])?$_POST['a']:'';
    // $b = isset($_POST['b'])?$_POST['b']:'';
    $cid = isset($_POST['content_id'])?$_POST['content_id']:'';
    $phonename = isset($_POST['list_name'])?$_POST['list_name']:'';
    $firstimg = isset($_POST['host_img'])?$_POST['host_img']:'';
    $phonegift = isset($_POST['gift'])?$_POST['gift']:'';
    $currentprice = isset($_POST['price'])?$_POST['price']:'';
    $serve = isset($_POST['serveice'])?$_POST['serveice']:'';
    $mnum = isset($_POST['maxnum'])?$_POST['maxnum']:'';
    $phone_version = isset($_POST['version_phone'])?$_POST['version_phone']:'';
    $phone_color = isset($_POST['color_phone'])?$_POST['color_phone']:'';
    $buy_num = isset($_POST['buynum'])?$_POST['buynum']:'';

    // echo $cid,$phonename,$firstimg,$phonegift, $currentprice,$serve,$mnum,$phone_version,$phone_color;
    
    //跳转地址
    $list_addr=isset($_POST['addr'])?$_POST['addr']:'';

    // 购物车地址
    // $cart_addr=isset($_POST['cartaddr'])?$_POST['cartaddr']:'';
    



/********购物车页***********/

    // 当前商品id
    $current_cart_addr=isset($_POST['pieceid'])?$_POST['pieceid']:'';
    // 判断加减
    $choose_btn=isset($_POST['choose'])?$_POST['choose']:'';
    // 删除id
    $delete_thisid=isset($_POST['delete_list'])?$_POST['delete_list']:'';
    // 要删除的商品id(数组对象)
    $deletepartid=isset($_POST['delete_list_part'])?$_POST['delete_list_part']:'';

// 插入数据库
    if($a=='insert_cart'){
        insert_information($cid,$phonename,$firstimg,$currentprice,$phonegift,$serve,$mnum,$phone_version,$phone_color,$buy_num);

    }
    function insert_information($cid,$phonename,$firstimg,$currentprice,$phonegift,$serve,$mnum,$phone_version,$phone_color,$buy_num){
        global $conn;
        global $res;
        global $checkres;
        global $numres;
        global $maxres;
        $checksql="SELECT * FROM xiaomi_shoppingcart WHERE cid=$cid";
        $checkres=$conn->query($checksql);
        $checkrow = $checkres->fetch_all(MYSQLI_ASSOC);
        // var_dump($checkrow[0],$checkrow[0]['buyofnum']) ;
         // var_dump($checkrow,count($checkrow)) ;
        if(count($checkrow)>0){
            
            $update=$checkrow[0]['buyofnum']+1;
            $message_diff='更新成功';
            if($update>=$checkrow[0]['maxnumber']){
                $update=$checkrow[0]['maxnumber'];
                $message_diff='您已达到最大购买量';
                
            }
            
            
            $numsql="UPDATE xiaomi_shoppingcart SET buyofnum=$update WHERE cid=$cid";
            


            
           if($conn->query($numsql)){
             // echo '更新成功';
             // 返回数量最大值
            $maxsql="SELECT * FROM xiaomi_shoppingcart WHERE cid=$cid";
            $maxres=$conn->query($maxsql);
            $maxrow = $maxres->fetch_all(MYSQLI_ASSOC);

            // var_dump($maxrow);
             $cartarr = array(
                "code"=>1,
                "currentnum"=>$maxrow[0]['buyofnum'],
                "maxnum"=>$maxrow[0]['maxnumber'],
                "message"=> $message_diff
                );
                echo json_encode($cartarr,JSON_UNESCAPED_UNICODE);
           }
           else{
             // echo '更新失败';
             $cartarr = array(
                "code"=>0,
                "message"=>'更新失败'
                );
                echo json_encode($cartarr,JSON_UNESCAPED_UNICODE);
           }
            // var_dump($update) ;
           
            // $numres->close();

                

        }
        else if(count($checkrow)==0){
            // var_dump(666);
            $sql = "INSERT INTO xiaomi_shoppingcart (cid,listname,describe_img,present_price,gift,services,maxnumber,version_information,color,buyofnum)  VALUES ('$cid','$phonename','$firstimg','$currentprice','$phonegift','$serve','$mnum','$phone_version','$phone_color','$buy_num')";
            $res=$conn->query($sql);
            if($res){
                // 返回数量最大值
               $maxsql="SELECT * FROM xiaomi_shoppingcart WHERE cid=$cid";
               $maxres=$conn->query($maxsql);
               $maxrow = $maxres->fetch_all(MYSQLI_ASSOC);
                $cartarr = array(
                "code"=>1,
                "currentnum"=>$maxrow[0]['buyofnum'],
                "maxnum"=>$maxrow[0]['maxnumber'],
                "message"=>'成功加入购物车'
                );
                echo json_encode($cartarr,JSON_UNESCAPED_UNICODE);

            }
            else{
                // echo '加入购物车失败';
                $cartarr = array(
                "code"=>0,
                "message"=>'加入购物车失败'
                );
                echo json_encode($cartarr,JSON_UNESCAPED_UNICODE);

            };
            // $res->close();
            

        };
        // $checkres->close();


        //   $numres->close();
        // $res->close();
        // $checkres->close();
    };


// 跳转渲染
    if($a=='listrender'){
        list_to_render($list_addr);

    }
    function list_to_render($list_addr){
        global $conn;
        global $addrres;
        $addrsql="SELECT * FROM xiaomi_shoppingcart WHERE cid=$list_addr";
        $addrres=$conn->query($addrsql);
        $addrrow = $addrres->fetch_all(MYSQLI_ASSOC);
        // var_dump($addrres,$addrrow);
        echo json_encode($addrrow,JSON_UNESCAPED_UNICODE);


    };


// 购物车数据渲染 init
    if($a=='cartrender'){
        cart_to_render();
    }
    function cart_to_render(){
        global $conn;
        global $cartres;
        $cartsql="SELECT * FROM xiaomi_shoppingcart";
        $cartres=$conn->query($cartsql);
        $cartrow = $cartres->fetch_all(MYSQLI_ASSOC);
        // var_dump($cartrow);
        echo json_encode($cartrow,JSON_UNESCAPED_UNICODE);


    };

// 购物车加减
    if($a=='addordelete'&& $choose_btn=='1'){
        add_operate($current_cart_addr);
        // cart_to_render();
    }
    else if($a=='addordelete'&& $choose_btn=='0'){
         delete_operate($current_cart_addr);
    }
    // 加
    function add_operate($current_cart_addr){
        global $conn;
        global $adddeleteres;
        // 先查
        $adddeletesql="SELECT * FROM xiaomi_shoppingcart WHERE cid=$current_cart_addr";
        $adddeleteres=$conn->query($adddeletesql);
        $adddeleterow = $adddeleteres->fetch_all(MYSQLI_ASSOC);
        // 更新
        $update=$adddeleterow[0]['buyofnum']+1;
        $update_num=$adddeleterow[0]['maxnumber']-$update;
        if($update>=$adddeleterow[0]['maxnumber']){
            $update=$adddeleterow[0]['maxnumber'];
            $update_num='已到最大购买量';

        };
        
        $numsql="UPDATE xiaomi_shoppingcart SET buyofnum=$update WHERE cid=$current_cart_addr";

       if($conn->query($numsql)){
            // 返回数组进行渲染
            $adddeletearr = array(
                "max_num"=>$adddeleterow[0]['maxnumber'],
                "buy_num"=>$update,
                "updatenum"=>$update_num,
                "min_num"=>1
            );
            // var_dump(adddeletearr);
            echo json_encode($adddeletearr,JSON_UNESCAPED_UNICODE);

        }
    };
    // 减
    function delete_operate($current_cart_addr){
        global $conn;
        global $adddeleteres;
        // 先查
        $adddeletesql="SELECT * FROM xiaomi_shoppingcart WHERE cid=$current_cart_addr";
        $adddeleteres=$conn->query($adddeletesql);
        $adddeleterow = $adddeleteres->fetch_all(MYSQLI_ASSOC);
        // 更新
        $update=$adddeleterow[0]['buyofnum']-1;
        $update_num=$adddeleterow[0]['maxnumber']- $update;
        if($update<=1){
            $update=1;
        }
        
        $numsql="UPDATE xiaomi_shoppingcart SET buyofnum=$update WHERE cid=$current_cart_addr";
        if($conn->query($numsql)){
            // 返回数组进行渲染
            $adddeletearr = array(
                "max_num"=>$adddeleterow[0]['maxnumber'],
                "buy_num"=>$update,
                "updatenum"=>$update_num,
                "min_num"=>1
                  
            );
            // var_dump(adddeletearr);
            echo json_encode($adddeletearr,JSON_UNESCAPED_UNICODE);

        }
    };
// 删除当前
if($a=='delete_current_list'){
    delete_currentlist($delete_thisid);

};
function delete_currentlist($delete_thisid){
    global $conn;
    global $deleteres;
    global $lengthres;
    // 删除
    $deletesql="DELETE FROM xiaomi_shoppingcart WHERE cid=$delete_thisid";
    $deleteres=$conn->query($deletesql);
    // var_dump($deleteres);
    if($deleteres){
        $lengthsql="SELECT * FROM xiaomi_shoppingcart";
        $lengthres=$conn->query($lengthsql);
        $lengthrow = $lengthres->fetch_all(MYSQLI_ASSOC);
        // var_dump(count($lengthrow) );
        $deletearr=array(
            "present_length"=>count($lengthrow),
            "delete_status"=>'删除成功'
        );
        echo json_encode($deletearr,JSON_UNESCAPED_UNICODE);


    };
};

// 删除选中
if($a=='delete_part'){
    delete_part_list($deletepartid);
};
function delete_part_list($deletepartid){
    $partdeletearr=json_decode($deletepartid,true);
    global $conn;
    global $deleteres;
    global $lengthres;
    
    
    for($i=0;$i<count($partdeletearr);$i++){
        // var_dump ($partdeletearr[$i]);
        // 删除
        $deletesql="DELETE FROM xiaomi_shoppingcart WHERE cid=$partdeletearr[$i]";
        $deleteres=$conn->query($deletesql);
        // var_dump($deleteres);
    };
    if($deleteres){
        $lengthsql="SELECT * FROM xiaomi_shoppingcart";
        $lengthres=$conn->query($lengthsql);
        $lengthrow = $lengthres->fetch_all(MYSQLI_ASSOC);
        // var_dump(count($lengthrow) );
        $deletearr=array(
            "present_length"=>count($lengthrow),
            "delete_status"=>'删除成功'
        );
        // var_dump($deletearr);
        echo json_encode($deletearr,JSON_UNESCAPED_UNICODE);
    }
};

    


    


    //  关闭数据库
        $conn->close();
?>
