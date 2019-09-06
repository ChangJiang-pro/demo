$(function () {
    $.ajax({
        url:"/system/findStoreLogoImage",
        data:{},
        type:"post",
        dataType:"json",
        success:function(data){
            if(data.status){
                if(data.logoImg!=null){
                    $("#storeLogoImage").attr("src","/system/showStoreLogoImage/"+data.logoImg);
                }
            }
        },error:function (error) {
            alert("加载失败！")
        }
    });

    $.ajax({
        url:"/system/findStoreSlideImage",
        data:{},
        type:"post",
        dataType:"json",
        success:function(data){
            if(data.status){
                if(data.storeSlideImg!=null){
                    $(".item img").each(function(){
                        for(var i=0;i<data.storeSlideImg.length;i++){
                            $("#storeSlideImage1").attr("src","/system/showStoreSlideImg/"+data.storeSlideImg[0]);
                            $("#storeSlideImage2").attr("src","/system/showStoreSlideImg/"+data.storeSlideImg[1]);
                            $("#storeSlideImage3").attr("src","/system/showStoreSlideImg/"+data.storeSlideImg[2]);
                        }
                    });

                }
            }
        },error:function (error) {
            alert("加载失败！")
        }
    });
});