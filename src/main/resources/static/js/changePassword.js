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
    //密码操作
    $("#password").focus(function () {
        $(this).val("");
        $("#rePassword").val("");
    });
    $("#password").blur(function () {
        var password=$(this).val();
        if(!(/^\S{6,20}$/.test(password))){
            setError($(this),"密码由6-20位字母，数字和符号组合，区分大小写!");
        }else{
            setOk($(this));
        }
    });
    //确认密码
    $("#rePassword").blur(function () {
        var password=$("#password").val();
        var rePassword=$(this).val();
        if(null!=rePassword && rePassword==password){
            setOk($(this));
        }else{
            setError($(this),"确认密码和密码不一致，请重新输入！");
        }
    });
    $("#messageCode").blur(function () {
        var _that=$(this);
        $.ajax({
            type:"post",
            url:"/user/doVirifyMessage",
            data:{"mobileCodes":$(this).val()},
            dataType:"json",
            error:function(error){
                setError(_that,"校验失败!");
            },success:function(data){
                if(data){
                    setOk(_that);
                }else{
                    setError(_that,"校验失败!");
                }
            }
        });
    });
});
//提交form表单
function sendForm() {
    if(verifyForm()){
        $("#changePasswordForm").submit();
    }else{
        alert("页面输入有误，请修改后重新提交！");
    }
}
function verifyForm() {
    var flag=true;
    $("#changePasswordForm .form-group").each(function(){
        if(!$(this).hasClass("has-success")){
            flag=false;
            return;
        }
    });
    return flag;
}
//发送短信验证码
function sendCode() {
    if(!$("#mobile").parents(".form-group").hasClass("has-success")){
        alert("请先输入正确的手机号码！");
        return;
    }
    var mobile=$("#mobile").val();
    $.ajax({
        type:"post",
        url:"/user/getPhoneMsg",
        data:{"mobile":mobile},
        dataType:"json",
        error:function(error){
            alert("短信发送失败！");
        },success:function(data){
            if(data){
                alert("短信发送成功，请查收！");
            }else{
                alert("短信发送失败！");
            }
        }
    });
}
//如果手机号码存在，返回true，否则返回false
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