/*
 * 百度地图独立方法合集，为啥这么做，因为便于维护
 * 不建议将该脚本内的方法汇总到其他公共/私有的方法合集中
 * 虽然理论上来说也是可用的
 */

function BaiduMap(){
	var _self=this;
	
	_self.obj=undefined;
	_self.map=undefined;
	_self.point=[];
	
	this.map=_self.map;
	
	/**
	 * 创建一个地图容器
	 * @param {String} dom 容器节点
	 */
	this.create=function(dom){
		var isID=dom.indexOf("#")==0?true:false;
		var isClass=dom.indexOf(".")==0?true:false;
		var isTag=(isID===false&&isClass===false)?true:false;
		
		if(isID) _self.obj=document.getElementById(dom.replace(/^\#/,""));
		if(isClass) _self.obj=document.getElementsByClassName(dom.replace(/^\./,""));
		if(isTag) _self.obj=document.getElementsByTagName(dom);
		
		return _self;
	};
	
	/**
	 * 设置地图是否可以拖拽
	 * @param {Boolean} bool 是否可以拖拽
	 */
	this.setDragging=function(bool){
		bool?_self.map.enableDragging():_self.map.disableDragging();
		return _self;
	}
	
	/**
	 * 设置地图区域大小
	 * @param {String} width 宽度
	 * @param {String} height 高度
	 */
	this.setArea=function(width,height){
		_self.obj.style.width=width;
		_self.obj.style.height=height;
		
		return _self;
	};
	
	/**
	 * 设置点的集合
	 * @param {Array} arr 点的集合
	 */
	this.setPoint=function(arr){
		_self.point=new Array();
		arr.forEach(function(v,i,a){
			_self.point.push(new BMap.Point(v[0],v[1]));
		});
	};
	
	/**
	 * 初始化地图，初始化了地图才会显示
	 * @param {Object} config 配置项，参照百度地图官方配置
	 */
	this.init=function(){
		if(typeof(_self.obj)==="undefined")
		{
			alert("语法错误");
		}
		else
		{
			_self.map=new BMap.Map(_self.obj,{
				enableMapClick:false
			});
			_self.map.centerAndZoom(new BMap.Point(117.282292,31.865387),15);
			_self.map.enableDragging();
			_self.map.disableScrollWheelZoom();
			_self.map.disableDoubleClickZoom();
			_self.map.highResolutionEnabled();
		}
		
		return _self;
	}
	
	/**
	 * 地图自动缩放合适的尺寸
	 */
	
	this.autoView=function(deviation){
		if(deviation===undefined) deviation=0;
		if(_self.point.length===0)
		{
//			alert("百度地图自适应失败，缺少必要参数");
		}
		else
		{
			var auto=_self.map.getViewport(_self.point);
			_self.map.centerAndZoom(auto.center,auto.zoom+parseInt(deviation));
		}
		
		return _self;
	}
	/**
	 * 创建marker点
	 */
	this.createMarker=function(){
		_self.point.forEach(function(v,i,a){
			var marker=new BMap.Marker(v);
			_self.map.addOverlay(marker);
		});
		
		return _self;
	}
	
	/**
	 * 创建label
	 */
	this.createLabel=function(arr){
		var min=10000;
		if(arr===undefined) arr=new Array();
		_self.point.forEach(function(v,i,a){
			var label=new BMap.Label();
			label.setPosition(v);
			if(arr)
			{
				label.setContent(arr[i]?arr[i]:i);
			}
			else
			{
				label.setContent(i);
			}
			label.setStyle({
				"display":"inline-block",
				"width":"24px",
				"height":"24px",
				"marginLeft":"-24px",
				"marginTop":"-24px",
				"lineHeight":"24px",
				"textAlign":"center",
				"fontFamily":"microsoft Yahei",
				"fontSize":"13px",
				"borderRadius":"50%",
				"backgroundColor":"#f2f2f2",
				"border":"3px solid #0894ec",
				"boxShadow":"0px 2px 5px #555555",
				"boxSizing":"content-box",
				"color":"#0894ec"
			});
			_self.map.addOverlay(label);
		})
	}
	
	/**
	 * 驾车路线规划
	 */
	this.drivingRoute=function(){
		var color=["#0894EC","#FFCC00","#FF6666","#9999FF"]
		_self.point.forEach(function(v,i,a){
			if(i!==a.length-1)
			{
				var drivingRoute=new BMap.DrivingRoute(_self.map);
				drivingRoute.search(a[i],a[i+1]);
				
				drivingRoute.setSearchCompleteCallback(function(){
					var res=drivingRoute.getResults().getPlan(0).getRoute(0).getPath();
					var polyline = new BMap.Polyline(res);
					polyline.setStrokeColor(color[i]);
					polyline.setStrokeOpacity(1);
					polyline.setStrokeWeight(3);
        			_self.map.addOverlay(polyline);
				})
				
			}
		});
	}
};