/**
 * Created by Administrator on 2017/1/2.
 * 注意此爬虫程序，只支持http协议的网站
 */


// 载入http模块，通过http的get和request就请求外网服务器的数据。
var http = require('http');
//类似于jQuery，需要npm install cheerion --dev-save
var cheerio = require('cheerio');
//载入自定义写入文件模块
var file = require('./file');

//url:爬虫的外网地址,path:图片存放的路径，其他模块主要引入reptile文件，调用方法reptileImg即可爬取指定外网路径页面的所有图片
exports.reptileImg = function(url,path){
    //this指代属性、方法混合后的对象module.exports
    var This = this;
    //请求指定地址数据
    http.get(url,function(response){
        console.log('请求数据中...');
        var html = '';
        ///on("data")是代表请求数据进行中，如果执行完毕，就会来触发on("end")的事件，如果发生错误，则触发on('error')事件
        response.on('data',function(data){
            // 注意：默认data是读取一部分返回的数据字节Buffer对象
            html +=data.toString('utf-8');//设置utf-8编码，原文格式显示
        }).on('end',function(){
            This.parseHtml(html,path);
        }).on('error',function(){
            console.log('地址'+url+'请求数据出错！！！');
        });
    });
};
//转换html数据文本，html:爬虫的html网页数据，path:存放的路径
exports.parseHtml = function(html,path){
        //cheerio.load()返回一个类似于jQuery的对象
        var $ = cheerio.load(html,{decodeEntities:false});
        //注意：如果不设置{decodeEntities:false}，后面用html()获取文本和标签格式的内容时，会出现16进制的编码文本
        //var $ = cheerio.load(html);
        //获取网页title标签的文本
        //var title = $('title').text();
        var title = $('title').html();
        console.log(title);
        //获取页面所有img图片，返回的是一个json数组
        var $imgs = $("img");
        console.log($imgs.length+'张图片开始下载...');
        //获取每张图片的src值
        for(var i=0,len=$imgs.length;i<len;i++){
            //注意：$imgs[i]变成了一个原生的js对象，故需要再次用$()变成jQuery对象
            var imgSrc = $($imgs[i]).attr('src');
            //下载常见类型的图片
            if(imgSrc.indexOf('.jpg')!=-1){
                this.downloadImg(imgSrc,path+i+'.jpg');
            }else if(imgSrc.indexOf('.png')!=-1){
                this.downloadImg(imgSrc,path+i+'.png');
            }else if(imgSrc.indexOf('.jpeg')!=-1){
                this.downloadImg(imgSrc,path+i+'.jpeg');
            }else if(imgSrc.indexOf('.gif')!=-1){
                this.downloadImg(imgSrc,path+i+'.gif');
            };
        }
    };
//下载图片,url:图片地址，filname:图片名字
exports.downloadImg = function(url,filname){
        http.get(url,function(res){
            //注意：当请求的是二进制流文件时，响应头一定要设置编码成二进制binary的
            res.setEncoding('binary');
            var img = '';
            res.on('data',function(data){
                img +=data;
            }).on('end',function(){
                file.writeFileBinary(filname,img).then(function(){
                    console.log(url+'下载成功');
                }).catch(function(){
                    console.log(url+'下载失败');
                });
            }).on('error',function(){
                console.log('读取失败！！！');
            });
        })

    }


