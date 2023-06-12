import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import FileBase from 'react-file-base64'


const URL = 'https://pdf-manager-s3.onrender.com';

const Form = ({ fnToReload }) => {
  const [formdata, setFormdata] = useState({ name: '', description: '', file: null });


  const handleSubmit = (event) => {

    event.preventDefault();

    console.log(formdata);


    axios.post('https://pdf-manager-s3.onrender.com/upload', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
        setFormdata({ name: '', description: '', file: null });
        fnToReload(prev => prev + 1);
      })
      .catch(error => {
        console.error(error);
      });
  };


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'centre',
        padding: '2rem',

      }}
    >
      <Typography variant="h4" component="h1" sx={{ marginBottom: '1rem' }}>
        Submit PDF
      </Typography >
      <form onSubmit={handleSubmit} >
        <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
          <TextField
            label="Name"
            variant="outlined"
            value={formdata.name}
            onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
            required
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={formdata.description}
            onChange={(e) => setFormdata({ ...formdata, description: e.target.value })}
            required
            sx={{ marginBottom: '1rem' }}
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFormdata({ ...formdata, file: e.target.files[0] })}
            required
          />
          {/* <div><FileBase type="file" multiple={false} onDone={({ base64 }) => setFormdata({ ...formdata, file: base64 })} /></div> */}
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '10px' }}>
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default Form;