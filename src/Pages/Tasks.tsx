import { Typography } from "antd";
import { useTranslation } from "react-i18next";

export function Tasks() {
    const { t } = useTranslation('tasks');
    return <>
        <Typography.Title style={{ margin: 0 }}>{t('title')}</Typography.Title>
    </>
}