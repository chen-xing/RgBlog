 **RgBlog** 一个简洁美观、功能强大并且自适应的Java博客。使用springboot开发，前端使用Bootstrap。支持移动端自适应，配有完备的前台和后台管理功能。    

![JDK](https://img.shields.io/badge/JDK-1.8-green.svg)
![Maven](https://img.shields.io/badge/Maven-3.3.1-green.svg)
![MySQL](https://img.shields.io/badge/MySQL-5.6.4-green.svg)
![Redis](https://img.shields.io/badge/Redis-3.0.503-green.svg)
[![license](https://img.shields.io/badge/license-GPL%20v3-yellow.svg)](https://gitee.com/yadong.zhang/DBlog/blob/master/LICENSE)

----

## 每个star的程序员都会当上cto.榜上留名
![forker](http://bytecrank.com/nastyox/reporoster/php/forkersSVG.php?user=chen-xing&repo=RgBlog)

![start](http://bytecrank.com/nastyox/reporoster/php/stargazersSVG.php?user=chen-xing&repo=RgBlog)

# 重要声明

**看文档！看文档！看文档！**，初次使用， 请先**看文档！**

1. 本项目配有相关[帮助文档](https://gitee.com/yadong.zhang/DBlog/wikis) 。文档中包括**基本的项目说明**、**shiro标签使用**、**七牛云配置**和一些常见的**异常问题解决方案**。使用时碰到问题请**优先**查阅【[帮助文档](https://gitee.com/yadong.zhang/DBlog/wikis)】。因为现在好多朋友问的问题大部分都写在【[帮助文档](https://gitee.com/yadong.zhang/DBlog/wikis)】中了，希望各位朋友能自己翻阅下相关资料，高效提问，避免重复问题！
2. **提问题**前请优先阅读【[如何向开源社区提问题](https://github.com/seajs/seajs/issues/545)】&【[提问的智慧](http://www.dianbo.org/9238/stone/tiwendezhihui.htm)】
3. **提问题**时请优先选择[Gitee Issues](https://gitee.com/yadong.zhang/DBlog/issues)（方便问题追踪和一对一解决），其次[我的博客-留言板](https://www.94rg.com/guestbook)，再次QQ群（QQ群消息较多，提问请注意节奏、时机），最次加我QQ好友直接提问（不推荐）
4. 本项目唯一官网：[https://www.94rg.com](https://www.94rg.com)  
5. 本项目开源地址：[Github](https://github.com/chen-xing/RgBlog)
6. 本项目修改记录，详情请移步[这里](https://github.com/chen-xing/RgBlog/blob/master/update.md)
7. 如果你想贡献代码，请先阅读[这篇文章](https://github.com/chen-xing/RgBlog/blob/master/contribution.md)

----

# 写在前面的话
ps: 虽然我知道，大部分人都是来了**直接下载源代码**后就潇洒的离开，并且只有等到下次**突然想到**“我天~~我得去看看RgBlog这烂项目更新新功能了吗”的时候才会重新来到这儿，即使你重新来过，我估计你也只有两个选择：    

发现更新代码了 --> 下载源码后重复上面的步骤    
发现没更新代码 --> 直接关闭浏览器

虽然我知道现实就是如此的残酷，但我还是要以我萤虫之力对各位到来的同仁发出一声诚挚的嘶吼：

**如果喜欢，请多多分享！！多多Star！！**

----


# 功能简介

- **多种编辑器**：支持wangEditor和Markdown两种富文本编辑器，可以自行选择
- **自动申请友情链接**：在线申请友情链接，无需站长手动配置，只需申请方添加完站长的连接后自行申请即可
- **百度推送**：支持百度推送功能，加速百度搜索引擎收录博文
- **评论系统**：自研的评论系统，支持显示用户地址、浏览器和os信息，后台可审核评论、开启匿名评论、回复和邮件通知评论
- **权限管理**：后台配备完善的权限管理
- **SEO**：自带robots、sitemap等seo模板，实现自动生成robots和sitemap
- **实时通讯**：管理员可向在线的用户发送实时消息（需用户授权 - 基于websocket实现，具体参考[DBlog建站之Websocket的使用](https://www.zhyd.me/article/111)）
- **系统配置支持快速配置**：可通过后台手动修改诸如域名信息、SEO优化、赞赏码、七牛云以及更新维护通知等
- **多种文件存储**：集成七牛云、阿里云OSS，实现文件云存储，同时支持本地文件存储
- **文件搬运工**：集成[blog-hunter](https://gitee.com/yadong.zhang/blog-hunter)实现“文章搬运工”功能，支持一键同步imooc、csdn、iteye或者cnblogs上的文章，可抓取列表和单个文章
- **第三方授权登录**：集成[JustAuth](https://gitee.com/yadong.zhang/JustAuth)实现第三方授权登录
# Demo 演示

[前台demo](https://www.94rg.com/)

[![首页](https://z3.ax1x.com/2021/07/06/RTI4W8.png)

![详情页](https://z3.ax1x.com/2021/07/06/RTolTI.png)

![留言板](https://z3.ax1x.com/2021/07/06/RToGff.png)

![手机版](https://z3.ax1x.com/2021/07/06/RToc1U.png)


[后台demo(admin,123456)](https://www.94rg.com/)

![后台首页](https://z3.ax1x.com/2021/07/06/RToH1O.png)

![后台系统配置](https://z3.ax1x.com/2021/07/06/RToXBd.png)

![文章列表页](https://z3.ax1x.com/2021/07/06/RTTijg.png)



----

# 模块划分

| 模块  | 释义 | 备注 |
| :------------: | :------------: | :------------: |
| blog-core | 核心业务类模块，提供基本的数据操作、工具处理等 | 该模块只是作为核心依赖包存在 |
| blog-admin | 后台管理模块 | 该模块作为单独项目打包部署 |
| blog-web | 前台模块 | 该模块作为单独项目打包部署 |
| blog-file | 文件存储功能模块 | 支持local、七牛云和阿里云OSS |
| ~~blog-spider~~ | 爬虫相关代码模块 | 已使用[blog-hunter](https://gitee.com/yadong.zhang/blog-hunter)插件替代 |


# 技术栈

- Springboot 2.0.8
- Apache Shiro 1.2.2
- Logback
- Redis
- Lombok
- Websocket
- MySQL、Mybatis、Mapper、Pagehelper
- Freemarker
- Bootstrap 3.3.0
- wangEditor
- jQuery 1.11.1、jQuery Lazyload 1.9.7、fancybox、iCheck
- 阿里云OSS
- kaptcha
- Qiniu
- webMagic
- ...


# 使用方法(以blog-web项目为例)

1. 使用IDE导入本项目
2. 新建数据库`CREATE DATABASE dblog;`
3. 导入数据库`docs/db/dblog.sql`
4. 初始化数据库`docs/db/init_data.sql`
5. 修改配置文件
   1. 数据库链接属性(在`[blog-core]/resources/config/application-center-{env}.yml`配置文件中搜索`datasource`或定位到L.5) 
   2. redis配置(在`[blog-core]/resources/config/application-center-{env}.yml`配置文件中搜索`redis`或定位到L.14)
   3. 以上两个必备的配置项修改完成后就能启动项目了。关于其他配置项，请参考后台“系统配置”页面
6. 运行项目(三种方式，任选其一)
   1. 项目根目录下执行`mvn -X clean package -Dmaven.test.skip=true -Ptest`编译打包（注：-Ptest中的test为环境标识），然后cd到blog-web目录下执行`java -jar target/blog-web.jar`
   2. 在`blog-web`项目根目录下执行`mvn spring-boot:run`(注，如果报依赖错误，可在相关的依赖模块先执行install操作)
   3. 直接运行`BlogWebApplication.java`
7. 浏览器访问`http://127.0.0.1:8443`
8. `blog-admin`项目的启动方式与`blog-web`类似，请参考上面的使用说明

# 后续扩展
- [ ] 1. 页面缓存
- [ ] 2. cc防护
- [ ] 3. 配套小程序
- [ ] 4. 待续...
...

# Who is using?
- [人工博客](https://www.94rg.com/)
- [程序员导航网](https://www.chenzhuofan.top/)

----

# 特别感谢

- 广大的开源爱好者
- 无私的网友
- [gentelella](https://github.com/puikinsh/gentelella): 一款开源的Bootstrap3后台管理模板
- [七牛云](https://portal.qiniu.com/signup?code=3l8yx2v0f21ci): 强大的对象存储、CDN等服务提供商
- [emoji表情列表](https://github.com/caiyongji/emoji-list#nature): emoji表情列表
- [blog-hunter](https://github.com/zhangyd-c/blog-hunter): 博客猎手，基于webMagic的博客爬取工具，支持慕课、csdn、iteye、cnblogs、掘金和V2EX等各大主流博客平台。
- [JustAuth](https://gitee.com/yadong.zhang/JustAuth): 史上最全的整合第三方登录的工具,目前已支持Github、Gitee、微博、钉钉、百度、Coding、腾讯云开发者平台、OSChina、支付宝、QQ、微信、淘宝、Google、Facebook、抖音、领英、小米、微软和今日头条等第三方平台的授权登录。 Login, so easy!
- 待续...

# 开源协议

[![license](https://img.shields.io/badge/license-GPL%20v3-yellow.svg)](https://gitee.com/yadong.zhang/DBlog/blob/master/LICENSE)
