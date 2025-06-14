import { UploadOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { methodDB, type UploadTask } from "../store/db";
import { useAccount } from "../store/account";
import { useEffect, useRef } from "react";
import UploadWorker from './upload.worker?worker';


export function UploadTask() {
    const { username } = useAccount();
    const tasks = useLiveQuery(() => methodDB.upload_tasks.where('username').equals(username).toArray(), [username]);
    const uploadWorker = useRef<Worker | null>(null);

    useEffect(() => {
        const worker = new UploadWorker();
        uploadWorker.current = worker;
        return () => {
            worker.terminate();
            uploadWorker.current = null;
        }
    },[]);

    return <FloatButton icon={<UploadOutlined />} />
}