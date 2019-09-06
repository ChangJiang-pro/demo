//
var ue = null;

(function ($) {
    $("#gotoStep22").hide();
    $("#gotoStep33").hide();

})(jQuery);


$(function () {
    initStep();
    checkColor();
   $("#select1").change(function(){
       var parentId=$("#select1").val();
       var GoodsName=$("#select1").find("option:selected").text();
       $("#GoodsName2").html(GoodsName);
       $.ajax({
         url:"/commondity/selectCommondity3?parentId="+parentId,
         type:"post",
         data:{},
         dataType:"json",
         success:function(data){
           var str="";var temp="";
           if(data!=null&data!=undefined){
               for(var i=0;i<data.length;i++){
                   temp=data[i];
                   str+="<option value='"+temp.id+"'>"+temp.className+"</option>";
               }
           }else{
               alert("任务失败。");
           }
           $("#select2").html(str);
       },error:function(){
           alert("任务异常。");
       }
   });
   })

    $("#select2").change(function(){
        var GoodsName=$("#select2").find("option:selected").text();
        var gcId=$("#select2").val();
        $("#gcId").val(gcId);
        $("#GoodsName3").html(GoodsName);
    })

    // 基本实例化:
    $('#demo').colorpicker();

    // Example using an event, to change the color of the .jumbotron background:
    $('#demo').on('change', function (event) {
        $('#demo').css('background-color', event.color.toString()).val('');
    });
});



function initStep() {
    $("#steps").step({

        stepNames: ['选择商品分类', '填写商品详细信息', '完成新增'],
        initStep: 1
    })
}

function previousStep() {
    $("#steps").step("previous");
}

function nextStep() {

    $("#steps").step("next");
    $("#gotoStep11").hide();
    $("#gotoStep22").show();
    ue=UE.getEditor('goodsDetails');
    var GoodsName2=$("#GoodsName2").html();
    var GoodsName3=$("#GoodsName3").html();
    $("#trueName").html(GoodsName2+">"+GoodsName3);
}

function gotoStep(step) {
    $("#steps").step("goto", step)
}

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

function submitImg(){
    //1.获取图片的数据
    var dataUrl=$("#GoodsMainImg").attr("src");
    //2.把二进制的图片数据转为Blob对象
    var blob = processData(dataUrl);
    var formData = new FormData();
    formData.append('GoodsMainImg', blob);
    $.ajax({
        //在controller方法中如何接收图片数据
        url: "/commondity/uploadGoodsMainImg",
        type:"post",
        dataType:"json",
        data:formData,
        processData: false,
        contentType: false,
        success:function(data){
            if(data.status){
                alert("上传完成");

                $("#goodsMainPhotoId").val(data.goodsMainPhotoId);
            }else{
                alert("上传失败");
            }
        }
    });
}

function bj() {
    previousStep();
    $("#gotoStep11").show();
    $("#gotoStep22").hide();
}
//提交
/*    gcId goodsName goodsPrice goodsFee storePrice goodsWeight goodsInventory
 emsTransTee expressTransFee mailTransFee seoKeywords goodsDetails
*/
function appendColor() {
    var color=$("#demo").css("background-color");
    var colorName=$("#colorName").val();
    $.ajax({
        type:"post",
        url:"/commondity/addColor",
        dataType:"json",
        data:{
            color:color,
            colorName:colorName
        },
        success:function(data){
            if(data){
                $("#goodsColor").html("");
                checkColor();
            }
        },error:function(){
            alert("执行异常！")
        }
    });
}

function insertGoods() {
    var content=UE.getEditor('goodsDetails').getContent();
    $.ajax({
        type:"post",
        url:"/commondity/addSecGoods",
        dataType:"json",
        data:$("#secgoods").serialize()+"&goodsDetails="+content,
        success:function(data){
            if(data){
                alert("添加商品完成");
                $("#steps").step("next");
                $("#gotoStep11").hide();
                $("#gotoStep22").hide();
                $("#gotoStep33").show();
            }else{
                alert("添加商品失败");
                window.location.reload();
            }
        },error:function(){
            alert("insertGoods执行异常！")
        }
    });
}
//拼接多选按钮颜色
function checkColor() {
    $.ajax({
        url:"/commondity/CheckColor",
        type: "post",
        dataType:"json",
        success: function (data) {
            if(data){
                var str="";
                $.each(data,function(a,b){
                    str+="<label style='display:inline-block;width: 120px;' class='checkbox-inline' ><input name='goodsProperty' type='checkbox' value='"+b.id+
                        "'><div style='display:inline-block;height: 11px;width: 11px;background-color: "+b.value+"'></div> "+b.name+"</label>"
                    if(a%3==2){
                        str+="<br>"
                    }
                })
                $("#goodsColor").append(str);
            }
        },
    });
}