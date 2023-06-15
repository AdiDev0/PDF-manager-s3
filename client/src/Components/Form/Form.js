import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import jwt_decode from 'jwt-decode'


const URL = 'http://localhost:5000';

const Form = ({ fnToReload, token }) => {
  const [formdata, setFormdata] = useState({ name: '', description: '', file: null, email:'' });

  useEffect(()=>{
    if(token){
      const decodedToken = jwt_decode(token);
      setFormdata({...formdata, email : decodedToken.email});
    }
  }, [token])

  const handleSubmit = (event) => {

    event.preventDefault();

    console.log(formdata);


    axios.post(`${URL}/upload`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
        setFormdata({ name: '', description: '', file: null, email:'' });
        fnToReload(prev => prev + 1);
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (!token || token.length===0) {
    return <Paper >
      <Typography variant="h6" align="center" sx={{margin:'1.5rem'}}>
        Please Sign In to upload your PDF or to do necessary operations
      </Typography>
    </Paper>
  }


  return (
    <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2rem',
  }}
>
  <Typography variant="h4" component="h1" sx={{ marginBottom: '1rem' }}>
    Submit PDF
  </Typography>
  <form onSubmit={handleSubmit}>
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