import { Space } from "antd";
import MethodAvatar from "./MethodAvatar";
import { Language } from "./Language";

export function GroupRight() {
    return <Space>
        <Language />
        <MethodAvatar />
    </Space>;
}