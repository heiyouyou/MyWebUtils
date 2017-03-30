if(!String.prototype.format ){
	String.prototype.format = function() {
		var e = arguments;
		return this.replace(/{(\d+)}/g,function(t, n) {
			return typeof e[n] != "undefined" ? e[n] : t
		})
	};
}
if (!Array.prototype.forEach && typeof Array.prototype.forEach !== "function") {
    Array.prototype.forEach = function(callback, context) {
       // 遍历数组,在每一项上调用回调函数，这里使用原生方法验证数组。
       if (Object.prototype.toString.call(this) === "[object Array]") {
           var i,
               len;
           for (i = 0, len = this.length; i < len; i++) {
               if (typeof callback === "function"  && Object.prototype.hasOwnProperty.call(this, i)) {
                   if (callback.call(context, this[i], i, this) === false) {
                       break; // or return;
                   }
               }
           }
       }
    };
}


if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    var k;
    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
	      if (k in O && O[k] === searchElement) {
	        return k;
	      }
	      k++;
	    }
	    return -1;
	  };
	}


if (!Array.prototype.lastIndexOf) {
	  Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var n, k,
        t = Object(this),
        len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }

    n = len - 1;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) {
        n = 0;
      }
      else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }

    for (k = n >= 0
          ? Math.min(n, len - 1)
          : len - Math.abs(n); k >= 0; k--) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}

function parseQuery(query) {
    var ret = {};
    var pairs = query.slice(1).toLowerCase().split("&");
    for (var i = 0, len = pairs.length; i < len; i++) {
      var kvp = pairs[i].split("=");
      if (kvp.length > 1) {
        ret[kvp[0]] = kvp.slice(1).join(",");
      }
    }
    return ret;
 }

  function addScript(srcUrl) {
    document.write('<scr' + 'ipt type="text/javascript" src="' + srcUrl + '"></script>');
  }


/**
 * 判断非空
 * 
 * @param val
 * @returns {Boolean}
 */
function isEmpty(val) {
	val = $.trim(val);
	if (val == null)
		return true;
	if (val == undefined || val == 'undefined')
		return true;
	if (val == "")
		return true;
	if (val.length == 0)
		return true;
	if (!/[^(^\s*)|(\s*$)]/.test(val))
		return true;
	return false;
}

function isNotEmpty(val) {
	return !isEmpty(val);
}

//范围随机数
function randomRange(start,end){
	return Math.floor(Math.random()*(end-start+1))+start;
};

function randomNum(num){
	return Math.floor(Math.random()*(num+1));
};

function randomColor(){
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return "rgb("+r+","+g+","+b+")";//IE7不支出rgb
};

function randomColor16(){
	//0-255	
	var r = Math.random(255).toString(16);
	var g = Math.random(255).toString(16);
	var b = Math.random(255).toString(16);
	//255的数字转换成十六进制
	if(r.length<2)r = "0"+r;
	if(g.length<2)g = "0"+g;
	if(b.length<2)b = "0"+b;
	return "#"+r+g+b;
};


function getIndex(dom){
	var index = -1;
	var domArr = Array.prototype.slice.call(dom.parentElement.children);
	domArr.forEach(function(obj,i){
		if(obj==dom){
			index = i;
			return false;
		}
	});
	return index;
};


function dom(id){
	return document.getElementById(id);
};


/*通过className获取dom元素进行过滤*/
function domClass(pid,sClass){
	var aEle = dom(pid).getElementsByTagName('*');
	var arrs = [];
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className.indexOf(sClass)!=-1){
			arrs.push(aEle[i]);
		}
	}
	return arrs;
}

//获取css中的样式的值，跟浏览器兼容无关
function getStyle(dom,attr){
	return window.getComputedStyle ? window.getComputedStyle(dom,false)[attr]:dom.currentStyle[attr];
};

//简单混入
function mixin(obj,obj2){
	for(var k in obj2){
		if(obj2.hasOwnProperty(k)){
			obj[k] = obj2[k];
		}
	}
	return obj;
};

//多对象混入
function mix(target,source){
	var arr = [];
	var args = arr.slice.call(arguments);
	
	var i = 1;
	if(args.length==1){
		return target;
	};

	while((source = args[i++])){
		for(var key in source){
			if(source.hasOwnProperty(key)){
				target[key] = source[key];
			}
		}
	}
	return target;
};

//获取鼠标的位置。兼容ie678
function getXY(e){
	var ev = e || window.event;
	var x=0,y=0;
	if(ev.pageX){
		x = ev.pageX;
		y = ev.pageY;
	}else{
		//拿到scrollTop 和scrollLeft
		var sleft = 0,stop = 0;
		//ie678---
		if(document.documentElement){
			stop =document.documentElement.scrollTop;
			sleft = document.documentElement.scrollLeft;
		}else{
		//ie9+ 谷歌 
			stop = document.body.scrollTop;
			sleft = document.body.scrollLeft;
		}	
		x = ev.clientX + sleft;
		y = ev.clientY + stop;
	}
	return {x:x,y:y};
};

/**
 * 阻止事件冒泡
 * 
 * @param e
 */
function stopBubble(e) {
	// 如果提供了事件对象，则这是一个非IE浏览器
	if (e && e.stopPropagation)
		// 因此它支持W3C的stopPropagation()方法
		e.stopPropagation();
	else
		// 否则，我们需要使用IE的方式来取消事件冒泡
		window.event.cancelBubble = true;
};

function jsonToString(obj) {
	var THIS = this;
	switch (typeof (obj)) {
	case 'string':
		return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
	case 'array':
		return '[' + obj.map(THIS.jsonToString).join(',') + ']';
	case 'object':
		if (obj instanceof Array) {
			var strArr = [];
			var len = obj.length;
			for (var i = 0; i < len; i++) {
				strArr.push(THIS.jsonToString(obj[i]));
			}
			return '[' + strArr.join(',') + ']';
		} else if (obj == null) {
			return 'null';

		} else {
			var string = [];
			for ( var property in obj)
				string.push(THIS.jsonToString(property) + ':'
						+ THIS.jsonToString(obj[property]));
			return '{' + string.join(',') + '}';
		}
	case 'number':
		return obj;
	case false:
		return obj;
	}
}



//判断两个元素是否相等
function eqauls(str,tstr){
	if(str == tstr){
		return true;
	}
	return false;
};

/** ******************************数组相关结束*********************************** */
/**
 * 禁止窗体选中
 */
function forbiddenSelect() {
	$(document).bind("selectstart", function() {
		return false;
	});
	document.onselectstart = new Function("event.returnValue=false;");
	$("*").css({
		"-moz-user-select" : "none"
	});
}

/* 窗体允许选中 */
function autoSelect() {
	$(document).bind("selectstart", function() {
		return true;
	});
	document.onselectstart = new Function("event.returnValue=true;");
	$("*").css({
		"-moz-user-select" : ""
	});
};


/**
 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
 * Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
 * Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
 * Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
 * Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
 * Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function(fmt) {
	var o = {
		"Y+" : this.getFullYear(),
		"M+" : this.getMonth() + 1,
		// 月份
		"d+" : this.getDate(),
		// 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
		// 小时
		"H+" : this.getHours(),
		// 小时
		"m+" : this.getMinutes(),
		// 分
		"s+" : this.getSeconds(),
		// 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		// 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	var week = {
		"0" : "日",
		"1" : "一",
		"2" : "二",
		"3" : "三",
		"4" : "四",
		"5" : "五",
		"6" : "六"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f"
								: "/u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};

/**
 * 将数字转换成对应的中文 将阿拉伯数字翻译成中文的大写数字
 * 
 * @param {Object}
 *            num 比如:1对应一 11：十一 101:一百零一
 * @return {TypeName}
 */
