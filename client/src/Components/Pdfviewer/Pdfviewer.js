import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { Document, Page, pdfjs } from 'react-pdf';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton, InputAdornment } from '@mui/material';
import CommentSection from '../CommentSection/CommentSection.js'
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './PdfViewer.css'




const Pdfviewer = () => {
    const history = useHistory();
    const [filedata, setFiledata] = useState(null);
    const [base64fileData, setBase64FileData] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const location = useLocation();

    // const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        setId(location.state.id);
        setName(location.state.name);

    }, [location])

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;

        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }

    useEffect(() => {
        if (id.length > 0) {
            console.log(id)
            axios.get(`http://localhost:5000/pdf/${id}`, {
                responseType: 'arraybuffer',
            })
                .then((res) => {
                    setFiledata(res.data);
                })
        }

    }, [id])

    useEffect(() => {
        const base64String = arrayBufferToBase64(filedata);
        setBase64FileData('data:application/pdf;base64,'.concat(base64String));
        console.log(base64fileData)
    }, [filedata])

    const handleBackButtonClick = () => {
        history.push('/');
    }

    return <div>
        <AppBar position="static">
            <Toolbar>
                <IconButton color="inherit" sx={{ mr: 2 }} onClick={handleBackButtonClick}>
                    <ArrowBackIcon />
                </IconButton>
                <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ marginRight: '2rem' }}>
                        {name}
                    </Typography>
                </div>
            </Toolbar>
        </AppBar>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {base64fileData.length > 0 ? (
                <div style={{ width: '100%', height: "100%", marginTop: '0.5rem', border: '1px solid #1976D2', borderRadius: '5px' }}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer fileUrl={base64fileData}
                        />;
                    </Worker>
                </div>
            ) : <div><CircularProgress size={100} sx={{ margin: '2rem 2rem', width: '70%', height: "100%" }} color="primary" thickness={5} /></div>}

            <div style={{ width: '30%', marginTop: '2rem' }}>
                <CommentSection documentId={id} />
            </div>
        </div>

    </div>
}
export default Pdfviewer;