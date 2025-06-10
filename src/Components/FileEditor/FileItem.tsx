import { FileOutlined } from "@ant-design/icons";
import type { FileEditorMode, IFileShow } from "./file.inter";
import { List, Space } from "antd";


export function FileItem({ file, mode }: { file: IFileShow, mode: FileEditorMode }) {
    return <List.Item>
        <Space direction={mode === 'List' ? 'horizontal' : 'vertical'} align="center">
            <FileOutlined />
            {file.name}
        </Space>
    </List.Item>
}