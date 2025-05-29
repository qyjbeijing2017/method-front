import { Typography } from "antd";
import { useTranslation } from "react-i18next";

export function Settings() {
    const { t } = useTranslation('settings');
    return <>
        <Typography.Title style={{ margin: 0 }}>{t('title')}</Typography.Title>
    </>
}