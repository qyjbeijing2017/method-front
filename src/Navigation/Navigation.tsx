import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useTranslation } from "react-i18next";
import { CalculatorOutlined, CodeOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';
import { NavLink, useLocation } from "react-router";

type MenuItem = Required<MenuProps>['items'][number];


export function Navigation({ collapsed }: { collapsed?: boolean }) {
    const { t } = useTranslation('navigation');
    const location = useLocation();
    const currentPath = location.pathname.split('/')[1] || 'home'; // Get the first segment of the path

    const items: MenuItem[] = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <NavLink  to={'/'}>{t('home')}</NavLink>,
        },
        {
            type: 'divider',
        },
        {
            key: 'tasks',
            icon: <CodeOutlined />,
            label: <NavLink to={'/tasks'}>{t('tasks')}</NavLink>,
        },
        {
            key: 'methods',
            icon: <CalculatorOutlined/>,
            label: <NavLink to={'/methods'}>{t('methods')}</NavLink>,
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: <NavLink to={'/settings'}>{t('settings')}</NavLink>,
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