var TIMER = null;
/**
 * 设置按钮为n秒不可点击，给倒计时提示
 * @param {Object} element
 * @param {Object} secends
 */
function setSeconds(element, seconds) {
	element.style.display = "none";
	var parentNode = element.parentElement;
	var a = document.createElement("a");
	parentNode.appendChild(a);
	a.innerHTML = seconds + "s";
	var n = seconds - 1;
	timer(n, element, a, parentNode);
}

function timer(n, element, a, parentNode) {
	if(TIMER != null) {
		window.clearTimeout(TIMER);
	}
	if(n == 1) {
		parentNode.removeChild(a);
		element.style.display = "";
		return;
	} else {
		a.innerHTML = n + "s";
	}
	n--;
	TIMER = window.setTimeout(function() {
		timer(n, element, a, parentNode);
	}, 1000);
}