function tm_NumberToChinese(num) {
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
    k = 0,
    re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
        case 0:
            re = BB[7] + re;
            break;
        case 4:
            if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0])) re = BB[4] + re;
            break;
        case 8:
            re = BB[5] + re;
            BB[7] = BB[5];
            k = 0;
            break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }

    if (a.length > 1) // 加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    if (re == '一十') re = "十";
    if (re.match(/^一/) && re.length == 3) re = re.replace("一", "");
    return re;
};



/**
 * 获取窗体可见度高度
 * 
 * @returns
 */
function getClientHeight() {
	var clientHeight = 0;
	if (document.body.clientHeight && document.documentElement.clientHeight) {
		clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight
				: document.documentElement.clientHeight;
	} else {
		clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight
				: document.documentElement.clientHeight;
	}
	return clientHeight;
}


/**
 * 获取窗体可见度宽度
 * 
 * @returns
 */
function getClientWidth() {
	var clientWidth = 0;
	if (document.body.clientWidth && document.documentElement.clientWidth) {
		clientWidth = (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth
				: document.documentElement.clientWidth;
	} else {
		clientWidth = (document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth
				: document.documentElement.clientWidth;
	}
	return clientWidth;
}

function getScrollHeight() {
	return Math.max(getClientHeight(), document.body.scrollHeight,
			document.documentElement.scrollHeight);
}

function getScrollTop() {
	var scrollTop = 0;
	if (document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
	} else if (document.body) {
		scrollTop = document.body.scrollTop;
	}
	return scrollTop;
}

/* 文件大小转换为MB GB KB格式 */
function tm_countFileSize(size) {
	var fsize = parseFloat(size, 2);
	var fileSizeString;
	if (fsize < 1024) {
		fileSizeString = fsize.toFixed(2) + "B";
	} else if (fsize < 1048576) {
		fileSizeString = (fsize / 1024).toFixed(2) + "KB";
	} else if (fsize < 1073741824) {
		fileSizeString = (fsize / 1024 / 1024).toFixed(2) + "MB";
	} else if (fsize < 1024 * 1024 * 1024) {
		fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(2) + "GB";
	} else {
		fileSizeString = "0B";
	}
	return fileSizeString;
};

/* 获取文件后缀 */
function tm_getExt(fileName) {
	try {
		if (isNotEmpty(fileName) && fileName.lastIndexOf(".") == -1)
			return fileName;
		var pos = fileName.lastIndexOf(".") + 1;
		return fileName.substring(pos, fileName.length).toLowerCase();
	} catch (e) {
	}
}

/* 获取文件名称 */
function tm_getFileName(fileName) {
	var pos = fileName.lastIndexOf("/") + 1;
	if (pos == -1) {
		return fileName;
	} else {
		return fileName.substring(pos, fileName.length);
	}
}

//获取几秒钟以前 startTime==== Date
function getTimeFormat(startTime) {
	var startTimeMills = $.tmDate._transferDate(startTime).getTime();
	var endTimeMills = new Date().getTime();
	var diff = parseInt((endTimeMills - startTimeMills) / 1000);//秒
	var day_diff = parseInt(Math.floor(diff / 86400));//天
	var buffer = Array();
	if (day_diff < 0) {
		return "[error],时间越界...";
	} else {
		if (day_diff == 0 && diff < 60) {
			if (diff <= 0)
				diff = 1;
			buffer.push(diff + "秒前");
		} else if (day_diff == 0 && diff < 120) {
			buffer.push("1 分钟前");
		} else if (day_diff == 0 && diff < 3600) {
			buffer.push(Math.round(Math.floor(diff / 60)) + "分钟前");
		} else if (day_diff == 0 && diff < 7200) {
			buffer.push("1小时前");
		} else if (day_diff == 0 && diff < 86400) {
			buffer.push(Math.round(Math.floor(diff / 3600)) + "小时前");
		} else if (day_diff == 1) {
			buffer.push("1天前");
		} else if (day_diff < 7) {
			buffer.push(day_diff + "天前");
		} else if (day_diff < 30) {
			buffer.push(Math.round(Math.floor(day_diff / 7)) + " 星期前");
		} else if (day_diff >= 30 && day_diff <= 179) {
			buffer.push(Math.round(Math.floor(day_diff / 30)) + "月前");
		} else if (day_diff >= 180 && day_diff < 365) {
			buffer.push("半年前");
		} else if (day_diff >= 365) {
			buffer.push(Math.round(Math.floor(day_diff / 30 / 12)) + "年前");
		}
	}
	return buffer.toString();
};

if(!String.prototype.trim){
	String.prototype.trim = function(){
		return  this.replace(/(^\s*)|(\s*$)/g,"");  
	};
};

if(!String.prototype.replaceAll){
	String.prototype.replaceAll = function(str,target){
		return this.replace(new RegExp(str,"ig"),target);
	};
}


function getRandomColor(){
	return '#'+Math.floor(Math.random()*16777215).toString(16);
};	

function getRGBColor(op){
	var r = Math.floor(randomRange(0,256));
	var g = Math.floor(randomRange(0,256));
	var b = Math.floor(randomRange(0,256));
	return "rgba("+r+","+g+","+b+","+(op||1)+")";
};	


function getImgTop(obj) {
	var iTop = 0;
	while(obj) {
		iTop += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return iTop;
};


function getElementsTop(obj) {
	var iTop = 0;
	while(obj) {
		iTop += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return iTop;
};


function GetPageSize() {
	var scrW, scrH;
	if (window.innerHeight && window.scrollMaxY) {
		scrW = window.innerWidth + window.scrollMaxX;
		scrH = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight) {
		scrW = document.body.scrollWidth;
		scrH = document.body.scrollHeight;
	} else if (document.body) {
		scrW = document.body.offsetWidth;
		scrH = document.body.offsetHeight;
	}
	var winW, winH;
	if (window.innerHeight) {
		winW = window.innerWidth;
		winH = window.innerHeight;
	} else if (document.documentElement
			&& document.documentElement.clientHeight) {
		winW = document.documentElement.clientWidth;
		winH = document.documentElement.clientHeight;
	} else if (document.body) {
		winW = document.body.clientWidth;
		winH = document.body.clientHeight;
	}
	var pageW = (scrW < winW) ? winW : scrW;
	var pageH = (scrH < winH) ? winH : scrH;
	return {
		PageW : pageW,
		PageH : pageH,
		WinW : winW,
		WinH : winH
	};
}
;

function GetPageScroll() {
	var x, y;
	if (window.pageYOffset) {
		y = window.pageYOffset;
		x = window.pageXOffset;
	} else if (document.documentElement
			&& document.documentElement.scrollTop) {
		y = document.documentElement.scrollTop;
		x = document.documentElement.scrollLeft;
	} else if (document.body) {
		y = document.body.scrollTop;
		x = document.body.scrollLeft;
	}
	return {
		X : x,
		Y : y
	};
}


function getElementViewTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current. offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　 if (document.compatMode == "BackCompat"){
　　　　　　var elementScrollTop=document.body.scrollTop;
　　　　} else {
　　　　　　var elementScrollTop=document.documentElement.scrollTop; 
　　　　}
　　　　return actualTop-elementScrollTop;
　　}

function getElementViewLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　if (document.compatMode == "BackCompat"){
　　　　　　var elementScrollLeft=document.body.scrollLeft;
　　　　} else {
　　　　　　var elementScrollLeft=document.documentElement.scrollLeft; 
　　　　}
　　　　return actualLeft-elementScrollLeft;
　　}


function loadingImage(src,callback){
	var img = new Image();
	img.src = src;
	if(img.complete){
		callback.call(img,true);
	}else{
		img.onreadystatechange = function () {
			
		};
		img.onload = function () {
			callback.call(img,true);
		};
		img.onerror = function () {
			callback.call({},false);
		};
	}
};

function resizeImg (img,iwidth,iheight){ 
    var image= img;  
    var boxWH = {};
    if(image.width>0 && image.height>0){
     	boxWH.width=image.width;
     	boxWH.height=image.height;	    
        if(boxWH.width>iwidth){    
          	boxWH.height = (boxWH.height*iwidth)/boxWH.width;  
            boxWH.width = iwidth;
                 
        }
        if(boxWH.height>iheight){    
          	boxWH.width = (boxWH.width*iheight)/boxWH.height;;   
            boxWH.height = iheight;	             	 
         }    	           
    }   
    return boxWH;
};



var tzUtil = {
	_position : function($dom,amark){//居中定位
		var windowWidth = $(window).width();
		var windowHeight= $(window).height();
		var width = $dom.width();
		var height = $dom.height();
		var left = (windowWidth - width)/2;
		var top = (windowHeight - height)/2;
		if(!amark)$dom.css("top",top).animate({left:left});
		if(amark==0)$dom.animate({left:left,"top":top});
		if(amark==1)$dom.css("left",left).animate({"top":top});
		if(amark==2)$dom.css({left:left,"top":top});
		return this;
	},

	_positionParent : function($dom,$parent,atop){//居中定位
		var parentWidth = $parent.width();
		var parentHeight= $parent.height();
		var width = $dom.width();
		var height = $dom.height();
		var left = (parentWidth - width)/2;
		var top = (parentHeight - height)/2;
		$dom.css({left:left,top:top-(atop||0)});
		return this;
	},

	resize : function($dom){
		var $this = this;
		$(window).resize(function(){
			$this._position($dom);	
		});
	},
	animates:function($dom,mark,callback){
		switch(mark){
			case "fadeOut":$dom.toggleClass(tz_animateOut()).fadeOut("slow",function(){$(this).remove();if(callback)callback();});break;
			case "slideUp":$dom.toggleClass(tz_animateOut()).slideUp("slow",function(){$(this).remove();if(callback)callback();});break;
			case "fadeIn":$dom.toggleClass(tz_animateOut()).fadeIn("slow",function(){if(callback)callback();});break;
			case "slideDown":$dom.toggleClass(tz_animateOut()).slideDown("slow",function(){if(callback)callback();});break;
			case "left":$dom.toggleClass(tz_animateOut()).animate({left:0},300,function(){$(this).remove();if(callback)callback();});break;
			case "top":$dom.toggleClass(tz_animateOut()).animate({top:0},300,function(){$(this).remove();if(callback)callback();});break;
		}
	},

	getRandomColor : function(){
	  return '#'+Math.floor(Math.random()*16777215).toString(16);
	}
};

/*日期工具类*/
$.tmDate = {
 /*转换日期*/
 _transferDate : function(date){
	if(typeof date =="string"){
		return new Date(date.replace(/-/ig,"/").replace("T"," "));
	}else{
		return date;
	}
 },
  /*格式化日期*/
 _toString : function(date,pattern){
	var d = this._transferDate(date);
	return d.format(pattern);
 },

 /*获取两个时间相减的时间*/
 _Date : function(date1,date2){
	var dateTime = this._numMillSecond(date1,date2);
	return new Date(dateTime).format("yyyy-MM-dd");
 },
 //获取两个时间相减的年份
 _Datsyear : function(date1,date2){
	 var dateTime = this._numYear(date1,date2);
	 return  dateTime;
 },
//获取两个时间相减的月份
 _datsmonth : function(date1,date2){
	 var dateTime = this._numMonth(date2,date1);
	 return  dateTime;
 },

 //间隔年份
 _numYear : function(date1,date2){
	var times = this._numDay(date1,date2);
	return  Math.floor(times/365);
 },

  //间隔月份
 _numMonth : function(date1,date2){
	var times = this._numDay(date1,date2);
	return  Math.floor(times/30);
 },

 //间隔天数
 _numDay : function(date1,date2){
	var times = this._numSecond(date1,date2);
	var hour = this._var().hour;
	var mills = this._var().mills;
	return Math.ceil(times/(mills * hour));
 },

//间隔时
 _numHour : function(date1,date2){
	return Math.floor(this._numMillSecond(date1,date2)/(1000*60*60));
 },

 //间隔分
 _numMinute : function(date1,date2){
	return Math.floor(this._numMillSecond(date1,date2)/(1000*60));
 },

 //间隔秒数
 _numSecond : function(date1,date2){
	 return Math.floor(this._numMillSecond(date1,date2) / 1000);
 },

  //间隔毫秒
 _numMillSecond : function(date1,date2){
	var stimes = this._getTime(this._transferDate(date1));
	var etimes = this._getTime(this._transferDate(date2));
	return etimes - stimes;
 },

 _var : function(){
	return {hour:24,second:60,mills:3600,format:"yyyy-MM-dd",dateFormat:"yyyy-MM-dd HH:mm:ss"};
 },

/*某个日期加上多少毫秒*/
 _plusMillisSeconds : function(date,millisSeconds){
	var dateTime = this._getTime(date);
	var mintimes = millisSeconds;
	var rdate = dateTime*1 + mintimes*1;
	return this._format(new Date(rdate));
 },
 /*某个日期加上多少秒*/
 _plusSeconds : function(date,seconds){
	var dateTime = this._getTime(date);
	var mintimes = seconds*1000;
	var rdate = dateTime*1 + mintimes*1;
	return this._format(new Date(rdate));
 },
  /*某个日期加上多少分钟*/
 _plusMinutes : function(date,minutes){
	var dateTime = this._getTime(date);
	var mintimes = minutes*60*1000;
	var rdate = dateTime*1 + mintimes*1;
	return this._format(new Date(rdate));
 },
  /*某个日期加上小时数*/
 _plusHours : function(date,hours){
	var dateTime = this._getTime(date);
	var mintimes = hours*60*60*1000;
	var rdate = dateTime + mintimes;
	return this._format(new Date(rdate));
 },
 /*某个日期加上天数*/
 _plusDays : function(date,days){
	var dateTime = this._getTime(date);
	var mintimes = days*60*60*1000*24;
	var rdate = dateTime*1 + mintimes*1;
	return this._format(new Date(rdate));
 },

 /*某个日期加上多少个月,这里是按照一个月30天来计算天数的*/
 _plusMonths : function(date,months){
	var dateTime = this._getTime(date);
	var mintimes = months*30*60*60*1000*24;
	var rdate = dateTime + mintimes*1;
	return this._format(new Date(rdate));
 },

 /*某个日期加上多少个年,这里是按照一个月365天来计算天数的，如果loop为true则按闰年计算*/
 _plusYears : function(date,years,isLoop){
	var dateTime = this._getTime(date);
	var day = 365;
	if(isLoop)day =366;
	var mintimes = years*day*60*60*1000*24;
	var rdate = dateTime + mintimes;
	return this._format(new Date(rdate));
 },

 /*某个日期加上某个日期，这样的操作视乎没什么意义*/
 _plusDate : function(date1,date2){
	var dateTime = this._getTime(date1);
	var dateTime2 = this._getTime(date2);;
	var rdate = dateTime + dateTime2;
	return this._format(new Date(rdate));
 },

 /*某个日期减去多少毫秒秒*/
 _minusMillisSeconds : function(date,millisSeconds){
	var dateTime = this._getTime(date);
	var mintimes = millisSeconds*1;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },
 /*某个日期减去多少秒*/
 _minusSeconds : function(date,seconds){
	var dateTime = this._getTime(date);
	var mintimes = seconds*1000;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },
  /*某个日期减去多少分钟*/
 _minusMinutes : function(date,minutes){
	var dateTime = this._getTime(date);
	var mintimes = minutes*60*1000;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },
  /*某个日期减去小时数*/
 _minusHours : function(date,hours){
	var dateTime = this._getTime(date);
	var mintimes = hours*60*60*1000;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },
 /*某个日期减去天数*/
 _minusDays : function(date,days){
	var dateTime = this._getTime(date);
	var mintimes = days*60*60*1000*24;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },

 /*某个日期减去多少个月,这里是按照一个月30天来计算天数的*/
 _minusMonths : function(date,months){
	var dateTime = this._getTime(date);
	var mintimes = months*30*60*60*1000*24;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },

 /*某个日期减去多少个年,这里是按照一个月365天来计算天数的*/
 _minusYears : function(date,years,isLoop){
	var dateTime = this._getTime(date);
	var day = 365;
	if(isLoop)day =366;
	var mintimes = years*day*60*60*1000*24;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },

 /*某个日期减去某个日期，这样的操作视乎没什么意义*/
 _minusDate : function(date1,date2){
	var dateTime = this._getTime(date1);
	var dateTime2 = this._getTime(date2);;
	var rdate = dateTime - dateTime2;
	return this._format(new Date(rdate));
 },

 /*获取一个月有多少天*/
 _getMonthOfDay :function(date1){
	var currentMonth = this._getFirstDayOfMonth(date1);
	var nextMonth = this._getNextDayOfMonth(date1);
	return this._numDay(currentMonth,nextMonth);
 },

 /*获取一年又多少天*/
 _getYearOfDay : function(date){
	var firstDayYear = this._getFirstDayOfYear(date);
	var lastDayYear = this._getLastDayOfYear(date);
	return Math.ceil(this._numDay(firstDayYear,lastDayYear));
 },

 /*某个日期是当年中的第几天*/
 _getDayOfYear : function(date1){
	return Math.ceil(this._numDay(this._getFirstDayOfYear(date1),date1));	
 },

 /*某个日期是在当月中的第几天*/
  _getDayOfMonth : function(date1){
	return Math.ceil(this._numDay(this._getFirstDayOfMonth(date1),date1));	
 },

 /*获取某个日期在这一年的第几周*/
 _getDayOfYearWeek : function(date){
	var numdays = this._getDayOfYear(date);
	return Math.ceil(numdays / 7);
 },

  /*某个日期是在当月中的星期几*/
  _getDayOfWeek : function(date1){
	return this._getWeek(date1);
 },

 /*获取在当前日期中的时间*/
 _getHourOfDay : function(date){
	 return this._getHour(date);
 },
 _eq : function(date1,date2){
	 var stime = this._getTime(this._transferDate(date1));
	 var etime = this._getTime(this._transferDate(date2));
	 return stime == etime ? true :false; 
 },
 /*某个日期是否晚于某个日期*/
 _after : function(date1,date2){
	 var stime = this._getTime(this._transferDate(date1));
	 var etime = this._getTime(this._transferDate(date2));
	 return  stime < etime ? true :false; 
 },

  /*某个日期是否早于某个日期*/
 _before : function(date1,date2){
	 var stime = this._getTime(this._transferDate(date1));
	 var etime = this._getTime(this._transferDate(date2));
	 return  stime > etime ? true :false; 
 },
 
 /*获取某年的第一天*/
 _getFirstDayOfYear : function(date){
	var year = this._getYear(date);
	var dateString = year+"-01-01 00:00:00";
	return dateString;
 },

  /*获取某年的最后一天*/
 _getLastDayOfYear : function(date){
	var year = this._getYear(date);
	var dateString = year+"-12-01 00:00:00";
	var endDay = this._getMonthOfDay(dateString);
	return year+"-12-"+endDay+" 23:59:59";
 },

  /*获取某月的第一天*/
 _getFirstDayOfMonth: function(date){
	var year = this._getYear(date);
	var month = this._getMonth(date);
	var dateString = year +"-"+month+"-01 00:00:00";
	return dateString;
 },

 /*获取某月最后一天*/
 _getLastDayOfMonth : function(date){
	var endDay = this._getMonthOfDay(date);
	var year = this._getYear(date);
	var month = this._getMonth(date);
	return year +"-"+month+"-"+endDay+" 23:59:59";
 },
 /*一天的开始时间*/
 _getFirstOfDay : function(date){
	 var year = this._getYear(date);
	 var month = this._getMonth(date);
	 var day = this._getDay(date);
	 return year+"-"+month+"-"+day+" 00:00:00";
 },

 /*一天的结束时间*/
 _getLastOfDay : function(date){
	 var year = this._getYear(date);
	 var month = this._getMonth(date);
	 var day = this._getDay(date);
	 return year+"-"+month+"-"+day+" 23:59:59";
 },
 
 /*获取下个月的第一天*/
 _getNextDayOfMonth: function(date){
	var year = this._getYear(date);
	var month = this._getMonth(date);
	month = month * 1 +1;
	if(month>12){
		year = year+1;
		month = month - 12;
	}
	month = month>9 ? month : "0"+month;
	var dateString = year +"-"+month+"-01 00:00:00";
	return dateString;
 },

 _getFirstOfWeek : function(date1){
	 var week = this._getWeek(date1);
	 var date = this._minusDays(date1,week);
	 var year = this._getYear(date);
	 var month = this._getMonth(date);
	 var day = this._getDay(date);
	 return year+"-"+month+"-"+day+" 00:00:00";
 },
 
 _getLastOfWeek : function(date1){
	 var week = 6-this._getWeek(date1);
	 var date = this._minusDays(date1,week);
	 var year = this._getYear(date);
	 var month = this._getMonth(date);
	 var day = this._getDay(date);
	 return year+"-"+month+"-"+day+" 23:59:59";
 },
 
 _getNow : function(){
	return new Date();	
 },
 _format : function(date){
	return this._getYear(date)+"-"+this._getMonth(date)+"-"+this._getDay(date)+" "+this._getHour(date)+":"+this._getMinute(date)+":"+this._getSecond(date);
 },
 _getDate :function(){
	 return this._getNow();
 },
 /*年*/
 _getYear:function(date){
	 return this._transferDate(date).getFullYear();
 },

 /*月*/
 _getMonth:function(date){
	 var month = this._transferDate(date).getMonth()+1;
	 return month>9 ? month : "0"+month;
 },

 /*日*/
 _getDay:function(date){
	 var day = this._transferDate(date).getDate();
	 return day >9 ? day : "0"+day;
 },

  /*获取今天星期几,如果为0代表星期日*/
 _getWeek : function(date){
	 return this._transferDate(date).getDay();
 },

 /*时*/
 _getHour : function(date){
	 var hour = this._transferDate(date).getHours();
	 return hour >9 ? hour : "0"+hour;
 },

 /*12小时制时*/
 _getHour12 : function(date){
	 var hour = this._transferDate(date).getHours();
	 return hour%12 == 0 ? 12 : hour % 12;
 },

 /*分*/
 _getMinute : function(date){
	 var minutes = this._transferDate(date).getMinutes();
	 return minutes >9 ? minutes : "0"+minutes;
 },

 /*秒*/
 _getSecond : function(date){
	var seconds = this._transferDate(date).getSeconds();
	return seconds >9 ? seconds : "0"+seconds;
 },

 /*毫秒*/
 _getMillisecond : function(date){
	return this._transferDate(date).getMilliseconds();
 },

 /*获取今天在当年是第几季度*/
 _getPeriod : function(date){
	var month = this._getMonth(date)*1;
	return  Math.floor((month+3)/3);
 },

 /*星期*/
 _nowWeekChinies : function(date){
	var nowWeek = this._getWeek(date);
	var day = "";
	switch (nowWeek){
		case 0:day="日";break;
		  break;
		case 1:day="一";break;
		  break;
		case 2:day="二";break;
		  break;
		case 3:day="三";break;
		  break;
		case 4:day="四";break;
		  break;
		case 5:day="五";break;
		  break;
		case 6:day="六";break;
	 }
	 return day;
 },
 _getMessage : function(date){
	 var now = date||new Date();
	 var hour = now.getHours() ;
	 if(hour < 6){return "凌晨好！";} 
	 else if (hour < 9){return "早上好！";} 
	 else if (hour < 12){return "上午好！";} 
	 else if (hour < 14){return "中午好！";} 
	 else if (hour < 17){return "下午好！";} 
	 else if (hour < 19){return "傍晚好！";} 
	 else if (hour < 22){return "晚上好！";} 
	 else {return "夜里好！";} 
 },
 /*返回 1970 年 1 月 1 日至今的毫秒数。*/
 _getTime : function(date){
	 return this._transferDate(date).getTime();
 }
};
/*date end*/
/*cookie*/
$.tmCookie = {
	setCookie : function(name, value,time,option){
	    var str=name+'='+escape(value); 
	    var date = new Date();
	    date.setTime(date.getTime()+this.getCookieTime(time)); 
	    str += "; expires=" + date.toGMTString();
	    if(option){ 
	        if(option.path) str+='; path='+option.path; 
	        if(option.domain) str+='; domain='+option.domain; 
	        if(option.secure) str+='; true'; 
	    } 
	    document.cookie=str; 
	},
	getCookie : function(name){
		var arr = document.cookie.split('; '); 
	    if(arr.length==0) return ''; 
	    for(var i=0; i <arr.length; i++){ 
	        tmp = arr[i].split('='); 
	        if(tmp[0]==name) return unescape(tmp[1]); 
	    } 
	    return ''; 
	},
	delCookie : function(name){
		$.tmCookie.setCookie(name,'',-1); 
		var date=new Date();
        date.setTime(date.getTime()-10000);
		document.cookie=name+"=; expires="+date.toGMTString()+"; path=/";
	},
	
	getCookieTime : function(time){
	   if(time<=0)return time;
	   var str1=time.substring(1,time.length)*1;
	   var str2=time.substring(0,1);
	   if (str2=="s"){
	        return str1*1000;
	   }
	   else if (str2=="m"){
	       return str1*60*1000;
	   }
	   else if (str2=="h"){
		   return str1*60*60*1000;
	   }
	   else if (str2=="d"){
	       return str1*24*60*60*1000;
	   }
	}
};
/*array*/


/*手机*/
function is_cellphoneNum(str){
    var regExp = /^(\+86)?(13|18|15)\d{9}(?!\d)$/;
    return regExp.test(str);
}

 /*邮件格式*/ 
function is_email(str){ 
    var regExp = /^([\w\.])+@\w+\.([\w\.])+$/;
    return regExp.test(str);
}
/*array end*/


function tz_animateIn(index){
	var animateIn = [];
	animateIn.push("animated bounce");//0
	animateIn.push("animated tada");//1
	animateIn.push("animated swing");//2
	animateIn.push("animated wobble");//3
	animateIn.push("animated flip");//4
	animateIn.push("animated flipInX");//5
	animateIn.push("animated flipInY");//6
	animateIn.push("animated fadeIn");//7
	animateIn.push("animated fadeInUp");//8
	animateIn.push("animated fadeInDown");//9
	animateIn.push("animated fadeInLeft");//10
	animateIn.push("animated fadeInRight");//11
	animateIn.push("animated fadeInUpBig");//12
	animateIn.push("animated fadeInDownBig");//13
	animateIn.push("animated fadeInLeftBig");//14
	animateIn.push("animated fadeInRightBig");//15
	animateIn.push("animated bounceIn");//16
	animateIn.push("animated bounceInUp");//17
	animateIn.push("animated bounceInDown");//18
	animateIn.push("animated bounceInLeft");//19
	animateIn.push("animated bounceInRight");//20
	animateIn.push("animated rotateIn");//21
	animateIn.push("animated rotateInUpLeft");//22
	animateIn.push("animated rotateInDownLeft");//23
	animateIn.push("animated rotateInUpRight");//24
	animateIn.push("animated rotateInDownRight");//25
	animateIn.push("animated rollIn");//26
	if(!index){
		var len = animateIn.length;
		var r = Math.floor(Math.random()*(len-1)+1);
		return animateIn[r];
	}else{
		return animateIn[index];
	}
}

function tz_animateOut(index){
	var animateOut = [];
	animateOut.push("animated flipOutX");//0
	animateOut.push("animated flipOutY");//1
	animateOut.push("animated fadeOut");//2
	animateOut.push("animated fadeOutUp");//3
	animateOut.push("animated fadeOutDown");//4
	animateOut.push("animated fadeOutLeft");//5
	animateOut.push("animated fadeOutRight");//6
	animateOut.push("animated fadeOutUpBig");//7
	animateOut.push("animated fadeOutDownBig");//8
	animateOut.push("animated fadeOutLeftBig");//9
	animateOut.push("animated fadeOutRightBig");//10
	animateOut.push("animated bounceOut");//11
	animateOut.push("animated bounceOutUp");//12
	animateOut.push("animated bounceOutDown");//13
	animateOut.push("animated bounceOutLeft");//14
	animateOut.push("animated bounceOutRight");//15
	animateOut.push("animated rotateOut");//16
	animateOut.push("animated rotateOutUpLeft");//17
	animateOut.push("animated rotateOutDownLeft");//18
	animateOut.push("animated rotateOutDownRight");//19
	animateOut.push("animated rollOut");//21
//	animateOut.push("animated hinge");//20
	if(!index){
		var len = animateOut.length;
		var r = Math.floor(Math.random()*(len-1)+1);
		return animateOut[r];
	}else{
		return animateOut[index];
	}
}


function filterTag(str) {
    str = str.replace(/&/ig, "&amp;");
    str = str.replace(/</ig, "&lt;");
    str = str.replace(/>/ig, "&gt;");
    str = str.replace(" ", "&nbsp;");
    return str;
}

function filterScript(str) {
	return str.replace(/<script.*?>.*?<\/script>/ig, '');  
}


//加密
function encryption(str,k){
	var string = "";
	for (var i = 0; i < str.length; i++) {
		var c= str.charCodeAt(i);
		if(c>=97 && c<=122){
			c += k%26;
			if(c<97){
				c+=26;
			}
			if(c>122){
				c-=26;
			}
		}else if(c>=65 && c<=90){
			c+=k%26;
			if(c<65){
				c+=26;
			}
			if(c>122){
				c-=26;
			}
		}
		string+=String.fromCharCode(c);
	}
	return string;
}

//解密
function dencryption(str,n){
	var string = "";
	var k = parseInt("-"+n);
	for (var i = 0; i < str.length; i++) {
		var c= str.charCodeAt(i);
		if(c>=97 && c<=122){
			c += k%26;
			if(c<97){
				c+=26;
			}
			if(c>122){
				c-=26;
			}
		}else if(c>=65 && c<=90){
			c+=k%26;
			if(c<65){
				c+=26;
			}
			if(c>122){
				c-=26;
			}
		}
		string+=String.fromCharCode(c);
	}
	return string;
};

function shakeCharacter(id){
	var boxDom = document.getElementById(id);
	if(!boxDom)return;
	var text = boxDom.innerText||boxDom.textContent;
	var html = "";

	for(var i=0;i<text.length;i++){
		html += "<span>"+text.charAt(i)+"</span>";
	}
	boxDom.innerHTML = html;
	var arr = [];
	var spanDoms = boxDom.children;
	for(var i=0;i<spanDoms.length;i++){
		spanDoms[i].style.left = spanDoms[i].offsetLeft+"px";
		spanDoms[i].style.top = (spanDoms[i].offsetTop)+"px";
		arr.push({left:spanDoms[i].offsetLeft,top:spanDoms[i].offsetTop});
	}
	for(var i=0;i<spanDoms.length;i++){
		spanDoms[i].style.position = "absolute";
		spanDoms[i].style.left = "-100px";
	}
	
	function right(){
		var index = 1; 
		var speed = 0;
		var timer = null;
		timer = setInterval(function(){
				if(index==(arr.length+1)){
					clearInterval(timer);
					index = 0;
					left();
					//down();
				}else{
					speed = (arr[arr.length-index].left - spanDoms[arr.length-index].offsetLeft)*0.752; 
					speed = speed > 0  ? Math.ceil(speed) : Math.floor(speed);
					spanDoms[arr.length-index].style.left = spanDoms[arr.length-index].offsetLeft + speed+"px";
					if(speed == 0){
						index++;
					}
				}
		},24);
	}


	function left(){
		var index = 0; 
		var speed = 10;
		var timer = null;
		timer = setInterval(function(){
			if(index==arr.length){
				clearInterval(timer);
				index = 1;
				right();
			}else{
				var icur = (spanDoms[index].offsetLeft - speed);
				speed *= 1.015;
				spanDoms[index].style.left = icur+"px"; 
				if(icur<=0){
					spanDoms[index].style.left = "-100px"; 
					index++;
				}
			}
		},30);
	}


	function down(){
		var index = 0; 
		var speed = 10;
		var timer = null;
		timer = setInterval(function(){
			if(index==arr.length){
				clearInterval(timer);
				index = 1;
			}else{
				var icur = spanDoms[index].offsetTop -speed;
				speed +=1;
				spanDoms[index].style.top = icur+"px"; 
				if(icur<=-1000){
					index++;
				}
			}
		},30);
	}

	right();
}

function tm_numberKey($this, e) {
    var range = $this.attr("range");
    var val = $this.val();
    if (isNotEmpty(range)) {
        var ranges = range.split("_");
        var max = ranges[1] * 1,
        min = ranges[0] * 1;
        if (val <= min) $this.val(min);
        if (val >= max) $this.val(max);
    }
    var d = $this.attr("def");
    if(isEmpty(val)){
    	$this.val(d);
    }
    if (!e) e = window.event;
    var code = e.keyCode | e.which | e.charCode;
    if (code >= 48 && code <= 57 || code >= 96 && code <= 105 || code == 9) return true; // 数字
    switch (code) {
    case 8:
        // 退格
    case 37:
    case 38:
    case 39:
    case 40:
        // 方向键
    case 13:
        // 回车
    case 46:
        // 删除
    case 45:
    case 110:
        return true;
    }
    return false;
};


/* 获取浏览器的版本 */
function getBroswerVersion() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    if (ua) {
    	if(ua.indexOf("firefox")!=-1){
    		Sys.version = "firefox";
    	}else{
    		window.ActiveXObject ? Sys.version = "ie_" + ua.match(/msie ([\d]+)/)[1] : document.getBoxObjectFor ? Sys.version = "firefox_" + ua.match(/firefox\/([\d.]+)/)[1] : window.MessageEvent && !document.getBoxObjectFor ? Sys.version = "chrome": window.opera ? Sys.version = "opera_" + ua.match(/opera.([\d.]+)/)[1] : window.openDatabase ? Sys.version = ua.match(/version\/([\d.]+)/)[1] : 0;
    	}
    }
    return Sys;
}

/*自定义封装ajax*/
var KAjax = {
	request : function(options,dataJson){
		var opts = $.extend({},{type:"post",limit:true,timer:null,before:function(){
		},error:function(){
			
		},callback:function(data){
			
		}},options);
		var _url = opts.url;
		if(isEmpty(_url)){
			_url = basePath+"/"+opts.model+"/"+opts.method;
		}
		if(isNotEmpty(opts.params)){
			_url+="&"+opts.params;
		}
		
		clearTimeout(opts.timer);
		opts.timer = setTimeout(function(){
			KAjax.ajaxMain(opts,_url,dataJson);
		},200);
	},
	ajaxMain:function(opts,_url,dataJson){
		$.ajax({
			type:opts.type||"post",
			data : dataJson,
			url : _url+".do",
			beforeSend:function(){opts.before();},
			error:function(){
				loading("抱歉！因为操作不能够及时响应，请稍后在试...",1);
				opts.error();
				clearTimeout(opts.timer);
			},
			success:function(data){
				clearTimeout(opts.timer);
				if(data=="logout"){
					tzLogin.login();
				}else if(data=="nopermission"){
					loading("非常抱歉,您没有权限...",4);
				}else{
					if(opts.callback)opts.callback(data);
				}
			}
		});
	}
};


function dom(id){
	return document.getElementById(id);
};

/*通过className获取dom元素进行过滤*/
function domClass(dompid,sClass){
	var pdom = (typeof dompid==="string"?dom(dompid):dompid);
	var aEle = pdom.getElementsByTagName('*');
	var arrs = [];
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className.indexOf(sClass)!=-1){
			arrs.push(aEle[i]);
		}
	}
	return arrs;
};

