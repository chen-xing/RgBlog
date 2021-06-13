/**
 * 项目核心Js库，主要包含核心工具类和 相关插件
 *
 * @author yadong.zhang (yadong.zhang0415(a)gmail.com)
 * @website https://www.zhyd.me
 * @version 1.0
 * @date 2017-09-02
 * @since 1.0
 */
(function ($) {
    $.extend({
        notification: {
            isSupported: function () {
                return 'Notification' in window;
            },
            isPermissionGranted: function () {
                return Notification.permission === 'granted';
            },
            requestPermission: function () {
                //验证浏览器是否支持Notification，如果不支持打印提示信息并返回
                if (!this.isSupported()) {
                    // console.log('当前浏览器不支持Notification API');
                    return;
                }
                //该方法将会询问用户是否允许显示通知,不能由页面调用(onload)，必须由用户主动事件触发(onclick等)
                //当用户同意之后，再次调用该方法则无效，即该方法仅对Notification.Permission不为'granted'的时候起作用
                Notification.requestPermission(function (status) {
                    //status是授权状态，如果用户允许显示桌面通知，则status为'granted'
                    // console.log('status: ' + status);
                    //permission只读属性:
                    //  default 用户没有接收或拒绝授权 不能显示通知
                    //  granted 用户接受授权 允许显示通知
                    //  denied  用户拒绝授权 不允许显示通知
                    var permission = Notification.permission;
                    // console.log('permission: ' + permission);
                });
            },
            show: function (options) {
                // this.requestPermission();
                if (!this.isSupported()) {
                    // console.log('当前浏览器不支持Notification API');
                    return;
                }
                if (!this.isPermissionGranted()) {
                    // console.log('当前页面未被授权使用Notification通知');
                    return;
                }
                var op = $.extend({
                    title: "您有一条新消息",
                    icon: appConfig.staticPath + '/img/notification.png',
                    delay: 5000,
                    notification: null
                }, options);
                var n = new Notification(op.title, {
                    icon: op.icon,
                    noscreen: true,
                    body: decodeURIComponent(op.notification)
                });
                //  用户点击之后当天不再显示
                var hide = localStorage.getItem("hide");
                if (!hide || parseInt(hide) < new Date().getDate()) {
                    n.onshow = function () {
                        setTimeout(function () {
                            n.close();
                        }, op.delay);
                    };
                }


                n.onclick = function () {
                    // 打开视图?
                    n.close();
                    //  用户点击之后当天不再显示
                    localStorage.setItem("hide", new Date().getDate());
                };

                n.onerror = function () {
                    // console.log('产生错误');
                };

                n.onclose = function () {
                    // console.log('关闭通知窗口');
                };
            }
        }
    });
})(jQuery);
(function ($) {
    $.extend({
        websocket: {
            _this: null,
            _initialized: false,
            init: function (options) {
                if (!this.isSupported()) {
                    // console.error('Not support websocket');
                    return;
                }
                var op = $.extend({
                    callback: function () {
                    },
                    host: null,
                    reconnect: false
                }, options);
                if (!op.host) {
                    // console.error("初始化WebSocket失败，无效的请求地址");
                    return;
                }
                try {
                    this._this = new WebSocket(op.host);
                } catch (error) {
                    return;
                }
                this._initialized = true;
                //连接发生错误的回调方法
                this._this.onerror = function () {
                    // console.log("与服务器连接失败...");
                };

                //连接成功建立的回调方法
                this._this.onopen = function (event) {
                    // console.log("与服务器连接成功...");
                };

                //接收到消息的回调方法
                this._this.onmessage = function (event) {
                    // dwz.notification.show({notification: event.data});
                    op.callback(event.data);
                    // console.log("接收到服务器端推送的消息：" + event.data);
                };

                //连接关闭的回调方法
                this._this.onclose = function () {
                    $.websocket._initialized = false;
                    // console.log("已关闭当前链接");
                    if (op.reconnect) {
                        // 自动重连
                        setTimeout(function () {
                            $.websocket.open(op);
                        }, 5000);
                    }
                }
            },
            open: function (options) {
                var op = $.extend({
                    callback: function () {
                    },
                    host: null,
                    reconnect: false
                }, options);

                if (this._initialized) {
                    this.close();
                }
                this.init(options);
                //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                window.onbeforeunload = function () {
                    // console.log("窗口关闭了");
                    $.websocket.close();
                }
            },
            isSupported: function () {
                return 'WebSocket' in window;
            },
            send: function (message) {
                if (!this._this) {
                    return;
                }
                this._this.send(message);
            },
            close: function () {
                if (!this._this) {
                    return;
                }
                this._this.close();
            }
        }
    });
})(jQuery);
(function ($) {
    // 覆盖jquery-confirm中的函数
    $.jqAlert = $.alert;
    $.jqConfirm = $.confirm;

    $.extend({
        alert: {
            info: function (content, callback, delayTime) {
                delayTime = delayTime ? "confirm|" + delayTime : "confirm|3000";
                $.jqAlert({
                    icon: 'fa fa-info-circle',
                    title: '友情提示',
                    content: content,
                    type: 'green',
                    typeAnimated: true,
                    autoClose: delayTime,
                    buttons: {
                        confirm: {
                            text: "关闭",
                            btnClass: 'btn-default',
                            action: callback
                        }
                    }
                });
            },
            error: function (content, callback, delayTime) {
                delayTime = delayTime ? "confirm|" + delayTime : "confirm|3000";
                $.jqAlert({
                    icon: 'fa fa-exclamation-circle',
                    title: '警告',
                    content: content,
                    autoClose: delayTime,
                    type: 'orange',
                    typeAnimated: true,
                    buttons: {
                        confirm: {
                            text: "关闭",
                            btnClass: 'btn-default',
                            action: callback
                        }
                    }
                });
            },
            confirm: function (content, confirmCallback, cancelCallback, delayTime) {
                delayTime = delayTime ? "cancel|" + delayTime : "cancel|5000";
                $.jqConfirm({
                    icon: 'fa fa-question-circle',
                    title: '确认？',
                    content: content,
                    autoClose: delayTime,
                    type: 'dark',
                    typeAnimated: true,
                    buttons: {
                        confirm: {
                            text: '确定',
                            btnClass: 'btn-green',
                            action: confirmCallback
                        },
                        cancel: {
                            text: '取消',
                            btnClass: 'btn-default',
                            action: cancelCallback
                        }
                    }
                });
            },
            ajaxSuccessConfirm: function (json, callback) {
                if (json.status == 200) {
                    if (json.message) {
                        $.alert.confirm(json.message, callback);
                    }
                } else {
                    if (json.message) {
                        $.alert.error(json.message);
                    }
                }
            },
            ajaxSuccess: function (json) {
                if (json.status == 200) {
                    if (json.message) {
                        $.alert.info(json.message);
                    }
                } else {
                    if (json.message) {
                        $.alert.error(json.message);
                    }
                }
            },
            ajaxError: function () {
                $.alert.error("网络超时！");
            }
        }
    });
    $.extend({
        tool: {
            currentPath: function () {
                // 域
                // var domain = document.domain;
                // 当前页
                // var nowurl = document.URL;
                // 来源页
                // var fromurl = document.referrer;

                return window.location.pathname;
            },
            random: function (min, max) {
                return Math.floor((Math.random() * max) + min);
            },
            parseFormSerialize: function (serialize) {
                var result = {};
                if (!serialize) {
                    return null;
                }
                var datas = serialize.split("&");
                for (var i = 0, len = datas.length; i < len; i++) {
                    var singleInfo = datas[i].split("=");
                    result[singleInfo[0]] = decodeURIComponent(singleInfo[1]);
                }
                return result;
            }
        }
    });
    /**
     * 扩展String方法
     */
    $.extend(String.prototype, {
        trim: function () {
            return this.replace(/(^\s*)|(\s*$)|\r|\n/g, "");
        },
        startsWith: function (str) {
            return new RegExp("^" + str).test(this);
        },
        endsWith: function (str) {
            return new RegExp(str + "$").test(this);
        },
        replaceAll: function (os, ns) {
            return this.replace(new RegExp(os, "gm"), ns);
        }
    });
    $.extend(Date.prototype, {
        format: function (format) {
            /*
             * eg:format="YYYY-MM-dd hh:mm:ss";
             */
            var o = {
                "M+": this.getMonth() + 1, // month
                "d+": this.getDate(), // day
                "h+": this.getHours(), // hour
                "m+": this.getMinutes(), // minute
                "s+": this.getSeconds(), // second
                "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
                "S": this.getMilliseconds()
                // millisecond
            };

            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + "")
                    .substr(4 - RegExp.$1.length));
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                        : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        }
    });

    /* 星星点赞 */
    $.extend({
        rating: {
            _rating: ".rating",
            init: function (count) {
                count = (count || 5) + 1;
                $(this._rating).each(function () {
                    var $this = $(this);
                    var starCount = parseInt($this.attr("data-star") || 0);
                    var star = '', active = '';
                    for (var i = 1; i < count; i++) {
                        if (starCount > 0 && i <= starCount) {
                            active = 'active';
                        }
                        star += '<i class="fa fa-star-o ' + active + '"></i> ';
                        active = '';
                    }
                    $this.html(star);

                    if ($this.hasClass("ignore")) {
                        return;
                    }

                    /* 绑定星星的鼠标滑过事件 */
                    var $i = $this.find("i");
                    $i.each(function () {
                        $(this).mouseover(function () {
                            $i.each(function () {
                                $(this).removeClass("active");
                            });
                            $(this).addClass("active");
                            var brotherNode = $(this).prevAll();
                            brotherNode.each(function () {
                                $(this).addClass("active");
                            });
                        });
                    });

                    /* 绑定星星的点击事件 */
                    $this.on('click', 'i', function () {
                        var brotherNode = $(this).prevAll();
                        var selectedCount = brotherNode.length + 1;
                    });
                });
            }
        }
    });

    /* 鼠标点击向上冒泡弹出提示动画 */
    $.extend({
        bubble: {
            _tip: ['法制', '爱国', '敬业', '诚信', '友善', '富强', '民主', '文明', '和谐', '自由', '平等', '公正'],
            init: function () {
                var bubbleIndex = 0;
                $('body').click(function (e) {
                    bubbleIndex = bubbleIndex >= $.bubble._tip.length ? 0 : bubbleIndex;
                    if (!e.originalEvent) {
                        return;
                    }
                    var x = e.originalEvent.x || e.originalEvent.layerX || 0;
                    var y = e.originalEvent.y || e.originalEvent.layerY || 0;
                    var html = '<span style="position: f/**\n' +
                        ' * 项目核心Js库，主要包含核心工具类和 相关插件\n' +
                        ' *\n' +
                        ' * @author yadong.zhang (yadong.zhang0415(a)gmail.com)\n' +
                        ' * @website https://docs.zhyd.me\n' +
                        ' * @version 1.0\n' +
                        ' * @date 2017-09-02\n' +
                        ' * @since 1.0\n' +
                        ' */\n' +
                        '(function ($) {\n' +
                        '    $.extend({\n' +
                        '        notification: {\n' +
                        '            isSupported: function () {\n' +
                        '                return \'Notification\' in window;\n' +
                        '            },\n' +
                        '            isPermissionGranted: function () {\n' +
                        '                return Notification.permission === \'granted\';\n' +
                        '            },\n' +
                        '            requestPermission: function () {\n' +
                        '                //验证浏览器是否支持Notification，如果不支持打印提示信息并返回\n' +
                        '                if (!this.isSupported()) {\n' +
                        '                    // console.log(\'当前浏览器不支持Notification API\');\n' +
                        '                    return;\n' +
                        '                }\n' +
                        '                //该方法将会询问用户是否允许显示通知,不能由页面调用(onload)，必须由用户主动事件触发(onclick等)\n' +
                        '                //当用户同意之后，再次调用该方法则无效，即该方法仅对Notification.Permission不为\'granted\'的时候起作用\n' +
                        '                Notification.requestPermission(function (status) {\n' +
                        '                    //status是授权状态，如果用户允许显示桌面通知，则status为\'granted\'\n' +
                        '                    // console.log(\'status: \' + status);\n' +
                        '                    //permission只读属性:\n' +
                        '                    //  default 用户没有接收或拒绝授权 不能显示通知\n' +
                        '                    //  granted 用户接受授权 允许显示通知\n' +
                        '                    //  denied  用户拒绝授权 不允许显示通知\n' +
                        '                    var permission = Notification.permission;\n' +
                        '                    // console.log(\'permission: \' + permission);\n' +
                        '                });\n' +
                        '            },\n' +
                        '            show: function (options) {\n' +
                        '                // this.requestPermission();\n' +
                        '                if (!this.isSupported()) {\n' +
                        '                    // console.log(\'当前浏览器不支持Notification API\');\n' +
                        '                    return;\n' +
                        '                }\n' +
                        '                if (!this.isPermissionGranted()) {\n' +
                        '                    // console.log(\'当前页面未被授权使用Notification通知\');\n' +
                        '                    return;\n' +
                        '                }\n' +
                        '                var op = $.extend({\n' +
                        '                    title: "您有一条新消息",\n' +
                        '                    icon: appConfig.staticPath + \'/img/default.png\',\n' +
                        '                    delay: 5000,\n' +
                        '                    notification: null\n' +
                        '                }, options);\n' +
                        '                var n = new Notification(op.title, {\n' +
                        '                    icon: op.icon,\n' +
                        '                    noscreen: true,\n' +
                        '                    body: decodeURIComponent(op.notification)\n' +
                        '                });\n' +
                        '                //  用户点击之后当天不再显示\n' +
                        '                var hide = localStorage.getItem("hide");\n' +
                        '                if (!hide || parseInt(hide) < new Date().getDate()) {\n' +
                        '                    n.onshow = function () {\n' +
                        '                        setTimeout(function () {\n' +
                        '                            n.close();\n' +
                        '                        }, op.delay);\n' +
                        '                    };\n' +
                        '                }\n' +
                        '\n' +
                        '\n' +
                        '                n.onclick = function () {\n' +
                        '                    // 打开视图?\n' +
                        '                    n.close();\n' +
                        '                    //  用户点击之后当天不再显示\n' +
                        '                    localStorage.setItem("hide", new Date().getDate());\n' +
                        '                };\n' +
                        '\n' +
                        '                n.onerror = function () {\n' +
                        '                    // console.log(\'产生错误\');\n' +
                        '                };\n' +
                        '\n' +
                        '                n.onclose = function () {\n' +
                        '                    // console.log(\'关闭通知窗口\');\n' +
                        '                };\n' +
                        '            }\n' +
                        '        }\n' +
                        '    });\n' +
                        '})(jQuery);\n' +
                        '(function ($) {\n' +
                        '    $.extend({\n' +
                        '        websocket: {\n' +
                        '            _this: null,\n' +
                        '            _initialized: false,\n' +
                        '            init: function (options) {\n' +
                        '                if (!this.isSupported()) {\n' +
                        '                    // console.error(\'Not support websocket\');\n' +
                        '                    return;\n' +
                        '                }\n' +
                        '                var op = $.extend({\n' +
                        '                    callback: function () {\n' +
                        '                    },\n' +
                        '                    host: null,\n' +
                        '                    reconnect: false\n' +
                        '                }, options);\n' +
                        '                if (!op.host) {\n' +
                        '                    // console.error("初始化WebSocket失败，无效的请求地址");\n' +
                        '                    return;\n' +
                        '                }\n' +
                        '                try {\n' +
                        '                    this._this = new WebSocket(op.host);\n' +
                        '                } catch (error) {\n' +
                        '                    return;\n' +
                        '                }\n' +
                        '                this._initialized = true;\n' +
                        '                //连接发生错误的回调方法\n' +
                        '                this._this.onerror = function () {\n' +
                        '                    // console.log("与服务器连接失败...");\n' +
                        '                };\n' +
                        '\n' +
                        '                //连接成功建立的回调方法\n' +
                        '                this._this.onopen = function (event) {\n' +
                        '                    // console.log("与服务器连接成功...");\n' +
                        '                };\n' +
                        '\n' +
                        '                //接收到消息的回调方法\n' +
                        '                this._this.onmessage = function (event) {\n' +
                        '                    // dwz.notification.show({notification: event.data});\n' +
                        '                    op.callback(event.data);\n' +
                        '                    // console.log("接收到服务器端推送的消息：" + event.data);\n' +
                        '                };\n' +
                        '\n' +
                        '                //连接关闭的回调方法\n' +
                        '                this._this.onclose = function () {\n' +
                        '                    $.websocket._initialized = false;\n' +
                        '                    // console.log("已关闭当前链接");\n' +
                        '                    if (op.reconnect) {\n' +
                        '                        // 自动重连\n' +
                        '                        setTimeout(function () {\n' +
                        '                            $.websocket.open(op);\n' +
                        '                        }, 5000);\n' +
                        '                    }\n' +
                        '                }\n' +
                        '            },\n' +
                        '            open: function (options) {\n' +
                        '                var op = $.extend({\n' +
                        '                    callback: function () {\n' +
                        '                    },\n' +
                        '                    host: null,\n' +
                        '                    reconnect: false\n' +
                        '                }, options);\n' +
                        '\n' +
                        '                if (this._initialized) {\n' +
                        '                    this.close();\n' +
                        '                }\n' +
                        '                this.init(options);\n' +
                        '                //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。\n' +
                        '                window.onbeforeunload = function () {\n' +
                        '                    // console.log("窗口关闭了");\n' +
                        '                    $.websocket.close();\n' +
                        '                }\n' +
                        '            },\n' +
                        '            isSupported: function () {\n' +
                        '                return \'WebSocket\' in window;\n' +
                        '            },\n' +
                        '            send: function (message) {\n' +
                        '                if (!this._this) {\n' +
                        '                    return;\n' +
                        '                }\n' +
                        '                this._this.send(message);\n' +
                        '            },\n' +
                        '            close: function () {\n' +
                        '                if (!this._this) {\n' +
                        '                    return;\n' +
                        '                }\n' +
                        '                this._this.close();\n' +
                        '            }\n' +
                        '        }\n' +
                        '    });\n' +
                        '})(jQuery);\n' +
                        '(function ($) {\n' +
                        '    // 覆盖jquery-confirm中的函数\n' +
                        '    $.jqAlert = $.alert;\n' +
                        '    $.jqConfirm = $.confirm;\n' +
                        '\n' +
                        '    $.extend({\n' +
                        '        alert: {\n' +
                        '            info: function (content, callback, delayTime) {\n' +
                        '                delayTime = delayTime ? "confirm|" + delayTime : "confirm|3000";\n' +
                        '                $.jqAlert({\n' +
                        '                    icon: \'fa fa-info-circle\',\n' +
                        '                    title: \'友情提示\',\n' +
                        '                    content: content,\n' +
                        '                    type: \'green\',\n' +
                        '                    typeAnimated: true,\n' +
                        '                    autoClose: delayTime,\n' +
                        '                    buttons: {\n' +
                        '                        confirm: {\n' +
                        '                            text: "关闭",\n' +
                        '                            btnClass: \'btn-default\',\n' +
                        '                            action: callback\n' +
                        '                        }\n' +
                        '                    }\n' +
                        '                });\n' +
                        '            },\n' +
                        '            error: function (content, callback, delayTime) {\n' +
                        '                delayTime = delayTime ? "confirm|" + delayTime : "confirm|3000";\n' +
                        '                $.jqAlert({\n' +
                        '                    icon: \'fa fa-exclamation-circle\',\n' +
                        '                    title: \'警告\',\n' +
                        '                    content: content,\n' +
                        '                    autoClose: delayTime,\n' +
                        '                    type: \'orange\',\n' +
                        '                    typeAnimated: true,\n' +
                        '                    buttons: {\n' +
                        '                        confirm: {\n' +
                        '                            text: "关闭",\n' +
                        '                            btnClass: \'btn-default\',\n' +
                        '                            action: callback\n' +
                        '                        }\n' +
                        '                    }\n' +
                        '                });\n' +
                        '            },\n' +
                        '            confirm: function (content, confirmCallback, cancelCallback, delayTime) {\n' +
                        '                delayTime = delayTime ? "cancel|" + delayTime : "cancel|5000";\n' +
                        '                $.jqConfirm({\n' +
                        '                    icon: \'fa fa-question-circle\',\n' +
                        '                    title: \'确认？\',\n' +
                        '                    content: content,\n' +
                        '                    autoClose: delayTime,\n' +
                        '                    type: \'dark\',\n' +
                        '                    typeAnimated: true,\n' +
                        '                    buttons: {\n' +
                        '                        confirm: {\n' +
                        '                            text: \'确定\',\n' +
                        '                            btnClass: \'btn-green\',\n' +
                        '                            action: confirmCallback\n' +
                        '                        },\n' +
                        '                        cancel: {\n' +
                        '                            text: \'取消\',\n' +
                        '                            btnClass: \'btn-default\',\n' +
                        '                            action: cancelCallback\n' +
                        '                        }\n' +
                        '                    }\n' +
                        '                });\n' +
                        '            },\n' +
                        '            ajaxSuccessConfirm: function (json, callback) {\n' +
                        '                if (json.status == 200) {\n' +
                        '                    if (json.message) {\n' +
                        '                        $.alert.confirm(json.message, callback);\n' +
                        '                    }\n' +
                        '                } else {\n' +
                        '                    if (json.message) {\n' +
                        '                        $.alert.error(json.message);\n' +
                        '                    }\n' +
                        '                }\n' +
                        '            },\n' +
                        '            ajaxSuccess: function (json) {\n' +
                        '                if (json.status == 200) {\n' +
                        '                    if (json.message) {\n' +
                        '                        $.alert.info(json.message);\n' +
                        '                    }\n' +
                        '                } else {\n' +
                        '                    if (json.message) {\n' +
                        '                        $.alert.error(json.message);\n' +
                        '                    }\n' +
                        '                }\n' +
                        '            },\n' +
                        '            ajaxError: function () {\n' +
                        '                $.alert.error("网络超时！");\n' +
                        '            }\n' +
                        '        }\n' +
                        '    });\n' +
                        '    $.extend({\n' +
                        '        tool: {\n' +
                        '            currentPath: function () {\n' +
                        '                // 域\n' +
                        '                // var domain = document.domain;\n' +
                        '                // 当前页\n' +
                        '                // var nowurl = document.URL;\n' +
                        '                // 来源页\n' +
                        '                // var fromurl = document.referrer;\n' +
                        '\n' +
                        '                return window.location.pathname;\n' +
                        '            },\n' +
                        '            random: function (min, max) {\n' +
                        '                return Math.floor((Math.random() * max) + min);\n' +
                        '            },\n' +
                        '            parseFormSerialize: function (serialize) {\n' +
                        '                var result = {};\n' +
                        '                if (!serialize) {\n' +
                        '                    return null;\n' +
                        '                }\n' +
                        '                var datas = serialize.split("&");\n' +
                        '                for (var i = 0, len = datas.length; i < len; i++) {\n' +
                        '                    var singleInfo = datas[i].split("=");\n' +
                        '                    result[singleInfo[0]] = decodeURIComponent(singleInfo[1]);\n' +
                        '                }\n' +
                        '                return result;\n' +
                        '            }\n' +
                        '        }\n' +
                        '    });\n' +
                        '    /**\n' +
                        '     * 扩展String方法\n' +
                        '     */\n' +
                        '    $.extend(String.prototype, {\n' +
                        '        trim: function () {\n' +
                        '            return this.replace(/(^\\s*)|(\\s*$)|\\r|\\n/g, "");\n' +
                        '        },\n' +
                        '        startsWith: function (str) {\n' +
                        '            return new RegExp("^" + str).test(this);\n' +
                        '        },\n' +
                        '        endsWith: function (str) {\n' +
                        '            return new RegExp(str + "$").test(this);\n' +
                        '        },\n' +
                        '        replaceAll: function (os, ns) {\n' +
                        '            return this.replace(new RegExp(os, "gm"), ns);\n' +
                        '        }\n' +
                        '    });\n' +
                        '    $.extend(Date.prototype, {\n' +
                        '        format: function (format) {\n' +
                        '            /*\n' +
                        '             * eg:format="YYYY-MM-dd hh:mm:ss";\n' +
                        '             */\n' +
                        '            var o = {\n' +
                        '                "M+": this.getMonth() + 1, // month\n' +
                        '                "d+": this.getDate(), // day\n' +
                        '                "h+": this.getHours(), // hour\n' +
                        '                "m+": this.getMinutes(), // minute\n' +
                        '                "s+": this.getSeconds(), // second\n' +
                        '                "q+": Math.floor((this.getMonth() + 3) / 3), // quarter\n' +
                        '                "S": this.getMilliseconds()\n' +
                        '                // millisecond\n' +
                        '            };\n' +
                        '\n' +
                        '            if (/(y+)/.test(format)) {\n' +
                        '                format = format.replace(RegExp.$1, (this.getFullYear() + "")\n' +
                        '                    .substr(4 - RegExp.$1.length));\n' +
                        '            }\n' +
                        '\n' +
                        '            for (var k in o) {\n' +
                        '                if (new RegExp("(" + k + ")").test(format)) {\n' +
                        '                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]\n' +
                        '                        : ("00" + o[k]).substr(("" + o[k]).length));\n' +
                        '                }\n' +
                        '            }\n' +
                        '            return format;\n' +
                        '        }\n' +
                        '    });\n' +
                        '\n' +
                        '    /* 星星点赞 */\n' +
                        '    $.extend({\n' +
                        '        rating: {\n' +
                        '            _rating: ".rating",\n' +
                        '            init: function (count) {\n' +
                        '                count = (count || 5) + 1;\n' +
                        '                $(this._rating).each(function () {\n' +
                        '                    var $this = $(this);\n' +
                        '                    var starCount = parseInt($this.attr("data-star") || 0);\n' +
                        '                    var star = \'\', active = \'\';\n' +
                        '                    for (var i = 1; i < count; i++) {\n' +
                        '                        if (starCount > 0 && i <= starCount) {\n' +
                        '                            active = \'active\';\n' +
                        '                        }\n' +
                        '                        star += \'<i class="fa fa-star-o \' + active + \'"></i> \';\n' +
                        '                        active = \'\';\n' +
                        '                    }\n' +
                        '                    $this.html(star);\n' +
                        '\n' +
                        '                    if ($this.hasClass("ignore")) {\n' +
                        '                        return;\n' +
                        '                    }\n' +
                        '\n' +
                        '                    /* 绑定星星的鼠标滑过事件 */\n' +
                        '                    var $i = $this.find("i");\n' +
                        '                    $i.each(function () {\n' +
                        '                        $(this).mouseover(function () {\n' +
                        '                            $i.each(function () {\n' +
                        '                                $(this).removeClass("active");\n' +
                        '                            });\n' +
                        '                            $(this).addClass("active");\n' +
                        '                            var brotherNode = $(this).prevAll();\n' +
                        '                            brotherNode.each(function () {\n' +
                        '                                $(this).addClass("active");\n' +
                        '                            });\n' +
                        '                        });\n' +
                        '                    });\n' +
                        '\n' +
                        '                    /* 绑定星星的点击事件 */\n' +
                        '                    $this.on(\'click\', \'i\', function () {\n' +
                        '                        var brotherNode = $(this).prevAll();\n' +
                        '                        var selectedCount = brotherNode.length + 1;\n' +
                        '                    });\n' +
                        '                });\n' +
                        '            }\n' +
                        '        }\n' +
                        '    });\n' +
                        '\n' +
                        '    /* 鼠标点击向上冒泡弹出提示动画 */\n' +
                        '    $.extend({\n' +
                        '        bubble: {\n' +
                        '            init: function () {\n' +
                        '                var _tip = appConfig.bubbleWord\n' +
                        '                if (!_tip) {\n' +
                        '                    return false;\n' +
                        '                }\n' +
                        '                _tip = _tip.split(",")\n' +
                        '                if(_tip.length === 0 || !_tip[0]) {\n' +
                        '                    return false;\n' +
                        '                }\n' +
                        '                var bubbleIndex = 0;\n' +
                        '                $(\'body\').click(function (e) {\n' +
                        '                    bubbleIndex = bubbleIndex >= _tip.length ? 0 : bubbleIndex;\n' +
                        '                    if (!e.originalEvent) {\n' +
                        '                        return;\n' +
                        '                    }\n' +
                        '                    var x = e.originalEvent.x || e.originalEvent.layerX || 0;\n' +
                        '                    var y = e.originalEvent.y || e.originalEvent.layerY || 0;\n' +
                        '                    var html = \'<span style="position: fixed;z-index:9999;left: \' + x + \'px;top: \' + y + \'px;"></span>\';\n' +
                        '                    var $box = $(html).appendTo($(this));\n' +
                        '                    $box.effectBubble({\n' +
                        '                        y: -100,\n' +
                        '                        className: \'thumb-bubble\',\n' +
                        '                        fontSize: 0.5,\n' +
                        '                        content: \'<i class="fa fa-smile-o"></i>\' + _tip[bubbleIndex]\n' +
                        '                    });\n' +
                        '                    setTimeout(function () {\n' +
                        '                        $box.remove();\n' +
                        '                    }, 1002);\n' +
                        '                    bubbleIndex++;\n' +
                        '                });\n' +
                        '            },\n' +
                        '            unbind: function (duration) {\n' +
                        '                $("body").unbind(\'click\');\n' +
                        '                if (duration && !isNaN(duration = parseInt(duration))) {\n' +
                        '                    setTimeout(function () {\n' +
                        '                        $.bubble.init();\n' +
                        '                    }, duration);\n' +
                        '                }\n' +
                        '            }\n' +
                        '        }\n' +
                        '    });\n' +
                        '    /* 鼠标点击弹出提示动画 */\n' +
                        '\n' +
                        '    $.fn.extend({\n' +
                        '        // 文字向上冒泡\n' +
                        '        effectBubble: function (options) {\n' +
                        '            var op = $.extend({\n' +
                        '                content: \'+1\',\n' +
                        '                y: -100,\n' +
                        '                duration: 1000,\n' +
                        '                effectType: \'ease\',\n' +
                        '                className: \'\',\n' +
                        '                fontSize: 2\n' +
                        '            }, options);\n' +
                        '\n' +
                        '            return this.each(function () {\n' +
                        '                var $box = $(this), flyId = \'effect-fly-\' + (new Date().getTime());\n' +
                        '\n' +
                        '                var tpl = \'<span id="#flyId#" class="effect-bubble-fly #class#" style="opacity: 1;top:#top#px;left:#left#px;font-size: #fontSize#rem;">#content#</span>\';\n' +
                        '                var html = tpl.replaceAll(\'#left#\', 12).replaceAll(\'#top#\', -8)\n' +
                        '                    .replaceAll(\'#flyId#\', flyId).replaceAll(\'#content#\', op.content)\n' +
                        '                    .replaceAll(\'#class#\', op.className).replaceAll(\'#fontSize#\', op.fontSize);\n' +
                        '\n' +
                        '                var $fly = $(html).appendTo($box);\n' +
                        '                $fly.fadeIn(100, "swing", function () {\n' +
                        '                    $fly.animate({top: op.y, opacity: 0}, 100, function () {\n' +
                        '                        $fly.fadeOut(op.duration, function () {\n' +
                        '                            $fly.remove();\n' +
                        '                        });\n' +
                        '                    });\n' +
                        '                });\n' +
                        '            });\n' +
                        '        }\n' +
                        '    });\n' +
                        '\n' +
                        '    /**\n' +
                        '     * 分页插件\n' +
                        '     */\n' +
                        '    $.fn.extend({\n' +
                        '        pagination: function (opts) {\n' +
                        '            return this.each(function () {\n' +
                        '                var self = $(this);\n' +
                        '                var page = new Pagination(opts);\n' +
                        '                var $ul = $(\'<ul class="pager page-btn"></ul>\');\n' +
                        '                $ul.appendTo(self);\n' +
                        '                var pageNumFrag = \'<li><a class="pointer #active#" data-page="#pageNum#">#pageNum#</a></li>\';\n' +
                        '                var interval = page.getInterval();\n' +
                        '                var html = \'\';\n' +
                        '                if (page.hasPrev()) {\n' +
                        '                    html += \'<li><a class="pointer" data-page="\' + page.opts.pre + \'"><i class="fa fa-angle-double-left"></i></a></li>\';\n' +
                        '                }\n' +
                        '                for (var i = interval.start; i < interval.end; i++) {\n' +
                        '                    html += pageNumFrag.replaceAll("#pageNum#", i).replaceAll("#active#", page.opts.currentPage === i ? \'active\' : \'\');\n' +
                        '                }\n' +
                        '                if (page.hasNext()) {\n' +
                        '                    html += \'<li><a class="pointer" data-page="\' + page.opts.next + \'"><i class="fa fa-angle-double-right"></i></a></li>\';\n' +
                        '                }\n' +
                        '                $ul.html(html);\n' +
                        '\n' +
                        '                $ul.find("li > a").on(\'click\', function () {\n' +
                        '                    var pageNum = $(this).data(\'page\') || 1;\n' +
                        '                    if (!pageNum) {\n' +
                        '                        return;\n' +
                        '                    }\n' +
                        '                    if (page.opts.search) {\n' +
                        '                        // ....\n' +
                        '                        $("#searchForm").find("input[name=pageNumber]").val(pageNum);\n' +
                        '                        $(".nav-search-btn").click();\n' +
                        '                    } else {\n' +
                        '                        window.location.href = page.opts.url + "/" + pageNum;\n' +
                        '                    }\n' +
                        '                })\n' +
                        '            });\n' +
                        '        }\n' +
                        '    });\n' +
                        '\n' +
                        '    var Pagination = function (opts) {\n' +
                        '        this.opts = $.extend({\n' +
                        '            // 分页请求路径\n' +
                        '            url: \'\',\n' +
                        '            // 是否是点击搜索后的分页\n' +
                        '            search: \'\',\n' +
                        '            // 总页数\n' +
                        '            totalPage: 0,\n' +
                        '            // 当前页数\n' +
                        '            currentPage: 1,\n' +
                        '            // 显示多少个分页按钮,默认7个\n' +
                        '            showNumPage: 7,\n' +
                        '            // 上一页\n' +
                        '            pre: -1,\n' +
                        '            // 下一页\n' +
                        '            next: -1\n' +
                        '        }, opts);\n' +
                        '    };\n' +
                        '    $.extend(Pagination.prototype, {\n' +
                        '        // 获取实际需显示的分页的区间信息\n' +
                        '        getInterval: function () {\n' +
                        '            var ne_half = Math.ceil(this.opts.showNumPage / 2);\n' +
                        '            var totalPage = this.opts.totalPage;\n' +
                        '            var upper_limit = totalPage - this.opts.showNumPage;\n' +
                        '            var start = this.getCurrentPage() > ne_half ? Math.max(Math.min(this.getCurrentPage() - ne_half, upper_limit), 0) : 0;\n' +
                        '            var end = this.getCurrentPage() > ne_half ? Math.min(this.getCurrentPage() + ne_half, totalPage) : Math.min(this.opts.showNumPage, totalPage);\n' +
                        '            return {\n' +
                        '                start: start + 1,\n' +
                        '                end: end + 1\n' +
                        '            };\n' +
                        '        },\n' +
                        '        getCurrentPage: function () {\n' +
                        '            var currentPage = parseInt(this.opts.currentPage);\n' +
                        '            return isNaN(currentPage) ? 1 : currentPage;\n' +
                        '        },\n' +
                        '        hasPrev: function () {\n' +
                        '            return this.opts.pre && this.opts.pre > 0;\n' +
                        '        },\n' +
                        '        hasNext: function () {\n' +
                        '            return this.opts.next && this.opts.next > 0 && this.opts.next <= this.opts.totalPage;\n' +
                        '        }\n' +
                        '    });\n' +
                        '})(jQuery);\n' +
                        '\n' +
                        '/* 返回顶部插件 */\n' +
                        '(function ($) {\n' +
                        '    $.fn.toTop = function (opt) {\n' +
                        '        //variables\n' +
                        '        var elem = this;\n' +
                        '        var win = $(window);\n' +
                        '        var doc = $(\'html, body\');\n' +
                        '        var options = opt;\n' +
                        '        //如果没有配置自定义的参数，则使用默认\n' +
                        '        if (!options) {\n' +
                        '            options = $.extend({\n' +
                        '                autohide: true,\n' +
                        '                offset: 100,\n' +
                        '                speed: 500,\n' +
                        '                right: 15,\n' +
                        '                bottom: 50\n' +
                        '            }, opt);\n' +
                        '        }\n' +
                        '        elem.css({\n' +
                        '            \'position\': \'fixed\',\n' +
                        '            \'right\': options.right,\n' +
                        '            \'bottom\': options.bottom,\n' +
                        '            \'cursor\': \'pointer\'\n' +
                        '        });\n' +
                        '        if (options.autohide) {\n' +
                        '            elem.css(\'display\', \'none\');\n' +
                        '        }\n' +
                        '        elem.click(function () {\n' +
                        '            doc.animate({scrollTop: 0}, options.speed);\n' +
                        '        });\n' +
                        '        win.scroll(function () {\n' +
                        '            var scrolling = win.scrollTop();\n' +
                        '            if (options.autohide) {\n' +
                        '                if (scrolling > options.offset) {\n' +
                        '                    elem.fadeIn(options.speed);\n' +
                        '                } else elem.fadeOut(options.speed);\n' +
                        '            }\n' +
                        '        });\n' +
                        '    };\n' +
                        '})(jQuery);\n' +
                        '/* 返回顶部插件 end */\n' +
                        '\n' +
                        '/* 文字滚动 start */\n' +
                        '(function ($) {\n' +
                        '    $.fn.textSlider = function (settings) {\n' +
                        '        settings = jQuery.extend({\n' +
                        '            speed: "normal",\n' +
                        '            line: 2,\n' +
                        '            timer: 3000\n' +
                        '        }, settings);\n' +
                        '        return this.each(function () {\n' +
                        '            $.fn.textSlider.scllor($(this), settings);\n' +
                        '        });\n' +
                        '    };\n' +
                        '    $.fn.textSlider.scllor = function ($this, settings) {\n' +
                        '        var ul = $("ul:eq(0)", $this);\n' +
                        '        var timerID;\n' +
                        '        var li = ul.children();\n' +
                        '        var liHight = $(li[0]).height();\n' +
                        '        var upHeight = 0 - settings.line * liHight;//滚动的高度；\n' +
                        '        var scrollUp = function () {\n' +
                        '            ul.animate({marginTop: upHeight}, settings.speed, function () {\n' +
                        '                for (i = 0; i < settings.line; i++) {\n' +
                        '                    ul.find("li:first", $this).appendTo(ul);\n' +
                        '                }\n' +
                        '                ul.css({marginTop: 0});\n' +
                        '            });\n' +
                        '        };\n' +
                        '        var autoPlay = function () {\n' +
                        '            timerID = window.setInterval(scrollUp, settings.timer);\n' +
                        '        };\n' +
                        '        var autoStop = function () {\n' +
                        '            window.clearInterval(timerID);\n' +
                        '        };\n' +
                        '        //事件绑定\n' +
                        '        ul.hover(autoStop, autoPlay).mouseout();\n' +
                        '    };\n' +
                        '})(jQuery);\n' +
                        '/* 文字滚动 end */\nixed;z-index:9999;left: ' + x + 'px;top: ' + y + 'px;"></span>';
                    var $box = $(html).appendTo($(this));
                    $box.effectBubble({
                        y: -100,
                        className: 'thumb-bubble',
                        fontSize: 0.5,
                        content: '<i class="fa fa-smile-o"></i>' + $.bubble._tip[bubbleIndex]
                    });
                    setTimeout(function () {
                        $box.remove();
                    }, 1002);
                    bubbleIndex++;
                });
            },
            unbind: function (duration) {
                $("body").unbind('click');
                if (duration && !isNaN(duration = parseInt(duration))) {
                    setTimeout(function () {
                        $.bubble.init();
                    }, duration);
                }
            }
        }
    });
    /* 鼠标点击弹出提示动画 */

    $.fn.extend({
        // 文字向上冒泡
        effectBubble: function (options) {
            var op = $.extend({
                content: '+1',
                y: -100,
                duration: 1000,
                effectType: 'ease',
                className: '',
                fontSize: 2
            }, options);

            return this.each(function () {
                var $box = $(this), flyId = 'effect-fly-' + (new Date().getTime());

                var tpl = '<span id="#flyId#" class="effect-bubble-fly #class#" style="opacity: 1;top:#top#px;left:#left#px;font-size: #fontSize#rem;">#content#</span>';
                var html = tpl.replaceAll('#left#', 12).replaceAll('#top#', -8)
                    .replaceAll('#flyId#', flyId).replaceAll('#content#', op.content)
                    .replaceAll('#class#', op.className).replaceAll('#fontSize#', op.fontSize);

                var $fly = $(html).appendTo($box);
                $fly.fadeIn(100, "swing", function () {
                    $fly.animate({top: op.y, opacity: 0}, 100, function () {
                        $fly.fadeOut(op.duration, function () {
                            $fly.remove();
                        });
                    });
                });
            });
        }
    });

    /**
     * 分页插件
     */
    $.fn.extend({
        pagination: function (opts) {
            return this.each(function(){
                var self = $(this);
                var page = new Pagination(opts);
                var $ul = $('<ul class="pager page-btn"></ul>');
                $ul.appendTo(self);
                var pageNumFrag = '<li><a class="pointer #active#" data-page="#pageNum#">#pageNum#</a></li>';
                var interval = page.getInterval();
                var html = '';
                if(page.hasPrev()) {
                    html += '<li><a class="pointer" data-page="' + page.opts.pre + '"><i class="fa fa-angle-double-left"></i></a></li>';
                }
                for (var i = interval.start; i < interval.end; i++) {
                    html += pageNumFrag.replaceAll("#pageNum#", i).replaceAll("#active#", page.opts.currentPage === i ? 'active' : '');
                }
                if(page.hasNext()) {
                    html += '<li><a class="pointer" data-page="' + page.opts.next + '"><i class="fa fa-angle-double-right"></i></a></li>';
                }
                $ul.html(html);

                $ul.find("li > a").on('click', function () {
                    var pageNum = $(this).data('page') || 1;
                    if (!pageNum) {
                        return;
                    }
                    if (page.opts.search) {
                        // ....
                        $("#searchForm").find("input[name=pageNumber]").val(pageNum);
                        $(".nav-search-btn").click();
                    } else {
                        window.location.href = page.opts.url + "/" + pageNum;
                    }
                })
            });
        }
    });

    var Pagination = function(opts) {
        this.opts = $.extend({
            // 分页请求路径
            url: '',
            // 是否是点击搜索后的分页
            search: '',
            // 总页数
            totalPage: 0,
            // 当前页数
            currentPage: 1,
            // 显示多少个分页按钮,默认7个
            showNumPage: 7,
            // 上一页
            pre: -1,
            // 下一页
            next: -1
        }, opts);
    };
    $.extend(Pagination.prototype, {
        // 获取实际需显示的分页的区间信息
        getInterval: function() {
            var ne_half = Math.ceil(this.opts.showNumPage / 2);
            var totalPage = this.opts.totalPage;
            var upper_limit = totalPage - this.opts.showNumPage;
            var start = this.getCurrentPage() > ne_half ? Math.max(Math.min(this.getCurrentPage() - ne_half, upper_limit), 0) : 0;
            var end = this.getCurrentPage() > ne_half ? Math.min(this.getCurrentPage() + ne_half, totalPage) : Math.min(this.opts.showNumPage, totalPage);
            return {
                start: start + 1,
                end: end + 1
            };
        },
        getCurrentPage: function() {
            var currentPage = parseInt(this.opts.currentPage);
            return isNaN(currentPage) ? 1 : currentPage;
        },
        hasPrev: function() {
            return this.opts.pre && this.opts.pre > 0;
        },
        hasNext: function() {
            return this.opts.next && this.opts.next > 0 && this.opts.next <= this.opts.totalPage;
        }
    });
})(jQuery);

