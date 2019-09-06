function addStore() {
    $.ajax({
        url:"/store/addStore",
        data:{
        },
        type:"post",
        dataType:"json",
        success:function(data){
            if(data){
                window.location.href="/jsps/store/nextAddStore.jsp";
            }
        },error:function (error) {
            alert("后台出错！")
        }
    })
}

function lastAddStore() {
    window.location.href="/jsps/store/lastAddStore.jsp";

}