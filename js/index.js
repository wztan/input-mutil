/**
 * Created with Visual Studio Code
 * github: https://github.com/wztan/input-mutil/
 * homepage:https://wztan.github.io/input-mutil/
 * User: 谭维珍
 * Date: 2017-03-29
 * Time: 9:27:55
 * Contact: https://github.com/wztan/input-mutil/issues
 * Desc: 输入多项自动分隔,请及时关注github上的最新代码.
 */
$(function(){
    /*
     * 手动添加
     * 设备SN获取焦点
     * */
    $(".equip-sn-com").click(function(){
        $(".sn-input").focus();
    })
    //如果超过6行，出现滚动条
    var sixHeiFun = function(){
        var sn_box = $(".equip-sn-com"),
            sn_hei = sn_box.height();
        if(sn_hei >= 125){
            sn_box.css({"overflow-y":"auto","height":"125px"});
        }
        else{
            sn_box.css({"overflow-y":"hidden","height":"auto"});
        }
    }
    /*
     * 手动添加函数
     * 判断是否重复
     * 正则验证
     * */
    var equipSN = function(){
        //SN00000001
        var num = Number($(".count-num span").html());
        var _this = $("#J_inp_sn");
        var check_val = /^[a-zA-Z0-9]{1,32}$/;
        var inp_val = ($.trim(_this.val())).split(" "),
            str_len = inp_val.length;
        for(var j=0;j<str_len;j++){
            if(j == 51 || num == 51){
                break;
            }
            if(inp_val[j] != ""){
                var text = '<div class="sn-list"><p>'+inp_val[j]+'</p><i class="icon sn-close"></i></div>';
                $(".sn-com").before(text);
                _this.val("").css({"width":"13px"});
                sixHeiFun();
                num = num+1;
                $(".count-num span").html(num);
                var len = $(".sn-list").length- 1,
                    err_box = $(".sn-box").next(),
                    err_info = $(".sn-list").last();
                for(var i=0;i<len;i++){
                    if($(".sn-list").eq(i).find("p").html() == inp_val[j]){
                        err_info.addClass("error");
                        err_box.html("设备SN重复.");
                        continue;
                    }//设备SN只允许输入英文大小写及数字
                    else if(!check_val.test(inp_val[j])){
                        err_info.addClass("error");
                        err_box.html("请输入1-32位字母、数字组合的设备SN.");
                        continue;
                    }
                }
                //如果大于超过50个设备时，则不能输入；
                if(num >= 50){
                    $("#J_inp_sn").attr("disabled","disabled");
                }else{
                    $("#J_inp_sn").removeAttr("disabled");
                }
                //return true;
            }
        }
    }
    /*
     * 自动延伸宽度
     * */
    var autoLength = function() {
        var input = document.getElementById('J_inp_sn');
        var hlp = document.getElementById('input_help');
        if (!hlp) {
            hlp = document.createElement('p');
            hlp.id = 'input_help';
            hlp.style.visibility = 'hidden';
            hlp.style.position = 'absolute';
            hlp.style.left = 0;
            hlp.style.top = 0;
            hlp.style.wordWrap = 'nowrap';
            hlp.style.overflowX = 'visible';
            document.getElementById("J_sn_com").appendChild(hlp);
        }
        hlp.innerHTML = input.value;
        // 这里多加20个像素，使文本框右边内部有空白空间
        input.style.width = (hlp.offsetWidth + 5) + 'px';
    }
    /*
     * 手动添加
     * 设备SN
     * */
    $(".sn-input").keyup(function(e){
        autoLength();
        var keyCode = window.event ? e.keyCode : e.which;
        if(keyCode == 32 || keyCode == 86){
            equipSN();
        }
        //backspace
        var box=$(".equip-sn-com").find(".sn-list"),
            list_len = box.length;
        if(list_len>0){
            if(keyCode == 8){
                delSNlist(box.last());
            }
        }else{
            $(".sn-box").next().html("");
        }
    })
    /*
     * 输入input失去焦点时
     * 默认把input内容自动生成标签
     * 右键粘贴
     * */
    $("#J_inp_sn").bind('paste',function() {
        setTimeout(function() {
            equipSN();
        },100);
    }).blur(function(){
        equipSN();
    });
    /*
     * 手动添加
     * 设备SN 删除标签
     * */
    $(".page-content").on("click",".sn-close",function(){
        delSNlist($(this).parent());
    });
    var delSNlist = function(box){
        var label_box = $(".count-num span"),
            num = Number(label_box.html());
        num = num-1;
        label_box.html(num);
        box.remove();
        sixHeiFun();
        //如果小于50个设备时，则不能输入；
        if(num < 50){
            $("#J_inp_sn").removeAttr("disabled");
        }
        //如果错误标签删除时，提示需要清除
        if(!$(".sn-list").hasClass("error")){
            $(".sn-box").next().html("");
            return true;
        }
    }
})