import { Row, Tooltip } from "antd";
import type { ReactNode } from "react";

export function FilesEditorToolTip({ children, title }: { title: ReactNode, children?: ReactNode }) {
    return (
        <Tooltip arrow={false} title={<Row justify={'center'}>{title}</Row>}>
        {children}
        </Tooltip>
    );
}