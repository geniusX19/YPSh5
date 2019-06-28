var STATUSBARHEIGHT = 0;
var IPHONEX = "iPhoneX";
/**
 * 沉浸式设置
 * @param {Object} w
 */
(function(w){
var immersed = 0;
var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
if(ms&&ms.length>=3){
	immersed=parseFloat(ms[2]);
}
w.immersed=immersed;
if(!immersed){
	
	return;
}
STATUSBARHEIGHT=immersed;
var t=document.getElementById('header');
//console.log(t.height);
t&&(t.style.paddingTop=immersed+'px',t.style.height=(45+immersed)+'px');
//t&&(t.style.paddingTop=immersed+'px',t.style.background='-webkit-linear-gradient(top,rgba(215,75,40,1),rgba(215,75,40,0.8))',t.style.color='#FFF');
//t&&(t.style.marginTop=immersed+'px');
//t=document.getElementById('content');
//t&&(t.style.marginTop=immersed+'px');
//用户中心
t=document.getElementById('user_head_div');
t&&(t.style.paddingTop=immersed+'px',t.style.height=(160+immersed)+'px');
t=document.getElementById('dcontent');
t&&(t.style.marginTop=immersed+'px');
t=document.getElementById('pullrefresh');
t&&(t.style.marginTop=immersed+'px');
//登录和城市列表页面
t=document.getElementById("noHeader");
t&&(t.style.height=immersed+"px")

})(window);