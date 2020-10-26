import React, { useRef, useState } from 'react'
import Button, { ButtonType } from '../Button/Button';
import axios from 'axios';
import UploadList from './UploadList';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: UploadFile
  response?: any
  error?: any
}

export interface UploadProps {
  action: string
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: UploadFile) => boolean | Promise<UploadFile>
  onProgress?: (percentage: number, file: UploadFile) => void
  onChange?: (file: UploadFile) => void
  onSuccess?: (data: any, file: UploadFile) => void
  onError?: (err: any, file: UploadFile) => void
  onRemove?: (file: UploadFile) => void
  style?: React.CSSProperties
  className?: string
}

const Upload: React.FC<UploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError, beforeUpload, onChange, defaultFileList, onRemove } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(preFileList => {
      console.log(preFileList)
      return preFileList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    const post = (file: any) => {
      let _file: UploadFile = {
        uid: Date.now() + 'upload-file',
        status: 'ready',
        name: file.name,
        size: file.size,
        percent: 0,
        raw: file
      }
      setFileList([_file, ...fileList])
      const formData = new FormData()
      formData.append(file.name, file)
      axios.post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (e: any) => {
          let percentage = Math.round((e.loaded * 100 / e.total) || 0)
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' })
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        }
      })
        .then(response => {
          console.log('Success:', response)
          updateFileList(_file, { status: 'success', response: response.data })
          if (onSuccess) {
            onSuccess(response.data, file)
          }
          if (onChange) {
            onChange(file)
          }
        })
        .catch(error => {
          updateFileList(_file, { status: 'error', error })
          console.error('Error:', error)
          if (onError) {
            onError(error, file)
          }
          if (onChange) {
            onChange(file)
          }
        })
    }

    postFiles.forEach((file: any) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
      post(file)
    })
  }

  const handleRemove = (file: UploadFile) => {
    setFileList(preList => {
      return preList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }

  }
  return (
    <>
      <div className='upload-component'>
        <Button
          btnType={ButtonType.Primary}
          onClick={() => {
            if (fileInput.current) {
              fileInput.current.click()
            }
          }}
        >
          Upload File
        </Button>
        <input
          type='file'
          className='file-input'
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files
            if (!files) return
            uploadFiles(files)
            if (fileInput.current) {
              fileInput.current.value = ''
            }
          }}
        />
        <UploadList
          fileList={fileList}
          onRemove={handleRemove}
        />
      </div>
    </>
  )
}
export default Upload