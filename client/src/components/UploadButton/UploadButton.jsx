import React, { useRef, useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import './UploadButton.css';

const UploadButton = () => {
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");


  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const onChooseFile = async () => {
      inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }

    try {
      setUploadStatus("uploading");
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${import.meta.env.VITE_API_PATH}/files/uploads`, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
        responseType: 'blob',
      });

      if (response && response.data) {
        handleDownloadZip(response.data);
      }

      setUploadStatus("done");
    } catch (error) {
      setUploadStatus("select");
    }
  }

  const handleDownloadZip = (zipBlob) => {
    const blob = new Blob([zipBlob], { type: 'application/zip' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `${file.name}.zip`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <>
      <div>
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {!file && (
          <button className="file-btn" onClick={onChooseFile}>
            <FileUploadIcon/>Upload File
          </button>
        )}
        {file && (
          <>
            <div className="file-card">
              <UploadFileIcon/>
              <div className="file-info">
                <div style={{ flex: 1 }}>
                  <h6>{file?.name}</h6>
                  <div className="progress-bg">
                    <div className="progress" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                {uploadStatus === "select" ? (
                  <button onClick={clearFileInput}>
                    <CloseIcon/>
                  </button>
                ) : (
                  <div className="check-circle">
                    {uploadStatus === "uploading" ? (
                      `${progress}%`
                    ) : uploadStatus === "done" ? (
                      <CheckIcon/>
                    ) : null}
                  </div>
                )}
            </div>
          </div>
          <button className="upload-btn" onClick={handleUpload}>
            {uploadStatus === "select" || uploadStatus === 'uploading' ? "Upload" : "Done"}
          </button>
          </>
        )}
      </div>
    </>
  );
};

export default UploadButton;
