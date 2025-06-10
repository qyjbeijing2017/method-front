import { FolderOutlined } from "@ant-design/icons";
import type { FileEditorMode, IFileShow } from "./file.inter";
import { List, Space, theme } from "antd";
import { useState } from "react";


export function FolderItem({
    file,
    mode,
    loading,
    disabled,
    size ,
}: {
    file: IFileShow,
    mode: FileEditorMode
    loading?: boolean;
    disabled?: boolean;
    size?: 'small' | 'default' | 'large';
}) {
    const { token } = theme.useToken();
    const [hovered, setHovered] = useState(false);
    const [status, setStatus] = useState<'hover' | 'active' | 'default' | 'disabled' | 'loading'>(
        disabled ? 'disabled' : loading ? 'loading' : 'default'
    );
    return <List.Item
        style={{
            backgroundColor: status === 'active' ? token.colorLinkActive : status === 'hover' ? token.colorLinkHover : 'transparent',
            borderRadius: 10,
            padding: 5,
        }}
        onMouseEnter={() => {
            if (status === 'default') {
                setStatus('hover');
            }
        }}
        onMouseLeave={() => {
            if (status === 'hover') {
                setStatus('default');
            }
        }}
    >
        <Space
            direction={mode === 'List' ? 'horizontal' : 'vertical'}
            align="center"
        >
            <FolderOutlined />
            {file.name}
        </Space>
    </List.Item>;
}