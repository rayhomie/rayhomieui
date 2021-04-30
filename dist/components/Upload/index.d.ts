import { FC } from "react";
import { UploadProps as RUploadProps } from "./Upload";
import { UploadListProps as RUploadListProps } from "./UploadList";
export declare type IUpload = FC<RUploadProps> & {
    List: FC<RUploadListProps>;
};
export interface UploadProps extends RUploadProps {
}
export interface UploadListProps extends RUploadListProps {
}
declare const TransUplpad: IUpload;
export default TransUplpad;
