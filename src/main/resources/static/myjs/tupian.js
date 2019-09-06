// 修改自官方demo的js
var initCropper = function (img, input){
    var $image = img;
    var options = {
        aspectRatio: 1, // 纵横比
        viewMode: 2,
        preview: '.img-preview' // 预览图的class名
    };
    $image.cropper(options);
    var $inputImage = input;
    var uploadedImageURL;
    if (URL) {
        // 给input添加监听
        $inputImage.change(function () {
            var files = this.files;
            var file;
            if (!$image.data('cropper')) {
                return;
            }
            if (files && files.length) {
                file = files[0];
                // 判断是否是图像文件
                if (/^image\/\w+$/.test(file.type)) {
                    // 如果URL已存在就先释放
                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                    }
                    uploadedImageURL = URL.createObjectURL(file);
                    // 销毁cropper后更改src属性再重新创建cropper
                    $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
                    $inputImage.val('');
                } else {
                    window.alert('请选择一个图像文件！');
                }
            }
        });
    } else {
        $inputImage.prop('disabled', true).addClass('disabled');
    }
}
/* 使用二进制方式处理dataUrl */
function processData(dataUrl) {
    var binaryString = window.atob(dataUrl.split(',')[1]);
    var arrayBuffer = new ArrayBuffer(binaryString.length);
    var intArray = new Uint8Array(arrayBuffer);
    for (var i = 0, j = binaryString.length; i < j; i++) {
        intArray[i] = binaryString.charCodeAt(i);
    }

    var data = [intArray],
        blob;

    try {
        blob = new Blob(data);
    } catch (e) {
        window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
        if (e.name === 'TypeError' && window.BlobBuilder) {
            var builder = new BlobBuilder();
            builder.append(arrayBuffer);
            blob = builder.getBlob(imgType); // imgType为上传文件类型，即 file.type
        } else {
            console.log('版本过低，不支持上传图片');
        }
    }
    return blob;
}
var crop = function() {
    var photo = $('#photo').cropper('getCroppedCanvas', {
        width: 68,
        height: 68
    });
    var blob = processData(photo.toDataURL());
    var formData = new FormData();
    formData.append('copperUserImage', blob);
    $.ajax({
        url: "/users/addUserPhoto",
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status) {
                alert("上传成功");
                if (data.Image) {
                    $("#userImage").attr("src", "/users/showHeadPhoto/" + data.Image);
                   // window.location.reload();
                }
            } else {
                alert("上传失败");
            }
        },
        error: function () {
            console.log('Upload error');
        }
    });
}

$(function () {
    //修改用户的头像
    $.ajax('/users/loadHeadPhoto', {
        method: "POST",
        dataType:"json",
        success: function (data) {
            if(data.status){
                if(data.img!=null){
                    $("#aaaaaaa").attr("src","/users/showHeadPhoto/"+data.img);
                }
            }else{
                alert("查询失败！")
            }

        },
        error: function () {
            console.log('Upload error');
        }
    });
})
$(function(){
    initCropper($('#photo'),$('#input'));
});