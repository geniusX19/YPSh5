/* 总配置项  */

/* 百度地图搜索范围 */
BAIDU_AREA = "合肥";
STORAGE_NAME_SEO = 'seo'
PAGESIZE = 5;
PHONE_PATTERN = /^((0\d{2,3}-\d{7,8})|(1\d{10})|([\d]+))$/;
QRCODE_PATH = '_doc';
MERGE_PUSH_TIME = 'merge_push_time'; //拼单开始推送的时间

MESSAGE = "对不起，您有长时间未被配送员接单的订单，可以取消订单或重新派单";

VEHICLE_TYPE_ARRARY = ['ELECTRIC_BICYCLE', 'MOBILE_TRICYCLE', 'CAR', 'VAN', 'TRUCK'];

/********************   接口   ****************************/
API = "https://yikesong.cc";
//API="http://192.168.100.119";
//API = "https://peter.xiaomiqiu.com"
//API="http://47.98.99.234";
//API = "https://zsx.xiaomiqiu.com"
//API = "http://192.168.100.110:8080"
API_SERVER = API + ":8080";
//API_SERVER = API;
//API_SERVER = API;
API_IOS_CHECK = API_SERVER + "/api/public/ios/check";
/**
 * 轮播图从1到3
 */
API_SLIDER_IMG = API_SERVER + "/api/public/apk/getSliderImg/index/";
/*
 * 其他的发送短信的接口
 */
API_SMS = API_SERVER + "/api/public/customer/sendSms";

/**
 * 短信登录时发送短信的接口
 */
API_LOGIN_SMS = API_SERVER + "/api/public/customer/sms_login";

/*
 * 短信登录
 */
API_SMS_LOGIN = API_SERVER + "/api/public/customer/loginBySms";
/**
 * 手机账号 密码登录
 */
API_LOGIN = API_SERVER + "/api/public/customer/loginByPhonenumber";

/* 第三方平台登录 */
API_LOGIN_QQ = API_SERVER + "/api/public/customer/loginByQQ";
API_LOGIN_WX = API_SERVER + "/api/public/customer/loginByWX";

/**
 * token刷新
 */
API_FRESHTOKEN = API_SERVER + "/api/public/customer/refresh_token";

/*
 * 手机和密码的注册
 */
API_URL_USER_REGISTER = API_SERVER + "/api/public/customer/register";

/**
 * 用户个人资料
 */
//上传头像
API_URL_POST_UPLOAD_USER_HEAD = API_SERVER + "/customer/image/changeHeaderIcon/";
//修改昵称
API_URL_CHANGENAME = API_SERVER + "/api/customer/changeName/";

/** app内修改密码 需要token **/
API_CHANGE_PASSWORD_TOKEN = API_SERVER + "/api/customer/changePasswordByToken/";
/** 通过短信验证码来修改密码  不需要token**/
API_CHANGE_PASSWORD = API_SERVER + "/api/public/customer/changePasswordByPhonenumber"

//绑定三方登录
API_BIND_QQ = API_SERVER + "/api/customer/bindQQ/";
API_BIND_WX = API_SERVER + "/api/customer/bindWX/"
/*** 绑定手机号 ***/
API_BIND_PHONE = API_SERVER + "/api/customer/bindPhonenumberAndPassword/"

/** 获取昵称和手机号  **/
API_URL_GET_USER_INFO = API_SERVER + "/api/customer/getUserInfo/";

//获取头像
API_URL_GET_USER_HEADER = API_SERVER + "/customer/image/headerIcon/";

/*** 用户对app的反馈 ****/
API_URL_FEEDBACK = API_SERVER + "/api/public/customer/feedback";

/**上传设备ID **/
API_URL_UPLOAD_CLIENTID = API_SERVER + "/api/public/uploadClientId/customer"

/**消息中心 **/
//获取消息
API_URL_GET_NOTIFICATIONS = API_SERVER + "/api/customer/notification/findNotification"
//获取消息数量
API_URL_GET_NOTIFICATION_COUNT = API_SERVER + "/api/customer/notification/countNotification/"

/**
 * 历史订单,一年内
 */
