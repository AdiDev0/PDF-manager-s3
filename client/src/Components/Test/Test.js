import React, { useState, useEffect } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import axios from 'axios';
import { data } from './base'

const id = '648bdffe02f5b50b096a803a';

const Test = () => {

  const [filedata, setFiledata] = useState({});
  const [url, setUrl] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/getPdfTest/${id}`).then((res) => {
      console.log(res);
      setFiledata(res.data.file)
    })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    if (filedata) {
      // const blob = base64toBlob(filedata.buffer);
      // const u = URL.createObjectURL(blob);
      // setUrl(u)

      //   const blob = new Blob([filedata], { type: "application/pdf" });
      //   console.log(blob)
      //   const blobUrl = URL.createObjectURL(blob);
      //   setUrl(blobUrl)
      // console.log(blobUrl);


      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const u = event.target.result;
        console.log(u)
      };
      fileReader.readAsDataURL(filedata);
    }

  }, [filedata])


  const base64toBlob = (data) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
  };


  return <div style={{
    border: '1px solid rgba(0, 0, 0, 0.3)',
    height: '750px',
  }}>
    {filedata.length > 0 && <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer fileUrl={url} />;
    </Worker>}
  </div>

}

export default Test