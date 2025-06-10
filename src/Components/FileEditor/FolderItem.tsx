import { FolderOutlined } from "@ant-design/icons";
import type { FileEditorMode, IFileShow } from "./file.inter";
import { Space, theme } from "antd";
import { useState } from "react";


export function FolderItem({
    file,
    mode,
    loading,
    disabled,
}: {
    file: IFileShow,
    mode: FileEditorMode
    loading?: boolean;
    disabled?: boolean;
}) {
    const { token } = theme.useToken();
    const [hovered, setHovered] = useState(false);
    const [status, setStatus] = useState<'hover' | 'active' | 'default' | 'disabled' | 'loading'>(
        disabled ? 'disabled' : loading ? 'loading' : 'default'
    );
    return <Space
        direction={mode === 'List' ? 'horizontal' : 'vertical'}
        align="center"
        style={{
            backgroundColor: status === 'active' ? token.colorLinkActive : status === 'hover' ? token.colorLinkHover : 'transparent',
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
        <FolderOutlined />
        {file.name}
    </Space>;
}