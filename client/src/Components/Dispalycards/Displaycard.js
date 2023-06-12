import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios'
import { Tooltip } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';


const Displaycard = ({ _id, name, description, file, createdAt, fnToReload }) => {
    const history = useHistory();
    const [copySuccess, setCopySuccess] = useState(false);


    const handleDelete = () => {
        // Handle delete logic

        axios.delete(`https://pdf-manager-s3.onrender.com/${_id}`)
            .then((res) => {
                console.log(res.data);
                fnToReload(prev => prev + 1)
            })
    };


    const handleClick = () => {
        history.push({ pathname: '/viewpdf', state: { id: _id, name: name } });
    }

    const handleCopy = () => {
        const textField = document.createElement('textarea');
        textField.innerText = `https://pdf-manager-s3.onrender.com/pdf/${_id}`;
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
                <IconButton onClick={handleDelete} style={{ marginLeft: 'auto' }}>
                    <DeleteIcon sx={{ fontSize: "1rem" }} />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Displaycard;