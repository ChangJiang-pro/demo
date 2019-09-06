


$(function () {
    /*加密电话号码*/
    var mobile=$("#mobile").html();
    //11位  18659576507
    var subStart=mobile.substring(0,3);
    var subEnd=mobile.substr(7,4);
    $("#mobile").html(subStart+"****"+subEnd);

    var areaId=$("#areaId").val();
    $.ajax({
    url:"/areas/findArea",
    type:"post",
    dataType:"json",
    data:{areaId:areaId},
        success:function(data){
          if(null!=data.shengList && data.shengList.length>0){
              var str="";var temp="";
              for(var i=0;i<data.shengList.length;i++){
                  temp=data.shengList[i];
                  if(temp.id==data.shengId){
                      str+="<option value='"+temp.id+"' selected='selected'>"+temp.areaName+"</option>";
                  }else{
                      str+="<option value='"+temp.id+"'>"+temp.areaName+"</option>";
                  }
              }
              $("#sheng").html(str);
          }
          if(null!=data.shiList && data.shiList.length>0){
              var str="";var temp="";
              for(var i=0;i<data.shiList.length;i++){
                  temp=data.shiList[i];
                  if(temp.id==data.shiId){
                      str+="<option value='"+temp.id+"' selected='selected'>"+temp.areaName+"</option>";
                  }else{
                      str+="<option value='"+temp.id+"'>"+temp.areaName+"</option>";
                  }
              }
              $("#shi").html(str);
          }
          if(null!=data.xianList && data.xianList.length>0){
              var str="";var temp="";
              for(var i=0;i<data.xianList.length;i++){
                  temp=data.xianList[i];
                  if(temp.id==data.xianId){
                      str+="<option value='"+temp.id+"' selected='selected'>"+temp.areaName+"</option>";
                  }else{
                      str+="<option value='"+temp.id+"'>"+temp.areaName+"</option>";
                  }
              }
              $("#qu").html(str);
          }

},error:function (error) {
            console.log("加载当前用户的省市县信息失败！");
        }


    })

    $("#sheng").change(function(){
        var pid=$(this).val();
        loadAllCity(pid);
    });

    $("#shi").change(function(){
        var cid=$(this).val();
        loadAllArea(cid);
    });
    $("#qu").change(function(){
        var aid=$(this).val();
        $("#areaId").val(aid);
    });
    function loadAllProvince(proid) {
        $.ajax({
            url:"/areas/findSheng",
            data:{},
            type:"post",
            dataType:"json",
            success:function(data){
                if(data){
                    var str="";
                    $(data).each(function(a,b){
                        str+="<option value='"+b.id+"'>"+b.areaName+"</option>";
                    });
                    $("#sheng").html(str);
                }else{
                    alert("没有省的存在!")
                }
            },error:function (error) {
                alert("加载省失败！")
            }
        });
    }



    function loadAllCity(pid) {
        $.ajax({
            url:"/areas/findShi",
            data:{
                pid:pid
            },
            type:"post",
            dataType:"json",
            success:function(data){
                if(data){
                    $("#shi").html("");
                    $("#shi").html("<option>--请选择--</option>");
                    $("#qu").html("");
                    $("#qu").html("<option>--请选择--</option>");
                    $(data).each(function(a,b){
                        $("#shi").append("<option value='"+b.id+"'>"+b.areaName+"</option>");
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
            url:"/areas/findXian",
            data:{
                cid:cid
            },
            type:"post",
            dataType:"json",
            success:function(data){
                if(data){
                    $("#qu").html("");
                    $("#qu").html("<option>--请选择--</option>");
                    $(data).each(function(a,b){
                        $("#qu").append("<option value='"+b.id+"'>"+b.areaName+"</option>");
                    });
                }else{
                    alert("该市下没有县区!")
                }
            },error:function (error) {
                alert("加载县区失败！")
            }
        })
    }



    $("#gerentijiao").on('click',function () {
        var trueName=$("#trueName").val();
        var userName=$("#userName").val();
        var sex=$("input[name=sex]:checked").val();
        var birthday=$("#birthday").val();
        var areaId=$("#areaId").val();
        var id=$("#id").val();

        $.ajax({
            url:'/users/updateziliao',
            type:'post',
            data:{trueName:trueName,userName:userName,sex:sex,birthday:birthday,areaId:areaId,id:id},
            dataType:'json',
            success:function(data){
                if(data){
                    alert("修改成功！");
                    window.location.reload();

                }
            }
        });
    });




})