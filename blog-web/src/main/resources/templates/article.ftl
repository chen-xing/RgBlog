<#include "include/macros.ftl">
<@header title="${article.title} | ${config.siteName}" keywords="${article.keywords!},${config.siteName}" description="${article.description!}"
    canonical="/article/${article.id}" hasEditor=true></@header>
<#if article.coverImage??>
    <img src="${article.coverImage!}" onerror="this.src='${config.staticWebSite}/img/default_article_cover.jpg'" style="display: none;" id="cover-img">
</#if>
<div class="container custome-container">
    <nav class="breadcrumb">
        <a class="crumbs" title="返回首页" href="${config.siteUrl}" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-home"></i>首页</a>
        <i class="fa fa-angle-right"></i>
        <a href="${config.siteUrl}/type/${article.typeId}" title="点击查看该分类文章" data-toggle="tooltip" data-placement="bottom">${article.type.name}</a>
        <i class="fa fa-angle-right"></i>正文
    </nav>
    <div class="row article-body">
        <div class="col-sm-8 blog-main">
            <div class="blog-body overflow-initial fade-in">
                <div class="article-flag">
                    <#if article.original?string('true','false') == 'true'>
                        <span class="article-blockquote article-blockquote-green"></span>
                        <span class="article-original article-original-green">
                            <a href="${config.siteUrl}/article/${article.id}">原创</a>
                        </span>
                    <#else>
                        <span class="article-blockquote article-blockquote-red"></span>
                        <span class="article-original article-original-red">
                            <a href="${config.siteUrl}/article/${article.id}">转载</a>
                        </span>
                    </#if>
                    <div class="blog-info-meta pull-right">
                        <ul class="list-unstyled list-inline">
                            <li><i class="fa fa-clock-o fa-fw"></i>${article.createTime?string('yyyy-MM-dd HH:mm:ss')}</li>
                            <li><i class="fa fa-eye fa-fw"></i><a class="pointer" data-original-title="${article.lookCount!(0)}人浏览了该文章" data-toggle="tooltip" data-placement="bottom">浏览 (<num>${article.lookCount!(0)}</num>)</a></li>
                            <li><a href="#comment-box" data-original-title="${article.commentCount!(0)}人评论了该文章" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-comments-o fa-fw"></i>评论 (${article.commentCount!(0)})</a></li>
                        </ul>
                    </div>
                </div>
                <div class="blog-info overflow-initial">
                    <h1 class="blog-info-title">
                        <strong>${article.title}</strong>
                    </h1>
                    <div class="blog-info-body ${article.isMarkdown?string('markdown-body editor-preview-active-side', '')}">
                        <#if article.private>
                            ${article.description!}
                            <br>
                            <div class="alert alert-warning alert-dismissible fade in red" role="alert">
                                <i class="fa fa-lock fa-fw"></i> 文章已被加密，需要 <a href="javascript:void(0)" data-toggle="modal" data-target="#lockModal">输入密码</a> 才能查看文章详情
                            </div>
                        <#else >
                            ${article.content}
                        </#if>
                    </div>
                    <div class="separateline"><span>正文到此结束</span></div>
                    <div id="social" style="margin-bottom: 45px;">
                        <div class="social-main">
                            <span class="like">
                                <a href="javascript:;" data-id="${article.id?c}" title="点赞" ><i class="fa fa-thumbs-up"></i>赞 <i class="count"> ${article.loveCount!(0)}</i> </a>
                            </span>
                            <div class="shang-p">
                                <div class="shang-empty"><span></span></div>
                                <span class="shang-s"><a onclick="PaymentUtils.show();" style="cursor:pointer">赏</a> </span>
                            </div>
                            <div class="share-sd">
                                <span class="share-s"><a href="javascript:void(0)" id="share-s" title="分享"><i class="fa fa-share-alt"></i>分享</a></span>
                                <div id="share" style="display: none">
                                    <ul class="bdsharebuttonbox bdshare-button-style1-16" data-bd-bind="1516426362121">
                                        <li><a title="分享到人人网" class="fa fa-renren" data-cmd="renren" onclick="return false;" href="#"></a></li>
                                        <li><a title="分享到腾讯微博" class="fa fa-pinterest-square" data-cmd="tqq" onclick="return false;" href="#"></a></li>
                                        <li><a title="分享到QQ空间" class="fa fa-qq" data-cmd="qzone" onclick="return false;" href="#"></a></li>
                                        <li><a title="分享到新浪微博" class="fa fa-weibo" data-cmd="tsina" onclick="return false;" href="#"></a></li>
                                        <li><a title="分享到微信" class="fa fa-weixin" data-cmd="weixin" onclick="return false;" href="#"></a></li>
                                        <li><a title="更多" class="bds_more fa fa-plus-square" data-cmd="more" onclick="return false;" href="#"></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="article-footer overflow-initial">所属分类：<a href="${config.siteUrl}/type/${article.typeId}" data-original-title="点击查看${article.type.name}分类的文章" data-toggle="tooltip" data-placement="bottom">${article.type.name}</a></div>
                </div>
            </div>
            <div class="blog-body article-tag">
                <div class="cat">
                    <ul class="list-unstyled">
                        <li>
                            <strong>本文标签：</strong>
                                <#if article.tags?? && article.tags?size gt 0>
                                    <#list article.tags as item>
                                        <a href="${config.siteUrl}/tag/${item.id?c}" class="c-label" data-original-title="${item.name}" data-toggle="tooltip" data-placement="bottom" target="_blank">${item.name}</a>
                                    </#list>
                                <#else>
                                    <a href="javascript:;;" class="c-label" data-original-title="暂无相关标签" data-toggle="tooltip" data-placement="bottom" target="_blank">暂无相关标签</a>
                                </#if>
                        </li>
                        <li>
                            <strong>版权声明：</strong>
                            <#if article.original?string('true','false') == 'true'>
                            本站原创文章，于${article.createTime?string('yyyy年MM月dd日')}由<a href="${config.siteUrl}" target="_blank" data-original-title="${config.siteName}" data-toggle="tooltip" data-placement="bottom"><strong>${config.authorName}</strong></a>发布，转载请注明出处
                            <#else>
                            本文为互联网转载文章，出处已在文章中说明(部分除外)。如果侵权，请<a target="_blank" href="mailto:${config.authorEmail}" title="点击给我发邮件" data-toggle="tooltip" data-placement="bottom"><strong>联系本站长</strong></a>删除，谢谢。
                            </#if>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="blog-body prev-next">
                <nav class="nav-single wow" data-wow-delay="0.3s">
                    <#if other.prev>
                        <a href="${config.siteUrl}/article/${other.prev.id?c}" rel="prev">
                            <span class="meta-nav" data-original-title="${other.prev.title}" data-toggle="tooltip" data-placement="bottom"><span class="post-nav"><i class="fa fa-angle-left"></i> 上一篇</span>
                                <br>${other.prev.title}
                            </span>
                        </a>
                    <#else >
                        <a href="javascript:void(0)" rel="nofollow prev">
                            <span class="meta-nav" data-original-title="已经到第一篇了" data-toggle="tooltip" data-placement="bottom"><span class="post-nav"><i class="fa fa-angle-left"></i> 上一篇</span>
                                <br>已经到第一篇了
                            </span>
                        </a>
                    </#if>
                    <#if other.next>
                        <a href="${config.siteUrl}/article/${other.next.id?c}" rel="next">
                            <span class="meta-nav" data-original-title="${other.next.title}" data-toggle="tooltip" data-placement="bottom"><span class="post-nav">下一篇 <i class="fa fa-angle-right"></i></span>
                                <br>${other.next.title}
                            </span>
                        </a>
                    <#else >
                        <a href="${config.siteUrl}/article/1" rel="nofollow next">
                            <span class="meta-nav" data-original-title="已经到最后一篇了" data-toggle="tooltip" data-placement="bottom"><span class="post-nav">下一篇 <i class="fa fa-angle-right"></i></span>
                                <br>已经到最后一篇了
                            </span>
                        </a>
                    </#if>
                    <div class="clear"></div>
                </nav>
            </div>

            <div class="blog-body" style="margin:0;padding:0;border-radius:0;margin-bottom:20px;box-shadow:none;">
