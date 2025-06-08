import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useLiveQuery } from "dexie-react-hooks";
import { methodDB, type NewMethod } from "../store/db";
import { useEffect, useState } from "react";
import AvatarEditor from 'react-avatar-editor';

export function MethodNew() {
  const { t } = useTranslation('methods');
  const newMethods = useLiveQuery(async () => {
    const methods = await methodDB.new_method.toArray();
    return methods.length > 0 ? methods[0] : null;
  }, [], []) as NewMethod | null;

  const [form] = Form.useForm<NewMethod>();

  useEffect(() => {

    const handleUnload = async () => {
      const values = form.getFieldsValue();
      if (newMethods) {
        await methodDB.new_method.put(values);
      } else {
        await methodDB.new_method.add(values);
      }
    }

    form.setFieldsValue(newMethods || {});

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      handleUnload();
    }
  }, [form]);

  return (
    <>
      <h1>{t('new')}</h1>
      <Form<NewMethod>
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="name"
          label={t('name')}
          rules={[{ required: true, message: t('name_required') }]}
        >
          <Input placeholder={t('name_placeholder')} />
        </Form.Item>

        <Form.Item
          name="icon"
          label={t('icon')}
          valuePropName="file"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e[0];
            }
            return e && e.file;
          }
          }
        >
          <AvatarEditor
            image={newMethods?.icon as File || ''}
            width={100}
            height={100}
            border={50}
            onLoadFailure={(error) => console.error('Image load failed:', error)}
            onImageReady={() => console.log('Image is ready')}
            onImageChange={() => console.log('Image changed')}
          />
        </Form.Item>


        <Form.Item
          name="description"
          label={t('description')}
        >
          <Input.TextArea
            placeholder={t('description_placeholder')}
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="files"
          label={t('files')}
        >
          {/* File input or file management component can be added here */}
        </Form.Item>
      </Form>
    </>
  );
}