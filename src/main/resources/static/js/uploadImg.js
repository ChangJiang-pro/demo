var imgSrc = []; //图片路径
var imgFile = []; //文件流
var imgName = []; //图片名字
//选择图片
function imgUpload(obj) {
	var oInput = '#' + obj.inputId;//根据键值对的方式获取input框的内容
	var imgBox = '#' + obj.imgBox;//图片容器id
	var btn = '#' + obj.buttonId;//图片提交按钮
	$(oInput).on("change", function() {//通过change选择事件  选择图片
		var fileImg = $(oInput)[0];//获取input框dom对象
		var fileList = fileImg.files;//获取选取的图片
		for(var i = 0; i < fileList.length; i++) {//循环遍历选择的图片
			var imgSrcI = getObjectURL(fileList[i]);//获取图片预览的路径
			imgName.push(fileList[i].name);//将图片名字存入数组中
			imgSrc.push(imgSrcI);//将图片路径存入数组中
			imgFile.push(fileList[i]);//将文件流存入数组中
		}
		addNewContent(imgBox);//调用方法  根据图片id，将图片展示在容器中
	})
	$(btn).on('click', function() {//触发click的事件，校验图片是否超过大小限制
		if(!limitNum(obj.num)){//调用方法校验图片数量
		  	alert("超过限制");
		  	return false;
		}
		//用formDate对象上传
		var fd = new FormData($('#'+obj.formId)[0]);//获取form表单dom对象
		console.log(imgFile.length);//日志打印
		fd.delete("files");//删除多余的文件
		for(var i=0;i<imgFile.length;i++){//循环遍历图片数组  
			fd.append(obj.data,imgFile[i]);
		}
		submitPicture(obj.upUrl, fd);//调用方法  上传图片
	})
}
//图片展示
function addNewContent(obj) {
	$(imgBox).html("");//在图片展示前 清空
	for(var a = 0; a < imgSrc.length; a++) {
		var oldBox = $(obj).html();//获取图片容器的html内容
		$(obj).html(oldBox + '<div class="imgContainer"><img title=' + imgName[a] + ' alt=' + imgName[a] + ' src=' + imgSrc[a] + ' onclick="imgDisplay(this)"><p onclick="removeImg(this,' + a + ')" class="imgDelete">删除</p></div>');//拼接一段html代码来显示图片（里面包括删除图片的点击事件）
	}
}
//删除
function removeImg(obj, index) {//删除图片的点击事件
	imgSrc.splice(index, 1);//根据图片的下标位置  删除这个图片
	imgFile.splice(index, 1);
	imgName.splice(index, 1);
	var boxId = "#" + $(obj).parent('.imgContainer').parent().attr("id");//获取图片容器的id
	addNewContent(boxId);
}
//限制图片个数
function limitNum(num){
	if(!num){
		return true;
	}else if(imgFile.length>num){
		return false;
	}else{
		return true;
	}
}

//上传(将文件流数组传到后台)
function submitPicture(url,data) {//点击btn按钮触发的事件  使用的ajax上传图片
	if(url&&data){
		$.ajax({
			type: "post",
			url: url,
			async: true,
			data: data,
			processData: false,
			contentType: false,
			success: function(dat) {
				console.log(dat);
				if(dat){
					alert("上传成功！");
					window.location.reload();
				}else{
					alert("上传失败！");
				}
			},error:function(){
				alert("上传失败！");
			}
		});
	}else{
	  alert('请打开控制台查看传递参数！');
	}
}
//图片灯箱
function imgDisplay(obj) {
	var src = $(obj).attr("src");
	var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;"><img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/><p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p></div>'
	$('body').append(imgHtml);
}
//关闭
function closePicture(obj) {
	$(obj).parent("div").remove();
}

//图片预览路径
function getObjectURL(file) {
	var url = null;
	if(window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if(window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if(window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}