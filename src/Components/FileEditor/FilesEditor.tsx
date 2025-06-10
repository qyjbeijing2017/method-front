import { AppstoreAddOutlined, BarsOutlined, FolderAddOutlined, HomeOutlined, UploadOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, List, Row, Segmented, theme } from "antd";
import { useMemo, useState } from "react";
import { lookup } from 'mime-types';
import { useTranslation } from "react-i18next";
import { FilesEditorToolTip } from "./FileEditorToolTip";
import type { FileEditorMode, IFile, IFileShow } from "./file.inter";
import { FolderItem } from "./FolderItem";
import { FileItem } from "./FileItem";


export function FilesEditor({
    id,
    value = [],
    onChange,
    disabled,
    loading = false,
    size = 'default',
}: {
    id?: string;
    value?: IFile[];
    onChange?: (value: IFile[]) => void | Promise<void>;
    disabled?: boolean;
    loading?: boolean;
    size?: 'small' | 'default' | 'large';
}) {
    const { token } = theme.useToken();
    const [breadCrumbItems, setBreadCrumbItems] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<FileEditorMode>('List');
    const [status, setStatus] = useState<'hover' | 'active' | 'default' | 'disabled' | 'loading'>(
        disabled ? 'disabled' : loading ? 'loading' : 'default'
    );
    const { t } = useTranslation('file_editor');

    const files = useMemo(() => {
        const path = breadCrumbItems.join('/');
        const files: IFileShow[] = [];
        for (const file of value) {
            if (file.name.startsWith(path)) {
                const relativePath = file.name.slice(path.length).replace(/^\//, '');
                const isDirectory = !file.data || relativePath.split('/').length !== 1;
                if (isDirectory) {
                    const dirName = relativePath.split('/')[0];
                    let dir = files.find(f => f.name === dirName);
                    if (!dir) {
                        dir = {
                            name: dirName,
                            type: 'directory',
                            size: 0,
                            lastModified: file.lastModified.getTime(),
                        };
                        files.push(dir);
                    }
                    dir.size += file.data?.size ?? 0;
                } else {
                    const fileType = lookup(file.name) || 'application/octet-stream';
                    files.push({
                        name: relativePath,
                        type: fileType,
                        size: file.data?.size || 0,
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
            backgroundColor: status === 'disabled' ? token.colorBgContainerDisabled : token.colorBgContainer,
            borderColor: status === 'hover' ? token.colorPrimaryHover : status === 'active' ? token.colorPrimaryActive : token.colorBorder,
            borderRadius: size === 'small' ? token.borderRadiusSM : size === 'large' ? token.borderRadiusLG : token.borderRadius,
            borderStyle: 'solid',
            borderWidth: 1,
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
        onFocus={() => {
            if (status === 'default') {
                setStatus('active');
            }
        }}
        onBlur={() => {
            if (status === 'active') {
                setStatus('default');
            }
        }}
    >
        <Row justify={'space-between'} style={{ width: '100%', margin: 5 }}>
            <Breadcrumb
                items={[
                    {
                        title: <FilesEditorToolTip title={t('root')}>
                            <Button
                                disabled={loading || disabled}
                                type={'link'}
                                icon={<HomeOutlined />}
                                onClick={() => setBreadCrumbItems([])}
                            />
                        </FilesEditorToolTip>

                    },
                    ...breadCrumbItems.map((item, index) => ({
                        title: <Button
                            disabled={disabled}
                            type={'link'}
                            onClick={() => {
                                setBreadCrumbItems(breadCrumbItems.slice(0, index + 1));
                            }}
                        >
                            {item}
                        </Button>
                    }))
                ]}
            />
            <Col>
                <Segmented
                    value={viewMode}
                    onChange={setViewMode}
                    options={[
                        { value: 'List', label: <FilesEditorToolTip title={t('list_mode')}><BarsOutlined /></FilesEditorToolTip> },
                        { value: 'Kanban', label: <FilesEditorToolTip title={t('grid_mode')}><AppstoreAddOutlined /></FilesEditorToolTip> }
                    ]}
                />
                <FilesEditorToolTip title={t('add_folder')}>
                    <Button
                        disabled={loading || disabled}
                        type={'text'}
                        icon={<FolderAddOutlined />}
                    />
                </FilesEditorToolTip>
                <FilesEditorToolTip title={t('upload')}>
                    <Button
                        disabled={loading || disabled}
                        type={'text'}
                        icon={<UploadOutlined />}
                    />
                </FilesEditorToolTip>
            </Col>
        </Row>
        <List
            size={size}
            id={id}
            style={{ width: '100%', margin: 10 }}
            loading={loading}
            dataSource={files}
            grid={viewMode === 'List' ? undefined : {
                gutter: 16,
            }}
            renderItem={(file, index) => (
                <List.Item>
                    {file.type === 'directory' ?
                        <FolderItem
                            file={file}
                            mode={viewMode}
                        /> :
                        <FileItem
                            file={file}
                            mode={viewMode}
                        />
                    }
                </List.Item>
            )}
        />
    </Row>
}