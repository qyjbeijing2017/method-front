import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, List, Row, Segmented, theme } from "antd";
import { useMemo, useState } from "react";
import { lookup } from 'mime-types';

export interface IFile {
    name: string;
    data: Blob;
    lastModified: Date;
}

export interface IFileShow {
    name: string;
    type: string;
    size: number;
    lastModified: number;
}

export function FilesEditor({
    id,
    value = [],
    onChange,
    disabled,
    size = 'default',
}: {
    id?: string;
    value?: IFile[];
    onChange?: (value: IFile[]) => void;
    disabled?: boolean;
    size?: 'small' | 'default' | 'large';
}) {
    const { token } = theme.useToken();
    const [breadCrumbItems, setBreadCrumbItems] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'List' | 'Kanban'>('List');

    const files = useMemo(() => {
        const path = breadCrumbItems.join('/');
        const files: IFileShow[] = [];
        for (const file of value) {
            if(file.name.startsWith(path)) {
                const relativePath = file.name.slice(path.length + 1);
                const isDirectory = relativePath.includes('/');
                if (isDirectory) {
                    const dirName = relativePath.split('/')[0];
                    let dir = files.find(f => f.name === dirName);
                    if(!dir) {
                        dir = {
                            name: dirName,
                            type: 'directory',
                            size: 0,
                            lastModified: file.lastModified.getTime(),
                        };
                        files.push(dir);
                    }
                    dir.size += file.data.size;
                } else {
                    const fileType = lookup(file.name) || 'application/octet-stream';
                    files.push({
                        name: relativePath,
                        type: fileType,
                        size: file.data.size,
                        lastModified: file.lastModified.getTime(),
                    });
                }
            }
        }
        return files;
    }, [value, breadCrumbItems]);

    return <Row
        id={id}
        style={{
            backgroundColor: token.colorBgContainer,
            borderColor: token.colorBorder,
            borderRadius: size === 'small' ? token.borderRadiusSM : size === 'large' ? token.borderRadiusLG : token.borderRadius,
            borderStyle: 'solid',
            borderWidth: 1,
        }}
    >
        <Row justify={'space-between'} style={{ width: '100%', margin: 5 }}>
            <Breadcrumb items={['root', breadCrumbItems].map((item, index) => ({
                title: <Button type={'link'} onClick={() => {
                    setBreadCrumbItems(breadCrumbItems.slice(0, index + 1));
                }}>{item}</Button>
            }))} />
            <Segmented
                value={viewMode}
                onChange={setViewMode}
                options={[
                    { value: 'List', icon: <BarsOutlined /> },
                    { value: 'Kanban', icon: <AppstoreAddOutlined /> },
                ]}
            />
        </Row>
        <List
            size={size}
            id={id}
            style={{ width: '100%' }}
        >
        </List>
    </Row>

}