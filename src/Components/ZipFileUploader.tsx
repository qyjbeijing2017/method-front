import { FileZipOutlined, InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { RcFile } from "antd/es/upload";
import { useTranslation } from "react-i18next";

export function ZipFileUploader({
    id,
    value,
    onChange,
    loading,
    disabled,
}: {
    id?: string;
    value?: File;
    onChange?: (value: File) => void;
    loading?: boolean;
    disabled?: boolean;
}) {
    const { t } = useTranslation('zip_file_uploader');
    return <Upload.Dragger
        id={id}
        accept=".zip"
        showUploadList={false}
        beforeUpload={async (file: RcFile) => {
            onChange?.(file);
            return false;
        }}
    >
        <p className="ant-upload-drag-icon">
            {loading ? <LoadingOutlined /> : value ? <FileZipOutlined /> : <InboxOutlined />}
        </p>
        <p className="ant-upload-text">{value ? value.name : t('upload_text')}</p>
        <p className="ant-upload-hint">
            {t('upload_hint')}
        </p>
    </Upload.Dragger>;
}