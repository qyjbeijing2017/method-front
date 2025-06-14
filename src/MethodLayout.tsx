import { useState, type ReactNode } from "react";
import { Outlet } from "react-router";
import { Layout } from "antd";
import MethodBar from "./Bar/MethodBar";
import { SignIn } from "./SignIn/SignIn";
import { Navigation } from "./Navigation/Navigation";
import { UploadTask } from "./UploadTask/UploadTask";

export function MethodLayout(): ReactNode {
    const [collapsed, setCollapsed] = useState(false);
    return <>
        <Layout>
            <MethodBar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
                <Navigation collapsed={collapsed} />
                <Layout.Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px)', overflow: 'auto' }}>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
        <SignIn />
        <UploadTask />
    </>;
}