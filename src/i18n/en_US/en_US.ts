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
        sign_up_now: 'Have an account? Register',
        sign_in_now: 'Have an account? Sign Up',
        sign_up_success: 'Registration successful! Welcome, {{username}}!',
        confirm_password: "Confirm Password",
    },
    error_report: {
        error_400: 'Bad Request',
        error_401: 'Unauthorized',
        error_403: 'Forbidden',
        error_404: 'Not Found',
        error_500: 'Internal Server Error',
        unknown_error: 'Unknown Error',
        password_error: 'Incorrect username or password',
        user_not_found: 'User not found',
        username_reserved: 'Username Reserved',
        username_already_exists: 'Username already exists',
        method_already_exists: 'Method already exists',
        error_occurred: "An error occurred: {{error}}",
    },
    navigation: {
        // Add navigation specific translations here
        home: "Home",
        tasks: "Tasks",
        methods: "Methods",
        settings: "Settings",
    },
    methods: {
        title: "Methods",
        new: "New Method",
        name: "Method Name",
        icon: "Icon",
        icon_edit: "Edit Icon",
        icon_ok: "OK",
        icon_cancel: "Cancel",
        description: "Description",
        files: "Files",
        upload: "Upload",
        submit: "Submit",
        name_required: "Method name cannot be empty",
    },
    tasks: {
        title: "Tasks",
    },
    settings: {
        title: "Settings",
    }
}