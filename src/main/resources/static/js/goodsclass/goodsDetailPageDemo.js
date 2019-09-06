var ue = null;
$(function () {

    ue=UE.getEditor('myEditor');
    var id=$("#colorProperty").val();
    $.ajax({
        url:"/goods/goodsDetailLoadColor/"+id,
        type:"post",
        dataType:"json",
        success:function(data) {
            if(null!=data && data.length>0){
                var str="";
                for(var i=0;i<data.length;i++){
                  str+="<div class='goodsColorProperty' style='background-color:"+ data[i].value+"' title='"+data[i].name+"'></div>";
                }
                $("#colorDiv").html(str);
                checkColor();
            }
        }
    });


    
})

function checkColor() {
    $("#colorDiv").on("click",".goodsColorProperty",function () {
         $("#colorDiv .goodsColorProperty").each(function(){
             if($(this).hasClass("selected")){
                 $(this).removeClass("selected");
             }
         });
        $(this).addClass("selected");
    })
}

function addBuyCarts() {
    //获取属性信息
    var goodsPropertyDom = $("#colorDiv .goodsColorProperty.selected");

    if(typeof goodsPropertyDom == 'undefined' || goodsPropertyDom.length == 0){
        alert("请选择商品属性！");
        return;
    }
   var goodsProperty = goodsPropertyDom.attr("title");

    var count=$("#goodCount").val();

    $.ajax({
        url:"/goods/addBuyCarts",
        type:"post",
        dataType:"json",
        data:$("#goodsBuyCartForm").serialize()+"&goodsProperty="+goodsProperty+"&count="+count,
        success:function(data) {
            if(data.flag){
                alert("添加成功");
                location.reload();
            }else{
                alert("添加购物车失败")
            }
        }
    });
}