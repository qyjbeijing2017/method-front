import type { ResourceLanguage } from "i18next";

export const zh_CN: ResourceLanguage = {
    translation: {
        welcome: "欢迎使用Method",
        search: "搜索",
    },
    sign_in: {
        logout: "登出",
        sign_in: "登录",
        sign_up: "注册",
        username: "用户名",
        password: "密码",
        input_username: "请输入用户名！",
        input_password: "请输入密码！",
        sign_in_success: '欢迎回来，{{username}}！',
        sign_out_success: '您已成功登出。',
        show_userId: '@{{name}}',
        sign_up_now: '还没有账号？立即注册',
        sign_in_now: '已有账号？立即登录',
        sign_up_success: '注册成功！欢迎，{{username}}！',
        confirm_password: "确认密码",
    },
    error_report: {
        error_400: '错误请求',
        error_401: '未授权',
        error_403: '禁止访问',
        error_404: '未找到',
        error_500: '服务器内部错误',
        unknown_error: '未知错误',
        password_error: '用户名或密码错误',
        user_not_found: '未找到用户',
        username_reserved: '无法使用的用户名',
        username_already_exists: '用户名已存在',
        method_already_exists: '算法已存在',
        error_occurred: "发生错误：{{error}}",
    },
    navigation: {
        home: "首页",
        tasks: "任务",
        methods: "算法",
        settings: "设置",
    },
    methods: {
        title: "算法",
        new: "新建算法",
        name: "算法名称",
        icon: "图标",
        icon_edit: "编辑图标",
        icon_ok: "确定",
        icon_cancel: "取消",
        description: "描述",
        files: "文件",
        upload: "上传",
        submit: "提交",
        name_required: "算法名称不能为空",
    },
    tasks: {
        title: "任务",
    },
    settings: {
        title: "设置",
    }
}