import { Typography } from "antd";
import { useTranslation } from "react-i18next";

export function Methods() {
    const { t } = useTranslation('methods');
    return <>
        <Typography.Title style={{ margin: 0 }}>{t('title')}</Typography.Title>
    </>
}