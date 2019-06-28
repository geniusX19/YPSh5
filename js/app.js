/**
 * 引入该js文件，可以获取一些通用或共用的方法 
 * @param {Object} $
 * @param {Object} owner
 */
(function($, owner) {
	var nativeWebview, imm, InputMethodManager;

	/** 获取交通工具 **/
	owner.getVehicle = function(vehicle) {

		switch(vehicle) {
			case 'ELECTRIC_BICYCLE':
				return "电瓶车";
			case 'ELECTRIC_TRICYCLE':
				return "电动三轮车";
			case 'CAR':
				return "小汽车";
			case 'MOBILE_TRICYCLE':
				return "机动三轮车";
			case 'VAN':
				return "面包车";
			case 'TRUCK':
				return "小货车";
			case 'MIDDLE_TRUCK':
				return "中型货车";
				break;
			default:
				return "";
		}

	}
	owner.getDateTime = function(longTime) {
		var date = new Date(longTime);
		return owner.plusZero(date.getMonth() + 1) + "-" + owner.plusZero(date.getDate()) + " " + owner.plusZero(date.getHours()) + ":" + owner.plusZero(date.getMinutes());
	}

	/**
	 * 判断上拉加载是否需要开启
	 * @param {String} container  上拉加载容器
	 * @param {int} dataLength ajax 返回数据的长度
	 * @param {int} pageIndex  本次请求的页面（从0开始）
	 * @param {int} pageSize   本次请求的页面数据长度
	 * @param {Function(pageIndex)} callback   回调函数返回页码pageIndex，如果开启上拉加载则返回pageIndex+1，否则返回pageIndex
	 */
	owner.openOrClosePullUpRefresh = function(container, dataLength, pageIndex, pageSize, callback) {
		if(dataLength < pageSize) {
			if(pageIndex == 0) { //第一次加载
				mui(container).pullRefresh().disablePullupToRefresh();
			}
			mui(container).pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
			return callback(pageIndex);
		} else {
			mui(container).pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
			return callback(++pageIndex);
		}
	}
	owner.encodePhonenumber = function(p) {
		if(!p) {
			return '';
		}
		var s = p.substring(0, 3);
		var e = p.substring(p.length - 4, p.length);
		return s + "****" + e;
	}

	//获取分享通道
	owner.getShareServices = function(shareServices, callback) {
		plus.share.getServices(function(s) {
			shareServices = {};
			mui.each(s, function(index, e) {
				shareServices[e.id] = e;
			});
			return callback(shareServices);
		}, function(err) {});
	}

	/**
	 * 分享链接
	 * @param {Array[plus.share.ShareService]} shareServices - 分享通道
	 * @param {string} title  -  分享标题
	 * @param {string} content -  内容
	 * @param {string} href -   链接地址
	 * @param {Array[string]} thumbs -  缩略图地址
	 */
	owner.shareHref = function(shareServices, title, content, href, thumbs) {
		var shareBts = [];
		// 更新分享列表
		var ss = shareServices['weixin'];
		ss && ss.nativeClient && (shareBts.push({
				title: '微信朋友圈',
				s: ss,
				x: 'WXSceneTimeline'
			}),
			shareBts.push({
				title: '微信好友',
				s: ss,
				x: 'WXSceneSession'
			}));
		ss = shareServices['qq'];
		ss && ss.nativeClient && shareBts.push({
			title: 'QQ',
			s: ss
		});
		// 弹出分享列表
		shareBts.length > 0 ? plus.nativeUI.actionSheet({
			title: '分享到',
			cancel: '取消',
			buttons: shareBts
		}, function(e) {
			(e.index > 0) && shareAction(shareBts[e.index - 1], title, content, href, thumbs);
		}) : plus.nativeUI.alert('当前环境无法支持分享链接操作!');
	}
	/**
	 * 
	 * @param {Object} sb
	 * @param {Object} title
	 * @param {Object} content
	 * @param {Object} href
	 * @param {Object} thumbs
	 */
	function shareAction(sb, title, content, href, thumbs) {
		if(!sb || !sb.s) {
			mui.toast('无效的分享服务！');
			return;
		}
		var msg = {
			extra: {
				scene: sb.x
			}
		};
		if(sb.s.id === 'weixin') {
			msg.type = 'web';
		}
		msg.href = href;
		msg.title = title;
		msg.content = content;

		if(sb.s.id === 'weixin') {
			msg.thumbs = thumbs;
		}
		//发送分享
		if(sb.s.authenticated) {
			shareMessage(msg, sb.s);
		} else {
			sb.s.authorize(function() {
				shareMessage(msg, sb.s);
			}, function(e) {
				mui.toast('认证授权失败')
				console.log('' + e.code + ' - ' + e.message);
			});
		}
	}
	/**
	 * 发送分享消息
	 * @param {JSON} msg
	 * @param {plus.share.ShareService} s
	 */
	function shareMessage(msg, s) {
		s.send(msg, function() {
			mui.toast('分享到"' + s.description + '"成功！');
		}, function(e) {
			mui.toast('分享到"' + s.description + '"失败!');
			console.log(JSON.stringify(e))
		});
	}
	//加法运算
	owner.accAdd = function(arg1, arg2) {
		var r1, r2, m;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch(e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch(e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		return(arg1 * m + arg2 * m) / m;
	}
	//减法
	owner.subtract = function(arg1, arg2) {
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch(e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch(e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		//last modify by deeka
		//动态控制精度长度
		n = (r1 >= r2) ? r1 : r2;
		return((arg1 * m - arg2 * m) / m).toFixed(n);
	}
	//乘法运算
	owner.multiplication = function(arg1, arg2) {
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length;
		} catch(e) {}
		try {
			m += s2.split(".")[1].length;
		} catch(e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	}
	//除法运算
	owner.division = function(arg1, arg2) {
		var t1 = 0,
			t2 = 0,
			r1, r2;
		try {
			t1 = arg1.toString().split(".")[1].length;
		} catch(e) {}
		try {
			t2 = arg2.toString().split(".")[1].length;
		} catch(e) {}
		with(Math) {
			r1 = Number(arg1.toString().replace(".", ""));
			r2 = Number(arg2.toString().replace(".", ""));
			return(r1 / r2) * pow(10, t2 - t1);
		}
	}

	//获取二维码
	owner.getSeoQrcode = function(callback) {
		if(!callback) {
			callback = function(e) {}
		}
		//获取二维码
		owner.tokenAjax_Get({
			url: getSeoQrcode(owner.getCustomerId()),
			success: function(e) {
				if(e.status === 1) {
					myStorage.setItem(STORAGE_NAME_SEO, e.data);
				} else {
					myStorage.setItem(STORAGE_NAME_SEO, undefined);
				}
				return callback();
			},
			error: function(xhr) {}
		});

	}

	owner.canAgainSent = function(orderType) {
		if(orderType === 'DirectOrder' || orderType === 'MergeOrder') {
			return true;
		} else {
			return false;
		}
	}
	owner.initNativeObjects = function() {
		setTimeout(function() {
			if(mui.os.android) {
				var main = plus.android.runtimeMainActivity();
				var Context = plus.android.importClass("android.content.Context");
				InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
				imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
				nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
				//强制当前webview获得焦点
				plus.android.importClass(nativeWebview);
			} else {
				nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
			}
		}, 500);
	};
	var initNativeInputObject = function() {
		if(mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var Context = plus.android.importClass("android.content.Context");
			InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
			imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
			nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
			//强制当前webview获得焦点
			plus.android.importClass(nativeWebview);
		} else {
			nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
		}
	}
	var showSoftInput = function(ele) {
		if(mui.os.android) {
			nativeWebview.requestFocus();
			imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
		} else {
			nativeWebview.plusCallMethod({
				"setKeyboardDisplayRequiresUserAction": false
			});
		}
		setTimeout(function() {
			ele.focus();
		}, 100);
	};
	/**
	 * 使用前必须在页面一开始调用initNativeObjects,来手动初始化
	 * @param {Object} elementObj
	 */
	owner.showInput = function(elementObj) {
		showSoftInput(elementObj);
	}
	/**
	 * 不需要手动初始化
	 * @param {Object} elementObj
	 */
	owner.showInput_auto = function(elementObj) {
		initNativeInputObject();
		showSoftInput(elementObj);
	}
	/**
	 * 获取用户的账户余额
	 * @param {Object} url
	 * @param {Object} callback
	 */
	owner.getUserAccountInfo = function(url, callback) {
		owner.tokenAjax_Get({
			url: url,
			success: function(res) {
				return callback(res);
			},
			error: function(xhr) {}
		});
	}

	/**
	 * 传入时间和当前的时间之差是否在一天内
	 * @param {long} long_time
	 * @return {Boolean}
	 */
	owner.timeIsInOneDay = function(long_time) {

		var now = new Date().getTime();

		var dayTime = 60 * 60 * 60 * 1000;

		return(now - long_time) <= dayTime;
	}

	/**
	 * 获取用户当前位置
	 * 
	 * @param {Boolean} isHighAccuracy 是否获取高精度的定位  
	 * @param {Function} successCallback 成功回调  function(Position)
	 * @param {Function} errorCallback  失败回调  function(errMesg)
	 */
	owner.getCurrentLocation = function(isHighAccuracy, successCallback, errorCallback) {
		if(!isHighAccuracy) {
			isHighAccuracy = false;
		} else {
			isHighAccuracy = true;
		}
		plus.geolocation.getCurrentPosition(function(p) {

			if(p.coords.longitude == 5e-324 || p.coords.latitude == 5e-324) {
				plus.nativeUI.alert('定位失败，请检查手机GPS是否打开', function() {}, '提示', '确认');
				return;
			}
			return successCallback(p);
		}, function(e) {
			var i = e.code;
			var message;
			if(i == 1) { //PERMISSION_DENIED 
				message = '未获取到定位权限，请在"设置"-"应用管理"-"壹配送用户"-"权限"中将获取位置信息设为允许';
			} else if(i == 2) { //POSITION_UNAVAILABLE
				message = '无法获取有效的位置信息,请稍后重试';
			} else if(i == 3) { //TIMEOUT: (Number 类型 )
				message = '获取位置信息超时,请稍后重试';
			} else { //UNKNOWN_ERROR
				message = '获取位置信息失败，请稍后重试'
			}
			plus.nativeUI.alert(message, function() {}, '提示', "确认");
			return errorCallback(e);
		}, {
			enableHighAccuracy: true,
			provider: 'baidu',
			coordsType: "bd09ll",
			geocode: true
		});
	}

	/**
	 * @description  将字符串按固定长度来截断
	 * @example 
	 * 长度为10的字符串 小明12345678  ，给定的长度length为8 则输出小明1234..
	 * @param {Object} oldString
	 * @param {Object} length
	 * @return 新的字符串长度为length且长度为length
	 */
	owner.spliStringTo = function(oldString, length) {
		var len = oldString.length;
		if(len <= length) {
			return oldString;
		}
		var newStr = oldString.substring(0, length - 2);
		return newStr + "..";
	}
	owner.showAddressInfoFormat = function(poi, addressName, detail) {
		var v = "";
		if(poi && poi.length > 0) {
			v += poi + "<br/>"
		}
		if(addressName && addressName.length > 0) {
			v += addressName + "<br/>"
		}
		if(detail && detail.length > 0) {
			v += detail
		}
		return v;
	}

	owner.getCouponType = function(type) {
		switch(type) {
			case 'common':
				return '';
			case 'merge':
				return "限拼单使用";
			case 'direct':
				return "限直发使用";
			default:
				return "";
		}
	}

	owner.carType = function(type) {
		switch(type) {
			case 'ELECTRIC_BICYCLE':
				return '电动车';
			case 'ELECTRIC_TRICYCLE':
				return '三轮车';
			case 'CAR':
				return '小汽车';
			case 'VAN':
				return '面包车';
			case 'TRUCK':
				return '小货车';
			case 'MOBILE_TRICYCLE':
				return '机动三轮车';
			case 'MIDDLE_TRUCK':
				return '中型货车';
			default:
				return "";
		}
	}

	/**
	 * 获取一键呼叫的价格map
	 * @param {Object} lng
	 * @param {Object} lat
	 */
	owner.getPhoneCallPriceMap = function(lng, lat) {
		var url = getPhoneCallURL(app.getCustomerId(), lng, lat);
		owner.tokenAjax_Get({
			url: encodeURI(url),
			success: function(result) {
				if(result.status == 1) {
					myStorage.setItem("phone_call_price_map", result.data.priceMap);
				}
			},
			error: function(xhr) {}
		});
	}

	/**
	 * 
	 * @param {Object} obj 点击的元素
	 * @param {String} obj_class 一组被点击的元素className
	 * @param {String} cls  激活后的元素样式的className
	 */
	owner.chooseStatus = function(obj, obj_class, cls) {
		owner.inputBlur();
		if(obj.className.indexOf(cls) > 0) {
			return;
		}
		var pickerList = document.getElementsByClassName(obj_class);
		mui.each(pickerList, function(index, element) {
			var classList = element.className;
			if(classList.indexOf(cls) > 0) {
				element.className = classList.replace(cls, "");
			}
		});
		obj.className = obj.className + " " + cls;
	}
	/**
	 * 点击选中，在点击取消
	 * @param {Object} obj 点击的对象
	 * @param {String} obj_class 点击的对象的class名
	 * @param {String} cls 激活时的样式class名
	 * @param {String} callback 回调参数e 为传入的对象 ，status：1为第一次点击，-1为取消选中
	 */
	owner.chooseStatusDoubleCancel = function(obj, obj_class, cls, callback) {
		owner.inputBlur();
		if(obj.className.indexOf(cls) > 0) {
			obj.className = obj.className.replace(cls, "");
			return callback(obj, -1);
		}
		var pickerList = document.getElementsByClassName(obj_class);
		mui.each(pickerList, function(index, element) {
			var classList = element.className;
			if(classList.indexOf(cls) > 0) {
				element.className = classList.replace(cls, "");
			}
		});
		obj.className = obj.className + " " + cls;
		return callback(obj, 1);

	}
	owner.show_itemSize = function(size) {
		switch(size) {
			case "SMALL":
				return "小件";
			case "MIDDLE":
				return "中件";
			case "BIG":
				return "大件";
			case "VERY_BIG":
				return "小型货运";
			case "HUGE":
				return "中型货运";
			default:
				return "";
		}
	}

	//地图检索历史
	owner.getHistorArrary = function() {
		var historArr = myStorage.getItem("historyArr");
		if(!historArr) {
			historArr = new Array();
		}
		return historArr;
	}
	owner.saveHistoryArrary = function(arr) {
		myStorage.setItem("historyArr", arr);
	}
	owner.clearHistoryArrary = function() {
		myStorage.setItem("historyArr", new Array());
	}

	//让当前页面所有input失去焦点, 关闭软键盘 /
	owner.inputBlur = function() {

		var inputs = document.getElementsByTagName("input");
		mui.each(inputs, function(index, element) {
			element.blur();
		})
	}

	/**
	 * 判断是否高级预约单超时
	 * @param {Object} time 预约的时间
	 */
	owner.isAppointmentTimeout = function(time) {
		if(!time) {
			time = 0;
		}
		var now = new Date().getTime();
		var dur = 60 * 60 * 1000 - 7 * 60 * 1000;
		var difftime = time - now;
		//判断当前时间和预约的取件时间之间的差小于（1个小时-7分钟）说明配送员接单超时
		if(difftime < dur) {
			return true;
		} else {
			return false;
		}
	}

	owner.cancelSubOrder = function(orderId, status,displayOrder, ele, callback) {
		var message;
		var message;
		if(status == "待接单" || status == "已超时") {
			message = "订单取消成功！取消订单的金额将在24小时内退还到您的账户中";
		} else if(status == '未付款') {
			message = '取消成功';
		} else {
			return callback(status + '状态下的订单不能被取消');
		}
		if(displayOrder == 0){
			var url = API_URL_POST_CANCEL_ORDER + orderId + "/" + owner.getCustomerId();
		}else{
			var url = API_SERVER + "/api/drd/app/order/cancelOrder/" + orderId + "/" + owner.getCustomerId();
		}
		console.log(url);
		//取消订单
		owner.tokenAjax({
			url: url,
			data: {},
			success: function(data) {
				mui(ele).button('reset');
				if(data.status == 1) {
					return callback(message);
				} else {
					return callback(data.msg);
				}
			},
			error: function(xhr) {
				mui(ele).button('reset');
				console.log("请求失败了哈哈")
				console.log(JSON.stringify(xhr))
				return callback("取消失败");
			}
		});
	}

	/**
	 * 点击按钮取消订单
	 * @param {Object} orderId
	 * @param {Object} status  订单状态
	 */
	owner.cancelOrder = function(orderId, status,displayOrder, callback) {
		var message;
		if(status == "待接单" || status == "已超时") {
			message = "取消订单的金额将在24小时内退还到您的账户中";
		} else if(status == '未付款') {
			message = '是否要取消订单？';
		} else if(status == '已接单') {
			return callback('已接单，如需取消请联系配送员', -2);
		} else {
			return callback(status + '状态下的订单不能被取消', 0);
		}
		mui.confirm(message, '取消订单', ['取消', '确认'], function(e) {
			if(e.index == 1) {		
				if(displayOrder == 0){
					var url = API_URL_POST_CANCEL_ORDER + orderId + "/" + owner.getCustomerId();
				}else{
					var url = API_SERVER + "/api/drd/app/order/cancelOrder/" + orderId + "/" + owner.getCustomerId();
				}
				console.log(url)
				//取消订单
				owner.tokenAjax({
					url: url,
					data: {},
					success: function(data) {
						console.log(data.status);
						if(data.status == 1) {
							return callback('订单取消成功！订单的金额将在24小时内退还到您的账户中', 1);
						} else {
							return callback(data.msg, data.status);
						}
					},
					error: function(xhr) {
						app.httpError(xhr.status);
					}
				});
			}
		}, 'div');
	}

	owner.createPushMsg = function(orderId) {
		var payload = {
			'orderId': orderId
		};
		//提示消息
		plus.push.createMessage("对不起，您的订单：" + orderId + "由于长时间未接单,您可以取消订单或重新查找配送员", payload, {
			"title": "配送员未接单，您可以取消订单或重新派单",
			"cover": false
		});
	}
	/**
	 * 判断订单是否超时
	 * 
	 */
	owner.orderIsTimeout = function(time, orderId, TIMEOUT) {
		var now = new Date().getTime();
		var difftime = parseInt(now) - parseInt(time);

		var TIME = TIMEOUT * 60 * 1000;
		if(difftime > TIME) {
			return true;
		} else {
			return false;
		}
	}
	/**
	 * 自动取消订单
	 */
	owner.cancelTimeoutOrder = function(time, orderId) {
		var now = new Date().getTime();
		var difftime = parseInt(now) - parseInt(time);
		var TIME = 9 * 60 * 1000;
		if(difftime > TIME) {
			owner.tokenAjax({
				url: API_URL_POST_CANCEL_ORDER + orderId + "/" + owner.getCustomerId(),
				data: {},
				success: function(data) {
					if(data.status == 1) {
						//			//创建本地通知消息
						plus.push.createMessage("对不起，您的订单：" + orderId + "由于长时间未支付，已被系统自动取消", "", {
							"title": "订单未支付被系统取消",
							"cover": false,
						});
					} else {

					}
				},
				error: function(xhr) {
					app.httpError(xhr.status);
				}
			});
			return true;
		}
	}
	/**
	 * 封装在其他页面返回到订单列表页面时，添加自定义refresh页面
	 */
	owner.refreshOrderListPage = function() {
		var old_back = mui.back;
		mui.back = function() {
			var orderListPage = plus.webview.getWebviewById("orderList");
			mui.fire(orderListPage, 'refresh', {});
			old_back();
		}
	}
	/**
	 * 预加载了orderList的页面
	 * 封装自定义打开orderList页面，自动请求数据
	 */
	owner.openRefreshOrderListPage = function() {
		var orderListPage;
		//获得详情页面
		if(!orderListPage) {
			orderListPage = plus.webview.getWebviewById('orderList');
		}
		//触发详情页面的newsId事件
		mui.fire(orderListPage, 'refresh', {});
		//打开详情页面          
		owner.openWebView("../order/orderList.html", "orderList");
	}

	owner.getOrderType = function(type) {

		switch(type) {
			case "AdvancedAppointmentOrder":
				return "高级预约单";
			case "AppointmentOrder":
				return "预约单";
			case "DirectOrder":
				return "直发订单";
			case "MergeOrder":
				return "拼单";
			case "DrdOrder":
				return "当日达订单";
			default:
				break;
		}

	}

	/**
	 * 发送设备clientId 到服务器
	 * @param {Object} customerId
	 */
	owner.uploadClientId = function(customerId) {
		var info = plus.push.getClientInfo();
		var clientId = info.clientid;
		mui.ajax(API_URL_UPLOAD_CLIENTID, {
			data: {
				"id": customerId,
				"clientId": clientId
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			crossDomain: true,
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				console.log("设备ID上传成功")
			},
			error: function(xhr, type, errorThrown) {

			}
		});
	}

	/**
	 * 拨打电话
	 * @param {Object} phone 电话号码
	 * @param {Object} tips  提示语
	 */
	owner.callPhone = function(phone, tips) {
		var btnArray = ['取消', '拨打'];
		mui.confirm(tips, '提示', btnArray, function(e) {
			if(e.index == 1) {
				plus.device.dial(phone, false);
			}
		}, 'div');
	}
	/**
	 * 比较版本号
	 * @param  oldVersion 本地版本号
	 * @param  newVersion 服务器上的版本号
	 */
	owner.compareToVersion = function(oldVersion, newVersion) {
		if(!oldVersion || !newVersion || oldVersion == "" || newVersion == "") {
			return false;
		}
		var oArr = oldVersion.split(".", 3);
		var nArr = newVersion.split(".", 3);
		for(var i = 0; i < oArr.length && i < nArr.length; i++) {
			var ov = parseInt(oArr[i]);
			var nv = parseInt(nArr[i]);
			if(nv > ov || nArr[i].length > oArr[i].length) {
				return true;
			} else if(nv < ov) {
				return false;
			}
		}
		if(nArr.length > oArr.length && 0 == newVersion.indexOf(oldVersion)) {
			return true;
		}
	}

	owner.contentHeight = function() {
		return plus.screen.resolutionHeight - 95;

	}

	/**
	 * 获取物品的尺寸
	 * @param {Object} size
	 */
	owner.getGoodsSize = function(size) {
		switch(size) {
			case 'SMALL':
				return "30cm*30cm*30cm";
			case "MIDDLE":
				return "50cm*50cm*30cm";
			case "BIG":
				return "100cm*100cm*40cm";
			case "VERY_BIG":
				return "100cm*100cm*80cm";
			default:
				break;
		}
	}

	owner.plusZero = function(value) {
		if(value < 10) {
			return "0" + value;
		} else {
			return value;
		}
	}
	/**
	 *将一个毫秒级的时间转化为一个时间字符串yyyy—MM-dd HH：mm：ss 
	 * @param {Object} longTime
	 */
	owner.getTimeString = function(longTime) {
		var date = new Date(longTime);
		return date.getFullYear() + "-" + owner.plusZero(date.getMonth() + 1) + "-" + owner.plusZero(date.getDate()) + " " + owner.plusZero(date.getHours()) + ":" + owner.plusZero(date.getMinutes()) + ":" + owner.plusZero(date.getSeconds());
	}

	/**
	 *获取订单状态别名 
	 * @param {Object} status
	 */
	owner.getOrderStatus = function(status) {
		switch(status) {
			case "JUST_CREATED":
				return "未付款";
			case "PAYED":
				return "待接单";
			case "TIMEOUT":
				return "已超时";
			case "FETCHING":
				return "已接单";
			case "SENDER_VERIFIED":
				return "已验证";
			case "FETCHED":
				return "已取件";
			case "RECEIVER_VERIFIED":
				return "送件中";
			case "SENDING":
				return "送件中";
			case "SENT":
				return "已送达";
			case "ESTIMATED":
				return "已评论";
			case "FETCH_ABNORMAL":
				return "取件异常";
			case "SEND_ABNORMAL":
				return "送件异常";
			case "CANCEL":
				return "已取消";
			default:
				return "";
				break;
		}
	}

	/**
	 *	关闭所有已打开的窗口，重新打开一个指定的页面
	 * @param {Object} path  页面路径
	 * @param {Object} webviewId 页面id
	 */
	owner.closeAllWebviewsAndOpenNew = function(path, webviewId) {
		//打开新的页面
		owner.openWebView(path, webviewId);

		//关闭当前页面
		var webviews = plus.webview.all();
		mui.each(webviews, function(index, element) {
			if(element.id != "login") {
				element.close();
			}
		});

	}

	/**
	 * 1-XXX-XXXXX转化为1XXXXXXXXXX  
	 * @param {Object} phone
	 */
	owner.outputCurrentPhoneNumber = function(phone) {
		if(phone == undefined || phone.length == 0) {
			return '';
		}
		return phone.replace(/\+86/g,"")
					.replace(/\+/g,"")
					.replace(/\-/g,"")
					.replace(/\s/g,"");
	}

	//地址
	owner.showFlagName = function(flag) {
		var title;
		var div = document.getElementById("sub_title");
		if(flag == 'send') {
			title = '编辑发件人地址';
			if(div) {
				div.innerHTML = '发件地址'
			}
		} else if(flag == 'addsend') {
			title = '新建发件人地址';
			if(div) {
				div.innerHTML = '发件地址'
			}
		} else if(flag == 'receive') {
			title = '编辑收件人地址';
			if(div) {
				div.innerHTML = '收件地址'
			}
		} else if(flag == 'addreceive') {
			title = '新建收件人地址';
			if(div) {
				div.innerHTML = '收件地址'
			}
		} else {
			title = '';
			if(div) {
				div.innerHTML = '地址'
			}
		}
		return title;
	}

	/**
	 * @param {}  地址地图
	 * @param {Object} url  自定义的图标
	 * @param {Object} point BMap.Point
	 * @param {Object} index 设置图片偏移。 
	 */
	owner.addAddressMarker = function(map, url, point, index) {
		var myIcon = new BMap.Icon(url, new BMap.Size(30, 35), {
			// 指定定位位置。   
			// 当标注显示在地图上时，其所指向的地理位置距离图标左上    
			// 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
			// 图标中央下端的尖角位置。    
			anchor: new BMap.Size(16, 38),
			// 设置图片偏移。   
			// 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
			// 需要指定大图的偏移位置，此做法与css sprites技术类似。    
			//						imageOffset: new BMap.Size(0, 0 - index * 25) // 设置图片偏移    
		});
		// 创建标注对象并添加到地图   
		var marker = new BMap.Marker(point, {
			icon: myIcon
		});
		map.addOverlay(marker);
		//可拖拽
		marker.enableDragging();

		return marker;
	}

	/**
	 * @param {Maps}  地图对象
	 * @param {Object} url  自定义的图标
	 * @param {Object} point BMap.Point
	 * @param {Object} index 设置图片偏移。 
	 */
	owner.addMarker = function(map, url, point, index) {
		var marker = new plus.maps.Marker(point);
		marker.setIcon(url);
		map.addOverlay(marker);
		return marker;
	}
	/**
	 * @param {}  地图
	 * @param {Object} url  自定义的图标
	 * @param {Object} point BMap.Point
	 */
	owner.addMarkerByDrawLine = function(map, url, point) {

		var marker = new plus.maps.Marker(point);
		marker.setIcon(url);
		map.setZoom(17);
		map.setCenter(point);
		map.addOverlay(marker);
		return marker;
	}

	/**
	 * 
	 * 发送短信登录时需要使用的的短信
	 * 
	 */
	owner.getLoginSms = function(phone) {
		//调用登录短信接口
		mui.ajax(API_LOGIN_SMS, {
			data: {
				"phonenumber": phone
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			crossDomain: true,
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				if(data.status == 1) {
					mui.toast("短信已发送");
				} else {
					mui.toast(data.message);
				}
			},
			error: function(xhr, type, errorThrown) {

			}
		});
	}

	/**         
	 * 发送短信的接口 
	 * @param {Object} phone 手机号
	 */
	owner.getSms = function(phone, callback) {
        callback = callback || $.noop;
		//调用短信接口
		mui.ajax(API_SMS, {
			data: {
				"phonenumber": phone
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			crossDomain: true,
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				plus.nativeUI.closeWaiting();
				if(data.status == 1) {
					mui.toast("短信已发送");
					return callback();
				} else {
					mui.toast(data.msg);
				}
			},
			error: function(xhr, type, errorThrown) {

			}
		});
	}

	/**
	 *弹框 
	 * @param {Object} str 内容
	 */
	owner.alert = function(str) {
		mui.toast(str);
	}

	/**
	 * 核查手机号是否正确，正确返回true，错误返回false
	 * @param {String} phone 手机号
	 */
	owner.checkPhone = function(phone) {
		var pattern = PHONE_PATTERN;
		if(phone.length != 11) {
			return false;
		}
		if(pattern.test(phone)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 判断字符串是否全部为字母
	 * @param {Object} string
	 */
	owner.isAllCharacter = function(string) {
		var pattern = /^[A-Za-z]+$/;
		var res = string.replace(/\s+/g, "");
		return pattern.test(res);
	}
	/**
	 * 用户登录参数核查
	 **/
	owner.login = function(loginInfo, ele, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if(!loginInfo.account) {
			return callback("手机号不能为空");
		}
		if(owner.checkPhone(loginInfo.account) == false) {
			return callback('手机号有误，请检查!');
		}
		if(loginInfo.password.length < 6 || loginInfo.password.length > 24) {
			return callback('请输入6~24位密码');
		}
		//保存数据到本地
		settings = owner.getSettings() || {};
		settings.phonenumber = loginInfo.account || '';
		settings.password = loginInfo.password || '';
		owner.setSettings(settings);

		var params = {
			"phonenumber": loginInfo.account,
			"password": loginInfo.password
		};
		mui(ele).button("loading");
		//后台登录
		mui.ajax(API_LOGIN, {
			data: JSON.stringify(params), //参数
			crossDomain: true,
			headers: {
				'Content-Type': 'application/json'
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			async: true,
			timeout: 10000,
			success: function(data) {
				mui(ele).button("reset");
				if(data.status == 1) {
					//保存token
					owner.saveToken(data.data);
					owner.uploadClientId(data.data.customerId);
					//判断是否需要发放
					owner.tokenAjax({
						url: API_URL_POST_GIVE_AREA_COUPON,
						data: {
							'customerId': owner.getCustomerId(),
							'lng': myStorage.getItem("user_longitude"),
							'lat': myStorage.getItem("user_latitude")
						},
						success: function(r) {},
						error: function(e) {}

					});
					//页面跳转
					owner.openWebView('views/main.html', 'main');
				} else {
					mui.toast(data.msg);
				}
			},
			error: function(xhr, type, errorThrown) {
				mui(ele).button("reset");
				//异常处理；
				owner.httpError(xhr.status);
			}
		});
	};

	/**
	 * ajax异常信息处理
	 * @param {Object} status
	 */
	owner.httpError = function(status) {
		switch(parseInt(status)) {
			case 401:
				owner.deleteToken();
				//获取首页
				//获取首页
				owner.openWebView(plus.webview.getLaunchWebview().getURL(), "login");
				break;
			case 0:
				mui.toast('请检查手机网络');
				break;
			default:
				break;
		}
	}
	/**
	 *保存token信息 到myStorage
	 * @param {Object} token
	 */
	owner.saveToken = function(token) {

		if(token.customerId) {
			myStorage.setItem("customerId", token.customerId);
		}
		myStorage.setItem("access_token", token.tokenObject.access_token);
		myStorage.setItem("refresh_token", token.tokenObject.refresh_token);
		myStorage.setItem("expire_time", Date.parse(new Date()) + parseInt(token.tokenObject.expires_in) * 1000);
	}
	owner.exchangeToken = function(tokenObj) {
		myStorage.setItem("access_token", tokenObj.access_token);
		myStorage.setItem("refresh_token", tokenObj.refresh_token);
		myStorage.setItem("expire_time", Date.parse(new Date()) + parseInt(tokenObj.expires_in) * 1000);
	}

	/**
	 * 用户customerId
	 */
	owner.getCustomerId = function() {
		return myStorage.getItem("customerId");
	}

	/**
	 * 
	 * 获取一个token ，每次向服务器发请求时，放在消息头里面
	 * 
	 */
	owner.getToken = function() {
		return myStorage.getItem("access_token");
	}
	/**
	 *用户注销时，删除token 
	 */
	owner.deleteToken = function() {
		myStorage.removeItem("access_token");
		myStorage.removeItem("refresh_token");
		myStorage.removeItem("expire_time");
	}

	/**
	 *判断token是否到期，如果到期，服务器 则向服务发送交换token请求
	 */
	owner.checkToken = function() {
		var expire_time = myStorage.getItem("expire_time");
		if(expire_time) { //有token
			var now = Date.parse(new Date());
			var res = now > parseInt(expire_time);
			if(res == "true") {
				//向服务器请求token交换
				mui.ajax(API_FRESHTOKEN, {
					data: {
						"refresh_token": myStorage.getItem("refresh_token")
					},
					crossDomain: true,
					dataType: 'json', //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						if(data.status == 1) {
							//重新保存token
							owner.exchangeToken(data.data);
							return true;
						} else {
							owner.httpError(401);
							return false;
						}
					},
					error: function(xhr, type, errorThrown) {
						owner.httpError(401);
						return false;
					}
				});

			} else {
				//不交换
				return true;
			}
		} else { //用户已注销
			mui.toast('请重新登录');
			return false;
		}
	}
	/**
	 * 发送带token的mui.ajax的请求，config对象要包含了url,data,成功的success回调方法，和error方法
	 * @param {Object} config
	 */
	owner.tokenAjax = function(config) {
		//检查token
		var isOk = owner.checkToken();
		if(isOk == "false") {
			return; //终止发送请求
		}
		var authorization = 'Bearer ' + owner.getToken();
		mui.ajax(config.url, {
			data: config.data,
			crossDomain: true,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 5000, //超时时间设置为10秒；
			success: config.success,
			error: config.error,
			headers: { //设置消息头部
				'Authorization': authorization,
				'Content-Type': 'application/json'
			}
		});
	}

	/**
	 * 发送带token的mui.ajax的请求，config对象要包含了url,成功的success回调方法，和error方法
	 * @param {Object} config
	 */
	owner.tokenAjax_Get = function(config) {
		//检查token
		var isOk = owner.checkToken();
		if(isOk == "false") {
			return; //终止发送请求
		}
		var authorization = 'Bearer ' + owner.getToken();
		mui.ajax(config.url, {
			crossDomain: true,
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 5000, //超时时间设置为10秒；
			success: config.success,
			error: config.error,
			headers: { //设置消息头部
				'Authorization': authorization,
				'Content-Type': 'application/json'
			}
		});
	}
	/**
	 * 发送带token的mui.ajax的请求，config对象要包含了url,data,成功的success回调方法，和error方法
	 * @param {Object} config
	 */
	owner.tokenAjax_GetPoto = function(config) {
		//检查token
		var isOk = owner.checkToken();
		if(isOk == "false") {
			return; //终止发送请求
		}
		var authorization = 'Bearer ' + owner.getToken();
		mui.ajax(config.url, {
			data: config.data,
			crossDomain: true,
			type: 'get', //HTTP请求类型
			timeout: 5000, //超时时间设置为10秒；
			success: config.success,
			error: config.error,
			headers: { //设置消息头部
				'Authorization': authorization,
				'Content-Type': 'application/json'
			}
		});
	}

	/**
	 * 打开新的窗口，不传递参数
	 * @param {Object} url 页面url
	 * @param {Object} id 页面id
	 */
	owner.openWebView = function(url, id) {
		owner.inputBlur();
		mui.openWindow({
			url: url,
			id: id,
			show: {
				autoShow: true, //页面loaded事件发生后自动显示，默认为true
				//				aniShow: "zoom-fade-out" //页面显示动画，默认为”slide-in-right“；
			}
		})
	}
	/**
	 * 打开新的窗口，可传递参数
	 * @param {Object} url 页面url
	 * @param {Object} id 页面id
	 * @param {Object} params 需要要传递的参数json格式
	 */
	owner.openWindow = function(url, id, params) {

		owner.inputBlur();
		mui.openWindow({
			url: url,
			id: id,
			extras: params, //自定义扩展参数，可以用来处理页面间传值
			createNew: true,
			show: {
				autoShow: true, //页面loaded事件发生后自动显示，默认为true
			}
		})
	}
	
	/**
	 * 打开创建订单页面
	 */
	owner.openOrderWindow = function() {
		mui.openWindow({
			url: "../order.html",
			id: "order",
			styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
				titleNView: { // 窗口的标题栏控件
					titleText: "创建订单", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
					titleColor: "#FFFFFF", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
					titleSize: "17px", // 字体大小,默认17px
					backgroundColor: "#4dbeca", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
					progress: { // 标题栏控件的进度条样式
						color: "#00FA9A", // 进度条颜色,默认值为"#00FF00"  
						height: "2px" // 进度条高度,默认值为"2px"         
					},
					autoBackButton: true
				}
			}
		});
	}

	/**
	 * 打开新的窗口，可传递参数，需要手动显示
	 * @param {Object} url 页面url
	 * @param {Object} id 页面id
	 * @param {Object} params 需要要传递的参数json格式
	 */
	owner.openWindowNoAutoShow = function(url, id, params) {
		owner.inputBlur();
		mui.openWindow({
			url: url,
			id: id,
			extras: params, //自定义扩展参数，可以用来处理页面间传值
			createNew: true,
			show: {
				autoShow: false, //页面loaded事件发生后自动显示，默认为true
				//				aniShow: "zoom-fade-out" //页面显示动画，默认为”slide-in-right“；
			}
		})
	}
	/**
	 * 打开收件人地图页面并显示图片，可传递参数
	 * @param {Object} url 页面url
	 * @param {Object} id 页面id
	 * @param {Object} params 需要要传递的参数json格式
	 */
	owner.openReceiveMapWindow = function(url, id, params) {
		owner.inputBlur();
		var mapHeight = (plus.screen.resolutionHeight - 350);
		var mapLeft = (plus.screen.resolutionWidth - 28) / 2;
		var t = ((mapHeight) / 2 + 70);

		if(plus.device.model === IPHONEX) {
			t += 20;
		}
		mui.openWindow({
			url: url,
			id: id,
			extras: params, //自定义扩展参数，可以用来处理页面间传值
			styles: {
				subNViews: [{
					id: 'view_icon',
					styles: {
						top: t + 'px',
						left: mapLeft + "px",
						height: '50px',
						width: '30px'
					},
					tags: [{
						tag: 'img',
						id: '"map_1"',
						src: '/images/map/mapLocation.png',
						position: {
							top: '0px',
							left: '0px',
							width: 'auto',
							height: 'auto'
						},
						sprite: {
							top: '0px',
							left: '0px',
							width: '100%',
							height: '100%'
						}
					}]
				}, {
					id: 'view_icon_1',
					styles: {
						top: ((mapHeight) + 24) + 'px',
						left: '5px',
						height: '30px',
						width: '30px'
					},
					tags: [{
						tag: 'img',
						id: '"map_2"',
						src: '/images/map/map_1.png',
						position: {
							top: '20%',
							left: '0px',
							width: '80%',
							height: '80%'
						},
						sprite: {
							top: '0px',
							left: '0px',
							width: '100%',
							height: '100%'
						}
					}]
				}, {
					id: 'view_icon_2',
					styles: {
						top: ((mapHeight) + 24) + 'px',
						height: '30px',
						width: '30px',
						left: "85%"
					},
					tags: [{
						tag: 'img',
						id: '"map_3"',
						src: '/images/map/map_3.png',
						position: {
							top: '0%',
							left: '0px',
							width: '100%',
							height: '100%'
						},
						sprite: {
							top: '0px',
							left: '0px',
							width: '100%',
							height: '100%'
						}
					}]
				}]
			}
		})
	}

	/**
	 * 打开地图页面并显示图片，可传递参数
	 * @param {Object} url 页面url
	 * @param {Object} id 页面id
	 * @param {Object} params 需要要传递的参数json格式
	 */
	owner.openMapWindow = function(url, id, params) {
		owner.inputBlur();
		var mapHeight = (plus.display.resolutionHeight - 350);
		var mapLeft = (plus.display.resolutionWidth - 28) / 2;
		var t = ((mapHeight) / 2 + 70);
		if(plus.device.model === IPHONEX) {
			t += 20;
		}
		mui.openWindow({
			url: url,
			id: id,
			extras: params, //自定义扩展参数，可以用来处理页面间传值
			styles: {
				subNViews: [{
					id: 'view_icon',
					styles: {
						top: t + 'px',
						left: mapLeft + "px",
						height: '50px',
						width: '30px'
					},
					tags: [{
						tag: 'img',
						id: '"map_1"',
						src: '/images/map/mapLocation.png',
						position: {
							top: '0px',
							left: '0px',
							width: 'auto',
							height: 'auto'
						},
						sprite: {
							top: '0px',
							left: '0px',
							width: '100%',
							height: '100%'
						}
					}]
				}, {
					id: 'view_icon_1',
					styles: {
						top: ((mapHeight) + 24) + 'px',
						left: '5px',
						height: '30px',
						width: '30px'
					},
					tags: [{
						tag: 'img',
						id: '"map_2"',
						src: '/images/map/map_1.png',
						position: {
							top: '20%',
							left: '0px',
							width: '80%',
							height: '80%'
						},
						sprite: {
							top: '0px',
							left: '0px',
							width: '100%',
							height: '100%'
						}
					}]
				}]
			}
		})
	}
	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = myStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		myStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return(email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if(!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		myStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = myStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	/**
	 * 获取本地是否安装客户端
	 **/
	owner.isInstalled = function(id) {
		//		if(id === 'qihoo' && mui.os.plus) {
		//			return true;
		//		}
		if(mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch(e) {}
		} else {
			switch(id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));