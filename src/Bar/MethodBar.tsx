
import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { GroupRight } from "./GroupRight";
import { MethodSearch } from "./Search";
import MethodIcon from "./MethodIcon";

export default function MethodBar({
    collapsed,
    setCollapsed
}: {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}) {
    return <Layout.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Button
            onClick={() => setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            type="text"
            style={{
                position: 'absolute',
                left: 8,
            }}
            size="large"
            shape="circle"
        />
        <MethodIcon />
        <MethodSearch />
        <GroupRight />
    </Layout.Header>
}