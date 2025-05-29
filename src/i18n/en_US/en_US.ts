import type { ResourceLanguage } from "i18next";

export const en_US: ResourceLanguage = {
    translation: {
        welcome: "Welcome to Method",
        search: "Search",
    },
    sign_in: {
        logout: "Logout",
        sign_in: "Sign In",
        sign_up: "Sign Up",
        username: "Username",
        password: "Password",
        input_username: "Please input your username!",
        input_password: "Please input your password!",
        sign_in_success: 'Welcome back, {{username}}!',
        sign_out_success: 'You have successfully signed out.',
        show_userId: '@{{name}}',
    },
    error_report: {
        error_400: 'Bad Request',
        error_401: 'Unauthorized',
        error_403: 'Forbidden',
        error_404: 'Not Found',
        error_500: 'Internal Server Error',
        unknown_error: 'Unknown Error',
        password_error: 'Incorrect username or password',
    },
    navigation: {
        // Add navigation specific translations here
        home: "Home",
        tasks: "Tasks",
        methods: "Methods",
        settings: "Settings",
    }
}