import { FileOutlined } from "@ant-design/icons";
import type { FileEditorMode, IFileShow } from "./file.inter";
import { Space } from "antd";


export function FileItem({ file, mode }: { file: IFileShow, mode: FileEditorMode }) {
    return <Space direction={mode === 'List' ? 'horizontal' : 'vertical'} align="center">
        <FileOutlined />
        {file.name}
    </Space>;
}