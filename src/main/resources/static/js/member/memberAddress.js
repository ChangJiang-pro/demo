$(function () {
    $("#table").bootstrapTable({
        url:"/member/findAllShippingAddress",//请求的路径
        pagination:true,//分页的开关，默认是关闭的
        sidePagination:"server",//客户端分页
        pageSize:3,
        pageList:[2,3,4,5,6],
        columns: [//field对应的是entity中的属性  title:列名
            {
                field: 'id', // 返回json数-据中的name
                title: '序号', // 表格表头显示文字
                formatter:function(value,row,index){
                    return index+1;
                }
            }, {
                field: 'trueName',
                title: '买家姓名',
                align: 'center'
            }, {
                field: 'areaInfo',
                title: '买家地址',
                align: 'center',
                formatter:function( value,row,index ){
                    //单元格格式化函数，有三个参数：
                    // value： 该列的字段值；
                    // row： 这一行的数据对象；
                    // index： 行号，第几行，从0开始计算
                    //如何使用拿到的多个数据 直接返回拼接好的html;
                    var html="";
                    if(null!=row.secAreaVo){
                        html = "<span>"+row.secAreaVo.provinceName+"</span><span>"+row.secAreaVo.cityName+"</span><span>"+row.secAreaVo.areaName+"</span><span>"+value+"</span>";
                    }
                    return html;
                }
                   
            },  {
                field: 'mobile',
                title: '手机号',
                align: 'center'
            },  {
                field: 'telephone',
                title: '其他联系电话',
                align: 'center'
            }, {
                field: 'zip',
                title: '邮编',
                align: 'center'
            }, {
                field: 'addrDefault',
                title: '是否是默认地址',
                align: 'center',
                formatter:function( value,row,index ){
                   if( value == 0){
                        var html="<span>默认地址</span>"
                   }else{
                       var html="<button class='btn btn-primary' onclick='updateAddDefault("+row.id+")'>设置为默认地址</button>";
                   }
                    return html;
                }
            }, {
                title: "操作",
                field:'id',
                formatter:function(value,row,index){
                    if(row.addrDefault == 0){
                        var str="<button class='btn btn-primary' onclick='deleteAddressById("+value+")' disabled>删除</button>";
                    }else{
                        var str="<button class='btn btn-primary' onclick='deleteAddressById("+value+")'>删除</button>";
                    }
                    return str;
                }
            }
        ]
    });


    $("#province").change(function(){
        var pid=$(this).val();
        loadAllCity(pid);
    });

    $("#city").change(function(){
        var cid=$(this).val();
        loadAllArea(cid);
    });
    $("#area").change(function(){
        var aid=$(this).val();
        $("#areaId").val(aid);
    });
})

function updateAddDefault(id) {
    $.ajax({
        url:"/member/updateAddDefault",
        data:{
            id:id
        },
        type:"post",
        dataType:"json",
        success:function(data){
            if(data){
                window.location.reload();
            }
        },error:function (error) {
            alert("后台出错！")
        }
    });
}

function deleteAddressById(value) {
    $.ajax({
        url:"/member/deleteAddressById",
        data:{
            id:value
        },
        type:"post",
        dataType:"json",
        success:function(data){
            if(data){
                window.location.reload();
            }else{
                alert("删除失败")
                window.location.reload();
            }
        },error:function (error) {
            alert("后台出错！")
        }
    });
}

function addShippingAddress() {
    $('#myModal').modal('show');
    loadAllProvince();
    $("#buttn").click(function(){
        $.ajax({
            url:"/member/addShippingAddress",
            dataType:"json",
            type:"post",
            data:$("#addressFrom").serialize(),
            success:function(data){
                if(data){
                    alert("添加成功");
                    $('#myModal').modal('hide');
                    window.location.reload();
                }else{
                    alert("添加失败失败");
                    window.location.reload();
                }
            }
        });
    });
}
function checkAddressDefault() {
    var a=$("#boxCheck").prop("checked");
    if(a){
        $("#boxCheck").val(0)
    }else{
        $("#boxCheck").val(1)
    }
}
function loadAllProvince() {
    $.ajax({
        url:"/area/findProvince",
        data:{},
        type:"post",
        dataType:"json",
        success:function(data){
            if(data){
                $(data).each(function(a,b){
                    $("#province").append("<option value='"+b.id+"'>"+b.areaName+"</option>");
                });
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
        url:"/area/findCity",
        data:{
            pid:pid
        },
        type:"post",
        dataType:"json",
        success:function(data){
            if(data){
                $("#city").html("");
                $("#city").html("<option>--请选择--</option>");
                $("#area").html("");
                $("#area").html("<option>--请选择--</option>");
                $(data).each(function(a,b){
                    $("#city").append("<option value='"+b.id+"'>"+b.areaName+"</option>");
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
        url:"/area/findArea",
        data:{
            cid:cid
        },
        type:"post",
        dataType:"json",
        success:function(data){
            if(data){
                $("#area").html("");
                $("#area").html("<option>--请选择--</option>");
                $(data).each(function(a,b){
                    $("#area").append("<option value='"+b.id+"'>"+b.areaName+"</option>");
                });
            }else{
                alert("该市下没有县区!")
            }
        },error:function (error) {
            alert("加载县区失败！")
        }
    })
}