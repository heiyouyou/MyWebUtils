var wzyDrag = (function(){
	var zindex = 1;
	function wzy_Drag(dom){
		// 当前元素
		var parentDom = dom;
		//第一步：拿到要进行拖拽的元素
		var dragDom = dom;
		//需要在父盒子绑定属性dragindex指定第几个孩子可以拖拽
		var dragIndex = dom.getAttribute("dragindex");
		//你要委托子元素去拖拽
		if(dragIndex)dragDom = dom.children[dragIndex*1-1];
		//拖拽三部曲：
		//1:给元素加position:absolute/fixed; 改变top,left的值
		//2:给拖拽元素绑定onmousedown事件
		dragDom.onmousedown = function(e){
			//操作永远外层父盒子
			var x = getXY(e).x;
			var y = getXY(e).y;
			var cleft = parentDom.offsetLeft;
			var ctop  = parentDom.offsetTop;
			var maxLeft = window.innerWidth - parentDom.offsetWidth;
			var maxTop = window.innerHeight - parentDom.offsetHeight;
			// 每次拖拽当前盒子都是位于最高层
			parentDom.style.zIndex = ++zindex;
			//3:给document绑定onmousemove 和onmouseup事件
			document.onmousemove = function(e){
				var nleft = getXY(e).x - x + cleft;
				var ntop = getXY(e).x - y + ctop;
				if(ntop<=0)ntop=0;
				if(nleft<=0)nleft=0;
				if(ntop>=maxTop)ntop=maxTop;
				if(nleft>=maxLeft)nleft=maxLeft;
				parentDom.style.left = nleft+"px";
				parentDom.style.top = ntop+"px";
			};
			document.onmouseup = function(e){
				document.onmousemove = null;
				document.onmouseup = null;
			};
		};
	};
	// 获取鼠标点的坐标位置
	function getXY(ev){
		var event = ev || window.event;
		// 兼容性写法
		var x = event.pageX || (event.clientX + (document.body.scrollLeft||document.documentElement.scrollLeft));
		var y = event.pageY || (event.clientY + (document.body.scrollTop||document.documentElement.scrollTop));
		// json格式返回数据
		return {x:x,y:y};
	};
	return wzy_Drag;
})();
