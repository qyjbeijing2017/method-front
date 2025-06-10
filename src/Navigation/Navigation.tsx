import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useTranslation } from "react-i18next";
import { CalculatorOutlined, CodeOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';
import { NavLink, useLocation, useParams } from "react-router";

type MenuItem = Required<MenuProps>['items'][number];


export function Navigation({ collapsed }: { collapsed?: boolean }) {
    const { t } = useTranslation('navigation');
    const location = useLocation();
    const currentPath = location.pathname.split('/')[1] || 'home'; // Get the first segment of the path 
    const param = useParams<{ language?: string }>();
    const language = param.language || 'en_US'; // Default to 'en_US' if no language is provided

    const items: MenuItem[] = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <NavLink  to={`/${language}`}>{t('home')}</NavLink>,
        },
        {
            type: 'divider',
            key: 'divider_my',
        },
        {
            key: 'tasks',
            icon: <CodeOutlined />,
            label: <NavLink to={`/${language}/tasks`}>{t('tasks')}</NavLink>,
        },
        {
            key: 'methods',
            icon: <CalculatorOutlined/>,
            label: <NavLink to={`/${language}/methods`}>{t('methods')}</NavLink>,
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: <NavLink to={`/${language}/settings`}>{t('settings')}</NavLink>,
        }
    ];

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={50}
            style={{height: 'calc(100vh - 64px)', left: 0, zIndex: 1}}
        >
            <Menu
                style={{ height: '100%', borderRight: 0 }}
                mode="inline"
                selectedKeys={[currentPath]} // Highlight the current path
                items={items} 
            />
        </Sider>
    );
}