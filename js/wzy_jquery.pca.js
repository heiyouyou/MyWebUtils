/*
    
    省市级三级联动，需要引入wzy_pca_data.js这个数据文件，才能生效
    1：初始化(入口)
    2: 参数问题
    3: 数据填充
    4: 事件绑定
    5: 优化

 */
var wzy_pca = {
    init:function(targetId,options){
        // 对象的混入，扩展属性
        var opts = $.extend({tip:"省市级",color:'#111',fontWeight:500},options);
        var $obj = $("#"+targetId);
        $obj.html("<div class='area-div'>"+
        "        <span class='left' style='color:"+opts.color+";font-weight:"+opts.fontWeight+"'>"+opts.tip+"：</span>"+
        "        <div class='word'>"+
        "            <div class='select R_type Area' name='province' id='"+targetId+"_sheng'>"+
        "               <span class='select_where'>--省--</span>"+
        "               <ul class='ul sheng'>"+
        "               </ul>"+
        "            </div>"+
        "            <div class='select R_type Area' name='city' id='"+targetId+"_shi'>"+
        "                <span class='select_where'>--市--</span>"+
        "                <ul class='ul shi'>"+
        "                </ul>"+
        "            </div>"+
        "            <div class='select R_type Area' name='town' id='"+targetId+"_xian'>"+
        "                <span class='select_where'>--县--</span>"+
        "                <ul class='ul  xian'>"+
        "                </ul>"+
        "            </div>"+
        "        </div>"+
        "  </div>");
        //初始化数据
        this.setData($obj);
        //初始化事件
        this.event($obj);
    },
    setData:function($obj){
         var data = areaData.sheng;
         var html = "";
         for(var i=0,len=data.length;i<len;i++){
               html+="<li data='"+i+"'><a title='"+data[i]+"'>"+data[i]+"</a></li>";
         }
         $obj.find("ul.sheng").html(html);
    },
    getData:function($obj,pid,name){
        var data = areaData[name]["a_"+pid];
        var html = "";
        for(var i=0,len=data.length;i<len;i++){
            html+="<li data='"+pid+"_"+i+"'><a title='"+data[i]+"'>"+data[i]+"</a></li>";
        }
        $obj.find("ul."+name).html(html);
    },
    event:function($obj){//事件绑定
        //1:解决层的显示隐藏和互逆的过程
        $obj.find(".select").on("click",function(e){
            // 先让页面所有下拉菜单隐藏
            $("ul.ul").hide();
            // 让指定点击的下拉菜单显示
            // $(this).find("ul").show();
            $(this).find("ul").show().end().siblings().find("ul").hide();
            e.stopPropagation();
        });
        $obj.find(".select").on("click","li",function(e){
            var opid = $(this).attr("data");
            var text = $(this).text();
            $(this).parent().hide().prev().attr("opid",opid).text(text);
            var name = $(this).parents(".select").attr("name");
            if(name=="province"){
                $obj.find("ul.shi").empty().prev().text("--市--");
                $obj.find("ul.xian").empty().prev().text("--县--");
                wzy_pca.getData($obj,opid,"shi");
            }else if(name=="city"){
                $obj.find("ul.xian").empty().prev().text("--县--");
                wzy_pca.getData($obj,opid,"xian");
            }
            e.stopPropagation();
        });
        // 点击其他地方隐藏
        $(document).on("click",function(e){
            $("ul.ul").hide();
            e.stopPropagation();
        });
    }
};