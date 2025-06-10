import { TranslationOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useLocation, useNavigate, useParams } from "react-router";

export function Language() {
    const { language } = useParams<{ language?: string }>();
    const location = useLocation();
    const nav = useNavigate();
    return <Dropdown menu={{
        selectedKeys: [language || 'en_US'],
        items: [{
            key: 'en_US',
            label: 'English',
            onClick: () => {
                nav(`/${'en_US'}${location.pathname.replace(`/${language || 'en_US'}`, '')}`);
            },
        },
        {
            key: 'zh_CN',
            label: '中文',
            onClick: () => {
                nav(`/${'zh_CN'}${location.pathname.replace(`/${language || 'en_US'}`, '')}`);
            },
        },]
    }} placement={'bottom'}>
        <Button type="text" icon={<TranslationOutlined />} size={'large'} shape={'circle'} />
    </Dropdown>;
}