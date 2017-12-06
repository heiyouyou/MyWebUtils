/* 
* @author: wzy
* @date: 2017/11/30
* @description: 原生js实现的前端路由机制、spa机制
*/

// 注意！注意！注意！，重要的事说三篇：
// 不能将Router对象的初始化放在页面dom初始化完毕的代码内部，如：
    /* window.onload(function(){
        new Router()...
    })
    $(function(){
        new Router()...
    }) */
// 否则在页面初始化后，初始路由无法对应匹配执行。



// 使用H5的History API创建Router构造函数
// currentRoute为当前路劲，routes为路径对象
// 注意：
//     1.该函数只能在服务器上使用，直接本地html文件打开使用是无法使用的
//     2.该函数需要和后端沟通配置后路由的匹配规则，否则部分页面报404

function Router() {
    this.currentRoute = '';
    this.routes = {};
    this.init();
}

// 注册路由函数
Router.prototype.route = function (path, callback) {

    // 根据type类型，选择相应的history api。  
    this.routes[path] = function (type) {
        if (type == 1) {
            history.pushState({ path: path }, '', path);
        } else if (type == 2) {
            history.replaceState({ path: path }, '', path);
        }
        callback();
    }
}

// 更新页面
Router.prototype.refresh = function (path, type) {
    this.routes[path](type);
}

// 初始化
Router.prototype.init = function () {

    var self = this;

    // 页面初始化重新加载函数
    window.addEventListener('load', function () {
        self.currentRoute = location.href.slice(location.href.indexOf('/', 8));
        console.log(self.currentRoute);
        self.refresh(self.currentRoute);
    });

    // 当用户点击前进后退按钮时触发函数
    window.addEventListener('popstate', function () {
        console.log('history.state.path:', history.state.path);
        self.currentRoute = history.state.path;
        self.refresh(self.currentRoute, 2);
    }, false);

    // 对所有的link标签进行绑定事件
    var historyLinks = document.querySelectorAll('.history-link');
    for (var i = 0, len = historyLinks.length; i < len; i++) {
        historyLinks[i].onclick = function (e) {
            // 阻止默认
            e.preventDefault();
            self.currentRoute = e.target.getAttribute('href');
            self.refresh(self.currentRoute, 1);
        }
    }
}


// 使用hash创建RouterHash构造函数
// currentHash为当前hash值，routes为路径对象
// 注意：可以本地使用，也可以直接在服务器上的js文件中使用
function RouterHash() {
    this.currentHash = '/';
    this.routes = {};
    this.init();
}

// 注册路径，每个路径对应一个回调函数。 
RouterHash.prototype.route = function (path, callback) {
    console.log(path);
    this.routes[path] = callback || function () {
        alert('未定义回调函数！');
    }
}

// 更新页面函数
RouterHash.prototype.refresh = function () {
    this.currentHash = location.hash.slice(1) || '/';
    this.routes[this.currentHash]();
}

// 初始化
RouterHash.prototype.init = function () {
    var self = this;
    window.addEventListener('load', function () {
        self.refresh();
        console.log("触发了load...");
    }, false);

    window.addEventListener('hashchange', function () {
        console.log("触发了hashchange...");
        self.refresh();
    });
}