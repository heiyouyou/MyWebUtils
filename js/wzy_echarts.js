/*
** author: wzy
** date: 2017/4/17
** description: 三种常见类型echarts图的封装：折线图、柱状图、饼图
** note: 注意首先得引入官方的echarts文件，才可以使用
** case: echartsInstance.init("container");
*/
var echartsInstance = {
	// id：echarts容器的id,必须，
    // opts：echarts的参数配置,非必须，
    // type：1:表示折线图，2:表示扇形玫瑰图，3:表示柱状图,非必须，默认为折线图
	init:function(id,type,opts){
		var chart = this.getEchartsInstance(id);
		// echarts图的配置参数深度混合,默认是折线图的参数
		var options =  $.extend(true,{},(type?this.opts["option"+type]:this.opts.option1),(opts||{}));
        chart.setOption(options);
        // 返回echarts对象
        return chart;
	},
	// 三种常见类型echarts图的默认配置选项
    opts:{
        //折线图(line)的默认配置参数
        option1:{
            title: {
                text: '邮件来往幅度',
                x:'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:['收件量','发件量']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {type: ['line', 'bar']},
                    saveAsImage: {}
                }
            },
            xAxis:  {
                type: 'category',
                // 控制横向与坐标轴的间隙
                boundaryGap: true,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name:'收件量',
                    type:'line',
                    data:[11, 11, 15, 13, 12, 13, 10],
                    markPoint: {
                        symbolSize:40,
                        data: [
                            {type: 'max', name: '最大收件量'},
                            {type: 'min', name: '最小收件量'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'发件量',
                    type:'line',
                    data:[1, 2, 2, 5, 3, 2, 0],
                    markPoint: {
                        symbolSize:40,
                        data: [
                            {type: 'max', name: '最大发件量'},
                            {type: 'min', name: '最小发件量'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        },
        // 玫瑰扇形图(pie)的默认配置参数
        option2:{
            title : {
                text: '来往亲密度',
                subtext: 'TOP10',
                subtextStyle:{
                    color:'#222'
                },
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a}<br/>{b}<br/>{c}次({d}%)"
            },
            legend: {
                show:false,
                x : 'center',
                y : 'bottom',
                itemWidth:15,
                itemHeight:10,
                itemGap:5,
                bottom:-5,
                // 图例文字过多剪裁显示
                formatter:function (name) {
                    return echarts.format.truncateText(name,100,'14px Microsoft Yahei','…');
                },
                tooltip: {
                    show: true
                },
                data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                 {
                    name:'来往亲密度',
                    type:'pie',
                    radius : [10, 100],
                    center : ['50%', '50%'],
                    roseType : 'area',
                    data:[
	                    {value:10, name:'rose1'},
		                {value:5, name:'rose2'},
		                {value:15, name:'rose3'},
		                {value:25, name:'rose4'},
		                {value:20, name:'rose5'},
		                {value:35, name:'rose6'},
		                {value:30, name:'rose7'},
		                {value:40, name:'rose8'}
                	]
                }
            ]
        },
        // 柱状图(bar)的默认配置参数
        option3:{
		    title : {
		        text: '某地区蒸发量和降水量',
		        subtext: '纯属虚构'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['蒸发量','降水量']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            magicType : {show: true, type: ['line', 'bar']},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'蒸发量',
		            type:'bar',
		            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'降水量',
		            type:'bar',
		            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
		            markPoint : {
		                data : [
		                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
		                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name : '平均值'}
		                ]
		            }
		        }
		    ]
		}
    },
	// 获取echarts实例,id:为容器的id
    getEchartsInstance:function(id){
        return echarts.init(document.getElementById(id))
    },
    // ajax请求的数据源
    ajaxData:function(chartObj,url,callback){
        var This = this;
        This.loadingShow(chartObj);
        $.ajax({
            url:url,
            success:function(data){
                echartsInstance.loadingHide(chartObj);
                callback && callback.bind(This)(data);
            }
        });
    },
    //图表加载数据中的动画函数,chartObj:echarts的实例
    loadingShow:function(chartObj){
        chartObj.showLoading({
          text: '加载中...',
          color: '#c23531',
          textColor: '#000',
          maskColor: 'rgba(255, 255, 255, 0.6)',
          zlevel: 0
        });
    },
    //隐藏加载中的函数,chartObj:echarts的实例
    loadingHide:function(chartObj){
        chartObj.hideLoading();
    }
};