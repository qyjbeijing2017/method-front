import { message, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useSignIn } from "../store/sign-in";
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from "react";
import { httpRequest } from "../network/http-request";
import { signInService } from "../network/sign-in.service";
import { errorReport } from "../utils/errorReport";
import { useAccount } from "../store/account";
import { SignUp } from "./SignUp";

type FieldType = {
    username: string;
    password: string;
};

export function SignIn() {
    const { t } = useTranslation('sign_in');
    const { opened, close } = useSignIn();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [page, setPage] = useState<string>('sign_in');

    useEffect(() => {
        if (opened) {
            setPage('sign_in');
        }
    }, [opened]);

    const changePage = (newPage: string) => {
        switch (newPage) {
            case 'sign_up':
                return <SignUp confirmLoading={confirmLoading} setConfirmLoading={setConfirmLoading} setPage={setPage} />;
            default:
                return <div>{t('unknown_page')}</div>;
        }        
    };

    return <Modal
        title={t(page)}
        open={opened}
        onCancel={close}
        footer={null}
        maskClosable={false}
        centered
        confirmLoading={confirmLoading}
        destroyOnHidden
    >
        {page !== 'sign_in' ? changePage(page) :
            <Form<FieldType>
                name="sign_in"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 15 }}
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

                <span style={{ display: 'block', textAlign: 'right', margin: '10px' }}>
                    <Button type={'link'} onClick={()=>setPage('sign_up')}>{t('sign_up_now')}</Button>
                </span>

                <span style={{ display: 'block', textAlign: 'center', margin: '10px' }}>
                    <Button loading={confirmLoading} type="primary" htmlType="submit" style={{ width: '30%', margin: 'auto' }}>
                        {t('sign_in')}
                    </Button>
                </span>
            </Form>}
    </Modal>
}