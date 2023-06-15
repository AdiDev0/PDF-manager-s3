import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CardActions, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios'
import { Tooltip } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import jwt_decode from 'jwt-decode'


const Displaycard = ({ _id, name, description, file, createdAt, email, fnToReload, token }) => {
    const history = useHistory();
    const [copySuccess, setCopySuccess] = useState(false);

    const [clientEmail , setClientEmail] = useState('');


    useEffect(()=>{
        if(token){
          const decodedToken = jwt_decode(token);
          setClientEmail(decodedToken.email);
        }
      }, [token])

    const handleDelete = () => {
        // Handle delete logic

        axios.delete(`http://localhost:5000/${_id}`)
            .then((res) => {
                console.log(res.data);
                fnToReload(prev => prev + 1)
            })
    };


    const handleClick = () => {
        history.push({ pathname: `/viewpdf/${_id}`, state: { id: _id, name: name } });
    }

    const handleCopy = () => {
        const textField = document.createElement('textarea');
        // textField.innerText = `http://localhost:5000/pdf/${_id}`;  //this is the aws global link
        textField.innerText = `http://localhost:3000/viewpdf/${_id}`;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        setCopySuccess(true);
    };


    return (
        <Card sx={{ margin: "2rem 1.5rem", height: '12rem', width: '20rem' }}>
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Tooltip title={copySuccess ? 'Copied!' : 'Copy Link'}>
                        <IconButton onClick={handleCopy}>
                            <FileCopyIcon sx={{ fontSize: "0.8rem"}}/>
                        </IconButton>
                    </Tooltip>

                </div>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
                <Typography fontSize="small" sx={{ mt: 2 }} color="text.secondary">
                    Created At: {moment(createdAt).fromNow()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={handleClick} sx={{ mt: 0 }}>
                    View File
                </Button>
                {token && clientEmail===email && <IconButton onClick={handleDelete} style={{ marginLeft: 'auto' }}>
                    <DeleteIcon sx={{ fontSize: "1rem" }} />
                </IconButton>}
            </CardActions>
        </Card>
    );
};

export default Displaycard;