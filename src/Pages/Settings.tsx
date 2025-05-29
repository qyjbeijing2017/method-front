import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { EnsureSignIn } from "../SignIn/EnsureSignIn";

export function Settings() {
    const { t } = useTranslation('settings');
    return <EnsureSignIn>
        <Typography.Title style={{ margin: 0 }}>{t('title')}</Typography.Title>
    </EnsureSignIn>
}