function appendAfter(oParent,obj1,obj2){
	if(obj2==last(oParent)){
		return oParent.appendChild(obj1);
	}else{
		return oParent.insertBefore(obj1,next(obj2));
	}
};

function next(obj){
	return obj.nextSibling.nodeType == 1 ? obj.nextSibling : next(obj.nextSibling);
};

function pre(obj){
	return obj.previousSibling.nodeType == 1 ? obj.previousSibling : pre(obj.previousSibling);
};

function first(obj){
	return obj.firstChild.nodeType == 1 ? obj.firstChild : next(obj.firstChild);
};

function last(obj){
	return obj.lastChild.nodeType == 1 ? obj.lastChild : pre(obj.lastChild);
};



/*会话处理*/
function setSession(key,value,mark){
	var stroage = mark?sessionStorage:localStorage;
	if(stroage)stroage.setItem(key, value);
};


function getSession(key,mark){
	var stroage = mark?sessionStorage:localStorage;
	if(stroage){
		return stroage.getItem(key);
	}else{
		return "";
	}
};

function removeSession(key,mark){
	var stroage = mark?sessionStorage:localStorage;
	if(stroage){
		return stroage.removeItem(key);
	}else{
		return "";
	}
};

//获取css中的样式的值，跟浏览器兼容无关
function getStyle(dom,attr){
	return window.getComputedStyle ? window.getComputedStyle(dom,false)[attr]:dom.currentStyle[attr];
};

