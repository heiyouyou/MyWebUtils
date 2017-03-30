(function($){
	$.fn.wzyDrag = function(options){
		// 对象混入
		var opts = $.extend({},$.fn.methods,$.fn.defaults,options);
		// this指代所有jquery对象
		return this.each(function(){
			// $(this)在这里指代调用wzyDrag()方法的某个对象
			opts.init($(this),opts);
		});	
	};
	$.fn.methods = {
		init:function($object,opts){
			$object.on("mousedown",function(e){
				var $obj = $(this);
				// 获取对象的相对横轴标
				var oleft = $obj.offset().left;
				// 获取对象的相对纵轴标
				var otop = $obj.offset().top;
				// 获取点击时的鼠标位置
				var dx = getXY(e).x;
				var dy = getXY(e).y;
				// 获取移动的最大距离
				var maxleft = $(window).width() - $obj.width();
				var maxtop = $(window).height() - $obj.height();
				$(document).on("mousemove",function(e){
					// 获取鼠标移动的坐标
					var mx = getXY(e).x;
					var my = getXY(e).y;
					// 移动的坐标赋值给对象
					var mleft = mx - dx + oleft;
					var mtop = my - dy + otop;
					// 边界的判断
					if(mleft <= 0)mleft = 0;
					if(mtop <= 0)mtop = 0;
					if(mleft >= maxleft)mleft = maxleft;
					if(mtop >= maxtop)mtop = maxtop;
					if(opts.arrow == "left"){
						$obj.css({left:mleft});
					}else if(opts.arrow == "top"){
						$obj.css({top:mtop});
					}else{
						$obj.css({top:mtop,left:mleft});
					};
				}).on("mouseup",function(){
					$(this).off("mousemove mouseup");
					if(opts.callback)opts.callback.call($obj);
				});
			});
		}
	};
	$.fn.defaults = {
		arrow:"",
		callback:null
	};
	// 获取鼠标点的坐标位置
	function getXY(event){
		// 兼容性写法
		var x = event.pageX || (event.clientX + (document.body.scrollLeft||document.documentElement.scrollLeft));
		var y = event.pageY || (event.clientY + (document.body.scrollTop||document.documentElement.scrollTop));
		// json格式返回数据
		return {x:x,y:y};
	};
})(jQuery);