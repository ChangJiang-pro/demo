function storeBut() {
    var trueName=$("#trueName").val();
    alert(trueName);
    if(null == trueName){
        window.location.href="/jsps/member/authentication.jsp";
    }else{
        $.ajax({
            url:"/store/findStoreById",
            data:{
            },
            type:"post",
            dataType:"json",
            success:function(data){
                if(data.status){
                    if(0 == data.cardApprove){
                        window.location.href="/jsps/store/nextAddStore.jsp";
                    }else{
                        window.location.href="/jsps/store/myStor.jsp";
                    }

                }else{
                    window.location.href="/jsps/store/storeIndex.jsp";
                }
            },error:function (error) {
                alert("！")
            }
        })
    }
}