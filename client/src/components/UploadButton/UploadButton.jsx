import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFileThunk } from '../../slices/fileSlice';
import './UploadButton.css';

const UploadButton = () => {
  const [file, setFile] = useState(null);
  const { loading, error } = useSelector((state) => state.file);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert('Please select a file!');
      return;
    }

    try {
      const response = await dispatch(uploadFileThunk(file)).unwrap();

      if (response) {
        handleDownloadZip(response);
      }
    } catch (err) {
      console.error("Error uploading file", err);
    }
  };

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
      <div className="container-upload-button">
        <button onClick={uploadFile} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload and Download'}
        </button>
      </div>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </>
  );
};

export default UploadButton;