//简单混入
function mixin(obj,obj2){
	for(var k in obj2){
		if(obj2.hasOwnProperty(k)){
			obj[k] = obj2[k];
		}
	}
	return obj;
};

//多对象混入
function mix(target,source){
	var arr = [];
	var args = arr.slice.call(arguments);
	
	var i = 1;
	if(args.length==1){
		return target;
	};

	while((source = args[i++])){
		for(var key in source){
			if(source.hasOwnProperty(key)){
				target[key] = source[key];
			}
		}
	}
	return target;
};

//获取鼠标的位置。兼容ie678
function getXY(e){
	var ev = e || window.event;
	var x=0,y=0;
	if(ev.pageX){
		x = ev.pageX;
		y = ev.pageY;
	}else{
		//拿到scrollTop 和scrollLeft
		var sleft = 0,stop = 0;
		//ie678---
		if(document.documentElement){
			stop =document.documentElement.scrollTop;
			sleft = document.documentElement.scrollLeft;
		}else{
		//ie9+ 谷歌 
			stop = document.body.scrollTop;
			sleft = document.body.scrollLeft;
		}	
		x = ev.clientX + sleft;
		y = ev.clientY + stop;
	}
	return {x:x,y:y};
};


//范围随机数
function randomRange(start,end){
	return Math.floor(Math.random()*(end-start+1))+start;
};


