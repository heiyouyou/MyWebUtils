// 面向对象的loading组件
(function($){
	$.wzyLoading = {
		init:function(options){
			// 将参数混合
			var opts = $.extend({},$.wzyLoading.defaults,options);
			// 创建loading
			var $loading = this.template(opts);
			// 调整loading位置
			this.position($loading);
			// 触发loading的事件
			this.events($loading,opts);
		},
		template:function(opts){
			var $loading = $("<div class='wzyLoading animated bounceInUp'><span>"+opts.content+"</span></div>");
			$("body").append($loading);
			return $loading;
		},
		position:function($loading){
			var winW = $(window).width();
			var winH = $(window).height();
			var loadingW = $loading.width();
			var loadingH = $loading.height();
			var left = (winW - loadingW)/2;
			var top = (winH - loadingH)/2;
			$loading.css({top:top,left:left});
		},
		events:function($loading,opts){
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
		}
	};
	// 加载组件的默认配置参数
	$.wzyLoading.defaults = {
		content:"加载中...",
		animate:"fadeOut",
		time:0
	};
})(jQuery);