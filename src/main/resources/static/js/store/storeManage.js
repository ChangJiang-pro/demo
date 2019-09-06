$(function () {
    var scId=$("#scId").val();
    if(scId!=null){
        loadGoodsClassByscId(scId);
        $("#goodsClass").change(function(){
            var gid=$(this).val();
            $("#scId").val(gid);
        });
    }else{
        loadGoodsClass();
        $("#goodsClass").change(function(){
            var gid=$(this).val();
            $("#scId").val(gid);
        });
    }
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
                var temp="";
                for(var i=0;i<data.provinceList.length;i++){
                    temp=data.provinceList[i];
                    if(temp.id==data.provinceId){
                        $("#province").html(temp.areaName);
                    }
                }
              
            }
            if(null!=data.cityList && data.cityList.length>0){
               var temp="";
                for(var i=0;i<data.cityList.length;i++){
                    temp=data.cityList[i];
                    if(temp.id==data.cityId){
                        $("#city").html(temp.areaName);
                    }
                }
            }
            if(null!=data.areaList && data.areaList.length>0){
               var temp="";
                for(var i=0;i<data.areaList.length;i++){
                    temp=data.areaList[i];
                    if(temp.id==data.areaId){
                        $("#area").html(temp.areaName);
                    }
                }

            }
        },error:function (error) {
            console.log("加载当前用户的省市县信息失败！");
        }
    });

                        // 百度地图API功能
                        var storeLng= $("#storeLng").val();
                        var storeLat= $("#storeLat").val();
                        var storeName= $("#storeName").val();
                        var map = new BMap.Map("container");  // 创建Map实例
                        var point = new BMap.Point(storeLng,storeLat);//声明一个点
                        map.centerAndZoom(point, 15);//设置地图的中心点和放大倍数
                        var marker = new BMap.Marker(point);// 创建标注
                        map.addOverlay(marker);             // 将标注添加到地图中
                        var label = new BMap.Label(storeName,{offset:new BMap.Size(20,-10)});
                        marker.setLabel(label);
                        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放




})

//点击
var clickImg = function(obj){
    $(obj).parent().find('.upload_input').click();
}
//删除
var deleteImg = function(obj){
    $(obj).parent().find('input').val('');
    $(obj).parent().find('img.preview').attr("src","");
    //IE9以下
    $(obj).parent().find('img.preview').css("filter","");
    $(obj).hide();
    $(obj).parent().find('.addImg').show();
}
//选择图片
function change(file) {
    //预览
    var pic = $(file).parent().find(".preview");
    //添加按钮
    var addImg = $(file).parent().find(".addImg");
    //删除按钮
    var deleteImg = $(file).parent().find(".delete");

    var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();

    // gif在IE浏览器暂时无法显示
    if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
        if (ext != '') {
            alert("图片的格式必须为png或者jpg或者jpeg格式！");
        }
        return;
    }
    //判断IE版本
    var isIE = navigator.userAgent.match(/MSIE/)!= null,
        isIE6 = navigator.userAgent.match(/MSIE 6.0/)!= null;
    isIE10 = navigator.userAgent.match(/MSIE 10.0/)!= null;
    if(isIE && !isIE10) {
        file.select();
        var reallocalpath = document.selection.createRange().text;
        // IE6浏览器设置img的src为本地路径可以直接显示图片
        if (isIE6) {
            pic.attr("src",reallocalpath);
        }else{
            // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
            pic.css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + reallocalpath + "\")");
            // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
            pic.attr('src','data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
        }
        addImg.hide();
        deleteImg.show();
    }else {
        html5Reader(file,pic,addImg,deleteImg);
    }
}
//H5渲染
function html5Reader(file,pic,addImg,deleteImg){
    var file = file.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
        pic.attr("src",this.result);
    }
    addImg.hide();
    deleteImg.show();
}

/* 使用二进制方式处理dataUrl */
function processData(dataUrl) {
    var binaryString = window.atob(dataUrl.split(',')[1]);
    var arrayBuffer = new ArrayBuffer(binaryString.length);
    var intArray = new Uint8Array(arrayBuffer);
    for (var i = 0, j = binaryString.length; i < j; i++) {
        intArray[i] = binaryString.charCodeAt(i);
    }

    var data = [intArray],
        blob;

    try {
        blob = new Blob(data);
    } catch (e) {
        window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
        if (e.name === 'TypeError' && window.BlobBuilder) {
            var builder = new BlobBuilder();
            builder.append(arrayBuffer);
            blob = builder.getBlob(imgType); // imgType为上传文件类型，即 file.type
        } else {
            console.log('版本过低，不支持上传图片');
        }
    }
    return blob;
}
function submitImg(){
    //1.获取图片的数据
    var dataUrl=$("#storeLogo").attr("src");
    //2.把二进制的图片数据转为Blob对象
    var blob = processData(dataUrl);
    var formData = new FormData();
    formData.append('storeLogoImg', blob);
    $.ajax({
        url:"/store/uploadStoreLogoImg",
        method: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if(data.status){
                alert("上传成功");
                window.location.reload();
            }else{
                alert("上传失败");
            }
        },
        error: function () {
            console.log('Upload error');
        }
    });
}

