function setOk(obj){
    var _pdiv=obj.parents(".form-group");
    if(_pdiv.hasClass("has-error")){
        _pdiv.removeClass("has-error");
    }
    _pdiv.addClass("has-success");
    obj.nextAll("span.help-block").html("&nbsp;");
}
function setError(obj,str){
    var _pdiv=obj.parents(".form-group");
    if(_pdiv.hasClass("has-success")){
        _pdiv.removeClass("has-success");
    }
    _pdiv.addClass("has-error");
    obj.nextAll("span.help-block").html(str);
}