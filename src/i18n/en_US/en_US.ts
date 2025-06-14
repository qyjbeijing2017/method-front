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
        upload: "Upload Icon",
        submit: "Submit",
        name_required: "Method name cannot be empty",
        name_placeholder: "Please enter method name",
        description_placeholder: "Entering a description can help others understand the functionality and application scenarios of your method.",
        files_required: "Files cannot be empty",
        executable_required: "Executable file cannot be empty for normal Ubuntu Container",
        executable: "Executable File",
        version: "Version",
        version_required: "Version cannot be empty",
        version_placeholder: "Please enter version",
    },
    file_editor: {
        root: "Root",
        list_mode: "List Mode",
        grid_mode: "Grid Mode",
        add_folder: "Add Folder",
        upload: "Upload",
    },
    zip_file_uploader: {
        upload_text: "Start From A Zip File",
        upload_hint: "You can upload a zip file containing your whole progress, including a executable file for normal Ubuntu Container, or a Dockerfile for Custom Container.",
    },
    tasks: {
        title: "Tasks",
    },
    settings: {
        title: "Settings",
    }
}