$(function(){
    //初始化页面时先去加载当前用户的公司信息
    $.ajax({
        type: "post",
        url: "/corporation/findCorporationInfo",
        dataType:"json",
        success: function(dat) {
           if(null!=dat){
               loadCorporationInfo(dat);
           }
        },error:function(){
            alert("获取公司信息失败！");
        }
    });
});

function loadCorporationInfo(data){
    console.log(data);
    for(var p in data){//遍历json对象的每个key/value对,p为key
        $("#id").val(data.id);
        $("#"+p).html(data[p]);
        $("#corporate").html(data.provinceName+"->"+data.cityName+"->"+data.areaName);
        $("#businessLicense").attr("src","/uploads/license/"+data.businessLicense);
        $("#logo").attr("src","/uploads/logo/"+data.logo);
    }
}
function tochangePersonal() {
    var idnum=$("#id").val();
    if(null==idnum || ""==idnum){
        window.location.href="/jsps/personal/changepersonal.jsp";
    }else{
        window.location.href="/corporation/changepersonal/"+idnum;
    }
}