<#--                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>-->
                <!-- 内容页底部广告 -->
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-3531608925757879"
                     data-ad-slot="4537878796"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
<#--                <a href="https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=up4l93vp" target="_blank" rel="external nofollow">-->
<#--                    <img src="${config.staticWebSite}/img/ad/aliyun_sale_new_1200x110.jpg" alt="阿里云年末福利" class="img-responsive" style="width: 100%;">-->
<#--                </a>-->
            </div>

            <#-- 热门推荐 -->
            <div class="blog-body clear overflow-initial">
                <h5 class="custom-title"><i class="fa fa-fire fa-fw icon"></i><strong>热门推荐</strong><small></small></h5>
                <ul class="list-unstyled">
                    <@articleTag method="hotList" pageSize="10">
                        <#if hotList?? && (hotList?size > 0)>
                            <#list hotList as item>
                            <li class="line-li">
                                <div class="line-container">
                                    <div class="line-left">
                                        <#if item.coverImage??>
                                            <img class="lazy-img" <#if config.lazyloadPath!>data-original<#else>src</#if>="${item.coverImage}" width="50" height="50" rel="external nofollow"/>
                                        <#else>
                                            <img class="lazy-img" <#if config.lazyloadPath!>data-original<#else>src</#if>="${config.staticWebSite}/img/favicon.ico" width="50" height="50" rel="external nofollow"/>
                                        </#if>
                                    </div>
                                    <div class="line-right">
                                        <div class="text">
                                            <a href="${config.siteUrl}/article/${item.id?c}" data-original-title="${item.lookCount?c}人浏览了该文章" data-toggle="tooltip" data-placement="bottom">
                                                ${item.title}
                                            </a>
                                        </div>
                                        <div class="text">
                                            <#--<div style="display: inline-block">热门指数：</div>-->
                                            <#--<div class="rating ignore" data-star="5"></div>-->
                                            <span class="views" title="" data-toggle="tooltip" data-placement="bottom" data-original-title="文章阅读次数"><i class="fa fa-eye fa-fw"></i>浏览(${item.lookCount!(0)})</span>
                                            <span class="comment" title="" data-toggle="tooltip" data-placement="bottom" data-original-title="文章评论次数">
                                                <a href="${config.siteUrl}/article/${item.id?c}#comment-box" rel="external nofollow">
                                                    <i class="fa fa-comments-o fa-fw"></i>评论(${item.commentCount!(0)})
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            </#list>
                        </#if>
                    </@articleTag>
                </ul>
                <div class="clear"></div>
            </div>
            <#-- 相关文章 -->
            <div class="blog-body clear overflow-initial">
                <h5 class="custom-title"><i class="fa fa-google-wallet fa-fw icon"></i><strong>相关文章</strong><small></small></h5>
                <ul class="list-unstyled">
                    <#list relatedList as item>
                        <li class="line-li">
                            <div class="line-container">
                                <div class="line-right">
                                    <div class="text">
                                        <a href="${config.siteUrl}/article/${item.id?c}" data-original-title="${item.lookCount?c}人浏览了该文章" data-toggle="tooltip" data-placement="bottom">
                                            <i class="fa fa-book fa-fw"></i>${item.title}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </#list>
                </ul>
                <div class="clear"></div>
            </div>
            <#--评论-->
            <#if article.comment>
                <div class="blog-body clear overflow-initial expansion">
                    <div id="comment-box" data-id="${article.id?c}"></div>
                </div>
            <#else>
                <div class="blog-body clear overflow-initial expansion gray">
                    <i class="fa fa-close fa-fw"></i>该篇文章的评论功能已被站长关闭
                </div>
            </#if>
        </div>
        <#include "layout/sidebar.ftl"/>
    </div>
