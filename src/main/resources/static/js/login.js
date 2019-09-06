$(function () {
    $(document).keydown(function(event){
        if(event.keyCode==13){
            sendForm();
        }
    });
    $("#mobile").blur(function () {
        var phone=$(this).val();
        if(!(/^1[34578]\d{9}$/.test(phone))){
            setError($(this),"手机号码有误，请重填!");
        }else{
            if(!isExistMobile(phone)){
                setError($(this),"该手机号码不存在！");
            }else{
                setOk($(this));
            }
        }
    });
    $("#password").blur(function () {
        var password=$(this).val();
        if(!(/^\S{6,20}$/.test(password))){
            setError($(this),"密码由6-20位字母，数字和符号组合，区分大小写!");
        }else{
            setOk($(this));
        }
    });
    //刷新校验码
    $("#authImg").click(function () {
        $(this).attr("src","/user/autoImage?date=" + new Date());
    });
    //校验码的验证
    $("#codestext").blur(function () {
        var _that=$(this);
        $.ajax({
            type:"post",
            url:"/user/checkCodestext",
            data:{
                "codestext":$(this).val()
            },
            dataType:"json",
            error:function(error){
                setError(_that,"校验码不正确!");
            },success:function(data){
                if(data){
                    setOk(_that);
                }else{
                    setError(_that,"校验码不正确!");
                }
            }
        });
    });

});
//提交form表单
function sendForm() {

    if(verifyForm()){
        $("#loginForm").submit();
    }else{
        alert("页面输入有误，请修改后重新提交！");
    }
}
function verifyForm() {
    var flag=true;
    $("#loginForm .form-group").each(function(){
        if(!$(this).hasClass("has-success")&&!$(this).hasClass("has-error")){
            $(this).find(".form-control").trigger("blur");
        }
    });
    $("#loginForm .form-group").each(function(){
        if(!$(this).hasClass("has-success")){
            flag=false;
            return;
        }
    });
    return flag;
}

function isExistMobile(mobile){
    var flag=false;
    $.ajax({
        type:"post",
        url:"/user/getMoblie",
        data:{"mobile":mobile},
        dataType:"json",
        async:false,
        error:function(error){
            console.log("手机号码校验失败！");
        },success:function(data){
            flag=data;
        }
    });
    return flag;
}

function setOk(obj){
    var _pdiv=obj.parents().parents(".form-group");
    if(_pdiv.hasClass("has-error")){
        _pdiv.removeClass("has-error");
    }
    _pdiv.addClass("has-success");
    obj.parents().nextAll("span.help-block").html("&nbsp;");
}
function setError(obj,str){
    var _pdiv=obj.parents().parents(".form-group");
    if(_pdiv.hasClass("has-success")){
        _pdiv.removeClass("has-success");
    }
    _pdiv.addClass("has-error");
    obj.parents().nextAll("span.help-block").html(str);
}