function keach(doms,callback){
	var domArr = Array.prototype.slice.call(doms);
	domArr.forEach(function(obj,index){
		if(callback)callback.call(obj,index);
	});
};

function getIndex(doms,dom){
	var index = -1;
	var domArr = Array.prototype.slice.call(doms);
	domArr.forEach(function(obj,i){
		if(obj==dom){
			index = i;
			return false;
		}
	});
	return index;
};

function getSelectHtml(win){ 
	  if (win.getSelection) { 
		 var range=win.getSelection().getRangeAt(0); 
		 var container = win.document.createElement('div'); 
		 container.appendChild(range.cloneContents()); 
		 return container.innerHTML; 
	  }else if (win.document.getSelection) { 
		 var range=win.getSelection().getRangeAt(0); 
		 var container = win.document.createElement('div'); 
		 container.appendChild(range.cloneContents()); 
		 return container.innerHTML; 
	  } else if (win.document.selection) { 
		  return win.document.selection.createRange().htmlText; 
	  } 
} 



/*给要预览的图片或者元素上加 class="keui-imgbox"和data-src='图片地址即可'*/
function MK_ImageShow(){
	var ow = window.innerWidth;
	var oh = window.innerHeight;
	
	$(window).resize(function(){
		var $imgbox = $(".keui-imgcontainer");
		var imgsrc = $imgbox.find(".keui-imgcnt").find("img").attr("src");
		if(isEmpty(imgsrc))return;
		var xbit = this.innerWidth / ow;
		var ybit = this.innerHeight / oh;
		var width = $imgbox.data("width")*1;
		var height = $imgbox.data("height")*1;
		var wb = width *  xbit;
		var yb = height * ybit;
		if(wb>=1024)wb = 1024;
		if(yb>=800)yb = 768;
		
		loadingImage(imgsrc,function(ok){
			if(ok){
				var imgjson  = resizeImg(this,wb,yb);
				var cwidth = imgjson.width;
				var cheight = imgjson.height;
				$imgbox.find(".keui-imgcnt").stop(true,true).animate({
					width:cwidth,
					height:cheight,
					marginLeft:"-"+(cwidth/2)+"px",
					marginTop:"-"+(cheight/2)+"px"
				});
				$imgbox.find(".keui-imgcnt").find("img").attr("width",cwidth).attr("height",cheight);
			}else{
				tzCommon.error("图片已损坏，加载失败","error");
			}
		});
		
	});
	
	$("body").on("click",".keui-imgbox",function(e){
		var imgsrc = $(this).attr("src");
		if(isEmpty(imgsrc))imgsrc = $(this).data("src");
		if(isEmpty(imgsrc))imgsrc = $(this).data("img");
		loadingImage(imgsrc,function(ok){
			if(ok){
				var bw = 1024;
				var bh = 768;
				if(bw>=ow)bw=ow;
				if(bh>=oh)bh=oh-100;
				var imgjson  = resizeImg(this,bw,bh);
				var width = imgjson.width;
				var height = imgjson.height;
				var html = "<div class='keui-imgcontainer' data-width='"+width+"' data-height='"+height+"'>"+
				"  		<div class='keui-imgcnt'  style='width:"+width+"px;height:"+height+"px;margin-left:-"+(width/2)+"px;margin-top:-"+(height/2)+"px;'>"+
				"  			<img src='"+imgsrc+"?d="+new Date().getTime()+"' width='"+width+"' height='"+height+"'>"+	
				"  		</div><a href='javascript:void(0);' class='keui-imgclose'><i class='iconfont icon-remove'></i></a>"+
				"  	</div>";
				$("body").append(html).append("<div class='keui-imgoverlay'></div>");
				
				$(".keui-imgcontainer").off("click").on("click",function(){
					$(this).next().remove();
					$(this).remove();
				});
			}else{
				tzCommon.error("图片已损坏，加载失败","error");
			}
		});
		
		stopBubble(e);
	});
			
};

