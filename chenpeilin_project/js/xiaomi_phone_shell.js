"use strict";jQuery(function(c){function e(i){c(".shell_ul").html("");var t="";t+=i.currentObj.map(function(i){return"<li list-id='"+i.dataid+"'>\n                        <img src=\""+i.img+'" alt="" />\n                        <p>手机壳'+i.listname+"</p>\n                        <p>"+i.describe+"</p>\n                        <p>"+i.price+"元</p>\n                    </li>"}).join(""),c(".shell_ul").html(t)}var s=!1;fn=s?"order_price":"list_render",c.ajax({url:"../api/xiaomi_list_page.php",type:"POST",data:{a:"list_render",currentpage:1,qty:12,istrue_status:!1},async:!0,success:function(i){$res=c.parseJSON(i),console.log($res),e($res),function(i){var t=i.allLength,e=i.qty,s=Math.ceil(t/e);console.log(t,e,s);for(var a='<li class="prev tab"><</li>',r=0;r<s;r++)a+="<li data-this-id='"+(r+1)+"' class='this_li'>"+(r+1)+"</li>";a+='<li class="next tab">></li>',c("#page ul").html(a),c("#page ul li").eq(1).attr("id","active")}($res),c(".this_li").on("click",function(){c(".this_li").removeAttr("id","active"),c(this).attr("id","active");var i=c(this).attr("data-this-id");console.log(i),fn=s?"order_price":"list_render",c.ajax({url:"../api/xiaomi_list_page.php",type:"POST",data:{a:fn,currentpage:i,qty:12},async:!0,success:function(i){$res1=c.parseJSON(i),console.log($res1),e($res1)},error:function(i){console.log(i)}})}),c(".tab").on("click",function(){$this_active=c(this).parent().children("#active").attr("data-this-id"),console.log("一开始",$this_active),c(this).index()==c("#page ul li").length-1?$this_active<c(".this_li").length?$this_active++:$this_active>=c(".this_li").length&&($this_active=c(".this_li").length):0==c(this).index()&&(1<$this_active?$this_active--:1==$this_active&&($this_active=1)),c(".this_li").removeAttr("id","active"),c(".this_li").eq($this_active-1).attr("id","active"),console.log("最终",$this_active),fn=s?"order_price":"list_render",c.ajax({url:"../api/xiaomi_list_page.php",type:"POST",data:{a:fn,currentpage:$this_active,qty:12},async:!0,success:function(i){$res2=c.parseJSON(i),e($res2)},error:function(i){console.log(i)}})});var t=!0;c("#order_price").click(function(){console.log(666),s=!0,t?c("#order_price i").css("transform","rotate(180deg)"):c("#order_price i").css("transform","rotate(0deg)"),c.ajax({url:"../api/xiaomi_list_page.php",type:"POST",data:{a:"order_price",isok_status:t},async:!0,success:function(i){$res=c.parseJSON(i),e($res),t=!t},error:function(i){console.log(i)}})})},error:function(i){console.log(i)}})});