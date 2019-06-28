(function(){
	var orderList = myStorage.getItem("notFinishedOrder");
	if( !orderList || orderList.length == 0 || ){
		return;
	}
	for(var i=0,len=orderList.length;i<len;i++){
		var order = orderList[i];
		if(order.orderStatus == "JUST_CREATED"){//自动取消订单
			
		}else if(order.orderStatus == "PAYED"){
			//创建本地推送消息
			plus.push.createMessage("对不起，您的订单："+order.id+"由于长时间未找到配送员，")
			
		}
		
	}
	
	
	
})();
