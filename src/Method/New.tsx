import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useLiveQuery } from "dexie-react-hooks";
import { methodDB, type NewMethod } from "../store/db";
import { useEffect, useRef } from "react";
import { AvatarEditorItem } from "../Components/AvatarEditorItem";

export function MethodNew() {
  const { t } = useTranslation('methods');
  const newMethod = useLiveQuery(async () => {
    const newMetods = await methodDB.new_method.toArray()
    if (newMetods.length === 0) {
      const id = await methodDB.new_method.add({
        name: '',
        icon: null,
        description: '',
        files: [],
      });
      return {
        id,
        files: [],
        name: '',
        description: '',
        icon: null,
      } as NewMethod;
    }
    return newMetods[0]
  });
  const [form] = Form.useForm<NewMethod>();
  const methodRef = useRef<NewMethod | null>(null);

  useEffect(() => {
    if (!newMethod) return;
    form.setFieldsValue(newMethod);
    methodRef.current = newMethod;
    return () => {
      methodDB.new_method.update(newMethod.id, {
        ...methodRef.current,
      });
      console.log('Method updated:', methodRef.current);
    }
  }, [form, newMethod]);

  useEffect(()=>{
    const handleBeforeUnload = async () => {
      if (!methodRef.current) return;
      await methodDB.new_method.update(methodRef.current.id, {
        ...methodRef.current,
      });
      console.log('Method saved before unload:', methodRef.current);
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
        onChange={() => {
          methodRef.current = {
            ...form.getFieldsValue(),
            id: newMethod?.id || 1,
          } as NewMethod;
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
          {/* File input or file management component can be added here */}
        </Form.Item>

        <Form.Item<NewMethod>>
          <Button type="primary" htmlType="submit">
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}