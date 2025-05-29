import { Input } from "antd";
import { useTranslation } from "react-i18next";

export function MethodSearch() {
    const {t} = useTranslation();
    return <Input.Search
        placeholder={t('search')}
        style={{ width: 250 }}
    />
}