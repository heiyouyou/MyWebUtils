/*
	author:Wells
	date:2016/4/13
	content:sg类库插件之弹出组件
	用法：先引入官方jQuery类库，然后随便调用1-4中的任意一个弹出框进行弹出，
	格式如：
	$.tzDialog.AllBtn({
		title:"红色弹出框",//自定义标题
		content:"你舍得吗？",//自定义修改内容
		background:"red",//自定义背景色
		overlayClick:false,//true表示点击非弹出框部分进行取消弹出框，false反之。
		padding:30,//自定义内容距离边框的距离
		border:"10px solid white",//自定义边框的样式
		//回调函数点击按钮后执行
		callback:function(ok){//自定义回调函数进行相关业务逻辑的需求
			if(ok){
				alert("欢迎再次使用！！！");
			}else{
				alert("感谢客官手下留情！！！");
				//this.style.background = "blue";//为什么无效且报错？？？
			};
		}
	});
*/
//闭包组件封装
(function($){
	$.wzyDialog = {
		//定义一个层级变量用来分层显示弹出层
		zIndex:100,
		//1剔除所有按钮的弹出框
		CancelAll:function(options){
			var $dialog = this.init(options);
			$dialog.find(".cancel,.sure").remove();
		},
		//2剔除取消按钮的弹出框
		SureBtn:function(options){
			var $dialog = this.init(options);
			$dialog.find(".cancel").remove();
		},
		//3剔除确认按钮的弹出框
		CancelBtn:function(options){
			var $dialog = this.init(options);
			$dialog.find(".sure").remove();
		},
		//4保留所有按钮的弹出框
		AllBtn:function(options){
			this.init(options);
		},
		//弹出框的初始化
		init:function(options){
			//每次调用init()zIndex都会自加1
			this.zIndex++;//this指向$.tzDialog
			//扩展一个弹出框要改变内容和样式的对象
			var opts = $.extend({},$.tzDialog.defaults,options);
			//声明一个变量接收返回的对象
			var $dialog = this.template(opts);
			this._position($dialog);
			this._resize($dialog);
			this._event($dialog,opts);
			//先判断是否允许拖动
			if(opts.drag)this._drag($dialog);
			//最终改变弹出框和阴影层的样式
			$dialog.css({
				width:opts.width,
				height:opts.height,
				background:opts.background,
				border:opts.border,
				padding:opts.padding,
				margin:opts.margin,
				zIndex:this.zIndex//this指向$.tzDialog
			}).next().css("zIndex",this.zIndex-1);//改变阴影层的层级
			//返回弹出框对象
			return $dialog;
		},
		//弹出框的模板
		template:function(opts){
			//创建弹出框（可以自定义更改）
			var $dialog = $("<div class='dialog'>"+
		"		<div class='header'>"+
		"			<span>"+opts.title+"</span>"+
		"			<a href='javascript:void(0);' class='close'><i class='iconfont'>&#xe607;</i></a>"+
		"		</div>"+
		"		<div class='content'>"+
		"			"+opts.content+""+
		"		</div>"+
		"		<div class='button'>"+
		"			<a href='javascript:void(0);' class='sure'>确认</a>"+
		"			<a href='javascript:void(0);' class='cancel'>取消</a>"+
		"		</div>"+
		"	</div>");
		//将弹出框以及阴影层放进body中
		$("body").append($dialog).append("<div class='overlay'></div>");
		//返回创建好的弹出框对象
		return $dialog;
		},
		//弹出框始终居中浏览器
		_position:function($dialog){
			//使弹出框水平居中
			var left = ($(window).width() - $dialog.get(0).offsetWidth)/2;
			//使弹出框垂直居中
			var top = ($(window).height() - $dialog[0].offsetHeight)/2;
			//给弹出框添加居中样式
			$dialog.css({left:left,top:top});
		},
		//窗口变化事件
		_resize:function($dialog){
			//this指向$.tzDialog
			var $this = this;
			//窗口变化弹出框始终居中
			$(window).resize(function(){
				$this._position($dialog);
			});
		},
		//同步鼠标移动与弹出框的坐标位置
		_drag:function($dialog){
			//给弹出框头部绑定点击事件
			$dialog.find(".header").mousedown(function(ev){
				var e = ev||window.event;
				//拿到点击位置与弹出框位置坐标的差值即是点击位置距离弹出框边的距离
				/*//不考虑页面滚动
				var x = e.clientX - $dialog.offset().left;
				var y = e.clientY - $dialog.offset().top;*/
				//考虑页面滚动条
				var x = e.pageX - $dialog.offset().left;
				var y = e.pageY - $dialog.offset().top;
				//给document绑定鼠标移动事件而不是给弹出框$dialog绑定
				$(document).mousemove(function(ev){
					var e = ev||window.event;
					//获取鼠标移动时弹出框距离浏览器窗口的距离
					/*不考虑页面滚动
					var l = e.clientX - x;
					var t = e.clientY - y;*/
					//考虑页面滚动条
					var l = e.pageX - x;
					var t = e.pageY - y;
					/*//拿到弹出框可以移动的最大水平距离（但不包括border和padding）
					var maxL = $(window).width() - $dialog.width();
					//拿到弹出框可以移动的最大垂直距离（但不包括border和padding）
					var maxT = $(window).height() - $dialog.height();*/

					/*//拿到弹出框可以移动的最大水平距离（包括border和padding）
					var maxL = $(window).width() - $dialog.outerWidth();
					//拿到弹出框可以移动的最大垂直距离（包括border和padding）
					var maxT = $(window).height() - $dialog.outerHeight();*/

					//拿到弹出框可以移动的最大水平距离（包括border和padding）
					var maxL = $(window).width() - $dialog.get(0).offsetWidth;
					//拿到弹出框可以移动的最大垂直距离（包括border和padding）
					var maxT = $(window).height() - $dialog[0].offsetHeight;
					//防止弹出框移出浏览器的情况
					if(l<0)l=0;
					if(t<0)t=0;
					if(l>maxL)l=maxL;
					if(t>maxT)t=maxT;
					//给弹出框动态添加坐标位置的样式
					$dialog.css({top:t,left:l});
				}).mouseup(function(){
					//解绑事件
					$(this).off("mousemove");
					//有没有都没影响
					$(this).off("mouseup");
				}).mousedown(function(){
					return false;//阻止点击过程被选中的默认事件
				});
			});
		},
		//点击各种按钮触发的效果
		_event:function($dialog,opts){
			//点击确认按钮和关闭按钮
			$dialog.find(".sure,.close").on("click",function(){
					//先消除阴影层，再消除弹出框
					if(opts.callback){//先判断是否有回调函数传入
						opts.callback.call($dialog,true);//用call调整回调函数callback中的this指向$dialog为其添加样式
					}
					$dialog.next().remove();
					$dialog.remove();
				}
			);
			//点击取消按钮
			$dialog.find(".cancel").on("click",function(){
				if(opts.callback){
					opts.callback.call($dialog,false);
				};
			});
			//点击阴影层消除弹出框和阴影层
			if(opts.overlayClick){//先判断能否点击阴影层触发效果
				$dialog.next().click(function(){
					$(this).remove();
					$dialog.remove();
				});
			}
		},
	};
	//弹出框初始的默认样式和内容
	$.wzyDialog.defaults = {
		title:"您要删除吗？",
		content:"不要删除我好吗？",
		width:320,
		height:200,
		background:"red",
		border:"10px solid yellow",
		drag:true,//true为默认可以拖动弹出框，false则为不可以拖动弹出框
		overlayClick:true//默认可以点击阴影层消除弹出框和阴影层
	};
})(jQuery);//jQuery是一个有意义的实参