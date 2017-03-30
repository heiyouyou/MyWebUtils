//验证器
// var validator = {
// 	isEmpty:function(val){//验证为空
// 		val = $.trim(val);
// 		if (val == null)
// 			return true;
// 		if (val == undefined || val == 'undefined')
// 			return true;
// 		if (val == "")
// 			return true;
// 		if (val.length == 0)
// 			return true;
// 		if (!/[^(^\s*)|(\s*$)]/.test(val))
// 			return true;
// 		return false;
// 	},
// 	isNotEmpty:function(val){//验证不为空
// 		return !this.isEmpty(val);
// 	},
// 	email:function(val){//验证邮箱
// 		return !/xxxxx/.test(val);
// 	},
// 	telephone:function(val){//验证手机号
// 		return !/xxxxx/.test(val);
// 	},
// 	cn:function(val){//验证中文
// 		return !/xxxxx/.test(val);
// 	},
// 	ip:function(val){//验证ip
// 		return !/xxxxx/.test(val);
// 	},
// 	url:function(val){//验证url地址
// 		return !/xxxxx/.test(val);
// 	},
// 	username:function(val){//验证用户名
// 		return !/xxxxx/.test(val);
// 	},
// 	password:function(val){//验证密码
// 		return !/xxxxx/.test(val);
// 	},
// 	number:function(value){//验证数字
// 		return !/xxxxx/.test(val);
// 	}
// };

function dom(id){
	return document.getElementById(id);
};

// 表单验证，formId:表单id，submitBtn:提交按钮的id，validator:验证器，callback:业务逻辑回调函数
var wzyValidator = function(formId,submitBtn,validator,callback){
	var wzyForm = {
	 	formId:formId,
	 	init:function(){
	 		var This = this;
	 		dom(submitBtn).onclick = function(){
				This.validate();
			};
		},
		publicMethod:function(){//公共方法
			var This = this;
			return {
				data:function(){//获取表单数据
					return This.params();
				},
				ele:function(name){//获取表单元素
					return This.getElement(name);
				},
				val:function(name){//获取表单值
					return This.getValue(name);
				},
				cval:function(name){//获取checkbox控件的值
					return This.getCheckValue(name);
				},
				dataArr:function(){
					return This.params2();
				}
			};
		},
		validate:function(){
			var pjson = this.publicMethod();
			// 验证通过则进行请求数据
			if(validator.call(pjson)){//call调整传入的验证器中的this指向pjson这个对象
				var params = this.params();
				callback.call(pjson,params);
			}else{
				return false;
			}
		},
		params:function(){//获取格式如：opid=123&username=wrew&password=fasf&address的参数
			var userFormDom = dom(this.formId);
			var elements = userFormDom.elements;
			var params = "";
			for (var i = 0; i < elements.length; i++) {
				if(elements[i].type!="button" && elements[i].type!="submit" && lements[i].type!="reset"){
					if(elements[i].type=="checkbox"){
						var carr = this.getCheckValue(elements[i].name);
						for (var j= 0; j < carr.length; j++) {
							params+="&"+elements[i].name+"="+carr[j];
						}
						break;
					}else{	
						params+="&"+elements[i].name+"="+this.getValue(elements[i].name);
		    		}
				}
			}
			return params.substr(1);
		},
		params2:function(){//获取格式如：[{name: 'firstname', value: 'Hello'},{name:'lastname', value: 'World'},{name: 'alias'}]的参数
			var userFormDom = dom(this.formId);
			var elements = userFormDom.elements;
			var arr = [];
			for (var i = 0; i < elements.length; i++) {
				if(elements[i].type!="button" && elements[i].type!="submit" &&
						elements[i].type!="reset"
					){
					if(elements[i].type=="checkbox"){
						var carr = this.getCheckValue(elements[i].name);
						for (var j= 0; j < carr.length; j++) {
							var json = {};
							json.name = elements[i].name;
							json.value = carr[j];
							arr.push(json);
						}
						break;
					}else{	
						var json = {};
						json.name = elements[i].name;
						json.value = elements[i].value;
						arr.push(json);
					}
				}
			}
			return arr;
		},
		getElement: function (name){//获取元素
			var userFormDom = dom(this.formId);
			return userFormDom[name];
		},
		getValue : function (name){//获取表单的值
			var userFormDom = dom(this.formId);
			return userFormDom[name].value;
		},
		getCheckValue:function (name){//获取checkbox控件的值
			var userFormDom = dom(this.formId);
			var checkboxs = userFormDom[name];
			var arr = [];
			for (var i = 0; i < checkboxs.length; i++) {
				if(checkboxs[i].checked){
					arr.push(checkboxs[i].value);
				}
			}
			return arr;
		}
	};
	wzyForm.init();
};


