import { PlusOutlined } from "@ant-design/icons";
import { Modal, Slider, Upload } from "antd";
import type { RcFile } from "antd/es/upload";
import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

export function AvatarEditorItem({
    id,
    value,
    onChange,
    title,
    okText,
    cancelText,
    uploadText,
}: {
    id?: string;
    value?: Blob;
    onChange?: (value: Blob) => void;
    title?: string;
    okText?: string;
    cancelText?: string;
    uploadText?: string;
}) {
    const imageUrl = value ? URL.createObjectURL(value) : null;
    const [imageFile, setImageFile] = useState<RcFile | null>(null);
    const editorRef = useRef<AvatarEditor>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl); // Clean up the object URL
            }
        }
    }, [imageUrl]);

    return <span id={id}>
        <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={async (file: RcFile) => {
                setImageFile(file);
                return false; // Prevent automatic upload
            }}
        >
            {imageUrl ? (
                <img src={imageUrl} alt="icon" style={{ width: '100%' }} />
            ) : (
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>{uploadText}</div>
                </div>
            )}
        </Upload >
        <Modal
            title={title}
            open={imageFile !== null}
            okText={okText}
            cancelText={cancelText}
            onCancel={() => setImageFile(null)}
            maskClosable={false}
            centered
            onOk={() => {
                if (editorRef.current) {
                    const canvas = editorRef.current.getImageScaledToCanvas();
                    canvas.toBlob((blob) => {
                        if (blob && onChange) {
                            onChange(blob);
                            setImageFile(null); // Close the modal after saving
                        }
                    }, 'image/png');
                }
            }}
        >

            <AvatarEditor
                style={{ width: '100%', height: 400 }}
                ref={editorRef}
                image={imageFile || ''}
                border={10}
                rotate={0}
                scale={scale}
            />
            <Slider value={scale} onChange={setScale} max={3} min={1} step={0.1} />
        </Modal >
    </span>
}