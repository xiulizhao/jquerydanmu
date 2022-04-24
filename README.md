# jquerydanmu
弹幕剖面,用于发送弹幕<br>
<img src="http://www.wware.org/img/jquerydanmu3.png?_46b8" width="600px"><br>
普通属性<br>
data-width	设置弹幕区域的宽度.可以设置百分比、像素值或者直接填写数值。如不填写，则为默认值，默认值为'100%'	"100%"<br>
data-height	设置弹幕区域的高度。可以设置百分比、像素值或者直接填写数值。如不填写，则为默认值，默认值为'auto'	"auto"<br>
data-zindex	设置弹幕区域的层级。数值类型的值即可。默认值为‘auto’	"100"<br>
data-speed	滚动弹幕的默认速度，这个数值指的是弹幕滚过每672像素所需要的时间（毫秒）。如不填写，则为默认值，默认值为7000	7000<br>
data-sumtime	弹幕流的总时间。如不填写，则为默认值，默认值为65535	65533<br>
data-danmuloop	是否循环播放弹幕。如果开启, 则弹幕会循环播放	0<br>
data-defaultfcolor	弹幕背景色。可设置rgb()或者'#fff'格式。如不填写，则为默认值。默认值为'#FFFFFF'	#FFFFFF<br>
data-fontsizesmall	小号弹幕的字号大小。元素处理时会自动添加像素单位‘px’，因此您只需要设置数值即可。如不填写，则为默认值，默认值为16	16<br>
data-fontsizesmall	大号弹幕的字号大小。元素处理时会自动添加像素单位‘px’，因此您只需要设置数值即可。如不填写，则为默认值，默认值为24	24<br>
data-maxcountinscreen	设置屏幕上的最大的显示弹幕数目,弹幕数量过多时,优先加载最新的。	40<br>
data-maxcountsec	每分秒钟最多的弹幕数目,弹幕数量过多时,优先加载最新的	10<br>
控制属性<br>
data--opacity	弹幕的透明度.如不设置，则为默认值.默认值为0.9	"0.9"<br>
data--init	弹幕的初始化，该属性值需设置为"init"时，使得弹幕元素初始化	init<br>
data--adddanmu	添加弹幕.该属性值设置为一个json字符串。格式为"{"type":"init","data":[{"text":"弹幕内容","color":"","size":1,"position":0,"time":20}]}".type表示添加的弹幕的类型，值有两个："init"(表示当前时间前已有弹幕，即初始化的值)；"new"(表示用户新发表的弹幕).data为弹幕数据数组。每一项是一个弹幕。可以设置弹幕的内容、颜色、字号、位置、出现时间。注意:type值为new时，弹幕不设置‘出现时间’	{"type":"new","data":[{"text":"新弹幕11111","color":"#ff0000","size":1,"position":0},{"text":"新弹幕22222","color":"blue","size":1,"position":0}]}<br>
data--state	弹幕状态.该属性值设置为"start",表示启动弹幕；该属性值设置为"stop"，表示关闭弹幕	start<br>
