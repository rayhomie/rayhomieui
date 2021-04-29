import React from 'react';
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: UploadFile;
    response?: any;
    error?: any;
}
export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: UploadFile) => boolean | Promise<UploadFile>;
    onProgress?: (percentage: number, file: UploadFile) => void;
    onChange?: (file: UploadFile) => void;
    onSuccess?: (data: any, file: UploadFile) => void;
    onError?: (err: any, file: UploadFile) => void;
    onRemove?: (file: UploadFile) => void;
    style?: React.CSSProperties;
    className?: string;
}
declare const Upload: React.FC<UploadProps>;
export default Upload;
