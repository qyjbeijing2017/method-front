import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Dropdown, message, Row, Typography } from "antd";
import { useAccount } from "../store/account";
import type { MenuProps } from 'antd';
import { useTranslation } from "react-i18next";
import { useSignIn } from "../store/sign-in";
import { useMemo } from "react";

export default function MethodAvatar() {
    const { username } = useAccount();
    const { open } = useSignIn();
    const { t } = useTranslation('sign_in');

    const items: MenuProps['items'] = useMemo(() => (username ? [
        {
            key: 'name',
            label: <Row gutter={8}>
                <Col>
                    <Avatar
                        style={{ cursor: 'pointer', marginTop: 5 }}
                        src={import.meta.env.VITE_ENTRY_POINT + `/files/icon/${username}`}
                        size={44}
                        alt={username}
                    >
                        {username[0].toUpperCase()}
                    </Avatar>
                </Col>
                <Col>
                    <Typography.Title level={4} style={{ margin: 0 }}>{username}</Typography.Title>
                    <Typography.Paragraph>{t('show_userId', { name: username })}</Typography.Paragraph>
                </Col>
            </Row>
        },
        {
            key: 'logout',
            label: <a onClick={() => {
                useAccount.getState().signOut();
                message.success(t('sign_out_success'));
            }}>{t('logout')}</a>,
            icon: <LoginOutlined />,
        }
    ] : []), [t, username])

    return <>
        <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
            <Avatar
                style={{ cursor: 'pointer' }}
                src={import.meta.env.VITE_ENTRY_POINT + `/files/icon/${username}`}
                size={32}
                alt={username}
                onClick={() => {
                    if (!username) {
                        open();
                    }
                }}
            >
                {username ? username[0].toUpperCase() : <UserOutlined />}
            </Avatar>
        </Dropdown>
    </>
}