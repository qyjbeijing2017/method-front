import { Button, Form, Input, message } from 'antd';
import { useTranslation } from "react-i18next";
import { errorReport } from '../utils/errorReport';
import { httpRequest } from '../network/http-request';
import { signUpService } from '../network/sign-up.service';
import { useAccount } from '../store/account';
import { useSignIn } from '../store/sign-in';

type FieldType = {
    username: string;
    password: string;
    confirm_password: string;
};

export function SignUp({
    confirmLoading,
    setConfirmLoading,
    setPage,
}: {
    confirmLoading: boolean,
    setConfirmLoading: (loading: boolean) => void
    setPage: (page: string) => void;
}) {
    const { t } = useTranslation('sign_in');
    return <Form<FieldType>
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 15 }}
        initialValues={{ remember: true }}
        onFinish={async (value) => {
            setConfirmLoading(true);
            errorReport(async () => {
                const { access_token } = await httpRequest(signUpService(value));
                useAccount.getState().signIn(value.username, access_token);
                useSignIn.getState().close();
                message.success(t('sign_up_success', { username: value.username }));
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

        <Form.Item<FieldType>
            label={t("confirm_password")}
            name="confirm_password"
            rules={[
                { required: true, message: t('input_confirm_password') },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error(t('password_mismatch')));
                    },
                }),
            ]}
        >
            <Input.Password />
        </Form.Item>

        <span style={{ display: 'block', textAlign: 'right', margin: '10px' }}>
            <Button type={'link'} onClick={() => setPage('sign_in')}>{t('sign_in_now')}</Button>
        </span>

        <span style={{ display: 'block', textAlign: 'center', marginBottom: '5px' }}>
            <Button loading={confirmLoading} type="primary" htmlType="submit" style={{ width: '30%', margin: 'auto' }}>
                {t('sign_up')}
            </Button>
        </span>
    </Form>
}