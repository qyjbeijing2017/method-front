import { FileZipOutlined, InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { RcFile } from "antd/es/upload";
import { useTranslation } from "react-i18next";

export function ZipFileUploader({
    id,
    value,
    onChange,
    loading,
}: {
    id?: string;
    value?: Blob;
    onChange?: (value: Blob) => void;
    loading?: boolean;
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
        disabled={loading}
    >
        <p className="ant-upload-drag-icon">
            {loading? <LoadingOutlined/>: value ? <FileZipOutlined /> : <InboxOutlined />}
        </p>
        <p className="ant-upload-text">{t('upload_text')}</p>
        <p className="ant-upload-hint">
            {t('upload_hint')}
        </p>
    </Upload.Dragger>;
}