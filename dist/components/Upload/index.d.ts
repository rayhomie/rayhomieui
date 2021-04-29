import { FC } from "react";
import { UploadProps } from "./Upload";
import { UploadListProps } from "./UploadList";
export declare type IUpload = FC<UploadProps> & {
    List: FC<UploadListProps>;
};
declare const TransUplpad: IUpload;
export default TransUplpad;
