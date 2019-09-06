//加载省
$(function(){
    var mobile=$("#mobile").html();
    //11位  18659576507
    var subStart=mobile.substring(0,3);
    var subEnd=mobile.substr(7,4);
    $("#mobile").html(subStart+"****"+subEnd);

    var areaId=$("#areaId").val();
    $.ajax({
        url:"/area/loadCurrentUserArea",
        data:{
            areaId:areaId
        },
        type:"post",
        dataType:"json",
        success:function(data){
            if(null!=data.provinceList && data.provinceList.length>0){
                var str="";var temp="";
                for(var i=0;i<data.provinceList.length;i++){
                    temp=data.provinceList[i];
                    if(temp.id==data.provinceId){
                        str+="<option value='"+temp.id+"' selected='selected'>"+temp.areaName+"</option>";
                    }else{
                        str+="<option value='"+temp.id+"'>"+temp.areaName+"</option>";
                    }
                }
                $("#province").html(str);
            }
            if(null!=data.cityList && data.cityList.length>0){
                var str="";var temp="";
                for(var i=0;i<data.cityList.length;i++){
                    temp=data.cityList[i];
                    if(temp.id==data.cityId){
                        str+="<option value='"+temp.id+"' selected='selected'>"+temp.areaName+"</option>";
                    }else{
                        str+="<option value='"+temp.id+"'>"+temp.areaName+"</option>";
                    }
                }
                $("#city").html(str);
            }
            if(null!=data.areaList && data.areaList.length>0){
                var str="";var temp="";
                for(var i=0;i<data.areaList.length;i++){
                    temp=data.areaList[i];
                    if(temp.id==data.areaId){
                        str+="<option value='"+temp.id+"' selected='selected'>"+temp.areaName+"</option>";
                    }else{
                        str+="<option value='"+temp.id+"'>"+temp.areaName+"</option>";
                    }
                }
                $("#area").html(str);
            }
        },error:function (error) {
            console.log("加载当前用户的省市县信息失败！");
        }
    });


    $("#province").change(function(){
        var pid=$(this).val();
        loadAllCity(pid);
    });

    $("#city").change(function(){
        var cid=$(this).val();
        loadAllArea(cid);
    });
    $("#area").change(function(){
        var aid=$(this).val();
        $("#areaId").val(aid);
    });

});
function loadAllProvince(proid) {
    $.ajax({
        url:"/area/findProvince",
        data:{},
        type:"post",
        dataType:"json",
        success:function(data){
            if(data){
                var str="";
                $(data).each(function(a,b){
                    str+="<option value='"+b.id+"'>"+b.areaName+"</option>";
                });
                $("#province").html(str);
            }else{
                alert("没有省的存在!")
            }
        },error:function (error) {
            alert("加载省失败！")
        }
    });
}
function loadAllCity(pid) {
    $.ajax({
        url:"/area/findCity",
        data:{
            pid:pid
        },
        type:"post",
        dataType:"json",
        success:function(data){
            if(data){
                $("#city").html("");
                $("#city").html("<option>--请选择--</option>");
                $("#area").html("");
                $("#area").html("<option>--请选择--</option>");
                $(data).each(function(a,b){
                    $("#city").append("<option value='"+b.id+"'>"+b.areaName+"</option>");
                });
            }else{
                alert("该省下没有市！")
            }
        },error:function (error) {
            alert("加载市失败！")
        }
    });
}

function loadAllArea(cid) {
    $.ajax({
        url:"/area/findArea",
        data:{
            cid:cid
        },
        type:"post",
        dataType:"json",
        success:function(data){
            if(data){
                $("#area").html("");
                $("#area").html("<option>--请选择--</option>");
                $(data).each(function(a,b){
                    $("#area").append("<option value='"+b.id+"'>"+b.areaName+"</option>");
                });
            }else{
                alert("该市下没有县区!")
            }
        },error:function (error) {
            alert("加载县区失败！")
        }
    })
}
function sendForm() {
    $("#userAccountForm").submit();
}

