jQuery(function(){
	   
	   //导航一级菜单的展开和隐藏
	   
	    $("#a_sw_nav").mouseover(function(){
			$("#all_nav").show();
		});
		$("#a_sw_nav").mouseout(function(){
			$("#all_nav").hide();
		});
	   //导航二级菜单的展开和隐藏
    jQuery("#all_nav").on("mouseover mouseout",".i_list",function(event){
        if(event.type == "mouseover"){
            var child_count = jQuery(this).attr("child_count");
            if(child_count>0){
                var id=jQuery(this).attr("id");
                jQuery("#child_"+id).show();
                //根据id查询二级和三级菜单
                loadThreeLevelGoodsClassById(id);
            }
        }else if(event.type == "mouseout"){
            var child_count = jQuery(this).attr("child_count");
            if(child_count>0){
                var id=jQuery(this).attr("id");
                jQuery("#child_"+id).hide();
            }
        }
  })
	//加载一级和二级分类菜单
	loadSecondGoodsClass();
  });
//加载一级和二级分类菜单
function loadSecondGoodsClass() {
    jQuery.ajax({
        type:"post",
        url:"/goodsClass/loadSecondGoodsClass",
        dataType:"json",
        error:function(error){
            console.log("二级菜单获取失败！");
        },success:function(data){
             if(null!=data && data.length>0){
             	var str="";
             	for(var i=0;i<data.length;i++){
                     str+=" <div class=\"i_list\" id=\""+data[i].id+"\" style=\"cursor:pointer;top:0px;\" child_count=\""+data[i].subList.length+"\">";
                     str+="<div class=\"li_nbv\" style=\"display: none;\"></div>";
                     str+="<h2><a href=\"#\">"+data[i].className+"</a></h2>";
                    str+="<p class=\"il\">";
                    if(data[i].subList.length>0){
                    	for(var j=0;j<data[i].subList.length;j++){
                    		var temp=data[i].subList[j];
                    		var br="";
                    		if((j+1)%4==0){
                                br="<br/>";
                            }else{
                                br="";
                            }
                    		str+="<a href=\"#\" target=\"_blank\">"+temp.className+"</a>"+br;
						}
					}
                    str+="</p>";
                    str+="<div class=\"shop_left_btn_layer\" id=\"child_"+data[i].id+"\" style=\"width: 0px;display: none;\">";
                    str+="</div>";
                     str+="</div>"
				}
				$("#all_nav").html(str);
			 }
        }
    });
}
//根据一级菜单id查询二级和三级菜单
function loadThreeLevelGoodsClassById(id) {
	jQuery.ajax({
        type:"post",
        url:"/goodsClass/showThreeLevelGoodsClassById/"+id,
        dataType:"json",
        error:function(error){
            console.log("三级菜单获取失败！");
        },success:function(data){
            if(null!=data && data.length>0){
                var str="<div class=\"shop_left_btn_layer_right\" style=\"left:204px;\">";
                for(var i=0;i<data.length;i++){
                    str+="<div class=\"shop_left_one\">";
                    str+="<div class=\"shop_left_btn_layer_tit\">\n" +
                        "<span>\n" +
                        "<a href=\"\" target=\"_blank\">"+data[i].className+"</a>\n" +
                        "</span>\n" +
                        "</div>";
                    str+=" <div class=\"shop_left_btn_layer_con\">\n" +
                        " <dl>\n" +
                        " <dd>" ;
                        if(data[i].subList.length>0){
                        	for(var j=0;j<data[i].subList.length;j++){
                        		var temp=data[i].subList[j];
                        		str+="<a href=\"\" target=\"_blank\">"+temp.className+"</a>";
							}
						}
                    str+=" <div class=\"clear\"></div></dd>\n" +
                        "  </dl>\n" +
                        " </div>"
                    str+="</div>";
                }
                str+="</div>";
                $("#child_"+id).html(str);
            }
        }
	});
}