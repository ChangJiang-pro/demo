$(function(){

    $("#inputusername").blur(function(){
        //校验用户名
        checkUserName();
    });
    $("#inputPassword").blur(function(){
        //校验密码
        checkPassword();
    });
    $("#inputPassword2").blur(function(){
        //校验两次密码一致
        checkRepassword();
    });
    $("#Regestemail").blur(function(){
        //校验邮箱
        checkMail();
    });
    $("#RegestVerifcode").blur(function(){
        //校验邮箱
        checkVerifcode();
    });
})
/* Created by Microsoft on 2017/4/19.*/

function validateForm(){
    if(checkUserName()&&checkPassword()&&checkRepassword()&&checkMail()&&checkVerifcode()){
        $('#msg_tips_user').html("恭喜您！注册成功！");
    }
}

//验证用户名（限6~18个字符，支持中英文、数字、减号或下划线）
function checkUserName(){
    var name = $("input[name='userName']").val();
    var nameRegex = /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{6,18}$/;
    if	(name == ''){
        $("#has-status-user").addClass("has-error");
        $("#sign-status-user").addClass("glyphicon-remove");
        // 追加样式
        $('#msg_tips_user').html("用户名不能为空");
    }else if(!nameRegex.test(name)){
        $("#has-status-user").addClass("has-error");
        $("#sign-status-user").addClass("glyphicon-remove");
        // 追加样式
        $('#msg_tips_user').html("限6~18个字符，支持中英文、数字、减号或下划线");
        //$("#inputusername").focus();
    }else{
        $("#has-status-user").removeClass("has-error");
        $("#sign-status-user").removeClass("glyphicon-remove");
        $("#has-status-user").addClass("has-success");
        $("#sign-status-user").addClass("glyphicon-ok");
        $('#msg_tips_user').html("");
        //$("#inputPassword").focus();
        return true;
    }

}
//验证密码（长度在8个字符到16个字符）
function checkPassword(){
    var password = $("input[name='passWord']").val();
    //$("#passwordInfo").innerHTML="";
    //密码长度在8个字符到16个字符，由字母、数字和".""-""_""@""#""$"组成
    //var passwordRegex=/^[0-9A-Za-z.\-\_\@\#\$]{8,16}$/;
    //密码长度在8个字符到16个字符，由字母、数字和"_"组成
    var passwordRegex = /^[0-9A-Za-z_]\w{7,15}$/;
    if	(password == ''){
        $("#has-status-pass").addClass("has-error");
        $("#sign-status-pass").addClass("glyphicon-remove");
        // 追加样式
        $('#msg_tips_pass').html("密码不能为空");
    }else if(!passwordRegex.test(password)){
        $("#has-status-pass").addClass("has-error");
        $("#sign-status-pass").addClass("glyphicon-remove");
        $('#msg_tips_pass').html("密码长度必须在8个字符到16个字符之间");
        //$("#inputusername").focus();
    }else{
        $("#has-status-pass").removeClass("has-error");
        $("#sign-status-pass").removeClass("glyphicon-remove");
        $("#has-status-pass").addClass("has-success");
        $("#sign-status-pass").addClass("glyphicon-ok");
        $('#msg_tips_pass').html("");
        //$("#inputusername2").focus();
        return true;
    }
}
//验证校验密码（两次密码一致）
function checkRepassword(){
    var repassword = $("input[name='passWord2']").val();
    var password = $("input[name='passWord']").val();
    //校验密码和上面密码必须一致
    if (repassword == ''){
        $("#has-status-pass2").addClass("has-error");
        $("#sign-status-pass2").addClass("glyphicon-remove");
        $('#msg_tips_pass2').html("确认密码不能为空");
    }else if(repassword !== password ){
        $("#has-status-pass2").addClass("has-error");
        $("#sign-status-pass2").addClass("glyphicon-remove");
        $('#msg_tips_pass2').html("两次输入的密码不一致");
    }else{
        $("#has-status-pass2").removeClass("has-error");
        $("#sign-status-pass2").removeClass("glyphicon-remove");
        $("#has-status-pass2").addClass("has-success");
        $("#sign-status-pass2").addClass("glyphicon-ok");
        $('#msg_tips_pass2').html("");
        return true;
    }
}
function checkMail() {
    var mail = $("input[name='E_mail']").val();
    var mailRegex  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (mail == ''){
        $("#has-status-email").addClass("has-error");
        $("#sign-status-email").addClass("glyphicon-remove");
        $('#msg_tips_email').html("邮箱不能为空");
    }else if(!mailRegex.test(mail)){
        $("#has-status-email").addClass("has-error");
        $("#sign-status-email").addClass("glyphicon-remove");
        $('#msg_tips_email').html("您的邮箱填写不正确!");
    }else {
        $("#has-status-email").removeClass("has-error");
        $("#sign-status-email").removeClass("glyphicon-remove");
        $("#has-status-email").addClass("has-success");
        $("#sign-status-email").addClass("glyphicon-ok");
        $('#msg_tips_email').html("");
        return true;
    }
}
function checkVerifcode(){
    var code = $("input[name='Verifcode']").val();
    var codeLength = 4;//验证码的长度
    if (code == ''){
        $("#has-status-Verifcode").addClass("has-error");
        $("#sign-status-Verifcode").addClass("glyphicon-remove");
        $('#msg_tips_Verifcode').html("请输入验证码!");
    }else{
        $("#has-status-Verifcode").removeClass("has-error");
        $("#sign-status-Verifcode").removeClass("glyphicon-remove");
        $("#has-status-Verifcode").addClass("has-success");
        $("#sign-status-Verifcode").addClass("glyphicon-ok");
        $('#msg_tips_Verifcode').html("");
        return true;
    }
    //$('#registerForm').submit();
}
