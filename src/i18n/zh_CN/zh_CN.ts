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
    },
    error_report: {
        error_400: '错误请求',
        error_401: '未授权',
        error_403: '禁止访问',
        error_404: '未找到',
        error_500: '服务器内部错误',
        unknown_error: '未知错误',
        password_error: '用户名或密码错误',
        error_occurred: "发生错误：{{error}}",
    },
    navigation: {
        home: "首页",
        tasks: "任务",
        methods: "方法",
        settings: "设置",
    }
}