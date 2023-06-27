import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { Document, Page, pdfjs } from 'react-pdf';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton, InputAdornment, Avatar } from '@mui/material';
import CommentSection from '../CommentSection/CommentSection.js'
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './PdfViewer.css'


const URL = 'https://pdf-manager-s3-v2.onrender.com';

// const URL = 'http://localhost:5000'

const Pdfviewer = () => {
    const history = useHistory();
    const [filedata, setFiledata] = useState(null);
    const [base64fileData, setBase64FileData] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');  //pdf name
    const [client, setClient] = useState(''); // client username
    
    const temp = useParams();

    useEffect(() => {
        setId(temp.id);
        if (id.length > 0) {
            axios.get(`${URL}/getName/${id}`)
                .then((res) => {
                    console.log(res.data)
                    setName(res.data.name)
                })
                .catch((e)=>{
                    console.log(e)
                })
        }
    }, [])
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken)
            setClient(decodedToken.name);
        }
    }, [])

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
            axios.get(`${URL}/pdf/${id}`, {
                responseType: 'arraybuffer',
            })
                .then((res) => {
                    setFiledata(res.data);
                })
                .catch((e) =>{
                    console.log(e)
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
                        {name && name.length>0?<span>{name}</span> : <span>PDF</span>}
                    </Typography>
                </div>
                {client && <Avatar sx={{color:'#1976D2', backgroundColor:'white', margin:'1rem 1rem'}}>{client?client.charAt(0):'Z'}</Avatar>}
                
            </Toolbar>
        </AppBar>
        <div className='pdfViewer' style={{ display: 'flex', flexDirection: 'row'}}>
            {base64fileData.length > 0 ? (
                <div className='pdf' style={{ width: '70%', height: "100%", marginTop: '0.5rem', border: '1px solid #1976D2', borderRadius: '5px' }}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer fileUrl={base64fileData}
                        />;
                    </Worker>
                </div>
            ) : <div><CircularProgress size={100} sx={{ margin: '2rem 2rem', width: '70%', height: "100%" }} color="primary" thickness={5} /></div>}

            <div className='comment'>
                <CommentSection client={client} pdfid={temp.id}/>
            </div>
        </div>

    </div>
}
export default Pdfviewer;