function wordAnimate(boxid){
	var oList=document.getElementById(boxid);
	var aLi=oList.children;
	var iLiHeight=aLi[0].offsetHeight;
	for(var i=0;i<aLi.length;i++){
		var adom = aLi[i].children[0];
		var sHtml=adom.innerHTML;
		adom.innerHTML="";
		for(var j=0;j<sHtml.length;j++){
			adom.innerHTML+="<span>"+sHtml[j]+"</span>"
		}
		
		var aSpan=adom.children;
		for(var j=0;j<aSpan.length;j++){
			aSpan[j].style.left=aSpan[j].offsetLeft+"px";
			aSpan[j].style.top=aSpan[j].offsetTop+"px";
			aSpan[j].startTop=aSpan[j].offsetTop;
		}
		for(var j=0;j<aSpan.length;j++){
			aSpan[j].style.position="absolute";
			(function(aSpan,nub2){ 
				var iStart=0;
				var iSpanHeight=aSpan[0].offsetHeight;
				aSpan[nub2].onmouseover=function(ev)
				{
					iStart=ev.clientY;
				};
				aSpan[nub2].onmousemove=function(ev)
				{
					var iDis=ev.clientY-iStart;
					var iNub=iDis>0?1:-1;
					if(this.startTop+iDis>=0 && this.startTop+iDis< (iLiHeight-iSpanHeight)){
						
						for(var j=0;j<aSpan.length;j++){
							if(Math.abs(iDis)>Math.abs(nub2-j)){
								aSpan[j].style.top=aSpan[j].startTop+(Math.abs(iDis)-Math.abs(nub2-j))*iNub+"px";
							}else{
								aSpan[j].style.top=aSpan[j].startTop+"px";
							}
						}
					}
				};
				aSpan[nub2].onmouseout=function(ev){
					for(var j=0;j<aSpan.length;j++){
						kanimate(aSpan[j],{top:aSpan[j].startTop},500,"elasticOut");
					}
				};	
			})(aSpan,j);
		}		
	}
};


