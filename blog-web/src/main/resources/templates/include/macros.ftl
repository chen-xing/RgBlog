<#-- 公共顶部 -->
<#macro header title="OneBlog开源博客" keywords="" description="" canonical="" hasEditor=false>
<#include "/common/annotation.ftl">
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>${title}</title>
    <meta name="author" content="${config.authorName}(${config.authorEmail})">
    <meta name="keywords" content="${keywords}"/>
    <meta name="description" content="${description}" id="meta_description">
    <link rel="canonical" href="${config.siteUrl}${canonical}" />
    <#include "/layout/quote.ftl">
    <style>
        body{
            background-color: #f4f5f5;
            z-index: 2;
        }
    </style>
    <#if hasEditor>
        <link href="https://cdn.staticfile.org/simplemde/1.11.2/simplemde.min.css" rel="stylesheet">
        <link href="https://cdn.staticfile.org/github-markdown-css/3.0.0/github-markdown.min.css" rel="stylesheet">
        <link href="https://cdn.staticfile.org/highlight.js/10.0.0/styles/github.min.css" rel="stylesheet">
    </#if>
    <#nested>

<#--    <script data-ad-client="ca-pub-3531608925757879" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>-->
    <style type="text/css">
        ${config.customCss}
    </style>
</head>
<body>
<#--    <canvas id="c" style="position:absolute;top:0px;left:0px;z-index:-1;margin: 0 auto;"></canvas>-->
    <#include "/layout/header.ftl"/>
</#macro>

<#-- 公共底部 -->
<#macro footer>
    <#include "/layout/footer.ftl"/>

    <#nested>

    </body>
</html>
</#macro>

<#-- 分页组件 -->
<#macro pageBar>
    <#if page?? && (page.pages > 1)>
    <nav class="pagination"
         data-url="${config.siteUrl}/${url!}"
         data-search="${(model.keywords == null || model.keywords == '')?string('false', 'true')}"
         data-total-page="${page.pages?c}"
         data-current-page="${page.pageNum?c}"
         data-pre="${page.prePage}"
         data-next="${page.nextPage}"></nav>
    </#if>
</#macro>


<#-- blog-header -->
<#macro blogHeader title="Header" weiboName="@我的微博">
    <div class="col-sm-12 blog-main">
        <div class="blog-header">
            <h4>${title}</h4>
            <p class="blog-description" id="hitokoto"></p>
            <div>
                <a href="javascript:void(0);" target="_blank" title="点击QQ联系我" onclick="window.open('tencent://message/?uin=${config.qq}&amp;Site=www.${config.domain}&amp;Menu=yes')" rel="external nofollow"><i class="fa fa fa-qq fa-fw"></i>QQ联系</a>
                |
                <a href="mailto:${config.authorEmail}" target="_blank" title="点击给我发邮件" rel="external nofollow"><i class="fa fa fa-envelope fa-fw"></i>邮箱联系</a>
                |
                <a href="${config.weibo}" target="_blank" title="点击查看我的微博" rel="external nofollow"><i class="fa fa fa-weibo fa-fw"></i>${weiboName}</a>
            </div>
        </div>
    </div>
</#macro>

<#-- 页面顶部、菜单下方提示栏 -->
<#macro prompt>
    <!--[if lt IE 9]><div class="alert alert-danger topframe" role="alert">Oh My God！你的浏览器实在<strong>太太太太太太旧了</strong>，赶紧升级浏览器 <a target="_blank" class="alert-link" href="http://browsehappy.com">立即升级</a></div><![endif]-->
    <#if config.maintenance! && config.maintenance == 1>
    <div class="alert alert-warning fade-in" role="alert">
        <a href="#" class="close" data-dismiss="alert">&times;</a>
        系统预计将在<strong>${config.maintenanceDate}</strong>左右进行更新维护，届时网站将无法使用，更新大约持续${config.maintenanceTime!(30)}分钟，敬请悉知。
    </div>
    </#if>
</#macro>

<#-- 赞赏 -->
<#macro praise>
    <#if config.wxPraiseCode! || config.zfbPraiseCode!>
        <h5 class="custom-title"><i class="fa fa-dollar fa-fw"></i><strong>鼓励一下</strong><small></small></h5>
        <div class="col-sm-12 col-md-12" style="float: initial;">
            <#if config.zfbPraiseCode!>
                <a href="${config.zfbPraiseCode}" class="showImage" title="支付宝收钱码" rel="external nofollow">
                    <img src="${config.zfbPraiseCode}" alt="支付宝收钱码" class="img-rounded" style="width: 250px;height: auto;">
                </a>
            </#if>
            <#if config.wxPraiseCode!>
                <a href="${config.wxPraiseCode}" class="showImage" title="微信收钱码" rel="external nofollow">
                    <img src="${config.wxPraiseCode}" alt="微信收钱码" class="img-rounded" style="width: 250px;height: auto;">
                </a>
            </#if>
        </div>
    </#if>
</#macro>