API_URL_GET_HISTORY_ORDERS = API_SERVER + "/api/customer/order/historyOrders";
//一个月内
API_URL_GET_ONEMONTH_HISTORY_ORDERS = API_SERVER + "/api/customer/order/oneMonth-historyOrders";
//一周内
API_URL_GET_ONEWEEK_HISTORY_ORDERS = API_SERVER + "/api/customer/order/oneWeek-historyOrders";
//自定义
API_URL_POST_DEFINETIME_HISTORY_ORDERS = API_SERVER + "/api/customer/order/getDefineTimeHistoryOrders";

/**
 * 未完成的订单
 */
API_URL_GET_NOW_ORDERS = API_SERVER + "/api/customer/order/unfinishedorder/";

/**
 * 获取单个订单的详情
 */
API_GET_ORDER_DETAIL = API_SERVER + "/api/customer/order/";

/**
 * 获取订单状态
 */
API_URL_GET_ORDER_STATUS = API_SERVER + "/api/customer/order/getOrderStatus/"
/**
 * 新增发件人地址
 */
API_URL_POST_SAVE_STARTER_ADDRESS = API_SERVER + "/api/customer/frequentstarter/save/customerId/";

/**
 * 新增收件人地址
 */
API_URL_POST_SAVE_RECEIVER_ADDRESS = API_SERVER + "/api/customer/frequentreceiver/save/customerId/";

/**
 * 获取联系常用地址
 */
//常用发件人
function getStarterAddressUrl(customerId, pageIndex, pageSize) {
	return API_SERVER + "/api/customer/frequentstarter/findList/customerId/" + customerId + "/pageIndex/" + pageIndex + "/pageSize/" + pageSize;
}

//常用收件人地址
function getReceiverAddressUrl(customerId, pageIndex, pageSize) {
	return API_SERVER + "/api/customer/frequentreceiver/findList/customerId/" + customerId + "/pageIndex/" + pageIndex + "/pageSize/" + pageSize;
}
API_URL_GET_QUERY_PRICE_MODE_CITY = API_SERVER + "/api/customer/orderPriceMode/newModel/"

/**
 * 修改地址
 * 
 */
function editStarterAddressURL(addressId) {
	return API_SERVER + "/api/customer/frequentstarter/edit/customerId/" + app.getCustomerId() + "/addressId/" + addressId;
}

function editReceiverAddressURL(addressId) {
	return API_SERVER + "/api/customer/frequentreceiver/edit/customerId/" + app.getCustomerId() + "/addressId/" + addressId;
}

/**
 * 快速查询收发件人
 * 
 */
function quickFindStarterAddressURL(customerId, quickFind) {
	return API_SERVER + "/api/customer/frequentstarter/quickFindStarter/" + customerId + "/" + quickFind;
}

function quickFindReceiverAddressURL(customerId, quickFind) {
	return API_SERVER + "/api/customer/frequentreceiver/quickFindReceiver/" + customerId + "/" + quickFind;
}
/**
 * 常用物品
 */
API_URL_POST_ITEM_SAVE = API_SERVER + "/api/customer/item/saveoredit/";

function getItemList(customerId, pageIndex, pageSize) {
	return API_SERVER + "/api/customer/item/findItemList/" + customerId + "/pageIndex/" + pageIndex + "/pageSize/" + pageSize
}
API_URL_POST_ITEM_DELELE = API_SERVER + "/api/customer/item/deleteOne/";
API_URL_POST_ITEM_BATCH_DELELE = API_SERVER + "/api/customer/item/batchDelete/";
/**
 * 删除一个联系人
 */
API_URL_POST_DELETE_RECEIVER_ADDRESS = API_SERVER + "/api/customer/frequentreceiver/delete/id/";
API_URL_POST_DELETE_STARTER_ADDRESS = API_SERVER + "/api/customer/frequentstarter/delete/id/";

API_URL_POST_BATCH_DELETE_RECEIVER_ADDRESS = API_SERVER + "/api/customer/frequentreceiver/batchDelete"
API_URL_POST_BATCH_DELETE_STARTER_ADDRESS = API_SERVER + "/api/customer/frequentstarter/batchDelete"
/**
 * 订单预览计算距离和价格的接口
 */