/* 返回顶部插件 */
(function ($) {
    $.fn.toTop = function (opt) {
        //variables
        var elem = this;
        var win = $(window);
        var doc = $('html, body');
        var options = opt;
        //如果没有配置自定义的参数，则使用默认
        if (!options) {
            options = $.extend({
                autohide: true,
                offset: 100,
                speed: 500,
                right: 15,
                bottom: 50
            }, opt);
        }
        elem.css({
            'position': 'fixed',
            'right': options.right,
            'bottom': options.bottom,
            'cursor': 'pointer'
        });
        if (options.autohide) {
            elem.css('display', 'none');
        }
        elem.click(function () {
            doc.animate({scrollTop: 0}, options.speed);
        });
        win.scroll(function () {
            var scrolling = win.scrollTop();
            if (options.autohide) {
                if (scrolling > options.offset) {
                    elem.fadeIn(options.speed);
                }
                else elem.fadeOut(options.speed);
            }
        });
    };
})(jQuery);
/* 返回顶部插件 end */

/* 文字滚动 start */
(function ($) {
    $.fn.textSlider = function (settings) {
        settings = jQuery.extend({
            speed: "normal",
            line: 2,
            timer: 3000
        }, settings);
        return this.each(function () {
            $.fn.textSlider.scllor($(this), settings);
        });
    };
    $.fn.textSlider.scllor = function ($this, settings) {
        var ul = $("ul:eq(0)", $this);
        var timerID;
        var li = ul.children();
        var liHight = $(li[0]).height();
        var upHeight = 0 - settings.line * liHight;//滚动的高度；
        var scrollUp = function () {
            ul.animate({marginTop: upHeight}, settings.speed, function () {
                for (i = 0; i < settings.line; i++) {
                    ul.find("li:first", $this).appendTo(ul);
                }
                ul.css({marginTop: 0});
            });
        };
        var autoPlay = function () {
            timerID = window.setInterval(scrollUp, settings.timer);
        };
        var autoStop = function () {
            window.clearInterval(timerID);
        };
        //事件绑定
        ul.hover(autoStop, autoPlay).mouseout();
    };
})(jQuery);
/* 文字滚动 end */