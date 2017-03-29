# input-mutil
模拟添加邮件名字功能（支持ctrl+v及右键粘贴）,输入内容自动分隔成多项。

**demo地址：**[https://wztan.github.io/input-mutil/](https://wztan.github.io/input-mutil/)

效果如下图如示:
![](img/demo.jpg)

## 功能说明

	输入内容后，按空格自动分隔，delete文字时，为空时删除前一项。
## 调用方式

引入index.js，html如下，依赖于jquery:

	 <div class="add-equip-line sn-box clearfix">
        <label><span class="type-lable">设备SN</span>：</label>
        <div class="equip-sn-com clearfix">
            <div class="sn-com" id="J_sn_com">
                <input id="J_inp_sn" onkeyup="value=value.replace(/[^\d+a-zA-Z ]/g,'')" type="text" class="sn-input"/>
            </div>
        </div>
        <span class="import icon equip-import"></span>
        <p class="count-num clearall">已输入设备数 <span>0</span>/50</p>
    </div>
    <div class="hand-error input-error"></div>