//拼单
API_URL_POST_PREVIEW_ORDER_MERGE = API_SERVER + "/api/customer/ordering/mergeOrder/preview/";
//直发
API_URL_POST_PREVIEW_ORDER_DIRECT = API_SERVER + "/api/customer/ordering/directOrder/preview/";
//预约
API_URL_POST_PREVIEW_ORDER_APPOINTMENT = API_SERVER + "/api/customer/ordering/appointmentOrder/preview/";
//高级预约
API_URL_POST_PREVIEW_ORDER_ADVANEDAPPOINTMENT = API_SERVER + "/api/customer/ordering/advancedAppointmentOrder/preview/";

API_URL_POST_ORDER_CALCULATE = API_SERVER + "/api/customer/ordering/calculateMergeAndDirectOrderPrice"

/****创建订单****/
//拼单
API_URL_POST_CREATE_ORDER_MERGE = API_SERVER + "/api/customer/ordering/mergeOrder/create/";
//直发
API_URL_POST_CREATE_ORDER_DIRECT = API_SERVER + "/api/customer/ordering/directOrder/create/";
//预约
API_URL_POST_CREATE_ORDER_APPOINTMENT = API_SERVER + "/api/customer/ordering/appointmentOrder/create/";
//高级预约
API_URL_POST_CREATE_ORDER_ADVANEDAPPOINTMENT = API_SERVER + "/api/customer/ordering/advancedAppointmentOder/create/";

/** 取消订单**/
API_URL_POST_CANCEL_ORDER = API_SERVER + "/api/customer/ordering/cancel/";

/**** 重新派单 ****/
API_URL_POST_AGAIN_SEND_ORDER = API_SERVER + "/api/customer/ordering/againSendOrder/";

//删除订单
API_URL_POST_DELETE_HISTORY_ORDER = API_SERVER + "/api/customer/ordering/deleteOrder/";
/***** 获取支付信息  *****/
//url +orderId
function getPaymentURL() {
	return API_SERVER + "/api/customer/" + app.getCustomerId() + "/pc/orderBill/";
}
/** 验证配送员 **/
function validateSender(orderId, code) {
	return API_SERVER + "/api/customer/" + app.getCustomerId() + "/pc/orders/" + orderId + "/verifySender/code/" + code;
}
/** 评论 **/
function estimate(orderId) {
	return API_SERVER + "/api/customer/" + app.getCustomerId() + "/pc/orders/" + orderId + "/estimate"
}

/** 获取配送员信息 **/
API_URL_GET_SENDERINFO = API_SERVER + "/api/customer/querySender/senderInfo/"

API_URL_GET_SENDER_LOCATION = API_SERVER + "/api/customer/querySender/senderLocation/"

/**
 * app版本更新
 */
API_URL_GET_UPDATE = API_SERVER + "/api/public/apk/latest-customer-app";
/**
 * 取最新app的版本号
 */
API_URL_GET_VERSION = API_SERVER + "/api/public/apk/checkUpdate";
/**
 * 可用红包数量
 * 
 */
function countCanUseCouponUrl(customerId, orderPrice, type) {
	return API_SERVER + "/api/customer/coupon/countCanUseCoupon/" + customerId + "/orderPrice/" + orderPrice + "/" + type;
}
/**
 * 根据订单价格可用红包列表
 * @param {Object} customerId
 * @param {Object} orderPrice
 */
function findCanUseCouponListUrl(customerId, orderPrice, type) {
	return API_SERVER + "/api/customer/coupon/findCanUseCouponList/" + customerId + "/orderPrice/" + orderPrice + "/" + type;
}
/**
 * 查询所有可用的红包列表
 */
API_URL_GET_CAN_USE_ALL_COUPON_LIST = API_SERVER + "/api/customer/coupon/findCanUseCouponAllList/";
/**
 * 查询所有可用的红包数量
 */
API_URL_GET_COUNT_CAN_USE_ALL_COUPON = API_SERVER + "/api/customer/coupon/countAllCanUseCoupon/";
/**
 * 查询所有已使用的红包和过期的红包列表
 */
