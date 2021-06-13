package com.zyd.blog.business.consts;

/**
 * 程序中公用的常量类
 *
 * @author yadong.zhang (yadong.zhang0415(a)gmail.com)
 * @version 1.0
 * @website https://www.zhyd.me
 * @date 2018/4/16 16:26
 * @since 1.0
 */
public class CommonConst {
    /**
     * 安全密码(UUID生成)，作为盐值用于用户密码的加密
     */
    public static final String ZYD_SECURITY_KEY = "929123f8f17944e8b0a531045453e1f1";

    /**
     * 程序默认的错误状态码
     */
    public static final int DEFAULT_ERROR_CODE = 500;

    /**
     * 程序默认的成功状态码
     */
    public static final int DEFAULT_SUCCESS_CODE = 200;

    /**
     * 默认的数据呈现的比例
     */
    public static final int DEFAULT_VIEWDATA_RATIO = 9;

    /**
     * 上传的图片的后缀
     */
    public static final String UPLOAD_IMAGE_SUFFIX="-94rg001";

    /**
     * 文章内部的图片的后缀
     */
    public static final String CONTENT_IMAGE_SUFFIX="-94rg002";

    /**
     * 前端页面的缓存的前缀
     */
    public static final String WEB_CACHE_SUFFIX="page-cache";

    /**
     * 前端页面的缓存的默认时间
     */
    public static final long WEB_DEFAULT_EXPIRE=12;

}
