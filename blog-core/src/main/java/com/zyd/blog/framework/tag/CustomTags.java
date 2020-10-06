package com.zyd.blog.framework.tag;

import com.zyd.blog.business.entity.Comment;
import com.zyd.blog.business.entity.User;
import com.zyd.blog.business.enums.UserTypeEnum;
import com.zyd.blog.business.service.*;
import com.zyd.blog.framework.property.JustAuthProperties;
import com.zyd.blog.util.SessionUtil;
import lombok.extern.slf4j.Slf4j;
import me.zhyd.oauth.config.AuthConfig;
import me.zhyd.oauth.utils.AuthConfigChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.NumberUtils;
import org.springframework.util.StringUtils;

import java.lang.reflect.Field;
import java.text.DecimalFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * 自定义的freemarker标签
 *
 * @author yadong.zhang (yadong.zhang0415(a)gmail.com)
 * @version 1.0
 * @website https://www.zhyd.me
 * @date 2018/4/16 16:26
 * @modify by zhyd 2018-09-20
 * 调整实现，所有自定义标签只需继承BaseTag后通过构造函数将自定义标签类的className传递给父类即可。
 * 增加标签时，只需要添加相关的方法即可，默认自定义标签的method就是自定义方法的函数名。
 * 例如：<@zhydTag method="types" ...></@zhydTag>就对应 {{@link #types(Map)}}方法
 * @since 1.0
 */
@Slf4j
@Component
public class CustomTags extends BaseTag {

    private final Random randoms = new Random();
    private final DecimalFormat df = new DecimalFormat("#.##");

    @Autowired
    private BizTypeService bizTypeService;
    @Autowired
    private BizCommentService commentService;
    @Autowired
    private BizTagsService bizTagsService;
    @Autowired
    private SysResourcesService resourcesService;
    @Autowired
    private SysConfigService configService;
    @Autowired
    private SysTemplateService templateService;
    @Autowired
    private JustAuthProperties authProperties;

    public CustomTags() {
        super(CustomTags.class.getName());
    }

    public Object types(Map params) {
        return bizTypeService.listTypeForMenu();
    }

    public Object tagsList(Map params) {
        return bizTagsService.listAll();
    }

    public Object availableMenus(Map params) {
        return resourcesService.listAllAvailableMenu();
    }

    public Object recentComments(Map params) {
        int pageSize = this.getPageSize(params);
        return commentService.listRecentComment(pageSize);
    }

    public Object siteInfo(Map params) {
        return configService.getSiteInfo();
    }

    public Object menus(Map params) {
        User user = SessionUtil.getUser();
        String userIdStr = getParam(params, "userId");
        Integer userId = null;
        if (!StringUtils.isEmpty(userIdStr) && user != null && !user.getUserTypeEnum().equals(UserTypeEnum.ROOT)) {
            userId = Integer.parseInt(userIdStr);
        }
        Map<String, Object> p = new HashMap<>(2);
        p.put("type", "menu");
        p.put("userId", userId);
        return resourcesService.listUserResources(p);
    }

    public Object random(Map params) {
        int max = NumberUtils.parseNumber(getParam(params, "max"), Integer.class);
        int min = NumberUtils.parseNumber(getParam(params, "min"), Integer.class);
        return df.format(randoms.nextInt(max) % (max - min + 1) + min + Math.random());
    }

    public Object template(Map params) {
        String tempKey = getParam(params, "key");
        return templateService.getTemplate(tempKey);
    }

    public Object sessionTimeOutUnit(Map params) {
        return TimeUnit.values();
    }

    public Object getNewCommentInfo(Map params) {
        String pageSizeStr = getParam(params, "pageSize");
        int pageSize = 50;
        if (!StringUtils.isEmpty(pageSizeStr)) {
            pageSize = Integer.parseInt(pageSizeStr);
        }
        List<Comment> comments = commentService.listVerifying(pageSize);
        Map<String, Object> res = new HashMap<>();
        res.put("total", CollectionUtils.isEmpty(comments) ? 0 : comments.size());
        res.put("comments", comments);
        return res;
    }

    /**
     * 获取所有可用的Oauth平台
     *
     * @param params
     * @return
     */
    public Object listAvailableOAuthPlatforms(Map params) {
        List<String> list = new ArrayList<>();
        try {
            for (Field f : authProperties.getClass().getDeclaredFields()) {
                f.setAccessible(true);
                String fieldName = f.getName();
                AuthConfig authConfig = (AuthConfig) f.get(authProperties);
                if (null != authConfig) {
                    if (AuthConfigChecker.isSupportedAuth(authConfig)) {
                        if ("alipay".equals(fieldName)) {
                            if (!StringUtils.isEmpty(authConfig.getAlipayPublicKey())) {
                                list.add(fieldName);
                            }
                        } else {
                            list.add(fieldName);
                        }
                    }
                }

            }
        } catch (Exception e) {
            log.error("获取所有可用的Oauth平台发生异常", e);
        }

        return list;
    }


}
