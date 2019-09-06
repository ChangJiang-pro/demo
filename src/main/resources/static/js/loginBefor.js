$(function() {
    $("#loginForm").submit(function () {
        var username = $("#loginForm input[name='username']").val();
        if (username == "" || username == null) {
            isError($("#loginForm input[name='username']"), "用户名不能为空！");
            return false;
        }
        //手机号正则
        var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        //电话
        var phone = $.trim(username);
        if (!phoneReg.test(phone)) {
            isError($("#loginForm input[name='username']"), "请输入有效的手机号码！");
            return false;
        }
        isOk($("#loginForm input[name='username']"), "用户名正确！");
        var password = $("#loginForm input[name='password']").val();
        if (password == "" || password == null) {
            isError($("#loginForm input[name='password']"), "密码不能为空！");
            return false;
        }
        if (password.length < 6) {
            isError($("#loginForm input[name='password']"), "密码的长度必须>=6！");
            return false;
        }
        isOk($("#loginForm input[name='password']"), "密码格式正确！");
        return true;

    });


});
function doregister(){
    if(validateRegisterForm()){
        $.ajax({
            url: "/user/register",//请求的action路径
            type:"post",
            data:$("#registerForm").serialize(),
            dataType:"json",
            error: function (error) {//请求失败处理函数
                console.log(error);
                alert('请求失败');
            },
            success:function(data){
                if(data){
                    alert("注册成功！");
                    $('#mynavtabs a:first').tab('show') // Select first tab
                }else{
                    alert("注册失败！");
                }
            }
        });
    }
}
function validateRegisterForm(){
    var rusername = $("#registerForm input[name='username']").val();
    if (rusername == "" || rusername == null) {
        isError($("#registerForm input[name='username']"), "用户名不能为空！");
        return false;
    }
    //手机号正则
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (!phoneReg.test($.trim(rusername))) {
        isError($("#registerForm input[name='username']"), "必须用手机号码注册！");
        return false;
    }
    isOk($("#registerForm input[name='username']"), "用户名正确！");

    //验证手机号码
    var iphone = $("#registerForm input[name='iphone']").val();
    if (!phoneReg.test($.trim(iphone))) {
        isError($("#registerForm input[name='iphone']"), "手机号码有误，请重新输入！");
        return false;
    }
    isOk($("#registerForm input[name='iphone']"), "手机号码正确！");

    //验证QQ
    var qq = $("#registerForm input[name='qq']").val();
    var reQQ = /^[1-9]\d{4,9}$/;
    if (!reQQ.test($.trim(qq))) {
        isError($("#registerForm input[name='qq']"), "QQ号码有误，请重新输入！");
        return false;
    }
    isOk($("#registerForm input[name='qq']"), "QQ号码正确！");

    //验证密码和确认密码
    var password = $("#registerForm input[name='password']").val();
    if (password == "" || password == null) {
        isError($("#registerForm input[name='password']"), "密码不能为空！");
        return false;
    }
    if (password.length < 6) {
        isError($("#registerForm input[name='password']"), "密码的长度必须>=6！");
        return false;
    }
    isOk($("#registerForm input[name='password']"), "密码格式正确！");

    var repassword = $("#registerForm input[name='repassword']").val();
    if(repassword!=password){
        isError($("#registerForm input[name='repassword']"), "确认密码和密码不一致，请重新输入！");
        return false;
    }
    isOk($("#registerForm input[name='repassword']"), "确认密码正确！");

    return true;
}