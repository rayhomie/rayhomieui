var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import Button, { ButtonType } from '../Button/Button';
import axios from 'axios';
import UploadList from './UploadList';
var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange, defaultFileList = props.defaultFileList, onRemove = props.onRemove;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (preFileList) {
            console.log(preFileList);
            return preFileList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        var post = function (file) {
            var _file = {
                uid: Date.now() + 'upload-file',
                status: 'ready',
                name: file.name,
                size: file.size,
                percent: 0,
                raw: file
            };
            setFileList(__spreadArrays([_file], fileList));
            var formData = new FormData();
            formData.append(file.name, file);
            axios.post(action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function (e) {
                    var percentage = Math.round((e.loaded * 100 / e.total) || 0);
                    if (percentage < 100) {
                        updateFileList(_file, { percent: percentage, status: 'uploading' });
                        if (onProgress) {
                            onProgress(percentage, file);
                        }
                    }
                }
            })
                .then(function (response) {
                console.log('Success:', response);
                updateFileList(_file, { status: 'success', response: response.data });
                if (onSuccess) {
                    onSuccess(response.data, file);
                }
                if (onChange) {
                    onChange(file);
                }
            })
                .catch(function (error) {
                updateFileList(_file, { status: 'error', error: error });
                console.error('Error:', error);
                if (onError) {
                    onError(error, file);
                }
                if (onChange) {
                    onChange(file);
                }
            });
        };
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
            post(file);
        });
    };
    var handleRemove = function (file) {
        setFileList(function (preList) {
            return preList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'upload-component' },
            React.createElement(Button, { btnType: ButtonType.Primary, onClick: function () {
                    if (fileInput.current) {
                        fileInput.current.click();
                    }
                } }, "Upload File"),
            React.createElement("input", { type: 'file', className: 'file-input', style: { display: 'none' }, ref: fileInput, onChange: function (e) {
                    var files = e.target.files;
                    if (!files)
                        return;
                    uploadFiles(files);
                    if (fileInput.current) {
                        fileInput.current.value = '';
                    }
                } }),
            React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove }))));
};
export default Upload;
