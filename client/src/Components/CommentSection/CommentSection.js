import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Container, Box, Divider, IconButton, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import CommentList from './CommentList'


const URL = 'http://localhost:5000'

// const URL = 'https://pdf-manager-s3-v2.onrender.com'

const CommentForm = ({ client, setReload, pdfid, formDisplay, setFormDisplay, selectedCommentId }) => {
  const [comment, setComment] = useState([]);
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDisplay)
    
    
    axios.post(`${URL}/submitComment`, {author: client, pdfid, comment, reply:formDisplay, commentId: selectedCommentId}, {headers: { 'Content-Type': 'application/json'}}).then((res)=>{
      console.log(res);
      setComment('');
      setFormDisplay('comment');
      setReload(prev => prev+1)

    })
  };

  const handleClick = ()=>{
    history.push('/auth')
  }

  if(!client || client.length===0){
    return <Paper onClick={handleClick} sx={{display:'flex', justifyContent:'center'}}>
    <Button variant="h6" align="center" sx={{margin:'auto'}}>
      Login/Signup to comment
    </Button>
  </Paper>
  }

  return (
    <Box my={2}>
      { formDisplay==='reply' ?<Typography variant="h7" sx={{ mt: 1 }}> Add Reply</Typography> : <Typography variant="h7" sx={{ mt: 1 }}> Add Comment</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label={formDisplay==='reply' ? "Reply" : "Comment"}
          multiline
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          required
          sx={{ mt: 1 }}
        />
        <Button type="submit" variant="contained" color="primary" size="small" sx={{ mt: 1 }}>Submit</Button>
      </form>
    </Box>
  );
};



const CommentSection = ({ client, pdfid }) => {
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(0);
  const [replyVisibility , setReplyvisibility] = useState(false);
  const [formDisplay, setFormDisplay] = useState('comment');
  const [selectedCommentId, setSelectedcommentId] = useState('');
  

  useEffect(() => {
    axios.get(`${URL}/comments`).then((res)=>{
      const data = res.data;
      const temp = data.filter((c)=>{
        return c.pdfId===pdfid
      })
      setComments(temp);
    })
  }, [pdfid, reload]);



  const handleDeleteComment = (commentId) => {
    axios.delete(`${URL}/deleteComment/${commentId}`).then((res)=>{
      console.log(res.data);
      setReload(prev => prev+1)
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  return (
    <Container maxWidth="sm">
      <CommentList comments={comments} onDeleteComment={handleDeleteComment} client={client} replyVisibility={replyVisibility} setReplyvisibility={setReplyvisibility} formDisplay={formDisplay} setFormDisplay={setFormDisplay} selectedCommentId={selectedCommentId} setSelectedcommentId={setSelectedcommentId} setReload={setReload}/>
      <CommentForm client={client} setReload={setReload} pdfid={pdfid} replyVisibility={replyVisibility} setReplyvisibility={setReplyvisibility} formDisplay={formDisplay} setFormDisplay={setFormDisplay} selectedCommentId = {selectedCommentId}/>
    </Container>
  );
};

export default CommentSection;

