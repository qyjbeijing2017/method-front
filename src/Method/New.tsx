import { Button, Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useLiveQuery } from "dexie-react-hooks";
import { methodDB, type NewMethod } from "../store/db";
import { useCallback, useEffect, useRef, useState } from "react";
import { AvatarEditorItem } from "../Components/AvatarEditorItem";
import { useAccount } from "../store/account";
import { ZipFileUploader } from "../Components/ZipFileUploader";
import { loadAsync, } from 'jszip';
import { errorReport } from "../utils/errorReport";

export function MethodNew() {
  const { t } = useTranslation('methods');
  const { username } = useAccount();
  const newMethod = useLiveQuery(async () => {
    const newMetods = await methodDB.new_methods.where('username').equals(username).toArray();
    return newMetods[0]
  }, [username]);
  const [form] = Form.useForm<NewMethod>();
  const methodRef = useRef<NewMethod | null>(null);
  const [filePath, setFilePath] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);

  const fileParse = useCallback(async (file: File) => {
    setFileLoading(true);
    errorReport(async () => {
      const zip = await loadAsync(file);
      const files = Object.keys(zip.files).filter((key) => zip.files[key].dir === false)
      setFilePath(files);
    }).finally(() => {
      setFileLoading(false);
    })
  }, []);

  useEffect(() => {
    if (!filePath.length) return;
    const exec = form.getFieldValue('executable');
    if (!filePath.includes(exec)) {
      form.setFieldValue('executable', undefined);
    }
  }, [filePath, form]);

  useEffect(() => {
    if (!newMethod) {
      methodDB.new_methods.add({
        username
      })
      return;
    };
    form.setFieldsValue(newMethod);
    if (newMethod.files) {
      fileParse(newMethod.files);
    }
    methodRef.current = newMethod;
  }, [form, newMethod]);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (!methodRef.current) return;
      await methodDB.new_methods.update(username, methodRef.current);
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (!methodRef.current) return;
      methodDB.new_methods.update(username, methodRef.current);
    }
  }, [username])

  return (
    <>
      <h1>{t('new')}</h1>
      <Form<NewMethod>
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={async (values) => {
          setLoading(true);
          await new Promise<void>(async (resolve) => {
            setTimeout(() => {
              resolve();
            }, 3000); 
          });
          setLoading(false);
        }}
        onValuesChange={(_, val) => {
          if (methodRef.current?.files !== val.files) {
            if (val.files)
              fileParse(val.files);
            else {
              setFilePath([]);
            }
          }
          methodRef.current = val;
        }}
      >
        <Form.Item<NewMethod>
          name={'name'}
          label={t('name')}
          validateTrigger={['onBlur']}
          rules={[{ required: true, message: t('name_required') }]}
        >
          <Input placeholder={t('name_placeholder')} disabled={loading} />
        </Form.Item>

        <Form.Item<NewMethod>
          name="icon"
          label={t('icon')}
        >
          <AvatarEditorItem title={t('icon_edit')} okText={t('icon_ok')} cancelText={t('icon_cancel')} uploadText={t('upload')} disabled={loading} />
        </Form.Item>

        <Form.Item<NewMethod>
          name="description"
          label={t('description')}
        >
          <Input.TextArea
            placeholder={t('description_placeholder')}
            rows={4}
            disabled={loading}
          />
        </Form.Item>

        <Form.Item<NewMethod>
          name="files"
          label={t('files')}
          rules={[{ required: true, message: t('files_required') }]}
        >
          <ZipFileUploader loading={fileLoading} disabled={loading} />
        </Form.Item>

        {filePath.length > 0 && !filePath.includes('Dockerfile') ? <Form.Item<NewMethod>
          name="executable"
          label={t('executable')}
          rules={[{ required: true, message: t('executable_required') }]}
        >
          <Select options={filePath.map(file => ({
            label: file,
            value: file,
          }))} disabled={fileLoading || loading} />
        </Form.Item> : <></>}

        <Form.Item<NewMethod> wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit" disabled={fileLoading} loading={loading}>
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}