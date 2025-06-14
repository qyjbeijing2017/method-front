import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { EnsureSignIn } from "../SignIn/EnsureSignIn";
import { Outlet } from "react-router";

export function Methods() {
    const { t } = useTranslation('methods');
    return <EnsureSignIn>
        <Typography.Title style={{ margin: 0 }}>{t('title')}</Typography.Title>
        <Outlet />
    </EnsureSignIn>
}