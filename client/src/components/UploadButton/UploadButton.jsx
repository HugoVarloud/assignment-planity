import { useState } from 'react';
import axios from 'axios';
import './UploadButton.css';

const UploadButton = () => {
    const [file, setFile] = useState(null)
    const uploadFile = async () => {
      if (!file) {
        alert('Please select a file !');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_PATH}/file-upload`, formData, {
          headers: {
  
          }
        });
  
        if (response.status === 200) {
          alert('Success')
        } else {
          alert('Failure')
        }
      } catch (error) {
        console.log(error);
      }
    }

    const handleFileChange = (event) => {    
      setFile(event.target.files[0]);
    }

    return (
      <>
        <div className='container-upload-button'>
          <button onClick={uploadFile}>Upload</button>
        </div>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
      </>
    )
}

export default UploadButton;
