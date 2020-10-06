<#include "include/macros.ftl">
<@compress single_line=false>
<@header title="关于 | ${config.siteName}" description="关于${config.siteName}" canonical="/about"></@header>

<div class="container custome-container">
    <nav class="breadcrumb">
        <a class="crumbs" title="返回首页" href="${config.siteUrl}" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-home"></i>首页</a>
        <i class="fa fa-angle-right"></i>关于
    </nav>
    <div class="row about-body">
        <@blogHeader title="关于本站"></@blogHeader>
        <div class="col-sm-12 blog-main">
            <div class="blog-body expansion">
                <h5 class="custom-title"><i class="fa fa-user-secret fa-fw"></i><strong>博主简介</strong><small></small></h5>
                <div class="info">
                    <p>
                        码农一枚。从事互联网开发行业10年有余。<br>
                        对软件开发有浓厚的兴趣，坚信互联网行业将是推动世界发展的第一动力。能够身处其中，我倍感荣幸。
                    </p>
                </div>
                <h5 class="custom-title"><i class="fa fa-coffee fa-fw"></i><strong>关于博客</strong><small></small></h5>
                <div class="info">
                    本站为非商业化站点，无盈利性质，为博主个人博客。<br>
                    主要记录了博主工作和生活中遇到的各种问题以及解决方案。以备温故而知新。同时给遇到同样问题的同学一点参考。<br>
                </div>
                <h5 class="custom-title"><i class="fa fa-google fa-fw"></i><strong>关于域名</strong><small></small></h5>
                <div class="info">


                    <p style="line-height: 160%; box-sizing: content-box; margin: 10px 0;">经过精挑细选最终敲定了目前的这个域名 <b style="color:#20a0ff;">94rg.com</b></p>
                    <p>简单，这个是4位的，在目前的行情下还算不错</p>
                    <p>有一定的含义。94rg,谐音 就是人工</p>
                    <p>国际顶级域名，走主流路线</p>
                    <br/>
                    <p style="line-height: 160%; box-sizing: content-box; margin: 10px 0;">其实我对这个域名的含义比较看重，就是人工。什么意思呢。有兴趣的听我唠嗑下。人生而平等，每个人其实只要不是天生残疾，脑子和身体同其他人相比不会相差很大。导致最终成就高低的往往是那些内在的品质（人工）。</p>
                    <p>人们眼中的天才之所以卓越非凡，并非天资超人一等，而是付出了持续不断的努力。1万小时的锤炼是任何人从平凡变成世界级大师的必要条件</p>
                    <p>天才是1%的灵感加99%的汗水</p>
                    <p>不积跬步,无以至千里;不积小流,无以成江海</p>
                    <p>愚公移山的执著精神</p>
                    <br/>
                    <p>下面的几个图我比较喜欢，能够很好的阐释<b style="color:#20a0ff;">人工</b>的寄寓</p>
                    <p><img src="http://oss.94rg.com/oneblog/20200314112104726.jpg-94rg002" style="line-height: 160%; margin: 4px 0 10px; box-sizing: border-box; vertical-align: top; max-width: 100%;" /><br />  <img src="http://oss.94rg.com/oneblog/20200314112023114.jpg-94rg002" style="line-height: 160%; margin: 4px 0 10px; box-sizing: border-box; vertical-align: top; max-width: 100%;" /><img src="http://oss.94rg.com/oneblog/20200314112113750.jpeg-94rg002" style="line-height: 160%; margin: 4px 0 10px; box-sizing: border-box; vertical-align: top; max-width: 100%;" /><br /></p>
                    <p style="line-height: 160%; box-sizing: content-box; margin: 10px 0; color: #20a0ff;font-size:16px;text-indent:2em;;">成功没有捷径，让我们一起秉着<strong style="line-height: 160%; box-sizing: content-box; font-weight: 700;color:#61be33;">人工</strong>精神，踏踏实实地走好未来的每一步，做最好的自己。不要让明天的你痛恨今天的自己</p>
                </div>
                <h5 class="custom-title"><i class="fa fa-copyright fa-fw"></i><strong>关于版权</strong><small></small></h5>
                <div class="info">
                    本站所有标注为原创的文章，转载请标明出处。<br>
                    本站所有转载的文章，一般都会在文章中注明原文出处。<br>
                    所有转载的文章皆来源于互联网，若因此对原作者造成侵权，烦请原作者<a target="_blank" href="mailto:${config.authorEmail}" title="点击给我发邮件" data-toggle="tooltip" data-placement="bottom" rel="external nofollow"><strong>告知</strong></a>，我会立刻删除相关内容。
                </div>
                <@praise></@praise>
            </div>
        </div>
        <#--<div class="col-sm-12 blog-main">
            <div class="blog-body expansion">
                <div id="comment-box" data-id="-3"></div>
            </div>
        </div>-->
    </div>
</div>

<@footer>
    <script src="https://v1.hitokoto.cn/?encode=js&c=d&select=%23hitokoto" defer></script>
</@footer>
</@compress>