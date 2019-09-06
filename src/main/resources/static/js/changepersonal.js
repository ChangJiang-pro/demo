$(function(){
    //回显两个图片
    var licUrl=$("#changePersonalForm input[name='businessLicense']").val();
    if(licUrl!=null && licUrl!=""){
        $("#businessLicense").attr("src","/uploads/license/"+licUrl);
    }

    var logoUrl=$("#changePersonalForm input[name='logo']").val();
    if(logoUrl!=null && logoUrl!=""){
        $("#logo").attr("src","/uploads/logo/"+logoUrl);
    }

    //查询所有的省
    $.ajax({
        url: "/china/findAllProvince",//请求的action路径
        type:"post",
        dataType:"json",
        error: function (error) {//请求失败处理函数
            console.log(error);
            alert('请求失败');
        },
        success:function(data){
            if(null!=data && data.length>0){
                var pname=$("#provinceName").val();
                var str="<option value=\"0\">--请选择--</option>";
                for(var i=0;i<data.length;i++){
                    if(null!=pname && pname==data[i].name){
                        str+="<option value=\""+data[i].code+"\" selected=\"selected\">"+data[i].name+"</option>";
                    }else{
                        str+="<option value=\""+data[i].code+"\">"+data[i].name+"</option>";
                    }

                }
                $("#provinceCode").html(str);
            }
        }
    });

    $("#provinceCode").change(function(){
        $("#provinceName").val($(this).find("option:selected").text());
        $.ajax({
            url: "/china/findCityByPid/"+$(this).val(),//请求的action路径
            type:"post",
            dataType:"json",
            error: function (error) {//请求失败处理函数
                console.log(error);
                alert('请求失败');
            },
            success:function(data){
                if(null!=data && data.length>0){
                    var str="<option value=\"0\">--请选择--</option>";
                    for(var i=0;i<data.length;i++){
                        str+="<option value=\""+data[i].code+"\">"+data[i].name+"</option>";
                    }
                    $("#cityCode").html(str);
                }
            }
        });
    });

    $("#cityCode").change(function(){
        $("#cityName").val($(this).find("option:selected").text());
        $.ajax({
            url: "/china/findAreaByPid/"+$(this).val(),//请求的action路径
            type:"post",
            dataType:"json",
            error: function (error) {//请求失败处理函数
                console.log(error);
                alert('请求失败');
            },
            success:function(data){
                if(null!=data && data.length>0){
                    var str="<option value=\"0\">--请选择--</option>";
                    for(var i=0;i<data.length;i++){
                        str+="<option value=\""+data[i].code+"\">"+data[i].name+"</option>";
                    }
                    $("#areaCode").html(str);
                }
            }
        });
    });
    $("#areaCode").change(function(){
        $("#areaName").val($(this).find("option:selected").text());
    });
});

function uploadFile1(){
    var fd = new FormData($('#changePersonalForm')[0]);
    $.ajax({
        type: "post",
        url: "/imgs/uploadBusinessLicense",
        async: true,
        data: fd,
        processData: false,
        contentType: false,
        success: function(dat) {
            if(dat.flag){
                alert("营业执照上传成功！");
                $("#businessLicense").attr("src","/uploads/license/"+dat.fileName);
                $("#changePersonalForm input[name='businessLicense']").val(dat.fileName);
            }else{
                alert("营业执照上传失败！");
                console.log(dat.message);
            }
        },error:function(){
            alert("营业执照上传失败！");
        }
    });
}
function uploadFile2(){
    var fd = new FormData($('#changePersonalForm')[0]);
    $.ajax({
        type: "post",
        url: "/imgs/uploadLogo",
        async: true,
        data: fd,
        processData: false,
        contentType: false,
        success: function(dat) {
            if(dat.flag){
                alert("公司Logo上传成功！");
                $("#logo").attr("src","/uploads/logo/"+dat.fileName);
                $("#changePersonalForm input[name='logo']").val(dat.fileName);
            }else{
                alert("公司Logo上传失败！");
                console.log(dat.message);
            }
        },error:function(){
            alert("公司Logo上传失败！");
        }
    });
}


