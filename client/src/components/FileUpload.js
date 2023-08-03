

import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ account, contract, provider }) => {
  console.log(contract);
  console.log(provider);
  console.log(account);

  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length > 0) {
      try {
        for (const file of files) {
          const formData = new FormData();
          formData.append('file', file);

          const resFile = await axios({
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
            data: formData,
            headers: {
              pinata_api_key: `4a2a258bf324ce250fc4`,
              pinata_secret_api_key: `264baf64f229092e942bf7196de458971981ce60b3e3666c69e6c81c39a7da22`,
              'Content-Type': 'multipart/form-data',
            },
          });

          const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          contract.add(account, imgHash);

          alert(`Successfully uploaded ${file.name}`);
        }

        alert('All files uploaded successfully');

        setFileNames([]);
        setFiles([]);
      } catch (e) {
        alert('Unable to upload files to Pinata');
      }
    }
  };

  const retrieveData = (e) => {
    const data = Array.from(e.target.files);
    const fileNames = data.map((file) => file.name);

    setFiles(data);
    setFileNames(fileNames);
    e.preventDefault();
  };

  return (
    <div className='fileUpload'>
      <form className='form' onSubmit={handleSubmit}>
        Choose Multiple Filles Together 
        <label htmlFor='file-upload' className='choose'>
          Choose files 
        </label>
        <input disabled={!account} type='file' id='file-upload' name='data' onChange={retrieveData} multiple />
        <span className='textArea'>
          {fileNames.length > 0 ? fileNames.join(', ') : 'No files chosen'}
        </span>
        <button type='submit' className='btn-submit' disabled={!files.length}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