function loadGoodsClassByscId(scId) {
    $.ajax({
        url:"/goods/loadGoodsClass",
        data:{},
        type:"post",
        dataType:"json",
        success:function(data){
            if(null!=data && data.length>0 ){
                var str="";var temp="";
                for(var i=0;i<data.length;i++){
                    temp=data[i];
                    if(temp.id==scId){
                        str+="<option value='"+temp.id+"' selected='selected'>"+temp.className+"</option>";
                    }else{
                        str+="<option value='"+temp.id+"'>"+temp.className+"</option>";
                    }
                }
                $("#goodsClass").html(str);
            }
        },error:function (error) {
            console.log("加载店铺类型信息失败！");
        }
    });
}

function loadGoodsClass() {
    $.ajax({
        url:"/goods/loadGoodsClass",
        data:{},
        type:"post",
        dataType:"json",
        success:function(data){
            if(null!=data && data.length>0 ){
                $(data).each(function (a,b) {
                    $("#goodsClass").append("<option value='"+b.id+"'>"+b.className+"</option>");
                })
            }
        },error:function (error) {
            console.log("加载店铺类型信息失败！");
        }
    });
}

function showSeclect() {
    $("#seclect").css("display","none");
    var htr="";
    htr+="<div class=\"col-sm-2\">\n" +
        "                        <select class=\"form-control\" id=\"province1\">\n" +
        "                            <option>--请选择--</option>\n" +
        "                        </select>\n" +
        "                    </div>\n" +
        "                    <div class=\"col-sm-2\">\n" +
        "                        <select class=\"form-control\" id=\"city1\">\n" +
        "                            <option>--请选择--</option>\n" +
        "                        </select>\n" +
        "                    </div>\n" +
        "                    <div class=\"col-sm-2\">\n" +
        "                        <select class=\"form-control\" id=\"area1\">\n" +
        "                            <option>--请选择--</option>\n" +
        "                        </select>\n" +
        "                    </div>";
    $("#select").html(htr);

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
                $("#province1").html(str);
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
                $("#city1").html(str);
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
                $("#area1").html(str);
            }
        },error:function (error) {
            console.log("加载当前用户的省市县信息失败！");
        }
    });
    $("#province1").change(function(){
        var pid=$(this).val();
        loadAllCity(pid);
    });

    $("#city1").change(function(){
        var cid=$(this).val();
        loadAllArea(cid);
    });
    $("#area1").change(function(){
        var aid=$(this).val();
        $("#areaId").val(aid);
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
                $("#city1").html("");
                $("#city1").html("<option>--请选择--</option>");
                $("#area1").html("");
                $("#area1").html("<option>--请选择--</option>");
                $(data).each(function(a,b){
                    $("#city1").append("<option value='"+b.id+"'>"+b.areaName+"</option>");
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
                $("#area1").html("");
                $("#area1").html("<option>--请选择--</option>");
                $(data).each(function(a,b){
                    $("#area1").append("<option value='"+b.id+"'>"+b.areaName+"</option>");
                });
            }else{
                alert("该市下没有县区!")
            }
        },error:function (error) {
            alert("加载县区失败！")
        }
    })
}
function sendStoreManageForm() {
    $("#storeManageForm").submit();
}


//上传店铺轮播图
function sendStoreSlide(){
    //1.获取图片的数据
    var dataUrl1=$("#storeSlide1").attr("src");
    var dataUrl2=$("#storeSlide2").attr("src");
    var dataUrl3=$("#storeSlide3").attr("src");
    //2.把二进制的图片数据转为Blob对象
    var blob1 = processData(dataUrl1);
    var blob2 = processData(dataUrl2);
    var blob3 = processData(dataUrl3);
    var formData = new FormData();
    formData.append('storeSlideImg', blob1);
    formData.append('storeSlideImg', blob2);
    formData.append('storeSlideImg', blob3);
    $.ajax({
        url:"/store/uploadStoreSlideImg",
        method: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if(data.status){
                alert("上传成功");
                window.location.reload();
            }else{
                alert("上传失败");
            }
        },
        error: function () {
            console.log('Upload error');
        }
    });
}
function sendMapForm() {
    var storeLng= $("#storeLng").val();
    var storeLat= $("#storeLat").val();
    var id= $("#id").val();
    $.ajax({
        url:"/store/updateMap",
        data:{
            storeLng:storeLng,
            storeLat:storeLat,
            id:id
        },
        type:"post",
        dataType:"json",
        success: function (data) {
            if(data){
                alert("提交成功");
                window.location.reload();
            }else{
                alert("提交失败");
            }
        },
        error: function () {
            console.log('Upload error');
        }
    });

}