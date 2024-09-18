import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null)
  const uploadFile = async () => {
    if (!file) {
      alert('Please select a file !');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/api/file-upload', formData, {
        headers: {

        }
      });

      if (response.status === 200) {
        alert('Success')
      } else {
        alert('Failure')
      }
    } catch (error) {
      
    }
  }

  const handleFileChange = (event) => {    
    setFile(event.target.files[0]);
  }

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </>
  )
}

export default App