(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

/*时间运动版本动画*/
(function(win){
	//t:时间变量
	//b:起始值
	//c:要变化的总量 target - b;
	//d:总时长
	/*
	Linear：无缓动效果
	Quadratic：二次方的缓动（t^2）
	Cubic：三次方的缓动（t^3）
	Quartic：四次方的缓动（t^4）
	Quintic：五次方的缓动（t^5）
	Sinusoidal：正弦曲线的缓动（sin(t)）
	Exponential：指数曲线的缓动（2^t）
	Circular：圆形曲线的缓动（sqrt(1-t^2)）
	Elastic：指数衰减的正弦曲线缓动
	超过范围的三次方缓动（(s+1)*t^3 – s*t^2）
	指数衰减的反弹缓动
	每个效果都分三个缓动方式，分别是（可采用后面的邪恶记忆法帮助记忆）：
	easeIn：从0开始加速的缓动，想象OOXX进去，探路要花时间，因此肯定是先慢后快的；
	easeOut：减速到0的缓动，想象OOXX出来，肯定定先快后慢的，以防掉出来；
	easeInOut：前半段从0开始加速，后半段减速到0的缓动，想象OOXX进进出出，先慢后快然后再慢。
	*/

	var Tween = {
		linear: function (t, b, c, d) {
			return c * t / d + b;
		},
		quadIn: function (t, b, c, d) {

			return c * (t /= d) * t + b;
		},
		quadOut: function (t, b, c, d) {

			return -c * (t /= d) * (t - 2) + b;
		},
		quadInOut: function (t, b, c, d) {

			if ((t /= d / 2) < 1) {

				return c / 2 * t * t + b;
			}

			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		},
		cubicIn: function (t, b, c, d) {

			return c * (t /= d) * t * t + b;
		},
		cubicOut: function (t, b, c, d) {

			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		cubicInOut: function (t, b, c, d) {

			if ((t /= d / 2) < 1) {

				return c / 2 * t * t * t + b;
			}

			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},

		// Copy of cubic
		easeIn: function (t, b, c, d) {

			return c * (t /= d) * t * t + b;
		},
		easeOut: function (t, b, c, d) {

			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOut: function (t, b, c, d) {

			if ((t /= d / 2) < 1) {

				return c / 2 * t * t * t + b;
			}

			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		// End copy
		quartIn: function (t, b, c, d) {

			return c * (t /= d) * t * t * t + b;
		},
		quartOut: function (t, b, c, d) {

			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		quartInOut: function (t, b, c, d) {

			if ((t /= d / 2) < 1) {

				return c / 2 * t * t * t * t + b;
			}

			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		quintIn: function (t, b, c, d) {

			return c * (t /= d) * t * t * t * t + b;
		},
		quintOut: function (t, b, c, d) {

			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		quintInOut: function (t, b, c, d) {

			if ((t /= d / 2) < 1) {
				return c / 2 * t * t * t * t * t + b;
			}

			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},
		sineIn: function (t, b, c, d) {
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		sineOut: function (t, b, c, d) {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		sineInOut: function (t, b, c, d) {

			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		},
		expoIn: function (t, b, c, d) {

			return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		expoOut: function (t, b, c, d) {

			return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		expoInOut: function (t, b, c, d) {

			if (t === 0) { return b; }
			if (t === d) { return b + c; }

			if ((t /= d / 2) < 1) {
				return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			}

			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		circIn: function (t, b, c, d) {

			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		circOut: function (t, b, c, d) {

			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		circInOut: function (t, b, c, d) {

			if ((t /= d / 2) < 1) {

				return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			}

			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		},
		bounceIn: function (t, b, c, d) {
			return c - this.bounceOut(d - t, 0, c, d) + b;
		},
		bounceOut: function (t, b, c, d) {

			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else

			if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
			} else

			if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
			}
		},
		bounceInOut: function (t, b, c, d) {

			if (t < d / 2) {
				return this.bounceIn(t * 2, 0, c, d) * 0.5 + b;
			}

			return this.bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
		},
		elasticIn: function (t, b, c, d, a, p) {

			if (t === 0) { return b; }

			if ((t /= d) === 1) {
				return b + c;
			}

			if (!p) {
				p = d * 0.3;
			}

			if (!a) {
				a = 1;
			}
			var s = 0;

			if (a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}

			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		elasticOut: function (t, b, c, d, a, p) {

			if (t === 0) {
				return b;
			}

			if ((t /= d) === 1) {
				return b + c;
			}

			if (!p) {
				p = d * 0.3;
			}

			if (!a) {
				a = 1;
			}
			var s = 0;

			if (a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}

			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		elasticInOut: function (t, b, c, d, a, p) {

			if (t === 0) {
				return b;
			}

			if ((t /= d / 2) === 2) {
				return b + c;
			}

			if (!p) {
				p = d * (0.3 * 1.5);
			}

			if (!a) {
				a = 1;
			}
			var s = 0;

			if (a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}

			if (t < 1) {

				return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			}

			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
		}
	};
	//时间版本
	function animate(dom,json){
		var args = arguments;
		var times = typeof args[2]!="number"?400:args[2];
		var fx = typeof args[2]=="string"?args[2]:(typeof args[3]!="string" ?"linear":args[3]);
		var fn = typeof args[args.length-1]!="function"?null:args[args.length-1];
		//目标初始值 
		var target = {};
		for(var attr in json){
			if(attr.toLowerCase()=="opacity"){
				target[attr] = Math.round(getStyle(dom,attr))||1;//获取初始值
			}else{
				target[attr] = parseInt(getStyle(dom,attr)) || 0;//获取初始值
			}
		};
		var btime = new Date;
		if(dom.timer)clearInterval(dom.timer);	
		dom.timer = setInterval(function(){
			var t = (new Date - btime)/times;
			if(t>=1){
				if(dom.timer)clearInterval(dom.timer);
				for(var attr in json){
					if(attr.toLowerCase()=="opacity"){
						dom.style.opacity = json[attr];
						dom.style.filter = "alpha(opacity="+(json[attr]*100)+")";
					}else{
						dom.style[attr] = json[attr]+"px";
					}
				}
				if(fn)fn.call(dom,json);
			}else{
				for(var attr in json){
					var b = target[attr];//起始值
					var c = json[attr]-b;
					var d = times;
					var value = Tween[fx](t*times,b,c,d);
					if(attr.toLowerCase()=="opacity"){
						dom.style.opacity = (value / 100)*100;//0.666678
						dom.style.filter = "alpha(opacity="+value+")";
					}else{
						dom.style[attr] = value+"px";
					}
				}
			}
		},17);
	};
		
	win.kanimate = animate; 
})(window);