import { FC } from "react";
import Upload, { UploadProps as RUploadProps } from "./Upload";
import UploadList, { UploadListProps as RUploadListProps } from "./UploadList";

export type IUpload = FC<RUploadProps> & { List: FC<RUploadListProps> };

export interface UploadProps extends RUploadProps {}
export interface UploadListProps extends RUploadListProps {}

const TransUplpad = Upload as IUpload;
TransUplpad.List = UploadList;

export default TransUplpad;
