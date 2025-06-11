import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useLiveQuery } from "dexie-react-hooks";
import { methodDB, type NewMethod } from "../store/db";
import { useEffect, useRef } from "react";
import { AvatarEditorItem } from "../Components/AvatarEditorItem";
import { FilesEditor } from "../Components/FileEditor/FilesEditor";
import { useAccount } from "../store/account";

export function MethodNew() {
  const { t } = useTranslation('methods');
  const { username } = useAccount();
  const newMethod = useLiveQuery(async () => {
    const newMetods = await methodDB.new_method.where('username').equals(username).toArray();
    return newMetods[0]
  }, [username]);
  const [form] = Form.useForm<NewMethod>();
  const methodRef = useRef<NewMethod | null>(null);

  useEffect(() => {
    if (!newMethod) {
      methodDB.new_method.add({
        username
      })
      return;
    };
    form.setFieldsValue(newMethod);
    methodRef.current = newMethod;
  }, [form, newMethod]);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (!methodRef.current) return;
      await methodDB.new_method.update(methodRef.current.username, methodRef.current);
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (!methodRef.current) return;
      methodDB.new_method.update(methodRef.current.username, methodRef.current);
    }
  }, [])

  return (
    <>
      <h1>{t('new')}</h1>
      <Form<NewMethod>
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={async (values) => {
          console.log('Form submitted:', values);
        }}
        onChange={(values) => {
          methodRef.current = {
            ...methodRef.current,
            ...form.getFieldsValue(),
          }
        }}
      >
        <Form.Item<NewMethod>
          name={'name'}
          label={t('name')}
          validateTrigger={['onBlur']}
          rules={[{ required: true, message: t('name_required') }]}
        >
          <Input placeholder={t('name_placeholder')} />
        </Form.Item>

        <Form.Item<NewMethod>
          name="icon"
          label={t('icon')}
        >
          <AvatarEditorItem title={t('icon_edit')} okText={t('icon_ok')} cancelText={t('icon_cancel')} uploadText={t('upload')} />
        </Form.Item>

        <Form.Item<NewMethod>
          name="description"
          label={t('description')}
        >
          <Input.TextArea
            placeholder={t('description_placeholder')}
            rows={4}
          />
        </Form.Item>

        <Form.Item<NewMethod>
          name="files"
          label={t('files')}
        >
          <FilesEditor />
        </Form.Item>

        <Form.Item<NewMethod> wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}