API_URL_POST_FIND_HISTORY_COUPON_LIST = API_SERVER + "/api/customer/coupon/findHistoryCouponList";

/**
 * 查询所有已使用的红包和过期的红包列表
 */
API_URL_GET_FIND_NOT_CHECK_COUPON = API_SERVER + "/api/customer/coupon/findNotCheckedAndNotUsedAndNotExpired/";

API_URL_POST_GIVE_AREA_COUPON = API_SERVER + "/api/customer/coupon/loginGiveAreaCoupon";

/**
 * 开通城市的列表
 */
API_URL_GET_CITY_LIST = API_SERVER + "/api/public/sender/getCityList";

/**
 * 最近下单的物品、收发件人信息
 */
API_URL_GET_FIND_LATEST_TEN_ORDERS = API_SERVER + "/api/customer/order/findLatestTenOrders/"

/**
 * 是否需要验证配送员
 * @param {Object} status
 */
function changeValidateSender(status) {
	return API_SERVER + "/api/customer/isNeedValidateSender/" + status + "/" + app.getCustomerId();
}

API_URL_GET_VALIDATE_SENDER = API_SERVER + "/api/customer/getNeedValidateSenderStatus/";

API_URL_GET_DEFAULT_ITEM_STARTER = API_SERVER + "/api/customer/item/getDefault/";

function addOrEditDefaultItem(customerId, itemId) {
	return API_SERVER + "/api/customer/item/addOrEditDefaultItem/" + customerId + "/" + itemId;
}

function addOrEditDefaultStarter(customerId, starterId) {
	return API_SERVER + "/api/customer/frequentstarter/addOrEditDefaultStarter/" + customerId + "/" + starterId;
}

/**
 * 一键呼叫
 */
function getPhoneCallURL(customerId, longitude, latitude) {
	return API_SERVER + "/api/customer/" + customerId + "/quickcall/price?startLng=" + longitude + "&startLat=" + latitude;
}

function postPhoneCallOrderURL(customerId) {
	return API_SERVER + "/api/customer/" + customerId + "/quickcall";
}

function getPayString(customerId, orderId) {
	return API_SERVER + "/api/customer/" + customerId + "/quickcall/" + orderId + "/bill"
}

function postCancelQuickcall(customerId, id) {
	return API_SERVER + "/api/customer/" + customerId + "/quickcall/" + id + "/cancel"
}

function getPhoneCallDetail(customerId, id) {
	return API_SERVER + "/api/customer/" + customerId + "/quickcall/quickcallId/" + id;
}

function getPhoneCallList(customerId, pageIndex) {
	return API_SERVER + "/api/customer/" + customerId + "/quickcall?pageIndex=" + pageIndex + "&pageSize=" + PAGESIZE;
}

function postRefundQuickcall(customerId, id) {
	return API_SERVER + "/api/customer/" + customerId + "/quickcall/" + id + "/refund";
}

function postDeleteQuickcall(customerId, id) {
	return API_SERVER + "/api/customer/" + customerId + "/quickcall/" + id + "/detach";
}

function postRecallQuickcall(customerId, id) {
	return API_SERVER + "/api/customer/" + customerId + "/quickcall/" + id + "/recall";
}

function getQuickCallStarters(customerId) {
	return API_SERVER + "/api/customer/" + customerId + "/quickcall/recentStarters";
}
/**账户充值******/
function createRechargeBill(customerId) {
	return API_SERVER + "/api/customer/" + customerId + "/recharges/bills";
}

function getAccountInfo(customerId) {
	return API_SERVER + "/api/customer/" + customerId + "/recharges/account";
}

function checkBillAlreadyPayed(customerId, billId) {
	return API_SERVER + "/api/customer/" + customerId + "/recharges/bills/" + billId + "/alreadyPayed";
}

function getRechargeRecords(customerId, pageIndex, pageSize) {
	return API_SERVER + "/api/customer/" + customerId + "/recharges/rechargeRecords?pageIndex=" + pageIndex + "&pageSize=" + pageSize;
}

