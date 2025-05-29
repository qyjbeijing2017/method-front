import { message, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useSignIn } from "../store/sign-in";
import { Button, Form, Input } from 'antd';
import { useState } from "react";
import { httpRequest } from "../network/http-request";
import { signInService } from "../network/sign-in.service";
import { errorReport } from "../utils/errorReport";
import { useAccount } from "../store/account";

type FieldType = {
    username: string;
    password: string;
};

export function SignIn() {
    const { t } = useTranslation('sign_in');
    const { opened, close } = useSignIn();
    const [confirmLoading, setConfirmLoading] = useState(false);
    return <Modal
        title={t('sign_in')}
        open={opened}
        onCancel={close}
        footer={null}
        maskClosable={false}
        centered
        confirmLoading={confirmLoading}
        destroyOnHidden
    >
        <Form<FieldType>
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            onFinish={async (value) => {
                setConfirmLoading(true);
                errorReport(async () => {
                    const { access_token } = await httpRequest(signInService(value));
                    useAccount.getState().signIn(value.username, access_token);
                    close();
                    message.success(t('sign_in_success', { username: value.username }));
                })
                setConfirmLoading(false);

            }}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label={t("username")}
                name="username"
                rules={[{ required: true, message: t('input_username') }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label={t("password")}
                name="password"
                rules={[{ required: true, message: t('input_password') }]}
            >
                <Input.Password />
            </Form.Item>

            {/* <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                <Checkbox>{t('agree')}</Checkbox>
            </Form.Item> */}
            <span style={{ display: 'block', textAlign: 'center', marginBottom: '5px' }}>
                <Button type="primary" htmlType="submit" style={{ width: '30%', margin: 'auto' }}>
                    {t('sign_in')}
                </Button>
            </span>
        </Form>
    </Modal>
}