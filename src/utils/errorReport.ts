import { message } from "antd";
import { t } from "i18next";

export async function errorReport(fun: () => Promise<void> | void): Promise<void> {
    try {
        await fun();
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            message.error(t(error.message, { ns: 'error_report' }));
        }
        else if (typeof error === 'string') {
            message.error(t(error, { ns: 'error_report' }));
        } else {
            message.error(t('error_occurred', { error: JSON.stringify(error), ns: 'error_report' }));
        }
    }
}