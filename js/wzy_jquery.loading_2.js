// 挂载在jQuery对象上进行扩展loading组件 
(function($){
	// 加载组件的初始化入口
	$.wzyLoading = function(options){
		// 将参数混合
		var opts = $.extend({},$.wzyLoading.defaults,options);
		// 创建loading
		var $loading = $.wzyLoading.template(opts);
		// 调整loading位置
		$.wzyLoading.position($loading);
		// 触发loading的事件
		$.wzyLoading.events($loading,opts);
	};
	// 加载组件的模板
	$.wzyLoading.template = function(opts){
		var $loading = $("<div class='wzyLoading animated bounceInUp'><span>"+opts.content+"</span></div>");
		$("body").append($loading);
		return $loading;
	};
	// 加载组件的位置
	$.wzyLoading.position = function($loading){
		var winW = $(window).width();
		var winH = $(window).height();
		var loadingW = $loading.width();
		var loadingH = $loading.height();
		var left = (winW - loadingW)/2;
		var top = (winH - loadingH)/2;
		$loading.css({top:top,left:left});
	};
	// 加载组件的事件
	$.wzyLoading.events = function($loading,opts){
		$(window).resize(function(){
			$.wzyLoading.position($loading);
		});
		$loading.on("click",function(){
			if($loading.timer)clearTimeout($loading.timer);
			// 兼容IE678的写法
			$(this).removeClass("animated bounceInUp").addClass("animated bounceOutUp")[opts.animate](1000,function(){
				$(this).remove();
			});
		});
		// 触发定时退出loading
		if(opts.time){
			if($loading.timer)clearTimeout($loading.timer);
			$loading.timer = setTimeout(function(){
				$loading.trigger("click");
				clearTimeout($loading.timer);
			},opts.time*800);
		};
	};
	// 加载组件的默认配置参数
	$.wzyLoading.defaults = {
		content:"加载中...",//模板内容
		animate:"fadeOut",//jQuery动画类型
		time:0//定时器的时间值
	};
})(jQuery);