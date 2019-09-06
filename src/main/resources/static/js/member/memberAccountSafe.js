$(function() {

    var t = "${param.tab}";
    var tab = $("#tab").val();
    if ('email'== tab) {
       $("#myTabs li:eq(1) a").tab("show");
    }

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
    $("#messageCode").blur(function () {
        var _that=$(this);
        $.ajax({
            type:"post",
            url:"/user/doVirifyMessage",
            data:{
                "mobileCodes":$(this).val()
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


    $("#Remobile").blur(function () {
        var phone=$(this).val();
        if(!(/^1[34578]\d{9}$/.test(phone))){
            setError($(this),"手机号码有误，请重填!");
        }else{
            if(isExistReMobile(phone)){
                setError($(this),"该手机号码已存在！");
            }else{
                setOk($(this));
            }
        }
    });

    $("#RemessageCode").blur(function () {
        var _that=$(this);
        $.ajax({
            type:"post",
            url:"/user/doVirifyMessage",
            data:{
                "mobileCodes":$(this).val()
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

    $("#password").blur(function () {
        var password=$(this).val();
        if(!(/^\S{6,20}$/.test(password))){
            setError($(this),"密码由6-20位字母，数字和符号组合，区分大小写!");
        }else{
            if(!isExistPassword(password)){
                setError($(this),"密码不正确！");
            }else{
                setOk($(this));
            }
        }
    });

    $("#email").blur(function () {
        var email=$(this).val();
        var reg=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!(reg.test(email))){
            setError($(this),"邮箱格式不正确，请重新填入!");
        }else{
            setOk($(this));
        }
    });

})

//提交手机form表单
function sendForm() {
    if(verifyMobileForm()){
        $("#updateUserAccountMobileForm").submit();
    }else{
        alert("页面输入有误，请修改后重新提交！");
    }
}

//提交邮箱form表单
function sendEmailForm() {
    if(verifyEmailForm()){
        $("#userAccountEmailForm").submit();
    }else{
        alert("页面输入有误，请修改后重新提交！");
    }
}

function verifyMobileForm() {
    var flag=true;
    $("#updateUserAccountMobileForm .form-group").each(function(){
        if(!$(this).hasClass("has-success")){
            flag=false;
            return;
        }
    });
    return flag;
}

function verifyEmailForm() {
    var flag=true;
    $("#userAccountEmailForm .form-group").each(function(){
        if(!$(this).hasClass("has-success")){
            flag=false;
            return;
        }
    });
    return flag;
}


//发送短信验证码
function sendCode() {
    if(!$("#mobile").parent().parents(".form-group").hasClass("has-success")){
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
            }
        }
    });
}

//新手机发送短信验证码
function resendCode() {
    if(!$("#Remobile").parent().parents(".form-group").hasClass("has-success")){
        alert("请先输入正确的手机号码！");
        return;
    }
    var mobile=$("#Remobile").val();
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
            }
        }
    });
}
//和登录的session域里的手机号进行比较，正确返回true，否则返回false
function isExistMobile(mobile){
    var flag=false;
    var sessionMobile=$("#sessionMobile").val();

    if(mobile == sessionMobile){
        return true;
    }else{
        return flag;
    }
}

//如果手机号码存在，返回true，否则返回false
function isExistReMobile(mobile){
    var flag=false;
    $.ajax({
        type:"post",
        url:"/user/getMoblie",
        data:{"mobile":mobile},
        dataType:"json",
        async:false,
        error:function(error){
            console.log("获取手机号码失败！");
        },success:function(data){
            flag=data;
        }
    });
    return flag;
}

//和登录的session域里的密码进行比较，正确返回true，否则返回false
function isExistPassword(password){
    var sessionPassword=$("#sessionPassword").val();
    if(password == sessionPassword){
        return true;
    }else{
        return false;
    }
}


function setOk(obj){
    var _pdiv=obj.parent().parents(".form-group");
    if(_pdiv.hasClass("has-error")){
        _pdiv.removeClass("has-error");
    }
    _pdiv.addClass("has-success");
    obj.parent().nextAll().children("span.help-block").html("&nbsp;");
}
function setError(obj,str){
    var _pdiv=obj.parent().parents(".form-group");
    if(_pdiv.hasClass("has-success")){
        _pdiv.removeClass("has-success");
    }
    _pdiv.addClass("has-error");
    obj.parent().nextAll().children("span.help-block").html(str);
}