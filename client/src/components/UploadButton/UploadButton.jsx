import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
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
      const formData = new FormData();
      formData.append('file', file);
      console.log('FORM DATA ', formData);
      
      // Make sure to handle the response properly
      const response = await axios.post(`${import.meta.env.VITE_API_PATH}/files/uploads`, formData, {
        responseType: 'blob',
      });
      console.log("Response ", response);

      if (response && response.data) {
        handleDownloadZip(response.data);  // Only pass the file data
      }
    } catch (err) {
      console.error("Error uploading file", err);
    }
  };

  const handleDownloadZip = (zipBlob) => {
    // Now zipBlob is just the binary data (response.data), not the entire response object
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
