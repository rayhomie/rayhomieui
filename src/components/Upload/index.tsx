import { FC } from "react";
import Upload, { UploadProps } from "./Upload";
import UploadList, { UploadListProps } from "./UploadList";

export type IUpload = FC<UploadProps> & { List: FC<UploadListProps> };

const TransUplpad = Upload as IUpload;
TransUplpad.List = UploadList;

export default TransUplpad;
