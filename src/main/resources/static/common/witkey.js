$(function(){
    //总的导航菜单
   var pathname= window.location.pathname;
   pathname=pathname.substring(0,pathname.lastIndexOf("/"));
   $("#navtitle a").each(function(){
       if($(this).attr("href").indexOf(pathname)!=-1){
           $(this).parent("li").addClass("active");
       }
   });
});

//form表单校验正确
function isOk(obj,text){
    obj.parent().parent().removeClass("has-error");
    obj.parent().parent().addClass("has-success");
    obj.next("span").html(text);
}
//form表单校验失败的情况
function isError(obj,text){
    obj.parent().parent().removeClass("has-success");
    obj.parent().parent().addClass("has-error");
    obj.next("span").html(text);
}
//修改账户信息
function editUserAccount(){
    $.ajax({
        type: "post",
        url: "/user/updateUserAccount",
        data:$("#updateUserAccount").serialize(),
        dataType:"json",
        success: function(dat) {
            if(dat){
                alert("修改账户信息成功！");
                //$('#editAccount').modal("hide");
                window.location.href="/user/logout";
            }else{
                alert("修改账户信息失败！");
            }
        },error:function(){
            alert("修改账户信息失败！");
        }
    });
}

