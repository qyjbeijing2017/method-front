import { useState, type ReactNode } from "react";
import { Outlet } from "react-router";
import Layout, { Content } from "antd/es/layout/layout";
import MethodBar from "./Bar/MethodBar";
import { SignIn } from "./SignIn/SignIn";
import { Navigation } from "./Navigation/Navigation";

export function MethodLayout(): ReactNode {
    const [collapsed, setCollapsed] = useState(false);
    return <>
        <Layout>
            <MethodBar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
                <Navigation collapsed={collapsed} />
                <Content style={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
        <SignIn />
    </>;
}