$(function () {
    $.ajax({
        url:"/goods/loadAllGoods",
        type:"post",
        dataType:"json",
        success:function(data) {
            if(null!=data && data.length>0){
                var str="";
                for(var i=0;i<data.length;i++){
                   str+="<div class='goodsDiv'>";
                    str+="<input type='hidden' id='g" +
                        "c_id' value='"+data[i].id+"'>";
                    str+="<img class='goodsDetailImg' src='/system/showGoodsMainImage/"+data[i].albumName+"'>" +
                        " <div class='goodsDetail'>" +
                        "<div class='price-row1'>" +
                        "<div class='price'>" +
                        "<span>¥</span><strong>"+data[i].storePrice+"</strong>"+
                        "</div>" +
                        "<div class='deal-cnt'>286人付款</div>"+
                        "</div>";
                    str+="<div class='price-row2'>" +
                        "<a>"+data[i].goodsName+"</a>" +
                        "</div>"+
                        "<div class='price-row3'>"+
                        "<a>"+data[i].storeName+"</a>"+
                        "<div class='location'>"+data[i].secAreaVo.provinceName+"  "+data[i].secAreaVo.cityName+"</div>"+
                        "</div>"+
                        "</div>"+
                        "</div>";

                }
                $("#Widths").html(str);
            }

        }
    });

    jQuery("#Widths").on("click",".goodsDiv",function(){
        var id=$(this).children("#gc_id").val();
        location.href="/goods/goodsDetail/"+id;
        //location.href="/goods/goodsBrowsingHistory/"+id;
    })
})