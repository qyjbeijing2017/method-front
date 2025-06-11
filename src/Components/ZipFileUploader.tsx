import { Upload } from "antd";

export function ZipFileUploader({ 
    id,
    value,
    onChange,
}: {
    id?: string;
    value?: Blob;
    onChange?: (value: Blob) => void;
}) { 
    return <Upload.Dragger
        id={id}
    >

    </Upload.Dragger>;
}