function getPaymentRecords(customerId, pageIndex, pageSize) {
	return API_SERVER + "/api/customer/" + customerId + "/recharges/payOtherBill/records?pageIndex=" + pageIndex + "&pageSize=" + pageSize;
}

function useRechargeToPayBill(customerId, billId) {
	return API_SERVER + "/api/customer/" + customerId + "/recharges/payOtherBill/billId/" + billId;
}
//投诉
function customerComplain(customerId, orderId, complainNum) {
	return API_SERVER + '/api/customer/' + customerId + '/complain/order/' + orderId + '/' + complainNum;
}

function getComplainList(customerId, orderId) {
	return API_SERVER + '/api/customer/' + customerId + '/complain/' + orderId;
}
/***推广****/
//获取城市列表
API_URL_GET_PUBLIC_AGENT_LIST = API_SERVER + "/public/agent";
//推广码
function getSeoQrcode(customerId) {
	return API_SERVER + '/api/customer/' + customerId + '/businessman/qrcode';
}
//默认的奖励金额
function getSEORewardDefault(customerId) {
	return API_SERVER + "/api/customer/" + customerId + "/businessman/defaultRewardProperty";
}
//申请成为配送员
function becomeBusinessMan(customerId) {
	return API_SERVER + '/api/customer/' + customerId + '/businessman';
}

function getCustomerRewards(customerId) {
	return API_SERVER + '/api/customer/' + customerId + '/businessman/rewards';
}

function getBusinessManAccount(customerId) {
	return API_SERVER + '/api/customer/' + customerId + '/businessman/account';
}
//账户余额
function getBusinessManAccountRecords(customerId, pageIndex, pageSize) {
	return API_SERVER + '/api/customer/' + customerId + '/businessman/account/records?pageIndex=' + pageIndex + '&pageSize=' + pageSize;
}
//奖励金明细
function getBusinessManRewardsRecords(customerId, pageIndex, pageSize) {
	return API_SERVER + '/api/customer/' + customerId + '/businessman/rewards/records?pageIndex=' + pageIndex + '&pageSize=' + pageSize;
}
//推广用户记录
function getSpreadCustomers(customerId, pageIndex, pageSize) {
	return API_SERVER + '/api/customer/' + customerId + '/businessman/spreadCustomers?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

}
//推广配送员记录
function getSpreadSenders(customerId, pageIndex, pageSize) {
	return API_SERVER + '/api/customer/' + customerId + '/businessman/spreadSenders?pageIndex=' + pageIndex + '&pageSize=' + pageSize;
}
//提现申请
function postDraws(customerId) {
	return API_SERVER + '/api/customer/' + customerId + '/businessman/account/draws';
}
//提现记录
function getDrawRecords(customerId, pageIndex, pageSize) {
	return API_SERVER + '/api/customer/' + customerId + '/businessman/account/draws?pageIndex=' + pageIndex + '&pageSize=' + pageSize;
}

/*拼单后开始推送时间*/
function getMergeStartTime(customerId, lng, lat) {
	return API_SERVER + '/api/customer/' + customerId + '/orderProperties/mergeProperties?lng=' + lng + '&lat=' + lat;
}
/** 预计取件时间 **/
function estimateFetchTime(customerId, orderId) {
	return API_SERVER + '/api/customer/' + customerId + '/pc/orders/' + orderId + '/estimateFetchTime';
}
/** 预计送件 **/
function estimateSendTime(customerId, orderId) {
	return API_SERVER + '/api/customer/' + customerId + '/pc/orders/' + orderId + '/estimateSendTime';
}

/* 下单界面 */
ITEM_TYPE = ["数码产品", "生活用品", "母婴用品", "水果生鲜", "衣服鞋子", "其它"];
ITEM_SIZE = [{
		"value": "SMALL",
		"text": "小件（30cm*30cm*30cm）"
	},
	{
		"value": "MIDDLE",
		"text": "中件（50cm*50cm*30cm）"
	},
	{
		"value": "BIG",
		"text": "大件（100cm*100cm*50cm）"
	},
	{
		"value": "VERY_BIG",
		"text": "超大件（150cm*150cm*100cm）"
	}
];