import { TranslationOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { changeLanguage } from 'i18next';
import { useTranslation } from "react-i18next";

export function Language() {
    const { i18n } = useTranslation();
    return <Dropdown menu={{
        selectedKeys: [i18n.language],
        items: [{
            key: 'en_US',
            label: 'English',
            onClick: () => changeLanguage('en_US'),
        },
        {
            key: 'zh_CN',
            label: '中文',
            onClick: () => changeLanguage('zh_CN'),
        },]
    }} placement={'bottom'}>
        <Button type="text" icon={<TranslationOutlined />} size={'large'} shape={'circle'} />
    </Dropdown>;
}