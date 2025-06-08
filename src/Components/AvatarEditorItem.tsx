import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useEffect, useRef, useState } from "react";
import type AvatarEditor from "react-avatar-editor";

export function AvatarEditorItem({
    id,
    value,
    onChange,
    title,
    okText,
    cancelText,
}: {
    id?: string;
    value?: Blob;
    onChange?: (value: Blob) => void;
    title?: string;
    okText?: string;
    cancelText?: string;
}) {
    const [imageUrl, setImageUrl] = useState<string | null>(value ? URL.createObjectURL(value) : null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const editorRef = useRef<AvatarEditor>(null);

    useEffect(() => {
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl); // Clean up the object URL
            }
        }
    }, [imageUrl]);

    return <>
        < Upload
            id={id}
            accept="image/*"
            showUploadList={false}
            beforeUpload={async (file) => {

                return false; // Prevent automatic upload
            }}
        >
            {imageUrl ? (
                <img src={imageUrl} alt="icon" style={{ width: '100%' }} />
            ) : (
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                </div>
            )}
        </Upload >
        <Modal
            title={title}
            open={previewVisible}
            okText={okText}
            cancelText={cancelText}
            onCancel={() => setPreviewVisible(false)}
        >

        </Modal>
    </>
}