</div>
<div id="lockModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" data-keyboard="false">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">输入密码查看文章详情</h4>
            </div>
            <div class="modal-body">
                <input type="text" name="password" id="password" class="form-control" placeholder="请输入文章密码">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="verifyPassword">确定</button>
            </div>
        </div>
    </div>
</div>
<@footer>
    <script type="text/javascript">
        setTimeout(function () {
            /*
            百度分享
            建议改成自己的百度分享js，否则你是没法查看分享的统计结果的。
            */
            var bdText = $("#meta_description").attr("content")+" - by ${config.domain}";
            // 如果文章没有封面图，则取默认的图片
            var coverImg = $("#cover-img").attr("src") || "${config.staticWebSite}/img/default_article_cover.jpg";
            window._bd_share_config={"common":{"bdSnsKey":{},"bdText":bdText,"bdMini":"2","bdMiniList":["mshare","qzone","tsina","bdysc","weixin","renren","tqq","kaixin001","tqf","tieba","douban","bdhome","sqq","youdao","sdo","qingbiji","mail","isohu","ty","fbook","twi","linkedin","h163","evernotecn","copy","print"],"bdPic":coverImg,"bdStyle":"1","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
        },1000);
    </script>
    <script src="https://v1.hitokoto.cn/?encode=js&c=d&select=%23hitokoto" defer></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/highlight.js@9.12.0/lib/highlight.min.js"></script>
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/simplemde@1.11.2/dist/simplemde.min.js"></script>
    <script>
        var isPrivate = ${article.private};
        if(isPrivate || isPrivate == 'true') {
            $("#lockModal").modal('show')
        }

        $("#verifyPassword").click(function (){
            var password = $("#password").val();
            var articleId = "${article.id}";
            $.post("/api/RenderController/verifyArticlePassword", {articleId : articleId, password: password}, function (json) {
                $.alert.ajaxSuccess(json);
                if(json.status === 200) {
                    $(".blog-info-body").html(json.data);
                    $("#lockModal").modal('hide')
                }
            })
        })
    </script>
</@footer>
