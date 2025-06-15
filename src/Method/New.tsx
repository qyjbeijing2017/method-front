import { Button, Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import { methodDB, type NewMethod } from "../store/db";
import { useCallback, useEffect, useRef, useState } from "react";
import { AvatarEditorItem } from "../Components/AvatarEditorItem";
import { useAccount } from "../store/account";
import { ZipFileUploader } from "../Components/ZipFileUploader";
import { loadAsync, } from 'jszip';
import { errorReport } from "../utils/errorReport";
import { httpRequest } from "../network/http-request";
import { createMethodService } from "../network/create-method";

export function MethodNew() {
  const { t } = useTranslation('methods');
  const { username } = useAccount();
  const [form] = Form.useForm<NewMethod>();
  const [filePath, setFilePath] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [iconLoading, setIconLoading] = useState(false);

  const fileParse = useCallback(async (file: File) => {
    setFileLoading(true);
    errorReport(async () => {
      await methodDB.new_methods.update(username, {
        files: file,
      });
      const zip = await loadAsync(file);
      const files = Object.keys(zip.files).filter((key) => zip.files[key].dir === false)
      setFilePath(files);
    }).finally(() => {
      setFileLoading(false);
    })
  }, []);

  const iconSave = useCallback(async (file: Blob) => {
    setIconLoading(true);
    errorReport(async () => {
      await methodDB.new_methods.update(username, {
        icon: file,
      });
    }).finally(() => {
      setIconLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!filePath.length) return;
    const exec = form.getFieldValue('executable');
    if (!filePath.includes(exec)) {
      form.setFieldValue('executable', filePath[0]);
    }
  }, [filePath, form]);

  useEffect(() => {
    if (!username) return;

    methodDB.new_methods.get(username).then(async (newMethod) => {
      if (!newMethod) {
        await methodDB.new_methods.add({
          username
        });
        return;
      }
      form.setFieldsValue(newMethod);
      if (newMethod.files) {
        fileParse(newMethod.files);
      }
    });
  }, [form, username]);

  return (
    <>
      <h1>{t('new')}</h1>
      <Form<NewMethod>
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={async (values) => {
          setLoading(true);
          await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate network delay
          // errorReport(async () => {
          //   await methodDB.upload_tasks.add({
          //     username,
          //     type: 'method',
          //     date: new Date(),
          //     status: 'pending',
          //     data: values,
          //   })
          //   await httpRequest(createMethodService(values as { name: string }))
          // })
          setLoading(false);
        }}
        onValuesChange={(changedValue: Partial<NewMethod>) => {
          if (changedValue.files) {
            fileParse(changedValue.files as File);
          }
          if (changedValue.icon) {
            iconSave(changedValue.icon as Blob);
          }
          const { files, icon, ...rest } = changedValue;

          methodDB.new_methods.update(username, {
            ...rest
          })
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
          name="version"
          label={t('version')}
          rules={[{ required: true, message: t('version_required') }]}
        >
          <Input placeholder={t('version_placeholder')} disabled={loading} />
        </Form.Item>

        <Form.Item<NewMethod>
          name="icon"
          label={t('icon')}
        >
          <AvatarEditorItem
            title={t('icon_edit')}
            okText={t('icon_ok')}
            cancelText={t('icon_cancel')}
            uploadText={t('upload')}
            disabled={loading}
            loading={iconLoading}
          />
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